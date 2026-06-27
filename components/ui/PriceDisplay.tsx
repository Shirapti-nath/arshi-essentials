import { formatINR, formatPriceRange } from "@/lib/format";
import { cn } from "@/lib/utils";

type PriceDisplayProps = {
  price: number;
  priceMax?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  prefix?: string;
};

export function PriceDisplay({
  price,
  priceMax,
  size = "md",
  className,
  prefix,
}: PriceDisplayProps) {
  const max = priceMax ?? price;
  const isRange = max > price;

  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  return (
    <div className={cn("flex flex-wrap items-baseline gap-1", className)}>
      {prefix && (
        <span className={cn("font-medium text-muted", sizeClasses[size === "lg" ? "md" : "sm"])}>
          {prefix}
        </span>
      )}
      <span className={cn("font-bold text-primary", sizeClasses[size])}>
        {isRange ? formatPriceRange(price, max) : formatINR(price)}
      </span>
    </div>
  );
}
