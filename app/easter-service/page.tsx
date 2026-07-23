import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "../SiteHeader";
import { client } from "../../sanity/lib/client";
import { easterServicePageQuery } from "../../sanity/lib/queries";

export const revalidate = 60;

type EasterServiceDetail = {
  label?: string;
  value?: string;
  description?: string;
};

type EasterServiceSection = {
  heading?: string;
  text?: string;
};

type EasterServicePageData = {
  _id?: string;
  title?: string;
  eyebrow?: string;
  summary?: string;
  serviceDateTime?: string;
  scheduleLabel?: string;
  locationName?: string;
  locationAddress?: string;
  mapUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  details?: EasterServiceDetail[];
  body?: EasterServiceSection[];
  heroImageUrl?: string;
  heroImageAlt?: string;
};

const churchAddress = "CBF Dwarka, Taekwondo Room, Mount Carmel School, Sector 22, Dwarka";
const emailAddress = "cbfdwarka2021@gmail.com";
const phoneNumber = "+91 99108 00733";
const phoneHref = "tel:+919910800733";

const fallbackEasterServicePage: Required<Omit<EasterServicePageData, "_id" | "serviceDateTime" | "mapUrl" | "heroImageUrl" | "heroImageAlt">> & Pick<EasterServicePageData, "_id" | "serviceDateTime" | "mapUrl" | "heroImageUrl" | "heroImageAlt"> = {
  _id: undefined,
  title: "Easter Service",
  eyebrow: "Resurrection Sunday",
  summary:
    "Join CBF Dwarka for Easter Service as we celebrate the resurrection of Jesus Christ through worship, prayer, Scripture, and fellowship.",
  serviceDateTime: undefined,
  scheduleLabel: "Easter Sunday at 10:30 AM",
  locationName: "Mount Carmel School",
  locationAddress: churchAddress,
  mapUrl: "https://maps.app.goo.gl/JpFGJdPFxPP77a5u7?g_st=ic",
  metaTitle: "Easter Service | CBF Dwarka",
  metaDescription: "Join CBF Dwarka for Easter Service in Dwarka, New Delhi.",
  details: [
    {
      label: "When",
      value: "Easter Sunday",
      description: "Service time and confirmed date can be updated in Sanity Studio.",
    },
    {
      label: "Where",
      value: "Mount Carmel School",
      description: churchAddress,
    },
    {
      label: "Service",
      value: "Worship & Word",
      description: "A Gospel-centered gathering focused on the hope of Christ's resurrection.",
    },
  ],
  body: [
    {
      heading: "What to expect",
      text:
        "The Easter gathering includes worship, prayer, Scripture reading, and a biblically grounded message centered on the resurrection of Jesus Christ.",
    },
    {
      heading: "For visitors and families",
      text:
        "You are welcome to join us whether you regularly attend CBF Dwarka or are visiting for the first time. Service details can be updated here by the team as the date approaches.",
    },
  ],
  heroImageUrl: undefined,
  heroImageAlt: undefined,
};

async function getEasterServicePage() {
  if (!client) {
    return fallbackEasterServicePage;
  }

  let page: EasterServicePageData | null = null;

  try {
    page = await client.fetch<EasterServicePageData | null>(easterServicePageQuery);
  } catch {
    return fallbackEasterServicePage;
  }

  return {
    ...fallbackEasterServicePage,
    ...(page || {}),
    details: page?.details?.length ? page.details : fallbackEasterServicePage.details,
    body: page?.body?.length ? page.body : fallbackEasterServicePage.body,
  };
}

const formatServiceDate = (dateTime?: string) => {
  if (!dateTime) {
    return null;
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(dateTime));
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getEasterServicePage();

  return {
    title: page.metaTitle || `${page.title} | CBF Dwarka`,
    description: page.metaDescription || page.summary,
    alternates: {
      canonical: "/easter-service",
    },
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDescription || page.summary,
      images: page.heroImageUrl ? [page.heroImageUrl] : ["/assets/connect-easter-service.png"],
    },
  };
}

export default async function EasterServicePage() {
  const page = await getEasterServicePage();
  const formattedDate = formatServiceDate(page.serviceDateTime);
  const heroImage = page.heroImageUrl || "/assets/connect-easter-service.png";

  return (
    <main className="offsite-page easter-service-page">
      <SiteHeader />

      <section className="offsite-hero easter-service-hero" aria-labelledby="easter-service-title">
        <div className="offsite-hero-copy">
          <p className="about-kicker">{page.eyebrow}</p>
          <h1 id="easter-service-title">{page.title}</h1>
          <p>{page.summary}</p>
          <div className="offsite-hero-actions">
            {page.mapUrl ? (
              <a className="offsite-primary-button" href={page.mapUrl} target="_blank" rel="noreferrer">
                Get Directions
              </a>
            ) : null}
            <Link className="offsite-secondary-button" href="/connect#annual-events-title">Back to Annual Events</Link>
          </div>
        </div>

        <div className="offsite-hero-media easter-service-media">
          <Image
            alt={page.heroImageAlt || page.title || "CBF Dwarka Easter Service"}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
            src={heroImage}
          />
          <div className="easter-light" aria-hidden="true" />
        </div>
      </section>

      <section className="offsite-details easter-service-details" aria-label="Easter service details">
        {page.details.map((detail, index) => (
          <article key={`${detail.label || "detail"}-${index}`}>
            <span>{detail.label}</span>
            <strong>{index === 0 && formattedDate ? formattedDate : detail.value}</strong>
            {index === 0 && formattedDate && page.scheduleLabel ? <p>{page.scheduleLabel}</p> : <p>{detail.description}</p>}
          </article>
        ))}
      </section>

      <section className="offsite-content" aria-label="Easter service information">
        {page.body.map((section, index) => (
          <article key={`${section.heading || "section"}-${index}`}>
            <h2>{section.heading}</h2>
            <p>{section.text}</p>
          </article>
        ))}
      </section>

      <footer className="footer offsite-footer" id="contact">
        <div className="footer-top">
          <div className="footer-brand">
            <h2>CBF Dwarka</h2>
            <strong>Mount Carmel School</strong>
            <p>{churchAddress}</p>
          </div>
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
            <a href={phoneHref}>{phoneNumber}</a>
          </div>
          <p className="footer-note">The visuals and information shown are for representation purposes only and may be subject to change.</p>
        </div>
        <div className="footer-bottom">
          <p>© 2026 CBFDwarka. All rights reserved.</p>
          <p>Made with love by people at <a href="https://www.loomandforge.com/">Loom &amp; Forge</a></p>
          <nav aria-label="Legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
