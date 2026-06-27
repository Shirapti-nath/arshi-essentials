"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, QrCode, ShoppingBag } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PaymentStepsInfo } from "@/components/checkout/PaymentStepsInfo";
import { assetPath } from "@/lib/assetPath";
import { href } from "@/lib/routes";
import { contact } from "@/data/contact";

export function OrderPaySection() {
  return (
    <section id="order-pay" className="section-padding bg-background">
      <div className="container-max">
        <SectionHeading
          title="Order & Pay with PhonePe"
          subtitle="Scan our UPI QR, share your order details on WhatsApp, and we intimate you once confirmed."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-primary" />
              <h3 className="font-serif text-xl font-bold text-foreground">
                PhonePe / UPI QR Code
              </h3>
            </div>
            <p className="mt-2 text-sm text-muted">
              Scan with PhonePe, Google Pay, Paytm, or any UPI app after checkout.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="overflow-hidden rounded-2xl border-2 border-primary/20 bg-white p-4 shadow-md">
                <Image
                  src={assetPath("/payments/arshi-essentials-upi-qr.png")}
                  alt="Arshi Essentials PhonePe UPI QR code"
                  width={220}
                  height={220}
                  className="h-auto w-[220px] object-contain"
                />
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-muted">
              Pay to <strong>Arshi Essentials</strong> · Final amount based on design selected
            </p>
          </div>

          <div className="space-y-6">
            <PaymentStepsInfo />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={href("/#collections")}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light"
              >
                <ShoppingBag className="h-4 w-4" />
                Shop & Add to Cart
              </Link>
              <Link
                href={href("/checkout/")}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-accent"
              >
                Go to Checkout
              </Link>
            </div>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#20bd5a]"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp — {contact.phoneDisplay}
            </a>
            <p className="text-center text-xs text-muted">
              After payment, tap &ldquo;Confirm Order on WhatsApp&rdquo; at checkout — your
              Order ID and full order details are sent to us instantly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
