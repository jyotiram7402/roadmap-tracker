"use client";
import { useEffect, useMemo, useState } from "react";
import { difficultyForSlug, hasSolution, loadSolutionBySlug } from "@/data/dsa-problems";
import CodeBlock from "@/components/CodeBlock";
import MySolution from "@/components/MySolution";

const DIFF = {
  easy: { label: "Easy", cls: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-700/40" },
  medium: { label: "Medium", cls: "text-amber-400", bg: "bg-amber-500/10 border-amber-700/40" },
  hard: { label: "Hard", cls: "text-rose-400", bg: "bg-rose-500/10 border-rose-700/40" },
};

const SHEET_STYLE = {
  "apna-375": { emoji: "🎓", grad: "from-sky-500/20 to-blue-600/10", ring: "border-sky-700/50" },
  "arsh-280": { emoji: "⚡", grad: "from-violet-500/20 to-purple-600/10", ring: "border-violet-700/50" },
  "babbar-450": { emoji: "💗", grad: "from-rose-500/20 to-pink-600/10", ring: "border-rose-700/50" },
  "siddharth-450": { emoji: "🔥", grad: "from-amber-500/20 to-orange-600/10", ring: "border-amber-700/50" },
};

// effective difficulty for a sheet problem: sheet's own, else our worked catalog
function effDiff(p) {
  return p.difficulty || difficultyForSlug(p.slug) || (p.lcSlug ? difficultyForSlug(p.lcSlug) : null) || null;
}
function practiceLink(p) {
  if (p.link) return p.link;
  return `https://leetcode.com/problemset/?search=${encodeURIComponent(p.name)}`;
}

export default function SheetBrowser() {
  const [sheets, setSheets] = useState(undefined); // undefined = loading
  const [sheetId, setSheetId] = useState(null);
  const [topic, setTopic] = useState("All");
  const [diff, setDiff] = useState("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let mounted = true;
    import("@/data/dsa-sheets").then((m) => { if (mounted) setSheets(m.SHEETS); });
    return () => { mounted = false; };
  }, []);

  const sheet = useMemo(() => (sheets || []).find((s) => s.id === sheetId) || null, [sheets, sheetId]);

  // flat, difficulty-enriched problem list for the active sheet
  const allProblems = useMemo(() => {
    if (!sheet) return [];
    const out = [];
    for (const t of sheet.topics) for (const p of t.problems) out.push({ ...p, topic: t.topic, _diff: effDiff(p), _solved: hasSolution(p.slug) || (p.lcSlug && hasSolution(p.lcSlug)) });
    return out;
  }, [sheet]);

  const topicNames = useMemo(() => (sheet ? sheet.topics.map((t) => t.topic) : []), [sheet]);

  const counts = useMemo(() => {
    const c = { easy: 0, medium: 0, hard: 0, solved: 0 };
    for (const p of allProblems) { if (p._diff) c[p._diff]++; if (p._solved) c.solved++; }
    return c;
  }, [allProblems]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return allProblems.filter((p) => {
      if (topic !== "All" && p.topic !== topic) return false;
      if (diff !== "all" && p._diff !== diff) return false;
      if (query && !p.name.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [allProblems, topic, diff, q]);

  // group filtered by topic (preserve sheet order)
  const grouped = useMemo(() => {
    const map = new Map();
    for (const p of filtered) { if (!map.has(p.topic)) map.set(p.topic, []); map.get(p.topic).push(p); }
    return [...map.entries()];
  }, [filtered]);

  function openSheet(id) { setSheetId(id); setTopic("All"); setDiff("all"); setQ(""); setSelected(null); }

  if (selected) return <SheetProblemView problem={selected} sheetName={sheet?.name} onBack={() => setSelected(null)} />;

  // ---- loading ----
  if (sheets === undefined) return <div className="text-sm text-zinc-500 animate-pulse py-8 text-center">Loading DSA sheets…</div>;

  // ---- sheet picker ----
  if (!sheet) {
    return (
      <div>
        <p className="text-sm text-zinc-400 mb-4">
          Pick a famous DSA sheet. Each is grouped by topic with difficulty filters — click any problem for a full
          <span className="text-zinc-200"> brute → better → optimal</span> Java walkthrough where we&apos;ve worked it out.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {sheets.map((s) => {
            const st = SHEET_STYLE[s.id] || { emoji: "📄", grad: "from-white/[0.05] to-transparent", ring: "border-white/[0.06]" };
            const solved = s.topics.reduce((n, t) => n + t.problems.filter((p) => hasSolution(p.slug) || (p.lcSlug && hasSolution(p.lcSlug))).length, 0);
            return (
              <button key={s.id} onClick={() => openSheet(s.id)}
                className={`text-left rounded-xl border ${st.ring} bg-gradient-to-br ${st.grad} hover:brightness-110 transition p-4`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{st.emoji}</span>
                  <div className="min-w-0">
                    <div className="text-white font-semibold truncate">{s.name}</div>
                    <div className="text-[11px] text-zinc-400">by {s.author}</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 flex-wrap text-[11px]">
                  <span className="px-2 py-0.5 rounded-full bg-[#141417]/70 border border-white/[0.06] text-zinc-300">{s.count} problems</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#141417]/70 border border-white/[0.06] text-zinc-300">{s.topics.length} topics</span>
                  {solved > 0 && <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-700/40 text-emerald-300">✓ {solved} full solutions</span>}
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-zinc-500 mt-4">
          Problem lists are compiled from the public <span className="text-zinc-400">All-DSA-Sheets</span> collection; solutions &amp; explanations are original.
        </p>
      </div>
    );
  }

  // ---- sheet detail (problem list) ----
  return (
    <div>
      <button onClick={() => setSheetId(null)} className="text-sm text-blue-400 hover:underline mb-3">← All sheets</button>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{(SHEET_STYLE[sheet.id] || {}).emoji || "📄"}</span>
        <div>
          <h2 className="text-lg font-bold text-white leading-tight">{sheet.name}</h2>
          <div className="text-[11px] text-zinc-400">by {sheet.author} · {sheet.count} problems · {sheet.topics.length} topics</div>
        </div>
      </div>

      <div className="space-y-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search this sheet…"
          className="w-full px-3 py-2 bg-[#141417] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/60" />
        <div className="flex flex-wrap gap-2">
          {[["all", "All"], ["easy", `Easy · ${counts.easy}`], ["medium", `Medium · ${counts.medium}`], ["hard", `Hard · ${counts.hard}`]].map(([v, label]) => (
            <button key={v} onClick={() => setDiff(v)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${diff === v ? "bg-blue-600 border-blue-500 text-white" : "bg-[#18181b] border-white/[0.06] text-zinc-400 hover:border-white/[0.14] hover:text-zinc-200"}`}>{label}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <select value={topic} onChange={(e) => setTopic(e.target.value)}
            className="text-xs px-3 py-2 bg-[#141417] border border-white/[0.08] rounded-lg text-zinc-200 focus:outline-none focus:border-blue-500/60">
            <option value="All">All topics</option>
            {topicNames.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <span className="text-xs text-zinc-400 ml-auto">{filtered.length} shown · <span className="text-emerald-400">✓ {counts.solved} solved</span></span>
        </div>
      </div>

      <div className="mt-4 space-y-5">
        {grouped.length === 0 && <p className="text-center text-zinc-500 py-8 text-sm">No problems match these filters.</p>}
        {grouped.map(([tname, probs]) => (
          <div key={tname}>
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-sm font-semibold text-zinc-200">{tname}</h3>
              <span className="text-[11px] text-zinc-500">{probs.length}</span>
              <div className="flex-1 h-px bg-[#1c1c20]" />
            </div>
            <div className="space-y-1.5">
              {probs.map((p, i) => {
                const d = p._diff ? DIFF[p._diff] : null;
                return (
                  <button key={p.slug + i} onClick={() => setSelected(p)}
                    className="w-full text-left bg-[#18181b] hover:bg-[#1f1f23] border border-white/[0.06] hover:border-white/[0.14] rounded-lg px-3 py-2.5 flex items-center gap-3 transition">
                    <span className={`text-[11px] font-semibold w-14 flex-shrink-0 ${d ? d.cls : "text-zinc-500"}`}>{d ? d.label : "—"}</span>
                    <span className="flex-1 min-w-0">
                      <span className="text-sm text-zinc-100 truncate block">{p.name}</span>
                      {p.companies && p.companies.length > 0 && (
                        <span className="text-[11px] text-zinc-500 truncate block">🏢 {Array.isArray(p.companies) ? p.companies.slice(0, 3).join(", ") : p.companies}</span>
                      )}
                    </span>
                    {p._solved
                      ? <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-700/40 text-emerald-300 flex-shrink-0">✓ solution</span>
                      : <span className="text-zinc-600 text-sm flex-shrink-0">›</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SheetProblemView({ problem, sheetName, onBack }) {
  const d = problem._diff ? DIFF[problem._diff] : null;
  const [sol, setSol] = useState(undefined); // undefined = loading, null = none
  const [ai, setAi] = useState(0);
  const companies = Array.isArray(problem.companies) ? problem.companies : (problem.companies ? [problem.companies] : []);

  useEffect(() => {
    let mounted = true;
    setSol(undefined); setAi(0);
    loadSolutionBySlug(problem.slug, problem.lcSlug).then((s) => { if (mounted) setSol(s || null); });
    return () => { mounted = false; };
  }, [problem]);

  const approaches = sol?.approaches || [];
  const ap = approaches[Math.min(ai, Math.max(0, approaches.length - 1))];
  const title = sol?._title || problem.name;

  return (
    <div>
      <button onClick={onBack} className="text-sm text-blue-400 hover:underline mb-3">← {sheetName || "Back"}</button>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* LEFT: statement */}
        <div className="bg-[#18181b] border border-white/[0.06] rounded-xl p-4 lg:max-h-[75vh] lg:overflow-y-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-bold text-white">{title}</h2>
            {d && <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${d.bg} ${d.cls}`}>{d.label}</span>}
          </div>
          <div className="mt-1 text-xs text-zinc-400">{problem.topic}{sheetName ? ` · ${sheetName}` : ""}</div>

          {companies.length > 0 && (
            <div className="mt-3 text-[11px] text-zinc-400">
              <span className="text-zinc-500">🏢 Asked at:</span> {companies.join(", ")}
            </div>
          )}

          {sol === undefined ? (
            <div className="mt-4 text-sm text-zinc-500 animate-pulse">Loading solution…</div>
          ) : sol ? (
            <>
              <p className="mt-4 text-sm text-zinc-200 leading-relaxed">{sol.statement}</p>
              {sol.examples?.map((ex, i) => (
                <div key={i} className="mt-3 bg-[#141417] border border-white/[0.06] rounded-lg p-3 text-sm">
                  <div className="text-xs font-semibold text-zinc-400 mb-1">Example {i + 1}</div>
                  <div><span className="text-zinc-400">Input: </span><span className="font-mono text-zinc-200">{ex.input}</span></div>
                  <div><span className="text-zinc-400">Output: </span><span className="font-mono text-emerald-300">{ex.output}</span></div>
                  {ex.explanation && <div className="text-zinc-400 mt-1">{ex.explanation}</div>}
                </div>
              ))}
            </>
          ) : (
            <div className="mt-4 text-sm text-zinc-400 leading-relaxed">
              <p>This problem is part of the <span className="text-zinc-200">{sheetName}</span> sheet. A full brute → better → optimal
              Java breakdown with dry-run tables is being added. In the meantime, open it on the practice site and solve it there.</p>
              <p className="mt-2 text-zinc-500">Tip: many classic problems already have complete solutions under the <span className="text-zinc-300">“Problems”</span> tab.</p>
            </div>
          )}

          <a href={practiceLink(problem)} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 text-xs px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-700/50 text-amber-300 hover:bg-amber-500/20 transition">
            🟠 Open practice link
          </a>
        </div>

        {/* RIGHT: approaches */}
        <div className="bg-[#18181b] border border-white/[0.06] rounded-xl p-4 lg:max-h-[75vh] lg:overflow-y-auto">
          {approaches.length > 0 ? (
            <>
              <div className="flex gap-2 flex-wrap sticky top-0 bg-[#1c1c20]/40 pb-2 -mt-1">
                {approaches.map((a, i) => (
                  <button key={i} onClick={() => setAi(i)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition ${ai === i ? "bg-blue-600 border-blue-500 text-white" : "bg-[#141417] border-white/[0.06] text-zinc-400 hover:border-white/[0.14] hover:text-zinc-200"}`}>{a.name}</button>
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
                        <thead><tr>{ap.dryRun.headers.map((h, i) => <th key={i} className="text-left font-semibold text-zinc-300 border border-white/[0.06] px-2 py-1 bg-[#141417]/60">{h}</th>)}</tr></thead>
                        <tbody>{ap.dryRun.rows.map((row, ri) => (<tr key={ri}>{row.map((cell, ci) => <td key={ci} className="border border-white/[0.06] px-2 py-1 text-zinc-300 font-mono">{cell}</td>)}</tr>))}</tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
              {sol.oneLiner && (
                <div className="mt-4 bg-[#141417] border border-white/[0.06] rounded-lg p-3">
                  <div className="text-xs font-semibold text-zinc-400 mb-1">🎤 Interview one-liner</div>
                  <p className="text-sm text-zinc-300 italic">{sol.oneLiner}</p>
                </div>
              )}
            </>
          ) : sol === undefined ? (
            <div className="text-sm text-zinc-500 animate-pulse">Loading approaches…</div>
          ) : (
            <div className="text-sm text-zinc-400">
              <p className="font-semibold text-zinc-300 mb-2">Approaches coming soon</p>
              <p>We&apos;re filling in Brute → Better → Optimal Java solutions with dry-run tables across all sheet problems. Practice this one on the site linked on the left for now.</p>
            </div>
          )}
        </div>
      </div>

      <MySolution slug={problem.slug} category="dsa" title={problem.name} />
    </div>
  );
}
