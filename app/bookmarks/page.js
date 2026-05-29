"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { getStageMeta, getStageSections } from "@/lib/study-helpers";
import MermaidDiagram from "@/components/MermaidDiagram";
import CodeBlock from "@/components/CodeBlock";

export default function BookmarksPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openKey, setOpenKey] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted) return;
      if (!user) { router.push("/login"); return; }
      setUser(user);
      const { data } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (mounted) {
        setBookmarks(data || []);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [router, supabase]);

  async function remove(qaKey) {
    setBookmarks((b) => b.filter((x) => x.qa_key !== qaKey));
    await supabase.from("bookmarks").delete().eq("user_id", user.id).eq("qa_key", qaKey);
  }

  // Group by stage
  const grouped = useMemo(() => {
    const m = new Map();
    for (const b of bookmarks) {
      if (!m.has(b.stage_id)) m.set(b.stage_id, []);
      m.get(b.stage_id).push(b);
    }
    return m;
  }, [bookmarks]);

  function findQuestion(b) {
    const sections = getStageSections(b.stage_id);
    const section = sections[b.section_idx];
    if (!section) return null;
    return section.questions.find((q) => q.qNum === b.q_num);
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-400">Loading bookmarks…</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <header className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <Link href="/" className="text-sm text-blue-400 hover:underline">← Back to roadmap</Link>
          <h1 className="text-base sm:text-lg font-bold text-amber-300">★ My Bookmarks</h1>
          <span className="text-xs text-slate-400">{bookmarks.length}</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {bookmarks.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p className="text-3xl mb-2">☆</p>
            <p>No bookmarks yet.</p>
            <p className="text-xs mt-1">Star a Q&A on any stage to save it here for quick revision before interviews.</p>
          </div>
        ) : (
          Array.from(grouped.entries()).map(([stageId, items]) => {
            const meta = getStageMeta(stageId);
            return (
              <div key={stageId}>
                <h2 className="font-bold text-cyan-400 text-sm sm:text-base mb-2 sticky top-12 bg-slate-900/90 py-2 -mx-4 px-4 backdrop-blur">
                  {meta?.title || stageId} <span className="text-slate-500 font-normal">· {items.length}</span>
                </h2>
                <div className="space-y-2">
                  {items.map((b) => {
                    const q = findQuestion(b);
                    const isOpen = openKey === b.qa_key;
                    return (
                      <div key={b.qa_key} className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
                        <div className="flex items-stretch">
                          <button
                            onClick={() => setOpenKey(isOpen ? null : b.qa_key)}
                            className="flex-1 text-left px-3 py-2.5 hover:bg-slate-700/40 flex items-start gap-2 min-w-0"
                          >
                            <span className="text-blue-400 font-mono text-xs mt-0.5">Q{b.q_num}</span>
                            <span className="flex-1 text-sm text-slate-100 break-words min-w-0">{b.q_text}</span>
                            <span className="text-slate-500 flex-shrink-0">{isOpen ? "−" : "+"}</span>
                          </button>
                          <button
                            onClick={() => remove(b.qa_key)}
                            title="Remove bookmark"
                            className="w-9 flex items-center justify-center border-l border-slate-700 text-amber-400 hover:text-rose-400"
                          >
                            ★
                          </button>
                        </div>
                        {isOpen && q && (
                          <div className="px-3 pb-3 space-y-2 border-t border-slate-700/50 pt-2">
                            {q.blocks.map((blk, i) => {
                              if (blk.kind === "text") return <p key={i} className="text-sm text-slate-300 leading-relaxed">{blk.text}</p>;
                              if (blk.kind === "subheader") return <h5 key={i} className="text-sm font-semibold text-cyan-400 mt-2">{blk.text}</h5>;
                              if (blk.kind === "code") return <CodeBlock key={i} lines={blk.lines} />;
                              if (blk.kind === "mermaid") return <MermaidDiagram key={i} code={blk.lines.join("\n")} />;
                              if (blk.kind === "diagram") return (
                                <pre key={i} className="bg-slate-950 border border-blue-900/50 rounded p-3 overflow-x-auto text-xs">
                                  <code className="text-blue-300 font-mono whitespace-pre">{blk.lines.join("\n")}</code>
                                </pre>
                              );
                              return null;
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </main>
    </div>
  );
}
