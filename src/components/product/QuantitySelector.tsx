import { Minus, Plus } from "lucide-react";
import { toPersianDigits } from "@/lib/format";
import { clampQuantity } from "@/lib/reservation";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
  id?: string;
  className?: string;
}

export function QuantitySelector({ value, max, onChange, id, className }: QuantitySelectorProps) {
  const disabled = max <= 0;
  const btn =
    "grid size-11 cursor-pointer place-items-center transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-35";
  return (
    <div className={cn("inline-flex h-11 items-center border border-foreground/40", disabled && "opacity-50", className)} role="group" aria-label="تعداد">
      <button type="button" className={btn} aria-label="افزایش تعداد" disabled={disabled || value >= max} onClick={() => onChange(clampQuantity(value + 1, max))}>
        <Plus className="size-4" />
      </button>
      <output id={id} aria-live="polite" className="min-w-10 text-center tabular-nums">
        {toPersianDigits(disabled ? 0 : value)}
      </output>
      <button type="button" className={btn} aria-label="کاهش تعداد" disabled={disabled || value <= 1} onClick={() => onChange(clampQuantity(value - 1, max))}>
        <Minus className="size-4" />
      </button>
    </div>
  );
}
