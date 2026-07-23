import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../SiteHeader";

export const metadata: Metadata = {
  title: "Privacy Policy | CBF Dwarka",
  description: "How CBF Dwarka collects and uses information shared through website forms and event RSVPs.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <SiteHeader />

      <section className="legal-hero">
        <p className="about-kicker">Privacy Policy</p>
        <h1>How we handle information shared with CBF Dwarka.</h1>
        <p>Last updated: July 23, 2026</p>
      </section>

      <section className="legal-content">
        <article>
          <h2>Information we collect</h2>
          <p>
            Website forms may collect your name, age, email address, phone number, message, RSVP status, and the names and ages of additional members you add for an event.
          </p>
        </article>
        <article>
          <h2>How we use it</h2>
          <p>
            We use this information to respond to enquiries, plan church events, confirm attendance, coordinate logistics, and communicate relevant updates from CBF Dwarka.
          </p>
        </article>
        <article>
          <h2>Where it is stored</h2>
          <p>
            Event RSVP information is stored in Sanity Studio for access by the CBF Dwarka team. Ages and complete RSVP details are not displayed publicly on the website.
          </p>
        </article>
        <article>
          <h2>Sharing</h2>
          <p>
            We do not sell personal information. We may share details only with people helping CBF Dwarka organize the relevant ministry activity or event.
          </p>
        </article>
        <article>
          <h2>Contact</h2>
          <p>
            For privacy questions or correction requests, email <a href="mailto:cbfdwarka2021@gmail.com">cbfdwarka2021@gmail.com</a>.
          </p>
        </article>
      </section>

      <section className="legal-actions">
        <Link className="contact-secondary" href="/terms">Terms &amp; Conditions</Link>
        <Link className="contact-primary" href="/contact">Contact CBF Dwarka</Link>
      </section>
    </main>
  );
}
