import type { Metadata } from "next";
import { SiteHeader } from "../SiteHeader";

export const metadata: Metadata = {
  title: "Contact CBF Dwarka | Christian Believers Fellowship",
  description:
    "Contact Christian Believers Fellowship Dwarka for Sunday worship details, directions, prayer requests, and general questions.",
  alternates: {
    canonical: "/contact",
  },
};

const churchAddress = "Taekwondo room, Mount Carmel School, Sector 22, Dwarka";
const emailAddress = "cbfdwarka2021@gmail.com";
const phoneNumber = "+91 99108 00733";
const phoneHref = "tel:+919910800733";
const whatsappMessage = "Hello CBF Dwarka, I would like to know more about Sunday worship.";
const whatsappHref = `https://wa.me/919910800733?text=${encodeURIComponent(whatsappMessage)}`;
const directionsHref = "https://maps.app.goo.gl/vQjeCoeKBKhdb3vc7";

const MailIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 32 32" className="contact-icon">
    <path d="M6.5 9.5h19v13h-19v-13Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
    <path d="m7 10 9 7 9-7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
);

const PhoneIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 32 32" className="contact-icon">
    <path d="M11.2 6.8 14 12l-2.1 2.2c1.3 2.7 3.4 4.8 6.1 6.1l2.2-2.1 5.2 2.8c.5.3.7.8.6 1.4-.4 2.2-2.3 3.8-4.6 3.8C13 26.2 5.8 19 5.8 10.6c0-2.3 1.6-4.2 3.8-4.6.6-.1 1.1.1 1.6.8Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 32 32" className="contact-icon">
    <path d="M7.7 24.3 9 20.1a9.3 9.3 0 1 1 3.3 3.1l-4.6 1.1Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    <path d="M12.6 11.8c.2-.5.4-.6.7-.6h.5c.2 0 .4 0 .6.4l.9 2c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4-.1.6.5 1 1.4 1.9 2.4 2.4.3.2.5.1.7-.1l.8-.8c.2-.2.4-.2.7-.1l2 .9c.3.1.4.3.4.6v.5c0 .3-.1.6-.6.8-.5.3-1.6.8-3 .5-2.6-.5-5.4-3.1-6.2-5.7-.4-1.4.4-2.6.9-2.8Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
);

const MapIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 32 32" className="contact-icon">
    <path d="M16 28s8-7.3 8-15.1A8 8 0 0 0 8 12.9C8 20.7 16 28 16 28Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="16" cy="13" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const ClockIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 32 32" className="contact-icon">
    <circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 10v6l4 3" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
);

const InstagramIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.76 3.76 0 0 0 4 7.75v8.5A3.76 3.76 0 0 0 7.75 20h8.5A3.76 3.76 0 0 0 20 16.25v-8.5A3.76 3.76 0 0 0 16.25 4h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.15-2.35a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z"
      clipRule="evenodd"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
    <path
      fill="currentColor"
      d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h9.15v-7.74h-2.6v-3.02h2.6V9.01c0-2.58 1.58-3.99 3.88-3.99 1.1 0 2.04.08 2.32.12v2.69h-1.59c-1.25 0-1.49.6-1.49 1.47v1.94h2.98l-.39 3.02h-2.59V22h4.73a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2Z"
    />
  </svg>
);

const contactMethods = [
  {
    title: "Email",
    body: "For prayer, visits, ministry questions, and general enquiries.",
    value: emailAddress,
    href: `mailto:${emailAddress}`,
    icon: <MailIcon />,
  },
  {
    title: "Phone",
    body: "Call or message us for directions and Sunday worship details.",
    value: phoneNumber,
    href: phoneHref,
    icon: <PhoneIcon />,
  },
  {
    title: "WhatsApp",
    body: "Send a WhatsApp message for quick visit or direction related questions.",
    value: "WhatsApp Us",
    href: whatsappHref,
    icon: <WhatsAppIcon />,
  },
  {
    title: "Directions",
    body: "We meet at Taekwondo room, Mount Carmel School, Sector 22, Dwarka.",
    value: "Open Google Maps",
    href: directionsHref,
    icon: <MapIcon />,
  },
];

export default function ContactPage() {
  return (
    <main className="contact-page">
      <SiteHeader />

      <section className="contact-hero" aria-labelledby="contact-title">
        <div className="contact-hero-copy">
          <p className="about-kicker">Contact Us</p>
          <h1 id="contact-title">We would love to hear from you.</h1>
          <p>
            Whether you are planning your first visit, need directions, or want to get in touch with the church, reach out and someone from CBF Dwarka will respond.
          </p>
        </div>
        <aside className="contact-hero-card" aria-label="Sunday worship information">
          <ClockIcon />
          <span>Sunday Worship</span>
          <strong>Every Sunday<br />10:30 AM</strong>
          <p>{churchAddress}</p>
        </aside>
      </section>

      <section className="contact-methods" aria-label="Contact methods">
        {contactMethods.map((method) => (
          <a className="contact-method-card" href={method.href} key={method.title} target={method.title === "Directions" || method.title === "WhatsApp" ? "_blank" : undefined} rel={method.title === "Directions" || method.title === "WhatsApp" ? "noreferrer" : undefined}>
            {method.icon}
            <span>{method.title}</span>
            <h2>{method.value}</h2>
            <p>{method.body}</p>
          </a>
        ))}
      </section>

      <section className="contact-message" aria-labelledby="contact-message-title">
        <div>
          <p className="about-kicker">Send a Message</p>
          <h2 id="contact-message-title">Start with an email.</h2>
          <p>
            Share your name, contact number, and what you would like help with. For urgent visit-related questions, calling is usually faster.
          </p>
        </div>
        <div className="contact-message-actions">
          <a className="contact-primary" href={`mailto:${emailAddress}?subject=Contact%20CBF%20Dwarka`}>Email CBF Dwarka</a>
          <a className="contact-secondary" href={phoneHref}>Call the Church</a>
          <a className="contact-secondary" href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp Us</a>
        </div>
      </section>

      <footer className="footer contact-footer" id="contact">
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
            <div className="socials" aria-label="Social links">
              <a href="#" aria-label="Instagram"><InstagramIcon /></a>
              <a href="#" aria-label="Facebook"><FacebookIcon /></a>
            </div>
          </div>
          <p className="footer-note">The visuals and information shown are for representation purposes only and may be subject to change.</p>
        </div>
        <div className="footer-bottom">
          <p>© 2026 CBFDwarka. All rights reserved.</p>
          <p>Made with love by people at <a href="https://www.loomandforge.com/">Loom &amp; Forge</a></p>
          <nav aria-label="Legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
