"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import CodeBlock from "@/components/CodeBlock";
import LiveClock from "@/components/LiveClock";
import MySolution from "@/components/MySolution";
import { Building2, ChevronRight, Search } from "@/components/icons";
import { COMPANIES, companyStats, totalCompanyQuestions, googleLink } from "@/data/company-qa";

export default function CompanyQaPage() {
  const [companyId, setCompanyId] = useState(null);
  const [selected, setSelected] = useState(null); // { company, set, q }
  const [q, setQ] = useState("");

  const company = useMemo(() => COMPANIES.find((c) => c.id === companyId) || null, [companyId]);

  function openCompany(id) { setCompanyId(id); setSelected(null); setQ(""); }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col">
      <header className="sticky top-0 z-20 bg-[#0e0e11]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-blue-400 hover:underline whitespace-nowrap">← Dashboard</Link>
          <h1 className="text-[15px] font-semibold flex-1 min-w-0 truncate flex items-center gap-2">
            <Building2 size={17} className="text-violet-400" /> Company-wise Q&amp;A
          </h1>
          <LiveClock className="hidden sm:flex" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 flex-1">
        {selected ? (
          <QuestionView data={selected} onBack={() => setSelected(null)} />
        ) : !company ? (
          <>
            <p className="text-sm text-zinc-400 mb-5">
              Real questions asked at specific companies, grouped by role and experience. Pick a company to see its sets.
              <span className="text-zinc-500"> · {totalCompanyQuestions()} questions so far.</span>
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {COMPANIES.map((c) => {
                const st = companyStats(c);
                return (
                  <button key={c.id} onClick={() => openCompany(c.id)} className="ui-card ui-card-hover ui-glow group p-5 text-left">
                    <div className="flex items-center gap-3">
                      <span className={`w-10 h-10 rounded-xl grid place-items-center ${c.color}`}><Building2 size={20} /></span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[15px] font-semibold text-zinc-100 truncate">{c.name}</div>
                        <div className="text-[11px] text-zinc-500">{st.sets} role{st.sets !== 1 ? "s" : ""} · {st.qs} questions</div>
                      </div>
                      <ChevronRight size={16} className="text-zinc-600 group-hover:text-zinc-200 transition" />
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <CompanyView company={company} q={q} setQ={setQ} onBack={() => setCompanyId(null)} onOpen={(set, item) => setSelected({ company, set, q: item })} />
        )}
      </main>

      <footer className="border-t border-white/[0.08] py-6 text-center text-xs text-zinc-500">
        <div className="font-extrabold text-zinc-300 mb-1">Crack <span className="gradient-text">Any Job</span></div>
        Company-wise interview questions · grouped by role &amp; experience
      </footer>
    </div>
  );
}

function CompanyView({ company, q, setQ, onBack, onOpen }) {
  const query = q.trim().toLowerCase();
  return (
    <div>
      <button onClick={onBack} className="text-sm text-blue-400 hover:underline mb-3">← All companies</button>
      <div className="flex items-center gap-3 mb-4">
        <span className={`w-11 h-11 rounded-xl grid place-items-center ${company.color}`}><Building2 size={22} /></span>
        <div>
          <h2 className="text-lg font-bold text-white leading-tight">{company.name}</h2>
          <div className="text-[11px] text-zinc-500">{companyStats(company).qs} interview questions</div>
        </div>
      </div>

      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search this company's questions…"
        className="w-full px-3 py-2 bg-[#141417] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/60 mb-5" />

      <div className="space-y-6">
        {company.sets.map((set) => {
          const qs = query ? set.questions.filter((x) => x.q.toLowerCase().includes(query)) : set.questions;
          if (!qs.length) return null;
          return (
            <section key={set.id}>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className="text-[14px] font-semibold text-white">{set.role}</h3>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">{set.level}</span>
                <span className="text-[11px] text-zinc-500">· {qs.length} question{qs.length !== 1 ? "s" : ""}</span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>
              <div className="space-y-1.5">
                {qs.map((item, i) => (
                  <button key={item.slug} onClick={() => onOpen(set, item)}
                    className="w-full text-left bg-[#18181b] hover:bg-[#1f1f23] border border-white/[0.06] hover:border-white/[0.14] rounded-lg px-3 py-3 flex items-center gap-3 transition">
                    <span className="text-xs font-mono text-zinc-500 w-6 flex-shrink-0">{i + 1}</span>
                    <span className="flex-1 text-sm text-zinc-100">{item.q}</span>
                    <ChevronRight size={15} className="text-zinc-600 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>
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

function QuestionView({ data, onBack }) {
  const { company, set, q } = data;
  return (
    <div>
      <button onClick={onBack} className="text-sm text-blue-400 hover:underline mb-3">← {company.name}</button>
      <div className="bg-[#18181b] border border-white/[0.06] rounded-xl p-4 sm:p-6">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${company.color}`}>{company.name}</span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-300">{set.role}</span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">{set.level}</span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-white">{q.q}</h2>
        <div className="mt-3">{q.answer.map((b, i) => <AnswerBlock key={i} block={b} />)}</div>
        <a href={googleLink(q.learn || q.q)} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 text-xs px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-700/50 text-blue-300 hover:bg-blue-500/20 transition">
          🔎 Learn more on Google
        </a>
      </div>
      <MySolution slug={`company:${company.id}:${q.slug}`} category="company" title={q.q} />
    </div>
  );
}
