import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ImageWithTextProps {
  image: { src: string; alt: string; width: number; height: number };
  children: ReactNode;
  /** Put the image on the inline-end side (left in RTL). */
  reverse?: boolean;
  className?: string;
  imageClassName?: string;
}

/** Two-column editorial layout: tall image + text column, stacked on mobile. */
export function ImageWithText({ image, children, reverse, className, imageClassName }: ImageWithTextProps) {
  return (
    <div className={cn("grid items-center gap-10 md:grid-cols-12 md:gap-14", className)}>
      <div className={cn("md:col-span-6", reverse && "md:order-2")}>
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          className={cn("aspect-[4/5] w-full object-cover", imageClassName)}
        />
      </div>
      <div className={cn("md:col-span-6 lg:col-span-5", reverse ? "md:order-1 lg:col-start-1" : "lg:col-start-8")}>{children}</div>
    </div>
  );
}
