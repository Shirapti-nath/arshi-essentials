"use client";

import Image from "next/image";
import { useState } from "react";
import { MessageCircle, QrCode } from "lucide-react";
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
        ? "Paid via PhonePe / UPI QR ✅"
        : "Cash on Delivery (COD)";

    const deliveryBlock =
      details.name.trim()
        ? `\n\nDeliver to:\n${details.name}\n${details.phone}\n${details.address}\n${details.city} — ${details.pincode}` +
          (details.email ? `\nEmail: ${details.email}` : "")
        : "\n\n(Delivery details to be confirmed on WhatsApp)";

    return encodeURIComponent(
      `Hi Arshi Essentials! Please confirm my order.\n\n` +
        `📋 Order ID: ${orderId}\n` +
        `💳 Payment: ${paymentLabel}\n\n` +
        `🛍️ Order details:\n${itemLines}\n\n` +
        `💰 Estimated Total: ${totalLabel}\n` +
        `(Final price based on design selected)` +
        deliveryBlock +
        `\n\nPlease confirm and intimate me on WhatsApp. Thank you!`
    );
  };

  const whatsappUrl = `${contact.whatsapp}?text=${buildWhatsAppMessage()}`;

  const hasDetails = Boolean(details.name.trim() && details.phone.trim());

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <QrCode className="h-5 w-5 text-primary" />
        <h2 className="font-serif text-xl font-bold text-foreground">
          PhonePe / UPI Payment
        </h2>
      </div>
      <p className="mt-2 text-sm text-muted">
        Scan the QR code below, then confirm your order on WhatsApp with your
        Order ID and full order details.
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
          PhonePe / UPI QR
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
          <p className="mb-1 text-sm font-semibold text-foreground">
            Scan with PhonePe
          </p>
          <p className="mb-4 text-xs text-muted">
            Also works with Google Pay, Paytm, and any UPI app
          </p>
          <div className="mx-auto inline-block overflow-hidden rounded-2xl border-2 border-primary/20 bg-white p-4 shadow-md">
            <Image
              src={assetPath("/payments/arshi-essentials-upi-qr.png")}
              alt="Arshi Essentials PhonePe UPI QR code — scan to pay"
              width={240}
              height={240}
              className="mx-auto h-auto w-[220px] object-contain"
              priority
            />
          </div>
          <p className="mt-3 text-xs text-muted">
            Pay to <strong>Arshi Essentials</strong> · Amount as per final design
          </p>
        </div>
      )}

      {method === "cod" && (
        <div className="mt-6 rounded-xl bg-accent/50 p-4 text-center text-sm text-muted">
          Pay the final amount in cash when your order is delivered. Confirm
          your order details on WhatsApp below.
        </div>
      )}

      {/* Order details preview */}
      <div className="mt-6 rounded-xl border border-border bg-background p-4">
        <p className="text-sm font-semibold text-foreground">
          Your order details (sent on WhatsApp)
        </p>
        <p className="mt-1 font-mono text-xs text-primary">Order ID: {orderId}</p>
        <ul className="mt-3 space-y-1.5 text-xs text-muted">
          {items.map((item) => (
            <li key={item.title}>
              {item.title} × {item.quantity}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-sm font-bold text-foreground">
          Total (est.): {totalLabel}
        </p>
        {hasDetails ? (
          <p className="mt-2 text-xs text-muted">
            Delivery: {details.name}, {details.phone}, {details.city}
          </p>
        ) : (
          <p className="mt-2 text-xs text-amber-700 dark:text-amber-400">
            Fill delivery details on the left before confirming.
          </p>
        )}
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onConfirm}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#20bd5a]"
      >
        <MessageCircle className="h-5 w-5" />
        {method === "upi"
          ? "I've Paid — Confirm Order on WhatsApp"
          : "Confirm COD Order on WhatsApp"}
      </a>

      <p className="mt-3 text-center text-xs leading-relaxed text-muted">
        We receive your order details and Order ID on WhatsApp and intimate you
        once confirmed.
      </p>
    </div>
  );
}
