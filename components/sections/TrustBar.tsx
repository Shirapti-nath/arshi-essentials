"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, Gem, Headphones } from "lucide-react";

const trustItems = [
  { icon: Gem, label: "Premium Quality" },
  { icon: Truck, label: "Fast Delivery" },
  { icon: ShieldCheck, label: "Secure UPI Payment" },
  { icon: Headphones, label: "Dedicated Support" },
];

export function TrustBar() {
  return (
    <div className="relative z-20 -mt-1 border-y border-border bg-card/80 backdrop-blur-xl">
      <div className="container-max px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center justify-center gap-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs font-semibold text-foreground sm:text-sm">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
