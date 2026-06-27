"use client";

import Image from "next/image";
import { useState } from "react";
import { formatINR, formatPriceRange } from "@/lib/format";
import { assetPath } from "@/lib/assetPath";
import { contact } from "@/data/contact";
import type { CheckoutDetails } from "@/types";
import { cn } from "@/lib/utils";

type LineItem = {
  title: string;
  quantity: number;
  price: number;
  priceMax: number;
};

type PaymentSectionProps = {
  total: number;
  totalMax: number;
  orderId: string;
  items: LineItem[];
  details: CheckoutDetails;
  onConfirm: () => void;
};

export function PaymentSection({
  total,
  totalMax,
  orderId,
  items,
  details,
  onConfirm,
}: PaymentSectionProps) {
  const [method, setMethod] = useState<"upi" | "cod">("upi");

  const totalLabel =
    totalMax > total ? formatPriceRange(total, totalMax) : formatINR(total);

  const buildWhatsAppMessage = () => {
    const itemLines = items
      .map((i) => {
        const lineMin = i.price * i.quantity;
        const lineMax = i.priceMax * i.quantity;
        const linePrice =
          lineMax > lineMin
            ? formatPriceRange(lineMin, lineMax)
            : formatINR(lineMin);
        return `• ${i.title} x${i.quantity} — ${linePrice}`;
      })
      .join("\n");

    const paymentLabel =
      method === "upi"
        ? "UPI (PhonePe / Google Pay) — Payment done ✅"
        : "Cash on Delivery (COD)";

    return encodeURIComponent(
      `Hi Arshi Essentials! I'd like to confirm my order.\n\n` +
        `Order ID: ${orderId}\n` +
        `Payment: ${paymentLabel}\n\n` +
        `Items:\n${itemLines}\n\n` +
        `Estimated Total: ${totalLabel}\n` +
        `(Final price based on design selected)\n\n` +
        `Deliver to:\n${details.name}\n${details.phone}\n` +
        `${details.address}\n${details.city} — ${details.pincode}` +
        (details.email ? `\nEmail: ${details.email}` : "")
    );
  };

  const whatsappUrl = `${contact.whatsapp}?text=${buildWhatsAppMessage()}`;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="font-serif text-xl font-bold text-foreground">Payment</h2>
      <p className="mt-1 text-sm text-muted">
        Estimated total:{" "}
        <span className="font-bold text-primary">{totalLabel}</span>
      </p>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setMethod("upi")}
          className={cn(
            "flex-1 rounded-full border py-2.5 text-sm font-medium transition-colors",
            method === "upi"
              ? "border-primary bg-primary text-white"
              : "border-border text-muted hover:border-primary"
          )}
        >
          UPI / QR Pay
        </button>
        <button
          type="button"
          onClick={() => setMethod("cod")}
          className={cn(
            "flex-1 rounded-full border py-2.5 text-sm font-medium transition-colors",
            method === "cod"
              ? "border-primary bg-primary text-white"
              : "border-border text-muted hover:border-primary"
          )}
        >
          Cash on Delivery
        </button>
      </div>

      {method === "upi" && (
        <div className="mt-6 text-center">
          <p className="mb-4 text-sm text-muted">
            Scan with PhonePe, Google Pay, or any UPI app
          </p>
          <div className="mx-auto inline-block overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-md">
            <Image
              src={assetPath("/payments/arshi-essentials-upi-qr.png")}
              alt="Arshi Essentials PhonePe UPI QR code for payment"
              width={240}
              height={240}
              className="mx-auto h-auto w-[220px] object-contain"
              priority
            />
          </div>
          <p className="mt-3 text-xs text-muted">
            Pay as per final design price to <strong>Arshi Essentials</strong>
          </p>
        </div>
      )}

      {method === "cod" && (
        <div className="mt-6 rounded-xl bg-accent/50 p-4 text-center text-sm text-muted">
          Pay the final amount in cash when your order is delivered.
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onConfirm}
        className="mt-6 block w-full rounded-full bg-[#25D366] py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#20bd5a]"
      >
        {method === "upi"
          ? "I've Paid — Confirm on WhatsApp"
          : "Confirm COD Order on WhatsApp"}
      </a>

      <p className="mt-3 text-center text-xs text-muted">
        Order ID: <span className="font-mono font-medium">{orderId}</span>
      </p>
    </div>
  );
}
