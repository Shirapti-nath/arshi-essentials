"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { appPath } from "@/lib/routes";

export default function WishlistRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(appPath("/#collections"));
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background pt-24">
      <p className="text-muted">Redirecting to collections…</p>
    </div>
  );
}
