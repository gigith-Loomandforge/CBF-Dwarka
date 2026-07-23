import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../SiteHeader";

export const metadata: Metadata = {
  title: "Terms & Conditions | CBF Dwarka",
  description: "Terms for using the CBF Dwarka website and submitting event RSVPs.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <SiteHeader />

      <section className="legal-hero">
        <p className="about-kicker">Terms &amp; Conditions</p>
        <h1>Terms for using the CBF Dwarka website.</h1>
        <p>Last updated: July 23, 2026</p>
      </section>

      <section className="legal-content">
        <article>
          <h2>Website information</h2>
          <p>
            The information on this website is provided for church communication, worship details, events, and community updates. Event timings, venues, and other details may change.
          </p>
        </article>
        <article>
          <h2>RSVP submissions</h2>
          <p>
            When you submit an RSVP, please provide accurate attendee details. If you add family members or other attendees, make sure you have their permission to share their information for event planning.
          </p>
        </article>
        <article>
          <h2>Children and minors</h2>
          <p>
            A parent, guardian, or responsible adult should submit RSVP details for children or minors attending with them.
          </p>
        </article>
        <article>
          <h2>Acceptable use</h2>
          <p>
            Do not use website forms to submit false, harmful, abusive, or unrelated content. CBF Dwarka may remove or disregard submissions that misuse the website.
          </p>
        </article>
        <article>
          <h2>Contact</h2>
          <p>
            For questions about these terms, email <a href="mailto:cbfdwarka2021@gmail.com">cbfdwarka2021@gmail.com</a>.
          </p>
        </article>
      </section>

      <section className="legal-actions">
        <Link className="contact-secondary" href="/privacy">Privacy Policy</Link>
        <Link className="contact-primary" href="/contact">Contact CBF Dwarka</Link>
      </section>
    </main>
  );
}
