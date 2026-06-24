"use client";

import { useEffect } from "react";
import { getSectionIdFromHash, scrollToSection } from "@/lib/scroll";

function hasExplicitHash(): boolean {
  const hash = window.location.hash;
  return Boolean(hash && hash !== "#");
}

/** Keeps mobile visitors at the hero on fresh load; handles hash links safely. */
export function HashScrollManager() {
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

    forceTop();
    requestAnimationFrame(forceTop);

    const timers = [0, 50, 150, 400, 800].map((ms) =>
      window.setTimeout(forceTop, ms)
    );

    const onLoad = () => forceTop();
    const onPageShow = () => forceTop();

    window.addEventListener("load", onLoad);
    window.addEventListener("pageshow", onPageShow);

    const initialTimer = window.setTimeout(() => scrollToHash("auto"), 100);

    const onNavigate = () => scrollToHash("smooth");

    window.addEventListener("popstate", onNavigate);
    window.addEventListener("hashchange", onNavigate);

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      window.clearTimeout(initialTimer);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("popstate", onNavigate);
      window.removeEventListener("hashchange", onNavigate);
    };
  }, []);

  return null;
}
