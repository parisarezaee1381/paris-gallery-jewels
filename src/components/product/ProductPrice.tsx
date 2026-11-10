import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ProductPrice({ value, size = "md", className }: { value: number; size?: "sm" | "md" | "lg"; className?: string }) {
  return (
    <p className={cn("flex items-baseline gap-1.5 tabular-nums", className)}>
      <span
        className={cn(
          "font-medium",
          size === "sm" && "text-sm",
          size === "md" && "text-base",
          size === "lg" && "font-serif text-3xl md:text-4xl",
        )}
      >
        {formatNumber(value)}
      </span>
      <span className={cn("text-muted-foreground", size === "lg" ? "text-base" : "text-xs")}>تومان</span>
    </p>
  );
}
