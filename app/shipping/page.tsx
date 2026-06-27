import Link from "next/link";
import { href } from "@/lib/routes";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-max max-w-2xl px-4 sm:px-6">
        <Link
          href={href("/")}
          className="text-sm font-medium text-primary hover:underline"
        >
          ← Back to home
        </Link>
        <h1 className="mt-6 font-serif text-3xl font-bold text-foreground">
          Shipping Policy
        </h1>
        <div className="mt-8 space-y-4 text-muted">
          <p>
            We deliver across India. Orders are typically dispatched within 2–3
            business days after payment confirmation on WhatsApp.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Standard delivery: 3–7 business days</li>
            <li>Metro cities: 3–5 business days</li>
            <li>Remote areas: 5–10 business days</li>
          </ul>
          <p>
            Shipping charges may apply based on your location and order size. We
            will confirm the final amount when you place your order.
          </p>
        </div>
      </div>
    </div>
  );
}
