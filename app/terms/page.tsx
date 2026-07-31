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
    <main className="legal-page" id="main-content">
      <SiteHeader />

      <section className="legal-hero" id="page-content" tabIndex={-1}>
        <p className="about-kicker">Terms &amp; Conditions</p>
        <h1>Terms for using the CBF Dwarka website.</h1>
        <p>Last updated: July 30, 2026</p>
      </section>

      <section className="legal-content">
        <article>
          <h2>About these terms</h2>
          <p>
            This website is operated by Christian Believers Fellowship Dwarka (&quot;CBF Dwarka&quot;, &quot;we&quot;, or &quot;us&quot;). By using the website or submitting an RSVP, you agree to these terms. If you do not agree, please do not submit information through the website.
          </p>
        </article>
        <article>
          <h2>Church and event information</h2>
          <p>
            The website provides church communication, worship details, sermons, events, directions, and community updates. We make reasonable efforts to keep this information accurate, but schedules, speakers, venues, transport, accommodation, and other event details may change. Confirm time-sensitive arrangements with CBF Dwarka before travelling.
          </p>
        </article>
        <article>
          <h2>RSVP submissions</h2>
          <p>
            Provide accurate and current attendee details. An RSVP records an intention to attend but does not create a commercial booking or guarantee accommodation, transport, meals, seating, or participation unless CBF Dwarka confirms those arrangements separately. Contact us promptly if attendee details or plans change.
          </p>
        </article>
        <article>
          <h2>Children and minors</h2>
          <p>
            A parent, guardian, or authorized adult should submit RSVP details for a child. By adding a child or another attendee, you confirm that you are authorized to provide their information for the event. Parents and guardians remain responsible for supervising children unless a specific ministry activity states otherwise.
          </p>
        </article>
        <article>
          <h2>Acceptable use</h2>
          <p>
            Do not interfere with the website, attempt unauthorized access, submit automated or excessive requests, impersonate another person, or submit false, harmful, abusive, unlawful, or unrelated content. We may block, remove, or disregard submissions that misuse the website.
          </p>
        </article>
        <article>
          <h2>Sermons and website content</h2>
          <p>
            Unless stated otherwise, website text, branding, photographs, graphics, and recordings belong to CBF Dwarka or are used with permission. You may share links for personal and ministry purposes. Do not reproduce, alter, sell, or republish substantial content without permission. Scripture quotations and third-party material remain subject to their respective rights.
          </p>
        </article>
        <article>
          <h2>External services and links</h2>
          <p>
            The website links to services such as YouTube, Instagram, WhatsApp, Google Maps, email providers, and other external websites. Their availability, content, and data practices are controlled by those providers. A link does not mean CBF Dwarka endorses every statement or service on an external page.
          </p>
        </article>
        <article>
          <h2>Availability and responsibility</h2>
          <p>
            We may change, suspend, or discontinue website features when necessary. To the extent permitted by law, CBF Dwarka is not responsible for indirect loss caused by reliance on outdated event information, third-party services, internet interruption, or unauthorized misuse of the website. Nothing in these terms excludes responsibility that cannot lawfully be excluded.
          </p>
        </article>
        <article>
          <h2>Privacy</h2>
          <p>
            Our <Link href="/privacy">Privacy Policy</Link> explains how RSVP and technical information is handled. It forms part of these terms when you submit an RSVP.
          </p>
        </article>
        <article>
          <h2>Changes and governing law</h2>
          <p>
            We may update these terms when website features or legal requirements change. The current version and update date will be shown here. These terms are governed by the laws of India, and disputes are subject to the courts with jurisdiction in New Delhi, Delhi.
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
        <Link className="contact-secondary" href="/accessibility">Accessibility</Link>
        <Link className="contact-primary" href="/contact">Contact CBF Dwarka</Link>
      </section>
    </main>
  );
}
