import type { CategoryId, Product } from "@/data/products";
import { getAvailability } from "@/lib/reservation";

export type PriceRangeId = "under-600" | "600-900" | "over-900";
export type SortId = "newest" | "price-asc" | "price-desc";

export const priceRanges: { id: PriceRangeId; label: string; min: number; max: number }[] = [
  { id: "under-600", label: "تا ۶۰۰ هزار تومان", min: 0, max: 600000 },
  { id: "600-900", label: "۶۰۰ تا ۹۰۰ هزار تومان", min: 600000, max: 900000 },
  { id: "over-900", label: "بیش از ۹۰۰ هزار تومان", min: 900000, max: Number.POSITIVE_INFINITY },
];

export const sortOptions: { id: SortId; label: string }[] = [
  { id: "newest", label: "جدیدترین" },
  { id: "price-asc", label: "ارزان‌ترین" },
  { id: "price-desc", label: "گران‌ترین" },
];

export interface ShopFilters {
  q?: string;
  category?: CategoryId;
  price?: PriceRangeId;
  sort?: SortId;
  inStock?: boolean;
}

const normalize = (s: string) =>
  s
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u200c/g, " ")
    .toLowerCase()
    .trim();

export function filterProducts(list: Product[], f: ShopFilters): Product[] {
  const q = f.q ? normalize(f.q) : "";
  const range = priceRanges.find((r) => r.id === f.price);

  const filtered = list.filter((p) => {
    if (f.category && p.category !== f.category) return false;
    if (range && (p.price < range.min || p.price >= range.max)) return false;
    if (f.inStock && getAvailability(p) === "sold_out") return false;
    if (q) {
      const haystack = normalize(`${p.name} ${p.description} ${p.material} ${p.id}`);
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const sort = f.sort ?? "newest";
  return [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return b.addedAt.localeCompare(a.addedAt);
  });
}
