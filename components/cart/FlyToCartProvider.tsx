"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type FlyPayload = {
  image: string;
  fromRect: DOMRect;
};

type FlyToCartContextValue = {
  registerCartAnchor: (el: HTMLElement | null) => void;
  flyToCart: (payload: FlyPayload) => void;
};

const FlyToCartContext = createContext<FlyToCartContextValue | null>(null);

export function FlyToCartProvider({ children }: { children: ReactNode }) {
  const cartAnchorRef = useRef<HTMLElement | null>(null);
  const [flying, setFlying] = useState<
    (FlyPayload & { id: number; toRect: DOMRect }) | null
  >(null);

  const registerCartAnchor = useCallback((el: HTMLElement | null) => {
    cartAnchorRef.current = el;
  }, []);

  const flyToCart = useCallback((payload: FlyPayload) => {
    const toRect = cartAnchorRef.current?.getBoundingClientRect();
    if (!toRect) return;
    setFlying({ ...payload, id: Date.now(), toRect });
    window.setTimeout(() => setFlying(null), 700);
  }, []);

  return (
    <FlyToCartContext.Provider value={{ registerCartAnchor, flyToCart }}>
      {children}
      <AnimatePresence>
        {flying && (
          <motion.div
            key={flying.id}
            initial={{
              position: "fixed",
              left: flying.fromRect.left + flying.fromRect.width / 2 - 24,
              top: flying.fromRect.top + flying.fromRect.height / 2 - 24,
              width: 48,
              height: 48,
              zIndex: 200,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              left: flying.toRect.left + flying.toRect.width / 2 - 16,
              top: flying.toRect.top + flying.toRect.height / 2 - 16,
              width: 32,
              height: 32,
              opacity: 0.6,
              scale: 0.5,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none overflow-hidden rounded-full border-2 border-secondary shadow-lg"
          >
            <Image
              src={flying.image}
              alt=""
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </FlyToCartContext.Provider>
  );
}

export function useFlyToCart() {
  const ctx = useContext(FlyToCartContext);
  if (!ctx)
    throw new Error("useFlyToCart must be used within FlyToCartProvider");
  return ctx;
}
