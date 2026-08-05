"use client";
import { useEffect, useMemo, useState } from "react";
import { buildReport, formatDuration, categoryLabel } from "@/lib/activity";

const CAT_COLORS = {
  dsa: "from-blue-500 to-cyan-500",
  java: "from-rose-500 to-red-500",
  springboot: "from-green-500 to-emerald-500",
  maven: "from-violet-500 to-fuchsia-500",
  sql: "from-emerald-500 to-teal-500",
  roadmap: "from-amber-500 to-orange-500",
  roles: "from-purple-500 to-fuchsia-500",
};

export default function ProgressView() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const upd = () => setReport(buildReport(14));
    upd();
    window.addEventListener("activity-change", upd);
    const t = setInterval(upd, 30000);
    return () => { window.removeEventListener("activity-change", upd); clearInterval(t); };
  }, []);

  const maxTime = useMemo(() => Math.max(1, ...((report?.series || []).map((d) => d.timeMs))), [report]);
  const solvedRows = useMemo(() => Object.entries(report?.doneByCat || {}).sort((a, b) => b[1] - a[1]), [report]);
  const visitRows = useMemo(() => Object.entries(report?.visitsByCat || {}).sort((a, b) => b[1] - a[1]), [report]);

  if (!report) return <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-zinc-500 animate-pulse">Loading progress…</main>;

  const maxVisit = Math.max(1, ...visitRows.map((r) => r[1]));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white">📊 Your Progress</h2>
        <p className="text-sm text-zinc-400 mt-1">Streak, time spent, and what you&apos;ve solved — tracked on this device.</p>
      </div>

      {/* headline stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Stat icon="🔥" label="Current streak" value={`${report.streak} day${report.streak === 1 ? "" : "s"}`} accent="text-orange-400" />
        <Stat icon="🏆" label="Longest streak" value={`${report.longest} day${report.longest === 1 ? "" : "s"}`} accent="text-amber-400" />
        <Stat icon="⏱" label="Time today" value={formatDuration(report.todayTimeMs)} sub={`${formatDuration(report.totalTimeMs)} total`} accent="text-cyan-400" />
        <Stat icon="✅" label="Marked done" value={report.doneTotal} sub={`${report.activeDays} active days`} accent="text-emerald-400" />
      </div>

      {/* time per day (last 14) */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#1c1c20]/40 p-4">
        <h3 className="text-sm font-bold text-white mb-3">Time spent — last 14 days</h3>
        <div className="flex items-end gap-1.5 h-40">
          {report.series.map((d) => {
            const h = Math.round((d.timeMs / maxTime) * 100);
            const day = new Date(d.date + "T00:00:00");
            return (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group">
                <div className="w-full flex-1 flex items-end">
                  <div className={`w-full rounded-t ${d.timeMs > 0 ? "bg-gradient-to-t from-blue-600 to-cyan-400" : "bg-white/[0.06]"}`}
                    style={{ height: `${Math.max(h, d.timeMs > 0 ? 6 : 2)}%` }} title={`${d.date}: ${formatDuration(d.timeMs)}, ${d.solved} solved`} />
                </div>
                <span className="text-[9px] text-zinc-500">{day.getDate()}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-2 text-[11px] text-zinc-500 text-right">hover a bar for that day&apos;s detail</div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* solved by category */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#1c1c20]/40 p-4">
          <h3 className="text-sm font-bold text-white mb-3">Solved by category</h3>
          {solvedRows.length === 0 ? (
            <p className="text-sm text-zinc-500">Nothing marked done yet. Open a question and hit <span className="text-emerald-400">Mark as done</span>.</p>
          ) : (
            <div className="space-y-2">
              {solvedRows.map(([cat, n]) => {
                const max = Math.max(1, ...solvedRows.map((r) => r[1]));
                return (
                  <div key={cat}>
                    <div className="flex justify-between text-xs mb-0.5"><span className="text-zinc-300">{categoryLabel(cat)}</span><span className="text-zinc-400 font-semibold">{n}</span></div>
                    <div className="h-2 bg-[#141417] rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${CAT_COLORS[cat] || "from-zinc-600 to-zinc-500"}`} style={{ width: `${(n / max) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* visits by category */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#1c1c20]/40 p-4">
          <h3 className="text-sm font-bold text-white mb-3">Questions viewed by category</h3>
          {visitRows.length === 0 ? (
            <p className="text-sm text-zinc-500">No visits tracked yet — open any question to start.</p>
          ) : (
            <div className="space-y-2">
              {visitRows.map(([cat, n]) => (
                <div key={cat}>
                  <div className="flex justify-between text-xs mb-0.5"><span className="text-zinc-300">{categoryLabel(cat)}</span><span className="text-zinc-400 font-semibold">{n} views</span></div>
                  <div className="h-2 bg-[#141417] rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${CAT_COLORS[cat] || "from-zinc-600 to-zinc-500"}`} style={{ width: `${(n / maxVisit) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* daily report table */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#1c1c20]/40 p-4">
        <h3 className="text-sm font-bold text-white mb-3">Daily report</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-zinc-400 text-left">
                <th className="py-1.5 pr-4 font-semibold">Date</th>
                <th className="py-1.5 pr-4 font-semibold">Time spent</th>
                <th className="py-1.5 pr-4 font-semibold">Viewed</th>
                <th className="py-1.5 pr-4 font-semibold">Solved</th>
                <th className="py-1.5 font-semibold">Active</th>
              </tr>
            </thead>
            <tbody>
              {[...report.series].reverse().map((d) => (
                <tr key={d.date} className="border-t border-white/[0.08]">
                  <td className="py-1.5 pr-4 text-zinc-300">{d.date}</td>
                  <td className="py-1.5 pr-4 text-cyan-300">{formatDuration(d.timeMs)}</td>
                  <td className="py-1.5 pr-4 text-zinc-300">{d.visits}</td>
                  <td className="py-1.5 pr-4 text-emerald-300">{d.solved}</td>
                  <td className="py-1.5">{d.active ? <span className="text-emerald-400">●</span> : <span className="text-zinc-600">○</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

function Stat({ icon, label, value, sub, accent }) {
  return (
    <div className="rounded-xl bg-[#18181b] border border-white/[0.06] p-3">
      <div className="text-lg">{icon}</div>
      <div className={`text-xl sm:text-2xl font-black ${accent}`}>{value}</div>
      <div className="text-[11px] text-zinc-400 mt-0.5">{label}{sub ? ` · ${sub}` : ""}</div>
    </div>
  );
}
