import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { siteConfig } from "@/config/site";
import { categories } from "@/data/products";
import { buildWhatsAppUrl } from "@/lib/reservation";
import { toPersianDigits } from "@/lib/format";

const steps = [
  "گوشواره‌ی دلخواه را انتخاب کنید",
  "درخواست رزرو را از طریق واتس‌اپ بفرستید",
  "موجودی و هزینه‌ی ارسال را تأیید می‌کنیم",
  "پس از هماهنگی، بسته با دقت ارسال می‌شود",
];

export function Footer() {
  const linkClass = "text-ink-muted transition-colors hover:text-ink-foreground";
  return (
    <footer className="grain mt-auto bg-ink text-ink-foreground">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo tone="dark" />
            <p className="mt-6 max-w-xs text-sm leading-7 text-ink-muted">
              گوشواره‌های دست‌ساز از خمیر پلیمری؛ هر قطعه در کارگاهی کوچک در {siteConfig.city} شکل می‌گیرد و تکرار نمی‌شود.
            </p>
          </div>

          <nav aria-label="پیوندهای پانویس" className="grid grid-cols-2 gap-8 text-sm md:col-span-4">
            <div>
              <h2 className="eyebrow mb-4 text-ink-muted">صفحه‌ها</h2>
              <ul className="space-y-2.5">
                <li><Link to="/" className={linkClass}>خانه</Link></li>
                <li><Link to="/shop" className={linkClass}>فروشگاه</Link></li>
                <li><Link to="/about" className={linkClass}>درباره ما</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="eyebrow mb-4 text-ink-muted">مجموعه‌ها</h2>
              <ul className="space-y-2.5">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link to="/shop" search={{ category: c.id }} className={linkClass}>{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="md:col-span-4">
            <h2 className="eyebrow mb-4 text-ink-muted">نحوه‌ی سفارش</h2>
            <ol className="space-y-2.5 text-sm">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="font-serif text-brand-foreground/60">{toPersianDigits(i + 1)}</span>
                  <span className="text-ink-muted">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs leading-6 text-ink-muted/80">پرداخت آنلاین نداریم؛ ثبت درخواست به معنای قطعی شدن خرید نیست.</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-ink-border pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-6 text-sm">
            <a href={buildWhatsAppUrl("سلام Paris Gallery، سؤالی دارم.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-ink-foreground hover:text-ink-muted">
              <MessageCircle className="size-4" /> واتس‌اپ
            </a>
            <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-ink-foreground hover:text-ink-muted">
              <Instagram className="size-4" /> <span dir="ltr">@{siteConfig.instagramHandle}</span>
            </a>
            <span className="text-ink-muted">{siteConfig.responseTime}</span>
          </div>
          <p className="text-xs text-ink-muted" dir="ltr">© {new Date().getFullYear()} Paris Gallery</p>
        </div>
      </Container>
    </footer>
  );
}
