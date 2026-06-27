"use client";

import Link from "next/link";
import { Home, ShoppingBag, Grid3X3, Heart, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { href } from "@/lib/routes";
import { contact } from "@/data/contact";

export function MobileBottomNav() {
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-lg md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-5 pb-[env(safe-area-inset-bottom)]">
        <Link
          href={href("/")}
          className="flex flex-col items-center gap-1 py-3 text-xs font-medium text-muted hover:text-primary"
        >
          <Home className="h-5 w-5" />
          Home
        </Link>
        <Link
          href={href("/#collections")}
          className="flex flex-col items-center gap-1 py-3 text-xs font-medium text-muted hover:text-primary"
        >
          <Grid3X3 className="h-5 w-5" />
          Shop
        </Link>
        <Link
          href={href("/wishlist/")}
          className="relative flex flex-col items-center gap-1 py-3 text-xs font-medium text-muted hover:text-primary"
        >
          <Heart className="h-5 w-5" />
          Wishlist
          {wishlistCount > 0 && (
            <span className="absolute right-[calc(50%-18px)] top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[9px] font-bold text-foreground">
              {wishlistCount > 9 ? "9+" : wishlistCount}
            </span>
          )}
        </Link>
        <Link
          href={href("/cart/")}
          className="relative flex flex-col items-center gap-1 py-3 text-xs font-medium text-muted hover:text-primary"
        >
          <ShoppingBag className="h-5 w-5" />
          Cart
          {itemCount > 0 && (
            <span className="absolute right-[calc(50%-18px)] top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[9px] font-bold text-foreground">
              {itemCount > 9 ? "9+" : itemCount}
            </span>
          )}
        </Link>
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-3 text-xs font-medium text-muted hover:text-[#25D366]"
        >
          <MessageCircle className="h-5 w-5" />
          Chat
        </a>
      </div>
    </nav>
  );
}
