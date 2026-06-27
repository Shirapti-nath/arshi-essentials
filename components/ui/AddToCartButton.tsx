"use client";

import { useRef, useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useFlyToCart } from "@/components/cart/FlyToCartProvider";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";
import { products } from "@/data/products";
import { RippleButton } from "@/components/ui/RippleButton";
import { cn } from "@/lib/utils";

type AddToCartButtonProps = {
  productId: string;
  productImage?: string;
  className?: string;
  variant?: "primary" | "outline";
  showQuantity?: boolean;
};

function recordCoOccurrence(productId: string) {
  const cart = readStorage<{ productId: string }[]>(STORAGE_KEYS.cart, []);
  const co = readStorage<Record<string, number>>(
    STORAGE_KEYS.cartCoOccurrence,
    {}
  );
  for (const item of cart) {
    if (item.productId === productId) continue;
    const key = [productId, item.productId].sort().join(":");
    co[key] = (co[key] ?? 0) + 1;
  }
  writeStorage(STORAGE_KEYS.cartCoOccurrence, co);
}

export function AddToCartButton({
  productId,
  productImage,
  className,
  variant = "primary",
  showQuantity = false,
}: AddToCartButtonProps) {
  const { addItem, isInCart } = useCart();
  const { toast } = useToast();
  const { flyToCart } = useFlyToCart();
  const btnRef = useRef<HTMLDivElement>(null);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const product = products.find((p) => p.id === productId);
  const image = productImage ?? product?.image ?? "";

  const handleAdd = () => {
    addItem(productId, showQuantity ? qty : 1);
    recordCoOccurrence(productId);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);

    toast(
      "success",
      "Added to cart",
      product?.title ?? "Item added successfully"
    );

    if (btnRef.current && image) {
      flyToCart({ image, fromRect: btnRef.current.getBoundingClientRect() });
    }
  };

  const base =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary-light"
      : "border border-primary text-primary hover:bg-primary/5";

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {showQuantity && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted">Quantity</span>
          <div className="flex items-center rounded-full border border-border">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-3 py-1.5 text-lg font-medium hover:bg-accent"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <motion.span
              key={qty}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="min-w-[2rem] text-center text-sm font-semibold"
            >
              {qty}
            </motion.span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="px-3 py-1.5 text-lg font-medium hover:bg-accent"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      )}
      <div ref={btnRef}>
        <RippleButton
          onClick={handleAdd}
          className={cn(
            "inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all",
            base,
            justAdded && "bg-green-600 text-white hover:bg-green-600"
          )}
          ariaLabel={isInCart(productId) ? "Add more to cart" : "Add to cart"}
        >
          {justAdded ? (
            <>
              <Check className="h-4 w-4" />
              Added!
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              {isInCart(productId) ? "Add More" : "Add to Cart"}
            </>
          )}
        </RippleButton>
      </div>
    </div>
  );
}
