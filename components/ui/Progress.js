import cx from "./cx";

const TONE = { primary: "var(--primary)", success: "var(--success)", brand: "var(--brand)", warning: "var(--warning)", info: "var(--info)" };

export default function Progress({ value = 0, max = 100, tone = "primary", label, className, size = "md" }) {
  const pct = max > 0 ? Math.max(0, Math.min(100, Math.round((value / max) * 100))) : 0;
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-label={label}
      className={cx("w-full overflow-hidden rounded-full bg-surface-2", size === "sm" ? "h-1.5" : "h-2", className)}
    >
      <div className="h-full rounded-full transition-[width] duration-300" style={{ width: `${pct}%`, background: TONE[tone] || TONE.primary }} />
    </div>
  );
}
