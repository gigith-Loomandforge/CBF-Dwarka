import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "./SmoothScroll";
import { StructuredData } from "./StructuredData";
import { absoluteUrl, siteConfig } from "./site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "CBF Dwarka | Gospel-Centered Church in Dwarka, New Delhi",
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.fullName, url: siteConfig.url }],
  creator: siteConfig.fullName,
  publisher: siteConfig.fullName,
  category: "Church",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon.png", type: "image/png", sizes: "180x180" }],
    apple: [{ url: "/favicon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "CBF Dwarka | Gospel-Centered Church in Dwarka, New Delhi",
    description: siteConfig.description,
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    locale: "en_IN",
    images: [
      {
        url: "/assets/hero.png",
        width: 1920,
        height: 922,
        alt: "CBF Dwarka church family",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CBF Dwarka | Gospel-Centered Church in Dwarka, New Delhi",
    description: siteConfig.description,
    images: ["/assets/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationId = absoluteUrl("/#organization");
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.fullName,
        alternateName: siteConfig.name,
        url: siteConfig.url,
        logo: absoluteUrl("/assets/logo-resource-cropped.png"),
        foundingDate: siteConfig.foundingDate,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.streetAddress,
          addressLocality: siteConfig.address.addressLocality,
          addressRegion: siteConfig.address.addressRegion,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.addressCountry,
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "general enquiries",
          email: siteConfig.email,
          telephone: siteConfig.phone,
        },
        sameAs: [siteConfig.instagramUrl, siteConfig.youtubeUrl],
      },
      {
        "@type": "Church",
        "@id": absoluteUrl("/#church"),
        name: siteConfig.fullName,
        alternateName: siteConfig.name,
        url: siteConfig.url,
        image: absoluteUrl("/assets/hero.png"),
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.streetAddress,
          addressLocality: siteConfig.address.addressLocality,
          addressRegion: siteConfig.address.addressRegion,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        },
        hasMap: siteConfig.directionsUrl,
        sameAs: [siteConfig.instagramUrl, siteConfig.youtubeUrl],
        parentOrganization: { "@id": organizationId },
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en-IN",
        publisher: { "@id": organizationId },
      },
    ],
  };

  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body>
        <StructuredData data={structuredData} />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
