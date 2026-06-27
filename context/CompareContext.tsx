"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";

const MAX_COMPARE = 3;

type CompareContextValue = {
  ids: string[];
  count: number;
  isComparing: (productId: string) => boolean;
  toggle: (productId: string) => "added" | "removed" | "full";
  remove: (productId: string) => void;
  clear: () => void;
};

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client hydration
    setIds(readStorage<string[]>(STORAGE_KEYS.compare, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(STORAGE_KEYS.compare, ids);
  }, [ids, hydrated]);

  const isComparing = useCallback(
    (productId: string) => ids.includes(productId),
    [ids]
  );

  const remove = useCallback((productId: string) => {
    setIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const clear = useCallback(() => setIds([]), []);

  const toggle = useCallback((productId: string) => {
    let result: "added" | "removed" | "full" = "removed";
    setIds((prev) => {
      if (prev.includes(productId)) {
        result = "removed";
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= MAX_COMPARE) {
        result = "full";
        return prev;
      }
      result = "added";
      return [...prev, productId];
    });
    return result;
  }, []);

  const value = useMemo(
    () => ({
      ids,
      count: ids.length,
      isComparing,
      toggle,
      remove,
      clear,
    }),
    [ids, isComparing, toggle, remove, clear]
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}

export { MAX_COMPARE };
