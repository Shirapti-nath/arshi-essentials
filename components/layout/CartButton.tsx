"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { cn } from "@/lib/utils";

type CartButtonProps = {
  variant?: "light" | "default";
  className?: string;
};

export function CartButton({ variant = "default", className }: CartButtonProps) {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "relative rounded-full p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          variant === "light"
            ? "text-white hover:bg-white/10"
            : "text-foreground hover:bg-accent",
          className
        )}
        aria-label={`Shopping cart, ${itemCount} items`}
      >
        <ShoppingBag className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-foreground">
            {itemCount > 9 ? "9+" : itemCount}
          </span>
        )}
      </button>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
