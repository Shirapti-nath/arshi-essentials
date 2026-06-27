"use client";

import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { RecentlyViewedProvider } from "@/context/RecentlyViewedContext";
import { CompareProvider } from "@/context/CompareContext";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { FlyToCartProvider } from "@/components/cart/FlyToCartProvider";
import { CompareBar } from "@/components/compare/CompareBar";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <WishlistProvider>
        <RecentlyViewedProvider>
          <CompareProvider>
            <CartProvider>
              <FlyToCartProvider>
                {children}
                <ToastContainer />
                <CompareBar />
              </FlyToCartProvider>
            </CartProvider>
          </CompareProvider>
        </RecentlyViewedProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}
