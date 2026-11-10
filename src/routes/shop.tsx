import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { EmptyState } from "@/components/feedback/StatusMessage";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { SearchBar } from "@/components/layout/SearchDialog";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FiltersPanel } from "@/components/shop/FiltersPanel";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { categories, getCategory, products, type CategoryId } from "@/data/products";
import { toPersianDigits } from "@/lib/format";
import { filterProducts, priceRanges, sortOptions, type PriceRangeId, type ShopFilters, type SortId } from "@/lib/shop";
import { cn } from "@/lib/utils";

const categoryIds = categories.map((c) => c.id) as string[];
const priceIds = priceRanges.map((r) => r.id) as string[];
const sortIds = sortOptions.map((s) => s.id) as string[];

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): ShopFilters => ({
    q: typeof s.q === "string" && s.q.trim() ? s.q.slice(0, 60) : undefined,
    category: categoryIds.includes(s.category as string) ? (s.category as CategoryId) : undefined,
    price: priceIds.includes(s.price as string) ? (s.price as PriceRangeId) : undefined,
    sort: sortIds.includes(s.sort as string) ? (s.sort as SortId) : undefined,
    inStock: s.inStock === true || s.inStock === "true" ? true : undefined,
  }),
  head: () => ({
    meta: [
      { title: "فروشگاه گوشواره‌های دست‌ساز — Paris Gallery" },
      { name: "description", content: "همه‌ی گوشواره‌های دست‌ساز Paris Gallery؛ جستجو و فیلتر بر اساس مجموعه، قیمت و موجودی." },
      { property: "og:title", content: "فروشگاه — Paris Gallery" },
      { property: "og:description", content: "گوشواره‌های خمیر پلیمری رترو، مینیمال، انتزاعی و خاص با قیمت به تومان." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const filters = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [query, setQuery] = useState(filters.q ?? "");
  const [sheetOpen, setSheetOpen] = useState(false);

  const update = (patch: Partial<ShopFilters>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true, resetScroll: false });

  // Keep the field in sync when the URL changes elsewhere (header search, links).
  useEffect(() => setQuery(filters.q ?? ""), [filters.q]);

  // Debounce typing into the URL.
  useEffect(() => {
    const t = setTimeout(() => {
      const next = query.trim() || undefined;
      if (next !== filters.q) update({ q: next });
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const results = useMemo(() => filterProducts(products, filters), [filters]);
  const category = filters.category ? getCategory(filters.category) : undefined;

  const chips: { label: string; clear: Partial<ShopFilters> }[] = [];
  if (filters.q) chips.push({ label: `«${filters.q}»`, clear: { q: undefined } });
  if (category) chips.push({ label: category.name, clear: { category: undefined } });
  if (filters.price) chips.push({ label: priceRanges.find((r) => r.id === filters.price)!.label, clear: { price: undefined } });
  if (filters.inStock) chips.push({ label: "فقط موجود", clear: { inStock: undefined } });

  const clearAll = () => {
    setQuery("");
    navigate({ search: { sort: filters.sort }, replace: true, resetScroll: false });
  };

  return (
    <div className="pb-24">
      <section className="border-b">
        <Container className="pb-10 pt-8 md:pb-14 md:pt-12">
          <Breadcrumbs items={category ? [{ label: "فروشگاه", link: <Link to="/shop" className="hover:text-brand">فروشگاه</Link> }, { label: category.name }] : [{ label: "فروشگاه" }]} />
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="display-xl">{category ? category.name : "فروشگاه"}</h1>
              <p className="mt-4 max-w-lg text-muted-foreground">
                {category ? category.tagline : "همه‌ی قطعه‌های گالری، از قوس‌های رترو تا گل‌های نمایشی. هر طرح فقط در تعداد محدود ساخته می‌شود."}
              </p>
            </div>
            <p className="font-serif text-2xl text-muted-foreground" aria-live="polite">
              <span className="text-foreground">{toPersianDigits(results.length)}</span> قطعه
            </p>
          </div>

          {/* Category chips */}
          <nav aria-label="مجموعه‌ها" className="-mx-5 mt-10 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <ul className="flex w-max gap-2">
              {[{ id: undefined, name: "همه" }, ...categories].map((c) => {
                const active = filters.category === c.id;
                return (
                  <li key={c.name}>
                    <button
                      type="button"
                      onClick={() => update({ category: c.id as CategoryId | undefined })}
                      aria-pressed={active}
                      className={cn(
                        "h-10 cursor-pointer border px-5 text-sm transition-colors",
                        active ? "border-foreground bg-foreground text-background" : "border-foreground/25 hover:border-foreground",
                      )}
                    >
                      {c.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Container>
      </section>

      <Container className="pt-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block" aria-label="فیلترها">
            <div className="sticky top-32">
              <div className="mb-8">
                <SearchBar value={query} onChange={setQuery} placeholder="جستجو…" />
              </div>
              <FiltersPanel filters={filters} onChange={update} />
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="mb-6 lg:hidden">
              <SearchBar value={query} onChange={setQuery} placeholder="جستجو…" />
            </div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setSheetOpen(true)}>
                  <SlidersHorizontal /> فیلترها
                  {chips.length > 0 && <span className="text-brand">({toPersianDigits(chips.length)})</span>}
                </Button>
                {chips.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => {
                      if ("q" in c.clear) setQuery("");
                      update(c.clear);
                    }}
                    className="inline-flex h-9 cursor-pointer items-center gap-2 bg-secondary px-3 text-xs hover:bg-border"
                    aria-label={`حذف فیلتر ${c.label}`}
                  >
                    {c.label} <X className="size-3.5" />
                  </button>
                ))}
                {chips.length > 1 && (
                  <Button variant="link" size="sm" onClick={clearAll}>
                    پاک کردن همه
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground" id="sort-label">مرتب‌سازی</span>
                <Select value={filters.sort ?? "newest"} onValueChange={(v) => update({ sort: v === "newest" ? undefined : (v as SortId) })}>
                  <SelectTrigger aria-labelledby="sort-label" className="h-10 w-40 rounded-none border-foreground/25 bg-transparent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {sortOptions.map((s) => (
                      <SelectItem key={s.id} value={s.id} className="rounded-none">
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {results.length ? (
              <ProductGrid products={results} columns={3} />
            ) : (
              <EmptyState
                className="border"
                title="قطعه‌ای با این مشخصات پیدا نشد"
                description="فیلترها را کمتر کنید یا عبارت دیگری جستجو کنید. اگر طرح خاصی در ذهن دارید، در واتس‌اپ بپرسید."
                action={<Button onClick={clearAll}>نمایش همه‌ی محصولات</Button>}
              />
            )}
          </div>
        </div>
      </Container>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-none px-6 pb-8 pt-8">
          <SheetTitle className="mb-1 font-serif text-3xl font-medium">فیلترها</SheetTitle>
          <SheetDescription className="mb-6">{toPersianDigits(results.length)} قطعه با این فیلترها</SheetDescription>
          <FiltersPanel filters={filters} onChange={update} />
          <div className="mt-6 flex gap-3">
            <Button className="flex-1" onClick={() => setSheetOpen(false)}>
              نمایش {toPersianDigits(results.length)} قطعه
            </Button>
            <Button variant="outline" onClick={clearAll}>
              پاک کردن
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
