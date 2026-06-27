"use client";

import type { Product } from "@/types";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { reviews } from "@/data/reviews";
import { ReviewCard } from "@/components/ui/ReviewCard";

type ProductStorySectionsProps = {
  product: Product;
};

export function ProductStorySections({ product }: ProductStorySectionsProps) {
  const story = product.story;
  if (!story) return null;

  const productReviews = reviews.filter(
    (r) =>
      r.productTag.toLowerCase().includes(product.category) ||
      r.productTag.toLowerCase().includes(product.title.split(" ")[0].toLowerCase())
  ).slice(0, 3);

  return (
    <div className="mt-20 space-y-20">
      {story.fabric && (
        <AnimatedSection className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-secondary">
              The Fabric
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground">
              Woven for Lasting Beauty
            </h2>
            <p className="mt-4 leading-relaxed text-muted">{story.fabric}</p>
          </div>
          <div className="rounded-2xl border border-border bg-accent/30 p-8 font-serif text-lg italic text-foreground/80">
            &ldquo;Every thread tells a story of tradition and craftsmanship.&rdquo;
          </div>
        </AnimatedSection>
      )}

      {(story.craftsmanship || story.weaving) && (
        <AnimatedSection>
          <Accordion className="rounded-2xl border border-border bg-card px-6">
            {story.craftsmanship && (
              <AccordionItem title="Craftsmanship" defaultOpen>
                {story.craftsmanship}
              </AccordionItem>
            )}
            {story.weaving && (
              <AccordionItem title="Weaving Process">{story.weaving}</AccordionItem>
            )}
            {story.significance && (
              <AccordionItem title="Traditional Significance">
                {story.significance}
              </AccordionItem>
            )}
          </Accordion>
        </AnimatedSection>
      )}

      {story.occasions && story.occasions.length > 0 && (
        <AnimatedSection>
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Perfect For
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {story.occasions.map((o) => (
              <span
                key={o}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
              >
                {o}
              </span>
            ))}
          </div>
        </AnimatedSection>
      )}

      {story.accessories && story.accessories.length > 0 && (
        <AnimatedSection>
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Matching Accessories
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-3">
            {story.accessories.map((a) => (
              <li
                key={a}
                className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted"
              >
                {a}
              </li>
            ))}
          </ul>
        </AnimatedSection>
      )}

      {productReviews.length > 0 && (
        <AnimatedSection>
          <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
            Customer Reviews
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {productReviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </AnimatedSection>
      )}
    </div>
  );
}
