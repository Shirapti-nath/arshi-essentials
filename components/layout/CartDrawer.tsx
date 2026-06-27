"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { formatINR } from "@/lib/format";
import { href } from "@/lib/routes";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, subtotal, updateQuantity, removeItem, getProduct } = useCart();

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
            className="fixed inset-y-0 right-0 z-[81] flex w-full max-w-md flex-col bg-background shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-serif text-xl font-bold text-foreground">
                Your Cart
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 hover:bg-accent"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
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
                <ul className="space-y-4">
                  {items.map((item) => {
                    const product = getProduct(item.productId);
                    if (!product) return null;
                    return (
                      <li
                        key={item.productId}
                        className="flex gap-4 rounded-xl border border-border bg-card p-3"
                      >
                        <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={product.image}
                            alt={product.imageAlt}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-foreground">
                            {product.title}
                          </p>
                          <PriceDisplay
                            price={product.price}
                            mrp={product.mrp}
                            size="sm"
                            className="mt-1"
                          />
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity - 1)
                              }
                              className="rounded-full border border-border p-1 hover:bg-accent"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-[1.5rem] text-center text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity + 1)
                              }
                              className="rounded-full border border-border p-1 hover:bg-accent"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeItem(item.productId)}
                              className="ml-auto text-xs text-muted hover:text-primary"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border px-5 py-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-lg font-bold text-foreground">
                    {formatINR(subtotal)}
                  </span>
                </div>
                <Link
                  href={href("/checkout/")}
                  onClick={onClose}
                  className="block w-full rounded-full bg-primary py-3 text-center text-sm font-semibold text-white hover:bg-primary-light"
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
