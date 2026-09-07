

const META_KEY = "crackdev.sync.meta";
const EXACT = ["crackany.activity.items", "crackany.activity.days"];
const PREFIX = ["crackdev.studynotes.", "dsa-solution-code:", "dsa-solution:", "crackdev.switch."];

function lget(k) { try { return localStorage.getItem(k); } catch { return null; } }
function lset(k, v) { try { localStorage.setItem(k, v); } catch {} }
function jparse(s) { try { return JSON.parse(s); } catch { return null; } }
function jget(k) { return jparse(lget(k)); }
function emit() { try { window.dispatchEvent(new Event("activity-change")); } catch {} }

function syncableKeys() {
  const keys = new Set(EXACT.filter((k) => lget(k) != null));
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && PREFIX.some((p) => k.startsWith(p))) keys.add(k);
    }
  } catch {}
  return [...keys];
}

const maxDate = (a, b) => (!a ? b : !b ? a : a > b ? a : b);
const minDate = (a, b) => (!a ? b : !b ? a : a < b ? a : b);
function maxMap(a, b) {
  const out = { ...(a || {}) };
  for (const [k, v] of Object.entries(b || {})) out[k] = Math.max(out[k] || 0, v || 0);
  return out;
}

function mergeItems(a, b) {
  const out = { ...(a || {}) };
  for (const [k, v] of Object.entries(b || {})) {
    const o = out[k];
    if (!o) { out[k] = v; continue; }
    out[k] = {
      ...o, ...v,
      done: !!(o.done || v.done),
      bookmarked: !!(o.bookmarked || v.bookmarked),
      visits: Math.max(o.visits || 0, v.visits || 0),
      doneDate: o.doneDate || v.doneDate,
      firstVisit: minDate(o.firstVisit, v.firstVisit),
      lastVisit: maxDate(o.lastVisit, v.lastVisit),
      title: o.title || v.title,
      category: o.category || v.category,
    };
  }
  return out;
}

function mergeDays(a, b) {
  const out = { ...(a || {}) };
  for (const [d, v] of Object.entries(b || {})) {
    const o = out[d];
    if (!o) { out[d] = v; continue; }
    out[d] = {
      opens: Math.max(o.opens || 0, v.opens || 0),
      timeMs: Math.max(o.timeMs || 0, v.timeMs || 0),
      visits: Math.max(o.visits || 0, v.visits || 0),
      solved: Math.max(o.solved || 0, v.solved || 0),
      byCat: maxMap(o.byCat, v.byCat),
      solvedByCat: maxMap(o.solvedByCat, v.solvedByCat),
    };
  }
  return out;
}

let _client = null, _uid = null, _timer = null, _busy = false;

async function pullAndMerge() {
  if (!_client || !_uid) return;
  let data;
  try {
    const res = await _client.from("user_kv").select("k,v,updated_at").eq("user_id", _uid);
    if (res.error) { if (res.error.code !== "PGRST205") console.warn("[sync] pull:", res.error.message); return; }
    data = res.data;
  } catch (e) { return; }

  const server = {};
  for (const r of data || []) server[r.k] = r;
  const meta = jget(META_KEY) || {};
  const rows = [];
  let changed = false;

  const keys = new Set([...syncableKeys(), ...Object.keys(server)]);
  for (const k of keys) {
    const localRaw = lget(k);
    const localVal = localRaw != null ? jparse(localRaw) : undefined;
    const srv = server[k];
    const srvMs = srv ? Date.parse(srv.updated_at) : 0;

    if (k === "crackany.activity.items" || k === "crackany.activity.days") {
      const merged = k.endsWith("items") ? mergeItems(localVal, srv && srv.v) : mergeDays(localVal, srv && srv.v);
      const mergedStr = JSON.stringify(merged);
      if (mergedStr !== localRaw) { lset(k, mergedStr); changed = true; }
      rows.push({ user_id: _uid, k, v: merged });
    } else {
      const hasLocal = localVal !== undefined && localVal !== null;
      const adoptServer = srv && (!hasLocal || (meta[k] != null && srvMs > meta[k]));
      if (adoptServer) {
        if (JSON.stringify(srv.v) !== localRaw) { lset(k, JSON.stringify(srv.v)); changed = true; }
        meta[k] = srvMs;
      } else if (hasLocal && (!srv || JSON.stringify(srv.v) !== localRaw)) {
        rows.push({ user_id: _uid, k, v: localVal });
      }
    }
  }

  await upsert(rows, meta);
  lset(META_KEY, JSON.stringify(meta));
  if (changed) emit();
}

async function upsert(rows, meta) {
  if (!rows.length) return;
  try {
    const res = await _client.from("user_kv").upsert(rows, { onConflict: "user_id,k" }).select("k,updated_at");
    if (res.error) { if (res.error.code !== "PGRST205") console.warn("[sync] push:", res.error.message); return; }
    for (const r of res.data || []) meta[r.k] = Date.parse(r.updated_at);
  } catch {}
}

async function pushLocal() {
  if (!_client || !_uid || _busy) return;
  _busy = true;
  try {
    const meta = jget(META_KEY) || {};
    const rows = syncableKeys().map((k) => ({ user_id: _uid, k, v: jget(k) }));
    await upsert(rows, meta);
    lset(META_KEY, JSON.stringify(meta));
  } finally { _busy = false; }
}

function schedulePush() {
  clearTimeout(_timer);
  _timer = setTimeout(pushLocal, 1800);
}

export function initSync(client, userId) {
  if (typeof window === "undefined" || !client || !userId) return () => {};
  _client = client; _uid = userId;
  pullAndMerge();
  const onChange = () => schedulePush();
  const onHide = () => { if (document.visibilityState === "hidden") pushLocal(); };
  window.addEventListener("activity-change", onChange);
  document.addEventListener("visibilitychange", onHide);
  return () => {
    clearTimeout(_timer);
    window.removeEventListener("activity-change", onChange);
    document.removeEventListener("visibilitychange", onHide);
    _client = null; _uid = null;
  };
}
