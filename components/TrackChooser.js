"use client";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { LogOut, ArrowRight } from "@/components/icons";
import { TRACKS } from "@/data/tracks";

const ACCENT = {
  amber: "from-amber-500 to-orange-500",
  green: "from-green-500 to-emerald-500",
  purple: "from-purple-500 to-fuchsia-500",
  cyan: "from-cyan-500 to-sky-500",
  blue: "from-blue-500 to-indigo-500",
  teal: "from-teal-500 to-cyan-500",
};

export default function TrackChooser({ user, onSelect, onSignOut }) {
  const name = (user?.email || "there").split("@")[0];
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <header className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Logo size={30} textClass="text-[15px] text-white" />
          <div className="flex-1" />
          <ThemeToggle />
          {onSignOut && (
            <button onClick={onSignOut} title="Sign out" aria-label="Sign out"
              className="inline-grid place-items-center w-9 h-9 rounded-lg border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/[0.18] transition">
              <LogOut size={16} />
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 mb-4">
            <span>👋</span> Welcome, {name}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">Choose your career track</h1>
          <p className="mt-2 text-[15px] text-zinc-400">
            Pick the path you&apos;re preparing for. It tailors your roadmap, checklists and progress — you can switch anytime from the sidebar.
          </p>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {TRACKS.map((t) => (
            <button key={t.id} onClick={() => onSelect(t.id)}
              className="ui-card ui-card-hover ui-glow group text-left p-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ACCENT[t.accent] || ACCENT.amber} grid place-items-center text-2xl shadow-md flex-shrink-0`}>
                  {t.icon}
                </span>
                <div className="min-w-0">
                  <div className="text-[15px] font-semibold text-white truncate">{t.name}</div>
                  <div className="text-[11px] text-zinc-500">{t.short}</div>
                </div>
              </div>
              <p className="text-[12.5px] text-zinc-400 leading-relaxed flex-1">{t.tagline}</p>
              <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-blue-400 group-hover:gap-2.5 transition-all">
                Start this track <ArrowRight size={14} />
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
