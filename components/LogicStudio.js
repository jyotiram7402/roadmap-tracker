"use client";
import { useEffect, useMemo, useState } from "react";
import CodeBlock from "@/components/CodeBlock";
import MySolution from "@/components/MySolution";
import { isDone } from "@/lib/activity";

const DIFF = {
  easy: { label: "Easy", cls: "text-emerald-400" },
  medium: { label: "Medium", cls: "text-amber-400" },
  hard: { label: "Hard", cls: "text-rose-400" },
};

export default function LogicStudio() {
  const [phases, setPhases] = useState(undefined); // undefined = loading
  const [phaseId, setPhaseId] = useState("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null); // { phase, problem }
  const [doneVersion, setDoneVersion] = useState(0);

  useEffect(() => {
    let ok = true;
    import("@/data/logic-building").then((m) => { if (ok) setPhases(m.LOGIC_PHASES || []); });
    return () => { ok = false; };
  }, []);

  // re-render the "done" ticks when a problem is marked done in the detail view
  useEffect(() => {
    const upd = () => setDoneVersion((v) => v + 1);
    window.addEventListener("activity-change", upd);
    return () => window.removeEventListener("activity-change", upd);
  }, []);

  const total = useMemo(() => (phases || []).reduce((n, p) => n + p.problems.length, 0), [phases]);

  const groups = useMemo(() => {
    if (!phases) return [];
    const query = q.trim().toLowerCase();
    return phases
      .filter((p) => phaseId === "all" || p.id === phaseId)
      .map((p) => ({
        phase: p,
        problems: query ? p.problems.filter((x) => x.title.toLowerCase().includes(query)) : p.problems,
      }))
      .filter((g) => g.problems.length > 0);
  }, [phases, phaseId, q]);

  const shown = useMemo(() => groups.reduce((n, g) => n + g.problems.length, 0), [groups]);

  if (phases === undefined) return <div className="text-center py-16 text-zinc-500 animate-pulse">Loading Logic Building sheet…</div>;

  if (selected) {
    return <LogicProblemView phase={selected.phase} problem={selected.problem} onBack={() => setSelected(null)} />;
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        <span className="text-2xl">🧠</span>
        <div>
          <h2 className="text-lg font-bold text-white leading-tight">Logic Building · {total} problems</h2>
          <div className="text-[11px] text-zinc-400">Master loops &amp; iteration through dry-run thinking — <span className="text-zinc-300">while, do-while, for, break/continue, series &amp; pattern printing</span>. Every problem has a Java solution and a walkthrough.</div>
        </div>
      </div>

      <div className="space-y-3 mt-4">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search all logic problems…"
          className="w-full px-3 py-2 bg-[#141417] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/60" />
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setPhaseId("all")}
            className={`text-xs px-3 py-1.5 rounded-full border transition ${phaseId === "all" ? "bg-blue-600 border-blue-500 text-white" : "bg-[#18181b] border-white/[0.06] text-zinc-400 hover:border-white/[0.14] hover:text-zinc-200"}`}>
            All · {total}
          </button>
          {phases.map((p) => (
            <button key={p.id} onClick={() => setPhaseId(p.id)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${phaseId === p.id ? "bg-blue-600 border-blue-500 text-white" : "bg-[#18181b] border-white/[0.06] text-zinc-400 hover:border-white/[0.14] hover:text-zinc-200"}`}>
              {p.num}. {p.title} · {p.problems.length}
            </button>
          ))}
        </div>
        <div className="text-xs text-zinc-400">{shown} shown</div>
      </div>

      <div className="mt-4 space-y-6">
        {groups.length === 0 && <p className="text-center text-zinc-500 py-8 text-sm">No problems match your search.</p>}
        {groups.map(({ phase, problems }) => (
          <section key={phase.id}>
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-sm font-semibold text-zinc-100">Phase {phase.num} · {phase.title}</h3>
              <span className="text-[11px] text-zinc-500">{problems.length}</span>
              <div className="flex-1 h-px bg-[#1c1c20]" />
            </div>
            {phase.goal && <p className="text-[11px] text-zinc-500 mb-2">{phase.goal}</p>}
            <div className="space-y-1.5">
              {problems.map((p, i) => {
                const d = p.difficulty ? DIFF[p.difficulty] : null;
                const done = isDone("logic", `${phase.id}:${p.slug}`); // doneVersion forces recompute
                return (
                  <button key={phase.id + p.slug} data-v={doneVersion} onClick={() => setSelected({ phase, problem: p })}
                    className="w-full text-left bg-[#18181b] hover:bg-[#1f1f23] border border-white/[0.06] hover:border-white/[0.14] rounded-lg px-3 py-2.5 flex items-center gap-3 transition">
                    <span className="text-xs font-mono text-zinc-500 w-6 flex-shrink-0">{i + 1}</span>
                    <span className="flex-1 min-w-0 text-sm text-zinc-100">{p.title}</span>
                    {d && <span className={`text-[11px] font-semibold flex-shrink-0 ${d.cls}`}>{d.label}</span>}
                    {done
                      ? <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-700/40 text-emerald-300 flex-shrink-0">✓ done</span>
                      : <span className="text-zinc-600 text-sm flex-shrink-0">›</span>}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <p className="text-[11px] text-zinc-500 mt-6">
        Sheet: <span className="text-zinc-400">Logic Building (SamitKnows)</span> · problem list credited to the original; solutions &amp; explanations written here.
      </p>
    </div>
  );
}

function LogicProblemView({ phase, problem, onBack }) {
  const d = problem.difficulty ? DIFF[problem.difficulty] : null;
  return (
    <div>
      <button onClick={onBack} className="text-sm text-blue-400 hover:underline mb-3">← Logic Building</button>
      <div className="bg-[#18181b] border border-white/[0.06] rounded-xl p-4 sm:p-6">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-lg sm:text-xl font-bold text-white">{problem.title}</h2>
          {d && <span className={`text-xs font-semibold px-2 py-0.5 rounded border border-white/[0.08] ${d.cls}`}>{d.label}</span>}
        </div>
        <div className="mt-1 text-xs text-zinc-400">Phase {phase.num} · {phase.title}</div>

        <p className="mt-4 text-sm text-zinc-200 leading-relaxed">{problem.statement}</p>

        {problem.approach && problem.approach.length > 0 && (
          <div className="mt-4">
            <div className="text-xs font-semibold text-cyan-300 mb-1.5">Approach</div>
            <ul className="space-y-1">
              {problem.approach.map((step, i) => (
                <li key={i} className="flex gap-2 text-sm text-zinc-200 leading-relaxed">
                  <span className="text-blue-400 flex-shrink-0">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4">
          <div className="text-xs font-semibold text-zinc-400 mb-1.5">Java solution</div>
          <CodeBlock lines={problem.code} />
        </div>

        {problem.output && (
          <div className="mt-4">
            <div className="text-xs font-semibold text-emerald-300 mb-1">Sample output</div>
            <pre className="bg-[#0c0d12] border border-white/[0.06] rounded p-3 overflow-x-auto text-xs text-emerald-300 font-mono whitespace-pre">{problem.output}</pre>
          </div>
        )}

        {problem.dryRun && (
          <div className="mt-4">
            <div className="text-xs font-semibold text-cyan-400 mb-1">Dry run{problem.dryRun.title ? ` — ${problem.dryRun.title}` : ""}</div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead><tr>{problem.dryRun.headers.map((h, i) => <th key={i} className="text-left font-semibold text-zinc-300 border border-white/[0.06] px-2 py-1 bg-[#141417]/60">{h}</th>)}</tr></thead>
                <tbody>{problem.dryRun.rows.map((row, ri) => (<tr key={ri}>{row.map((cell, ci) => <td key={ci} className="border border-white/[0.06] px-2 py-1 text-zinc-300 font-mono">{cell}</td>)}</tr>))}</tbody>
              </table>
            </div>
          </div>
        )}

        {problem.note && (
          <div className="mt-4 rounded-lg border border-amber-700/40 bg-amber-500/10 p-3">
            <div className="text-[11px] font-semibold text-amber-300 mb-1">📌 Note</div>
            <p className="text-sm text-zinc-200 leading-relaxed">{problem.note}</p>
          </div>
        )}
      </div>

      <MySolution slug={`logic:${phase.id}:${problem.slug}`} category="logic" title={problem.title} />
    </div>
  );
}
