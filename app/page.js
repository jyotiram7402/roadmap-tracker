"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { TRACKS } from "@/data/tracks";
import { ROLES } from "@/data/roles";
import Logo from "@/components/Logo";
import BrandFooter from "@/components/BrandFooter";
import ThemeToggle from "@/components/ThemeToggle";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiNodedotjs, SiPython,
  SiSpring, SiPostgresql, SiMongodb, SiRedis, SiDocker, SiKubernetes,
  SiGraphql, SiTailwindcss, SiGit,
} from "react-icons/si";
import { Coffee, Code2, Sparkles, Database, Zap, MessageSquare } from "@/components/icons";

// Recognizable icon + tinted tile per track / role.
const DEFAULT_ICON = { Icon: Code2, color: "text-zinc-300", bg: "bg-white/5" };
const ROLE_ICON = {
  "java-backend": { Icon: Coffee, color: "text-amber-400", bg: "bg-amber-500/10" },
  "node-backend": { Icon: SiNodedotjs, color: "text-green-400", bg: "bg-green-500/10" },
  "mern-dev": { Icon: SiReact, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  "java-fullstack-role": { Icon: SiSpring, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  "genai-role": { Icon: Sparkles, color: "text-fuchsia-400", bg: "bg-fuchsia-500/10" },
  "sde": { Icon: Code2, color: "text-blue-400", bg: "bg-blue-500/10" },
};
const TRACK_ICON = {
  "java-fullstack": { Icon: Coffee, color: "text-amber-400", bg: "bg-amber-500/10" },
  "mern": { Icon: SiMongodb, color: "text-green-400", bg: "bg-green-500/10" },
  "genai": { Icon: Sparkles, color: "text-fuchsia-400", bg: "bg-fuchsia-500/10" },
  "fde": { Icon: Zap, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  "data-engineer": { Icon: Database, color: "text-blue-400", bg: "bg-blue-500/10" },
  "python-backend": { Icon: SiPython, color: "text-sky-400", bg: "bg-sky-500/10" },
  "interview-prep": { Icon: MessageSquare, color: "text-violet-400", bg: "bg-violet-500/10" },
};

const LOGOS = [
  { I: SiReact, c: "#61DAFB", n: "React" },
  { I: SiNextdotjs, c: "#FFFFFF", n: "Next.js" },
  { I: SiTypescript, c: "#3178C6", n: "TypeScript" },
  { I: SiJavascript, c: "#F7DF1E", n: "JavaScript" },
  { I: SiNodedotjs, c: "#5FA04E", n: "Node.js" },
  { I: SiPython, c: "#3776AB", n: "Python" },
  { I: SiSpring, c: "#6DB33F", n: "Spring" },
  { I: SiPostgresql, c: "#4169E1", n: "PostgreSQL" },
  { I: SiMongodb, c: "#47A248", n: "MongoDB" },
  { I: SiRedis, c: "#FF4438", n: "Redis" },
  { I: SiDocker, c: "#2496ED", n: "Docker" },
  { I: SiKubernetes, c: "#326CE5", n: "Kubernetes" },
  { I: SiGraphql, c: "#E10098", n: "GraphQL" },
  { I: SiTailwindcss, c: "#06B6D4", n: "Tailwind" },
  { I: SiGit, c: "#F05032", n: "Git" },
];

const STATS = [
  { n: "1,600+", l: "Interview Q&A" },
  { n: "230+", l: "DSA problems" },
  { n: "6", l: "Career tracks" },
  { n: "100%", l: "Free forever" },
];

const STEPS = [
  { n: "01", t: "Pick a track or role", d: "Choose a learning path or a target job role and experience level." },
  { n: "02", t: "Study real Q&A", d: "Most-asked questions with clear answers, code, and clean diagrams." },
  { n: "03", t: "Practice & revise", d: "DSA studio, flashcards, quick quizzes, and your own code snippets." },
  { n: "04", t: "Track your progress", d: "Streaks, time spent, and mastery — synced across every device." },
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
    <div className="relative min-h-screen overflow-x-hidden bg-[#09090b] text-zinc-100">
      {/* ambient background */}
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: "radial-gradient(60% 42% at 50% -5%, rgba(59,130,246,.12), transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse at 50% 0%, black, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse at 50% 0%, black, transparent 70%)" }} />
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-30 backdrop-blur-xl border-b" style={{ background: "var(--header-bg)", borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Logo size={32} textClass="text-[15px] text-white" />
          <div className="flex items-center gap-1 sm:gap-2">
            <a href="#tracks" className="hidden sm:inline text-[13px] text-zinc-400 hover:text-white px-3 py-2 rounded-lg transition">Tracks</a>
            <a href="#roles" className="hidden sm:inline text-[13px] text-zinc-400 hover:text-white px-3 py-2 rounded-lg transition">Roles</a>
            <ThemeToggle />
            {authed ? (
              <Link href="/dashboard" className="text-[13px] font-semibold px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition">Dashboard</Link>
            ) : (
              <>
                <Link href="/login" className="text-[13px] font-medium px-3 py-2 rounded-lg text-zinc-300 hover:text-white transition">Log in</Link>
                <Link href="/signup" className="text-[13px] font-semibold px-3.5 py-2 rounded-lg bg-white text-zinc-900 hover:bg-zinc-200 transition">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 text-center">
        <span className="inline-flex items-center gap-2 text-[12px] font-medium px-3 py-1.5 rounded-full text-zinc-300 anim-fade-up" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Your all-in-one tech interview prep
        </span>
        <h1 className="mt-6 text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] text-white anim-fade-up" style={{ animationDelay: ".04s" }}>
          Crack your next <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">software engineering</span> job
        </h1>
        <p className="mt-5 text-[15px] sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed anim-fade-up" style={{ animationDelay: ".08s" }}>
          Roadmaps, 1,600+ real interview Q&amp;A, DSA with brute → optimal solutions, SQL, and role-specific
          question banks — from 1-year dev to senior. Study smart, track progress, land the offer.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 anim-fade-up" style={{ animationDelay: ".12s" }}>
          <Link href={go} className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/25 transition inline-flex items-center justify-center gap-2">
            {authed ? "Go to Dashboard" : "Get started — free"} <span aria-hidden="true">→</span>
          </Link>
          <Link href="/login" className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-zinc-200 hover:text-white transition" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            I already have an account
          </Link>
        </div>
        <p className="mt-4 text-[12px] text-zinc-500">Free forever · No credit card · Progress syncs everywhere</p>
      </header>

      {/* LOGO CLOUD */}
      <section className="relative z-10 py-7 border-y" style={{ borderColor: "var(--border)", background: "rgba(255,255,255,.012)" }}>
        <p className="text-center text-[11px] uppercase tracking-wider text-zinc-500 mb-5">Practice the stack real companies hire for</p>
        <div className="marquee">
          <div className="marquee-track">
            {[...LOGOS, ...LOGOS].map((L, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-4 text-zinc-400" title={L.n}>
                <L.I size={22} style={{ color: L.c }} />
                <span className="text-[13px] font-medium whitespace-nowrap">{L.n}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {STATS.map((s) => (
            <div key={s.l} className="ui-card p-4 sm:p-5 text-center">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{s.n}</div>
              <div className="text-[12px] text-zinc-500 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TRACKS */}
      <section id="tracks" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-14 scroll-mt-16">
        <div className="mb-8">
          <span className="text-[12px] font-semibold uppercase tracking-wider text-blue-400">Learning tracks</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-2">Guided roadmaps, zero to senior</h2>
          <p className="text-zinc-400 mt-2 max-w-xl text-[15px]">Follow a structured path with checklists, Q&amp;A, and system-design diagrams for each stage.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {TRACKS.map((t) => {
            const ic = TRACK_ICON[t.id] || DEFAULT_ICON;
            return (
              <Link key={t.id} href={trackHref} className="ui-card ui-card-hover ui-glow group p-5 flex flex-col">
                <div className="flex items-center gap-3">
                  <span className={`w-10 h-10 rounded-xl grid place-items-center flex-shrink-0 ${ic.bg}`}><ic.Icon size={20} className={ic.color} /></span>
                  <h3 className="font-semibold text-[15px] text-white">{t.name}</h3>
                </div>
                <p className="mt-3 text-[13px] text-zinc-400 leading-relaxed flex-1">{t.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-blue-400 group-hover:gap-2 transition-all">Explore <span aria-hidden="true">→</span></span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ROLES */}
      <section id="roles" className="relative z-10 border-y scroll-mt-16" style={{ borderColor: "var(--border)", background: "rgba(255,255,255,.01)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="mb-8">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-violet-400">Prepare by job role</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-2">Target the exact role you&apos;re interviewing for</h2>
            <p className="text-zinc-400 mt-2 max-w-xl text-[15px]">Curated banks by role and experience level — core, DBMS, system design, DSA, scenario, and HR rounds.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {ROLES.map((r) => {
              const ic = ROLE_ICON[r.id] || DEFAULT_ICON;
              return (
                <Link key={r.id} href={roleHref} className="ui-card ui-card-hover group p-5 flex items-start gap-3">
                  <span className={`w-10 h-10 rounded-xl grid place-items-center flex-shrink-0 ${ic.bg}`}><ic.Icon size={20} className={ic.color} /></span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[15px] text-white">{r.name}</h3>
                    <p className="mt-1 text-[13px] text-zinc-400 leading-relaxed">{r.tagline}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-violet-400 group-hover:gap-2 transition-all">Start prep <span aria-hidden="true">→</span></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center text-white">How it works</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s) => (
            <div key={s.n} className="ui-card p-5">
              <div className="text-[13px] font-bold text-blue-400 tabular-nums">{s.n}</div>
              <h3 className="mt-3 font-semibold text-[15px] text-white">{s.t}</h3>
              <p className="mt-1.5 text-[13px] text-zinc-400 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="relative overflow-hidden rounded-2xl border p-8 sm:p-12 text-center" style={{ borderColor: "var(--border)", background: "linear-gradient(180deg, rgba(59,130,246,.12), rgba(139,92,246,.06))" }}>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Ready to crack your dream job?</h2>
          <p className="mt-3 text-zinc-300 text-[15px]">Create a free account — your progress saves automatically and syncs everywhere.</p>
          <Link href={go} className="inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-xl bg-white text-zinc-900 font-semibold hover:bg-zinc-200 transition">
            {authed ? "Go to Dashboard" : "Start preparing — it's free"} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <BrandFooter className="z-10" />
    </div>
  );
}
