"use client";
import { forwardRef } from "react";
import { ChevronDown } from "@/components/icons";
import cx from "./cx";
import { controlClass } from "./Input";

// Native <select> (best on phones) with a consistent chevron.
const Select = forwardRef(function Select({ invalid, className, children, ...rest }, ref) {
  return (
    <div className={cx("relative", className)}>
      <select ref={ref} aria-invalid={invalid || undefined} className={cx(controlClass(invalid), "h-11 appearance-none pl-3.5 pr-9 text-sm")} {...rest}>
        {children}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
    </div>
  );
});

export default Select;
