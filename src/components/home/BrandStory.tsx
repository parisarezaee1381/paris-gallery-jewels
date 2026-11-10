import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import studio from "@/assets/studio-hands.jpg";
import { Container } from "@/components/layout/Container";
import { ImageWithText } from "@/components/layout/ImageWithText";
import { Button } from "@/components/ui/button";
import { toPersianDigits } from "@/lib/format";

export function BrandStory() {
  return (
    <section className="relative py-20 md:py-28" aria-labelledby="story-title">
      <Container>
        <ImageWithText image={{ src: studio, alt: "دست‌هایی در حال فرم دادن به خمیر پلیمری در کارگاه", width: 1200, height: 1504 }}>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="font-serif text-2xl text-brand">{toPersianDigits("04")}</span>
            <span className="eyebrow">داستان ما</span>
          </div>
          <h2 id="story-title" className="display-lg mt-6">
            هر گوشواره از یک طرح کوچک روی کاغذ شروع می‌شود
          </h2>
          <blockquote className="mt-8 border-s-2 border-brand ps-6 font-serif text-2xl leading-snug text-foreground/85">
            «دوست دارم کسی که گوشواره را می‌بیند، چند ثانیه مکث کند؛ مثل وقتی که جلوی یک تابلو می‌ایستیم.»
          </blockquote>
          <p className="mt-8 leading-8 text-muted-foreground">
            رنگ‌ها را خودمان ترکیب می‌کنیم، فرم‌ها را با دست می‌بُریم و هر قطعه را جداگانه پخت و پرداخت می‌کنیم. برای همین هیچ دو جفتی کاملاً شبیه هم نیستند.
          </p>
          <Button asChild variant="link" className="mt-6">
            <Link to="/about">
              بیشتر درباره‌ی Paris Gallery <ArrowLeft />
            </Link>
          </Button>
        </ImageWithText>
      </Container>
    </section>
  );
}
