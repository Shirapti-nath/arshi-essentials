"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { PaymentSection } from "@/components/checkout/PaymentSection";
import { formatINR, generateOrderId } from "@/lib/format";
import { href } from "@/lib/routes";
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
  const { items, subtotal, getProduct, clearCart } = useCart();
  const [details, setDetails] = useState<CheckoutDetails>(emptyDetails);
  const [orderId] = useState(() => generateOrderId());
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutDetails, string>>>({});

  useEffect(() => {
    if (items.length === 0 && !confirmed) {
      router.replace(href("/cart/"));
    }
  }, [items.length, confirmed, router]);

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

  const validate = () => {
    const next: typeof errors = {};
    if (!details.name.trim()) next.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(details.phone.replace(/\s/g, "")))
      next.phone = "Enter a valid 10-digit mobile number";
    if (!details.address.trim()) next.address = "Address is required";
    if (!details.city.trim()) next.city = "City is required";
    if (!/^\d{6}$/.test(details.pincode)) next.pincode = "Enter a valid 6-digit pincode";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    document.getElementById("payment-section")?.scrollIntoView({ behavior: "smooth" });
  };

  if (items.length === 0 && !confirmed) return null;

  if (confirmed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-24">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
            ✓
          </div>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Order Sent!
          </h1>
          <p className="mt-3 text-muted">
            Your order <strong className="font-mono">{orderId}</strong> has been
            shared on WhatsApp. We&apos;ll confirm shortly.
          </p>
          <Link
            href={href("/")}
            className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl font-bold text-foreground">Checkout</h1>
        <p className="mt-2 text-muted">Complete your order details and pay via UPI</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full rounded-full border border-primary py-3 text-sm font-semibold text-primary hover:bg-primary/5"
            >
              Continue to Payment
            </button>
          </form>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-serif text-xl font-bold">Order Summary</h2>
              <ul className="mt-4 space-y-3 border-b border-border pb-4">
                {lineItems.map((item) => (
                  <li key={item.title} className="flex justify-between text-sm">
                    <span className="text-muted">
                      {item.title} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      {formatINR(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">{formatINR(subtotal)}</span>
              </div>
            </div>

            <div id="payment-section">
              <PaymentSection
                total={subtotal}
                orderId={orderId}
                items={lineItems}
                details={details}
                onConfirm={() => {
                  clearCart();
                  setConfirmed(true);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
