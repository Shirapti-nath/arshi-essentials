"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Gem,
  HandHeart,
  IndianRupee,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const benefits = [
  {
    icon: Gem,
    title: "Premium Quality Fabrics",
    description: "Handpicked silks, cottons, and blends for lasting comfort.",
  },
  {
    icon: BadgeCheck,
    title: "Authentic Traditional Designs",
    description: "Temple motifs, Sungudi patterns, and timeless craftsmanship.",
  },
  {
    icon: IndianRupee,
    title: "Affordable Pricing",
    description: "Luxury ethnic wear at prices that make every day special.",
  },
  {
    icon: HandHeart,
    title: "Handpicked Collections",
    description: "Curated pieces chosen for quality, elegance, and style.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted by Customers",
    description: "Loved by thousands across India with glowing reviews.",
  },
  {
    icon: Truck,
    title: "Fast Delivery Across India",
    description: "Quick, secure shipping to Madurai, Pune, and nationwide.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-accent/40">
      <div className="container-max">
        <SectionHeading title="Why Choose Arshi Essentials?" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group flex min-h-[200px] flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center self-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 sm:self-start">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                {benefit.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
