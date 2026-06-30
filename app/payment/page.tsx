"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { PaymentSection } from "@/components/checkout/PaymentSection";
import { OrderSummaryCard } from "@/components/checkout/OrderSummaryCard";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { generateOrderId } from "@/lib/format";
import { appPath } from "@/lib/routes";
import { clearCheckoutSession } from "@/lib/checkoutSession";
import {
  isCheckoutDetailsValid,
  validateCheckoutDetails,
  type CheckoutErrors,
} from "@/lib/validation";
import type { CheckoutDetails } from "@/types";

const emptyDetails: CheckoutDetails = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  pincode: "",
  paymentMethod: "upi",
};

export default function PaymentPage() {
  const { items, itemCount, subtotal, getProduct, clearCart, hydrated } =
    useCart();
  const [details, setDetails] = useState<CheckoutDetails>(emptyDetails);
  const [orderId] = useState(() => generateOrderId());
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<CheckoutErrors>({});

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
          };
        })
        .filter(Boolean) as { title: string; quantity: number; price: number }[],
    [items, getProduct]
  );

  const detailsValid = isCheckoutDetailsValid(details);

  useEffect(() => {
    if (!detailsValid) return;
    setErrors({});
  }, [detailsValid]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background pt-24">
        <p className="text-muted">Loading…</p>
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

  const handleBlurValidate = () => {
    if (detailsValid) setErrors({});
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <CheckoutSteps current="payment" />

        <h1 className="font-serif text-3xl font-bold text-foreground">
          Checkout &amp; Pay
        </h1>
        <p className="mt-2 text-muted">
          Fill your details on the left and scan the PhonePe QR on the right.
        </p>
        <p className="mt-1 font-mono text-sm text-primary">Order ID: {orderId}</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Left: details + order summary */}
          <div className="space-y-6">
            <form
              className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <h2 className="font-serif text-xl font-bold">Delivery Details</h2>

              {(
                [
                  ["name", "Full Name", "text", "Your full name"],
                  ["phone", "Phone Number", "tel", "10-digit mobile"],
                  ["email", "Email (optional)", "email", "your@email.com"],
                  ["address", "Address", "text", "House no., street, area"],
                  ["city", "City", "text", "City"],
                  ["pincode", "Pincode", "text", "6-digit pincode"],
                ] as const
              ).map(([key, label, type, placeholder]) => (
                <div key={key}>
                  <label htmlFor={key} className="mb-1 block text-sm font-medium">
                    {label}
                  </label>
                  <input
                    id={key}
                    type={type}
                    placeholder={placeholder}
                    value={details[key]}
                    onChange={(e) => {
                      setDetails((d) => ({ ...d, [key]: e.target.value }));
                      if (errors[key]) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next[key];
                          return next;
                        });
                      }
                    }}
                    onBlur={() => {
                      const fieldErrors = validateCheckoutDetails(details);
                      if (fieldErrors[key]) {
                        setErrors((prev) => ({ ...prev, [key]: fieldErrors[key] }));
                      }
                      handleBlurValidate();
                    }}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  {errors[key] && (
                    <p className="mt-1 text-xs text-red-500">{errors[key]}</p>
                  )}
                </div>
              ))}
            </form>

            <OrderSummaryCard
              itemCount={itemCount}
              lineItems={lineItems}
              total={subtotal}
              delivery={
                detailsValid
                  ? {
                      name: details.name,
                      phone: details.phone,
                      address: details.address,
                      city: details.city,
                      pincode: details.pincode,
                    }
                  : undefined
              }
            />
          </div>

          {/* Right: QR always visible */}
          <PaymentSection
            total={subtotal}
            orderId={orderId}
            items={lineItems}
            details={details}
            detailsValid={detailsValid}
            onConfirm={() => {
              clearCart();
              clearCheckoutSession();
              setConfirmed(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}
