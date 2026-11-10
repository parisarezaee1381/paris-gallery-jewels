import type { Product } from "@/data/products";
import { getCategory } from "@/data/products";

export function ProductSpecs({ product }: { product: Product }) {
  const rows = [
    { label: "جنس", value: product.material },
    { label: "ابعاد", value: product.dimensions },
    { label: "وزن تقریبی", value: product.weight },
    { label: "مجموعه", value: getCategory(product.category).name },
    { label: "کد محصول", value: <span dir="ltr">{product.id}</span> },
  ];
  return (
    <dl className="divide-y border-y">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5 text-sm">
          <dt className="text-muted-foreground">{r.label}</dt>
          <dd className="text-foreground">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
