"use client";
import { cloneElement, isValidElement, useId } from "react";
import cx from "./cx";

// Label + control + hint/error, wired with ids and aria-describedby.
export default function FormField({ label, hint, error, required, trailing, className, children }) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const control = isValidElement(children)
    ? cloneElement(children, {
        id: children.props.id || id,
        invalid: children.props.invalid ?? Boolean(error),
        "aria-describedby": [errorId, hintId, children.props["aria-describedby"]].filter(Boolean).join(" ") || undefined,
        required: children.props.required ?? required,
      })
    : children;

  return (
    <div className={cx("space-y-1.5", className)}>
      {(label || trailing) && (
        <div className="flex items-center justify-between gap-3">
          {label && (
            <label htmlFor={id} className="text-sm font-medium text-fg">
              {label}
              {required && <span aria-hidden="true" className="text-danger"> *</span>}
            </label>
          )}
          {trailing}
        </div>
      )}
      {control}
      {error ? (
        <p id={errorId} role="alert" className="text-xs text-danger">{error}</p>
      ) : hint ? (
        <p id={hintId} className="text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  );
}
