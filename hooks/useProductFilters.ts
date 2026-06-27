"use client";

import { useMemo, useState } from "react";
import {
  products,
  filterCategories,
  fabricFilters,
  occasionFilters,
  colorFilters,
  PRICE_RANGE,
} from "@/data/products";
import type { ProductFilters, ProductTag } from "@/types";

const defaultFilters: ProductFilters = {
  categories: [],
  fabrics: [],
  occasions: [],
  colors: [],
  tags: [],
  priceMin: PRICE_RANGE.min,
  priceMax: PRICE_RANGE.max,
  inStockOnly: false,
  search: "",
  sort: "default",
};

export function useProductFilters(initial?: Partial<ProductFilters>) {
  const [filters, setFilters] = useState<ProductFilters>({
    ...defaultFilters,
    ...initial,
  });
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (filters.categories.length) {
      list = list.filter((p) => filters.categories.includes(p.category));
    }

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric?.toLowerCase().includes(q)
      );
    }

    if (filters.fabrics.length) {
      list = list.filter((p) =>
        filters.fabrics.some((f) => p.fabric?.includes(f))
      );
    }

    if (filters.occasions.length) {
      list = list.filter((p) =>
        filters.occasions.some((o) => p.occasion?.includes(o))
      );
    }

    if (filters.colors.length) {
      list = list.filter((p) =>
        p.colors?.some((c) => filters.colors.includes(c))
      );
    }

    if (filters.tags.length) {
      list = list.filter((p) =>
        p.tags?.some((t) => filters.tags.includes(t))
      );
    }

    list = list.filter(
      (p) => p.price >= filters.priceMin && p.priceMax <= filters.priceMax + 5000
    );

    if (filters.inStockOnly) {
      list = list.filter((p) => p.inStock !== false);
    }

    if (filters.sort === "price-asc")
      list.sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc")
      list.sort((a, b) => b.price - a.price);

    return list;
  }, [filters, activeCategory]);

  const toggleArrayFilter = (
    key: "fabrics" | "occasions" | "colors" | "tags",
    value: string
  ) => {
    setFilters((prev) => {
      const arr = prev[key] as string[];
      const next = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      return { ...prev, [key]: next };
    });
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setActiveCategory("all");
  };

  const activeFilterCount =
    filters.fabrics.length +
    filters.occasions.length +
    filters.colors.length +
    filters.tags.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.priceMin > PRICE_RANGE.min || filters.priceMax < PRICE_RANGE.max
      ? 1
      : 0);

  return {
    filters,
    setFilters,
    activeCategory,
    setActiveCategory,
    filteredProducts,
    toggleArrayFilter,
    resetFilters,
    activeFilterCount,
    filterCategories,
    fabricFilters,
    occasionFilters,
    colorFilters,
    PRICE_RANGE,
  };
}

export type { ProductTag };
