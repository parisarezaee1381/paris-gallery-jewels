import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { newArrivals } from "@/data/products";

export function NewArrivals() {
  return (
    <section className="border-t bg-secondary/50 py-20 md:py-28" aria-labelledby="new-title">
      <Container>
        <SectionHeader
          index={2}
          eyebrow="تازه‌ها"
          title={<span id="new-title">تازه از کارگاه</span>}
          description="قطعه‌هایی که همین هفته‌ها از کوره بیرون آمده‌اند."
          action={
            <Button asChild variant="outline">
              <Link to="/shop" search={{ sort: "newest" }}>
                همه‌ی محصولات <ArrowLeft />
              </Link>
            </Button>
          }
        />
        <ProductGrid products={newArrivals.slice(0, 4)} />
      </Container>
    </section>
  );
}
