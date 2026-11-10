import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import heroImage from "@/assets/hero-editorial.jpg";
import { Container } from "@/components/layout/Container";
import { ProductPrice } from "@/components/product/ProductPrice";
import { Button } from "@/components/ui/button";
import { getProductBySlug, products } from "@/data/products";
import { toPersianDigits } from "@/lib/format";

export function Hero() {
  const inset = getProductBySlug("ivory-disc") ?? products[0];
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <Container className="pb-16 pt-6 md:pb-24 md:pt-10">
        {/* Magazine masthead */}
        <div className="mb-8 flex items-center gap-4 text-xs text-muted-foreground md:mb-12">
          <span className="font-serif text-base text-foreground">شماره‌ی {toPersianDigits("۰۱")}</span>
          <span className="h-px flex-1 bg-border" aria-hidden />
          <span className="hidden sm:inline">مجله‌ی گوشواره‌های دست‌ساز</span>
          <span className="hidden h-px w-12 bg-border sm:block" aria-hidden />
          <span>پاییز {toPersianDigits(1405)}</span>
        </div>

        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-8">
          <div className="animate-fade-up md:col-span-6 lg:col-span-5">
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-brand" aria-hidden />
              دست‌ساز · خمیر پلیمری · تک‌نسخه
            </p>
            <h1 id="hero-title" className="display-xl">
              گالری کوچکی
              <br />
              برای گوش‌های
              <br />
              <span className="text-brand">جسور</span>
            </h1>
            <p className="mt-8 max-w-md text-base leading-8 text-muted-foreground md:text-lg md:leading-9">
              <span className="font-wordmark text-foreground">Paris Gallery</span> گوشواره‌هایی هنری از خمیر پلیمری می‌سازد؛ با فرم‌های هندسی دهه‌ی هفتاد، رنگ‌های عمیق و قطعه‌هایی که هیچ‌کدام دقیقاً تکرار نمی‌شوند.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Button asChild size="lg">
                <Link to="/shop">
                  مشاهده مجموعه <ArrowLeft />
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link to="/about">داستان ما</Link>
              </Button>
            </div>
            <dl className="mt-14 grid max-w-md grid-cols-3 border-t pt-6">
              {[
                [toPersianDigits(products.length), "طرح در گالری"],
                ["۱۰۰٪", "ساخت دست"],
                ["۱", "از هر طرح، چند جفت"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-serif text-3xl leading-none">{v}</dd>
                  <dd className="mt-2 text-xs text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative md:col-span-6 lg:col-span-7">
            <div className="absolute -top-6 end-[-12%] size-[78%] rounded-full bg-brand md:-top-10" aria-hidden />
            <div className="pattern-dots absolute -bottom-8 start-0 h-40 w-40 md:h-56 md:w-56" aria-hidden />
            <div className="relative ms-auto w-[86%] md:w-[80%]">
              <img
                src={heroImage}
                alt="مدلی با گوشواره‌ی دست‌ساز بُرگاندی و عاجی در نمای نیم‌رخ"
                width={1200}
                height={1504}
                fetchPriority="high"
                className="aspect-[4/5] w-full object-cover"
              />
              <span className="absolute -start-3 top-8 origin-top-right -rotate-90 bg-background px-3 py-1 text-[0.7rem] tracking-[0.3em] text-muted-foreground md:-start-4" dir="ltr" aria-hidden>
                EDITION 01
              </span>
            </div>
            <Link
              to="/product/$slug"
              params={{ slug: inset.slug }}
              className="group absolute -bottom-10 start-0 w-[42%] max-w-[230px] bg-background p-2 md:bottom-10 md:start-[2%]"
            >
              <img src={inset.images[0].src} alt={inset.images[0].alt} width={1024} height={1280} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              <span className="mt-2 block px-1 font-serif text-lg leading-tight group-hover:text-brand">{inset.name}</span>
              <ProductPrice value={inset.price} size="sm" className="px-1 pb-1" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
