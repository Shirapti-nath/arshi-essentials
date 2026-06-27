"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

type AddToCartButtonProps = {
  productId: string;
  className?: string;
  variant?: "primary" | "outline";
  showQuantity?: boolean;
};

export function AddToCartButton({
  productId,
  className,
  variant = "primary",
  showQuantity = false,
}: AddToCartButtonProps) {
  const { addItem, isInCart } = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    addItem(productId, showQuantity ? qty : 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
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
            <span className="min-w-[2rem] text-center text-sm font-semibold">
              {qty}
            </span>
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
      <button
        type="button"
        onClick={handleAdd}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all",
          base,
          added && "bg-green-600 text-white hover:bg-green-600"
        )}
      >
        {added ? (
          <>
            <Check className="h-4 w-4" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingBag className="h-4 w-4" />
            {isInCart(productId) ? "Add More" : "Add to Cart"}
          </>
        )}
      </button>
    </div>
  );
}
