"use client";

import { MessageCircle, QrCode } from "lucide-react";
import { formatINR, formatPriceRange } from "@/lib/format";
import { contact } from "@/data/contact";
import { PhonePeQrCode } from "@/components/checkout/PhonePeQrCode";
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
  detailsValid: boolean;
  onConfirm: () => void;
};

export function PaymentSection({
  total,
  totalMax,
  orderId,
  items,
  details,
  detailsValid,
  onConfirm,
}: PaymentSectionProps) {
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

    const deliveryBlock =
      details.name.trim()
        ? `\n\nDeliver to:\n${details.name}\n${details.phone}\n${details.address}\n${details.city} — ${details.pincode}` +
          (details.email ? `\nEmail: ${details.email}` : "")
        : "\n\n(Delivery details filled on checkout)";

    return encodeURIComponent(
      `Hi Arshi Essentials! Please confirm my order.\n\n` +
        `📋 Order ID: ${orderId}\n` +
        `💳 Payment: Paid via PhonePe / UPI QR ✅\n\n` +
        `🛍️ Order details:\n${itemLines}\n\n` +
        `💰 Estimated Total: ${totalLabel}\n` +
        `(Final price based on design selected)` +
        deliveryBlock +
        `\n\nPlease confirm and intimate me on WhatsApp. Thank you!`
    );
  };

  const whatsappUrl = `${contact.whatsapp}?text=${buildWhatsAppMessage()}`;

  const handleConfirm = () => {
    if (!detailsValid) return;
    onConfirm();
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      id="payment-section"
      className="rounded-2xl border-2 border-primary/30 bg-card p-6 shadow-sm"
    >
      <div className="flex items-center gap-2">
        <QrCode className="h-5 w-5 text-primary" />
        <h2 className="font-serif text-xl font-bold text-foreground">
          PhonePe / UPI QR Payment
        </h2>
      </div>
      <p className="mt-2 text-sm text-muted">
        Scan the QR code below with PhonePe, then confirm your order on
        WhatsApp.
      </p>

      <div className="mt-6">
        <PhonePeQrCode size="lg" />
        <p className="mt-3 text-xs text-muted">
          Pay to <strong>Arshi Essentials</strong> · Amount: {totalLabel}
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-background p-4">
        <p className="text-sm font-semibold text-foreground">Your order</p>
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
        {detailsValid ? (
          <p className="mt-2 text-xs text-muted">
            Delivery: {details.name}, {details.phone}, {details.city}
          </p>
        ) : (
          <p className="mt-2 text-xs text-amber-700 dark:text-amber-400">
            Fill delivery details on the left, then confirm on WhatsApp.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleConfirm}
        disabled={!detailsValid}
        className={cn(
          "mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-white transition-colors",
          detailsValid
            ? "bg-[#25D366] hover:bg-[#20bd5a]"
            : "cursor-not-allowed bg-muted"
        )}
      >
        <MessageCircle className="h-5 w-5" />
        I&apos;ve Paid — Confirm Order on WhatsApp
      </button>

      <p className="mt-3 text-center text-xs leading-relaxed text-muted">
        We receive your order details and Order ID on WhatsApp and intimate you
        once confirmed.
      </p>
    </div>
  );
}
