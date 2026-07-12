"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./MobileMenu";

const navItems = [
  { href: "/", label: "Home", path: "/" },
  { href: "/about", label: "About", path: "/about" },
  { href: "/connect", label: "Connect", path: "/connect" },
  { href: "/sermons", label: "Sermons", path: "/sermons" },
  { href: "/contact", label: "Contact", path: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link className="logo" href="/" aria-label="CBF Dwarka home">
        <Image src="/assets/logo-resource-cropped.png" alt="CBF Dwarka" width={139} height={127} priority />
      </Link>
      <nav className="nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const isActive = item.path ? pathname === item.path || pathname.startsWith(`${item.path}/`) : false;
          return (
            <Link key={item.label} className={isActive ? "active" : undefined} href={item.href} aria-current={isActive ? "page" : undefined}>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <Link className="language" href="/hi">हिन्दी</Link>
      <MobileMenu />
    </header>
  );
}
