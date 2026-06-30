"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { PaymentStepsInfo } from "@/components/checkout/PaymentStepsInfo";
import { formatINR, formatPriceRange, generateOrderId } from "@/lib/format";
import { appPath } from "@/lib/routes";
import { saveCheckoutSession } from "@/lib/checkoutSession";
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
  const router = useRouter();
  const { items, itemCount, subtotal, subtotalMax, getProduct, hydrated } =
    useCart();
  const [details, setDetails] = useState<CheckoutDetails>(emptyDetails);
  const [orderId] = useState(() => generateOrderId());
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

    saveCheckoutSession(details, orderId);
    router.push(appPath("/payment/"));
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background pt-24">
        <p className="text-muted">Loading checkout…</p>
      </div>
    );
  }

  if (items.length === 0) {
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
            href={appPath("/#collections")}
            className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white"
          >
            Browse Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <CheckoutSteps current="details" />

        <h1 className="font-serif text-3xl font-bold text-foreground">
          Delivery Details
        </h1>
        <p className="mt-2 text-muted">
          Fill your details, then continue to the PhonePe UPI payment page.
        </p>
        <p className="mt-1 font-mono text-sm text-primary">Order ID: {orderId}</p>

        <div className="mt-6">
          <PaymentStepsInfo orderId={orderId} />
        </div>

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
              disabled={!isCheckoutDetailsValid(details)}
              className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue to PhonePe Payment
            </button>
          </form>

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
            <p className="mt-4 text-xs text-muted">
              Next step: scan PhonePe UPI QR and confirm on WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
