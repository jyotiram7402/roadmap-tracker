"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import LiveClock from "@/components/LiveClock";
import ThemeToggle from "@/components/ThemeToggle";
import { Sparkles, Code2, Leaf, Rocket, Wrench, MessageSquare, Check, ArrowRight } from "@/components/icons";
import { AI_PLAN, SWITCH_PLANS, planItemCount } from "@/data/switch-plan";

const SECTION_ICON = { code: Code2, leaf: Leaf, sparkles: Sparkles, rocket: Rocket, wrench: Wrench, message: MessageSquare };

export default function SwitchPage() {
  const plan = SWITCH_PLANS[0];
  const storeKey = `crackdev.switch.${plan.id}`;

  const [done, setDone] = useState({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { setDone(JSON.parse(localStorage.getItem(storeKey) || "{}")); } catch {}
    setReady(true);
  }, [storeKey]);

  function toggle(id) {
    setDone((d) => {
      const n = { ...d };
      if (n[id]) delete n[id]; else n[id] = true;
      try { localStorage.setItem(storeKey, JSON.stringify(n)); } catch {}
      return n;
    });
  }

  const total = useMemo(() => planItemCount(plan), [plan]);
  const checked = useMemo(() => plan.sections.reduce((n, s) => n + s.items.reduce((m, _it, i) => m + (done[`${s.id}-${i}`] ? 1 : 0), 0), 0), [plan, done]);
  const pct = total ? Math.round((checked / total) * 100) : 0;

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
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-black text-white">{plan.title}</h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-600/30">Free starter plan</span>
          </div>
          <p className="text-sm text-zinc-400 mt-1">{plan.tagline}</p>
          <p className="text-[13px] text-zinc-500 mt-1">{plan.timeline}</p>

          {/* overall progress */}
          <div className="mt-4 rounded-xl border border-white/[0.06] bg-[#1c1c20]/40 p-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-zinc-300 font-semibold">Overall progress</span>
              <span className="text-blue-400 font-semibold">{checked}/{total} · {pct}%</span>
            </div>
            <div className="h-2.5 bg-[#141417] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-fuchsia-400 transition-all" style={{ width: `${ready ? pct : 0}%` }} />
            </div>
          </div>

          {/* daily structure + rules */}
          <div className="mt-4 grid md:grid-cols-2 gap-3">
            <InfoCard title="Daily structure" items={plan.daily} accent="text-blue-300" />
            <InfoCard title="The rules that make it work" items={plan.rules} accent="text-amber-300" />
          </div>

          {/* checkable sections */}
          <div className="mt-6 space-y-4">
            {plan.sections.map((s) => {
              const Icon = SECTION_ICON[s.icon] || Code2;
              const secTotal = s.items.length;
              const secDone = s.items.reduce((m, _it, i) => m + (done[`${s.id}-${i}`] ? 1 : 0), 0);
              const secPct = secTotal ? Math.round((secDone / secTotal) * 100) : 0;
              return (
                <section key={s.id} className="rounded-xl border border-white/[0.06] bg-[#18181b] overflow-hidden">
                  <div className="px-4 py-3 bg-[#141417] border-b border-white/[0.06] flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg grid place-items-center bg-white/[0.05] text-fuchsia-300 flex-shrink-0"><Icon size={17} /></span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-white flex items-center gap-2 flex-wrap">{s.name}
                        {s.when && <span className="text-[10.5px] font-medium text-zinc-500">· {s.when}</span>}
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-zinc-400 flex-shrink-0">{secDone}/{secTotal}</span>
                  </div>

                  <div className="h-1 bg-[#141417]"><div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all" style={{ width: `${ready ? secPct : 0}%` }} /></div>

                  {s.note && <p className="px-4 pt-3 text-[12.5px] text-zinc-400 leading-relaxed">{s.note}</p>}

                  <ul className="p-3 sm:p-4 space-y-1.5">
                    {s.items.map((it, i) => {
                      const id = `${s.id}-${i}`;
                      const isDone = !!done[id];
                      return (
                        <li key={id}>
                          <button onClick={() => toggle(id)}
                            className={`w-full text-left flex gap-3 rounded-lg px-2.5 py-2 border transition ${isDone ? "bg-emerald-500/[0.06] border-emerald-700/30" : "border-transparent hover:bg-white/[0.03]"}`}>
                            <span className={`mt-0.5 w-5 h-5 rounded-md border grid place-items-center flex-shrink-0 transition ${isDone ? "bg-emerald-500 border-emerald-500 text-white" : "border-white/25 text-transparent"}`}>
                              <Check size={13} strokeWidth={3} />
                            </span>
                            <span className="min-w-0">
                              <span className={`text-sm flex items-center gap-2 flex-wrap ${isDone ? "text-zinc-400 line-through" : "text-zinc-100"}`}>
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
                </section>
              );
            })}
          </div>

          {/* week-by-week calendar (reference) */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-white mb-1">Week-by-week calendar</h3>
            <p className="text-[13px] text-zinc-500 mb-3">What to touch each week — a reference map alongside the checklist above.</p>
            <div className="space-y-5">
              {plan.calendar.map((ph) => (
                <div key={ph.phase}>
                  <div className="text-[13px] font-semibold text-fuchsia-300 mb-2">{ph.phase}</div>
                  <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#141417] text-zinc-400">
                          <th className="text-left font-semibold px-3 py-2 border-b border-white/[0.06]">Week</th>
                          <th className="text-left font-semibold px-3 py-2 border-b border-white/[0.06]">DSA</th>
                          <th className="text-left font-semibold px-3 py-2 border-b border-white/[0.06]">Spring</th>
                          <th className="text-left font-semibold px-3 py-2 border-b border-white/[0.06]">GenAI</th>
                          <th className="text-left font-semibold px-3 py-2 border-b border-white/[0.06]">Weekend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ph.rows.map((r, ri) => (
                          <tr key={ri} className="odd:bg-[#18181b] even:bg-[#1c1c20]/40">
                            <td className="px-3 py-2 font-semibold text-zinc-200 border-b border-white/[0.05] whitespace-nowrap">{r[0]}</td>
                            <td className="px-3 py-2 text-zinc-300 border-b border-white/[0.05]" colSpan={r[2] === "" && r[3] === "" && r[4] === "" ? 4 : 1}>{r[1]}</td>
                            {!(r[2] === "" && r[3] === "" && r[4] === "") && <>
                              <td className="px-3 py-2 text-zinc-300 border-b border-white/[0.05]">{r[2]}</td>
                              <td className="px-3 py-2 text-zinc-300 border-b border-white/[0.05]">{r[3]}</td>
                              <td className="px-3 py-2 text-zinc-300 border-b border-white/[0.05]">{r[4]}</td>
                            </>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {plan.footnotes && (
            <div className="mt-6 space-y-2">
              {plan.footnotes.map((f, i) => (
                <div key={i} className="rounded-lg border border-amber-700/40 bg-amber-500/10 p-3 text-[13px] text-amber-100/90">📌 {f}</div>
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
    <div className="rounded-xl border border-white/[0.06] bg-[#18181b] p-4">
      <div className={`text-xs font-bold uppercase tracking-wide mb-2 ${accent}`}>{title}</div>
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
      style={{ background: "linear-gradient(135deg, rgba(217,70,239,0.12), rgba(59,130,246,0.10))" }}>
      <div className="inline-flex items-center gap-2 text-[11px] font-bold px-2.5 py-1 rounded-full bg-fuchsia-500/15 text-fuchsia-200 border border-fuchsia-500/30">
        <Sparkles size={13} /> AI-POWERED · PREMIUM
      </div>
      <h2 className="mt-3 text-2xl sm:text-3xl font-black text-white leading-tight">{AI_PLAN.headline}</h2>
      <p className="mt-2 text-[15px] text-zinc-300 max-w-2xl leading-relaxed">{AI_PLAN.sub}</p>

      <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2 max-w-2xl">
        {AI_PLAN.bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-[13.5px] text-zinc-200"><Check size={16} className="text-fuchsia-300 flex-shrink-0 mt-0.5" /><span>{b}</span></li>
        ))}
      </ul>

      <div className="mt-5 rounded-xl bg-black/20 border border-white/[0.08] p-3 text-[13px] text-zinc-300">
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
          <div className="text-sm font-semibold text-emerald-300">Your email draft is ready ✉️</div>
          <p className="text-[13px] text-zinc-300 mt-1">
            We opened your mail app with the details filled in — just hit send. If nothing opened, email us directly at{" "}
            <a href={`mailto:${AI_PLAN.devEmail}`} className="text-blue-300 hover:underline">{AI_PLAN.devEmail}</a>.
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
