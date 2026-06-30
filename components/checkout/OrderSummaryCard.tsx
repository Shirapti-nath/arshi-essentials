import { formatINR } from "@/lib/format";

type OrderLine = {
  title: string;
  quantity: number;
  price: number;
};

type OrderSummaryCardProps = {
  itemCount: number;
  lineItems: OrderLine[];
  total: number;
  delivery?: {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
};

export function OrderSummaryCard({
  itemCount,
  lineItems,
  total,
  delivery,
}: OrderSummaryCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="font-serif text-xl font-bold">Order Summary</h2>
      <p className="mt-1 text-sm text-muted">
        {itemCount} item{itemCount !== 1 ? "s" : ""}
      </p>
      <ul className="mt-4 space-y-3 border-b border-border pb-4">
        {lineItems.map((item) => (
          <li key={item.title} className="flex justify-between gap-4 text-sm">
            <span className="text-muted">
              {item.title} × {item.quantity}
            </span>
            <span className="shrink-0 font-medium">
              {formatINR(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-between text-lg font-bold">
        <span>Total</span>
        <span className="text-primary">{formatINR(total)}</span>
      </div>
      {delivery?.name.trim() && (
        <div className="mt-4 rounded-xl bg-accent/40 p-3 text-xs text-muted">
          <p className="font-semibold text-foreground">Deliver to</p>
          <p className="mt-1">
            {delivery.name}, {delivery.phone}
          </p>
          <p>
            {delivery.address}, {delivery.city} — {delivery.pincode}
          </p>
        </div>
      )}
    </div>
  );
}
