"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { useFlyToCart } from "@/components/cart/FlyToCartProvider";
import { cn } from "@/lib/utils";

type CartButtonProps = {
  variant?: "light" | "default";
  className?: string;
};

export function CartButton({ variant = "default", className }: CartButtonProps) {
  const { itemCount } = useCart();
  const { registerCartAnchor } = useFlyToCart();
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const prevCount = useRef(itemCount);

  const scale = useSpring(1, { stiffness: 500, damping: 15 });
  const badgeScale = useTransform(scale, (s) => s);

  useEffect(() => {
    registerCartAnchor(btnRef.current);
    return () => registerCartAnchor(null);
  }, [registerCartAnchor]);

  useEffect(() => {
    if (itemCount > prevCount.current) {
      scale.set(1.25);
      window.setTimeout(() => scale.set(1), 300);
    }
    prevCount.current = itemCount;
  }, [itemCount, scale]);

  return (
    <>
      <motion.button
        ref={btnRef}
        type="button"
        onClick={() => setOpen(true)}
        style={{ scale: badgeScale }}
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
          <motion.span
            key={itemCount}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-foreground"
          >
            {itemCount > 9 ? "9+" : itemCount}
          </motion.span>
        )}
      </motion.button>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
