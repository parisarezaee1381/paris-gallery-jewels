/**
 * Store-wide settings. Replace the placeholders below with the real details.
 *
 * WHATSAPP_NUMBER: international format, digits only, no "+" or leading zeros
 * (e.g. Iranian mobile 0912xxxxxxx → "98912xxxxxxx"). Leave empty until the real
 * number is known — WhatsApp links then open with the message pre-filled and the
 * customer picks the contact.
 */
export const siteConfig = {
  name: "Paris Gallery",
  whatsappNumber: "",
  instagramHandle: "parisgallery",
  get instagramUrl() {
    return `https://instagram.com/${this.instagramHandle}`;
  },
  city: "تهران",
  responseTime: "معمولاً ظرف چند ساعت پاسخ می‌دهیم",
} as const;
