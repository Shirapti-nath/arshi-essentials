"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { formatINR } from "@/lib/format";
import { href } from "@/lib/routes";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, getProduct } = useCart();

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Shopping Cart
        </h1>
        <p className="mt-2 text-muted">
          {items.length === 0
            ? "No items yet"
            : `${items.length} item${items.length > 1 ? "s" : ""} in your cart`}
        </p>

        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <ShoppingBag className="mb-4 h-16 w-16 text-muted" />
            <p className="text-lg font-medium">Your cart is empty</p>
            <Link
              href={href("/#collections")}
              className="mt-6 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white"
            >
              Browse Collections
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            <ul className="space-y-4 lg:col-span-2">
              {items.map((item) => {
                const product = getProduct(item.productId);
                if (!product) return null;
                return (
                  <li
                    key={item.productId}
                    className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm"
                  >
                    <Link
                      href={href(`/products/${product.slug}/`)}
                      className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl"
                    >
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <Link
                        href={href(`/products/${product.slug}/`)}
                        className="font-serif text-lg font-semibold text-foreground hover:text-primary"
                      >
                        {product.title}
                      </Link>
                      <PriceDisplay
                        price={product.price}
                        mrp={product.mrp}
                        size="sm"
                        className="mt-1"
                      />
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                            className="rounded-full border border-border p-1.5 hover:bg-accent"
                            aria-label="Decrease"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-[2rem] text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            className="rounded-full border border-border p-1.5 hover:bg-accent"
                            aria-label="Increase"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-foreground">
                            {formatINR(product.price * item.quantity)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            className="text-muted hover:text-primary"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="h-fit rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-serif text-xl font-bold">Order Summary</h2>
              <div className="mt-4 space-y-2 border-b border-border pb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Shipping</span>
                  <span className="text-green-600">Calculated at checkout</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{formatINR(subtotal)}</span>
              </div>
              <Link
                href={href("/checkout/")}
                className="mt-6 block w-full rounded-full bg-primary py-3.5 text-center text-sm font-semibold text-white hover:bg-primary-light"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
