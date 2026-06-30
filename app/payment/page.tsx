"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { href } from "@/lib/routes";

/** Redirect /payment/ to checkout where PhonePe QR is shown */
export default function PaymentRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(href("/checkout/"));
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background pt-24">
      <p className="text-muted">Redirecting to checkout…</p>
    </div>
  );
}
