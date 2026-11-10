import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { getCategory } from "@/data/products";
import { FavoriteButton } from "@/components/product/FavoriteButton";
import { ProductBadge } from "@/components/product/ProductBadge";
import { ProductPrice } from "@/components/product/ProductPrice";
import { ProductTitle } from "@/components/product/ProductTitle";
import { StockBadge } from "@/components/product/StockStatus";
import { getAvailability } from "@/lib/reservation";
import { cn } from "@/lib/utils";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const soldOut = getAvailability(product) === "sold_out";
  const [main, alt] = product.images;

  return (
    <article className="group relative">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block focus-visible:outline-offset-4"
        aria-label={`${product.name} — مشاهده جزئیات`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
          <img
            src={main.src}
            alt={main.alt}
            width={1024}
            height={1280}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.03]",
              alt && "group-hover:opacity-0",
              soldOut && "grayscale-[35%]",
            )}
          />
          {alt && (
            <img
              src={alt.src}
              alt=""
              aria-hidden
              width={1024}
              height={1280}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full scale-[1.03] object-cover opacity-0 transition-[opacity,transform] duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
            />
          )}
          <div className="absolute start-3 top-3 flex flex-col items-start gap-1.5">
            {product.isNew && <ProductBadge variant="new">تازه</ProductBadge>}
            <StockBadge product={product} />
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <p className="eyebrow mb-1">{getCategory(product.category).name}</p>
            <ProductTitle className="transition-colors group-hover:text-brand">{product.name}</ProductTitle>
          </div>
          <ProductPrice value={product.price} className="mt-5 shrink-0" />
        </div>
      </Link>
      <FavoriteButton product={product} className="absolute end-3 top-3" />
    </article>
  );
}
