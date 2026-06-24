"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-12",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <div
        className={cn(
          "mb-3 flex items-center gap-3",
          align === "center" ? "justify-center" : "justify-start"
        )}
      >
        <span className="h-px w-12 bg-secondary" />
        <span className="text-sm font-medium uppercase tracking-widest text-secondary">
          Arshi Essentials
        </span>
        <span className="h-px w-12 bg-secondary" />
      </div>
      <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">{subtitle}</p>
      )}
    </motion.div>
  );
}
