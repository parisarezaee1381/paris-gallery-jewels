/**
 * Product catalogue. To add or replace a product, edit the `products` array below.
 * Images: put photos in src/assets/products and import them at the top of this file.
 * Availability is derived from `stock` (see getAvailability in src/lib/reservation.ts).
 */
import burgundyMoon from "@/assets/products/burgundy-moon.jpg";
import burgundyMoonDetail from "@/assets/products/burgundy-moon-detail.jpg";
import burgundyMoonAngle from "@/assets/products/burgundy-moon-angle.jpg";
import seventiesArch from "@/assets/products/seventies-arch.jpg";
import seventiesArchDetail from "@/assets/products/seventies-arch-detail.jpg";
import seventiesArchAngle from "@/assets/products/seventies-arch-angle.jpg";
import ivoryDisc from "@/assets/products/ivory-disc.jpg";
import ivoryDiscDetail from "@/assets/products/ivory-disc-detail.jpg";
import ivoryDiscAngle from "@/assets/products/ivory-disc-angle.jpg";
import nightLine from "@/assets/products/night-line.jpg";
import nightLineDetail from "@/assets/products/night-line-detail.jpg";
import nightLineAngle from "@/assets/products/night-line-angle.jpg";
import cubism from "@/assets/products/cubism.jpg";
import cubismDetail from "@/assets/products/cubism-detail.jpg";
import cubismAngle from "@/assets/products/cubism-angle.jpg";
import terrazzo from "@/assets/products/terrazzo.jpg";
import terrazzoDetail from "@/assets/products/terrazzo-detail.jpg";
import terrazzoAngle from "@/assets/products/terrazzo-angle.jpg";
import midnightBloom from "@/assets/products/midnight-bloom.jpg";
import midnightBloomDetail from "@/assets/products/midnight-bloom-detail.jpg";
import midnightBloomAngle from "@/assets/products/midnight-bloom-angle.jpg";
import museumEye from "@/assets/products/museum-eye.jpg";
import museumEyeDetail from "@/assets/products/museum-eye-detail.jpg";
import museumEyeAngle from "@/assets/products/museum-eye-angle.jpg";

export type CategoryId = "retro" | "minimal" | "abstract" | "statement";

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
}

export const categories: Category[] = [
  { id: "retro", name: "رترو", tagline: "قوس‌ها و ماه‌ها؛ ادای احترام به دهه‌ی هفتاد" },
  { id: "minimal", name: "مینیمال", tagline: "فرم‌های ساده برای روزهای آرام" },
  { id: "abstract", name: "انتزاعی", tagline: "ترکیب‌بندی‌هایی شبیه یک تابلوی کوچک" },
  { id: "statement", name: "گوشواره‌های خاص", tagline: "قطعه‌هایی که خودشان حرف می‌زنند" },
];

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // toman
  images: ProductImage[];
  category: CategoryId;
  material: string;
  dimensions: string;
  weight: string;
  stock: number;
  isNew: boolean;
  isFeatured: boolean;
  /** ISO date the product was added; used for "newest" sorting. */
  addedAt: string;
}

const gallery = (name: string, main: string, detail: string, angle: string): ProductImage[] => [
  { src: main, alt: `گوشواره ${name}` },
  { src: detail, alt: `نمای نزدیک گوشواره ${name}` },
  { src: angle, alt: `جزئیات بافت گوشواره ${name}` },
];

