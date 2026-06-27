import { formatINR, discountPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

type PriceDisplayProps = {
  price: number;
  mrp?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function PriceDisplay({ price, mrp, size = "md", className }: PriceDisplayProps) {
  const discount = discountPercent(price, mrp);

  const sizeClasses = {
    sm: { price: "text-sm", mrp: "text-xs" },
    md: { price: "text-lg", mrp: "text-sm" },
    lg: { price: "text-2xl", mrp: "text-base" },
  };

  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span
        className={cn(
          "font-bold text-primary",
          sizeClasses[size].price
        )}
      >
        {formatINR(price)}
      </span>
      {mrp && mrp > price && (
        <>
          <span
            className={cn(
              "text-muted line-through",
              sizeClasses[size].mrp
            )}
          >
            {formatINR(mrp)}
          </span>
          {discount && (
            <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-xs font-semibold text-primary">
              {discount}% off
            </span>
          )}
        </>
      )}
    </div>
  );
}
