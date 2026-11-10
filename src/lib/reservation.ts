import { siteConfig } from "@/config/site";
import type { Product } from "@/data/products";
import { formatToman, toPersianDigits } from "@/lib/format";

export type Availability = "in_stock" | "low_stock" | "sold_out";

/** Stock of 1–2 shows as "limited"; 0 is sold out. */
export const LOW_STOCK_THRESHOLD = 2;

export function getAvailability(product: Pick<Product, "stock">): Availability {
  if (product.stock <= 0) return "sold_out";
  if (product.stock <= LOW_STOCK_THRESHOLD) return "low_stock";
  return "in_stock";
}

export const availabilityLabel: Record<Availability, string> = {
  in_stock: "موجود",
  low_stock: "تعداد محدود",
  sold_out: "ناموجود",
};

/** Keep a requested quantity between 1 and the available stock. */
export function clampQuantity(quantity: number, stock: number): number {
  if (stock <= 0) return 0;
  if (!Number.isFinite(quantity)) return 1;
  return Math.min(Math.max(1, Math.floor(quantity)), stock);
}

export function buildWhatsAppUrl(message: string, phone: string = siteConfig.whatsappNumber) {
  const digits = phone.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return digits ? `https://wa.me/${digits}?text=${text}` : `https://wa.me/?text=${text}`;
}

/** Quick inquiry: product name, ID, price and quantity. */
export function buildProductMessage(product: Product, quantity: number): string {
  const qty = clampQuantity(quantity, product.stock) || 1;
  return [
    "سلام Paris Gallery 🌙",
    "درخواست رزرو این محصول را دارم:",
    `• نام محصول: ${product.name}`,
    `• کد محصول: ${product.id}`,
    `• قیمت: ${formatToman(product.price)}`,
    `• تعداد: ${toPersianDigits(qty)}`,
    "لطفاً موجودی را تأیید کنید.",
  ].join("\n");
}

export interface ReservationRequest {
  name: string;
  phone: string;
  product: Product;
  quantity: number;
  note?: string;
}

/** Full reservation form message. */
export function buildReservationMessage(req: ReservationRequest): string {
  const qty = clampQuantity(req.quantity, req.product.stock) || 1;
  const lines = [
    "سلام Paris Gallery 🌙",
    "درخواست رزرو ثبت می‌کنم:",
    `• نام: ${req.name}`,
    `• شماره همراه: ${toPersianDigits(req.phone)}`,
    `• محصول: ${req.product.name}`,
    `• کد محصول: ${req.product.id}`,
    `• قیمت واحد: ${formatToman(req.product.price)}`,
    `• تعداد: ${toPersianDigits(qty)}`,
    `• جمع: ${formatToman(req.product.price * qty)}`,
  ];
  if (req.note?.trim()) lines.push(`• توضیحات: ${req.note.trim()}`);
  lines.push("می‌دانم این پیام فقط درخواست رزرو است و خرید پس از تأیید شما قطعی می‌شود.");
  return lines.join("\n");
}
