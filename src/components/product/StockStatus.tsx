import type { Product } from "@/data/products";
import { availabilityLabel, getAvailability } from "@/lib/reservation";
import { toPersianDigits } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ProductBadge } from "@/components/product/ProductBadge";

/** Compact badge for cards. */
export function StockBadge({ product }: { product: Product }) {
  const a = getAvailability(product);
  const variant = a === "sold_out" ? "soldout" : a === "low_stock" ? "low" : "stock";
  return <ProductBadge variant={variant}>{availabilityLabel[a]}</ProductBadge>;
}

/** Detailed line for the product page. */
export function StockStatus({ product, className }: { product: Product; className?: string }) {
  const a = getAvailability(product);
  const text =
    a === "sold_out"
      ? "فعلاً ناموجود — می‌توانید برای ساخت دوباره پیام دهید"
      : a === "low_stock"
        ? `فقط ${toPersianDigits(product.stock)} جفت باقی مانده`
        : `موجود · ${toPersianDigits(product.stock)} جفت آماده‌ی ارسال`;
  return (
    <p className={cn("flex items-center gap-2.5 text-sm", className)} role="status">
      <span
        className={cn(
          "size-2 rounded-full",
          a === "in_stock" && "bg-success",
          a === "low_stock" && "bg-warning",
          a === "sold_out" && "bg-muted-foreground",
        )}
        aria-hidden
      />
      <span className={cn(a === "sold_out" ? "text-muted-foreground" : "text-foreground")}>{text}</span>
    </p>
  );
}
