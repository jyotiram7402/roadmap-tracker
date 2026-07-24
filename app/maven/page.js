"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import MermaidDiagram from "@/components/MermaidDiagram";
import LiveClock from "@/components/LiveClock";
import MySolution from "@/components/MySolution";

function googleLink(q) {
  return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}

export default function MavenPage() {
  const [tab, setTab] = useState("notes");
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 flex flex-col">
      <header className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-blue-400 hover:underline whitespace-nowrap">← Dashboard</Link>
          <h1 className="text-base sm:text-lg font-bold flex-1 min-w-0 truncate">🧰 Maven</h1>
          <LiveClock className="hidden sm:flex" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-3 flex gap-2">
          {[["notes", "📖 Notes"], ["interview", "❓ Interview Questions"]].map(([v, label]) => (
            <button key={v} onClick={() => setTab(v)}
              className={`text-sm px-3 py-1.5 rounded-lg font-medium whitespace-nowrap border transition ${tab === v ? "bg-blue-600 border-blue-500 text-white" : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"}`}>
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-5 flex-1">
        {tab === "notes" ? <NotesTab /> : <InterviewTab />}
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <div className="font-extrabold text-slate-300 mb-1">Crack <span className="gradient-text">Any Job</span></div>
        Spring Boot &amp; Spring Framework · Maven
      </footer>
    </div>
  );
}

/* ---------------- Notes ---------------- */
function NoteBlock({ block }) {
  if (block.kind === "subhead") return <h4 className="mt-4 mb-1 text-sm font-bold text-cyan-300">{block.text}</h4>;
  if (block.kind === "code") return <div className="my-3"><CodeBlock lines={block.lines} /></div>;
  if (block.kind === "mermaid") return <div className="my-3"><MermaidDiagram code={block.code} /></div>;
  if (block.kind === "note") {
    return (
      <div className="my-2 rounded-lg border border-amber-700/40 bg-amber-500/10 p-3">
        <p className="text-sm text-slate-200 leading-relaxed">📌 {block.text}</p>
      </div>
    );
  }
  // text -> bullet point
  return (
    <div className="my-1.5 flex gap-2 text-sm text-slate-200 leading-relaxed">
      <span className="text-blue-400 flex-shrink-0">•</span>
      <span>{block.text}</span>
    </div>
  );
}

function NotesTab() {
  const [topics, setTopics] = useState(undefined);
  useEffect(() => {
    let ok = true;
    import("@/data/maven/notes.js").then((m) => { if (ok) setTopics(m.TOPICS || []); });
    return () => { ok = false; };
  }, []);

  if (topics === undefined) return <div className="text-center py-16 text-slate-500 animate-pulse">Loading notes…</div>;

  if (topics.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        <div className="text-4xl mb-3">📖</div>
        <p className="font-semibold text-slate-300">Maven notes — ready for your content</p>
        <p className="text-sm mt-2 max-w-md mx-auto">
          I couldn&apos;t read the PDFs here (no PDF renderer, and the text is stored as glyph codes / drawings).
          Paste the notes as text, or re-send them as <span className="text-slate-200">images (PNG/JPG)</span> — I can read images directly —
          and I&apos;ll turn each topic into point-wise notes with diagrams here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* table of contents */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-3">
        <div className="text-[11px] uppercase tracking-wide text-slate-500 mb-1.5">Topics</div>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <a key={t.slug} href={`#${t.slug}`} className="text-xs px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:border-slate-500">{t.title}</a>
          ))}
        </div>
      </div>
      {topics.map((t) => (
        <section key={t.slug} id={t.slug} className="scroll-mt-24 rounded-xl border border-slate-700 bg-slate-800/40 p-4 sm:p-5">
          <h3 className="text-lg font-bold text-white mb-2">{t.title}</h3>
          {t.points.map((b, i) => <NoteBlock key={i} block={b} />)}
        </section>
      ))}
    </div>
  );
}

/* ---------------- Interview Questions ---------------- */
function AnswerBlock({ block }) {
  if (block.kind === "code") return <div className="my-3"><CodeBlock lines={block.lines} /></div>;
  if (block.kind === "example") {
    return (
      <div className="my-3 rounded-lg border border-emerald-700/40 bg-emerald-500/10 p-3">
        <div className="text-[11px] font-semibold text-emerald-300 mb-1">💡 Real-life example</div>
        <p className="text-sm text-slate-200 leading-relaxed">{block.text}</p>
      </div>
    );
  }
  if (block.kind === "note") {
    return (
      <div className="my-3 rounded-lg border border-amber-700/40 bg-amber-500/10 p-3">
        <div className="text-[11px] font-semibold text-amber-300 mb-1">📌 Interview note</div>
        <p className="text-sm text-slate-200 leading-relaxed">{block.text}</p>
      </div>
    );
  }
  return <p className="my-2 text-sm text-slate-200 leading-relaxed">{block.text}</p>;
}

function InterviewTab() {
  const [questions, setQuestions] = useState(undefined);
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let ok = true;
    import("@/data/maven/interview.js").then((m) => { if (ok) setQuestions(m.QUESTIONS || []); });
    return () => { ok = false; };
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!questions) return [];
    return query ? questions.filter((x) => x.q.toLowerCase().includes(query)) : questions;
  }, [questions, q]);

  if (selected) {
    return (
      <div>
        <button onClick={() => setSelected(null)} className="text-sm text-blue-400 hover:underline mb-3">← All questions</button>
        <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-white">{selected.q}</h2>
          <div className="mt-3">{selected.answer.map((b, i) => <AnswerBlock key={i} block={b} />)}</div>
          <a href={googleLink(selected.learn || selected.q)} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-xs px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-700/50 text-blue-300 hover:bg-blue-500/20 transition">
            🔎 Learn more on Google
          </a>
        </div>
        <MySolution slug={`maven-interview:${selected.slug}`} />
      </div>
    );
  }

  if (questions === undefined) return <div className="text-center py-16 text-slate-500 animate-pulse">Loading questions…</div>;
  if (questions.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        <p className="font-semibold text-slate-300">Maven interview questions are being added.</p>
        <p className="text-sm mt-1">Check back shortly — this set is being generated.</p>
      </div>
    );
  }

  return (
    <>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Maven questions…"
        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 mb-4" />
      <div className="text-xs text-slate-500 mb-2">{filtered.length} question{filtered.length !== 1 ? "s" : ""}</div>
      <div className="space-y-1.5">
        {filtered.map((item, i) => (
          <button key={item.slug} onClick={() => setSelected(item)}
            className="w-full text-left bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg px-3 py-3 flex items-center gap-3 transition">
            <span className="text-xs font-mono text-slate-500 w-6 flex-shrink-0">{i + 1}</span>
            <span className="flex-1 text-sm text-slate-100">{item.q}</span>
            <span className="text-slate-500 flex-shrink-0">›</span>
          </button>
        ))}
      </div>
    </>
  );
}
