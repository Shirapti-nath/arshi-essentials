"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { useRef } from "react";
import { contact } from "@/data/contact";
import { assetPath } from "@/lib/assetPath";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={assetPath("/products/kanchipuram-silk.png")}
          alt="Woman in maroon Kanchipuram silk saree at a temple"
          fill
          priority
          sizes="100vw"
          className="animate-ken-burns object-cover object-top"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/75 to-primary/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.18)_0%,_transparent_60%)]" />

      <div className="pointer-events-none absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-secondary/10 blur-3xl animate-float" />
      <div
        className="pointer-events-none absolute bottom-[20%] right-[15%] h-48 w-48 rounded-full bg-secondary/10 blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <motion.div
        style={{ opacity }}
        className="container-max relative z-10 px-4 py-32 text-center sm:px-6 lg:px-8 lg:text-left"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl lg:mx-0"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-4 text-sm font-medium uppercase text-secondary"
          >
            Premium Ethnic Wear
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-serif text-5xl font-bold text-white sm:text-6xl lg:text-7xl"
          >
            Arshi Essentials
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mt-4 font-serif text-2xl text-accent sm:text-3xl"
          >
            Elegant Clothing for Everyday
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-6 text-lg leading-relaxed text-white/90"
          >
            Discover timeless ethnic fashion with our exclusive collection of
            sarees and traditional wear crafted with elegance, comfort, and
            tradition.
          </motion.p>

          {/* Quick contact — phone & email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <motion.a
              href={contact.phoneTel}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-secondary hover:bg-white/20"
            >
              <Phone className="h-4 w-4 text-secondary" />
              {contact.phoneDisplay}
            </motion.a>
            <motion.a
              href={contact.emailGmail}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-secondary hover:bg-white/20"
            >
              <Mail className="h-4 w-4 text-secondary" />
              {contact.email}
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/50 p-1"
        >
          <div className="h-2 w-1 rounded-full bg-white/80" />
        </motion.div>
      </motion.div>
    </section>
  );
}
