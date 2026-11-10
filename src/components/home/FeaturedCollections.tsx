import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { categories, products } from "@/data/products";
import { toPersianDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

const coverSlug: Record<string, string> = {
  retro: "seventies-arch",
  minimal: "ivory-disc",
  abstract: "cubism",
  statement: "midnight-bloom",
};

export function FeaturedCollections() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="collections-title">
      <Container>
        <SectionHeader
          index={1}
          eyebrow="مجموعه‌ها"
          title={<span id="collections-title">چهار حال‌وهوا، یک امضا</span>}
          description="هر مجموعه مثل یک فصل از مجله است؛ از قوس‌های گرم دهه‌ی هفتاد تا فرم‌های آرام و قطعه‌های نمایشی."
        />
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {categories.map((c, i) => {
            const cover = products.find((p) => p.slug === coverSlug[c.id]) ?? products[i];
            const count = products.filter((p) => p.category === c.id).length;
            return (
              <li key={c.id} className={cn(i % 2 === 1 && "md:mt-24")}>
                <Link to="/shop" search={{ category: c.id }} className="group block">
                  <div className="relative overflow-hidden bg-secondary">
                    <img
                      src={cover.images[0].src}
                      alt={`مجموعه‌ی ${c.name}`}
                      width={1024}
                      height={1280}
                      loading="lazy"
                      className={cn("w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]", i % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/5]")}
                    />
                    <span className="absolute start-3 top-3 bg-background px-2 py-0.5 font-serif text-lg leading-tight">
                      {toPersianDigits(`0${i + 1}`)}
                    </span>
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-3 border-b pb-4">
                    <div>
                      <h3 className="font-serif text-2xl leading-tight group-hover:text-brand md:text-3xl">{c.name}</h3>
                      <p className="mt-1 text-xs leading-6 text-muted-foreground">{c.tagline}</p>
                    </div>
                    <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                      {toPersianDigits(count)} طرح
                      <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
