"use client";
import CodeBlock from "@/components/CodeBlock";

// Lightweight markdown renderer for user study-notes.
// Supports: fenced ``` code blocks (rendered with syntax highlighting + copy),
// #/##/### headings, **bold**, `inline code`, and -/*/1. lists.
// The raw text is stored verbatim; this only affects display.

function renderInline(text, keyBase) {
  const parts = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0, m, k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(<span key={`${keyBase}-${k++}`}>{text.slice(last, m.index)}</span>);
    const tok = m[0];
    if (tok.startsWith("**")) parts.push(<strong key={`${keyBase}-${k++}`} className="font-semibold text-white">{tok.slice(2, -2)}</strong>);
    else parts.push(<code key={`${keyBase}-${k++}`} className="px-1.5 py-0.5 rounded bg-[#141417] border border-white/[0.06] text-[12.5px] font-mono text-fuchsia-300">{tok.slice(1, -1)}</code>);
    last = m.index + tok.length;
  }
  if (last < text.length) parts.push(<span key={`${keyBase}-${k++}`}>{text.slice(last)}</span>);
  return parts;
}

// Heuristic: does this line look like source code? Tuned for DSA/Java notes.
// Conservative on purpose — plain English sentences should NOT match.
function isCodey(line) {
  const t = line.trim();
  if (t.length < 2) return false;
  if (/[;{}]$/.test(t)) return true;                                           // ends with ; { }
  if (/^(public|private|protected|static|final|abstract|class|interface|enum|void|import|package|new|else|do|try|finally|break|continue|synchronized)\b/.test(t)) return true;
  if (/^(if|for|while|switch|catch)\s*\(/.test(t)) return true;               // control with (
  if (/^(return|throw)\b/.test(t)) return true;                               // statements
  if (/^@[A-Za-z]/.test(t)) return true;                                      // annotations
  if (/^(\/\/|\/\*|\*\s)/.test(t)) return true;                               // comments
  if (/^[A-Za-z_$][\w$]*(\s*<[^>]*>)?(\[\])?\s+[A-Za-z_$][\w$]*\s*=/.test(t)) return true; // Type name =
  if (/^[A-Za-z_$][\w$.]*\s*=\s*(\[|\{|new\s|-?\d|["'])/.test(t)) return true;             // x = [ / new / number / string
  if (/^[A-Za-z_$][\w$.]*\([^)]*\)\s*;?\s*$/.test(t)) return true;            // method call line
  if (/^(\t| {4,})\S/.test(line)) return true;                               // deep indentation
  return false;
}

function parse(md) {
  const lines = (md || "").replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let i = 0, guard = 0;
  while (i < lines.length) {
    if (++guard > 200000) break; // hard stop — never freeze the page
    const start = i;
    const line = lines[i];
    // 1) Explicit fenced code block (```), lenient — takes priority.
    if (/^\s*```/.test(line)) {
      const lang = (line.match(/^\s*```\s*([A-Za-z0-9+#.\-]*)/) || [])[1] || "";
      i++;
      const code = [];
      while (i < lines.length && !/^\s*```\s*$/.test(lines[i])) { code.push(lines[i]); i++; }
      if (i < lines.length) i++; // skip closing fence if present
      blocks.push({ type: "code", lang, lines: code });
      continue;
    }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) { blocks.push({ type: "heading", level: h[1].length, text: h[2] }); i++; continue; }
    if (line.trim() === "") { i++; continue; }
    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && (/^\s*[-*]\s+/.test(lines[i]) || /^\s*\d+\.\s+/.test(lines[i]))) {
        const ordered = /^\s*\d+\.\s+/.test(lines[i]);
        items.push({ ordered, text: lines[i].replace(/^\s*(?:[-*]|\d+\.)\s+/, "") });
        i++;
      }
      blocks.push({ type: "list", items });
      continue;
    }
    // 2) Auto-detected code: a run of code-looking lines (no ``` needed).
    if (isCodey(line)) {
      const code = [];
      while (i < lines.length) {
        if (isCodey(lines[i])) { code.push(lines[i]); i++; }
        else if (lines[i].trim() === "" && i + 1 < lines.length && isCodey(lines[i + 1])) { code.push(lines[i]); i++; } // interior blank
        else break;
      }
      blocks.push({ type: "code", lines: code });
      continue;
    }
    // 3) Prose paragraph — stops at blanks, headings, lists, fences, or code lines.
    const para = [];
    while (i < lines.length && lines[i].trim() !== "" && !/^\s*```/.test(lines[i]) && !/^#{1,6}\s/.test(lines[i]) && !/^\s*[-*]\s+/.test(lines[i]) && !/^\s*\d+\.\s+/.test(lines[i]) && !isCodey(lines[i])) {
      para.push(lines[i]); i++;
    }
    if (para.length) blocks.push({ type: "para", text: para.join("\n") });
    if (i === start) i++; // guarantee forward progress
  }
  return blocks;
}

export default function MarkdownNote({ text }) {
  const blocks = parse(text);
  return (
    <div className="space-y-2.5">
      {blocks.map((b, i) => {
        if (b.type === "code") return <CodeBlock key={i} lines={b.lines} />;
        if (b.type === "heading") {
          const cls = b.level <= 1 ? "text-base font-bold text-white mt-1"
            : b.level === 2 ? "text-[15px] font-bold text-white mt-1"
            : "text-[13.5px] font-bold text-cyan-300 mt-1";
          return <div key={i} className={cls}>{renderInline(b.text, `h${i}`)}</div>;
        }
        if (b.type === "list") {
          return (
            <ul key={i} className="space-y-1">
              {b.items.map((it, j) => (
                <li key={j} className="flex gap-2 text-sm text-zinc-200 leading-relaxed">
                  <span className="text-blue-400 flex-shrink-0 mt-0.5">{it.ordered ? `${j + 1}.` : "•"}</span>
                  <span>{renderInline(it.text, `l${i}-${j}`)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return <p key={i} className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">{renderInline(b.text, `p${i}`)}</p>;
      })}
    </div>
  );
}
