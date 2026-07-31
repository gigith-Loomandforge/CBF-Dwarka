import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../SiteHeader";

export const metadata: Metadata = {
  title: "Accessibility | CBF Dwarka",
  description:
    "CBF Dwarka's commitment to making its website usable by people with different abilities, devices, and assistive technologies.",
  alternates: {
    canonical: "/accessibility",
  },
};

export default function AccessibilityPage() {
  return (
    <main className="legal-page" id="main-content">
      <SiteHeader />

      <section className="legal-hero" id="page-content" tabIndex={-1}>
        <p className="about-kicker">Accessibility</p>
        <h1>We want this website to be usable by everyone.</h1>
        <p>Last updated: July 30, 2026</p>
      </section>

      <section className="legal-content">
        <article>
          <h2>Our approach</h2>
          <p>
            CBF Dwarka aims to provide a website that works with keyboard navigation, screen readers, browser zoom, mobile devices, and common assistive technologies. We use semantic headings, labelled controls, visible focus states, alternative text, and responsive layouts.
          </p>
        </article>
        <article>
          <h2>Known limitations</h2>
          <p>
            Some content is provided by third parties, including YouTube video players, Google Maps, and linked social platforms. Their accessibility may be outside our control. Older images or video recordings may not yet include complete captions, transcripts, or descriptions.
          </p>
        </article>
        <article>
          <h2>Request an alternative</h2>
          <p>
            If information is difficult to access, email <a href="mailto:cbfdwarka2021@gmail.com?subject=Website%20accessibility">cbfdwarka2021@gmail.com</a> and tell us the page, content, and format you need. We will make a reasonable effort to provide the information another way.
          </p>
        </article>
        <article>
          <h2>Report a problem</h2>
          <p>
            Please include the page URL, device, browser, assistive technology if relevant, and a short description of the issue. This helps us investigate and improve the website.
          </p>
        </article>
      </section>

      <section className="legal-actions">
        <Link className="contact-secondary" href="/privacy">Privacy Policy</Link>
        <Link className="contact-secondary" href="/terms">Terms &amp; Conditions</Link>
        <Link className="contact-primary" href="/contact">Contact CBF Dwarka</Link>
      </section>
    </main>
  );
}
