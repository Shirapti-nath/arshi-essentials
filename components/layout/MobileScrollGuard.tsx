"use client";

import { useEffect } from "react";

function hasExplicitHash(): boolean {
  const hash = window.location.hash;
  return Boolean(hash && hash !== "#");
}

function isPhoneViewport(): boolean {
  return window.matchMedia("(max-width: 767px)").matches;
}

/**
 * On Android/iOS, blocks unwanted auto-scroll to lower sections (e.g. reviews)
 * during the first moments after load. Allows scroll once the user touches the screen.
 */
export function MobileScrollGuard() {
  useEffect(() => {
    if (!isPhoneViewport() || hasExplicitHash()) return;

    let userTouched = false;
    const guardEndsAt = Date.now() + 3000;

    const allowScroll = () => {
      userTouched = true;
    };

    const resetIfUnwanted = () => {
      if (userTouched || hasExplicitHash() || Date.now() > guardEndsAt) return;
      if (window.scrollY > 0) {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    };

    document.addEventListener("touchstart", allowScroll, { passive: true });
    document.addEventListener("touchmove", allowScroll, { passive: true });
    document.addEventListener("wheel", allowScroll, { passive: true });
    window.addEventListener("scroll", resetIfUnwanted, { passive: true });
    window.addEventListener("pageshow", resetIfUnwanted);

    const timers = [0, 16, 50, 100, 200, 400, 800, 1200, 2000, 3000].map((ms) =>
      window.setTimeout(resetIfUnwanted, ms)
    );

    let frame = 0;
    const loop = () => {
      resetIfUnwanted();
      if (Date.now() < guardEndsAt) {
        frame = requestAnimationFrame(loop);
      }
    };
    frame = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("touchstart", allowScroll);
      document.removeEventListener("touchmove", allowScroll);
      document.removeEventListener("wheel", allowScroll);
      window.removeEventListener("scroll", resetIfUnwanted);
      window.removeEventListener("pageshow", resetIfUnwanted);
      timers.forEach((id) => window.clearTimeout(id));
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
