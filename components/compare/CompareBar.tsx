"use client";

import Link from "next/link";
import { X, Scale } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCompare } from "@/context/CompareContext";
import { getProductById } from "@/lib/recommendations";
import { href } from "@/lib/routes";

export function CompareBar() {
  const { ids, count, remove, clear } = useCompare();
  const visible = count > 0;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
          className="fixed inset-x-4 bottom-[5.5rem] z-[70] mx-auto max-w-lg rounded-2xl border border-border bg-card/95 p-4 shadow-2xl backdrop-blur-md md:bottom-6"
          role="region"
          aria-label="Product comparison"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Scale className="h-4 w-4 text-primary" />
              Compare ({count}/3)
            </div>
            <button
              type="button"
              onClick={clear}
              className="text-xs text-muted hover:text-primary"
            >
              Clear all
            </button>
          </div>
          <div className="mb-3 flex flex-wrap gap-2">
            {ids.map((id) => {
              const p = getProductById(id);
              if (!p) return null;
              return (
                <span
                  key={id}
                  className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-medium"
                >
                  {p.title.split(" ")[0]}
                  <button
                    type="button"
                    onClick={() => remove(id)}
                    aria-label={`Remove ${p.title} from compare`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              );
            })}
          </div>
          <Link
            href={href("/compare/")}
            className="block w-full rounded-full bg-primary py-2.5 text-center text-sm font-semibold text-white hover:bg-primary-light"
          >
            View Comparison
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
