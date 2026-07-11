import type { Metadata } from "next";
import { SiteHeader } from "../SiteHeader";

export const metadata: Metadata = {
  title: "Connect | CBF Dwarka",
  description:
    "Plan a visit to CBF Dwarka, learn what happens on Sundays, and explore ministries, Bible studies, prayer groups, and annual gatherings.",
  alternates: {
    canonical: "/connect",
  },
};

const churchAddress = "CBF Dwarka, Taekwondo Room, Mount Carmel School, Sector 22, Dwarka";
const emailAddress = "cbfdwarka2021@gmail.com";
const phoneNumber = "+91 99108 00733";
const phoneHref = "tel:+919910800733";

const CalendarIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="connect-icon">
    <path d="M7 3v4m10-4v4M4.5 9.5h15M6.5 5.5h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
  </svg>
);

const MapPinIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="connect-icon">
    <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="9" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const ClockIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="connect-time-icon">
    <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
    <path d="M10 6v4l2.7 1.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
  </svg>
);

const gatheringCards = [
  {
    title: "Sunday Worship Service",
    body:
      "Join us every Sunday at 10:30 AM for congregational prayer and worship. We engage in heartfelt worship, receive biblically grounded messages, and cultivate spiritual growth as we seek to encounter God's presence and connect with fellow believers in faith.",
    image: "/assets/connect-sunday-worship.png",
  },
  {
    title: "Sunday School",
    body:
      "A vibrant and engaging experience for children and teens of all ages. We offer dedicated groups for toddlers, pre-schoolers, tweens, and teens. Held after the sermon, nurturing spiritual development in an age-appropriate setting.",
    image: "/assets/connect-sunday-school.png",
  },
  {
    title: "Fellowship Lunch",
    body:
      "A simple yet delicious potluck lunch immediately following the service. We encourage our faith family to bring home-cooked delights to share as we deepen our bonds and rejoice in the rich fellowship of being united in Christ.",
    image: "/assets/connect-fellowship-lunch.png",
  },
];

const ministryCards = [
  {
    title: "Hindi Bible Study",
    body: "Bible study conducted in Hindi for deeper understanding of the Word.",
    time: "Every Tuesday, 8:00 PM",
  },
  {
    title: "Bible Study",
    body: "In-depth study of Scripture with discussion and fellowship.",
    time: "Every Saturday, 6:30 PM",
  },
  {
    title: "Women's Ministry",
    body: "Women to grow in faith, share life, and support one another.",
    time: "Contact for Schedule",
  },
  {
    title: "Youth Ministry",
    body: "Equipping the next generation to live boldly for Christ.",
    time: "Sunday Afternoons",
  },
  {
    title: "Kids Ministry",
    body: "Fun and faith-filled programs for children to learn about Jesus.",
    time: "Every Sunday",
  },
  {
    title: "Prayer Ministry",
    body: "Interceding together for our church, community, and world.",
    time: "Daily at 6:00 AM Online",
  },
];

const annualEvents = [
  {
    title: "Christmas Service",
    image: "/assets/connect-christmas-service.png",
  },
  {
    title: "Easter Service",
    image: "/assets/connect-easter-service.png",
  },
  {
    title: "Thanksgiving Service",
    image: "/assets/connect-thanksgiving-service.png",
  },
  {
    title: "Church Offsite",
    image: "/assets/connect-church-offsite.png",
  },
];

export default function ConnectPage() {
  return (
    <main className="connect-page">
      <SiteHeader />

      <section className="connect-plan" aria-labelledby="connect-plan-title">
        <div className="connect-inner connect-plan-layout">
          <div className="connect-plan-copy">
            <h1 id="connect-plan-title">Plan a Visit</h1>
            <p>
              We'd love to welcome you this Sunday. Find out what to expect, where to go, and how to make the most of your first visit.
            </p>
          </div>

          <aside className="connect-visit-card" aria-label="Sunday visit details">
            <div className="connect-info-stack">
              <div className="connect-info-row">
                <CalendarIcon />
                <div>
                  <span>Day &amp; Time</span>
                  <strong>Every Sunday at 10:30 AM</strong>
                </div>
              </div>
              <div className="connect-info-row">
                <MapPinIcon />
                <div>
                  <span>Location</span>
                  <strong>{churchAddress}</strong>
                </div>
              </div>
            </div>
            <a className="connect-primary" href="/contact">Plan Your Visit</a>
          </aside>
        </div>
      </section>

      <section className="connect-section" aria-labelledby="sunday-gathering-title">
        <div className="connect-inner">
          <h2 id="sunday-gathering-title">Sunday Gathering</h2>
          <div className="connect-gathering-grid">
            {gatheringCards.map((card) => (
              <article className="connect-gathering-card" key={card.title}>
                <img src={card.image} alt="" width={357} height={200} loading="lazy" />
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="connect-section connect-section-muted" aria-labelledby="ministries-title">
        <div className="connect-inner">
          <div className="connect-section-header">
            <h2 id="ministries-title">Ministries</h2>
            <p>Explore opportunities to connect and grow through involvement in Bible studies, prayer groups, and community gatherings.</p>
          </div>
          <div className="connect-ministry-grid">
            {ministryCards.map((card) => (
              <article className="connect-ministry-card" key={card.title}>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
                <span><ClockIcon />{card.time}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="connect-section" aria-labelledby="annual-events-title">
        <div className="connect-inner">
          <div className="connect-section-header">
            <h2 id="annual-events-title">Annual Events</h2>
            <p>Special gatherings that mark the seasons of our faith journey.</p>
          </div>
          <div className="connect-annual-grid">
            {annualEvents.map((event) => (
              <article className="connect-annual-card" key={event.title}>
                <img src={event.image} alt="" width={265} height={331} loading="lazy" />
                <h3>{event.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer connect-footer" id="contact">
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
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
