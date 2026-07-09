"use client";

import type { MouseEvent } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#connect", label: "Connect" },
  { href: "/#sermons", label: "Sermons" },
  { href: "#contact", label: "Contact" },
  { href: "/hi", label: "हिन्दी" },
];

export function MobileMenu() {
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
        {navItems.map((item) => (
          <a key={item.label} href={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
      </nav>
    </details>
  );
}
