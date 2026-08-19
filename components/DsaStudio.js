"use client";
import { useEffect, useMemo, useState } from "react";
import { DSA_PROBLEMS, PHASES, ALL_COMPANIES, loadPhaseDetails } from "@/data/dsa-problems";
import CodeBlock from "@/components/CodeBlock";
import MySolution from "@/components/MySolution";
import QuestionTable from "@/components/QuestionTable";

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
          className="w-full px-3 py-2 bg-[#141417] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/60"
        />
        <div className="flex flex-wrap gap-2">
          {[["all", `All`], ["easy", `Easy · ${counts.easy}`], ["medium", `Medium · ${counts.medium}`], ["hard", `Hard · ${counts.hard}`]].map(([v, label]) => (
            <button key={v} onClick={() => setDiff(v)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${diff === v ? "bg-blue-600 border-blue-500 text-white" : "bg-[#18181b] border-white/[0.06] text-zinc-400 hover:border-white/[0.14] hover:text-zinc-200"}`}>
              {label}
            </button>
          ))}
          <button onClick={() => setHotOnly((v) => !v)}
            className={`text-xs px-3 py-1.5 rounded-full border transition ${hotOnly ? "bg-amber-500/20 border-amber-500 text-amber-300" : "bg-[#18181b] border-white/[0.06] text-zinc-400 hover:border-white/[0.14] hover:text-zinc-200"}`}>
            ★ Most asked
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <select value={phase} onChange={(e) => setPhase(e.target.value)} className="text-xs px-3 py-2 bg-[#141417] border border-white/[0.08] rounded-lg text-zinc-200 focus:outline-none focus:border-blue-500/60">
            <option value="All">All topics</option>
            {PHASES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={company} onChange={(e) => setCompany(e.target.value)} className="text-xs px-3 py-2 bg-[#141417] border border-white/[0.08] rounded-lg text-zinc-200 focus:outline-none focus:border-blue-500/60">
            <option value="All">All companies</option>
            {ALL_COMPANIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <span className="text-xs text-zinc-400 self-center ml-auto">{filtered.length} problems</span>
        </div>
      </div>

      {/* list */}
      <div className="mt-4">
        <QuestionTable
          items={filtered}
          category="dsa"
          onOpen={setSelected}
          getMeta={(p) => `${p.phase}${p.companies.length ? ` · ${p.companies.slice(0, 2).join(", ")}${p.companies.length > 2 ? ` +${p.companies.length - 2}` : ""}` : ""}`}
        />
      </div>
    </div>
  );
}

function ProblemView({ problem, onBack }) {
  const d = DIFF[problem.difficulty];
  const [details, setDetails] = useState(undefined); // undefined = loading, null = none yet
  const [ai, setAi] = useState(0);

  useEffect(() => {
    let mounted = true;
    setDetails(undefined);
    setAi(0);
    loadPhaseDetails(problem.phase).then((map) => {
      if (mounted) setDetails(map[problem.id] || null);
    });
    return () => { mounted = false; };
  }, [problem]);

  const approaches = details?.approaches || [];
  const ap = approaches[Math.min(ai, Math.max(0, approaches.length - 1))];

  return (
    <div>
      <button onClick={onBack} className="text-sm text-blue-400 hover:underline mb-3">← All problems</button>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* LEFT: statement */}
        <div className="bg-[#18181b] border border-white/[0.06] rounded-xl p-4 lg:max-h-[75vh] lg:overflow-y-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-bold text-white">{problem.title}</h2>
            {problem.hot && <span className="text-amber-400" title="Frequently asked">★</span>}
            <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${d.bg} ${d.cls}`}>{d.label}</span>
          </div>
          <div className="mt-1 text-xs text-zinc-400">{problem.phase}</div>

          {problem.companies.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {problem.companies.map((c) => (
                <span key={c} className="text-[11px] px-2 py-0.5 rounded-full bg-[#141417] border border-white/[0.06] text-zinc-300">🏢 {c}</span>
              ))}
            </div>
          )}

          {details === undefined ? (
            <div className="mt-4 text-sm text-zinc-500 animate-pulse">Loading problem…</div>
          ) : details ? (
            <>
              <p className="mt-4 text-sm text-zinc-200 leading-relaxed">{details.statement}</p>
              {details.examples?.map((ex, i) => (
                <div key={i} className="mt-3 bg-[#141417] border border-white/[0.06] rounded-lg p-3 text-sm">
                  <div className="text-xs font-semibold text-zinc-400 mb-1">Example {i + 1}</div>
                  <div><span className="text-zinc-400">Input: </span><span className="font-mono text-zinc-200">{ex.input}</span></div>
                  <div><span className="text-zinc-400">Output: </span><span className="font-mono text-emerald-300">{ex.output}</span></div>
                  {ex.explanation && <div className="text-zinc-400 mt-1">{ex.explanation}</div>}
                </div>
              ))}
              {details.similar && (
                <div className="mt-4">
                  <div className="text-xs font-semibold text-zinc-400 mb-1">Similar problems</div>
                  <ul className="text-xs text-zinc-400 space-y-0.5">
                    {details.similar.map((s, i) => <li key={i}>· {s[0]} — {s[1]} <span className="text-zinc-600">({s[2]})</span></li>)}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="mt-4 text-sm text-zinc-400">
              <p>Read the full problem statement and examples on LeetCode. A detailed brute → better → optimal breakdown with dry-run tables is being added for this problem.</p>
            </div>
          )}

          <a href={problem.leetcode} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 text-xs px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-700/50 text-amber-300 hover:bg-amber-500/20 transition">
            🟠 Open on LeetCode
          </a>
        </div>

        {/* RIGHT: approaches */}
        <div className="bg-[#18181b] border border-white/[0.06] rounded-xl p-4 lg:max-h-[75vh] lg:overflow-y-auto">
          {approaches.length > 0 ? (
            <>
              <div className="flex gap-2 flex-wrap sticky top-0 bg-[#1c1c20]/40 pb-2 -mt-1">
                {approaches.map((a, i) => (
                  <button key={i} onClick={() => setAi(i)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition ${ai === i ? "bg-blue-600 border-blue-500 text-white" : "bg-[#141417] border-white/[0.06] text-zinc-400 hover:border-white/[0.14] hover:text-zinc-200"}`}>
                    {a.name}
                  </button>
                ))}
              </div>

              <div className="mt-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-700/40 text-purple-300">Pattern: {ap.pattern}</span>
                  <span className="text-xs text-zinc-400">⏱ {ap.time}</span>
                  <span className="text-xs text-zinc-400">🗄 {ap.space}</span>
                </div>
                <p className="mt-3 text-sm text-zinc-300 leading-relaxed">{ap.theory}</p>
                <div className="mt-3"><CodeBlock lines={ap.code} /></div>

                {ap.dryRun && (
                  <div className="mt-4">
                    <div className="text-xs font-semibold text-cyan-400 mb-1">Dry run{ap.dryRun.title ? ` — ${ap.dryRun.title}` : ""}</div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr>{ap.dryRun.headers.map((h, i) => <th key={i} className="text-left font-semibold text-zinc-300 border border-white/[0.06] px-2 py-1 bg-[#141417]/60">{h}</th>)}</tr>
                        </thead>
                        <tbody>
                          {ap.dryRun.rows.map((row, ri) => (
                            <tr key={ri}>{row.map((cell, ci) => <td key={ci} className="border border-white/[0.06] px-2 py-1 text-zinc-300 font-mono">{cell}</td>)}</tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {details.oneLiner && (
                <div className="mt-4 bg-[#141417] border border-white/[0.06] rounded-lg p-3">
                  <div className="text-xs font-semibold text-zinc-400 mb-1">🎤 Interview one-liner</div>
                  <p className="text-sm text-zinc-300 italic">{details.oneLiner}</p>
                </div>
              )}
            </>
          ) : details === undefined ? (
            <div className="text-sm text-zinc-500 animate-pulse">Loading approaches…</div>
          ) : (
            <div className="text-sm text-zinc-400">
              <p className="font-semibold text-zinc-300 mb-2">Approaches coming soon</p>
              <p>The Brute → Better → Optimal solutions with Java code and dry-run tables are being filled in phase by phase. For now, practice this one directly on LeetCode using the button on the left.</p>
            </div>
          )}
        </div>
      </div>

      <MySolution slug={problem.id} category="dsa" title={problem.title} />
    </div>
  );
}
