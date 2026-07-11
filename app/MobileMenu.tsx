"use client";

import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", path: "/" },
  { href: "/about", label: "About", path: "/about" },
  { href: "/connect", label: "Connect", path: "/connect" },
  { href: "/sermons", label: "Sermons", path: "/sermons" },
  { href: "/contact", label: "Contact", path: "/contact" },
  { href: "/hi", label: "हिन्दी" },
];

export function MobileMenu() {
  const pathname = usePathname();

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
          const isActive = item.path ? pathname === item.path || pathname.startsWith(`${item.path}/`) : false;
          return (
            <a key={item.label} className={isActive ? "active" : undefined} href={item.href} aria-current={isActive ? "page" : undefined} onClick={closeMenu}>
              {item.label}
            </a>
          );
        })}
      </nav>
    </details>
  );
}
