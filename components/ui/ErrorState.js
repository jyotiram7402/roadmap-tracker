"use client";
import { AlertTriangle, RefreshCw } from "@/components/icons";
import Button from "./Button";
import cx from "./cx";

export default function ErrorState({ title = "Something went wrong", description, onRetry, retryLabel = "Try again", className }) {
  return (
    <div role="alert" className={cx("flex flex-col items-center text-center px-6 py-12", className)}>
      <div className="grid h-12 w-12 place-items-center rounded-surface text-danger" style={{ background: "color-mix(in srgb, var(--danger) 12%, transparent)" }}>
        <AlertTriangle size={22} />
      </div>
      <h3 className="mt-4 text-base font-semibold text-fg">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>}
      {onRetry && (
        <Button variant="secondary" className="mt-5" onClick={onRetry} leftIcon={<RefreshCw size={15} />}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
