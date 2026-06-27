"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { formatINR, formatPriceRange } from "@/lib/format";
import { href } from "@/lib/routes";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const {
    items,
    itemCount,
    subtotal,
    subtotalMax,
    updateQuantity,
    removeItem,
    getProduct,
  } = useCart();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const totalLabel =
    subtotalMax > subtotal
      ? formatPriceRange(subtotal, subtotalMax)
      : formatINR(subtotal);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-[81] flex h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-background shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="shrink-0 border-b border-border bg-background px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-xl font-bold text-foreground">
                    Your Cart
                  </h2>
                  {itemCount > 0 && (
                    <p className="mt-0.5 text-sm text-muted">
                      {itemCount} item{itemCount !== 1 ? "s" : ""} added
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-2 hover:bg-accent"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Scrollable items */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <ShoppingBag className="mb-4 h-12 w-12 text-muted" />
                  <p className="font-medium text-foreground">Your cart is empty</p>
                  <p className="mt-1 text-sm text-muted">
                    Browse our collections and add items
                  </p>
                  <Link
                    href={href("/#collections")}
                    onClick={onClose}
                    className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white"
                  >
                    Shop Collections
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => {
                    const product = getProduct(item.productId);
                    if (!product) return null;
                    const lineMin = product.price * item.quantity;
                    const lineMax = product.priceMax * item.quantity;
                    const lineTotal =
                      lineMax > lineMin
                        ? formatPriceRange(lineMin, lineMax)
                        : formatINR(lineMin);

                    return (
                      <li
                        key={item.productId}
                        className="rounded-xl border border-border bg-card p-3 shadow-sm"
                      >
                        <div className="flex gap-3">
                          <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-accent">
                            <Image
                              src={product.image}
                              alt={product.imageAlt}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
                              {product.title}
                            </p>
                            <PriceDisplay
                              price={product.price}
                              priceMax={product.priceMax}
                              size="sm"
                              className="mt-1"
                            />
                            <p className="mt-1 text-xs font-medium text-muted">
                              Qty: {item.quantity} · Line total:{" "}
                              <span className="text-foreground">{lineTotal}</span>
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity - 1)
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-accent"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-[1.5rem] text-center text-sm font-bold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity + 1)
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-accent"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            className="text-xs font-medium text-primary hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer totals */}
            {items.length > 0 && (
              <div className="shrink-0 border-t border-border bg-background px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <div className="mb-1 flex items-center justify-between text-sm text-muted">
                  <span>
                    {itemCount} item{itemCount !== 1 ? "s" : ""} total
                  </span>
                  <span>{items.length} collection{items.length !== 1 ? "s" : ""}</span>
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-medium text-foreground">Estimated total</span>
                  <span className="text-lg font-bold text-primary">{totalLabel}</span>
                </div>
                <p className="mb-4 text-xs text-muted">
                  Final price depends on design selected. Confirmed on WhatsApp.
                </p>
                <Link
                  href={href("/checkout/")}
                  onClick={onClose}
                  className="block w-full rounded-full bg-primary py-3.5 text-center text-sm font-semibold text-white hover:bg-primary-light"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href={href("/cart/")}
                  onClick={onClose}
                  className="mt-2 block w-full py-2 text-center text-sm font-medium text-primary hover:underline"
                >
                  View full cart
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
