"use client";
import { useMemo, useRef, useState } from "react";
import { ChevronDown } from "@/components/icons";
import { PREP_ROADMAP, PREP_NOTES } from "@/data/prep-roadmap";

const googleLink = (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`;

// collect node paths down to a given depth (for the default expanded view)
function pathsToDepth(node, path, depth, max, out) {
  if (depth > max) return;
  if (node.children && node.children.length) {
    out.push(path);
    node.children.forEach((c, i) => pathsToDepth(c, `${path}.${i}`, depth + 1, max, out));
  }
}
function allOpenPaths(node, path, out) {
  if (node.children && node.children.length) {
    out.push(path);
    node.children.forEach((c, i) => allOpenPaths(c, `${path}.${i}`, out));
  }
}

function MMNode({ node, path, openSet, toggle }) {
  const kids = node.children || [];
  const has = kids.length > 0;
  const isOpen = openSet.has(path);
  const style = node.color ? { "--mmline": node.color } : undefined;
  const labelStyle = node.color ? { borderLeft: `3px solid ${node.color}` } : undefined;
  const Tag = has ? "button" : "div";
  return (
    <div className="mm-node" style={style}>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <Tag className={`mm-label ${node.root ? "mm-root" : ""}`} style={labelStyle} onClick={has ? () => toggle(path) : undefined}>
          <span>{node.label}</span>
          {has && <ChevronDown size={14} className={`text-zinc-500 transition-transform duration-150 ${isOpen ? "" : "-rotate-90"}`} />}
        </Tag>
        {node.link && (
          <a href={googleLink(node.link.q)} target="_blank" rel="noopener noreferrer"
            className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-blue-500/10 border border-blue-600/30 text-blue-300 hover:bg-blue-500/20 transition whitespace-nowrap">
            {node.link.label} ↗
          </a>
        )}
      </div>
      {has && isOpen && (
        <div className="mm-kids">
          {kids.map((c, i) => (
            <div className="mm-kid" key={i}><MMNode node={c} path={`${path}.${i}`} openSet={openSet} toggle={toggle} /></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RoadmapMap() {
  const defaultOpen = useMemo(() => { const out = []; pathsToDepth(PREP_ROADMAP, "r", 0, 2, out); return new Set(out); }, []);
  const [openSet, setOpenSet] = useState(defaultOpen);
  const [zoom, setZoom] = useState(1);

  const toggle = (p) => setOpenSet((s) => { const n = new Set(s); n.has(p) ? n.delete(p) : n.add(p); return n; });
  const expandAll = () => { const out = []; allOpenPaths(PREP_ROADMAP, "r", out); setOpenSet(new Set(out)); };
  const collapseAll = () => setOpenSet(new Set());
  const z = (d) => setZoom((v) => Math.min(1.4, Math.max(0.4, +(v + d).toFixed(2))));

  // drag-to-pan the canvas
  const wrapRef = useRef(null);
  const drag = useRef(null);
  const onDown = (e) => {
    if (e.target.closest("button, a")) return; // let controls/links work
    const el = wrapRef.current; if (!el) return;
    drag.current = { x: e.clientX, y: e.clientY, l: el.scrollLeft, t: el.scrollTop };
    el.setPointerCapture?.(e.pointerId);
    el.style.cursor = "grabbing";
  };
  const onMove = (e) => {
    const d = drag.current, el = wrapRef.current; if (!d || !el) return;
    el.scrollLeft = d.l - (e.clientX - d.x);
    el.scrollTop = d.t - (e.clientY - d.y);
  };
  const onUp = () => { drag.current = null; if (wrapRef.current) wrapRef.current.style.cursor = "grab"; };

  return (
    <div>
      {/* toolbar */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <button onClick={expandAll} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[#18181b] border border-white/[0.08] text-zinc-300 hover:text-white hover:border-white/[0.18] transition">Expand all</button>
        <button onClick={collapseAll} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[#18181b] border border-white/[0.08] text-zinc-300 hover:text-white hover:border-white/[0.18] transition">Collapse all</button>
        <span className="text-[11px] text-zinc-500 hidden sm:inline">drag to pan · pinch/scroll to move</span>
        <div className="ml-auto flex items-center gap-1 rounded-lg bg-[#18181b] border border-white/[0.08] p-1">
          <button onClick={() => z(-0.1)} className="w-7 h-7 grid place-items-center rounded-md text-zinc-300 hover:bg-white/5" aria-label="Zoom out">−</button>
          <span className="text-xs text-zinc-400 w-10 text-center tabular-nums">{Math.round(zoom * 100)}%</span>
          <button onClick={() => z(0.1)} className="w-7 h-7 grid place-items-center rounded-md text-zinc-300 hover:bg-white/5" aria-label="Zoom in">+</button>
        </div>
      </div>

      {/* pannable canvas */}
      <div ref={wrapRef} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}
        className="mm-wrap rounded-2xl border border-white/[0.06] bg-[#0e0e11]" style={{ height: "min(72vh, 720px)", cursor: "grab" }}>
        <div className="mm-canvas" style={{ transform: `scale(${zoom})` }}>
          <MMNode node={PREP_ROADMAP} path="r" openSet={openSet} toggle={toggle} />
        </div>
      </div>

      {/* interview tip notes */}
      <div className="mt-6 grid md:grid-cols-3 gap-3">
        {PREP_NOTES.map((n) => (
          <div key={n.title} className="rounded-2xl border border-white/[0.06] bg-[#18181b] p-4" style={{ borderTop: `3px solid ${n.color}` }}>
            <div className="text-sm font-bold text-white mb-2">{n.title}</div>
            <ol className="space-y-1.5">
              {n.items.map((it, i) => (
                <li key={i} className="flex gap-2 text-[13px] text-zinc-300 leading-relaxed">
                  <span className="text-zinc-500 font-semibold flex-shrink-0">{i + 1}.</span><span>{it}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
