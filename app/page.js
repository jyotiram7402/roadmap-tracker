"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { TRACKS } from "@/data/tracks";
import { ROLES } from "@/data/roles";

const ACCENT = {
  amber: "from-amber-400 to-orange-500",
  green: "from-green-400 to-emerald-500",
  purple: "from-purple-400 to-fuchsia-500",
  cyan: "from-cyan-400 to-sky-500",
  blue: "from-blue-500 to-indigo-500",
  teal: "from-teal-400 to-cyan-500",
  orange: "from-orange-400 to-red-500",
};

const MARQUEE = ["Java", "Spring Boot", "React", "Node.js", "TypeScript", "Python", "MongoDB", "PostgreSQL", "Redis", "Kafka", "Docker", "Kubernetes", "AWS", "GraphQL", "System Design", "DSA", "LangChain", "RAG", "LLMs", "Microservices"];

const STATS = [
  { n: "1,600+", l: "Interview Q&A", c: "text-blue-600" },
  { n: "6", l: "Career Tracks", c: "text-purple-600" },
  { n: "6", l: "Job Roles", c: "text-pink-600" },
  { n: "100%", l: "Free", c: "text-emerald-600" },
];

const STEPS = [
  { n: "1", t: "Pick a track or role", d: "Choose a learning path or a target job role and experience level.", c: "from-blue-500 to-indigo-500" },
  { n: "2", t: "Study real Q&A", d: "Most-asked questions with clear answers, code, and clean diagrams.", c: "from-purple-500 to-fuchsia-500" },
  { n: "3", t: "Practice & revise", d: "Flashcard quiz mode, bookmarks, and 'learn more' + LeetCode links.", c: "from-pink-500 to-rose-500" },
  { n: "4", t: "Track your progress", d: "Tick topics, mark Q&A mastered, keep a daily streak — synced everywhere.", c: "from-emerald-500 to-teal-500" },
];

