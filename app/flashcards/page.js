"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { ROADMAP } from "@/data/roadmap";
import { getAllQuestions, qaKey } from "@/lib/study-helpers";
import MermaidDiagram from "@/components/MermaidDiagram";
import CodeBlock from "@/components/CodeBlock";

export default function FlashcardsPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState(null);
  const [stageId, setStageId] = useState("all");
  const [pool, setPool] = useState([]);          // list of question records
  const [order, setOrder] = useState([]);        // shuffled indexes
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [qaProgress, setQaProgress] = useState({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted) return;
      if (!user) { router.push("/login"); return; }
      setUser(user);
      const { data } = await supabase.from("qa_progress").select("qa_key,known").eq("user_id", user.id);
      const m = {};
      (data || []).forEach((r) => { m[r.qa_key] = r.known; });
      if (mounted) { setQaProgress(m); setReady(true); }
    })();
    return () => { mounted = false; };
  }, [router, supabase]);

  // Build pool when stage changes
  useEffect(() => {
    if (!ready) return;
    const raw = stageId === "all"
      ? ROADMAP.flatMap((s) => getAllQuestions(s.id))
      : getAllQuestions(stageId);
    setPool(raw);
    setOrder(shuffle(raw.length));
    setPos(0);
    setFlipped(false);
  }, [stageId, ready]);

  const current = pool[order[pos]];

  const next = useCallback(() => {
    setFlipped(false);
    setPos((p) => (p + 1) % Math.max(1, order.length));
  }, [order.length]);

  const prev = useCallback(() => {
    setFlipped(false);
    setPos((p) => (p - 1 + order.length) % Math.max(1, order.length));
  }, [order.length]);

  const reshuffle = useCallback(() => {
    setOrder(shuffle(pool.length));
    setPos(0);
    setFlipped(false);
  }, [pool.length]);

  async function markKnown(known) {
    if (!current || !user) return;
    const key = qaKey(current.stageId, current.sectionIdx, current.qNum);
    setQaProgress((m) => ({ ...m, [key]: known }));
    await supabase.from("qa_progress").upsert(
      { user_id: user.id, qa_key: key, known, updated_at: new Date().toISOString() },
      { onConflict: "user_id,qa_key" }
    );
    next();
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); setFlipped((f) => !f); }
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "k" || e.key === "K") markKnown(true);
      else if (e.key === "u" || e.key === "U") markKnown(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  if (!ready) return <div className="min-h-screen flex items-center justify-center text-slate-400">Loading…</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <header className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <Link href="/" className="text-sm text-blue-400 hover:underline">← Back</Link>
          <h1 className="text-base sm:text-lg font-bold text-pink-300">🎯 Flashcard Mode</h1>
          <button onClick={reshuffle} title="Re-shuffle" className="text-xs px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded">🔀</button>
        </div>
        <div className="max-w-3xl mx-auto px-4 pb-3">
          <select
            value={stageId}
            onChange={(e) => setStageId(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-pink-500"
          >
            <option value="all">All stages (random across everything)</option>
            {ROADMAP.map((s) => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-4">
        {!current ? (
          <div className="text-center py-12 text-slate-500">No Q&A in this stage yet.</div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-2 text-xs text-slate-400">
              <span>Card {pos + 1} / {pool.length}</span>
              <span className="text-slate-500">Space = flip · ←/→ = nav · K/U = known/unknown</span>
            </div>

            <div
              onClick={() => setFlipped((f) => !f)}
              className={`card-flip cursor-pointer ${flipped ? "flipped" : ""}`}
              style={{ minHeight: "60vh" }}
            >
              <div className="card-flip-inner h-full">
                {/* FRONT */}
                <div className="card-face bg-slate-800/60 border border-slate-700 rounded-2xl p-6 sm:p-10 min-h-[60vh] flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-slate-500 mb-2">Q{current.qNum} · {current.sectionTitle}</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug max-w-2xl">{current.qText}</h2>
                  <p className="text-xs text-slate-500 mt-6">Tap or press Space to reveal answer</p>
                </div>

                {/* BACK */}
                <div className="card-face card-back bg-slate-900/80 border border-pink-700/50 rounded-2xl p-4 sm:p-6 min-h-[60vh] overflow-y-auto">
                  <div className="mb-3 text-xs text-pink-300">A. Q{current.qNum}</div>
                  <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
                    {current.blocks.map((b, i) => {
                      if (b.kind === "text") return <p key={i} className="text-sm text-slate-200 leading-relaxed">{b.text}</p>;
                      if (b.kind === "subheader") return <h5 key={i} className="text-sm font-semibold text-cyan-400 mt-2">{b.text}</h5>;
                      if (b.kind === "code") return <CodeBlock key={i} lines={b.lines} />;
                      if (b.kind === "mermaid") return <MermaidDiagram key={i} code={b.lines.join("\n")} />;
                      if (b.kind === "diagram") return (
                        <pre key={i} className="bg-slate-950 border border-blue-900/50 rounded p-3 overflow-x-auto text-xs">
                          <code className="text-blue-300 font-mono whitespace-pre">{b.lines.join("\n")}</code>
                        </pre>
                      );
                      return null;
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button onClick={() => markKnown(false)} className="px-3 py-2.5 bg-rose-900/40 hover:bg-rose-900/60 border border-rose-800 rounded-lg text-sm text-rose-200">
                ✗ Need to review (U)
              </button>
              <button onClick={() => markKnown(true)} className="px-3 py-2.5 bg-emerald-900/40 hover:bg-emerald-900/60 border border-emerald-800 rounded-lg text-sm text-emerald-200">
                ✓ Got it (K)
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button onClick={prev} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm">← Previous</button>
              <button onClick={next} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm">Next →</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function shuffle(n) {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
