"use client";

import type { Product } from "@/types";
import { getSimilarProducts } from "@/lib/recommendations";
import { ProductRow } from "@/components/product/ProductRow";

type RelatedProductsProps = {
  product: Product;
};

export function RelatedProducts({ product }: RelatedProductsProps) {
  const items = getSimilarProducts(product, 4);
  if (!items.length) return null;

  return (
    <ProductRow
      title="You May Also Like"
      subtitle="Similar sarees and ethnic wear curated for you"
      products={items}
      className="mt-20"
    />
  );
}
