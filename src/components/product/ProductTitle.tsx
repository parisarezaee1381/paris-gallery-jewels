import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ProductTitle({ as: Tag = "h3", size = "md", className, children }: { as?: ElementType; size?: "md" | "lg"; className?: string; children: ReactNode }) {
  return (
    <Tag className={cn("font-serif leading-tight", size === "md" ? "text-xl md:text-[1.4rem]" : "display-lg", className)}>
      {children}
    </Tag>
  );
}
