"use client";

import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", path: "/" },
  { href: "/about", label: "About", path: "/about" },
  { href: "/#connect", label: "Connect" },
  { href: "/#sermons", label: "Sermons" },
  { href: "/hi", label: "हिन्दी" },
];

export function MobileMenu() {
  const pathname = usePathname();
  const contactHref = pathname === "/" ? "/#contact" : "#contact";

  const closeMenu = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.closest("details")?.removeAttribute("open");
  };

  return (
    <details className="mobile-menu">
      <summary className="mobile-menu-button" aria-label="Navigation menu">
        <span />
        <span />
        <span />
      </summary>
      <nav id="mobile-navigation" className="mobile-menu-panel" aria-label="Mobile navigation">
        {navItems.map((item) => {
          const isActive = item.path === pathname;
          return (
            <a key={item.label} className={isActive ? "active" : undefined} href={item.href} aria-current={isActive ? "page" : undefined} onClick={closeMenu}>
              {item.label}
            </a>
          );
        })}
        <a href={contactHref} onClick={closeMenu}>Contact</a>
      </nav>
    </details>
  );
}
