"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { products, filterCategories } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">(
    "default"
  );

  const filteredProducts = useMemo(() => {
    let list =
      activeFilter === "all"
        ? products
        : products.filter((p) => p.category === activeFilter);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric?.toLowerCase().includes(q)
      );
    }

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [activeFilter, search, sort]);

  return (
    <section id="collections" className="section-padding relative bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,58,58,0.04)_0%,_transparent_70%)]" />

      <div className="container-max relative">
        <SectionHeading
          title="Our Collections"
          subtitle="Explore our handpicked range of sarees and ethnic wear"
        />

        <div className="mx-auto mb-8 flex max-w-md items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 shadow-sm">
          <Search className="h-4 w-4 shrink-0 text-muted" />
          <input
            type="search"
            placeholder="Search sarees, fabric, kurti..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            aria-label="Search products"
          />
        </div>

        <div className="mb-6 flex justify-center">
          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value as "default" | "price-asc" | "price-desc")
            }
            className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted outline-none focus:border-primary"
            aria-label="Sort products"
          >
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {filterCategories.map((cat) => (
            <motion.button
              key={cat.id}
              type="button"
              onClick={() => setActiveFilter(cat.id)}
              aria-pressed={activeFilter === cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                activeFilter === cat.id
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "border border-border bg-card text-muted hover:border-primary hover:text-primary"
              )}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
