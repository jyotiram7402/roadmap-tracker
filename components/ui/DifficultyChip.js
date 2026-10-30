import cx from "./cx";

export const DIFFICULTY = {
  easy: { label: "Easy", color: "var(--diff-easy)" },
  medium: { label: "Medium", color: "var(--diff-medium)" },
  hard: { label: "Hard", color: "var(--diff-hard)" },
};

// Difficulty is shown as dot + text (never color alone). Unknown → neutral dash.
export default function DifficultyChip({ level, compact = false, className }) {
  const d = DIFFICULTY[String(level || "").toLowerCase()];
  if (!d) return <span className={cx("text-[11px] text-muted", className)}>—</span>;
  return (
    <span
      className={cx("inline-flex items-center gap-1.5 font-semibold whitespace-nowrap", compact ? "text-[11px]" : "text-xs", className)}
      style={{ color: d.color }}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: d.color }} />
      {d.label}
    </span>
  );
}
