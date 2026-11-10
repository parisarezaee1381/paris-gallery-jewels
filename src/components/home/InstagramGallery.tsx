import { Instagram } from "lucide-react";

import hero from "@/assets/hero-editorial.jpg";
import portrait from "@/assets/editorial-portrait.jpg";
import moodboard from "@/assets/inspiration-moodboard.jpg";
import studio from "@/assets/studio-hands.jpg";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getProductBySlug } from "@/data/products";
import { cn } from "@/lib/utils";

export function InstagramGallery() {
  const tiles = [
    { src: portrait, alt: "پرتره‌ی ادیتوریال با گوشواره‌های هندسی" },
    { src: getProductBySlug("terrazzo")!.images[0].src, alt: "گوشواره‌ی موزاییک" },
    { src: hero, alt: "نیم‌رخ مدل با گوشواره‌ی ماه" },
    { src: getProductBySlug("museum-eye")!.images[0].src, alt: "گوشواره‌ی چشم موزه" },
    { src: studio, alt: "کارگاه Paris Gallery" },
    { src: moodboard, alt: "تخته‌ی الهام با مجله‌های قدیمی" },
  ];
  return (
    <section className="border-t py-20 md:py-28" aria-labelledby="ig-title">
      <Container>
        <SectionHeader
          index={5}
          eyebrow="اینستاگرام"
          title={<span id="ig-title">گالری روزانه</span>}
          description="پشت صحنه‌ی کارگاه، قطعه‌های تازه و استایل‌های پیشنهادی را در اینستاگرام ببینید."
          action={
            <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" })}>
              <Instagram /> <span dir="ltr">@{siteConfig.instagramHandle}</span>
            </a>
          }
        />
        <ul className="grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
          {tiles.map((t, i) => (
            <li key={t.alt} className={cn(i % 2 === 1 && "md:translate-y-8")}>
              <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden" aria-label={`${t.alt} — مشاهده در اینستاگرام`}>
                <img src={t.src} alt={t.alt} width={400} height={500} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 grid place-items-center bg-ink/0 text-ink-foreground opacity-0 transition-all group-hover:bg-ink/45 group-hover:opacity-100">
                  <Instagram className="size-6" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
