"use client";

const CHIPS = [
  { key: "unchecked", label: "Unanswered Q&A", color: "blue" },
  { key: "bookmarked", label: "★ Bookmarked", color: "amber" },
  { key: "withCode", label: "{ } With code", color: "emerald" },
];

export default function FilterChips({ filters, onChange }) {
  return (
    <div className="flex flex-wrap gap-1.5 no-print">
      {CHIPS.map((c) => {
        const active = !!filters[c.key];
        return (
          <button
            key={c.key}
            onClick={() => onChange({ ...filters, [c.key]: !active })}
            className={`text-xs px-2.5 py-1 rounded-full border transition ${
              active
                ? c.color === "amber" ? "bg-amber-500/20 border-amber-500 text-amber-300"
                  : c.color === "emerald" ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                  : "bg-blue-500/20 border-blue-500 text-blue-300"
                : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
            }`}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
