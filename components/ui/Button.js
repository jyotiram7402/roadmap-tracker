"use client";
import { forwardRef } from "react";
import Link from "next/link";
import cx from "./cx";

const VARIANT = {
  primary: "bg-primary text-primary-fg shadow-sm hover:brightness-110 active:brightness-95",
  secondary: "bg-surface text-fg border border-border-strong hover:bg-surface-2",
  ghost: "text-muted hover:text-fg hover:bg-surface-2",
  danger: "bg-danger text-primary-fg hover:brightness-110 active:brightness-95",
  brand: "bg-brand text-primary-fg shadow-sm hover:brightness-110 active:brightness-95",
};

// md is 40px on desktop and grows to the 44px touch minimum on phones.
const SIZE = {
  sm: "h-9 px-3 text-xs gap-1.5",
  md: "h-10 max-sm:min-h-11 px-4 text-sm gap-2",
  lg: "h-12 px-5 text-base gap-2",
};

const Button = forwardRef(function Button(
  { variant = "primary", size = "md", href, loading = false, disabled, fullWidth, leftIcon, rightIcon, className, children, type, ...rest },
  ref
) {
  const cls = cx(
    "inline-flex items-center justify-center font-semibold rounded-control select-none whitespace-nowrap",
    "transition disabled:opacity-50 disabled:pointer-events-none",
    VARIANT[variant] || VARIANT.primary,
    SIZE[size] || SIZE.md,
    fullWidth && "w-full",
    className
  );
  const inner = (
    <>
      {loading ? <Spinner /> : leftIcon}
      {children && <span className="truncate">{children}</span>}
      {!loading && rightIcon}
    </>
  );
  if (href) {
    return (
      <Link ref={ref} href={href} className={cls} aria-disabled={disabled || loading || undefined} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <button ref={ref} type={type || "button"} className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {inner}
    </button>
  );
});

export function Spinner({ size = 16, className }) {
  return (
    <svg className={cx("animate-spin", className)} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default Button;
