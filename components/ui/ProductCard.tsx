"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { CompareButton } from "@/components/ui/CompareButton";
import { href } from "@/lib/routes";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  index?: number;
};

const badgeLabels = {
  sale: "Sale",
  new: "New",
  bestseller: "Bestseller",
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card shadow-md",
        "transition-shadow duration-500 hover:shadow-2xl hover:shadow-primary/10"
      )}
    >
      <Link href={href(`/products/${product.slug}/`)} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute right-3 top-3 z-10 flex gap-2">
            <WishlistButton
              productId={product.id}
              productTitle={product.title}
              size="sm"
            />
          </div>
          {product.badge && (
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground"
            >
              {badgeLabels[product.badge]}
            </motion.span>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
              {product.category.replace("-", " ")}
            </span>
            <h3 className="font-serif text-xl font-semibold text-white">
              {product.title}
            </h3>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <PriceDisplay price={product.price} priceMax={product.priceMax} size="sm" />
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {product.description}
        </p>
        <div className="mt-3">
          <CompareButton productId={product.id} />
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <AddToCartButton
            productId={product.id}
            productImage={product.image}
            className="flex-1"
          />
          <Link
            href={href(`/products/${product.slug}/`)}
            className="inline-flex items-center justify-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Details
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
