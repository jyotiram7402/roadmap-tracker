"use client";
import { useEffect, useState } from "react";

// Live date + time badge for headers. Renders nothing until mounted to
// avoid hydration mismatch (server has no clock).
export default function LiveClock({ className = "" }) {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!now) return null;
  const date = now.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
  const time = now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  return (
    <div className={`flex items-center gap-2 text-xs font-medium ${className}`}>
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#1c1c20]/80 border border-white/[0.06] text-zinc-300">🗓 {date}</span>
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#1c1c20]/80 border border-white/[0.06] text-cyan-300 tabular-nums">⏱ {time}</span>
    </div>
  );
}
