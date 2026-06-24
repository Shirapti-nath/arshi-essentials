"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { ReviewLightbox } from "@/components/ui/ReviewLightbox";
import { reviews, textReviews } from "@/data/reviews";
import type { Review } from "@/types";

export function ReviewSection() {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const card = carouselRef.current.children[activeIndex] as HTMLElement;
      card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeIndex]);

  return (
    <section id="reviews" className="section-padding relative overflow-hidden bg-background">
      {/* Background accent */}
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="container-max relative">
        <SectionHeading
          title="What Our Customers Say"
          subtitle="Real reviews from our happy customers on WhatsApp and Instagram"
        />

        {/* Desktop — uniform height grid */}
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

        {/* Mobile carousel — same card size */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:hidden"
        >
          {reviews.map((review) => (
            <div key={review.id} className="w-[78vw] shrink-0 snap-center">
              <ReviewCard
                review={review}
                onClick={() => setSelectedReview(review)}
                className="min-h-[420px]"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-2 md:hidden">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-primary" : "w-2 bg-border"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

        {/* Text reviews */}
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
