"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import LiveClock from "@/components/LiveClock";
import ThemeToggle from "@/components/ThemeToggle";
import { Sparkles, Code2, Leaf, Rocket, Wrench, MessageSquare, Check, ArrowRight, ChevronDown } from "@/components/icons";
import { AI_PLAN, SWITCH_PLANS, planItemCount } from "@/data/switch-plan";

const SECTION_ICON = { code: Code2, leaf: Leaf, sparkles: Sparkles, rocket: Rocket, wrench: Wrench, message: MessageSquare };

export default function SwitchPage() {
  const plan = SWITCH_PLANS[0];
  const storeKey = `crackdev.switch.${plan.id}`;

  const [done, setDone] = useState({});
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState({}); // accordion open-state, all collapsed by default

  useEffect(() => {
    try { setDone(JSON.parse(localStorage.getItem(storeKey) || "{}")); } catch {}
    setReady(true);
  }, [storeKey]);

  function toggleDone(id) {
    setDone((d) => {
      const n = { ...d };
      if (n[id]) delete n[id]; else n[id] = true;
      try { localStorage.setItem(storeKey, JSON.stringify(n)); } catch {}
      return n;
    });
  }
  const toggleOpen = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }));
  function setAll(v) {
    if (!v) return setOpen({});
    const next = {};
    plan.sections.forEach((s) => (next["sec:" + s.id] = true));
    plan.calendar.forEach((_p, i) => (next["cal:" + i] = true));
    setOpen(next);
  }

  const total = useMemo(() => planItemCount(plan), [plan]);
  const checked = useMemo(() => plan.sections.reduce((n, s) => n + s.items.reduce((m, _it, i) => m + (done[`${s.id}-${i}`] ? 1 : 0), 0), 0), [plan, done]);
  const pct = total ? Math.round((checked / total) * 100) : 0;
  const anyOpen = Object.values(open).some(Boolean);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col">
      <header className="sticky top-0 z-20 bg-[#0e0e11]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-blue-400 hover:underline whitespace-nowrap">← Dashboard</Link>
          <h1 className="text-[15px] font-semibold flex-1 min-w-0 truncate flex items-center gap-2">
            <Sparkles size={17} className="text-fuchsia-400" /> Career Switch Plan
          </h1>
          <LiveClock className="hidden sm:flex" />
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 space-y-8">
        <AiPlanPitch />

        {/* Ready-made plan */}
        <section>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-white">{plan.title}</h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-600/30">Free starter plan</span>
              </div>
              <p className="text-sm text-zinc-400 mt-1">{plan.tagline}</p>
              <p className="text-[13px] text-zinc-500 mt-1">{plan.timeline}</p>
            </div>
            <button onClick={() => setAll(!anyOpen)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[#1c1c20] border border-white/[0.08] text-zinc-300 hover:text-white hover:border-white/[0.18] transition whitespace-nowrap">
              {anyOpen ? "Collapse all" : "Expand all"}
            </button>
          </div>

          {/* overall progress */}
          <div className="mt-4 rounded-2xl border border-white/[0.06] bg-[#18181b] p-4 sm:p-5">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-zinc-200 font-semibold">Overall progress</span>
              <span className="text-blue-400 font-bold">{checked}/{total} · {pct}%</span>
            </div>
            <div className="h-3 bg-[#141417] rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 transition-all duration-500" style={{ width: `${ready ? pct : 0}%` }} />
            </div>
          </div>

          {/* daily structure + rules */}
          <div className="mt-4 grid md:grid-cols-2 gap-3">
            <InfoCard title="Daily structure" items={plan.daily} accent="text-blue-400" />
            <InfoCard title="The rules that make it work" items={plan.rules} accent="text-amber-400" />
          </div>

          {/* section heading */}
          <h3 className="mt-8 mb-3 text-[13px] font-bold uppercase tracking-wider text-zinc-500">The plan · tap a section to open</h3>

          {/* checkable sections (accordion) */}
          <div className="space-y-2.5">
            {plan.sections.map((s) => {
              const Icon = SECTION_ICON[s.icon] || Code2;
              const secTotal = s.items.length;
              const secDone = s.items.reduce((m, _it, i) => m + (done[`${s.id}-${i}`] ? 1 : 0), 0);
              const secPct = secTotal ? Math.round((secDone / secTotal) * 100) : 0;
              const isOpen = !!open["sec:" + s.id];
              const complete = secDone === secTotal;
              return (
                <section key={s.id} className="rounded-2xl border border-white/[0.06] bg-[#18181b] overflow-hidden">
                  <button onClick={() => toggleOpen("sec:" + s.id)} aria-expanded={isOpen}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-[#1f1f23] transition">
                    <span className={`w-9 h-9 rounded-xl grid place-items-center flex-shrink-0 ${complete ? "bg-emerald-500/15 text-emerald-400" : "bg-fuchsia-500/12 text-fuchsia-300"}`}><Icon size={18} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="text-[15px] font-bold text-white flex items-center gap-2 flex-wrap">
                        {s.name}
                        {s.when && <span className="text-[10.5px] font-medium text-zinc-500">· {s.when}</span>}
                      </span>
                      {/* progress bar */}
                      <span className="mt-1.5 flex items-center gap-2">
                        <span className="flex-1 h-1.5 bg-[#141417] rounded-full overflow-hidden block max-w-[220px]">
                          <span className={`block h-full rounded-full transition-all ${complete ? "bg-emerald-500" : "bg-gradient-to-r from-blue-500 to-fuchsia-500"}`} style={{ width: `${ready ? secPct : 0}%` }} />
                        </span>
                        <span className={`text-[11px] font-semibold ${complete ? "text-emerald-400" : "text-zinc-400"}`}>{secDone}/{secTotal}</span>
                      </span>
                    </span>
                    <ChevronDown size={18} className={`text-zinc-500 flex-shrink-0 transition-transform duration-200 ${isOpen ? "" : "-rotate-90"}`} />
                  </button>

                  {isOpen && (
                    <div className="px-3 sm:px-4 pb-4 anim-fade-in">
                      {s.note && <p className="pt-1 pb-2 px-1 text-[12.5px] text-zinc-400 leading-relaxed border-t border-white/[0.06]">{s.note}</p>}
                      <ul className="space-y-1.5">
                        {s.items.map((it, i) => {
                          const id = `${s.id}-${i}`;
                          const isDone = !!done[id];
                          return (
                            <li key={id}>
                              <button onClick={() => toggleDone(id)}
                                className={`w-full text-left flex gap-3 rounded-xl px-3 py-2.5 border transition ${isDone ? "bg-emerald-500/[0.06] border-emerald-700/30" : "bg-[#1c1c20] border-white/[0.06] hover:border-white/[0.14]"}`}>
                                <span className={`mt-0.5 w-5 h-5 rounded-md border grid place-items-center flex-shrink-0 transition ${isDone ? "bg-emerald-500 border-emerald-500 text-white" : "border-white/25 text-transparent"}`}>
                                  <Check size={13} strokeWidth={3} />
                                </span>
                                <span className="min-w-0">
                                  <span className={`text-sm flex items-center gap-2 flex-wrap ${isDone ? "text-zinc-500 line-through" : "text-zinc-100"}`}>
                                    {it.t}
                                    {it.bonus && <span className="text-[10px] font-semibold px-1.5 rounded-full bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-600/30 no-underline">+ bonus</span>}
                                  </span>
                                  {it.d && <span className={`block text-[12px] mt-0.5 leading-relaxed ${isDone ? "text-zinc-600" : "text-zinc-500"}`}>{it.d}</span>}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          {/* week-by-week calendar (accordion) */}
          <h3 className="mt-8 mb-3 text-[13px] font-bold uppercase tracking-wider text-zinc-500">Week-by-week calendar</h3>
          <div className="space-y-2.5">
            {plan.calendar.map((ph, pi) => {
              const isOpen = !!open["cal:" + pi];
              return (
                <div key={pi} className="rounded-2xl border border-white/[0.06] bg-[#18181b] overflow-hidden">
                  <button onClick={() => toggleOpen("cal:" + pi)} aria-expanded={isOpen}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-[#1f1f23] transition">
                    <span className="text-[14px] font-bold text-white flex-1 min-w-0">{ph.phase}</span>
                    <ChevronDown size={18} className={`text-zinc-500 flex-shrink-0 transition-transform duration-200 ${isOpen ? "" : "-rotate-90"}`} />
                  </button>
                  {isOpen && (
                    <div className="px-3 sm:px-4 pb-4 anim-fade-in">
                      <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
                        <table className="w-full text-xs border-collapse">
                          <thead>
                            <tr className="bg-[#141417] text-zinc-400">
                              {["Week", "DSA", "Spring", "GenAI", "Weekend"].map((h) => (
                                <th key={h} className="text-left font-semibold px-3 py-2 border-b border-white/[0.06]">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {ph.rows.map((r, ri) => {
                              const merged = r[2] === "" && r[3] === "" && r[4] === "";
                              return (
                                <tr key={ri} className={ri % 2 ? "bg-[#1c1c20]" : "bg-[#18181b]"}>
                                  <td className="px-3 py-2 font-semibold text-zinc-200 border-b border-white/[0.05] whitespace-nowrap align-top">{r[0]}</td>
                                  <td className="px-3 py-2 text-zinc-300 border-b border-white/[0.05] align-top" colSpan={merged ? 4 : 1}>{r[1]}</td>
                                  {!merged && <>
                                    <td className="px-3 py-2 text-zinc-300 border-b border-white/[0.05] align-top">{r[2]}</td>
                                    <td className="px-3 py-2 text-zinc-300 border-b border-white/[0.05] align-top">{r[3]}</td>
                                    <td className="px-3 py-2 text-zinc-300 border-b border-white/[0.05] align-top">{r[4]}</td>
                                  </>}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {plan.footnotes && (
            <div className="mt-6 space-y-2">
              {plan.footnotes.map((f, i) => (
                <div key={i} className="flex gap-2.5 rounded-xl border border-amber-600/30 bg-amber-500/[0.08] p-3.5">
                  <span className="text-amber-400 flex-shrink-0">📌</span>
                  <span className="text-[13px] text-zinc-200 leading-relaxed">{f}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-white/[0.08] py-6 text-center text-xs text-zinc-500">
        <div className="font-extrabold text-zinc-300 mb-1">Crack<span className="gradient-text">Dev</span></div>
        Your switch progress is saved on this device
      </footer>
    </div>
  );
}

function InfoCard({ title, items, accent }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#18181b] p-4">
      <div className={`text-[11px] font-bold uppercase tracking-wide mb-2 ${accent}`}>{title}</div>
      <ul className="space-y-1.5">
        {items.map((x, i) => (
          <li key={i} className="flex gap-2 text-[13px] text-zinc-300 leading-relaxed"><span className="text-zinc-600 flex-shrink-0">•</span><span>{x}</span></li>
        ))}
      </ul>
    </div>
  );
}

function AiPlanPitch() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", current: "", target: "", timeline: "", notes: "" });

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  function submit(e) {
    e.preventDefault();
    const subject = "CrackDev — Custom AI switch-plan request";
    const body =
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Current role / stack: ${form.current}\n` +
      `Target role: ${form.target}\n` +
      `Timeline / availability: ${form.timeline}\n\n` +
      `What I want:\n${form.notes}`;
    // Opens the user's own mail client, prefilled — the user chooses to send.
    window.location.href = `mailto:${AI_PLAN.devEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-fuchsia-700/30 p-5 sm:p-7"
      style={{ background: "linear-gradient(135deg, rgba(217,70,239,0.14), rgba(59,130,246,0.10))" }}>
      <div className="inline-flex items-center gap-2 text-[11px] font-bold px-2.5 py-1 rounded-full bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30">
        <Sparkles size={13} /> AI-POWERED · PREMIUM
      </div>
      <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white leading-tight">{AI_PLAN.headline}</h2>
      <p className="mt-2 text-[15px] text-zinc-300 max-w-2xl leading-relaxed">{AI_PLAN.sub}</p>

      <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2 max-w-2xl">
        {AI_PLAN.bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-[13.5px] text-zinc-200"><Check size={16} className="text-fuchsia-400 flex-shrink-0 mt-0.5" /><span>{b}</span></li>
        ))}
      </ul>

      <div className="mt-5 rounded-xl bg-[#141417] border border-white/[0.08] p-3 text-[13px] text-zinc-300">
        💎 {AI_PLAN.paidNote}
      </div>

      {!open && !sent && (
        <button onClick={() => setOpen(true)}
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold shadow-lg shadow-fuchsia-500/25 transition">
          Request my custom plan <ArrowRight size={16} />
        </button>
      )}

      {sent && (
        <div className="mt-5 rounded-xl border border-emerald-700/40 bg-emerald-500/10 p-4">
          <div className="text-sm font-semibold text-emerald-400">Your email draft is ready ✉️</div>
          <p className="text-[13px] text-zinc-300 mt-1">
            We opened your mail app with the details filled in — just hit send. If nothing opened, email us directly at{" "}
            <a href={`mailto:${AI_PLAN.devEmail}`} className="text-blue-400 hover:underline">{AI_PLAN.devEmail}</a>.
          </p>
        </div>
      )}

      {open && !sent && (
        <form onSubmit={submit} className="mt-5 grid sm:grid-cols-2 gap-3 max-w-2xl">
          <Field label="Your name" value={form.name} onChange={(v) => set("name", v)} required />
          <Field label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} required />
          <Field label="Current role / stack" placeholder="e.g. Java dev, 2 yrs" value={form.current} onChange={(v) => set("current", v)} />
          <Field label="Target role" placeholder="e.g. GenAI Engineer" value={form.target} onChange={(v) => set("target", v)} />
          <Field label="Timeline / weekly availability" placeholder="e.g. 4 office hrs + weekends, 4 months" value={form.timeline} onChange={(v) => set("timeline", v)} className="sm:col-span-2" />
          <div className="sm:col-span-2">
            <label className="block text-[12px] font-medium text-zinc-400 mb-1">Anything specific you want in the plan</label>
            <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={3}
              className="w-full px-3 py-2 bg-[#141417] border border-white/[0.1] rounded-lg text-sm text-white focus:outline-none focus:border-fuchsia-500/60" />
          </div>
          <div className="sm:col-span-2 flex items-center gap-3">
            <button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold transition">
              Send request <ArrowRight size={16} />
            </button>
            <button type="button" onClick={() => setOpen(false)} className="text-sm text-zinc-400 hover:text-white transition">Cancel</button>
          </div>
        </form>
      )}
    </section>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, required, className = "" }) {
  return (
    <div className={className}>
      <label className="block text-[12px] font-medium text-zinc-400 mb-1">{label}{required && <span className="text-fuchsia-400"> *</span>}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={required}
        className="w-full px-3 py-2 bg-[#141417] border border-white/[0.1] rounded-lg text-sm text-white focus:outline-none focus:border-fuchsia-500/60" />
    </div>
  );
}
