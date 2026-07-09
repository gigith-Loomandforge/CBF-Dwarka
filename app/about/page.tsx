import type { Metadata } from "next";
import Image from "next/image";
import { MobileMenu } from "../MobileMenu";

export const metadata: Metadata = {
  title: "About CBF Dwarka | Christian Believers Fellowship",
  description:
    "Learn about CBF Dwarka's history, vision, mission, core values, and doctrinal beliefs rooted in the historic Christian faith.",
  alternates: {
    canonical: "/about",
  },
};

const churchAddress = "Sector 22, Dwarka, Delhi, 110077";

const BookIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 32 32" className="about-value-icon">
    <path d="M8 7.5c3.7-.8 6.3-.1 8 2v16c-1.7-2.1-4.3-2.8-8-2V7.5Zm16 0c-3.7-.8-6.3-.1-8 2v16c1.7-2.1 4.3-2.8 8-2V7.5Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
);

const UsersIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 32 32" className="about-value-icon">
    <path d="M12.5 15.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 9.5c0-4.1-3.2-7-7-7s-7 2.9-7 7m15-10.5a3.4 3.4 0 1 0 0-6.8m3 16.8c0-2.9-1.6-5.2-4.1-6.3" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
  </svg>
);

const GlobeIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 32 32" className="about-value-icon">
    <circle cx="16" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 16h20M16 6c2.6 2.8 4 6.1 4 10s-1.4 7.2-4 10c-2.6-2.8-4-6.1-4-10s1.4-7.2 4-10Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
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

const valueCards = [
  {
    title: "Biblical Truth",
    body: "The Bible is our first authority in all matters of faith and practice.",
    icon: <BookIcon />,
  },
  {
    title: "Gospel Community",
    body: "We are joined together by our common devotion to Christ.",
    icon: <UsersIcon />,
  },
  {
    title: "Global Mission",
    body: "We aim to make the Gospel known locally and globally.",
    icon: <GlobeIcon />,
  },
];

