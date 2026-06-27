"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";

type WishlistButtonProps = {
  productId: string;
  productTitle?: string;
  className?: string;
  size?: "sm" | "md";
};

export function WishlistButton({
  productId,
  productTitle,
  className,
  size = "md",
}: WishlistButtonProps) {
  const { isWishlisted, toggle } = useWishlist();
  const { toast } = useToast();
  const active = isWishlisted(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggle(productId);
    if (added) {
      toast("success", "Added to wishlist", productTitle);
    } else {
      toast("info", "Removed from wishlist", productTitle);
    }
  };

  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const btnSize = size === "sm" ? "h-9 w-9" : "h-11 w-11";

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.85 }}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      className={cn(
        "flex items-center justify-center rounded-full border border-border bg-card/90 backdrop-blur-sm transition-colors hover:border-primary hover:text-primary",
        btnSize,
        active && "border-primary bg-primary/10 text-primary",
        className
      )}
    >
      <motion.span
        animate={active ? { scale: [1, 1.35, 1] } : { scale: 1 }}
        transition={{ duration: 0.35 }}
      >
        <Heart
          className={cn(iconSize, active && "fill-primary")}
          aria-hidden
        />
      </motion.span>
    </motion.button>
  );
}
