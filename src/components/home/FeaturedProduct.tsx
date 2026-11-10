import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { WhatsAppButton } from "@/components/reservation/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { featuredProduct as product } from "@/data/products";
import { formatNumber, toPersianDigits } from "@/lib/format";
import { availabilityLabel, buildProductMessage, getAvailability } from "@/lib/reservation";

export function FeaturedProduct() {
  const availability = getAvailability(product);
  return (
    <section className="grain overflow-hidden bg-ink py-20 text-ink-foreground md:py-28" aria-labelledby="featured-title">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-10">
          <div className="relative md:col-span-6">
            <div className="absolute -inset-4 border border-ink-border md:-inset-6" aria-hidden />
            <img
              src={product.images[0].src}
              alt={product.images[0].alt}
              width={1024}
              height={1280}
              loading="lazy"
              className="relative aspect-[4/5] w-full object-cover"
            />
            <span className="absolute -bottom-8 end-6 font-serif text-[7rem] leading-none text-brand md:text-[10rem]" aria-hidden>
              {toPersianDigits("۰۳")}
            </span>
          </div>

          <div className="md:col-span-6 lg:col-span-5 lg:col-start-8">
            <p className="eyebrow mb-6 text-ink-muted">قطعه‌ی برگزیده‌ی فصل</p>
            <h2 id="featured-title" className="display-xl text-ink-foreground">
              {product.name}
            </h2>
            <p className="mt-8 text-base leading-8 text-ink-muted md:text-lg md:leading-9">{product.description}</p>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-ink-border py-6 text-sm">
              <div>
                <dt className="text-ink-muted">ابعاد</dt>
                <dd className="mt-1">{product.dimensions}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">وضعیت</dt>
                <dd className="mt-1">
                  {availabilityLabel[availability]}
                  {availability !== "sold_out" && ` · ${toPersianDigits(product.stock)} جفت`}
                </dd>
              </div>
            </dl>
            <p className="mt-8 flex items-baseline gap-2">
              <span className="font-serif text-4xl">{formatNumber(product.price)}</span>
              <span className="text-ink-muted">تومان</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="ivory" size="lg">
                <Link to="/product/$slug" params={{ slug: product.slug }}>
                  مشاهده و رزرو <ArrowLeft />
                </Link>
              </Button>
              <WhatsAppButton variant="outline-ivory" size="lg" message={buildProductMessage(product, 1)}>
                پرسش در واتس‌اپ
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
