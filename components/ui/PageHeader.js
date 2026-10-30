"use client";
import Link from "next/link";
import { ChevronLeft } from "@/components/icons";
import ThemeToggle from "@/components/ThemeToggle";
import Container from "./Container";
import cx from "./cx";

// Sticky tool header: back · title (+ meta) · actions · theme. `children` renders a second row
// (tabs, progress) inside the same sticky block.
export default function PageHeader({
  title,
  meta,
  icon,
  backHref = "/dashboard",
  backLabel = "Dashboard",
  actions,
  theme = true,
  size = "lg",
  className,
  children,
}) {
  return (
    <header
      className={cx("sticky top-0 z-sticky border-b border-border backdrop-blur-xl safe-top", className)}
      style={{ background: "var(--header-bg)" }}
    >
      <Container size={size} className="flex h-14 items-center gap-2">
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex h-11 shrink-0 items-center gap-0.5 -ml-2 pl-1 pr-2 rounded-control text-sm text-muted hover:text-fg hover:bg-surface-2 transition"
          >
            <ChevronLeft size={18} />
            <span className="hidden sm:inline">{backLabel}</span>
            <span className="sr-only sm:hidden">{backLabel}</span>
          </Link>
        )}
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {icon && <span className="hidden sm:grid h-8 w-8 shrink-0 place-items-center rounded-chip bg-surface-2 text-muted">{icon}</span>}
          <div className="min-w-0">
            <h1 className="truncate text-[15px] sm:text-base font-semibold leading-tight text-fg">{title}</h1>
            {meta && <p className="truncate text-[11px] leading-tight text-muted">{meta}</p>}
          </div>
        </div>
        {actions && <div className="flex shrink-0 items-center gap-1.5">{actions}</div>}
        {theme && <ThemeToggle />}
      </Container>
      {children && <Container size={size} className="pb-2">{children}</Container>}
    </header>
  );
}
