"use client";

import Image from "next/image";
import { MessageCircle, Star } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import type { Review } from "@/types";
import { cn } from "@/lib/utils";

type ReviewCardProps = {
  review: Review;
  onClick?: () => void;
  className?: string;
};

export function ReviewCard({ review, onClick, className }: ReviewCardProps) {
  const SourceIcon =
    review.source === "instagram" ? InstagramIcon : MessageCircle;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-md",
        "transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className
      )}
    >
      {/* Uniform image frame — fixed height, cropped consistently */}
      <div className="relative h-56 w-full shrink-0 overflow-hidden bg-gradient-to-br from-accent to-accent/60">
        <div className="absolute inset-0 bg-primary/5" />
        <Image
          src={review.image}
          alt={`Customer ${review.source} review for ${review.productTag}`}
          fill
          quality={90}
          sizes="(max-width: 768px) 85vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ objectPosition: review.imagePosition ?? "center center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white backdrop-blur-sm">
          <SourceIcon className="h-3 w-3" />
          {review.source}
        </span>
      </div>

      {/* Uniform content block */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {review.productTag}
          </span>
          <div className="flex gap-0.5">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star
                key={i}
                className="h-3.5 w-3.5 fill-secondary text-secondary"
              />
            ))}
          </div>
        </div>
        <p className="line-clamp-3 min-h-[3.75rem] flex-1 text-sm leading-relaxed text-foreground">
          &ldquo;{review.text}&rdquo;
        </p>
        <p className="mt-auto border-t border-border pt-3 text-sm font-medium text-muted">
          — {review.author}
        </p>
      </div>
    </button>
  );
}
