"use client";
import { forwardRef } from "react";
import cx from "./cx";

// Shared control styling. Phones get 16px text from the global rule in globals.css (no iOS zoom).
export const controlClass = (invalid) =>
  cx(
    "w-full rounded-control bg-surface text-fg placeholder:text-muted placeholder:opacity-70",
    "border focus:outline-none focus:border-primary transition",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    invalid ? "border-danger" : "border-border-strong"
  );

const Input = forwardRef(function Input({ invalid, className, leftIcon, ...rest }, ref) {
  if (leftIcon) {
    return (
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-muted">{leftIcon}</span>
        <input ref={ref} aria-invalid={invalid || undefined} className={cx(controlClass(invalid), "h-11 pl-10 pr-3.5 text-sm", className)} {...rest} />
      </div>
    );
  }
  return <input ref={ref} aria-invalid={invalid || undefined} className={cx(controlClass(invalid), "h-11 px-3.5 text-sm", className)} {...rest} />;
});

export default Input;
