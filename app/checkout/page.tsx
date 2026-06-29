"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PaymentSection } from "@/components/checkout/PaymentSection";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { formatINR, formatPriceRange, generateOrderId } from "@/lib/format";
import { href } from "@/lib/routes";
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

export default function CheckoutPage() {
  const { items, itemCount, subtotal, subtotalMax, getProduct, clearCart } =
    useCart();
  const [details, setDetails] = useState<CheckoutDetails>(emptyDetails);
  const [orderId] = useState(() => generateOrderId());
  const [confirmed, setConfirmed] = useState(false);
  const [step, setStep] = useState<"details" | "payment">("details");
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

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateCheckoutDetails(details);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (items.length === 0 && !confirmed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-24">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Your cart is empty
          </h1>
          <p className="mt-3 text-muted">
            Add items to your cart before checkout.
          </p>
          <Link
            href={href("/#collections")}
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
              Your order <strong className="font-mono">{orderId}</strong> with
              full details has been sent on WhatsApp. We will confirm and
              intimate you shortly.
            </p>
            <Link
              href={href("/")}
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
        <CheckoutSteps current={step === "details" ? "details" : "payment"} />

        <h1 className="font-serif text-3xl font-bold text-foreground">
          {step === "details" ? "Delivery Details" : "Pay with PhonePe UPI"}
        </h1>
        <p className="mt-2 text-muted">
          {step === "details"
            ? "Fill your delivery details, then pay via PhonePe QR and confirm on WhatsApp."
            : "Scan the PhonePe QR code, then tap confirm to send your order on WhatsApp."}
        </p>
        <p className="mt-1 font-mono text-sm text-primary">Order ID: {orderId}</p>

        {step === "details" ? (
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <form onSubmit={handleContinueToPayment} className="space-y-4">
              <h2 className="font-serif text-xl font-bold">Your Details</h2>

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
                    onChange={(e) =>
                      setDetails((d) => ({ ...d, [key]: e.target.value }))
                    }
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  {errors[key] && (
                    <p className="mt-1 text-xs text-red-500">{errors[key]}</p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white hover:bg-primary-light"
              >
                Continue to PhonePe Payment
              </button>
            </form>

            <OrderSummary
              lineItems={lineItems}
              itemCount={itemCount}
              subtotal={subtotal}
              subtotalMax={subtotalMax}
            />
          </div>
        ) : (
          <div className="mt-10">
            <button
              type="button"
              onClick={() => setStep("details")}
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Edit delivery details
            </button>

            <div className="grid gap-10 lg:grid-cols-2">
              <PaymentSection
                total={subtotal}
                totalMax={subtotalMax}
                orderId={orderId}
                items={lineItems}
                details={details}
                detailsValid={isCheckoutDetailsValid(details)}
                onConfirm={() => {
                  clearCart();
                  setConfirmed(true);
                }}
              />
              <OrderSummary
                lineItems={lineItems}
                itemCount={itemCount}
                subtotal={subtotal}
                subtotalMax={subtotalMax}
                details={details}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderSummary({
  lineItems,
  itemCount,
  subtotal,
  subtotalMax,
  details,
}: {
  lineItems: {
    title: string;
    quantity: number;
    price: number;
    priceMax: number;
  }[];
  itemCount: number;
  subtotal: number;
  subtotalMax: number;
  details?: CheckoutDetails;
}) {
  return (
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
      {details && details.name.trim() && (
        <div className="mt-4 rounded-xl bg-accent/40 p-3 text-xs text-muted">
          <p className="font-semibold text-foreground">Deliver to</p>
          <p className="mt-1">
            {details.name}, {details.phone}
          </p>
          <p>
            {details.address}, {details.city} — {details.pincode}
          </p>
        </div>
      )}
    </div>
  );
}
