import cx from "./cx";

export default function Skeleton({ className, ...rest }) {
  return <div aria-hidden="true" className={cx("animate-pulse rounded-chip bg-surface-2", className)} {...rest} />;
}

export function SkeletonText({ lines = 3, className }) {
  return (
    <div className={cx("space-y-2", className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cx("h-3.5", i === lines - 1 ? "w-2/3" : "w-full")} />
      ))}
    </div>
  );
}

export function SkeletonRows({ rows = 6, className }) {
  return (
    <div className={cx("space-y-2", className)} aria-hidden="true">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full rounded-control" />
      ))}
    </div>
  );
}
