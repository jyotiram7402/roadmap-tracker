"use client";
import { useEffect, useId, useRef } from "react";
import { X } from "@/components/icons";
import IconButton from "./IconButton";
import cx from "./cx";

// Bottom sheet on phones, centered dialog from `sm` up. Escape / backdrop close, body scroll lock,
// initial focus, Tab stays inside.
export default function ResponsiveDialog({ open, onClose, title, description, children, footer, size = "md", className }) {
  const panelRef = useRef(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const prevActive = document.activeElement;
    const focusables = () =>
      panelRef.current?.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])') || [];
    const first = focusables()[0];
    (first || panelRef.current)?.focus?.();

    function onKey(e) {
      if (e.key === "Escape") { e.stopPropagation(); onClose?.(); return; }
      if (e.key !== "Tab") return;
      const list = Array.from(focusables());
      if (list.length === 0) return;
      const a = list[0], z = list[list.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevActive?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const width = size === "sm" ? "sm:max-w-sm" : size === "lg" ? "sm:max-w-2xl" : "sm:max-w-md";

  return (
    <div className="fixed inset-0 z-modal flex items-end sm:items-center justify-center" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
      <div aria-hidden="true" className="absolute inset-0 bg-black/60 backdrop-blur-sm anim-fade-in" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={cx(
          "relative flex w-full flex-col bg-surface text-fg shadow-2xl border border-border outline-none anim-fade-up",
          "max-h-[85dvh] rounded-t-sheet sm:rounded-sheet sm:mx-4",
          width,
          className
        )}
      >
        <div aria-hidden="true" className="mx-auto mt-2 h-1 w-10 rounded-full bg-border-strong sm:hidden" />
        <div className="flex items-start gap-3 px-5 pt-3 sm:pt-5">
          <div className="min-w-0 flex-1">
            {title && <h2 id={titleId} className="text-base font-semibold leading-snug">{title}</h2>}
            {description && <p id={descId} className="mt-1 text-sm text-muted">{description}</p>}
          </div>
          <IconButton label="Close" onClick={onClose} className="-mr-2 -mt-1">
            <X size={18} />
          </IconButton>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">{children}</div>
        {footer && <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border px-5 py-3 pb-safe">{footer}</div>}
        {!footer && <div className="pb-safe" />}
      </div>
    </div>
  );
}
