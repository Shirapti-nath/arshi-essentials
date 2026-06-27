"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { useProductFilters } from "@/hooks/useProductFilters";
import { FilterPanel, FilterToggleButton } from "@/components/filters/FilterPanel";
import { cn } from "@/lib/utils";
import { PackageSearch } from "lucide-react";

export function ProductSection() {
  const filterState = useProductFilters();
  const {
    filters,
    setFilters,
    activeCategory,
    setActiveCategory,
    filteredProducts,
    resetFilters,
    activeFilterCount,
    filterCategories,
  } = filterState;
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <section id="collections" className="section-padding relative bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,58,58,0.04)_0%,_transparent_70%)]" />

      <div className="container-max relative">
        <SectionHeading
          title="Our Collections"
          subtitle="Explore our handpicked range of sarees and ethnic wear"
        />

        <div className="sticky top-16 z-30 -mx-4 mb-8 border-b border-border/50 bg-background/90 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-2xl sm:border sm:px-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 shadow-sm">
              <Search className="h-4 w-4 shrink-0 text-muted" />
              <input
                type="search"
                placeholder="Search sarees, fabric, kurti..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, search: e.target.value }))
                }
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
                aria-label="Search products"
              />
            </div>
            <div className="flex items-center gap-2">
              <FilterToggleButton
                count={activeFilterCount}
                onClick={() => setFiltersOpen(true)}
              />
              <select
                value={filters.sort}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    sort: e.target.value as typeof f.sort,
                  }))
                }
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted outline-none focus:border-primary"
                aria-label="Sort products"
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {filterCategories.map((cat) => (
            <motion.button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                activeCategory === cat.id
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "border border-border bg-card text-muted hover:border-primary hover:text-primary"
              )}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {(filters.fabrics.length > 0 ||
            filters.occasions.length > 0 ||
            filters.colors.length > 0) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 flex flex-wrap gap-2"
            >
              {[...filters.fabrics, ...filters.occasions, ...filters.colors].map(
                (chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-accent px-3 py-1 text-xs font-medium"
                  >
                    {chip}
                  </span>
                )
              )}
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-primary hover:underline"
              >
                Clear all
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProducts.length === 0 ? (
          <EmptyState
            icon={<PackageSearch className="h-10 w-10" />}
            title="No products found"
            description="Try adjusting your filters or search terms to discover more sarees."
            actionLabel="Reset filters"
            onAction={resetFilters}
          />
        ) : (
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
        )}
      </div>

      <FilterPanel
        filterState={filterState}
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
      />
    </section>
  );
}
