"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { products, filterCategories } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <section id="collections" className="section-padding relative bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,58,58,0.04)_0%,_transparent_70%)]" />

      <div className="container-max relative">
        <SectionHeading
          title="Our Collections"
          subtitle="Explore our handpicked range of sarees and ethnic wear"
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {filterCategories.map((cat) => (
            <motion.button
              key={cat.id}
              type="button"
              onClick={() => setActiveFilter(cat.id)}
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
