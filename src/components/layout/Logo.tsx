import { Link } from "@tanstack/react-router";
import logoBadge from "@/assets/logo-badge.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  tone?: "light" | "dark";
  /** Hide the wordmark and show only the round badge. */
  compact?: boolean;
}

export function Logo({ className, tone = "light", compact = false }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="Paris Gallery — صفحه اصلی"
      dir="ltr"
      className={cn(
        "group inline-flex items-center gap-2.5 leading-none",
        tone === "dark" ? "text-ink-foreground" : "text-foreground",
        className,
      )}
    >
      <img
        src={logoBadge}
        alt=""
        width={44}
        height={44}
        className={cn(
          "size-10 shrink-0 transition-transform duration-500 group-hover:-rotate-6 sm:size-11",
          tone === "dark" && "ring-1 ring-ink-border rounded-full",
        )}
      />
      {!compact && <span className="font-wordmark text-[1.45rem] sm:text-[1.7rem]">Paris Gallery</span>}
    </Link>
  );
}
