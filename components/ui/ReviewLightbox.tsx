"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Review } from "@/types";

type ReviewLightboxProps = {
  review: Review | null;
  onClose: () => void;
};

export function ReviewLightbox({ review, onClose }: ReviewLightboxProps) {
  return (
    <AnimatePresence>
      {review && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Review image preview"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-h-[90vh] max-w-4xl overflow-auto rounded-2xl bg-card p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              aria-label="Close preview"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative min-h-[300px] w-full">
              <Image
                src={review.image}
                alt={`Full review from ${review.author}`}
                width={800}
                height={1400}
                quality={95}
                className="mx-auto h-auto max-h-[80vh] w-auto object-contain"
              />
            </div>
            <div className="border-t border-border p-4">
              <p className="text-sm text-foreground">&ldquo;{review.text}&rdquo;</p>
              <p className="mt-1 text-xs text-muted">— {review.author}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
