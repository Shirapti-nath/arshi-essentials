"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getSectionIdFromHash, scrollToSection } from "@/lib/scroll";
import { isHomePath } from "@/lib/navigation";

function hasExplicitHash(): boolean {
  const hash = window.location.hash;
  return Boolean(hash && hash !== "#");
}

/** Keeps mobile visitors at the hero on fresh load; handles hash links safely. */
export function HashScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const forceTop = () => {
      if (hasExplicitHash()) return;
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    const scrollToHash = (behavior: ScrollBehavior = "auto") => {
      if (!hasExplicitHash()) {
        forceTop();
        return;
      }

      const sectionId = getSectionIdFromHash(window.location.hash);
      if (sectionId) {
        scrollToSection(sectionId, behavior);
      }
    };

    if (isHomePath(pathname)) {
      if (hasExplicitHash()) {
        const timers = [0, 100, 300, 600].map((ms) =>
          window.setTimeout(() => scrollToHash(ms === 0 ? "auto" : "smooth"), ms)
        );
        return () => timers.forEach((id) => window.clearTimeout(id));
      }

      forceTop();
      const timers = [0, 50, 150, 400, 800].map((ms) =>
        window.setTimeout(forceTop, ms)
      );
      return () => timers.forEach((id) => window.clearTimeout(id));
    }

    return undefined;
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      if (!isHomePath(window.location.pathname)) return;
      const sectionId = getSectionIdFromHash(window.location.hash);
      if (sectionId) scrollToSection(sectionId, "smooth");
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
