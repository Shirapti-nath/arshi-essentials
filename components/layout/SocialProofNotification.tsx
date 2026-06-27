"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
import { products } from "@/data/products";
import {
  socialProofMessages,
  getProductViewMessage,
  type SocialProofMessage,
} from "@/data/socialProof";
import { getBasePath } from "@/lib/assetPath";

function getProductFromPath(pathname: string) {
  const base = getBasePath();
  const normalized = pathname.replace(base, "").replace(/^\/+/, "");
  if (!normalized.startsWith("products/")) return null;
  const slug = normalized.replace(/^products\//, "").replace(/\/$/, "");
  return products.find((p) => p.slug === slug) ?? null;
}

function SocialProofNotificationInner({
  notifications,
}: {
  notifications: SocialProofMessage[];
}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = window.setTimeout(() => setVisible(true), 2500);
    return () => window.clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible || notifications.length <= 1) return;

    const interval = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % notifications.length);
        setVisible(true);
      }, 400);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [visible, notifications.length]);

  const current = notifications[index];
  if (!current) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-20 left-3 z-30 max-w-[min(20rem,calc(100vw-1.5rem))] md:bottom-6 md:left-5"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: -24, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -16, y: 4 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex items-start gap-3 rounded-xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur-md"
          >
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              {current.type === "views" ? (
                <Eye className="h-4 w-4" aria-hidden />
              ) : (
                <ShoppingBag className="h-4 w-4" aria-hidden />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-secondary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Live update
              </p>
              <p className="mt-1 text-xs leading-snug text-foreground">
                {current.message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SocialProofNotification() {
  const pathname = usePathname();
  const product = useMemo(() => getProductFromPath(pathname), [pathname]);

  const notifications = useMemo(() => {
    const list = [...socialProofMessages];
    if (product?.title) {
      list.push(getProductViewMessage(product.title));
    }
    return list;
  }, [product?.title]);

  return (
    <SocialProofNotificationInner
      key={pathname}
      notifications={notifications}
    />
  );
}
