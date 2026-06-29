"use client";
import { useEffect, useState } from "react";
import { TRACKS } from "@/data/tracks";

const ACCENT = {
  amber: "from-amber-500 to-orange-500",
  green: "from-green-500 to-emerald-500",
  purple: "from-purple-500 to-fuchsia-500",
  cyan: "from-cyan-500 to-sky-500",
  blue: "from-blue-500 to-indigo-500",
  teal: "from-teal-500 to-cyan-500",
};

export default function TrackSwitcher({ activeTrack, onSelect }) {
  const [open, setOpen] = useState(false);
  const active = TRACKS.find((t) => t.id === activeTrack) || TRACKS[0];

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
        title="Switch career track"
        className="flex items-center gap-1.5 text-xs sm:text-sm px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg max-w-[150px] sm:max-w-none"
      >
        <span className="text-base leading-none">{active.icon}</span>
        <span className="font-medium truncate">{active.short}</span>
        <span className="text-slate-500">▾</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-4 pt-16 sm:pt-4 no-print" onClick={() => setOpen(false)}>
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-slate-900 border-b border-slate-700 px-4 py-3 flex justify-between items-center">
              <h3 className="font-bold text-white">Choose your track</h3>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white text-lg">✕</button>
            </div>
            <div className="p-3 grid gap-2">
              {TRACKS.map((t) => {
                const isActive = t.id === activeTrack;
                return (
                  <button
                    key={t.id}
                    onClick={() => { onSelect(t.id); setOpen(false); }}
                    className={`text-left p-3 rounded-xl border transition flex items-center gap-3 ${
                      isActive ? "border-blue-500 bg-blue-500/10" : "border-slate-700 hover:border-slate-600 bg-slate-800/40"
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${ACCENT[t.accent] || ACCENT.amber} flex items-center justify-center text-xl flex-shrink-0`}>
                      {t.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{t.name}</span>
                        {isActive && <span className="text-[10px] px-1.5 py-0.5 bg-blue-600 rounded-full text-white">current</span>}
                      </div>
                      <p className="text-xs text-slate-400 truncate">{t.tagline}</p>
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
