import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "../SiteHeader";
import { client } from "../../sanity/lib/client";
import { christmasServicePageQuery } from "../../sanity/lib/queries";

export const revalidate = 60;

type ChristmasServiceDetail = {
  label?: string;
  value?: string;
  description?: string;
};

type ChristmasServiceSection = {
  heading?: string;
  text?: string;
};

type ChristmasServicePageData = {
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
  details?: ChristmasServiceDetail[];
  body?: ChristmasServiceSection[];
  heroImageUrl?: string;
  heroImageAlt?: string;
};

const churchAddress = "CBF Dwarka, Taekwondo Room, Mount Carmel School, Sector 22, Dwarka";
const emailAddress = "cbfdwarka2021@gmail.com";
const phoneNumber = "+91 99108 00733";
const phoneHref = "tel:+919910800733";

const fallbackChristmasServicePage: Required<Omit<ChristmasServicePageData, "_id" | "serviceDateTime" | "mapUrl" | "heroImageUrl" | "heroImageAlt">> & Pick<ChristmasServicePageData, "_id" | "serviceDateTime" | "mapUrl" | "heroImageUrl" | "heroImageAlt"> = {
  _id: undefined,
  title: "Christmas Service",
  eyebrow: "Christmas Celebration",
  summary:
    "Join CBF Dwarka for Christmas Service as we gather to worship Jesus Christ and remember the joy, hope, and peace of his coming.",
  serviceDateTime: undefined,
  scheduleLabel: "Christmas Service at 10:30 AM",
  locationName: "Mount Carmel School",
  locationAddress: churchAddress,
  mapUrl: "https://maps.app.goo.gl/JpFGJdPFxPP77a5u7?g_st=ic",
  metaTitle: "Christmas Service | CBF Dwarka",
  metaDescription: "Join CBF Dwarka for Christmas Service in Dwarka, New Delhi.",
  details: [
    {
      label: "When",
      value: "Christmas Service",
      description: "Service time and confirmed date can be updated in Sanity Studio.",
    },
    {
      label: "Where",
      value: "Mount Carmel School",
      description: churchAddress,
    },
    {
      label: "Service",
      value: "Carols, Worship & Word",
      description: "A Gospel-centered Christmas gathering for the church family and visitors.",
    },
  ],
  body: [
    {
      heading: "What to expect",
      text:
        "The Christmas gathering includes worship, carols, prayer, Scripture reading, and a message centered on the good news of Jesus Christ.",
    },
    {
      heading: "For visitors and families",
      text:
        "You are welcome to join us whether you regularly attend CBF Dwarka or are visiting for the first time. Service details can be updated here by the team as Christmas approaches.",
    },
  ],
  heroImageUrl: undefined,
  heroImageAlt: undefined,
};

async function getChristmasServicePage() {
  if (!client) {
    return fallbackChristmasServicePage;
  }

  let page: ChristmasServicePageData | null = null;

  try {
    page = await client.fetch<ChristmasServicePageData | null>(christmasServicePageQuery);
  } catch {
    return fallbackChristmasServicePage;
  }

  return {
    ...fallbackChristmasServicePage,
    ...(page || {}),
    details: page?.details?.length ? page.details : fallbackChristmasServicePage.details,
    body: page?.body?.length ? page.body : fallbackChristmasServicePage.body,
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
  const page = await getChristmasServicePage();

  return {
    title: page.metaTitle || `${page.title} | CBF Dwarka`,
    description: page.metaDescription || page.summary,
    alternates: {
      canonical: "/christmas-service",
    },
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDescription || page.summary,
      images: page.heroImageUrl ? [page.heroImageUrl] : ["/assets/connect-christmas-service.png"],
    },
  };
}

export default async function ChristmasServicePage() {
  const page = await getChristmasServicePage();
  const formattedDate = formatServiceDate(page.serviceDateTime);
  const heroImage = page.heroImageUrl || "/assets/connect-christmas-service.png";

  return (
    <main className="offsite-page christmas-service-page">
      <SiteHeader />

      <section className="offsite-hero christmas-service-hero" aria-labelledby="christmas-service-title">
        <div className="offsite-hero-copy">
          <p className="about-kicker">{page.eyebrow}</p>
          <h1 id="christmas-service-title">{page.title}</h1>
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

        <div className="offsite-hero-media christmas-service-media">
          <Image
            alt={page.heroImageAlt || page.title || "CBF Dwarka Christmas Service"}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
            src={heroImage}
          />
        </div>
      </section>

      <section className="offsite-details christmas-service-details" aria-label="Christmas service details">
        {page.details.map((detail, index) => (
          <article key={`${detail.label || "detail"}-${index}`}>
            <span>{detail.label}</span>
            <strong>{index === 0 && formattedDate ? formattedDate : detail.value}</strong>
            {index === 0 && formattedDate && page.scheduleLabel ? <p>{page.scheduleLabel}</p> : <p>{detail.description}</p>}
          </article>
        ))}
      </section>

      <section className="offsite-content" aria-label="Christmas service information">
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
