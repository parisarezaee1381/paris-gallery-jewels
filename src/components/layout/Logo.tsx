import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <Link
      to="/"
      aria-label="Paris Gallery — صفحه اصلی"
      className={cn("group inline-flex items-baseline gap-1.5 leading-none", tone === "dark" ? "text-ink-foreground" : "text-foreground", className)}
    >
      <span className="font-wordmark text-[1.6rem] sm:text-[1.85rem]">
        Paris<span className="text-brand"> </span>Gallery
      </span>
      <span className="inline-block size-1.5 translate-y-[-2px] rounded-full bg-brand transition-transform group-hover:scale-150" aria-hidden />
    </Link>
  );
}
