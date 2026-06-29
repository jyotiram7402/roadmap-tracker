"use client";
import { useState } from "react";
import { stageToMarkdown } from "@/lib/study-helpers";

export default function ExportMenu({ stage, studySections, stageTitle }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(null);

  const buildMd = () => stageToMarkdown(stage, studySections);

  async function copyMarkdown() {
    try {
      await navigator.clipboard.writeText(buildMd());
      setDone("Markdown copied");
      setTimeout(() => setDone(null), 2000);
    } catch { setDone("Copy failed"); }
  }

  function downloadMd() {
    const blob = new Blob([buildMd()], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const safe = (stageTitle || stage?.id || "stage").replace(/[^a-zA-Z0-9-_]+/g, "-");
    a.href = url; a.download = `${safe}.md`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="relative inline-block no-print">
      <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }} className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-200" title="Export this stage">⤓ Export</button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-40 bg-slate-800 border border-slate-700 rounded-lg shadow-lg w-44 overflow-hidden">
            <button onClick={(e) => { e.stopPropagation(); copyMarkdown(); setOpen(false); }} className="w-full text-left text-xs px-3 py-2 hover:bg-slate-700 text-slate-200">📋 Copy as Markdown</button>
            <button onClick={(e) => { e.stopPropagation(); downloadMd(); setOpen(false); }} className="w-full text-left text-xs px-3 py-2 hover:bg-slate-700 text-slate-200">⬇ Download .md file</button>
            <button onClick={(e) => { e.stopPropagation(); window.print(); setOpen(false); }} className="w-full text-left text-xs px-3 py-2 hover:bg-slate-700 text-slate-200">🖨 Print / Save as PDF</button>
          </div>
        </>
      )}
      {done && <span className="ml-2 text-xs text-emerald-400">{done}</span>}
    </div>
  );
}