export const products: Product[] = [
  {
    id: "PG-101",
    name: "ماه بُرگاندی",
    slug: "burgundy-moon",
    description:
      "هلالی به رنگ شراب که زیر یک قوس عاجی آویزان است؛ الهام‌گرفته از پوسترهای سینمای دهه‌ی هفتاد. سبک است و با یقه‌ی بلند یا موهای جمع‌شده بیشترین جلوه را دارد.",
    price: 680000,
    images: gallery("ماه بُرگاندی", burgundyMoon, burgundyMoonDetail, burgundyMoonAngle),
    category: "retro",
    material: "خمیر پلیمری مات، قلاب استیل ضدحساسیت با روکش طلایی",
    dimensions: "۶٫۵ × ۳ سانتی‌متر",
    weight: "حدود ۶ گرم (هر لنگه)",
    stock: 4,
    isNew: true,
    isFeatured: false,
    addedAt: "2026-10-28",
  },
  {
    id: "PG-102",
    name: "رنگین‌کمان هفتاد",
    slug: "seventies-arch",
    description:
      "چهار لایه‌ی قوسی در رنگ‌های آجری، خردلی، بُرگاندی و کرم. هر لایه جداگانه با دست شکل گرفته و کنار هم چیده شده تا ریتمی شبیه یک کاور مجله‌ی قدیمی بسازد.",
    price: 790000,
    images: gallery("رنگین‌کمان هفتاد", seventiesArch, seventiesArchDetail, seventiesArchAngle),
    category: "retro",
    material: "خمیر پلیمری چندلایه، پین استیل ضدحساسیت",
    dimensions: "۵٫۵ × ۴٫۵ سانتی‌متر",
    weight: "حدود ۸ گرم (هر لنگه)",
    stock: 2,
    isNew: false,
    isFeatured: false,
    addedAt: "2026-08-14",
  },
  {
    id: "PG-201",
    name: "قرص عاج",
    slug: "ivory-disc",
    description:
      "یک دایره‌ی عاجی با بافت سنگ‌گونه زیر گوی کوچک مشکی. ساده‌ترین قطعه‌ی Paris Gallery، برای کسی که می‌خواهد جزئیات آرام حرف بزند.",
    price: 520000,
    images: gallery("قرص عاج", ivoryDisc, ivoryDiscDetail, ivoryDiscAngle),
    category: "minimal",
    material: "خمیر پلیمری با بافت سنگی، پین استیل ضدحساسیت",
    dimensions: "۴ × ۳ سانتی‌متر",
    weight: "حدود ۴ گرم (هر لنگه)",
    stock: 7,
    isNew: true,
    isFeatured: false,
    addedAt: "2026-11-02",
  },
  {
    id: "PG-202",
    name: "خط شب",
    slug: "night-line",
    description:
      "میله‌ای بلند و مشکی که از یک مربع کوچک عاجی آویزان است. خطی عمودی که صورت را کشیده‌تر نشان می‌دهد و با لباس ساده‌ی شب هماهنگ است.",
    price: 480000,
    images: gallery("خط شب", nightLine, nightLineDetail, nightLineAngle),
    category: "minimal",
    material: "خمیر پلیمری مات، پین استیل ضدحساسیت",
    dimensions: "۷ × ۱ سانتی‌متر",
    weight: "حدود ۴ گرم (هر لنگه)",
    stock: 0,
    isNew: false,
    isFeatured: false,
    addedAt: "2026-07-03",
  },
  {
    id: "PG-301",
    name: "کوبیسم",
    slug: "cubism",
    description:
      "مثلث، نیم‌دایره و مستطیل؛ دو لنگه‌ای که عمداً شبیه هم نیستند. ترکیبی نامتقارن که از نقاشی‌های کوبیستی و قاب‌های گالری الهام گرفته است.",
    price: 860000,
    images: gallery("کوبیسم", cubism, cubismDetail, cubismAngle),
    category: "abstract",
    material: "خمیر پلیمری مات، حلقه‌های برنجی، پین استیل ضدحساسیت",
    dimensions: "۸ × ۳ سانتی‌متر",
    weight: "حدود ۹ گرم (هر لنگه)",
    stock: 3,
    isNew: true,
    isFeatured: false,
    addedAt: "2026-10-20",
  },
  {
    id: "PG-302",
    name: "موزاییک",
    slug: "terrazzo",
    description:
      "فرمی سیال شبیه سنگ رودخانه با خرده‌های بُرگاندی، مشکی و اُخرایی. هیچ دو جفتی شبیه هم نیستند؛ نقش هر قطعه هنگام ورز دادن خمیر شکل می‌گیرد.",
    price: 740000,
    images: gallery("موزاییک", terrazzo, terrazzoDetail, terrazzoAngle),
    category: "abstract",
    material: "خمیر پلیمری با طرح ترازو، گوی برنجی، پین استیل ضدحساسیت",
    dimensions: "۶ × ۳٫۵ سانتی‌متر",
    weight: "حدود ۷ گرم (هر لنگه)",
    stock: 5,
    isNew: false,
    isFeatured: false,
    addedAt: "2026-09-09",
  },
  {
    id: "PG-401",
    name: "گل نیمه‌شب",
    slug: "midnight-bloom",
    description:
      "گلبرگ‌های لایه‌لایه‌ی بُرگاندی و مشکی که یکی‌یکی با دست فرم گرفته‌اند و در مرکزشان گلی کوچک و عاجی نشسته است. قطعه‌ای نمایشی برای شب‌هایی که می‌خواهید دیده شوید.",
    price: 1250000,
    images: gallery("گل نیمه‌شب", midnightBloom, midnightBloomDetail, midnightBloomAngle),
    category: "statement",
    material: "خمیر پلیمری با پرداخت ساتن، پین استیل ضدحساسیت با روکش طلایی",
    dimensions: "۷ × ۶ سانتی‌متر",
    weight: "حدود ۱۱ گرم (هر لنگه)",
    stock: 1,
    isNew: false,
    isFeatured: true,
    addedAt: "2026-09-30",
  },
  {
    id: "PG-402",
    name: "چشم موزه",
    slug: "museum-eye",
    description:
      "چشمی با مردمک هندسی و مژه‌هایی بادبزنی به رنگ بُرگاندی؛ نیم‌نگاهی به آرت‌دکو و پوسترهای دهه‌ی شصت. قطعه‌ای که بیننده را به نگاه دوباره دعوت می‌کند.",
    price: 980000,
    images: gallery("چشم موزه", museumEye, museumEyeDetail, museumEyeAngle),
    category: "statement",
    material: "خمیر پلیمری با جزئیات حکاکی‌شده، پین استیل ضدحساسیت",
    dimensions: "۵ × ۵٫۵ سانتی‌متر",
    weight: "حدود ۸ گرم (هر لنگه)",
    stock: 3,
    isNew: true,
    isFeatured: false,
    addedAt: "2026-11-06",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getCategory(id: CategoryId): Category {
  return categories.find((c) => c.id === id) ?? categories[0];
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const same = products.filter((p) => p.category === product.category && p.id !== product.id);
  const others = products.filter((p) => p.category !== product.category && p.id !== product.id);
  return [...same, ...others].slice(0, limit);
}

export const featuredProduct: Product = products.find((p) => p.isFeatured) ?? products[0];
export const newArrivals: Product[] = products.filter((p) => p.isNew);
