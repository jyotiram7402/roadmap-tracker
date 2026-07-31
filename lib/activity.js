// lib/activity.js — per-device study-activity engine (localStorage).
// Powers: streak, time-spent-per-day, visit counts, "mark as done", and the
// Progress dashboard. Works with no backend so it never depends on Supabase.
//
// Storage:
//   crackany.activity.days  = { [YYYY-MM-DD]: { opens, timeMs, visits, byCat:{}, solved, solvedByCat:{} } }
//   crackany.activity.items = { [category:id]: { visits, firstVisit, lastVisit, done, doneDate, category, title } }

const DAYS_KEY = "crackany.activity.days";
const ITEMS_KEY = "crackany.activity.items";

function load(key) {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(key)) || {}; } catch { return {}; }
}
function save(key, v) {
  try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
}
function emit() {
  try { window.dispatchEvent(new Event("activity-change")); } catch {}
}

function fmt(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
export function todayStr() { return fmt(new Date()); }

function dayObj(days, date) {
  return days[date] || (days[date] = { opens: 0, timeMs: 0, visits: 0, byCat: {}, solved: 0, solvedByCat: {} });
}

// Called once per app open (marks the day active for the streak).
export function markAppOpen() {
  const days = load(DAYS_KEY);
  const d = dayObj(days, todayStr());
  d.opens = (d.opens || 0) + 1;
  save(DAYS_KEY, days);
  emit();
}

// Record that a specific item (question/problem) was opened.
export function logVisit(category, id, title) {
  if (!category || !id) return;
  const key = `${category}:${id}`;
  const now = todayStr();
  const items = load(ITEMS_KEY);
  const it = items[key] || { visits: 0, firstVisit: now, done: false };
  it.visits = (it.visits || 0) + 1;
  it.lastVisit = now;
  it.category = category;
  if (title) it.title = title;
  items[key] = it;
  save(ITEMS_KEY, items);

  const days = load(DAYS_KEY);
  const d = dayObj(days, now);
  d.visits = (d.visits || 0) + 1;
  d.byCat[category] = (d.byCat[category] || 0) + 1;
  save(DAYS_KEY, days);
  emit();
}

export function getItem(category, id) {
  const items = load(ITEMS_KEY);
  return items[`${category}:${id}`] || null;
}
export function isDone(category, id) {
  const it = getItem(category, id);
  return !!(it && it.done);
}

// Toggle "I've done this" for an item. Returns the new done state.
export function toggleDone(category, id, title) {
  const key = `${category}:${id}`;
  const now = todayStr();
  const items = load(ITEMS_KEY);
  const it = items[key] || { visits: 0, firstVisit: now, done: false };
  it.done = !it.done;
  it.category = category;
  if (title) it.title = title;
  if (it.done) it.doneDate = now; else delete it.doneDate;
  items[key] = it;
  save(ITEMS_KEY, items);

  if (it.done) {
    const days = load(DAYS_KEY);
    const d = dayObj(days, now);
    d.solved = (d.solved || 0) + 1;
    d.solvedByCat[category] = (d.solvedByCat[category] || 0) + 1;
    save(DAYS_KEY, days);
  }
  emit();
  return it.done;
}

// Accrue active time into today's bucket (called by the time tracker).
export function addActiveTime(ms) {
  if (!ms || ms <= 0) return;
  const days = load(DAYS_KEY);
  const d = dayObj(days, todayStr());
  d.timeMs = (d.timeMs || 0) + ms;
  save(DAYS_KEY, days);
}

export function getDays() { return load(DAYS_KEY); }
export function getItems() { return load(ITEMS_KEY); }

function isActive(day) {
  return !!day && ((day.opens || 0) > 0 || (day.visits || 0) > 0 || (day.timeMs || 0) > 0 || (day.solved || 0) > 0);
}

// Consecutive active days ending today (or yesterday, as a grace day).
export function computeStreak() {
  const days = load(DAYS_KEY);
  const d = new Date();
  if (!isActive(days[fmt(d)])) d.setDate(d.getDate() - 1); // today not active yet → start at yesterday
  let streak = 0;
  for (;;) {
    if (isActive(days[fmt(d)])) { streak++; d.setDate(d.getDate() - 1); }
    else break;
  }
  return streak;
}

export function longestStreak() {
  const days = load(DAYS_KEY);
  const dates = Object.keys(days).filter((k) => isActive(days[k])).sort();
  let best = 0, cur = 0, prev = null;
  for (const s of dates) {
    if (prev) {
      const p = new Date(prev), c = new Date(s);
      const diff = Math.round((c - p) / 86400000);
      cur = diff === 1 ? cur + 1 : 1;
    } else cur = 1;
    best = Math.max(best, cur);
    prev = s;
  }
  return best;
}

export function formatDuration(ms) {
  const s = Math.round((ms || 0) / 1000);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m`;
  return `${s}s`;
}

// Full aggregated report for the Progress dashboard.
export function buildReport(lastDays = 14) {
  const days = load(DAYS_KEY);
  const items = load(ITEMS_KEY);

  let totalTimeMs = 0, totalVisits = 0, totalSolved = 0;
  const solvedByCat = {}, visitsByCat = {};
  for (const d of Object.values(days)) {
    totalTimeMs += d.timeMs || 0;
    totalVisits += d.visits || 0;
    totalSolved += d.solved || 0;
    for (const [c, n] of Object.entries(d.byCat || {})) visitsByCat[c] = (visitsByCat[c] || 0) + n;
    for (const [c, n] of Object.entries(d.solvedByCat || {})) solvedByCat[c] = (solvedByCat[c] || 0) + n;
  }
  // "done" items counted from the item store (authoritative for current done state)
  const doneByCat = {};
  let doneTotal = 0;
  for (const it of Object.values(items)) {
    if (it.done) { doneTotal++; doneByCat[it.category] = (doneByCat[it.category] || 0) + 1; }
  }

  // last N days series (oldest → newest)
  const series = [];
  const d = new Date();
  d.setDate(d.getDate() - (lastDays - 1));
  for (let i = 0; i < lastDays; i++) {
    const s = fmt(d);
    const day = days[s] || {};
    series.push({ date: s, timeMs: day.timeMs || 0, visits: day.visits || 0, solved: day.solved || 0, active: isActive(day) });
    d.setDate(d.getDate() + 1);
  }

  const today = days[todayStr()] || {};
  return {
    streak: computeStreak(),
    longest: longestStreak(),
    totalTimeMs,
    todayTimeMs: today.timeMs || 0,
    totalVisits,
    totalSolved,
    doneTotal,
    doneByCat,
    solvedByCat,
    visitsByCat,
    series,
    activeDays: Object.keys(days).filter((k) => isActive(days[k])).length,
  };
}

export const CATEGORY_LABELS = {
  dsa: "DSA",
  java: "Java Q&A",
  springboot: "Spring Boot",
  maven: "Maven",
  sql: "SQL",
  roadmap: "Roadmap",
  roles: "Roles",
};
export function categoryLabel(id) { return CATEGORY_LABELS[id] || id; }
