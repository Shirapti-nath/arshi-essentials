type PaymentStepsInfoProps = {
  orderId?: string;
  compact?: boolean;
};

export function PaymentStepsInfo({ orderId, compact }: PaymentStepsInfoProps) {
  return (
    <div
      className={
        compact
          ? "rounded-xl bg-accent/40 p-4 text-xs leading-relaxed text-muted"
          : "rounded-xl border border-border bg-accent/30 px-4 py-4 text-sm text-muted"
      }
    >
      <p className="font-semibold text-foreground">
        How to order &amp; pay
        {orderId && (
          <>
            {" "}
            · Order ID:{" "}
            <span className="font-mono text-primary">{orderId}</span>
          </>
        )}
      </p>
      <ol className="mt-2 list-inside list-decimal space-y-1.5">
        <li>Add items to cart and fill your delivery details at checkout</li>
        <li>
          <strong className="text-foreground">Scan the PhonePe UPI QR code</strong>{" "}
          using PhonePe, Google Pay, or any UPI app
        </li>
        <li>
          Tap <strong className="text-foreground">&ldquo;Confirm on WhatsApp&rdquo;</strong>{" "}
          — your full order details and Order ID are sent to us instantly
        </li>
        <li>We confirm your order and intimate you on WhatsApp</li>
      </ol>
    </div>
  );
}
