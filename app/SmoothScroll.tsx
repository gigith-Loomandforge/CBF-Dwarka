"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/studio")) {
      return;
    }

    const root = document.documentElement;
    let lastScrollY = -1;
    const updateScrollState = () => {
      const scrollY = window.scrollY;
      if (scrollY === lastScrollY) {
        return;
      }
      lastScrollY = scrollY;
      root.classList.toggle("is-scrolled", scrollY > 24);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let frame = 0;

    if (!motionQuery.matches) {
      lenis = new Lenis({
        duration: 1,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        syncTouch: false,
      });

      lenis.on("scroll", updateScrollState);
    }

    const raf = (time: number) => {
      lenis?.raf(time);
      updateScrollState();
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      cancelAnimationFrame(frame);
      lenis?.destroy();
      root.classList.remove("is-scrolled");
    };
  }, [pathname]);

  return null;
}
