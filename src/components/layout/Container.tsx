import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: "default" | "narrow" | "wide";
}

export function Container({ as: Tag = "div", size = "default", className, ...props }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        size === "default" && "max-w-[1360px]",
        size === "narrow" && "max-w-3xl",
        size === "wide" && "max-w-[1600px]",
        className,
      )}
      {...props}
    />
  );
}
