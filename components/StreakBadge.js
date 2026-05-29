"use client";

export default function StreakBadge({ streak }) {
  if (!streak || streak < 1) {
    return (
      <span
        title="Tick any item today to start a streak"
        className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700"
      >
        🔥 0
      </span>
    );
  }
  const color =
    streak >= 30 ? "from-pink-500 to-orange-400 text-white border-orange-300"
    : streak >= 7 ? "from-amber-500 to-orange-500 text-white border-amber-300"
    : "from-orange-500/30 to-amber-500/30 text-amber-200 border-amber-700";
  return (
    <span
      title={`${streak}-day learning streak — keep it alive!`}
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border bg-gradient-to-r ${color}`}
    >
      🔥 {streak}
    </span>
  );
}
