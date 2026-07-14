"use client";
import { useEffect, useMemo, useState } from "react";
import { SQL_PROBLEMS, LEVELS, loadLevelDetails } from "@/data/sql-problems";
import CodeBlock from "@/components/CodeBlock";

const DIFF = {
  easy: { label: "Easy", cls: "text-emerald-400" },
  medium: { label: "Medium", cls: "text-amber-400" },
  hard: { label: "Hard", cls: "text-rose-400" },
};
const TYPE_LABEL = { theory: "Theory", coding: "Coding" };

export default function SqlStudio() {
  const [level, setLevel] = useState("All");
  const [type, setType] = useState("all");
  const [diff, setDiff] = useState("all");
  const [hotOnly, setHotOnly] = useState(false);
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return SQL_PROBLEMS.filter((p) => {
      if (level !== "All" && p.level !== level) return false;
      if (type !== "all" && p.type !== type) return false;
      if (diff !== "all" && p.difficulty !== diff) return false;
      if (hotOnly && !p.hot) return false;
      if (query && !p.title.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [level, type, diff, hotOnly, q]);

  if (selected) return <QuestionView problem={selected} onBack={() => setSelected(null)} />;

  return (
    <div>
      <div className="space-y-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions… (e.g. join, duplicate, window)" className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500" />
        <div className="flex flex-wrap gap-2">
          {[["all", "All types"], ["theory", "📖 Theory"], ["coding", "⌨ Coding"]].map(([v, l]) => (
            <button key={v} onClick={() => setType(v)} className={`text-xs px-3 py-1.5 rounded-full border transition ${type === v ? "bg-blue-600 border-blue-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"}`}>{l}</button>
          ))}
          {[["all", "All"], ["easy", "Easy"], ["medium", "Medium"], ["hard", "Hard"]].map(([v, l]) => (
            <button key={"d" + v} onClick={() => setDiff(v)} className={`text-xs px-3 py-1.5 rounded-full border transition ${diff === v ? "bg-purple-600 border-purple-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"}`}>{l}</button>
          ))}
          <button onClick={() => setHotOnly((v) => !v)} className={`text-xs px-3 py-1.5 rounded-full border transition ${hotOnly ? "bg-amber-500/20 border-amber-500 text-amber-300" : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"}`}>★ Mostly asked</button>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <select value={level} onChange={(e) => setLevel(e.target.value)} className="text-xs px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500">
            <option value="All">All experience levels</option>
            {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <span className="text-xs text-slate-400 ml-auto">{filtered.length} questions</span>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        {filtered.length === 0 && <p className="text-center text-slate-500 py-8 text-sm">No questions match these filters.</p>}
        {filtered.map((p) => {
          const d = DIFF[p.difficulty];
          return (
            <button key={p.key} onClick={() => setSelected(p)} className="w-full text-left bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg px-3 py-2.5 flex items-center gap-3 transition">
              <span className={`text-[11px] font-semibold w-14 flex-shrink-0 ${d.cls}`}>{d.label}</span>
              <span className="flex-1 min-w-0">
                <span className="text-sm text-slate-100 flex items-center gap-1.5">
                  {p.hot && <span title="Mostly asked" className="text-amber-400">★</span>}
                  <span className="break-words">{p.title}</span>
                </span>
                <span className="text-[11px] text-slate-500">{p.level} · {TYPE_LABEL[p.type]}</span>
              </span>
              <span className="text-slate-500 text-sm flex-shrink-0">›</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function QuestionView({ problem, onBack }) {
  const d = DIFF[problem.difficulty];
  const [details, setDetails] = useState(undefined);

  useEffect(() => {
    let mounted = true;
    setDetails(undefined);
    loadLevelDetails(problem.level).then((map) => { if (mounted) setDetails(map[problem.id] || null); });
    return () => { mounted = false; };
  }, [problem]);

  return (
    <div>
      <button onClick={onBack} className="text-sm text-blue-400 hover:underline mb-3">← All questions</button>
      <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4 sm:p-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-2 flex-wrap">
          {problem.hot && <span className="text-amber-400" title="Mostly asked">★</span>}
          <h2 className="text-lg font-bold text-white">{problem.title}</h2>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs">
          <span className={`font-semibold ${d.cls}`}>{d.label}</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">{TYPE_LABEL[problem.type]}</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">{problem.level}</span>
        </div>

        <div className="mt-4 space-y-3">
          {details === undefined && <div className="text-sm text-slate-500 animate-pulse">Loading answer…</div>}
          {details === null && (
            <div className="text-sm text-slate-400">
              <p className="font-semibold text-slate-300 mb-1">Answer coming soon</p>
              <p>A clear explanation with SQL and a demo table is being added for this question. It's being filled in level by level.</p>
              <a href={`https://www.google.com/search?q=${encodeURIComponent(problem.title + " SQL")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:border-blue-500 hover:text-blue-300 transition">🔍 Learn more</a>
            </div>
          )}
          {details && details.answer.map((b, i) => <AnswerBlock key={i} b={b} />)}
          {details && details.oneLiner && (
            <div className="mt-3 bg-slate-950/60 border border-slate-700 rounded-lg p-3">
              <div className="text-xs font-semibold text-slate-400 mb-1">🎤 In one line</div>
              <p className="text-sm text-slate-300 italic">{details.oneLiner}</p>
            </div>
          )}
          {details && (
            <a href={`https://www.google.com/search?q=${encodeURIComponent(problem.title + " SQL")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-1 text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:border-blue-500 hover:text-blue-300 transition">🔍 Learn more</a>
          )}
        </div>
      </div>
    </div>
  );
}

function AnswerBlock({ b }) {
  if (b.kind === "text") return <p className="text-sm text-slate-300 leading-relaxed">{b.text}</p>;
  if (b.kind === "sql") return <CodeBlock lines={b.lines} />;
  if (b.kind === "table") {
    return (
      <div>
        {b.title && <div className="text-xs font-semibold text-cyan-400 mb-1">{b.title}</div>}
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead><tr>{b.headers.map((h, i) => <th key={i} className="text-left font-semibold text-slate-300 border border-slate-700 px-2 py-1 bg-slate-900/60">{h}</th>)}</tr></thead>
            <tbody>{b.rows.map((r, ri) => <tr key={ri}>{r.map((c, ci) => <td key={ci} className="border border-slate-700 px-2 py-1 text-slate-300 font-mono">{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>
    );
  }
  return null;
}
