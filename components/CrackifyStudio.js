"use client";
import { useMemo, useState } from "react";
import { CRACKIFY, CRACKIFY_TYPES, CRACKIFY_PATTERNS } from "@/data/crackify";
import { hasSolution } from "@/data/dsa-problems";
import { SheetProblemView } from "@/components/SheetBrowser";

const DIFF = {
  easy: { label: "Easy", cls: "text-emerald-400" },
  medium: { label: "Medium", cls: "text-amber-400" },
  hard: { label: "Hard", cls: "text-rose-400" },
};

const solved = (p) => hasSolution(p.slug) || (p.lcSlug && hasSolution(p.lcSlug));

export default function CrackifyStudio() {
  const [type, setType] = useState("All");
  const [pattern, setPattern] = useState("All");
  const [diff, setDiff] = useState("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);

  const counts = useMemo(() => {
    const c = { easy: 0, medium: 0, hard: 0, solved: 0 };
    for (const p of CRACKIFY) { c[p.difficulty]++; if (solved(p)) c.solved++; }
    return c;
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return CRACKIFY.filter((p) => {
      if (type !== "All" && p.type !== type) return false;
      if (pattern !== "All" && p.pattern !== pattern) return false;
      if (diff !== "all" && p.difficulty !== diff) return false;
      if (query && !p.name.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [type, pattern, diff, q]);

  if (selected) {
    return <SheetProblemView problem={{ ...selected, _diff: selected.difficulty, topic: selected.pattern, companies: [] }} sheetName="Crackify" onBack={() => setSelected(null)} />;
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        <span className="text-2xl">⚡</span>
        <div>
          <h2 className="text-lg font-bold text-white leading-tight">Crackify · Must-Do 30</h2>
          <div className="text-[11px] text-slate-400">A curated LeetCode starter set — tagged by type, difficulty &amp; pattern. Every one has a full brute → better → optimal walkthrough.</div>
        </div>
      </div>

      <div className="space-y-3 mt-4">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search these 30 problems…"
          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500" />
        <div className="flex flex-wrap gap-2">
          {[["all", `All · ${CRACKIFY.length}`], ["easy", `Easy · ${counts.easy}`], ["medium", `Medium · ${counts.medium}`], ["hard", `Hard · ${counts.hard}`]].filter(([v]) => v !== "hard" || counts.hard > 0).map(([v, label]) => (
            <button key={v} onClick={() => setDiff(v)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${diff === v ? "bg-blue-600 border-blue-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"}`}>{label}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <select value={type} onChange={(e) => setType(e.target.value)}
            className="text-xs px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500">
            <option value="All">All types</option>
            {CRACKIFY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={pattern} onChange={(e) => setPattern(e.target.value)}
            className="text-xs px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 max-w-[220px]">
            <option value="All">All patterns</option>
            {CRACKIFY_PATTERNS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <span className="text-xs text-slate-400 ml-auto">{filtered.length} shown · <span className="text-emerald-400">✓ {counts.solved} solved</span></span>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        {filtered.length === 0 && <p className="text-center text-slate-500 py-8 text-sm">No problems match these filters.</p>}
        {filtered.map((p, i) => {
          const d = DIFF[p.difficulty];
          return (
            <button key={p.slug + i} onClick={() => setSelected(p)}
              className="w-full text-left bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg px-3 py-2.5 flex items-center gap-3 transition">
              <span className={`text-[11px] font-semibold w-14 flex-shrink-0 ${d ? d.cls : "text-slate-500"}`}>{d ? d.label : "—"}</span>
              <span className="flex-1 min-w-0">
                <span className="text-sm text-slate-100 truncate block">{p.name}</span>
                <span className="text-[11px] text-slate-500 truncate block">{p.type} · {p.pattern}</span>
              </span>
              {solved(p)
                ? <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-700/40 text-emerald-300 flex-shrink-0">✓ solution</span>
                : <span className="text-slate-600 text-sm flex-shrink-0">›</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
