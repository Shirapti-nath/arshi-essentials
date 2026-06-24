"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section id="newsletter" className="section-padding bg-primary">
      <div className="container-max">
        <SectionHeading
          title="Subscribe to Our Newsletter"
          subtitle="Get updates on new collections, offers, and ethnic fashion trends"
          className="[&_h2]:text-white [&_p]:text-white/80 [&_span]:text-secondary"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-xl"
        >
          {submitted ? (
            <div className="flex items-center justify-center gap-3 rounded-2xl bg-white/10 p-6 text-white">
              <CheckCircle className="h-6 w-6 text-secondary" />
              <p className="font-medium">
                Thank you for subscribing! We&apos;ll keep you updated.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-full border border-white/20 bg-white/10 py-3.5 pl-12 pr-4 text-white placeholder:text-white/50 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  aria-label="Email address"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-secondary px-8 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/90"
              >
                Subscribe
              </button>
            </form>
          )}
          {error && (
            <p className="mt-2 text-center text-sm text-red-200">{error}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
