"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { products } from "@/data/products";
import { EmptyState } from "@/components/ui/EmptyState";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { href } from "@/lib/routes";
import { site } from "@/data/site";

export default function WishlistPage() {
  const { ids, remove } = useWishlist();
  const { addItem } = useCart();
  const { toast } = useToast();

  const items = ids
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  const shareWishlist = async () => {
    const slugs = items.map((p) => p.slug).join(",");
    const url = `${site.url}/wishlist/?share=${slugs}`;
    try {
      await navigator.clipboard.writeText(url);
      toast("success", "Wishlist link copied");
    } catch {
      toast("error", "Could not copy link");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              My Wishlist
            </h1>
            <p className="mt-1 text-sm text-muted">
              {items.length} item{items.length !== 1 ? "s" : ""} saved
            </p>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              onClick={shareWishlist}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-primary"
            >
              <Share2 className="h-4 w-4" />
              Share Wishlist
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <EmptyState
            icon={<Heart className="h-10 w-10" />}
            title="Your wishlist is empty"
            description="Tap the heart on any saree to save it for later."
            actionLabel="Explore Collections"
            actionHref={href("/#collections")}
          />
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {items.map((product) => (
                <motion.li
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <Link
                    href={href(`/products/${product.slug}/`)}
                    className="relative block aspect-[4/3]"
                  >
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </Link>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="font-serif font-semibold text-foreground">
                          {product.title}
                        </h2>
                        <PriceDisplay
                          price={product.price}
                          priceMax={product.priceMax}
                          size="sm"
                          className="mt-1"
                        />
                      </div>
                      <WishlistButton
                        productId={product.id}
                        productTitle={product.title}
                        size="sm"
                      />
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          addItem(product.id);
                          remove(product.id);
                          toast("success", "Moved to cart", product.title);
                        }}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-light"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        Move to Cart
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}
