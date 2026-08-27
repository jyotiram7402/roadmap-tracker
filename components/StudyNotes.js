"use client";
import { useEffect, useState } from "react";
import { ChevronDown, Sparkles, Check } from "@/components/icons";

// The 8 study angles a user fills in themselves for a DSA problem.
const FIELDS = [
  { id: "explain", label: "Easy explanation of the problem", ph: "Explain the problem in your own simple words — like you'd tell a friend…" },
  { id: "algorithm", label: "Algorithm", ph: "The step-by-step algorithm (numbered steps)…" },
  { id: "pattern", label: "Pattern", ph: "Which pattern is this? (two pointers, sliding window, hashing, greedy…)" },
  { id: "idea", label: "Main Idea", ph: "The core insight / trick that makes it work…" },
  { id: "dryrun", label: "Proper dry run", ph: "Walk through a sample input step by step, tracking the variables…" },
  { id: "stream", label: "Java Stream API", ph: "A Java Streams / functional version of the solution…" },
  { id: "followups", label: "Interview Follow-Up Questions", ph: "Likely follow-ups (edge cases, scaling, variants) and your answers…" },
  { id: "explainInterview", label: "How to Explain in an Interview", ph: "How you'd narrate your approach out loud to an interviewer…" },
];

export default function StudyNotes({ slug }) {
  const storeKey = `crackdev.studynotes.${slug}`;
  const [data, setData] = useState({});
  const [open, setOpen] = useState({});
  const [editing, setEditing] = useState({});
  const [draft, setDraft] = useState({});
  const [aiMsg, setAiMsg] = useState({});

  useEffect(() => {
    let d = {};
    try { d = JSON.parse(localStorage.getItem(storeKey) || "{}"); } catch {}
    setData(d); setOpen({}); setEditing({}); setDraft({}); setAiMsg({});
  }, [storeKey]);

  function persist(next) {
    setData(next);
    try { localStorage.setItem(storeKey, JSON.stringify(next)); } catch {}
  }
  function toggle(id) { setOpen((o) => ({ ...o, [id]: !o[id] })); }
  function startEdit(id) {
    setDraft((d) => ({ ...d, [id]: data[id] || "" }));
    setEditing((e) => ({ ...e, [id]: true }));
    setOpen((o) => ({ ...o, [id]: true }));
  }
  function save(id) {
    const v = (draft[id] || "").trim();
    const next = { ...data };
    if (v) next[id] = v; else delete next[id];
    persist(next);
    setEditing((e) => ({ ...e, [id]: false }));
  }
  function cancel(id) { setEditing((e) => ({ ...e, [id]: false })); }
  function del(id) {
    const next = { ...data }; delete next[id]; persist(next);
    setEditing((e) => ({ ...e, [id]: false }));
  }
  function genAi(id) {
    setAiMsg((m) => ({ ...m, [id]: true }));
    setOpen((o) => ({ ...o, [id]: true }));
  }

  const filled = FIELDS.reduce((n, f) => n + (data[f.id] ? 1 : 0), 0);
  const btnGhost = "inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-[#1c1c20] border border-white/[0.08] text-zinc-300 hover:text-white hover:border-white/[0.18] transition";

  return (
    <div className="mt-4 rounded-2xl border border-white/[0.06] bg-[#18181b] overflow-hidden">
      <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-lg grid place-items-center bg-fuchsia-500/12 text-fuchsia-300 flex-shrink-0"><Sparkles size={16} /></span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-white">Master this problem</div>
          <div className="text-[11px] text-zinc-500">Write your own notes for each part · saved on this device</div>
        </div>
        <span className="text-[11px] font-semibold text-zinc-400 flex-shrink-0">{filled}/{FIELDS.length}</span>
      </div>

      <div className="divide-y divide-white/[0.06]">
        {FIELDS.map((f, i) => {
          const val = data[f.id];
          const isOpen = !!open[f.id];
          const isEditing = !!editing[f.id];
          const showEditor = isEditing || !val;
          return (
            <div key={f.id}>
              <button onClick={() => toggle(f.id)} aria-expanded={isOpen}
                className="w-full flex items-center gap-3 px-3 sm:px-4 py-3 text-left hover:bg-[#1f1f23] transition">
                <span className={`w-6 h-6 rounded-full grid place-items-center text-[11px] font-bold flex-shrink-0 ${val ? "bg-emerald-500/15 text-emerald-400" : "bg-white/[0.06] text-zinc-400"}`}>{i + 1}</span>
                <span className="flex-1 min-w-0 text-[13.5px] font-semibold text-zinc-100">{f.label}</span>
                {val && <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" title="You've written this" />}
                <ChevronDown size={16} className={`text-zinc-500 flex-shrink-0 transition-transform duration-200 ${isOpen ? "" : "-rotate-90"}`} />
              </button>

              {isOpen && (
                <div className="px-3 sm:px-4 pb-4 anim-fade-in">
                  {aiMsg[f.id] && (
                    <div className="mb-3 rounded-lg border border-amber-600/30 bg-amber-500/10 p-2.5 text-[12.5px] text-zinc-200 flex items-start gap-2">
                      <span className="flex-shrink-0">🚧</span>
                      <span>AI generation is <b className="text-amber-300">under development</b> — we&apos;ll build this soon. For now, write your own answer below.</span>
                    </div>
                  )}

                  {showEditor ? (
                    <>
                      <textarea
                        value={draft[f.id] ?? val ?? ""}
                        onChange={(e) => setDraft((d) => ({ ...d, [f.id]: e.target.value }))}
                        rows={5} placeholder={f.ph}
                        className="w-full px-3 py-2 bg-[#141417] border border-white/[0.1] rounded-lg text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/60 resize-y leading-relaxed"
                      />
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <button onClick={() => save(f.id)} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition">
                          <Check size={14} /> Save
                        </button>
                        {val && <button onClick={() => cancel(f.id)} className={btnGhost}>Cancel</button>}
                        <button onClick={() => genAi(f.id)} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-fuchsia-500/15 border border-fuchsia-600/30 text-fuchsia-300 hover:bg-fuchsia-500/25 transition sm:ml-auto">
                          <Sparkles size={14} /> Generate with AI
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="rounded-lg bg-[#141417] border border-white/[0.06] p-3 text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed">{val}</div>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <button onClick={() => startEdit(f.id)} className={btnGhost}>✏️ Edit</button>
                        <button onClick={() => del(f.id)} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-[#1c1c20] border border-white/[0.08] text-rose-300 hover:text-rose-200 hover:border-rose-700/50 transition">🗑 Delete</button>
                        <button onClick={() => genAi(f.id)} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-fuchsia-500/15 border border-fuchsia-600/30 text-fuchsia-300 hover:bg-fuchsia-500/25 transition sm:ml-auto">
                          <Sparkles size={14} /> Generate with AI
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
