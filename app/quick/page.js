"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import LiveClock from "@/components/LiveClock";
import { QUIZ_SUBJECTS, QUIZ, buildQuizPool, subjectMeta } from "@/data/quiz";
import { loadQuizStats, recordAnswer, resetQuizStats, totalCorrect, totalAttempted, accuracy } from "@/lib/quiz-stats";

function shuffle(n) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export default function QuickPage() {
  const [subject, setSubject] = useState(null); // null = picker
  const [pool, setPool] = useState([]);
  const [order, setOrder] = useState([]);
  const [pos, setPos] = useState(0);
  const [answered, setAnswered] = useState(null); // chosen option index
  const [stats, setStats] = useState({});
  const [session, setSession] = useState({ attempted: 0, correct: 0 });

  useEffect(() => { setStats(loadQuizStats()); }, []);

  function start(id) {
    const p = buildQuizPool(id);
    setSubject(id);
    setPool(p);
    setOrder(shuffle(p.length));
    setPos(0);
    setAnswered(null);
    setSession({ attempted: 0, correct: 0 });
  }

  const current = pool[order[pos]];

  function choose(i) {
    if (answered !== null || !current) return;
    setAnswered(i);
    const correct = i === current.answer;
    setSession((s) => ({ attempted: s.attempted + 1, correct: s.correct + (correct ? 1 : 0) }));
    setStats(recordAnswer(current.subject, correct));
  }

  function nextQ() {
    setAnswered(null);
    setPos((p) => {
      const np = p + 1;
      if (np >= order.length) { setOrder(shuffle(pool.length)); return 0; }
      return np;
    });
  }

  function resetStats() {
    setStats(resetQuizStats());
    setSession({ attempted: 0, correct: 0 });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 flex flex-col">
      {/* header */}
      <header className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-blue-400 hover:underline whitespace-nowrap">← Dashboard</Link>
          <h1 className="text-base sm:text-lg font-bold flex-1 min-w-0 truncate">⚡ Quick Practice</h1>
          <LiveClock className="hidden sm:flex" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-5 flex-1">
        {/* stats strip */}
        <QuickStats stats={stats} onReset={resetStats} />

        {subject === null ? (
          <SubjectPicker onPick={start} stats={stats} />
        ) : (
          <div className="mt-5">
            <div className="flex items-center justify-between gap-2 mb-3">
              <button onClick={() => setSubject(null)} className="text-sm text-slate-300 hover:text-white">← Change subject</button>
              <span className="text-xs text-slate-400">This session: <span className="text-emerald-400 font-semibold">{session.correct}</span> / {session.attempted} correct</span>
            </div>

            {!current ? (
              <div className="text-center py-16 text-slate-500">No questions here yet.</div>
            ) : (
              <QuestionCard current={current} answered={answered} onChoose={choose} onNext={nextQ} />
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <div className="font-extrabold text-slate-300 mb-1">Crack <span className="gradient-text">Any Job</span></div>
        Quick Practice · your score is saved on this device
      </footer>
    </div>
  );
}

function QuickStats({ stats, onReset }) {
  const attempted = totalAttempted(stats);
  const correct = totalCorrect(stats);
  const acc = accuracy(stats);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatTile label="Solved" value={correct} accent="text-emerald-400" />
      <StatTile label="Attempted" value={attempted} accent="text-blue-400" />
      <StatTile label="Accuracy" value={`${acc}%`} accent="text-purple-400" />
      <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-3 flex flex-col justify-center">
        <button onClick={onReset} className="text-xs px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-rose-300 hover:border-rose-700/50 transition">↺ Reset stats</button>
      </div>
    </div>
  );
}

function StatTile({ label, value, accent }) {
  return (
    <div className="rounded-xl bg-slate-800/50 border border-slate-700 p-3">
      <div className={`text-2xl font-black ${accent}`}>{value}</div>
      <div className="text-[11px] text-slate-400 mt-0.5">{label}</div>
    </div>
  );
}

function SubjectPicker({ onPick, stats }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold text-white">Pick what to practice</h2>
      <p className="text-sm text-slate-400 mt-1">Random MCQs with instant feedback. Get it right and your score goes up; get it wrong and we show the correct answer with a short explanation.</p>
      <div className="mt-4 grid sm:grid-cols-2 gap-3">
        {QUIZ_SUBJECTS.map((s) => {
          const st = stats[s.id] || { attempted: 0, correct: 0 };
          return (
            <button key={s.id} onClick={() => onPick(s.id)}
              className="text-left rounded-xl border border-slate-700 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800 transition p-4 group">
              <div className="flex items-center gap-3">
                <span className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.accent} flex items-center justify-center text-2xl shadow-md`}>{s.icon}</span>
                <div className="min-w-0">
                  <div className="text-white font-semibold">{s.name}</div>
                  <div className="text-[11px] text-slate-400">{QUIZ[s.id].length} questions · {st.correct}/{st.attempted} solved</div>
                </div>
                <span className="ml-auto text-slate-500 group-hover:text-white transition">›</span>
              </div>
            </button>
          );
        })}
        <button onClick={() => onPick("all")}
          className="text-left rounded-xl border border-indigo-700/50 bg-gradient-to-br from-indigo-500/15 to-purple-600/10 hover:brightness-110 transition p-4 sm:col-span-2">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl shadow-md">🎲</span>
            <div>
              <div className="text-white font-semibold">Mixed — all subjects</div>
              <div className="text-[11px] text-slate-400">A shuffle of DSA, SQL, Java &amp; MERN questions</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

function QuestionCard({ current, answered, onChoose, onNext }) {
  const meta = subjectMeta(current.subject);
  const isCorrect = answered !== null && answered === current.answer;
  return (
    <div className="rounded-2xl bg-slate-800/50 border border-slate-700 p-4 sm:p-6">
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <span className={`text-[11px] px-2 py-0.5 rounded-full bg-gradient-to-r ${meta.accent} text-white font-semibold`}>{meta.icon} {meta.name}</span>
        {current.tag && <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">{current.tag}</span>}
      </div>

      <h2 className="text-base sm:text-lg font-semibold text-white leading-snug">{current.q}</h2>
      {current.code && <div className="mt-3"><CodeBlock lines={current.code} /></div>}

      <div className="mt-4 space-y-2">
        {current.options.map((opt, i) => {
          let cls = "bg-slate-900/60 border-slate-700 hover:border-slate-500 text-slate-200";
          if (answered !== null) {
            if (i === current.answer) cls = "bg-emerald-500/15 border-emerald-600 text-emerald-200";
            else if (i === answered) cls = "bg-rose-500/15 border-rose-600 text-rose-200";
            else cls = "bg-slate-900/40 border-slate-800 text-slate-400";
          }
          return (
            <button key={i} onClick={() => onChoose(i)} disabled={answered !== null}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition flex items-center gap-3 ${cls} ${answered !== null ? "cursor-default" : "cursor-pointer"}`}>
              <span className="w-6 h-6 rounded-full border border-current/40 flex items-center justify-center text-xs font-bold flex-shrink-0">{String.fromCharCode(65 + i)}</span>
              <span className="flex-1">{opt}</span>
              {answered !== null && i === current.answer && <span className="text-emerald-400">✓</span>}
              {answered !== null && i === answered && i !== current.answer && <span className="text-rose-400">✗</span>}
            </button>
          );
        })}
      </div>

      {answered !== null && (
        <div className={`mt-4 rounded-xl border p-4 ${isCorrect ? "bg-emerald-500/10 border-emerald-700/50" : "bg-rose-500/10 border-rose-700/50"}`}>
          <div className={`text-sm font-bold ${isCorrect ? "text-emerald-300" : "text-rose-300"}`}>
            {isCorrect ? "✓ Correct!" : "✗ Not quite"}
          </div>
          {!isCorrect && (
            <div className="text-sm text-slate-200 mt-1">
              Correct answer: <span className="font-semibold text-emerald-300">{String.fromCharCode(65 + current.answer)}. {current.options[current.answer]}</span>
            </div>
          )}
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">{current.explain}</p>
          <button onClick={onNext} className="mt-3 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition">Next question →</button>
        </div>
      )}
    </div>
  );
}
