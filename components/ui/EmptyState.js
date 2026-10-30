import { Inbox } from "@/components/icons";
import cx from "./cx";

export default function EmptyState({ icon, title, description, action, className }) {
  return (
    <div className={cx("flex flex-col items-center text-center px-6 py-12", className)}>
      <div className="grid h-12 w-12 place-items-center rounded-surface bg-surface-2 text-muted">
        {icon || <Inbox size={22} />}
      </div>
      <h3 className="mt-4 text-base font-semibold text-fg">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
