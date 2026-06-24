"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact } from "@/data/contact";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: contact.email,
    href: contact.emailGmail,
    sublabel: "Opens in Gmail",
  },
  {
    icon: Phone,
    label: "WhatsApp / Phone",
    value: contact.phoneDisplay,
    href: contact.whatsapp,
    sublabel: "Chat on WhatsApp",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: contact.instagramHandle,
    href: contact.instagram,
    sublabel: "Follow us",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-accent/40">
      <div className="container-max">
        <SectionHeading title="Contact Us" />

        <div className="grid gap-6 sm:grid-cols-3">
          {contactItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center shadow-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="mx-auto mb-4 inline-flex rounded-full bg-primary/10 p-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-muted">{item.label}</p>
                <p className="mt-2 font-semibold text-foreground">{item.value}</p>
                <p className="mt-1 text-xs text-secondary">{item.sublabel}</p>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
