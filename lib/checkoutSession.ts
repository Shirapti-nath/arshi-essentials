import type { CheckoutDetails } from "@/types";

export const CHECKOUT_DETAILS_KEY = "arshi-checkout-details";
export const CHECKOUT_ORDER_KEY = "arshi-order-id";

export function saveCheckoutSession(
  details: CheckoutDetails,
  orderId: string
): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CHECKOUT_DETAILS_KEY, JSON.stringify(details));
  sessionStorage.setItem(CHECKOUT_ORDER_KEY, orderId);
}

export function loadCheckoutDetails(): CheckoutDetails | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CHECKOUT_DETAILS_KEY);
    return raw ? (JSON.parse(raw) as CheckoutDetails) : null;
  } catch {
    return null;
  }
}

export function loadCheckoutOrderId(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(CHECKOUT_ORDER_KEY);
}

export function clearCheckoutSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(CHECKOUT_DETAILS_KEY);
  sessionStorage.removeItem(CHECKOUT_ORDER_KEY);
}
