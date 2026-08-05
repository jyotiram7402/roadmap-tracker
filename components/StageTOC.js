"use client";
import { useState, useEffect } from "react";

export default function StageTOC({ stages, stageStats, onJump }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Jump to stage"
        className="fixed bottom-4 right-4 z-30 no-print bg-blue-600 hover:bg-blue-500 text-white w-12 h-12 rounded-full shadow-xl shadow-blue-900/50 flex items-center justify-center text-lg font-bold"
      >
        ☰
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 no-print"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[#141417] border border-white/[0.06] rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#141417] border-b border-white/[0.06] px-4 py-3 flex justify-between items-center">
              <h3 className="font-bold text-white">Jump to stage</h3>
              <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white text-lg">✕</button>
            </div>
            <div className="p-2 space-y-1">
              {stages.map((stage) => {
                const st = stageStats(stage);
                return (
                  <button
                    key={stage.id}
                    onClick={() => { onJump(stage.id); setOpen(false); }}
                    className="w-full text-left p-3 rounded-lg hover:bg-[#1c1c20] transition"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-white text-sm">{stage.title}</span>
                      <span className="text-xs text-blue-400 font-mono whitespace-nowrap">{st.pct}%</span>
                    </div>
                    <div className="h-1 bg-white/[0.08] rounded-full overflow-hidden mt-1.5">
                      <div className="h-full bg-blue-500" style={{ width: `${st.pct}%` }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
