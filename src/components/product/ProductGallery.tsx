import { useState } from "react";
import type { ProductImage } from "@/data/products";
import { toPersianDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ProductThumbnail({ image, active, onSelect, index }: { image: ProductImage; active: boolean; onSelect: () => void; index: number }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`نمایش تصویر ${toPersianDigits(index + 1)}`}
      aria-current={active}
      className={cn(
        "relative aspect-[4/5] w-full cursor-pointer overflow-hidden bg-secondary transition-opacity",
        active ? "opacity-100 outline outline-1 outline-offset-2 outline-foreground" : "opacity-60 hover:opacity-100",
      )}
    >
      <img src={image.src} alt="" width={200} height={250} loading="lazy" className="h-full w-full object-cover" />
    </button>
  );
}

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="grid gap-3 md:grid-cols-[88px_1fr] md:gap-5">
      <div className="order-2 grid grid-cols-4 gap-3 md:order-1 md:grid-cols-1 md:content-start">
        {images.map((img, i) => (
          <ProductThumbnail key={img.src} image={img} index={i} active={i === active} onSelect={() => setActive(i)} />
        ))}
      </div>
      <figure className="relative order-1 md:order-2">
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
          <img
            key={current.src}
            src={current.src}
            alt={current.alt}
            width={1024}
            height={1280}
            className="h-full w-full animate-in object-cover fade-in duration-500"
          />
        </div>
        <figcaption className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>{name}</span>
          <span className="tabular-nums">
            {toPersianDigits(active + 1)} / {toPersianDigits(images.length)}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
