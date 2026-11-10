import { useEffect, useId, useState, type FormEvent } from "react";
import { CalendarCheck, Info, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { SuccessState } from "@/components/feedback/StatusMessage";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { products, type Product } from "@/data/products";
import { formatToman, toLatinDigits } from "@/lib/format";
import { buildReservationMessage, buildWhatsAppUrl, clampQuantity, getAvailability } from "@/lib/reservation";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2, "لطفاً نام خود را وارد کنید").max(60, "نام خیلی طولانی است"),
  phone: z
    .string()
    .transform((v) => toLatinDigits(v).replace(/[\s-]/g, ""))
    .refine((v) => /^09\d{9}$/.test(v), "شماره همراه باید ۱۱ رقم و با ۰۹ شروع شود"),
  note: z.string().max(400, "توضیحات حداکثر ۴۰۰ نویسه").optional(),
  agree: z.literal(true, { errorMap: () => ({ message: "لطفاً این مورد را تأیید کنید" }) }),
});

type Errors = Partial<Record<"name" | "phone" | "note" | "agree", string>>;

interface ReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
  quantity: number;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-destructive">
      {message}
    </p>
  );
}

export function ReservationDialog({ open, onOpenChange, product, quantity }: ReservationDialogProps) {
  const uid = useId();
  const [productId, setProductId] = useState(product.id);
  const [qty, setQty] = useState(quantity);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const selected = products.find((p) => p.id === productId) ?? product;
  const reservable = products.filter((p) => getAvailability(p) !== "sold_out");

  useEffect(() => {
    if (open) {
      setProductId(product.id);
      setQty(clampQuantity(quantity, product.stock));
      setSentUrl(null);
      setErrors({});
    }
  }, [open, product, quantity]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, phone, note, agree });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    const url = buildWhatsAppUrl(
      buildReservationMessage({
        name: parsed.data.name,
        phone: parsed.data.phone,
        product: selected,
        quantity: qty,
        note: parsed.data.note,
      }),
    );
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("درخواست رزرو آماده شد", { description: "پیام را در واتس‌اپ ارسال کنید." });
  };

  const ids = {
    name: `${uid}-name`,
    phone: `${uid}-phone`,
    note: `${uid}-note`,
    agree: `${uid}-agree`,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-lg overflow-y-auto rounded-none border-foreground/15 bg-background p-0 sm:rounded-none">
        {sentUrl ? (
          <div className="p-6">
            <DialogTitle className="sr-only">درخواست رزرو</DialogTitle>
            <SuccessState
              title="تقریباً تمام شد"
              description={
                <>
                  پیام رزرو در واتس‌اپ باز شد. برای ثبت نهایی، آن را <strong>ارسال</strong> کنید. اگر واتس‌اپ باز نشد از دکمه‌ی زیر استفاده کنید.
                  <br />
                  رزرو پس از تأیید موجودی و هماهنگی با شما قطعی می‌شود.
                </>
              }
              action={
                <>
                  <a href={sentUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "whatsapp" })}>
                    <MessageCircle /> باز کردن واتس‌اپ
                  </a>
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    بستن
                  </Button>
                </>
              }
            />
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <div className="border-b bg-secondary px-6 pb-5 pt-7">
              <p className="eyebrow mb-2 flex items-center gap-2 text-brand">
                <CalendarCheck className="size-3.5" /> درخواست رزرو
              </p>
              <DialogTitle className="font-serif text-3xl font-medium">{selected.name}</DialogTitle>
              <DialogDescription className="mt-1 text-sm text-muted-foreground">
                {formatToman(selected.price)} · کد <span dir="ltr">{selected.id}</span>
              </DialogDescription>
            </div>

            <div className="space-y-5 px-6 py-6">
              <div>
                <Label htmlFor={ids.name} className="mb-2 block">نام و نام خانوادگی</Label>
                <Input id={ids.name} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${ids.name}-err` : undefined} className="h-11 rounded-none bg-background" />
                <FieldError id={`${ids.name}-err`} message={errors.name} />
              </div>

              <div>
                <Label htmlFor={ids.phone} className="mb-2 block">شماره همراه</Label>
                <Input id={ids.phone} type="tel" inputMode="numeric" dir="ltr" placeholder="09xx xxx xxxx" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${ids.phone}-err` : undefined} className="h-11 rounded-none bg-background text-end" />
                <FieldError id={`${ids.phone}-err`} message={errors.phone} />
              </div>

              <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
                <div>
                  <Label className="mb-2 block" id={`${uid}-product-label`}>محصول</Label>
                  <Select
                    value={productId}
                    onValueChange={(v) => {
                      setProductId(v);
                      const p = products.find((x) => x.id === v);
                      if (p) setQty((q) => clampQuantity(q, p.stock));
                    }}
                  >
                    <SelectTrigger aria-labelledby={`${uid}-product-label`} className="h-11 rounded-none bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      {(reservable.some((p) => p.id === product.id) ? reservable : [product, ...reservable]).map((p) => (
                        <SelectItem key={p.id} value={p.id} className="rounded-none">
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <span className="mb-2 block text-sm font-medium leading-none">تعداد</span>
                  <QuantitySelector value={qty} max={selected.stock} onChange={setQty} />
                </div>
              </div>

              <div>
                <Label htmlFor={ids.note} className="mb-2 block">
                  توضیحات <span className="text-muted-foreground">(اختیاری)</span>
                </Label>
                <Textarea id={ids.note} value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="مثلاً شهر محل ارسال یا زمان مناسب برای تماس" className="rounded-none bg-background" />
                <FieldError id={`${ids.note}-err`} message={errors.note} />
              </div>

              <div className="flex gap-3 bg-secondary/70 p-4 text-xs leading-6 text-muted-foreground">
                <Info className="mt-0.5 size-4 shrink-0 text-brand" />
                <p>
                  ثبت درخواست رزرو به معنای قطعی شدن خرید یا تضمین موجودی نیست. پس از دریافت پیام، موجودی را بررسی و برای پرداخت و ارسال با شما هماهنگ می‌کنیم.
                </p>
              </div>

              <div>
                <label htmlFor={ids.agree} className="flex cursor-pointer items-start gap-3 text-sm">
                  <Checkbox id={ids.agree} checked={agree} onCheckedChange={(v) => setAgree(v === true)} aria-invalid={!!errors.agree} className="mt-1 rounded-none" />
                  <span>متوجه هستم که این فقط یک درخواست رزرو است.</span>
                </label>
                <FieldError id={`${ids.agree}-err`} message={errors.agree} />
              </div>
            </div>

            <div className={cn("flex flex-col-reverse gap-3 border-t px-6 py-5 sm:flex-row sm:justify-between")}>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                انصراف
              </Button>
              <Button type="submit" variant="brand" disabled={selected.stock <= 0}>
                ارسال درخواست از طریق واتس‌اپ
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
