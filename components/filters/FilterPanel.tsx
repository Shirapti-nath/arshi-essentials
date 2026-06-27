"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { useProductFilters } from "@/hooks/useProductFilters";

type FilterPanelProps = {
  filterState: ReturnType<typeof useProductFilters>;
  open: boolean;
  onClose: () => void;
};

export function FilterPanel({ filterState, open, onClose }: FilterPanelProps) {
  const {
    filters,
    setFilters,
    toggleArrayFilter,
    resetFilters,
    fabricFilters,
    occasionFilters,
    colorFilters,
    PRICE_RANGE,
  } = filterState;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-[76] flex w-full max-w-sm flex-col bg-background shadow-2xl lg:static lg:z-auto lg:max-w-none lg:shadow-none"
            role="dialog"
            aria-label="Product filters"
          >
            <div className="flex items-center justify-between border-b border-border p-4 lg:hidden">
              <div className="flex items-center gap-2 font-semibold">
                <SlidersHorizontal className="h-5 w-5" />
                Filters
              </div>
              <button type="button" onClick={onClose} aria-label="Close filters">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 lg:p-0">
              <FilterGroup title="Price range">
                <div className="space-y-2">
                  <input
                    type="range"
                    min={PRICE_RANGE.min}
                    max={PRICE_RANGE.max}
                    step={100}
                    value={filters.priceMax}
                    onChange={(e) =>
                      setFilters((f) => ({
                        ...f,
                        priceMax: Number(e.target.value),
                      }))
                    }
                    className="w-full accent-primary"
                    aria-label="Maximum price"
                  />
                  <p className="text-xs text-muted">
                    Up to ₹{filters.priceMax.toLocaleString("en-IN")}
                  </p>
                </div>
              </FilterGroup>

              <FilterGroup title="Fabric">
                <ChipGroup
                  options={fabricFilters}
                  selected={filters.fabrics}
                  onToggle={(v) => toggleArrayFilter("fabrics", v)}
                />
              </FilterGroup>

              <FilterGroup title="Occasion">
                <ChipGroup
                  options={occasionFilters}
                  selected={filters.occasions}
                  onToggle={(v) => toggleArrayFilter("occasions", v)}
                />
              </FilterGroup>

              <FilterGroup title="Color">
                <ChipGroup
                  options={colorFilters}
                  selected={filters.colors}
                  onToggle={(v) => toggleArrayFilter("colors", v)}
                />
              </FilterGroup>

              <label className="mt-4 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, inStockOnly: e.target.checked }))
                  }
                  className="accent-primary"
                />
                In stock only
              </label>
            </div>

            <div className="border-t border-border p-4 lg:mt-4 lg:border-0 lg:p-0">
              <button
                type="button"
                onClick={resetFilters}
                className="w-full rounded-full border border-border py-2.5 text-sm font-medium hover:border-primary hover:text-primary"
              >
                Reset filters
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h3 className="mb-2 text-sm font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
}

function ChipGroup({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <motion.button
          key={opt}
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={() => onToggle(opt)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            selected.includes(opt)
              ? "border-primary bg-primary text-white"
              : "border-border text-muted hover:border-primary"
          )}
        >
          {opt}
        </motion.button>
      ))}
    </div>
  );
}

export function FilterToggleButton({
  count,
  onClick,
}: {
  count: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary"
    >
      <SlidersHorizontal className="h-4 w-4" />
      Filters
      {count > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </motion.button>
  );
}
