import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../SiteHeader";

export const metadata: Metadata = {
  title: "Privacy Policy | CBF Dwarka",
  description:
    "How Christian Believers Fellowship Dwarka collects, uses, stores, and protects personal information shared through event RSVPs and website contact links.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page" id="main-content">
      <SiteHeader />

      <section className="legal-hero" id="page-content" tabIndex={-1}>
        <p className="about-kicker">Privacy Policy</p>
        <h1>How we handle information shared with CBF Dwarka.</h1>
        <p>Last updated: July 30, 2026</p>
      </section>

      <section className="legal-content">
        <article>
          <h2>Who is responsible for your information</h2>
          <p>
            Christian Believers Fellowship Dwarka (&quot;CBF Dwarka&quot;, &quot;we&quot;, or &quot;us&quot;) determines why and how personal information submitted through this website is used. Our ministry team can be contacted at <a href="mailto:cbfdwarka2021@gmail.com">cbfdwarka2021@gmail.com</a>.
          </p>
        </article>
        <article>
          <h2>Information collected through RSVP forms</h2>
          <p>
            When you submit an event RSVP, we collect the primary attendee&apos;s name and age, the names and ages of any additional attendees you add, the event and year, party size, submission date, and a record that the privacy notice and terms were accepted. Because the RSVP is for a CBF Dwarka event, the record may also indicate participation in a church gathering.
          </p>
        </article>
        <article>
          <h2>Why we use RSVP information</h2>
          <p>
            We use RSVP information only to estimate attendance, plan age-appropriate arrangements, coordinate accommodation, meals, transport or other event logistics, and contact attendees when an event-related update is necessary. We do not publish attendee names or ages on this website and we do not sell personal information.
          </p>
        </article>
        <article>
          <h2>Consent and your choices</h2>
          <p>
            RSVP information is processed with the consent you give when submitting the form. You may withdraw that consent, correct information, or ask us to delete an RSVP by emailing us. Withdrawing consent does not affect processing already completed before the request, and it may mean we cannot retain your attendance registration.
          </p>
        </article>
        <article>
          <h2>Children and additional attendees</h2>
          <p>
            An adult should submit information for a child. By adding another person, you confirm that you are authorized to provide their information and, for a child, that you are their parent, guardian, or an adult authorized by them. Please do not submit information that is not needed for event planning.
          </p>
        </article>
        <article>
          <h2>Storage and service providers</h2>
          <p>
            RSVP information is sent through our Vercel-hosted website and stored in private Google Sheets controlled by CBF Dwarka. Google Apps Script processes each submission. Sanity stores public website and event content but is not used to store RSVP attendee details. Authorized ministry team members and service providers supporting the website may process information only for these purposes. These providers may process data outside India subject to their security and contractual safeguards.
          </p>
        </article>
        <article>
          <h2>Website logs, external links, and video</h2>
          <p>
            Our hosting provider may process technical request information such as an IP address, browser, device, requested page, and timestamp for security, reliability, and diagnostics. We do not currently use advertising cookies. Sermons use YouTube&apos;s privacy-enhanced embedded player, and YouTube may process information when the player loads or you interact with it. Email, WhatsApp, Google Maps, Instagram, YouTube, and other external links are governed by the relevant provider&apos;s privacy terms.
          </p>
        </article>
        <article>
          <h2>Retention</h2>
          <p>
            RSVP records are organized by event and year. We keep them only while reasonably needed for event administration, follow-up, security, or applicable record-keeping obligations. The ministry team reviews event sheets after the event and should delete or anonymize names and ages that are no longer needed. You may request earlier deletion at any time.
          </p>
        </article>
        <article>
          <h2>Security and data incidents</h2>
          <p>
            We limit access to attendee sheets to authorized team members and use access controls provided by our hosting and storage providers. No method of transmission or storage is completely secure. If we identify a personal-data incident, we will assess it, contain it, and provide notifications where required by applicable law.
          </p>
        </article>
        <article>
          <h2>Your requests and concerns</h2>
          <p>
            You may ask what RSVP information we hold about you, request a correction or deletion, withdraw consent, or raise a concern. Email <a href="mailto:cbfdwarka2021@gmail.com?subject=Privacy%20request">cbfdwarka2021@gmail.com</a> with the event name, year, and attendee name so we can locate the record. We may ask for reasonable verification before acting on a request.
          </p>
        </article>
        <article>
          <h2>Changes to this policy</h2>
          <p>
            We may update this policy when our website, service providers, or legal obligations change. The current version and its update date will remain available on this page.
          </p>
        </article>
      </section>

      <section className="legal-actions">
        <Link className="contact-secondary" href="/terms">Terms &amp; Conditions</Link>
        <Link className="contact-secondary" href="/accessibility">Accessibility</Link>
        <Link className="contact-primary" href="/contact">Contact CBF Dwarka</Link>
      </section>
    </main>
  );
}
