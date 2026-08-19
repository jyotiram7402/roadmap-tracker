"use client";
import { useEffect, useState } from "react";
import { Check, FileText, Bookmark } from "@/components/icons";
import { getItems, toggleDone, toggleBookmark } from "@/lib/activity";

const DIFF = {
  easy: { label: "Easy", cls: "text-emerald-400", dot: "bg-emerald-500/15 text-emerald-300 border-emerald-600/40" },
  medium: { label: "Medium", cls: "text-amber-400", dot: "bg-amber-500/15 text-amber-300 border-amber-600/40" },
  hard: { label: "Hard", cls: "text-rose-400", dot: "bg-rose-500/15 text-rose-300 border-rose-600/40" },
};

// Shared sheet-style list used by DSA & SQL.
// Columns: Status · Problem · Notes · Attempts · Bookmark · Difficulty.
// props: items[], category ("dsa"|"sql"), onOpen(item), getMeta(item) -> string, getId(item)
export default function QuestionTable({ items, category, onOpen, getMeta, getId = (x) => x.id }) {
  // Start empty so SSR and first client render match; fill after mount.
  const [store, setStore] = useState({}); // { "cat:id": { visits, done, bookmarked, ... } }
  useEffect(() => {
    const refresh = () => setStore(getItems());
    refresh();
    window.addEventListener("activity-change", refresh);
    return () => window.removeEventListener("activity-change", refresh);
  }, []);

  const COLS = "grid-cols-[28px_1fr_auto_auto] sm:grid-cols-[64px_1fr_60px_72px_56px_96px]";

  return (
    <div className="rounded-xl border border-white/[0.06] overflow-hidden bg-[#18181b]">
      {/* header (desktop) */}
      <div className={`hidden sm:grid ${COLS} gap-3 px-3 py-2 bg-[#141417] border-b border-white/[0.06] text-[10.5px] font-semibold uppercase tracking-wider text-zinc-500`}>
        <div className="text-center">Status</div>
        <div>Problem</div>
        <div className="text-center">Notes</div>
        <div className="text-center">Attempts</div>
        <div className="text-center">Save</div>
        <div className="text-center">Difficulty</div>
      </div>

      {items.length === 0 && <p className="text-center text-zinc-500 py-10 text-sm">No problems match these filters.</p>}

      {items.map((item) => {
        const id = getId(item);
        const it = store[`${category}:${id}`] || {};
        const done = !!it.done;
        const saved = !!it.bookmarked;
        const visits = it.visits || 0;
        const d = DIFF[item.difficulty] || { label: "—", cls: "text-zinc-400", dot: "bg-white/5 text-zinc-300 border-white/10" };

        return (
          <div key={item.key || id}
            className={`grid ${COLS} gap-2 sm:gap-3 items-center px-3 py-2.5 border-b border-white/[0.06] last:border-b-0 transition ${done ? "bg-emerald-500/[0.04]" : "hover:bg-[#1f1f23]"}`}>
            {/* Status */}
            <div className="flex justify-center">
              <button onClick={() => toggleDone(category, id, item.title)} title={done ? "Mark as not done" : "Mark as done"}
                aria-pressed={done}
                className={`w-5 h-5 rounded-md border grid place-items-center transition ${done ? "bg-emerald-500 border-emerald-500 text-white" : "border-white/25 text-transparent hover:border-emerald-500/70"}`}>
                <Check size={13} strokeWidth={3} />
              </button>
            </div>

            {/* Problem */}
            <button onClick={() => onOpen(item)} className="min-w-0 text-left">
              <span className="text-sm text-zinc-100 flex items-center gap-1.5">
                {item.hot && <span title="Most asked" className="text-amber-400 flex-shrink-0">★</span>}
                <span className="truncate">{item.title}</span>
              </span>
              <span className="text-[11px] text-zinc-500 flex items-center gap-1.5">
                {getMeta && <span className="truncate">{getMeta(item)}</span>}
                <span className={`sm:hidden text-[10px] font-semibold px-1.5 rounded border ${d.dot}`}>{d.label}</span>
              </span>
            </button>

            {/* Notes → opens full problem */}
            <div className="flex justify-center">
              <button onClick={() => onOpen(item)} title="Open full problem & notes"
                className="w-8 h-8 grid place-items-center rounded-lg text-zinc-400 hover:text-blue-300 hover:bg-blue-500/10 transition">
                <FileText size={16} />
              </button>
            </div>

            {/* Attempts (desktop) */}
            <div className="hidden sm:flex justify-center">
              <span title={`Opened ${visits} time${visits === 1 ? "" : "s"}`}
                className={`min-w-[26px] text-center text-xs font-semibold px-1.5 py-0.5 rounded-md ${visits > 0 ? "bg-blue-500/10 text-blue-300" : "text-zinc-600"}`}>
                {visits}×
              </span>
            </div>

            {/* Bookmark */}
            <div className="flex justify-center">
              <button onClick={() => toggleBookmark(category, id, item.title)} title={saved ? "Remove bookmark" : "Bookmark"}
                aria-pressed={saved}
                className={`w-8 h-8 grid place-items-center rounded-lg transition ${saved ? "text-amber-400" : "text-zinc-500 hover:text-amber-300 hover:bg-amber-500/10"}`}>
                <Bookmark size={16} {...(saved ? { fill: "currentColor" } : {})} />
              </button>
            </div>

            {/* Difficulty (desktop; on mobile it's shown inline under the title) */}
            <div className="hidden sm:flex justify-center">
              <span className={`text-[11px] font-semibold ${d.cls}`}>{d.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
