import Link from "next/link";
import { href } from "@/lib/routes";

export default function ReturnsPage() {
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
          Returns & Exchange
        </h1>
        <div className="mt-8 space-y-4 text-muted">
          <p>
            Your satisfaction matters to us. If you receive a damaged or
            incorrect item, contact us on WhatsApp within 48 hours of delivery
            with photos.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Exchanges available for size/fabric issues (subject to stock)</li>
            <li>Returns accepted for defective or wrong items</li>
            <li>Custom or altered pieces may not be eligible for return</li>
          </ul>
          <p>
            To initiate a return or exchange, message us at{" "}
            <a
              href="https://wa.me/919025165509"
              className="font-medium text-primary hover:underline"
            >
              +91 90251 65509
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
