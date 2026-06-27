import { ProductGridSkeleton } from "@/components/ui/skeletons";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-max section-padding">
        <div className="mx-auto mb-10 h-8 w-48 animate-pulse rounded-lg bg-accent/60" />
        <ProductGridSkeleton count={6} />
      </div>
    </div>
  );
}
