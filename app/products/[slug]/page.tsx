import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { getAllProductSlugs, getProductBySlug } from "@/lib/products";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { appPath } from "@/lib/routes";
import { contact } from "@/data/contact";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.title} | Arshi Essentials`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const whatsappUrl = `${contact.whatsapp}?text=${encodeURIComponent(
    `Hi, I'm interested in ${product.title} (${product.price} INR). Please share available designs.`
  )}`;

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <Link
          href={appPath("/#collections")}
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Collections
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
                {product.badge}
              </span>
            )}
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-secondary">
              {product.category.replace("-", " ")}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              {product.title}
            </h1>
            <PriceDisplay
              price={product.price}
              priceMax={product.priceMax}
              size="lg"
              className="mt-4"
            />
            <p className="mt-6 leading-relaxed text-muted">{product.description}</p>

            {(product.fabric || product.occasion) && (
              <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-border bg-card p-4">
                {product.fabric && (
                  <>
                    <dt className="text-sm text-muted">Fabric</dt>
                    <dd className="text-sm font-medium text-foreground">
                      {product.fabric}
                    </dd>
                  </>
                )}
                {product.occasion && (
                  <>
                    <dt className="text-sm text-muted">Occasion</dt>
                    <dd className="text-sm font-medium text-foreground">
                      {product.occasion}
                    </dd>
                  </>
                )}
              </dl>
            )}

            <AddToCartButton
              productId={product.id}
              showQuantity
              className="mt-8"
            />

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#25D366] py-3 text-sm font-semibold text-[#25D366] transition-colors hover:bg-[#25D366]/5 sm:w-auto sm:px-8"
            >
              <MessageCircle className="h-4 w-4" />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
