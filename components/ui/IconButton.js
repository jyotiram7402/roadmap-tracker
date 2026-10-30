"use client";
import { forwardRef } from "react";
import Link from "next/link";
import cx from "./cx";

const VARIANT = {
  ghost: "text-muted hover:text-fg hover:bg-surface-2",
  secondary: "bg-surface text-fg border border-border-strong hover:bg-surface-2",
  primary: "bg-primary text-primary-fg hover:brightness-110",
};

// Always a 44px hit target on phones (40px on desktop). `label` is required for a11y.
const IconButton = forwardRef(function IconButton({ label, variant = "ghost", href, className, children, type, ...rest }, ref) {
  const cls = cx(
    "inline-grid place-items-center shrink-0 rounded-control transition",
    "h-11 w-11 sm:h-10 sm:w-10 disabled:opacity-50 disabled:pointer-events-none",
    VARIANT[variant] || VARIANT.ghost,
    className
  );
  if (href) {
    return (
      <Link ref={ref} href={href} aria-label={label} title={label} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button ref={ref} type={type || "button"} aria-label={label} title={label} className={cls} {...rest}>
      {children}
    </button>
  );
});

export default IconButton;
