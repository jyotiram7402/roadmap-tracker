"use client";
import Button from "./Button";
import cx from "./cx";

// "Show more" pagination control. Hidden when nothing is left.
export default function LoadMore({ shown, total, onMore, step, className }) {
  const remaining = Math.max(0, total - shown);
  if (remaining <= 0) return null;
  const next = step ? Math.min(step, remaining) : remaining;
  return (
    <div className={cx("flex flex-col items-center gap-2 py-4", className)}>
      <Button variant="secondary" onClick={onMore}>
        Show {next} more
      </Button>
      <p className="text-xs text-muted">
        Showing {shown} of {total}
      </p>
    </div>
  );
}
