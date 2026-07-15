// lib/quiz-stats.js — per-device Quick Practice stats, stored in localStorage.
// Shape: { [subjectId]: { attempted: number, correct: number } }

const KEY = "crackify.quiz.stats";

export function loadQuizStats() {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
}

export function recordAnswer(subject, correct) {
  const s = loadQuizStats();
  s[subject] = s[subject] || { attempted: 0, correct: 0 };
  s[subject].attempted++;
  if (correct) s[subject].correct++;
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
  return s;
}

export function resetQuizStats() {
  try { localStorage.removeItem(KEY); } catch {}
  return {};
}

export function totalCorrect(stats) {
  return Object.values(stats || {}).reduce((n, x) => n + (x.correct || 0), 0);
}
export function totalAttempted(stats) {
  return Object.values(stats || {}).reduce((n, x) => n + (x.attempted || 0), 0);
}
export function accuracy(stats) {
  const a = totalAttempted(stats);
  return a ? Math.round((totalCorrect(stats) / a) * 100) : 0;
}
