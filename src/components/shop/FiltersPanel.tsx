import { useId } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { categories, products, type CategoryId } from "@/data/products";
import { toPersianDigits } from "@/lib/format";
import { priceRanges, type PriceRangeId, type ShopFilters } from "@/lib/shop";
import { cn } from "@/lib/utils";

interface FiltersPanelProps {
  filters: ShopFilters;
  onChange: (patch: Partial<ShopFilters>) => void;
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t py-6 first:border-t-0 first:pt-0">
      <legend className="eyebrow float-start mb-4 w-full">{title}</legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  );
}

export function FiltersPanel({ filters, onChange }: FiltersPanelProps) {
  const uid = useId();
  return (
    <div>
      <Group title="مجموعه">
        <RadioGroup
          value={filters.category ?? "all"}
          onValueChange={(v) => onChange({ category: v === "all" ? undefined : (v as CategoryId) })}
          className="gap-1"
        >
          {[{ id: "all", name: "همه" }, ...categories].map((c) => {
            const count = c.id === "all" ? products.length : products.filter((p) => p.category === c.id).length;
            const id = `${uid}-cat-${c.id}`;
            return (
              <Label key={c.id} htmlFor={id} className={cn("flex cursor-pointer items-center gap-3 py-1.5 text-sm font-normal", (filters.category ?? "all") === c.id && "text-brand")}>
                <RadioGroupItem id={id} value={c.id} />
                <span className="flex-1">{c.name}</span>
                <span className="text-xs text-muted-foreground">{toPersianDigits(count)}</span>
              </Label>
            );
          })}
        </RadioGroup>
      </Group>

      <Group title="قیمت">
        <RadioGroup
          value={filters.price ?? "all"}
          onValueChange={(v) => onChange({ price: v === "all" ? undefined : (v as PriceRangeId) })}
          className="gap-1"
        >
          {[{ id: "all", label: "همه‌ی قیمت‌ها" }, ...priceRanges].map((r) => {
            const id = `${uid}-price-${r.id}`;
            return (
              <Label key={r.id} htmlFor={id} className="flex cursor-pointer items-center gap-3 py-1.5 text-sm font-normal">
                <RadioGroupItem id={id} value={r.id} />
                {r.label}
              </Label>
            );
          })}
        </RadioGroup>
      </Group>

      <Group title="موجودی">
        <Label htmlFor={`${uid}-stock`} className="flex cursor-pointer items-center gap-3 text-sm font-normal">
          <Checkbox
            id={`${uid}-stock`}
            checked={!!filters.inStock}
            onCheckedChange={(v) => onChange({ inStock: v === true ? true : undefined })}
            className="rounded-none"
          />
          فقط قطعه‌های موجود
        </Label>
      </Group>
    </div>
  );
}