export default function Landing() {
  const supabase = useMemo(() => createClient(), []);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!supabase) return;
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (mounted) setAuthed(!!user);
      } catch {}
    })();
    return () => { mounted = false; };
  }, [supabase]);

  const go = authed ? "/dashboard" : "/signup";
  const trackHref = authed ? "/dashboard" : "/signup";
  const roleHref = authed ? "/roles" : "/signup";

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-white via-indigo-50/40 to-white text-slate-800">
      {/* soft colorful blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -left-16 w-96 h-96 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute top-10 right-0 w-96 h-96 rounded-full bg-purple-300/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl" />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-10 sticky top-0 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg font-black text-white shadow-lg shadow-blue-500/30">C</div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900">Crack <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Any Job</span></span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="#tracks" className="hidden sm:inline text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5">Tracks</a>
            <a href="#roles" className="hidden sm:inline text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5">Roles</a>
            {authed ? (
              <Link href="/dashboard" className="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition">Dashboard</Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium px-3 sm:px-4 py-2 rounded-lg border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 transition">Log in</Link>
                <Link href="/signup" className="text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition shadow-md shadow-blue-500/20">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-10 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 animate-fadeup">
          🚀 Your all-in-one tech interview prep
        </span>
        <h1 className="mt-6 text-4xl sm:text-6xl font-black leading-[1.05] tracking-tight text-slate-900 animate-fadeup" style={{ animationDelay: "0.05s" }}>
          Crack your next <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">software engineering</span> job
        </h1>
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto animate-fadeup" style={{ animationDelay: "0.12s" }}>
          Roadmaps, 1,600+ real interview Q&A, system-design diagrams, DSA, and role-specific
          question banks — from 1-year dev to senior. Study smart, track progress, land the offer.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fadeup" style={{ animationDelay: "0.18s" }}>
          <Link href={go} className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-xl shadow-blue-500/25 transition">
            {authed ? "Go to Dashboard →" : "Get started free →"}
          </Link>
          <Link href="/login" className="w-full sm:w-auto px-7 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold transition">
            I already have an account
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto animate-fadeup" style={{ animationDelay: "0.24s" }}>
          {STATS.map((s) => (
            <div key={s.l} className="rounded-2xl bg-white border border-slate-200 shadow-sm py-4">
              <div className={`text-2xl sm:text-3xl font-black ${s.c}`}>{s.n}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </header>

      {/* MARQUEE */}
      <div className="relative z-10 marquee py-4 border-y border-slate-200 bg-white/60">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i} className="text-sm font-semibold text-slate-600 px-4 py-1 rounded-lg bg-white border border-slate-200 shadow-sm">{t}</span>
          ))}
        </div>
      </div>

      {/* TRACKS GRID */}
      <section id="tracks" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wide text-blue-600">Learning tracks</span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2">Guided roadmaps, zero to senior</h2>
          <p className="text-slate-500 mt-2 max-w-xl mx-auto">Follow a structured path with checklists, Q&A, and diagrams for each stage.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TRACKS.map((t) => (
            <Link key={t.id} href={trackHref} className="group rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${ACCENT[t.accent] || ACCENT.blue}`} />
              <div className="p-5">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ACCENT[t.accent] || ACCENT.blue} flex items-center justify-center text-2xl shadow-md`}>{t.icon}</div>
                <h3 className="mt-4 font-bold text-lg text-slate-900">{t.name}</h3>
                <p className="mt-1 text-sm text-slate-500 leading-relaxed">{t.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ROLES GRID */}
      <section id="roles" className="relative z-10 bg-gradient-to-b from-slate-50 to-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wide text-purple-600">Prepare by job role</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2">Target the exact role you're interviewing for</h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto">Curated banks by role and experience level — core, DBMS, system design, DSA, scenario, HR & manager rounds.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ROLES.map((r) => (
              <Link key={r.id} href={roleHref} className="group rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition overflow-hidden">
                <div className="p-5 flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ACCENT[r.accent] || ACCENT.blue} flex items-center justify-center text-2xl shadow-md flex-shrink-0`}>{r.icon}</div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900">{r.name}</h3>
                    <p className="mt-1 text-sm text-slate-500 leading-relaxed">{r.tagline}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-purple-600 group-hover:gap-2 transition-all">Start prep →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl sm:text-4xl font-black text-center text-slate-900">How it works</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${s.c} text-white font-black flex items-center justify-center`}>{s.n}</div>
              <h3 className="mt-4 font-bold text-slate-900">{s.t}</h3>
              <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 sm:p-12 text-center text-white shadow-2xl shadow-blue-500/20">
          <h2 className="text-2xl sm:text-4xl font-black">Ready to crack your dream job?</h2>
          <p className="mt-3 text-blue-50">Create a free account — your progress saves automatically and syncs everywhere.</p>
          <Link href={go} className="inline-block mt-7 px-8 py-3.5 rounded-xl bg-white text-blue-700 font-bold hover:bg-blue-50 transition">
            {authed ? "Go to Dashboard →" : "Start preparing — it's free"}
          </Link>
        </div>
      </section>

      {/* CONNECT */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pb-16 text-center">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-8">
          <h3 className="text-xl font-bold text-slate-900">Built by a developer, for developers</h3>
          <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto">Feedback, a bug, or want to contribute questions? Let's connect.</p>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://github.com/jyotiram7402" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 font-medium text-slate-700 transition">🐙 GitHub</a>
            <a href="mailto:jyotiramkamble7402@gmail.com" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 font-medium text-slate-700 transition">✉️ jyotiramkamble7402@gmail.com</a>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div className="font-extrabold text-slate-800 mb-1">Crack <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Any Job</span></div>
        <p className="max-w-xl mx-auto mb-2">Curated from real candidates' interview experiences and the most-repeated questions asked across the internet.</p>
        Roadmaps · Interview Q&A · Diagrams · DSA · Role prep · Free forever
      </footer>
    </div>
  );
}
