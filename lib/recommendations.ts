import { products } from "@/data/products";
import type { Product, ProductTag } from "@/types";

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByTag(tag: ProductTag): Product[] {
  return products.filter((p) => p.tags?.includes(tag));
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.badge === "bestseller" || p.tags?.includes("bestseller"));
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.badge === "new" || p.tags?.includes("new-arrival"));
}

export function getTrending(): Product[] {
  return products.filter((p) => p.tags?.includes("trending"));
}

export function getSimilarProducts(product: Product, limit = 4): Product[] {
  const related = product.relatedSlugs
    ?.map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as Product[] | undefined;

  if (related?.length) return related.slice(0, limit);

  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.fabric === product.fabric)
    )
    .slice(0, limit);
}

export function getRecommendedFromHistory(
  viewedSlugs: string[],
  limit = 4
): Product[] {
  if (!viewedSlugs.length) return getBestSellers().slice(0, limit);

  const viewed = viewedSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as Product[];

  const categories = new Set(viewed.map((p) => p.category));
  const tags = new Set(viewed.flatMap((p) => p.tags ?? []));

  const scored = products
    .filter((p) => !viewedSlugs.includes(p.slug))
    .map((p) => {
      let score = 0;
      if (categories.has(p.category)) score += 2;
      if (p.tags?.some((t) => tags.has(t))) score += 1;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.p);
}

export function getCustomersAlsoBought(
  productId: string,
  coOccurrence: Record<string, number>,
  limit = 4
): Product[] {
  const pairs = Object.entries(coOccurrence)
    .filter(([key]) => key.includes(productId))
    .sort(([, a], [, b]) => b - a);

  const ids = pairs
    .map(([key]) => key.split(":").find((id) => id !== productId))
    .filter(Boolean) as string[];

  const result: Product[] = [];
  for (const id of ids) {
    const p = getProductById(id);
    if (p) result.push(p);
    if (result.length >= limit) break;
  }

  if (result.length < limit) {
    const product = getProductById(productId);
    if (product) {
      for (const sim of getSimilarProducts(product, limit)) {
        if (!result.find((r) => r.id === sim.id)) result.push(sim);
        if (result.length >= limit) break;
      }
    }
  }

  return result.slice(0, limit);
}

export function getFeaturedSlugs(): string[] {
  return ["kanchipuram-silk", "madurai-sungudi", "couple-combos"];
}

export function getProductsByFabric(fabric: string): Product[] {
  return products.filter((p) => p.fabric?.toLowerCase().includes(fabric.toLowerCase()));
}
