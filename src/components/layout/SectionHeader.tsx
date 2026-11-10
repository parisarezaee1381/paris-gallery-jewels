import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { toPersianDigits } from "@/lib/format";

interface SectionHeaderProps {
  index?: number;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

/** Magazine-style section opener: issue number, eyebrow, serif title, hairline rule. */
export function SectionHeader({ index, eyebrow, title, description, action, tone = "light", className }: SectionHeaderProps) {
  const dark = tone === "dark";
  return (
    <header className={cn("mb-10 md:mb-14", className)}>
      <div className={cn("mb-6 flex items-center gap-4", dark ? "text-ink-muted" : "text-muted-foreground")}>
        {index !== undefined && (
          <span className={cn("font-serif text-2xl", dark ? "text-ink-foreground" : "text-brand")}>
            {toPersianDigits(String(index).padStart(2, "0"))}
          </span>
        )}
        {eyebrow && <span className={cn("eyebrow", dark && "text-ink-muted")}>{eyebrow}</span>}
        <span className={cn("h-px flex-1", dark ? "bg-ink-border" : "bg-border")} aria-hidden />
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className={cn("display-lg", dark && "text-ink-foreground")}>{title}</h2>
          {description && (
            <p className={cn("mt-4 text-base leading-8", dark ? "text-ink-muted" : "text-muted-foreground")}>{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </header>
  );
}