const beliefItems = [
  {
    title: "God",
    body:
      "We believe the One who eternally exists in three persons - the Father, the Son and the Holy Spirit. God is one in divine essence and three in personhood. The three persons share equally in power, glory and perfection.",
  },
  {
    title: "Scripture",
    body:
      "We believe in the divine inspiration and authority of the Holy Scriptures, the Old and New Testaments, as the infallible Word of God. They are the ultimate and sufficient authority in matters of faith, doctrine, and Christian living.",
  },
  {
    title: "Salvation",
    body:
      "We believe in salvation by grace alone, through faith alone, in Jesus Christ alone. Salvation is a gift from God, not earned by human effort, but solely by God's grace and mercy.",
  },
  {
    title: "Sovereignty of God",
    body:
      "We affirm the sovereignty of God in all things. He governs and ordains all events according to His perfect will, working all things for the good of those who love Him.",
  },
  {
    title: "Total Depravity",
    body:
      "We believe in the fallen nature of humanity due to the effects of original sin. All humans are spiritually dead and incapable of saving themselves. Salvation is solely the work of God's grace.",
  },
  {
    title: "Atonement",
    body:
      "We affirm the substitutionary atonement of Jesus Christ on the cross. Through His sacrifice, Christ paid the penalty for our sins and reconciled us to God.",
  },
  {
    title: "The Holy Spirit",
    body:
      "We believe in the work of the Holy Spirit in the life of the believer. The Spirit convicts, regenerates, and sanctifies us, enabling us to live a life pleasing to God.",
  },
  {
    title: "The Church",
    body:
      "We affirm the importance of the church as the body of Christ, consisting of believers gathered together for worship, teaching, fellowship, and the proclamation of the Gospel. We uphold the administration of the sacraments of baptism and the Lord's Supper.",
  },
  {
    title: "Eschatology",
    body:
      "We believe in the blessed hope of Christ's second coming, the resurrection, and the final judgment. We eagerly await the eternal joy of the redeemed in God's presence. We embrace repentance, seeking God's mercy and trusting in His perfect justice for the final judgment.",
  },
  {
    title: "Priesthood of All Believers",
    body:
      "We affirm the priesthood of all believers, emphasizing the individual's direct access to God through Jesus Christ. All believers have the privilege and responsibility to serve and minister in accordance with their spiritual gifts and calling.",
  },
  {
    title: "Discipleship and Transformation",
    body:
      "We believe in the ongoing process of discipleship and spiritual transformation. Through the power of the Holy Spirit, believers are called to grow in Christlikeness, continually renewing their minds and conforming to the image of Christ.",
  },
  {
    title: "The Great Commission",
    body:
      "We embrace the mandate of the Great Commission as given by Jesus Christ to His disciples. We are called to proclaim the Gospel, make disciples of all nations, and teach them to observe all that Christ commanded.",
  },
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <header className="site-header about-header">
        <a className="logo about-logo" href="/" aria-label="CBF Dwarka home">
          <Image src="/assets/logo-figma.png" alt="CBF Dwarka" width={97} height={130} priority />
        </a>
        <nav className="nav about-nav" aria-label="Primary navigation">
          <a href="/">Home</a>
          <a className="active" href="/about">About</a>
          <a href="/#connect">Connect</a>
          <a href="/#sermons">Sermons</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="language about-language" href="/hi">हिन्दी</a>
        <MobileMenu />
      </header>

      <section className="about-history" aria-labelledby="about-history-title">
        <div className="about-history-copy">
          <p className="about-kicker">Our History</p>
          <h1 id="about-history-title">Reformed Tradition</h1>
          <p>
            Christian Believers Fellowship (CBF) began in July 2007 with eight believers gathering in a living room for worship. Rooted in Reformed tradition, CBF evolved into a bilingual church offering both English and Hindi services, providing a spiritual home for those seeking a deeper understanding of God's Word and a transformed way of living out their faith. Starting with a small group of families, CBF grew steadily, eventually relocating its gatherings to Mount Carmel School, Dwarka. With a commitment to biblical preaching, sacramental worship, and compassionate service, CBF remains a thriving community of faith, welcoming individuals to join in their pursuit of knowing God and making a meaningful impact in the world.
          </p>
        </div>
        <div className="about-image-placeholder">
          <span>Old Image<br />Placeholder</span>
        </div>
      </section>

      <section className="about-vision" aria-labelledby="about-vision-title">
        <div className="about-vision-inner">
          <div className="about-vision-grid">
            <article>
              <p className="about-kicker">Vision</p>
              <h2 id="about-vision-title">To Glorify God</h2>
              <span className="about-gold-rule" />
              <p>
                We believe that God alone deserves glory in all things in our life. We glorify God by submitting to the headship of Christ in everything we do (Eph 1:21-23) and by conforming to the image and likeness of Christ (Romans 8:29).
              </p>
            </article>
            <article>
              <p className="about-kicker">Mission</p>
              <h2>Christ-Centred Community</h2>
              <span className="about-gold-rule" />
              <p>
                Our mission is to bring glory to God by cultivating a Christ-centered community through the process of discipleship - gospel-centered life, gospel-centered worship, gospel-shaped community, and gospel-based multiplication.
              </p>
            </article>
          </div>
          <div className="about-scripture">
            <p className="about-kicker">Scripture</p>
            <p>Where there is no vision, the people perish - Proverbs 29:18.</p>
          </div>
        </div>
      </section>

      <section className="about-values" aria-labelledby="about-values-title">
        <div className="about-section-header about-centered">
          <p className="about-kicker">Core Values</p>
          <h2 id="about-values-title">Principles That Shape Us</h2>
          <p>Do everything in the name of the Lord Jesus, giving thanks to God the Father through him - Colossians 3:17.</p>
        </div>
        <div className="about-value-grid">
          {valueCards.map((card) => (
            <article className="about-value-card" key={card.title}>
              {card.icon}
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-beliefs" id="beliefs" aria-labelledby="about-beliefs-title">
        <div className="about-section-header">
          <p className="about-kicker">Our Beliefs</p>
          <h2 id="about-beliefs-title">What We Believe</h2>
          <p>Our doctrinal convictions based on the historic Christian faith.</p>
        </div>
        <div className="about-accordion">
          {beliefItems.map((item, index) => (
            <details className="about-accordion-item" key={item.title} open={index === 0}>
              <summary>
                <span className="about-accordion-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="about-accordion-title">{item.title}</span>
                <span className="about-accordion-icon" aria-hidden="true" />
              </summary>
              <div className="about-accordion-body">
                <p>{item.body}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <footer className="footer about-footer" id="contact">
        <div className="footer-top">
          <div className="footer-brand">
            <h2>CBF Dwarka</h2>
            <strong>Mount Carmel School</strong>
            <p>{churchAddress}</p>
          </div>
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <a href="mailto:enquiry@cbfdwarka.com">enquiry@cbfdwarka.com</a>
            <a href="tel:+919740277002">+91 97402 77002</a>
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
