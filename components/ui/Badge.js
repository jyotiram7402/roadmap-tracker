import cx from "./cx";

const TONE = {
  neutral: "var(--muted-fg)",
  primary: "var(--primary)",
  brand: "var(--brand)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
  info: "var(--info)",
};

// Tinted pill that follows the theme (color-mix keeps one source of truth per tone).
export default function Badge({ tone = "neutral", size = "sm", icon, className, children, ...rest }) {
  const c = TONE[tone] || TONE.neutral;
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full border font-medium whitespace-nowrap",
        size === "xs" ? "h-5 px-1.5 text-[10.5px]" : size === "md" ? "h-7 px-2.5 text-xs" : "h-6 px-2 text-[11px]",
        className
      )}
      style={{
        color: c,
        background: `color-mix(in srgb, ${c} 12%, transparent)`,
        borderColor: `color-mix(in srgb, ${c} 35%, transparent)`,
      }}
      {...rest}
    >
      {icon}
      {children}
    </span>
  );
}
