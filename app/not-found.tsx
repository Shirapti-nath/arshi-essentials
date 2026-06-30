import Link from "next/link";
import { appPath } from "@/lib/routes";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-4 pt-24 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-secondary">
        404
      </p>
      <h1 className="mt-2 font-serif text-3xl font-bold text-foreground">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted">
        This page doesn&apos;t exist. Go back to our homepage to shop sarees,
        pay via PhonePe QR, and confirm your order on WhatsApp.
      </p>
      <Link
        href={appPath("/")}
        className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-primary-light"
      >
        Back to Homepage
      </Link>
      <Link
        href={appPath("/cart/")}
        className="mt-4 inline-block rounded-full border border-primary px-6 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5"
      >
        Go to Cart
      </Link>
      <Link
        href={appPath("/checkout/")}
        className="mt-3 inline-block text-sm text-primary hover:underline"
      >
        Go to Checkout
      </Link>
      <Link
        href={appPath("/payment/")}
        className="mt-3 inline-block text-sm text-primary hover:underline"
      >
        Go to Payment
      </Link>
      <p className="mt-6 text-xs text-muted">
        Live site:{" "}
        <a
          href="https://shirapti-nath.github.io/arshi-essentials/"
          className="text-primary hover:underline"
        >
          shirapti-nath.github.io/arshi-essentials
        </a>
      </p>
      <p className="mt-2 text-xs text-muted">
        Local dev: open{" "}
        <a href="http://localhost:3000/" className="text-primary hover:underline">
          localhost:3000
        </a>{" "}
        (not localhost:3000/arshi-essentials)
      </p>
    </div>
  );
}
