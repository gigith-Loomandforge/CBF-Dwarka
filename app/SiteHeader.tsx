"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./MobileMenu";

const navItems = [
  { href: "/", label: "Home", path: "/" },
  { href: "/about", label: "About", path: "/about" },
  { href: "/#connect", label: "Connect" },
  { href: "/#sermons", label: "Sermons" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const contactHref = pathname === "/" ? "/#contact" : "#contact";

  return (
    <header className="site-header">
      <a className="logo" href="/" aria-label="CBF Dwarka home">
        <Image src="/assets/logo-resource-cropped.png" alt="CBF Dwarka" width={139} height={127} priority />
      </a>
      <nav className="nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const isActive = item.path === pathname;
          return (
            <a key={item.label} className={isActive ? "active" : undefined} href={item.href} aria-current={isActive ? "page" : undefined}>
              {item.label}
            </a>
          );
        })}
        <a href={contactHref}>Contact</a>
      </nav>
      <a className="language" href="/hi">हिन्दी</a>
      <MobileMenu />
    </header>
  );
}
