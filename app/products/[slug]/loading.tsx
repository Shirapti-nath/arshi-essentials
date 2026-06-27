import { ProductDetailSkeleton } from "@/components/ui/skeletons";

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <ProductDetailSkeleton />
      </div>
    </div>
  );
}
