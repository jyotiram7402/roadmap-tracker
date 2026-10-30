"use client";
import { forwardRef } from "react";
import cx from "./cx";
import { controlClass } from "./Input";

const Textarea = forwardRef(function Textarea({ invalid, className, rows = 5, ...rest }, ref) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cx(controlClass(invalid), "min-h-[120px] px-3.5 py-2.5 text-sm leading-relaxed resize-y", className)}
      {...rest}
    />
  );
});

export default Textarea;
