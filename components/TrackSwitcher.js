"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);
  const active = TRACKS.find((t) => t.id === activeTrack) || TRACKS[0];

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onEsc); document.body.style.overflow = ""; };
  }, [open]);

  const modal = (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4 no-print"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md max-h-[85vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 bg-slate-900 border-b border-slate-700 px-4 py-3 flex justify-between items-center rounded-t-2xl">
          <h3 className="font-bold text-white">Choose your track</h3>
          <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white text-xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-800">✕</button>
        </div>
        {/* scrollable list */}
        <div className="p-3 grid gap-2 overflow-y-auto">
          {TRACKS.map((t) => {
            const isActive = t.id === activeTrack;
            return (
              <button
                key={t.id}
                onClick={() => { onSelect(t.id); setOpen(false); }}
                className={`text-left p-3 rounded-xl border transition flex items-center gap-3 ${
                  isActive ? "border-blue-500 bg-blue-500/10" : "border-slate-700 hover:border-slate-500 bg-slate-800/40"
                }`}
              >
                <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${ACCENT[t.accent] || ACCENT.amber} flex items-center justify-center text-xl flex-shrink-0`}>
                  {t.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-white">{t.name}</span>
                    {isActive && <span className="text-[10px] px-1.5 py-0.5 bg-blue-600 rounded-full text-white flex-shrink-0">current</span>}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{t.tagline}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Switch career track"
        className="w-full flex items-center gap-2 text-sm px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg"
      >
        <span className="text-base leading-none">{active.icon}</span>
        <span className="font-medium truncate flex-1 text-left">{active.short}</span>
        <span className="text-slate-500">▾</span>
      </button>

      {open && mounted && createPortal(modal, document.body)}
    </>
  );
}
