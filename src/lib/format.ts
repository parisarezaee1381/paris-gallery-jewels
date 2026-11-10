const faDigits = "۰۱۲۳۴۵۶۷۸۹";

/** Replace Latin digits with Persian digits in any string or number. */
export function toPersianDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => faDigits[Number(d)]);
}

/** Convert Persian/Arabic digits back to Latin (for parsing user input). */
export function toLatinDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String(faDigits.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

/** 480000 → "۴۸۰٬۰۰۰" */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("fa-IR", { useGrouping: true }).format(value);
}

/** 480000 → "۴۸۰٬۰۰۰ تومان" */
export function formatToman(value: number): string {
  return `${formatNumber(value)} تومان`;
}
