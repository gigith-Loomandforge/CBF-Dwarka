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
    const updateScrollState = () => {
      root.classList.toggle("is-scrolled", window.scrollY > 24);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      root.classList.remove("is-scrolled");
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname?.startsWith("/studio")) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionQuery.matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      syncTouch: false,
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
