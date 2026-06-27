import { products } from "@/data/products";
import type { Product } from "@/types";

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

export {
  getSimilarProducts,
  getBestSellers,
  getNewArrivals,
  getTrending,
  getRecommendedFromHistory,
} from "@/lib/recommendations";
