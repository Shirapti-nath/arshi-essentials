"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { locations } from "@/data/locations";

export function LocationSection() {
  return (
    <section id="locations" className="section-padding bg-background">
      <div className="container-max">
        <SectionHeading title="Visit Our Stores" />

        <div className="grid gap-8 lg:grid-cols-2">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-md"
            >
              <div className="flex items-center gap-3 border-b border-border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {location.city}
                  </h3>
                  <p className="text-sm text-muted">{location.state}</p>
                </div>
              </div>
              <div className="aspect-video w-full">
                <iframe
                  src={location.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${location.city}, ${location.state}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
