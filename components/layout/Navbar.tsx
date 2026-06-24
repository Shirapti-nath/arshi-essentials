"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { SmoothScrollLink } from "@/components/ui/SmoothScrollLink";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { navItems } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const navLinkClass = (isMobile = false) =>
    cn(
      isMobile
        ? "block rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-accent"
        : "text-sm font-medium transition-colors hover:text-secondary",
      !isMobile &&
        (scrolled
          ? "text-foreground hover:text-primary"
          : "text-white/90")
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/60 bg-background/80 shadow-lg shadow-primary/5 backdrop-blur-xl"
          : "bg-gradient-to-b from-black/30 to-transparent backdrop-blur-[2px]"
      )}
    >
      <nav className="container-max flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <SmoothScrollLink
          href="#home"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Logo size={40} variant={scrolled ? "default" : "light"} />
          <div className="hidden sm:block">
            <span
              className={cn(
                "font-serif text-lg font-bold transition-colors",
                scrolled ? "text-foreground" : "text-white"
              )}
            >
              Arshi Essentials
            </span>
          </div>
        </SmoothScrollLink>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <SmoothScrollLink
              key={item.href}
              href={item.href}
              className={navLinkClass()}
            >
              {item.label}
            </SmoothScrollLink>
          ))}
          <ThemeToggle variant={scrolled ? "default" : "light"} />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle variant={scrolled ? "default" : "light"} />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "rounded-lg p-2 transition-colors hover:bg-white/10",
              scrolled ? "text-foreground hover:bg-accent" : "text-white"
            )}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-border bg-background md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <SmoothScrollLink
                    href={item.href}
                    onClick={closeMenu}
                    className={navLinkClass(true)}
                  >
                    {item.label}
                  </SmoothScrollLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
