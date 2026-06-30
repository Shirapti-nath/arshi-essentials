import Link from "next/link";
import { Check } from "lucide-react";
import { appPath } from "@/lib/routes";
import { cn } from "@/lib/utils";

type CheckoutStepsProps = {
  current: "cart" | "payment" | "done";
};

const steps = [
  { key: "cart" as const, label: "Cart", path: "/cart/" },
  { key: "payment" as const, label: "Details & Pay", path: "/payment/" },
  { key: "done" as const, label: "Confirm", path: null },
];

const order = ["cart", "payment", "done"] as const;

export function CheckoutSteps({ current }: CheckoutStepsProps) {
  const currentIndex = order.indexOf(current);

  return (
    <nav aria-label="Checkout progress" className="mb-8">
      <ol className="flex items-center justify-between gap-2">
        {steps.map((step, index) => {
          const done = index < currentIndex;
          const active = step.key === current;
          const content = (
            <>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  done && "bg-green-600 text-white",
                  active && !done && "bg-primary text-white",
                  !done && !active && "bg-accent text-muted"
                )}
              >
                {done ? <Check className="h-4 w-4" /> : index + 1}
              </span>
              <span
                className={cn(
                  "mt-1 hidden text-xs font-medium sm:block",
                  active ? "text-primary" : "text-muted"
                )}
              >
                {step.label}
              </span>
            </>
          );

          return (
            <li key={step.key} className="flex flex-1 flex-col items-center">
              {step.path ? (
                <Link
                  href={appPath(step.path)}
                  className="flex flex-col items-center hover:opacity-80"
                >
                  {content}
                </Link>
              ) : (
                <div className="flex flex-col items-center">{content}</div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
