"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Code2, ArrowRight, CheckCircle2, Flame } from "@/components/icons";
import { getItems, todayStr } from "@/lib/activity";
import { DSA_PROBLEMS } from "@/data/dsa-problems";

const DSA_TOTAL = DSA_PROBLEMS.length;

export default function DsaActivityCard() {
  const [state, setState] = useState(null);

  useEffect(() => {
    const compute = () => {
      const items = getItems();
      const today = todayStr();
      let dsaDone = 0, logicDone = 0, viewedToday = 0;
      const solvedToday = [];
      for (const [key, it] of Object.entries(items)) {
        const cat = it.category;
        if (cat !== "dsa" && cat !== "logic") continue;
        if (it.done) (cat === "logic" ? logicDone++ : dsaDone++);
        if (it.done && it.doneDate === today) solvedToday.push({ title: it.title || key.split(":").slice(-1)[0], cat });
        if (it.lastVisit === today) viewedToday++;
      }
      setState({ dsaDone, logicDone, viewedToday, solvedToday });
    };
    compute();
    window.addEventListener("activity-change", compute);
    return () => window.removeEventListener("activity-change", compute);
  }, []);

  if (!state) return null;

  const { dsaDone, logicDone, viewedToday, solvedToday } = state;
  const pct = DSA_TOTAL ? Math.round((dsaDone / DSA_TOTAL) * 100) : 0;
  const nToday = solvedToday.length;

  return (
    <div className="ui-card p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[14px] font-semibold text-white flex items-center gap-2"><Code2 size={16} className="text-indigo-400" /> Today&apos;s DSA practice</h3>
        <Link href="/dsa" className="text-[12px] font-medium text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">Practice DSA <ArrowRight size={13} /></Link>
      </div>

      {/* today's status */}
      <div className={`mt-4 rounded-xl border p-3.5 ${nToday > 0 ? "border-emerald-700/40 bg-emerald-500/[0.07]" : "border-white/[0.06] bg-[#141417]"}`}>
        {nToday > 0 ? (
          <>
            <div className="text-sm font-semibold text-emerald-300 flex items-center gap-2"><CheckCircle2 size={16} /> You solved {nToday} DSA problem{nToday > 1 ? "s" : ""} today 🎉</div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {solvedToday.slice(0, 6).map((s, i) => (
                <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-[#1c1c20] border border-white/[0.06] text-zinc-300 truncate max-w-[220px]">{s.title}{s.cat === "logic" ? " · logic" : ""}</span>
              ))}
              {solvedToday.length > 6 && <span className="text-[11px] text-zinc-500 self-center">+{solvedToday.length - 6} more</span>}
            </div>
          </>
        ) : viewedToday > 0 ? (
          <div className="text-sm text-zinc-300">You opened <b className="text-white">{viewedToday}</b> DSA problem{viewedToday > 1 ? "s" : ""} today — hit <span className="text-emerald-400 font-medium">Mark as done</span> to log it.</div>
        ) : (
          <div className="text-sm text-zinc-300 flex items-center gap-2"><Flame size={15} className="text-orange-400" /> No DSA yet today — solve one to keep the momentum going.</div>
        )}
      </div>

      {/* DSA progress */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-zinc-300 font-medium">DSA solved overall</span>
          <span className="text-indigo-400 font-semibold">{dsaDone}/{DSA_TOTAL} · {pct}%</span>
        </div>
        <div className="h-2.5 bg-[#141417] rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-400 transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-zinc-400">
          <span>✅ {dsaDone} problem{dsaDone === 1 ? "" : "s"} marked done</span>
          {logicDone > 0 && <span>🧠 {logicDone} logic-building done</span>}
        </div>
      </div>
    </div>
  );
}
