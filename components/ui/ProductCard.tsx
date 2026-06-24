"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types";
import { contact } from "@/data/contact";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card shadow-md",
        "transition-shadow duration-500 hover:shadow-2xl hover:shadow-primary/10"
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/10" />

        {/* Overlay content on image */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="mb-2 inline-block rounded-full bg-secondary/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground">
            {product.category.replace("-", " ")}
          </span>
          <h3 className="font-serif text-xl font-semibold text-white">
            {product.title}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm leading-relaxed text-muted">{product.description}</p>
        <a
          href={`${contact.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in the ${product.title} collection.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3 hover:text-primary-light"
        >
          Enquire on WhatsApp
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  );
}
