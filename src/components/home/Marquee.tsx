import { categories } from "@/data/products";

export function Marquee() {
  const words = [...categories.map((c) => c.name), "دست‌ساز", "تک‌نسخه", "الهام از دهه‌ی هفتاد"];
  const row = (
    <span className="flex shrink-0 items-center gap-10 pe-10">
      {words.map((w) => (
        <span key={w} className="flex items-center gap-10 font-serif text-2xl md:text-3xl">
          {w}
          <span className="inline-block size-2 rotate-45 bg-brand" aria-hidden />
        </span>
      ))}
    </span>
  );
  return (
    <div className="overflow-hidden border-y border-ink bg-ink py-5 text-ink-foreground" aria-hidden>
      <div className="flex w-max animate-marquee">
        {row}
        {row}
      </div>
    </div>
  );
}
