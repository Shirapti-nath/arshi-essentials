"use client";

import Image from "next/image";
import Link from "next/link";
import { Scale, X } from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { getProductById } from "@/lib/recommendations";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatPriceRange } from "@/lib/format";
import { href } from "@/lib/routes";
import { cn } from "@/lib/utils";

const FIELDS: {
  key: string;
  label: string;
  get: (p: NonNullable<ReturnType<typeof getProductById>>) => string;
}[] = [
  {
    key: "price",
    label: "Price",
    get: (p) => formatPriceRange(p.price, p.priceMax),
  },
  { key: "fabric", label: "Material", get: (p) => p.fabric ?? "—" },
  {
    key: "colors",
    label: "Color",
    get: (p) => p.colors?.join(", ") ?? "—",
  },
  { key: "border", label: "Border Type", get: (p) => p.borderType ?? "—" },
  { key: "occasion", label: "Occasion", get: (p) => p.occasion ?? "—" },
  { key: "length", label: "Length", get: (p) => p.length ?? "—" },
  {
    key: "blouse",
    label: "Blouse Included",
    get: (p) => (p.blouseIncluded ? "Yes" : "No"),
  },
  {
    key: "rating",
    label: "Rating",
    get: (p) => (p.rating ? `${p.rating} ★` : "—"),
  },
];

export default function ComparePage() {
  const { ids, remove, clear } = useCompare();
  const items = ids
    .map((id) => getProductById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getProductById>>[];

  if (!items.length) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-24">
        <div className="container-max px-4">
          <EmptyState
            icon={<Scale className="h-10 w-10" />}
            title="Nothing to compare"
            description="Select up to 3 sarees using the Compare button on product cards."
            actionLabel="Browse Collections"
            actionHref={href("/#collections")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-serif text-3xl font-bold">Compare Sarees</h1>
          <button
            type="button"
            onClick={clear}
            className="text-sm text-muted hover:text-primary"
          >
            Clear all
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border bg-card">
                <th className="p-4 text-left font-medium text-muted">Feature</th>
                {items.map((p) => (
                  <th key={p.id} className="p-4 text-left">
                    <div className="relative mb-2 aspect-[3/4] w-28 overflow-hidden rounded-lg">
                      <Image
                        src={p.image}
                        alt={p.imageAlt}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                    <Link
                      href={href(`/products/${p.slug}/`)}
                      className="font-serif font-semibold hover:text-primary"
                    >
                      {p.title}
                    </Link>
                    <button
                      type="button"
                      onClick={() => remove(p.id)}
                      className="mt-2 flex items-center gap-1 text-xs text-muted hover:text-primary"
                    >
                      <X className="h-3 w-3" /> Remove
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FIELDS.map((field) => {
                const values = items.map((p) => field.get(p));
                const allSame = values.every((v) => v === values[0]);
                return (
                  <tr key={field.key} className="border-b border-border">
                    <td className="p-4 font-medium text-muted">{field.label}</td>
                    {items.map((p, i) => (
                      <td
                        key={p.id}
                        className={cn(
                          "p-4",
                          !allSame && "bg-primary/5 font-semibold text-primary"
                        )}
                      >
                        {values[i]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
