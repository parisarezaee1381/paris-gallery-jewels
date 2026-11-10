import { Link } from "@tanstack/react-router";
import { Heart, X } from "lucide-react";

import { EmptyState } from "@/components/feedback/StatusMessage";
import { ProductPrice } from "@/components/product/ProductPrice";
import { StockBadge } from "@/components/product/StockStatus";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { products } from "@/data/products";
import { useFavorites } from "@/hooks/use-favorites";
import { useUiState } from "@/hooks/use-ui-state";
import { toPersianDigits } from "@/lib/format";

export function FavoritesSheet() {
  const { favoritesOpen, setFavoritesOpen } = useUiState();
  const { ids, remove, clear } = useFavorites();
  const items = products.filter((p) => ids.includes(p.id));
  const close = () => setFavoritesOpen(false);

  return (
    <Sheet open={favoritesOpen} onOpenChange={setFavoritesOpen}>
      <SheetContent side="left" className="flex w-[92vw] max-w-md flex-col gap-0 rounded-none p-0">
        <div className="border-b px-6 py-6">
          <SheetTitle className="font-serif text-3xl font-medium">علاقه‌مندی‌ها</SheetTitle>
          <SheetDescription className="mt-1 text-sm">
            {items.length ? `${toPersianDigits(items.length)} قطعه ذخیره شده روی همین دستگاه` : "قطعه‌های محبوبتان را اینجا نگه دارید"}
          </SheetDescription>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <EmptyState
              title="هنوز چیزی ذخیره نکرده‌اید"
              description={
                <>
                  روی آیکن <Heart className="inline size-3.5" aria-label="قلب" /> هر محصول بزنید تا اینجا بماند.
                </>
              }
              action={
                <Button asChild variant="default">
                  <Link to="/shop" onClick={close}>
                    رفتن به فروشگاه
                  </Link>
                </Button>
              }
            />
          ) : (
            <ul className="divide-y">
              {items.map((p) => (
                <li key={p.id} className="flex gap-4 py-5">
                  <Link to="/product/$slug" params={{ slug: p.slug }} onClick={close} className="shrink-0">
                    <img src={p.images[0].src} alt={p.images[0].alt} width={88} height={110} loading="lazy" className="h-[110px] w-[88px] object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <Link to="/product/$slug" params={{ slug: p.slug }} onClick={close} className="font-serif text-xl hover:text-brand">
                      {p.name}
                    </Link>
                    <ProductPrice value={p.price} size="sm" className="mt-1" />
                    <div className="mt-auto">
                      <StockBadge product={p} />
                    </div>
                  </div>
                  <button type="button" onClick={() => remove(p.id)} aria-label={`حذف ${p.name}`} className="grid size-9 cursor-pointer place-items-center self-start text-muted-foreground hover:text-brand">
                    <X className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="flex items-center justify-between gap-3 border-t px-6 py-5">
            <Button variant="link" onClick={clear}>
              پاک کردن همه
            </Button>
            <Button asChild>
              <Link to="/shop" onClick={close}>
                ادامه‌ی گشت‌وگذار
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
