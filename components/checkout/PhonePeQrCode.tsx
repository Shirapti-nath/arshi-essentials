import { assetPath } from "@/lib/assetPath";
import { cn } from "@/lib/utils";

type PhonePeQrCodeProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
};

const sizes = {
  sm: "w-[180px]",
  md: "w-[240px]",
  lg: "w-[280px]",
};

export function PhonePeQrCode({
  className,
  size = "md",
  showLabel = true,
}: PhonePeQrCodeProps) {
  const src = assetPath("/payments/arshi-essentials-upi-qr.png");

  return (
    <div className={cn("text-center", className)}>
      {showLabel && (
        <>
          <p className="mb-1 text-sm font-semibold text-foreground">
            Scan with PhonePe
          </p>
          <p className="mb-4 text-xs text-muted">
            Also works with Google Pay, Paytm, and any UPI app
          </p>
        </>
      )}
      <div className="mx-auto inline-block overflow-hidden rounded-2xl border-2 border-primary/20 bg-white p-4 shadow-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Arshi Essentials PhonePe UPI QR code — scan to pay"
          width={280}
          height={280}
          className={cn("mx-auto h-auto object-contain", sizes[size])}
          loading="eager"
        />
      </div>
    </div>
  );
}
