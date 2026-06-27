"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import type { Product } from "@/types";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductStorySections } from "@/components/product/ProductStorySections";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { RecentlyViewedSection } from "@/components/product/RecentlyViewedSection";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { CompareButton } from "@/components/ui/CompareButton";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import { contact } from "@/data/contact";
import { cn } from "@/lib/utils";

type ProductDetailViewProps = {
  product: Product;
};

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const { trackView } = useRecentlyViewed();
  const [stickyVisible, setStickyVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackView(product.slug);
  }, [product.slug, trackView]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const whatsappUrl = `${contact.whatsapp}?text=${encodeURIComponent(
    `Hi, I'm interested in ${product.title} (from ₹${product.price}). Please share available designs.`
  )}`;

  return (
    <>
      <div ref={heroRef} className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} badge={product.badge} />

        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-secondary">
                {product.category.replace("-", " ")}
              </p>
              <h1 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                {product.title}
              </h1>
            </div>
            <WishlistButton
              productId={product.id}
              productTitle={product.title}
            />
          </div>

          <PriceDisplay
            price={product.price}
            priceMax={product.priceMax}
            size="lg"
            className="mt-4"
          />

          {product.rating && (
            <p className="mt-2 text-sm text-muted">
              ★ {product.rating} ({product.reviewCount} reviews)
            </p>
          )}

          <p className="mt-6 leading-relaxed text-muted">{product.description}</p>

          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl border border-border bg-card p-4 text-sm">
            {product.fabric && (
              <>
                <dt className="text-muted">Fabric</dt>
                <dd className="font-medium">{product.fabric}</dd>
              </>
            )}
            {product.occasion && (
              <>
                <dt className="text-muted">Occasion</dt>
                <dd className="font-medium">{product.occasion}</dd>
              </>
            )}
            {product.borderType && (
              <>
                <dt className="text-muted">Border</dt>
                <dd className="font-medium">{product.borderType}</dd>
              </>
            )}
            {product.length && (
              <>
                <dt className="text-muted">Length</dt>
                <dd className="font-medium">{product.length}</dd>
              </>
            )}
            {product.blouseIncluded !== undefined && (
              <>
                <dt className="text-muted">Blouse</dt>
                <dd className="font-medium">
                  {product.blouseIncluded ? "Included" : "Not included"}
                </dd>
              </>
            )}
            {product.colors && (
              <>
                <dt className="text-muted">Colors</dt>
                <dd className="font-medium">{product.colors.join(", ")}</dd>
              </>
            )}
          </dl>

          <div className="mt-6 flex flex-wrap gap-2">
            <CompareButton productId={product.id} size="md" />
          </div>

          <AddToCartButton
            productId={product.id}
            productImage={product.image}
            showQuantity
            className="mt-8"
          />

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#25D366] py-3 text-sm font-semibold text-[#25D366] transition-colors hover:bg-[#25D366]/5 sm:w-auto sm:px-8"
          >
            <MessageCircle className="h-4 w-4" />
            Ask on WhatsApp
          </a>
        </div>
      </div>

      <ProductStorySections product={product} />
      <RelatedProducts product={product} />
      <RecentlyViewedSection excludeSlug={product.slug} />

      <div
        className={cn(
          "fixed inset-x-0 bottom-[4.5rem] z-[60] translate-y-full border-t border-border bg-background/95 p-4 backdrop-blur-md transition-transform duration-300 md:bottom-auto md:top-[4.5rem] md:translate-y-0 md:border-b md:opacity-0",
          stickyVisible && "translate-y-0 md:opacity-100 md:shadow-md"
        )}
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="container-max flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate font-serif font-semibold text-foreground">
              {product.title}
            </p>
            <PriceDisplay
              price={product.price}
              priceMax={product.priceMax}
              size="sm"
            />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <WishlistButton productId={product.id} size="sm" />
            <AddToCartButton
              productId={product.id}
              productImage={product.image}
              className="!flex-row"
            />
          </div>
        </div>
      </div>
    </>
  );
}
