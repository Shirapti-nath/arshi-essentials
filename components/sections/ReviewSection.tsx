"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { ReviewLightbox } from "@/components/ui/ReviewLightbox";
import { reviews, textReviews } from "@/data/reviews";
import type { Review } from "@/types";

/** CSS-only horizontal strip — no JS scroll calls (safe on Android). */
function MobileReviewStrip({
  onSelect,
}: {
  onSelect: (review: Review) => void;
}) {
  return (
    <div
      className="flex gap-4 overflow-x-auto overscroll-x-contain overscroll-y-none pb-2 snap-x snap-mandatory scrollbar-hide [overflow-anchor:none] md:hidden"
      aria-label="Customer reviews carousel — swipe sideways"
    >
      {reviews.map((review) => (
        <div key={review.id} className="w-[78vw] shrink-0 snap-start">
          <ReviewCard
            review={review}
            nativeButton={false}
            onClick={() => onSelect(review)}
            className="min-h-[420px]"
          />
        </div>
      ))}
    </div>
  );
}

export function ReviewSection() {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [mobileCarouselReady, setMobileCarouselReady] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Mount mobile carousel only when user scrolls near reviews — keeps it out of initial DOM
  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMobileCarouselReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px", threshold: 0 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="section-padding relative overflow-hidden bg-background [overflow-anchor:none]"
    >
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="container-max relative">
        <SectionHeading
          title="What Our Customers Say"
          subtitle="Real reviews from our happy customers on WhatsApp and Instagram"
        />

        {/* Desktop grid */}
        <div className="hidden auto-rows-fr gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
              className="flex"
            >
              <ReviewCard
                review={review}
                onClick={() => setSelectedReview(review)}
                className="min-h-[420px]"
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile: lazy-mounted, swipe-only carousel — no programmatic scroll */}
        {mobileCarouselReady ? (
          <MobileReviewStrip onSelect={setSelectedReview} />
        ) : (
          <p className="text-center text-sm text-muted md:hidden">
            Scroll down to browse customer review photos
          </p>
        )}

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {textReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="mt-3 text-sm font-medium text-muted">
                — {review.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <ReviewLightbox
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
      />
    </section>
  );
}
