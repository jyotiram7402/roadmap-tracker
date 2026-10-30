"use client";
import { useEffect, useRef } from "react";
import cx from "./cx";

// Horizontally scrollable segmented tabs (never wraps on phones). Arrow keys move between tabs.
// tabs: [{ value, label, icon?, count? }]
export default function ScrollableTabs({ tabs, value, onChange, ariaLabel = "Sections", size = "md", className }) {
  const listRef = useRef(null);

  useEffect(() => {
    const el = listRef.current?.querySelector('[aria-selected="true"]');
    el?.scrollIntoView?.({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [value]);

  function onKeyDown(e) {
    const idx = tabs.findIndex((t) => t.value === value);
    if (idx < 0) return;
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    onChange(tabs[next].value);
    listRef.current?.querySelectorAll('[role="tab"]')[next]?.focus();
  }

  return (
    <div className={cx("relative -mx-4 sm:mx-0", className)}>
      <div
        ref={listRef}
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
        className="no-scrollbar flex gap-1 overflow-x-auto px-4 sm:px-0 sm:inline-flex sm:rounded-surface sm:border sm:border-border sm:bg-surface sm:p-1"
      >
        {tabs.map((t) => {
          const active = t.value === value;
          return (
            <button
              key={t.value}
              role="tab"
              type="button"
              aria-selected={active}
              tabIndex={active ? 0 : -1}
              onClick={() => onChange(t.value)}
              className={cx(
                "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-control font-medium transition",
                size === "sm" ? "h-9 px-3 text-xs" : "h-10 max-sm:min-h-11 px-3.5 text-sm",
                active ? "bg-primary text-primary-fg shadow" : "text-muted hover:text-fg hover:bg-surface-2"
              )}
            >
              {t.icon}
              <span>{t.label}</span>
              {typeof t.count === "number" && (
                <span className={cx("rounded-full px-1.5 text-[10.5px] tabular-nums", active ? "bg-primary-fg/20" : "bg-surface-2")}>{t.count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
