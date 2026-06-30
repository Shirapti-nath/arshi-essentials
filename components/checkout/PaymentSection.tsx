"use client";

import { MessageCircle, QrCode } from "lucide-react";
import { formatINR } from "@/lib/format";
import { contact } from "@/data/contact";
import { PhonePeQrCode } from "@/components/checkout/PhonePeQrCode";
import type { CheckoutDetails } from "@/types";
import { cn } from "@/lib/utils";

type LineItem = {
  title: string;
  quantity: number;
  price: number;
};

type PaymentSectionProps = {
  total: number;
  orderId: string;
  items: LineItem[];
  details: CheckoutDetails;
  detailsValid: boolean;
  onConfirm: () => void;
};

export function PaymentSection({
  total,
  orderId,
  items,
  details,
  detailsValid,
  onConfirm,
}: PaymentSectionProps) {
  const totalLabel = formatINR(total);

  const buildWhatsAppMessage = () => {
    const itemLines = items
      .map(
        (i) =>
          `• ${i.title} x${i.quantity} — ${formatINR(i.price * i.quantity)}`
      )
      .join("\n");

    const deliveryBlock =
      details.name.trim()
        ? `\n\nDeliver to:\n${details.name}\n${details.phone}\n${details.address}\n${details.city} — ${details.pincode}` +
          (details.email ? `\nEmail: ${details.email}` : "")
        : "";

    return encodeURIComponent(
      `Hi Arshi Essentials! Please confirm my order.\n\n` +
        `📋 Order ID: ${orderId}\n` +
        `💳 Payment: Paid via PhonePe / UPI QR ✅\n\n` +
        `🛍️ Order details:\n${itemLines}\n\n` +
        `💰 Total: ${totalLabel}` +
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
    <div className="rounded-2xl border-2 border-primary/30 bg-card p-6 shadow-sm lg:sticky lg:top-28">
      <div className="flex items-center gap-2">
        <QrCode className="h-5 w-5 text-primary" />
        <h2 className="font-serif text-xl font-bold text-foreground">
          PhonePe / UPI QR
        </h2>
      </div>
      <p className="mt-2 text-sm text-muted">
        Scan with PhonePe, Google Pay, or any UPI app. Fill your details on the
        left, then confirm on WhatsApp.
      </p>

      <div className="mt-6">
        <PhonePeQrCode size="lg" />
        <p className="mt-3 text-center text-xs text-muted">
          Pay to <strong>Arshi Essentials</strong> · {totalLabel}
        </p>
      </div>

      <p className="mt-4 text-center font-mono text-xs text-primary">
        Order ID: {orderId}
      </p>

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
        I&apos;ve Paid — Confirm on WhatsApp
      </button>

      {!detailsValid && (
        <p className="mt-3 text-center text-xs text-amber-700 dark:text-amber-400">
          Fill all delivery details on the left to enable WhatsApp confirmation.
        </p>
      )}

      <p className="mt-3 text-center text-xs leading-relaxed text-muted">
        We receive your order on WhatsApp and intimate you once confirmed.
      </p>
    </div>
  );
}
