import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Search } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ProductPrice } from "@/components/product/ProductPrice";
import { categories, products } from "@/data/products";
import { useUiState } from "@/hooks/use-ui-state";
import { filterProducts } from "@/lib/shop";

/** Reusable search field. */
export function SearchBar({ value, onChange, autoFocus, placeholder = "جستجوی نام، رنگ یا جنس…", id }: { value: string; onChange: (v: string) => void; autoFocus?: boolean; placeholder?: string; id?: string }) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute start-0 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
        placeholder={placeholder}
        aria-label="جستجو در محصولات"
        className="h-14 w-full border-0 border-b border-foreground/30 bg-transparent ps-9 font-serif text-2xl outline-none placeholder:text-muted-foreground/70 focus:border-brand md:text-3xl"
      />
    </div>
  );
}

export function SearchDialog() {
  const { searchOpen, setSearchOpen } = useUiState();
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchOpen) setQ("");
  }, [searchOpen]);

  const results = useMemo(() => (q.trim() ? filterProducts(products, { q }).slice(0, 5) : []), [q]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    navigate({ to: "/shop", search: { q: q.trim() || undefined } });
  };

  const close = () => setSearchOpen(false);

  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent className="top-[12%] max-w-2xl translate-y-0 rounded-none border-foreground/15 bg-background p-6 sm:rounded-none md:p-10">
        <DialogTitle className="eyebrow">جستجو</DialogTitle>
        <DialogDescription className="sr-only">نام محصول را بنویسید و Enter بزنید</DialogDescription>
        <form onSubmit={submit} role="search">
          <SearchBar value={q} onChange={setQ} autoFocus />
        </form>

        {q.trim() ? (
          results.length ? (
            <ul className="mt-2 divide-y">
              {results.map((p) => (
                <li key={p.id}>
                  <Link to="/product/$slug" params={{ slug: p.slug }} onClick={close} className="group flex items-center gap-4 py-3">
                    <img src={p.images[0].src} alt="" width={56} height={70} className="h-[70px] w-14 object-cover" />
                    <span className="flex-1 font-serif text-xl group-hover:text-brand">{p.name}</span>
                    <ProductPrice value={p.price} size="sm" />
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <button type="submit" onClick={submit} className="inline-flex cursor-pointer items-center gap-2 text-sm text-brand hover:underline">
                  همه‌ی نتایج در فروشگاه <ArrowLeft className="size-4" />
                </button>
              </li>
            </ul>
          ) : (
            <p className="mt-6 text-sm text-muted-foreground">چیزی با این عبارت پیدا نشد. واژه‌ی دیگری امتحان کنید.</p>
          )
        ) : (
          <div className="mt-6">
            <p className="eyebrow mb-3">پیشنهاد مجموعه‌ها</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <Link key={c.id} to="/shop" search={{ category: c.id }} onClick={close} className="border border-foreground/25 px-4 py-2 text-sm transition-colors hover:border-brand hover:text-brand">
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
