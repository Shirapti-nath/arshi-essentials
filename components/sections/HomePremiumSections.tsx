"use client";

import Link from "next/link";
import { products } from "@/data/products";
import {
  featuredSlugs,
  weddingSlugs,
  festivalSlugs,
  shopByFabric,
  shopByOccasion,
} from "@/data/homepage";
import {
  getBestSellers,
  getNewArrivals,
  getTrending,
} from "@/lib/recommendations";
import { ProductRow } from "@/components/product/ProductRow";
import { RecentlyViewedSection } from "@/components/product/RecentlyViewedSection";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reviews } from "@/data/reviews";
import Image from "next/image";
import { href } from "@/lib/routes";

function bySlugs(slugs: string[]) {
  return slugs
    .map((s) => products.find((p) => p.slug === s))
    .filter(Boolean) as typeof products;
}

export function HomePremiumSections() {
  const featured = bySlugs(featuredSlugs);
  const wedding = bySlugs(weddingSlugs);
  const festival = bySlugs(festivalSlugs);

  return (
    <>
      <ProductRow
        title="Featured Sarees"
        subtitle="Handpicked favourites from our collection"
        products={featured}
      />
      <ProductRow
        title="Trending Now"
        subtitle="Most loved by our customers this season"
        products={getTrending().length ? getTrending() : getBestSellers()}
      />
      <ProductRow
        title="Wedding Collection"
        subtitle="Elegant sarees for your special day"
        products={wedding}
      />
      <ProductRow
        title="Festival Collection"
        subtitle="Celebrate in timeless ethnic style"
        products={festival}
      />
      <ProductRow
        title="Best Sellers"
        subtitle="Customer favourites across India"
        products={getBestSellers()}
      />
      <ProductRow
        title="New Arrivals"
        subtitle="Fresh additions to our catalogue"
        products={getNewArrivals()}
      />

      <AnimatedSection className="section-padding bg-accent/20">
        <div className="container-max">
          <SectionHeading
            title="Shop by Fabric"
            subtitle="Find the perfect material for every occasion"
          />
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {shopByFabric.map((f) => (
              <Link
                key={f.label}
                href={href("/#collections")}
                className="rounded-full border border-border bg-card px-6 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                {f.label}
              </Link>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding">
        <div className="container-max">
          <SectionHeading
            title="Shop by Occasion"
            subtitle="Curated for every moment"
          />
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {shopByOccasion.map((o) => (
              <Link
                key={o.label}
                href={href("/#collections")}
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
              >
                {o.label}
              </Link>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="section-padding bg-background">
        <div className="container-max">
          <SectionHeading
            title="From Our Community"
            subtitle="Real moments shared on Instagram & WhatsApp"
          />
          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 md:gap-3">
            {reviews.slice(0, 8).map((r) => (
              <div
                key={r.id}
                className="relative aspect-square overflow-hidden rounded-xl"
              >
                <Image
                  src={r.image}
                  alt={r.text}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <RecentlyViewedSection className="section-padding" />
    </>
  );
}
