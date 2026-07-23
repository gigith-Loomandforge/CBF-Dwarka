import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "../SiteHeader";
import { client } from "../../sanity/lib/client";
import { offsitePageQuery } from "../../sanity/lib/queries";
import { OffsiteRsvpForm } from "./OffsiteRsvpForm";

export const revalidate = 60;

type OffsiteContentSection = {
  heading?: string;
  text?: string;
};

type OffsitePageData = {
  _id?: string;
  title?: string;
  eyebrow?: string;
  summary?: string;
  dateTime?: string;
  scheduleLabel?: string;
  locationName?: string;
  locationAddress?: string;
  mapUrl?: string;
  rsvpEnabled?: boolean;
  rsvpTitle?: string;
  rsvpIntro?: string;
  metaTitle?: string;
  metaDescription?: string;
  body?: OffsiteContentSection[];
  heroImageUrl?: string;
  heroImageAlt?: string;
};

const fallbackOffsitePage: Required<Omit<OffsitePageData, "_id" | "dateTime" | "mapUrl" | "heroImageUrl" | "heroImageAlt">> & Pick<OffsitePageData, "_id" | "dateTime" | "mapUrl" | "heroImageUrl" | "heroImageAlt"> = {
  _id: undefined,
  title: "CBF Offsite",
  eyebrow: "Church Family Gathering",
  summary:
    "A dedicated time for the CBF Dwarka church family to gather, share fellowship, and spend meaningful time together outside the regular Sunday rhythm.",
  dateTime: undefined,
  scheduleLabel: "Schedule to be updated",
  locationName: "Location to be updated",
  locationAddress: "Please check this page again for the confirmed venue and travel details.",
  mapUrl: undefined,
  rsvpEnabled: true,
  rsvpTitle: "Confirm your attendance",
  rsvpIntro: "Add your details and include any family members who will attend with you.",
  metaTitle: "CBF Offsite | CBF Dwarka",
  metaDescription: "RSVP for the CBF Dwarka offsite gathering.",
  body: [
    {
      heading: "About the gathering",
      text: "This page is connected to Sanity Studio so the event details, image, location, and RSVP content can be updated by the team.",
    },
  ],
  heroImageUrl: undefined,
  heroImageAlt: undefined,
};

async function getOffsitePage() {
  if (!client) {
    return fallbackOffsitePage;
  }

  let page: OffsitePageData | null = null;

  try {
    page = await client.fetch<OffsitePageData | null>(offsitePageQuery);
  } catch {
    return fallbackOffsitePage;
  }

  return {
    ...fallbackOffsitePage,
    ...(page || {}),
    body: page?.body?.length ? page.body : fallbackOffsitePage.body,
  };
}

const formatEventDate = (dateTime?: string) => {
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
  const page = await getOffsitePage();

  return {
    title: page.metaTitle || `${page.title} | CBF Dwarka`,
    description: page.metaDescription || page.summary,
    alternates: {
      canonical: "/offsite",
    },
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDescription || page.summary,
      images: page.heroImageUrl ? [page.heroImageUrl] : undefined,
    },
  };
}

export default async function OffsitePage() {
  const page = await getOffsitePage();
  const formattedDate = formatEventDate(page.dateTime);
  const rsvpTitle = page.rsvpTitle || fallbackOffsitePage.rsvpTitle;
  const rsvpIntro = page.rsvpIntro || fallbackOffsitePage.rsvpIntro;

  return (
    <main className="offsite-page">
      <SiteHeader />

      <section className="offsite-hero" aria-labelledby="offsite-title">
        <div className="offsite-hero-copy">
          <p className="about-kicker">{page.eyebrow}</p>
          <h1 id="offsite-title">{page.title}</h1>
          <p>{page.summary}</p>
          <div className="offsite-hero-actions">
            {page.rsvpEnabled ? <a className="offsite-primary-button" href="#rsvp">RSVP Now</a> : null}
            {page.mapUrl ? (
              <a className="offsite-secondary-button" href={page.mapUrl} target="_blank" rel="noreferrer">
                View Location
              </a>
            ) : null}
          </div>
        </div>

        <div className="offsite-hero-media">
          {page.heroImageUrl ? (
            <Image
              alt={page.heroImageAlt || page.title || "CBF Dwarka offsite"}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              src={page.heroImageUrl}
            />
          ) : (
            <div className="offsite-image-fallback">
              <span>CBF Dwarka</span>
              <strong>Offsite</strong>
            </div>
          )}
        </div>
      </section>

      <section className="offsite-details" aria-label="Offsite details">
        <article>
          <span>When</span>
          <strong>{formattedDate || page.scheduleLabel}</strong>
          {formattedDate && page.scheduleLabel ? <p>{page.scheduleLabel}</p> : null}
        </article>
        <article>
          <span>Where</span>
          <strong>{page.locationName}</strong>
          <p>{page.locationAddress}</p>
        </article>
        <article>
          <span>RSVP</span>
          <strong>{page.rsvpEnabled ? "Open" : "Closed"}</strong>
          <p>Attendance details are stored privately for the CBF Dwarka team.</p>
        </article>
      </section>

      <section className="offsite-content" aria-label="Offsite information">
        {page.body.map((section, index) => (
          <article key={`${section.heading || "section"}-${index}`}>
            <h2>{section.heading}</h2>
            <p>{section.text}</p>
          </article>
        ))}
      </section>

      <section className="offsite-rsvp-section" id="rsvp" aria-labelledby="offsite-rsvp-title">
        {page.rsvpEnabled ? (
          <OffsiteRsvpForm eventId={page._id} intro={rsvpIntro} title={rsvpTitle} />
        ) : (
          <div className="offsite-rsvp-closed">
            <p className="about-kicker">RSVP</p>
            <h2 id="offsite-rsvp-title">RSVP is currently closed.</h2>
            <p>Please contact CBF Dwarka if you need help with this event.</p>
          </div>
        )}
      </section>

      <footer className="footer offsite-footer" id="contact">
        <div className="footer-top">
          <div className="footer-brand">
            <h2>CBF Dwarka</h2>
            <strong>Mount Carmel School</strong>
            <p>CBF Dwarka, Taekwondo Room, Mount Carmel School, Sector 22, Dwarka</p>
          </div>
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <a href="mailto:cbfdwarka2021@gmail.com">cbfdwarka2021@gmail.com</a>
            <a href="tel:+919910800733">+91 99108 00733</a>
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
