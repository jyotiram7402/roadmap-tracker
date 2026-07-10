"use client";
import { useMemo, useState } from "react";
import { DSA_PROBLEMS, PHASES, ALL_COMPANIES } from "@/data/dsa-problems";
import CodeBlock from "@/components/CodeBlock";

const DIFF = {
  easy: { label: "Easy", cls: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-700/40" },
  medium: { label: "Medium", cls: "text-amber-400", bg: "bg-amber-500/10 border-amber-700/40" },
  hard: { label: "Hard", cls: "text-rose-400", bg: "bg-rose-500/10 border-rose-700/40" },
};

export default function DsaStudio() {
  const [phase, setPhase] = useState("All");
  const [diff, setDiff] = useState("all");
  const [company, setCompany] = useState("All");
  const [hotOnly, setHotOnly] = useState(false);
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return DSA_PROBLEMS.filter((p) => {
      if (phase !== "All" && p.phase !== phase) return false;
      if (diff !== "all" && p.difficulty !== diff) return false;
      if (hotOnly && !p.hot) return false;
      if (company !== "All" && !p.companies.includes(company)) return false;
      if (query && !p.title.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [phase, diff, company, hotOnly, q]);

  const counts = useMemo(() => {
    const c = { easy: 0, medium: 0, hard: 0 };
    for (const p of DSA_PROBLEMS) c[p.difficulty]++;
    return c;
  }, []);

  if (selected) return <ProblemView problem={selected} onBack={() => setSelected(null)} />;

  return (
    <div>
      {/* filters */}
      <div className="space-y-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search problems… (e.g. Two Sum, subarray, tree)"
          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
        />
        <div className="flex flex-wrap gap-2">
          {[["all", `All`], ["easy", `Easy · ${counts.easy}`], ["medium", `Medium · ${counts.medium}`], ["hard", `Hard · ${counts.hard}`]].map(([v, label]) => (
            <button key={v} onClick={() => setDiff(v)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${diff === v ? "bg-blue-600 border-blue-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"}`}>
              {label}
            </button>
          ))}
          <button onClick={() => setHotOnly((v) => !v)}
            className={`text-xs px-3 py-1.5 rounded-full border transition ${hotOnly ? "bg-amber-500/20 border-amber-500 text-amber-300" : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"}`}>
            ★ Most asked
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <select value={phase} onChange={(e) => setPhase(e.target.value)} className="text-xs px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500">
            <option value="All">All topics</option>
            {PHASES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={company} onChange={(e) => setCompany(e.target.value)} className="text-xs px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500">
            <option value="All">All companies</option>
            {ALL_COMPANIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <span className="text-xs text-slate-400 self-center ml-auto">{filtered.length} problems</span>
        </div>
      </div>

      {/* list */}
      <div className="mt-4 space-y-1.5">
        {filtered.length === 0 && <p className="text-center text-slate-500 py-8 text-sm">No problems match these filters.</p>}
        {filtered.map((p) => {
          const d = DIFF[p.difficulty];
          return (
            <button key={p.key} onClick={() => setSelected(p)}
              className="w-full text-left bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg px-3 py-2.5 flex items-center gap-3 transition">
              <span className={`text-[11px] font-semibold w-14 flex-shrink-0 ${d.cls}`}>{d.label}</span>
              <span className="flex-1 min-w-0">
                <span className="text-sm text-slate-100 flex items-center gap-1.5">
                  {p.hot && <span title="Frequently asked" className="text-amber-400">★</span>}
                  <span className="truncate">{p.title}</span>
                  {p.details && <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-700/40 flex-shrink-0">solved</span>}
                </span>
                <span className="text-[11px] text-slate-500">{p.phase}{p.companies.length ? ` · ${p.companies.slice(0, 2).join(", ")}${p.companies.length > 2 ? ` +${p.companies.length - 2}` : ""}` : ""}</span>
              </span>
              <span className="text-slate-500 text-sm flex-shrink-0">›</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProblemView({ problem, onBack }) {
  const d = DIFF[problem.difficulty];
  const approaches = problem.details?.approaches || [];
  const [ai, setAi] = useState(0);
  const ap = approaches[ai];

  return (
    <div>
      <button onClick={onBack} className="text-sm text-blue-400 hover:underline mb-3">← All problems</button>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* LEFT: statement */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4 lg:max-h-[75vh] lg:overflow-y-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-bold text-white">{problem.title}</h2>
            {problem.hot && <span className="text-amber-400" title="Frequently asked">★</span>}
            <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${d.bg} ${d.cls}`}>{d.label}</span>
          </div>
          <div className="mt-1 text-xs text-slate-400">{problem.phase}</div>

          {problem.companies.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {problem.companies.map((c) => (
                <span key={c} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">🏢 {c}</span>
              ))}
            </div>
          )}

          {problem.details ? (
            <>
              <p className="mt-4 text-sm text-slate-200 leading-relaxed">{problem.details.statement}</p>
              {problem.details.examples?.map((ex, i) => (
                <div key={i} className="mt-3 bg-slate-950/60 border border-slate-700 rounded-lg p-3 text-sm">
                  <div className="text-xs font-semibold text-slate-400 mb-1">Example {i + 1}</div>
                  <div><span className="text-slate-400">Input: </span><span className="font-mono text-slate-200">{ex.input}</span></div>
                  <div><span className="text-slate-400">Output: </span><span className="font-mono text-emerald-300">{ex.output}</span></div>
                  {ex.explanation && <div className="text-slate-400 mt-1">{ex.explanation}</div>}
                </div>
              ))}
              {problem.details.similar && (
                <div className="mt-4">
                  <div className="text-xs font-semibold text-slate-400 mb-1">Similar problems</div>
                  <ul className="text-xs text-slate-400 space-y-0.5">
                    {problem.details.similar.map((s, i) => <li key={i}>· {s[0]} — {s[1]} <span className="text-slate-600">({s[2]})</span></li>)}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="mt-4 text-sm text-slate-400">
              <p>Read the full problem statement and examples on LeetCode. A detailed brute → better → optimal breakdown with dry-run tables is being added for this problem.</p>
            </div>
          )}

          <a href={problem.leetcode} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 text-xs px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-700/50 text-amber-300 hover:bg-amber-500/20 transition">
            🟠 Open on LeetCode
          </a>
        </div>

        {/* RIGHT: approaches */}
        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4 lg:max-h-[75vh] lg:overflow-y-auto">
          {approaches.length > 0 ? (
            <>
              <div className="flex gap-2 flex-wrap sticky top-0 bg-slate-800/40 pb-2 -mt-1">
                {approaches.map((a, i) => (
                  <button key={i} onClick={() => setAi(i)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition ${ai === i ? "bg-blue-600 border-blue-500 text-white" : "bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500"}`}>
                    {a.name}
                  </button>
                ))}
              </div>

              <div className="mt-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-700/40 text-purple-300">Pattern: {ap.pattern}</span>
                  <span className="text-xs text-slate-400">⏱ {ap.time}</span>
                  <span className="text-xs text-slate-400">🗄 {ap.space}</span>
                </div>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">{ap.theory}</p>
                <div className="mt-3"><CodeBlock lines={ap.code} /></div>

                {ap.dryRun && (
                  <div className="mt-4">
                    <div className="text-xs font-semibold text-cyan-400 mb-1">Dry run{ap.dryRun.title ? ` — ${ap.dryRun.title}` : ""}</div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr>{ap.dryRun.headers.map((h, i) => <th key={i} className="text-left font-semibold text-slate-300 border border-slate-700 px-2 py-1 bg-slate-900/60">{h}</th>)}</tr>
                        </thead>
                        <tbody>
                          {ap.dryRun.rows.map((row, ri) => (
                            <tr key={ri}>{row.map((cell, ci) => <td key={ci} className="border border-slate-700 px-2 py-1 text-slate-300 font-mono">{cell}</td>)}</tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {problem.details.oneLiner && (
                <div className="mt-4 bg-slate-950/60 border border-slate-700 rounded-lg p-3">
                  <div className="text-xs font-semibold text-slate-400 mb-1">🎤 Interview one-liner</div>
                  <p className="text-sm text-slate-300 italic">{problem.details.oneLiner}</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-sm text-slate-400">
              <p className="font-semibold text-slate-300 mb-2">Approaches coming soon</p>
              <p>The Brute → Better → Optimal solutions with Java code and dry-run tables are being filled in phase by phase (Arrays first). For now, practice this one directly on LeetCode using the button on the left, and use the search links elsewhere in the app.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
