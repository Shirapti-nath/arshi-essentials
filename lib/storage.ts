export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota or private mode */
  }
}

export const STORAGE_KEYS = {
  cart: "arshi-cart",
  wishlist: "arshi-wishlist",
  recentlyViewed: "arshi-recently-viewed",
  compare: "arshi-compare",
  browseHistory: "arshi-browse-history",
  cartCoOccurrence: "arshi-cart-cooccurrence",
} as const;
