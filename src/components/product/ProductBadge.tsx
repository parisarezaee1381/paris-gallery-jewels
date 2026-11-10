import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.7rem] font-semibold leading-none tracking-wide",
  {
    variants: {
      variant: {
        new: "bg-brand text-brand-foreground",
        stock: "bg-background/90 text-foreground backdrop-blur-sm",
        low: "bg-background/90 text-warning backdrop-blur-sm",
        soldout: "bg-ink text-ink-foreground",
        outline: "border border-foreground/30 text-foreground",
      },
    },
    defaultVariants: { variant: "outline" },
  },
);

export interface ProductBadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function ProductBadge({ className, variant, ...props }: ProductBadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
