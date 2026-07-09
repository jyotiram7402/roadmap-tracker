"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import TechBackground from "@/components/TechBackground";

const MARQUEE = ["Java", "Spring Boot", "React", "Node.js", "TypeScript", "Python", "MongoDB", "PostgreSQL", "Redis", "Kafka", "Docker", "Kubernetes", "AWS", "GraphQL", "System Design", "DSA", "LangChain", "RAG", "LLMs", "Microservices"];

const FEATURES = [
  { icon: "🗺️", title: "6 Career Tracks", desc: "Guided roadmaps from zero to senior: Java Full-Stack, MERN, GenAI, Data Engineering, Python Backend & more." },
  { icon: "💼", title: "Prepare by Job Role", desc: "Targeted question banks for Java Backend, Node, MERN, GenAI, SDE-1/2 — filtered by your experience level." },
  { icon: "❓", title: "1,600+ Interview Q&A", desc: "Real, most-asked questions with clear answers — Core, DBMS, System Design, DSA, Scenario, HR & Manager rounds." },
  { icon: "🎯", title: "Flashcard Quiz Mode", desc: "Flip cards, shuffle, and mark what you know. Turn passive reading into active recall." },
  { icon: "📊", title: "Clean Diagrams & Code", desc: "System-design diagrams and syntax-highlighted Java, JS, Python & SQL — built to actually understand." },
  { icon: "🔥", title: "Track Progress & Streaks", desc: "Tick topics, mark Q&A mastered, bookmark favourites, and keep a daily streak. Synced across all devices." },
];

const STATS = [
  { n: "1,600+", l: "Interview Q&A" },
  { n: "6", l: "Career Tracks" },
  { n: "6", l: "Job Roles" },
  { n: "100%", l: "Free" },
];

export default function Landing() {
  const supabase = useMemo(() => createClient(), []);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!supabase) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (mounted) setAuthed(!!user);
    })();
    return () => { mounted = false; };
  }, [supabase]);

  const primaryHref = authed ? "/dashboard" : "/signup";
  const primaryLabel = authed ? "Go to Dashboard →" : "Get started free →";

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-x-hidden">
      <TechBackground />

      {/* NAVBAR */}
      <nav className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg font-black shadow-lg shadow-blue-900/40">C</div>
          <span className="font-extrabold text-lg tracking-tight">Crack <span className="gradient-text">Any Job</span></span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="#features" className="hidden sm:inline text-sm text-slate-300 hover:text-white px-3 py-1.5">Features</a>
          {authed ? (
            <Link href="/dashboard" className="text-sm font-medium px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition">Dashboard</Link>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium px-3 sm:px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-500 hover:bg-slate-800 transition">Log in</Link>
              <Link href="/signup" className="text-sm font-medium px-3 sm:px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition">Sign up</Link>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <header className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-10 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700 text-slate-300 animate-fadeup">
          🚀 Your all-in-one tech interview prep
        </span>
        <h1 className="mt-6 text-4xl sm:text-6xl font-black leading-[1.05] tracking-tight animate-fadeup" style={{ animationDelay: "0.05s" }}>
          Crack your next <br className="hidden sm:block" />
          <span className="gradient-text">software engineering</span> job
        </h1>
        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto animate-fadeup" style={{ animationDelay: "0.12s" }}>
          Roadmaps, 1,600+ real interview Q&A, system-design diagrams, DSA, and role-specific
          question banks — from 1-year dev to senior. Study smart, track progress, land the offer.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fadeup" style={{ animationDelay: "0.18s" }}>
          <Link href={primaryHref} className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 font-semibold shadow-xl shadow-blue-900/30 transition">
            {primaryLabel}
          </Link>
          <Link href="/login" className="w-full sm:w-auto px-7 py-3 rounded-xl border border-slate-700 hover:border-slate-500 hover:bg-slate-800/60 font-semibold transition">
            I already have an account
          </Link>
        </div>

        {/* stats */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto animate-fadeup" style={{ animationDelay: "0.24s" }}>
          {STATS.map((s) => (
            <div key={s.l} className="rounded-xl bg-slate-800/40 border border-slate-700/60 py-4 backdrop-blur">
              <div className="text-2xl sm:text-3xl font-black text-white">{s.n}</div>
              <div className="text-xs text-slate-400 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </header>

      {/* TECH MARQUEE */}
      <div className="relative z-10 marquee py-4 border-y border-slate-800/70 bg-slate-900/30">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i} className="text-sm font-semibold text-slate-400 px-4 py-1 rounded-lg bg-slate-800/40 border border-slate-700/50">{t}</span>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl sm:text-4xl font-black text-center">Everything you need to <span className="gradient-text">get hired</span></h2>
        <p className="text-center text-slate-400 mt-3 max-w-xl mx-auto">One place for learning, practising, and revising — built by engineers, for engineers.</p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="group rounded-2xl bg-slate-800/40 border border-slate-700/60 p-6 hover:border-blue-500/50 hover:bg-slate-800/70 transition backdrop-blur">
              <div className="w-12 h-12 rounded-xl bg-slate-900/70 border border-slate-700 flex items-center justify-center text-2xl group-hover:scale-110 transition">{f.icon}</div>
              <h3 className="mt-4 font-bold text-lg text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 p-8 sm:p-12 text-center backdrop-blur">
          <h2 className="text-2xl sm:text-4xl font-black">Ready to crack your dream job?</h2>
          <p className="mt-3 text-slate-300">Create a free account — your progress saves automatically and syncs everywhere.</p>
          <Link href={primaryHref} className="inline-block mt-7 px-8 py-3.5 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-200 transition">
            {authed ? "Go to Dashboard →" : "Start preparing — it's free"}
          </Link>
        </div>
      </section>

      {/* CONNECT */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pb-16 text-center">
        <div className="rounded-2xl bg-slate-800/40 border border-slate-700/60 p-8 backdrop-blur">
          <h3 className="text-xl font-bold">Built by a developer, for developers</h3>
          <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
            Have feedback, found a bug, or want to contribute questions? Let's connect.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://github.com/jyotiram7402" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 font-medium transition">
              🐙 GitHub
            </a>
            <a href="mailto:jyotiramkamble7402@gmail.com" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 font-medium transition">
              ✉️ jyotiramkamble7402@gmail.com
            </a>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-slate-800 py-8 text-center text-xs text-slate-500">
        <div className="font-bold text-slate-300 mb-1">Crack <span className="gradient-text">Any Job</span></div>
        <p className="max-w-xl mx-auto text-slate-400 mb-2">
          Curated from real candidates' interview experiences and the most-repeated questions asked across the internet.
        </p>
        Roadmaps · Interview Q&A · Diagrams · DSA · Role prep · Free forever
      </footer>
    </div>
  );
}
