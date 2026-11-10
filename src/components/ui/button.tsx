import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium cursor-pointer transition-[background-color,color,border-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45 disabled:cursor-not-allowed active:translate-y-px [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** Primary: solid ink */
        default: "bg-primary text-primary-foreground hover:bg-brand",
        /** Burgundy accent — reservation */
        brand: "bg-brand text-brand-foreground hover:bg-brand-deep",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        /** Secondary: hairline outline */
        outline:
          "border border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background",
        secondary: "bg-secondary text-secondary-foreground hover:bg-border",
        ghost: "hover:bg-secondary text-foreground",
        link: "text-foreground underline decoration-brand decoration-1 underline-offset-[6px] hover:text-brand px-0",
        whatsapp: "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90",
        /** For dark (ink) sections */
        ivory: "bg-ink-foreground text-ink hover:bg-brand hover:text-brand-foreground",
        "outline-ivory":
          "border border-ink-foreground/70 bg-transparent text-ink-foreground hover:bg-ink-foreground hover:text-ink",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        icon: "h-11 w-11",
        "icon-sm": "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
