"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import LiveClock from "@/components/LiveClock";
import MySolution from "@/components/MySolution";

function googleLink(q) {
  return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}

// Reusable interview-Q&A browser used by /java-qa and /springboot-qa.
// props: title, categories [{id,name,short,icon,desc}], load(catId)->questions,
//        storagePrefix (namespaces the per-question screenshot uploads).
export default function QaStudio({ title, categories, load, storagePrefix }) {
  const [cat, setCat] = useState(categories[0]?.id);
  const [questions, setQuestions] = useState(undefined); // undefined = loading
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let ok = true;
    setQuestions(undefined);
    setSelected(null);
    setQ("");
    load(cat).then((list) => { if (ok) setQuestions(list); });
    return () => { ok = false; };
  }, [cat, load]);

  const meta = categories.find((c) => c.id === cat);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!questions) return [];
    if (!query) return questions;
    return questions.filter((x) => x.q.toLowerCase().includes(query));
  }, [questions, q]);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col">
      <header className="sticky top-0 z-20 bg-[#0e0e11]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-blue-400 hover:underline whitespace-nowrap">← Dashboard</Link>
          <h1 className="text-base sm:text-lg font-bold flex-1 min-w-0 truncate">{title}</h1>
          <LiveClock className="hidden sm:flex" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-3 flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`text-sm px-3 py-1.5 rounded-lg font-medium whitespace-nowrap border transition ${cat === c.id ? "bg-blue-600 border-blue-500 text-white" : "bg-[#18181b] border-white/[0.06] text-zinc-400 hover:border-white/[0.14] hover:text-zinc-200"}`}>
              {c.icon} {c.name}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-5 flex-1">
        {selected ? (
          <QuestionView cat={cat} item={selected} storagePrefix={storagePrefix} onBack={() => setSelected(null)} />
        ) : (
          <>
            <p className="text-sm text-zinc-400 mb-3">{meta?.desc}</p>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${meta?.short || ""} questions…`}
              className="w-full px-3 py-2 bg-[#141417] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/60 mb-4" />

            {questions === undefined ? (
              <div className="text-center py-16 text-zinc-500 animate-pulse">Loading questions…</div>
            ) : questions.length === 0 ? (
              <div className="text-center py-16 text-zinc-400">
                <p className="font-semibold text-zinc-300">Answers for {meta?.name} are being added.</p>
                <p className="text-sm mt-1">Check back shortly — this set is being generated.</p>
              </div>
            ) : (
              <>
                <div className="text-xs text-zinc-500 mb-2">{filtered.length} question{filtered.length !== 1 ? "s" : ""}</div>
                <div className="space-y-1.5">
                  {filtered.map((item, i) => (
                    <button key={item.slug} onClick={() => setSelected(item)}
                      className="w-full text-left bg-[#18181b] hover:bg-[#1f1f23] border border-white/[0.06] hover:border-white/[0.14] rounded-lg px-3 py-3 flex items-center gap-3 transition">
                      <span className="text-xs font-mono text-zinc-500 w-6 flex-shrink-0">{i + 1}</span>
                      <span className="flex-1 text-sm text-zinc-100">{item.q}</span>
                      <span className="text-zinc-500 flex-shrink-0">›</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>

      <footer className="border-t border-white/[0.08] py-6 text-center text-xs text-zinc-500">
        <div className="font-extrabold text-zinc-300 mb-1">Crack<span className="gradient-text">Dev</span></div>
        Interview Q&amp;A · written for interviews, with examples &amp; code
      </footer>
    </div>
  );
}

function AnswerBlock({ block }) {
  if (block.kind === "code") return <div className="my-3"><CodeBlock lines={block.lines} /></div>;
  if (block.kind === "example") {
    return (
      <div className="my-3 rounded-lg border border-emerald-700/40 bg-emerald-500/10 p-3">
        <div className="text-[11px] font-semibold text-emerald-300 mb-1">💡 Real-life example</div>
        <p className="text-sm text-zinc-200 leading-relaxed">{block.text}</p>
      </div>
    );
  }
  if (block.kind === "note") {
    return (
      <div className="my-3 rounded-lg border border-amber-700/40 bg-amber-500/10 p-3">
        <div className="text-[11px] font-semibold text-amber-300 mb-1">📌 Interview note</div>
        <p className="text-sm text-zinc-200 leading-relaxed">{block.text}</p>
      </div>
    );
  }
  return <p className="my-2 text-sm text-zinc-200 leading-relaxed">{block.text}</p>;
}

function QuestionView({ cat, item, storagePrefix, onBack }) {
  return (
    <div>
      <button onClick={onBack} className="text-sm text-blue-400 hover:underline mb-3">← All questions</button>
      <div className="bg-[#18181b] border border-white/[0.06] rounded-xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-white">{item.q}</h2>
        <div className="mt-3">
          {item.answer.map((b, i) => <AnswerBlock key={i} block={b} />)}
        </div>
        <a href={googleLink(item.learn || item.q)} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 text-xs px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-700/50 text-blue-300 hover:bg-blue-500/20 transition">
          🔎 Learn more on Google
        </a>
      </div>
      <MySolution slug={`${storagePrefix}:${cat}:${item.slug}`} category={storagePrefix.replace("-qa", "")} title={item.q} />
    </div>
  );
}
