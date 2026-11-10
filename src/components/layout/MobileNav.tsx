import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";

import { Logo } from "@/components/layout/Logo";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/products";
import { buildWhatsAppUrl } from "@/lib/reservation";
import { toPersianDigits } from "@/lib/format";

export function MobileNav({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const close = () => onOpenChange(false);
  const linkClass = "block py-3 font-serif text-3xl leading-tight transition-colors hover:text-brand data-[status=active]:text-brand";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-[88vw] max-w-sm flex-col gap-0 overflow-y-auto rounded-none p-0">
        <div className="border-b px-6 py-5">
          <SheetTitle asChild>
            <div>
              <Logo />
            </div>
          </SheetTitle>
          <SheetDescription className="sr-only">منوی اصلی سایت</SheetDescription>
        </div>
        <nav aria-label="منوی موبایل" className="flex-1 px-6 py-6">
          <Link to="/" onClick={close} className={linkClass} activeOptions={{ exact: true }}>
            خانه
          </Link>
          <Link to="/shop" onClick={close} className={linkClass} activeOptions={{ includeSearch: false }}>
            فروشگاه
          </Link>
          <div className="py-3">
            <p className="font-serif text-3xl leading-tight">مجموعه‌ها</p>
            <ul className="mt-3 space-y-1 border-s border-border ps-4">
              {categories.map((c, i) => (
                <li key={c.id}>
                  <Link
                    to="/shop"
                    search={{ category: c.id }}
                    onClick={close}
                    className="flex items-baseline gap-3 py-1.5 text-base text-muted-foreground hover:text-brand"
                  >
                    <span className="font-serif text-sm text-brand">{toPersianDigits(`0${i + 1}`)}</span>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link to="/about" onClick={close} className={linkClass}>
            درباره ما
          </Link>
        </nav>
        <div className="space-y-3 border-t bg-secondary px-6 py-6 text-sm">
          <a href={buildWhatsAppUrl("سلام Paris Gallery، سؤالی درباره‌ی گوشواره‌ها دارم.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-brand">
            <MessageCircle className="size-4" /> گفتگو در واتس‌اپ
          </a>
          <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-brand">
            <Instagram className="size-4" /> <span dir="ltr">@{siteConfig.instagramHandle}</span>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
