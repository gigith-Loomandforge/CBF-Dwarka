import Link from "next/link";
import { SiteHeader } from "./SiteHeader";

export default function NotFound() {
  return (
    <main className="legal-page" id="main-content">
      <SiteHeader />

      <section className="legal-hero" id="page-content" tabIndex={-1}>
        <p className="about-kicker">Page Not Found</p>
        <h1>We could not find the page you requested.</h1>
        <p>The link may be outdated, or the page may have moved.</p>
      </section>

      <section className="legal-actions">
        <Link className="contact-secondary" href="/contact">Contact CBF Dwarka</Link>
        <Link className="contact-primary" href="/">Return Home</Link>
      </section>
    </main>
  );
}
