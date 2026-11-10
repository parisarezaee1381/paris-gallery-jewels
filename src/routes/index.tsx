import { createFileRoute } from "@tanstack/react-router";

import { BrandStory } from "@/components/home/BrandStory";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { FeaturedProduct } from "@/components/home/FeaturedProduct";
import { Hero } from "@/components/home/Hero";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { Marquee } from "@/components/home/Marquee";
import { NewArrivals } from "@/components/home/NewArrivals";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Paris Gallery — گوشواره‌های دست‌ساز هنری با الهام از دهه‌ی هفتاد" },
      {
        name: "description",
        content: "گوشواره‌های دست‌ساز خمیر پلیمری؛ رترو، مینیمال، انتزاعی و قطعه‌های خاص. رزرو آسان از طریق واتس‌اپ.",
      },
      { property: "og:title", content: "Paris Gallery — گالری کوچکی برای گوش‌های جسور" },
      {
        property: "og:description",
        content: "گوشواره‌های هنری دست‌ساز با فرم‌های هندسی و رنگ‌های عمیق؛ هر قطعه تک و متفاوت.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedCollections />
      <NewArrivals />
      <FeaturedProduct />
      <BrandStory />
      <InstagramGallery />
    </>
  );
}
