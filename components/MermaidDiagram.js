"use client";
import { useEffect, useRef, useState } from "react";

let mermaidPromise = null;
async function getMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import("mermaid").then((m) => {
      const mermaid = m.default;
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: "dark",
        themeVariables: {
          background: "#0f172a",
          primaryColor: "#1e3a5f",
          primaryTextColor: "#e2e8f0",
          primaryBorderColor: "#3b82f6",
          lineColor: "#64748b",
          secondaryColor: "#1e293b",
          tertiaryColor: "#0f172a",
          mainBkg: "#1e3a5f",
          edgeLabelBackground: "#0f172a",
          clusterBkg: "#0f172a",
          clusterBorder: "#3b82f6",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: "13px"
        },
        flowchart: { curve: "basis", htmlLabels: true, padding: 12, nodeSpacing: 40, rankSpacing: 50 }
      });
      return mermaid;
    });
  }
  return mermaidPromise;
}

let idCounter = 0;

export default function MermaidDiagram({ code }) {
  const [svg, setSvg] = useState(null);
  const [err, setErr] = useState(null);
  const idRef = useRef(`merm-${++idCounter}-${Math.floor(Math.random() * 1e6)}`);

  useEffect(() => {
    let cancelled = false;
    setSvg(null);
    setErr(null);
    (async () => {
      try {
        const mermaid = await getMermaid();
        const { svg } = await mermaid.render(idRef.current, code);
        if (!cancelled) setSvg(svg);
      } catch (e) {
        if (!cancelled) setErr(e?.message || String(e));
      }
    })();
    return () => { cancelled = true; };
  }, [code]);

  if (err) {
    return (
      <details className="bg-rose-950/30 border border-rose-900 rounded p-2 text-xs">
        <summary className="text-rose-300 cursor-pointer">Diagram render error — show source</summary>
        <pre className="text-rose-200 mt-2 overflow-x-auto">{code}</pre>
      </details>
    );
  }
  if (!svg) {
    return (
      <div className="bg-slate-950 border border-blue-900/50 rounded p-4 text-xs text-slate-500 animate-pulse">
        Rendering diagram…
      </div>
    );
  }
  return (
    <div
      className="mermaid-wrap bg-slate-950 border border-blue-900/50 rounded p-3 overflow-x-auto flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
