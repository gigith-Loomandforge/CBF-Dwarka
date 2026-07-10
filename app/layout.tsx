import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SmoothScroll } from "./SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL("https://cbfdwarka.com"),
  title: "CBF Dwarka | Gospel Centric Church in Dwarka, New Delhi",
  description:
    "Christian Believers Fellowship Dwarka is a Gospel centric church meeting in Dwarka, New Delhi for worship, community, discipleship, sermons, and events.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon.png", type: "image/png", sizes: "180x180" }],
    apple: [{ url: "/favicon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "CBF Dwarka",
    description:
      "A Gospel Centric Church in Dwarka, New Delhi. Join Sunday worship, explore sermons, and connect with the community.",
    type: "website",
    images: ["/assets/hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script id="scroll-state" strategy="beforeInteractive">
          {`(() => {
            const root = document.documentElement;
            const update = () => root.classList.toggle("is-scrolled", window.scrollY > 24);
            update();
            window.addEventListener("scroll", update, { passive: true });
          })();`}
        </Script>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
