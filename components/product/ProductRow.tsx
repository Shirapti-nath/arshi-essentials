"use client";

import type { Product } from "@/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { cn } from "@/lib/utils";

type ProductRowProps = {
  title: string;
  subtitle?: string;
  products: Product[];
  className?: string;
};

export function ProductRow({
  title,
  subtitle,
  products,
  className,
}: ProductRowProps) {
  if (!products.length) return null;

  return (
    <AnimatedSection className={cn("section-padding", className)}>
      <div className="container-max">
        <SectionHeading title={title} subtitle={subtitle} />
        <div className="mt-8 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="w-[280px] shrink-0 snap-start md:w-auto"
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
