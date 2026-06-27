"use client";

import { products } from "@/data/products";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import { ProductRow } from "@/components/product/ProductRow";

type RecentlyViewedSectionProps = {
  excludeSlug?: string;
  className?: string;
};

export function RecentlyViewedSection({
  excludeSlug,
  className,
}: RecentlyViewedSectionProps) {
  const { slugs } = useRecentlyViewed();
  const items = slugs
    .filter((s) => s !== excludeSlug)
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean)
    .slice(0, 4);

  if (!items.length) return null;

  return (
    <ProductRow
      title="Recently Viewed"
      subtitle="Continue where you left off"
      products={items as typeof products}
      className={className ?? "mt-20"}
    />
  );
}
