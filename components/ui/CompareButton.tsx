"use client";

import { Scale } from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";

type CompareButtonProps = {
  productId: string;
  className?: string;
  size?: "sm" | "md";
};

export function CompareButton({
  productId,
  className,
  size = "sm",
}: CompareButtonProps) {
  const { isComparing, toggle } = useCompare();
  const { toast } = useToast();
  const active = isComparing(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggle(productId);
    if (result === "added") toast("success", "Added to compare");
    else if (result === "removed") toast("info", "Removed from compare");
    else toast("error", "Compare limit reached", "You can compare up to 3 items");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={active ? "Remove from compare" : "Add to compare"}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted hover:border-primary hover:text-primary",
        size === "md" && "px-4 py-2 text-sm",
        className
      )}
    >
      <Scale className="h-3.5 w-3.5" />
      {active ? "Comparing" : "Compare"}
    </button>
  );
}
