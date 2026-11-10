import { Heart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/products";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  product: Product;
  variant?: "floating" | "inline";
  className?: string;
}

export function FavoriteButton({ product, variant = "floating", className }: FavoriteButtonProps) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(product.id);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? `حذف ${product.name} از علاقه‌مندی‌ها` : `افزودن ${product.name} به علاقه‌مندی‌ها`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const added = toggle(product.id);
        toast(added ? "به علاقه‌مندی‌ها اضافه شد" : "از علاقه‌مندی‌ها حذف شد", { description: product.name });
      }}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 transition-colors focus-visible:outline-2",
        variant === "floating" &&
          "size-10 rounded-full bg-background/90 text-foreground backdrop-blur-sm hover:bg-background hover:text-brand",
        variant === "inline" &&
          "h-11 border border-foreground px-5 text-sm hover:bg-foreground hover:text-background",
        active && "text-brand",
        className,
      )}
    >
      <Heart className={cn("size-[1.15rem] transition-transform", active && "scale-110 fill-current")} />
      {variant === "inline" && <span>{active ? "در علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}</span>}
    </button>
  );
}
