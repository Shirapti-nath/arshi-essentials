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

const MAX_RECENT = 8;

type RecentlyViewedContextValue = {
  slugs: string[];
  trackView: (slug: string) => void;
};

const RecentlyViewedContext =
  createContext<RecentlyViewedContextValue | null>(null);

export function RecentlyViewedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client hydration
    setSlugs(readStorage<string[]>(STORAGE_KEYS.recentlyViewed, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(STORAGE_KEYS.recentlyViewed, slugs);
  }, [slugs, hydrated]);

  const trackView = useCallback((slug: string) => {
    setSlugs((prev) => {
      const next = [slug, ...prev.filter((s) => s !== slug)];
      return next.slice(0, MAX_RECENT);
    });
    const history = readStorage<Record<string, number>>(
      STORAGE_KEYS.browseHistory,
      {}
    );
    history[slug] = Date.now();
    writeStorage(STORAGE_KEYS.browseHistory, history);
  }, []);

  const value = useMemo(() => ({ slugs, trackView }), [slugs, trackView]);

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx)
    throw new Error(
      "useRecentlyViewed must be used within RecentlyViewedProvider"
    );
  return ctx;
}
