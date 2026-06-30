"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PaymentSection } from "@/components/checkout/PaymentSection";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { formatINR, formatPriceRange, generateOrderId } from "@/lib/format";
import { appPath } from "@/lib/routes";
import {
  clearCheckoutSession,
  loadCheckoutDetails,
  loadCheckoutOrderId,
} from "@/lib/checkoutSession";
import { isCheckoutDetailsValid } from "@/lib/validation";
import type { CheckoutDetails } from "@/types";

export default function PaymentPage() {
  const router = useRouter();
  const { items, itemCount, subtotal, subtotalMax, getProduct, clearCart, hydrated } =
    useCart();
  const [details, setDetails] = useState<CheckoutDetails | null>(null);
  const [orderId, setOrderId] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hydrated) return;

    const savedDetails = loadCheckoutDetails();
    const savedOrderId = loadCheckoutOrderId() ?? generateOrderId();

    setOrderId(savedOrderId);
    setDetails(savedDetails);
    setReady(true);
  }, [hydrated]);

  const lineItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = getProduct(item.productId);
          if (!product) return null;
          return {
            title: product.title,
            quantity: item.quantity,
            price: product.price,
            priceMax: product.priceMax,
          };
        })
        .filter(Boolean) as {
        title: string;
        quantity: number;
        price: number;
        priceMax: number;
      }[],
    [items, getProduct]
  );

  if (!hydrated || !ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background pt-24">
        <p className="text-muted">Loading payment…</p>
      </div>
    );
  }

  if (items.length === 0 && !confirmed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-24">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Your cart is empty
          </h1>
          <p className="mt-3 text-muted">Add items before paying.</p>
          <Link
            href={appPath("/#collections")}
            className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white"
          >
            Browse Collections
          </Link>
        </div>
      </div>
    );
  }

  if (!details || !isCheckoutDetailsValid(details)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-24">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Delivery details required
          </h1>
          <p className="mt-3 text-muted">
            Fill your name, phone, and address at checkout before payment.
          </p>
          <Link
            href={appPath("/checkout/")}
            className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white"
          >
            Go to Checkout
          </Link>
        </div>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background px-4 pt-24 pb-24">
        <div className="container-max">
          <CheckoutSteps current="done" />
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
              ✓
            </div>
            <h1 className="font-serif text-2xl font-bold text-foreground">
              Order Sent!
            </h1>
            <p className="mt-3 text-muted">
              Your order <strong className="font-mono">{orderId}</strong> has been
              sent on WhatsApp. We will confirm and intimate you shortly.
            </p>
            <Link
              href={appPath("/")}
              className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <CheckoutSteps current="payment" />

        <button
          type="button"
          onClick={() => router.push(appPath("/checkout/"))}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Edit delivery details
        </button>

        <h1 className="font-serif text-3xl font-bold text-foreground">
          Pay with PhonePe UPI
        </h1>
        <p className="mt-2 text-muted">
          Scan the QR code below, then confirm your order on WhatsApp.
        </p>
        <p className="mt-1 font-mono text-sm text-primary">Order ID: {orderId}</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <PaymentSection
            total={subtotal}
            totalMax={subtotalMax}
            orderId={orderId}
            items={lineItems}
            details={details}
            detailsValid
            onConfirm={() => {
              clearCart();
              clearCheckoutSession();
              setConfirmed(true);
            }}
          />

          <div className="h-fit rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-serif text-xl font-bold">Order Summary</h2>
            <p className="mt-1 text-sm text-muted">
              {itemCount} item{itemCount !== 1 ? "s" : ""}
            </p>
            <ul className="mt-4 space-y-3 border-b border-border pb-4">
              {lineItems.map((item) => (
                <li key={item.title} className="flex justify-between text-sm">
                  <span className="text-muted">
                    {item.title} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    {item.priceMax > item.price
                      ? formatPriceRange(
                          item.price * item.quantity,
                          item.priceMax * item.quantity
                        )
                      : formatINR(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between text-lg font-bold">
              <span>Total (est.)</span>
              <span className="text-primary">
                {subtotalMax > subtotal
                  ? formatPriceRange(subtotal, subtotalMax)
                  : formatINR(subtotal)}
              </span>
            </div>
            <div className="mt-4 rounded-xl bg-accent/40 p-3 text-xs text-muted">
              <p className="font-semibold text-foreground">Deliver to</p>
              <p className="mt-1">
                {details.name}, {details.phone}
              </p>
              <p>
                {details.address}, {details.city} — {details.pincode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
