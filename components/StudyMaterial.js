"use client";
import { useState } from "react";
import MermaidDiagram from "./MermaidDiagram";
import CodeBlock from "./CodeBlock";

export function qaKey(stageId, sectionIdx, qNum) {
  return `${stageId}::${sectionIdx}::${qNum}`;
}

const LEVEL_DOT = {
  beginner: { cls: "bg-green-500", title: "Beginner · 1–3 yrs" },
  intermediate: { cls: "bg-amber-500", title: "Intermediate · 2–4 yrs" },
  advanced: { cls: "bg-rose-500", title: "Advanced · Senior / SDE-2" },
};

export default function StudyMaterial({
  stageId,
  sections,
  search,
  qaProgress = {},
  bookmarks = {},
  onToggleQa,
  onToggleBookmark,
  filters = { unchecked: false, bookmarked: false, withCode: false },
}) {
  const [openQ, setOpenQ] = useState(null);
  const lowerSearch = (search || "").trim().toLowerCase();

  const filtered = sections.map((section, sIdx) => {
    let questions = section.questions;

    if (lowerSearch) {
      questions = questions.filter((q) => {
        if (q.qText.toLowerCase().includes(lowerSearch)) return true;
        for (const b of q.blocks) {
          if (b.kind === "text" && b.text.toLowerCase().includes(lowerSearch)) return true;
          if ((b.kind === "code" || b.kind === "diagram" || b.kind === "mermaid") &&
              b.lines.join("\n").toLowerCase().includes(lowerSearch)) return true;
        }
        return false;
      });
    }
    if (filters.unchecked) {
      questions = questions.filter((q) => !qaProgress[qaKey(stageId, sIdx, q.qNum)]);
    }
    if (filters.bookmarked) {
      questions = questions.filter((q) => bookmarks[qaKey(stageId, sIdx, q.qNum)]);
    }
    if (filters.withCode) {
      questions = questions.filter((q) => q.blocks.some((b) => b.kind === "code" || b.kind === "mermaid"));
    }
    return { ...section, sectionIdx: sIdx, questions };
  }).filter((s) => s.questions.length > 0);

  if (filtered.length === 0) {
    const reason = lowerSearch
      ? `No matches for "${search}"`
      : filters.unchecked ? "All questions already marked as known"
      : filters.bookmarked ? "No bookmarks in this stage yet"
      : filters.withCode ? "No code-bearing questions in this stage"
      : "No study material for this stage yet.";
    return <div className="text-center text-slate-500 py-6 text-sm">{reason}</div>;
  }

  return (
    <div className="space-y-4">
      {filtered.map((section) => (
        <div key={section.sectionIdx} className="space-y-2">
          <h4 className="text-sm font-semibold text-pink-400 sticky top-32 sm:top-36 bg-slate-900/90 backdrop-blur py-2 -mx-3 px-3 border-y border-slate-800 no-print">
            {section.sectionTitle}
          </h4>
          <h4 className="text-sm font-semibold text-pink-700 print-only mt-3 mb-1">
            {section.sectionTitle}
          </h4>
          <div className="space-y-2">
            {section.questions.map((q) => {
              const key = qaKey(stageId, section.sectionIdx, q.qNum);
              const known = !!qaProgress[key];
              const bookmarked = !!bookmarks[key];
              const isOpen = openQ === key || !!lowerSearch;
              return (
                <div
                  key={key}
                  className={`bg-slate-900/60 border rounded-lg overflow-hidden ${
                    known ? "border-emerald-700/50" : "border-slate-700"
                  }`}
                >
                  <div className="flex items-stretch">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleQa && onToggleQa(key);
                      }}
                      title={known ? "Mark as not known" : "I can answer this"}
                      className={`flex-shrink-0 w-9 flex items-center justify-center border-r ${
                        known
                          ? "bg-emerald-700/30 border-emerald-800 text-emerald-300"
                          : "border-slate-700 text-slate-500 hover:text-emerald-400"
                      }`}
                    >
                      {known ? "✓" : "○"}
                    </button>
                    <button
                      onClick={() => setOpenQ(isOpen ? null : key)}
                      className="flex-1 text-left px-3 py-2.5 hover:bg-slate-800/60 transition flex items-start gap-2 min-w-0"
                    >
                      <span className="flex items-center gap-1 mt-0.5 flex-shrink-0">
                        {q.level && LEVEL_DOT[q.level] && (
                          <span className={`w-2 h-2 rounded-full ${LEVEL_DOT[q.level].cls}`} title={LEVEL_DOT[q.level].title} />
                        )}
                        <span className="text-blue-400 font-mono text-xs">Q{q.qNum}</span>
                      </span>
                      <span className={`flex-1 text-sm font-medium min-w-0 break-words ${known ? "text-slate-400" : "text-slate-100"}`}>
                        {q.qText}
                      </span>
                      <span className="text-slate-500 text-sm flex-shrink-0">{isOpen ? "−" : "+"}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark && onToggleBookmark({
                          stageId,
                          sectionIdx: section.sectionIdx,
                          qNum: q.qNum,
                          qText: q.qText,
                        });
                      }}
                      title={bookmarked ? "Remove bookmark" : "Bookmark this Q&A"}
                      className={`flex-shrink-0 w-9 flex items-center justify-center border-l ${
                        bookmarked
                          ? "text-amber-400 bg-amber-400/10 border-amber-800/50"
                          : "border-slate-700 text-slate-500 hover:text-amber-400"
                      }`}
                    >
                      {bookmarked ? "★" : "☆"}
                    </button>
                  </div>
                  {isOpen && (
                    <div className="px-3 pb-3 space-y-2 border-t border-slate-700/50 pt-2">
                      {q.blocks.map((b, bIdx) => <Block key={bIdx} block={b} highlight={lowerSearch} />)}
                      <QuestionLinks qText={q.qText} sectionTitle={section.sectionTitle} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function Block({ block, highlight }) {
  if (block.kind === "subheader") {
    return <h5 className="text-sm font-semibold text-cyan-400 mt-2">{block.text}</h5>;
  }
  if (block.kind === "text") {
    return <p className="text-sm text-slate-300 leading-relaxed">{renderText(block.text, highlight)}</p>;
  }
  if (block.kind === "code") {
    return <CodeBlock lines={block.lines} />;
  }
  if (block.kind === "mermaid") {
    return <MermaidDiagram code={block.lines.join("\n")} />;
  }
  if (block.kind === "diagram") {
    return <DiagramBlock lines={block.lines} />;
  }
  return null;
}

function DiagramBlock({ lines }) {
  const text = lines.join("\n");
  return (
    <pre className="bg-slate-950 border border-blue-900/50 rounded p-3 overflow-x-auto text-xs leading-tight">
      <code className="text-blue-300 font-mono whitespace-pre">{text}</code>
    </pre>
  );
}

function highlightText(text, q) {
  if (!q) return text;
  const lower = text.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-yellow-500/30 text-yellow-100 px-0.5 rounded">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

const URL_RE = /(https?:\/\/[^\s]+)/g;
// Render a text block: turn any URLs into clickable links, highlight search hits elsewhere.
function renderText(text, q) {
  const parts = text.split(URL_RE);
  return parts.map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline break-all hover:text-blue-300">{part}</a>
    ) : (
      <span key={i}>{highlightText(part, q)}</span>
    )
  );
}

// "Learn more on Google" + (for DSA/coding) a LeetCode link under each answer.
function QuestionLinks({ qText, sectionTitle }) {
  const clean = (qText || "").replace(/[.?]+$/, "");
  const google = `https://www.google.com/search?q=${encodeURIComponent(clean + " interview question answer")}`;
  const isDSA = /dsa|coding|algorithm|leetcode|arrays|linked list|tree|graph|dynamic programming/i.test(sectionTitle || "");
  const leetcode = `https://leetcode.com/problemset/?search=${encodeURIComponent(clean.replace(/[^a-zA-Z0-9 ]/g, "").trim())}`;
  return (
    <div className="flex flex-wrap items-center gap-2 pt-1.5 no-print">
      <a href={google} target="_blank" rel="noopener noreferrer" title="Search this topic on Google"
         className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:border-blue-500 hover:text-blue-300 transition">
        🔍 Learn more
      </a>
      {isDSA && (
        <a href={leetcode} target="_blank" rel="noopener noreferrer" title="Practice on LeetCode"
           className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-700/50 text-amber-300 hover:bg-amber-500/20 transition">
          🟠 LeetCode
        </a>
      )}
    </div>
  );
}
