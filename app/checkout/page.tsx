"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { appPath } from "@/lib/routes";

/** Checkout merged into payment — single page with details + QR */
export default function CheckoutRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(appPath("/payment/"));
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background pt-24">
      <p className="text-muted">Loading checkout…</p>
    </div>
  );
}
