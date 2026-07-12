import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "./SiteHeader";
import { getFeaturedSermons } from "./sermons/sermon-data";
import { client } from "../sanity/lib/client";
import { homepageQuery } from "../sanity/lib/queries";

export const revalidate = 300;

const Arrow = ({ dark = false }: { dark?: boolean }) => (
  <svg aria-hidden="true" viewBox="0 0 34 16" className="arrow-icon">
    <path
      d="M1 8h30m-7-7 8 7-8 7"
      fill="none"
      stroke={dark ? "#1b1b1b" : "currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const SmallArrow = () => (
  <svg aria-hidden="true" viewBox="0 0 18 18" className="small-arrow">
    <path d="M4 9h10m-4-4 4 4-4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
  </svg>
);

const BookIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 28 28" className="card-icon">
    <path d="M5 6.5c3.4-.8 5.9-.2 9 2v14c-3.1-2.2-5.6-2.8-9-2V6.5Zm18 0c-3.4-.8-5.9-.2-9 2v14c3.1-2.2 5.6-2.8 9-2V6.5Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
);

const MapIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 28 28" className="card-icon">
    <path d="M14 24s7-6.2 7-13a7 7 0 0 0-14 0c0 6.8 7 13 7 13Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="14" cy="11" r="2.7" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const CalendarIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 28 28" className="card-icon">
    <path d="M7 6h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm2-3v5m10-5v5M5 11h18" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
);

const UpRight = () => (
  <svg aria-hidden="true" viewBox="0 0 18 18" className="up-right">
    <path d="M5 13 13 5m-6 0h6v6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
  </svg>
);

const LocationPin = () => (
  <svg aria-hidden="true" viewBox="0 0 70 90" className="pin" focusable="false">
    <path d="M35 85S62 55.6 62 32.3C62 16 50.3 5 35 5S8 16 8 32.3C8 55.6 35 85 35 85Z" fill="#f33126" />
    <circle cx="35" cy="30" r="8" fill="#fff" />
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

const churchAddress = "CBF Dwarka, Taekwondo Room, Mount Carmel School, Sector 22, Dwarka";
const eventTimeZone = "Asia/Kolkata";
const maxHomepageEvents = 3;

const weekdayIndexes = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
} as const;

type WeekdayKey = keyof typeof weekdayIndexes;

const weekdayLabels: Record<WeekdayKey, { short: string; long: string }> = {
  sunday: { short: "Sun", long: "Sunday" },
  monday: { short: "Mon", long: "Monday" },
  tuesday: { short: "Tue", long: "Tuesday" },
  wednesday: { short: "Wed", long: "Wednesday" },
  thursday: { short: "Thu", long: "Thursday" },
  friday: { short: "Fri", long: "Friday" },
  saturday: { short: "Sat", long: "Saturday" },
};

const featureCards = [
  {
    title: "What We Believe",
    body: "We are rooted in the Gospel of Jesus Christ. Discover the core beliefs and doctrines that shape our faith and community.",
    action: "Explore Our Beliefs",
    icon: <BookIcon />,
  },
  {
    title: "Plan a Visit",
    body: "We'd love to welcome you this Sunday. Find out what to expect, where to go, and how to make the most of your first visit.",
    action: "Plan Your Visit",
    icon: <MapIcon />,
  },
  {
    title: "Upcoming Events",
    body: "",
    action: "See All Events",
    icon: <CalendarIcon />,
  },
];

type ChurchEvent = {
  time: string;
  title: string;
  body: string;
  href: string;
  ctaLabel: string;
  homepageDateLabel: string;
  homepageTimeLabel: string;
  location: string;
  locationDetail: string;
  dateTime?: string;
  recurrenceDay?: WeekdayKey;
  recurrenceTime?: string;
  order?: number;
  sortTimestamp?: number;
};

type SanityEvent = {
  title?: string;
  order?: number;
  dateTime?: string;
  recurrenceDay?: string;
  recurrenceTime?: string;
  scheduleLabel?: string;
  homepageDateLabel?: string;
  homepageTimeLabel?: string;
  location?: string;
  locationDetail?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type SanityHomepageContent = {
  homepage?: {
    heroImageUrl?: string;
    heroImageAlt?: string;
  };
  events?: SanityEvent[];
};

const fallbackEvents: ChurchEvent[] = [
  {
    time: "Sun • 10:30 AM",
    title: "Sunday Worship",
    body: "Gather for teaching, worship, and community - a gospel centric service for all ages.",
    href: "#events",
    ctaLabel: "Learn More",
    homepageDateLabel: "Every Sunday",
    homepageTimeLabel: "10:30 AM",
    location: "Sanctuary",
    locationDetail: "Worship & community",
    recurrenceDay: "sunday",
    recurrenceTime: "10:30",
    order: 1,
  },
  {
    time: "Fri • 6:30 PM",
    title: "Youth Fellowship",
    body: "A space for students to connect, study scripture, and build friendships.",
    href: "#events",
    ctaLabel: "Learn More",
    homepageDateLabel: "Friday",
    homepageTimeLabel: "6:30 PM",
    location: "Sanctuary",
    locationDetail: "Youth fellowship",
    recurrenceDay: "friday",
    recurrenceTime: "18:30",
    order: 2,
  },
  {
    time: "Wed • 7:30 PM",
    title: "Bible Study",
    body: "Dig deeper into the Word with teaching, discussion, and prayer.",
    href: "#events",
    ctaLabel: "Learn More",
    homepageDateLabel: "Wednesday",
    homepageTimeLabel: "7:30 PM",
    location: "Sanctuary",
    locationDetail: "Bible study",
    recurrenceDay: "wednesday",
    recurrenceTime: "19:30",
    order: 3,
  },
];

const getWeekdayKey = (value?: string): WeekdayKey | undefined => {
  if (!value || !Object.prototype.hasOwnProperty.call(weekdayIndexes, value)) {
    return undefined;
  }

  return value as WeekdayKey;
};

const parseClockTime = (value = "") => {
  const match = value.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);

  if (!match) {
    return null;
  }

  let hour = Number(match[1]);
  const minute = Number(match[2] || "0");
  const meridiem = match[3]?.toLowerCase();

  if (meridiem === "pm" && hour < 12) {
    hour += 12;
  }

  if (meridiem === "am" && hour === 12) {
    hour = 0;
  }

  if (hour > 23 || minute > 59) {
    return null;
  }

  return { hour, minute };
};

const getZonedDateParts = (date: Date) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: eventTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const values: Record<string, string> = {};

  parts.forEach((part) => {
    if (part.type !== "literal") {
      values[part.type] = part.value;
    }
  });

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
    second: Number(values.second),
  };
};

const getTimeZoneOffsetMs = (date: Date) => {
  const parts = getZonedDateParts(date);
  const zonedAsUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);

  return zonedAsUtc - date.getTime();
};

const zonedTimeToUtc = (year: number, month: number, day: number, hour: number, minute: number) => {
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, 0);
  const firstOffset = getTimeZoneOffsetMs(new Date(utcGuess));
  const firstPass = new Date(utcGuess - firstOffset);
  const secondOffset = getTimeZoneOffsetMs(firstPass);

  return new Date(utcGuess - secondOffset);
};

const getZonedWeekdayIndex = (date: Date) => {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: eventTimeZone,
    weekday: "long",
  })
    .format(date)
    .toLowerCase() as WeekdayKey;

  return weekdayIndexes[weekday] ?? 0;
};

const getNextWeeklyOccurrence = (event: ChurchEvent, now: Date) => {
  if (!event.recurrenceDay || !event.recurrenceTime) {
    return null;
  }

  const time = parseClockTime(event.recurrenceTime);

  if (!time) {
    return null;
  }

  const nowParts = getZonedDateParts(now);
  const currentWeekday = getZonedWeekdayIndex(now);
  const targetWeekday = weekdayIndexes[event.recurrenceDay];
  let daysUntilEvent = (targetWeekday - currentWeekday + 7) % 7;
  let candidateLocalDate = new Date(Date.UTC(nowParts.year, nowParts.month - 1, nowParts.day + daysUntilEvent));
  let candidate = zonedTimeToUtc(
    candidateLocalDate.getUTCFullYear(),
    candidateLocalDate.getUTCMonth() + 1,
    candidateLocalDate.getUTCDate(),
    time.hour,
    time.minute,
  );

  if (candidate.getTime() <= now.getTime()) {
    daysUntilEvent += 7;
    candidateLocalDate = new Date(Date.UTC(nowParts.year, nowParts.month - 1, nowParts.day + daysUntilEvent));
    candidate = zonedTimeToUtc(
      candidateLocalDate.getUTCFullYear(),
      candidateLocalDate.getUTCMonth() + 1,
      candidateLocalDate.getUTCDate(),
      time.hour,
      time.minute,
    );
  }

  return candidate;
};

const dateLabelFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: eventTimeZone,
  weekday: "long",
  month: "short",
  day: "numeric",
});

const shortScheduleFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: eventTimeZone,
  weekday: "short",
  month: "short",
  day: "numeric",
});

const timeLabelFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: eventTimeZone,
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const formatTimeLabel = (date: Date) => timeLabelFormatter.format(date).replace(/\s/g, " ");

const getEventDate = (event: ChurchEvent, now: Date) => {
  if (event.recurrenceDay && event.recurrenceTime) {
    return getNextWeeklyOccurrence(event, now);
  }

  if (event.dateTime) {
    const date = new Date(event.dateTime);

    if (Number.isNaN(date.getTime()) || date.getTime() < now.getTime()) {
      return null;
    }

    return date;
  }

  return getNextWeeklyOccurrence(event, now);
};

const prepareChurchEvent = (event: ChurchEvent, now: Date): ChurchEvent | null => {
  const eventDate = getEventDate(event, now);
  const isRecurring = Boolean(event.recurrenceDay && event.recurrenceTime);
  const recurrenceLabel = event.recurrenceDay ? weekdayLabels[event.recurrenceDay] : null;

  if (event.dateTime && !eventDate) {
    return null;
  }

  const computedDateLabel = eventDate ? dateLabelFormatter.format(eventDate) : event.title;
  const computedTimeLabel = eventDate ? formatTimeLabel(eventDate) : "";
  const recurringDateLabel = recurrenceLabel ? `Every ${recurrenceLabel.long}` : "";
  const recurringScheduleLabel = recurrenceLabel && computedTimeLabel ? `Every ${recurrenceLabel.short} - ${computedTimeLabel}` : "";
  const oneTimeScheduleLabel = eventDate ? `${shortScheduleFormatter.format(eventDate)} - ${computedTimeLabel}` : "";

  return {
    ...event,
    time: isRecurring ? recurringScheduleLabel : oneTimeScheduleLabel || event.time,
    homepageDateLabel: isRecurring ? recurringDateLabel : computedDateLabel,
    homepageTimeLabel: computedTimeLabel || event.homepageTimeLabel,
    sortTimestamp: eventDate?.getTime() ?? Number.MAX_SAFE_INTEGER,
  };
};

const getUpcomingEvents = (events: ChurchEvent[], now: Date) =>
  events
    .map((event) => prepareChurchEvent(event, now))
    .filter((event): event is ChurchEvent => Boolean(event))
    .sort((a, b) => {
      const dateDifference = (a.sortTimestamp ?? Number.MAX_SAFE_INTEGER) - (b.sortTimestamp ?? Number.MAX_SAFE_INTEGER);

      if (dateDifference !== 0) {
        return dateDifference;
      }

      const orderDifference = (a.order ?? 999) - (b.order ?? 999);

      return orderDifference || a.title.localeCompare(b.title);
    })
    .slice(0, maxHomepageEvents);

const getSanityHomepageContent = async () => {
  if (!client) {
    return { events: [] } satisfies SanityHomepageContent;
  }

  try {
    return await client.fetch<SanityHomepageContent>(homepageQuery);
  } catch {
    return { events: [] } satisfies SanityHomepageContent;
  }
};

const getCmsEvents = (events: SanityEvent[] | undefined, now: Date): ChurchEvent[] => {
  if (!events?.length) {
    return [];
  }

  const cmsEvents = events
    .filter((event) => event.title && event.description)
    .map((event) => {
      const scheduleParts = event.scheduleLabel?.split(/[•-]/).map((part) => part.trim()) || [];

      return {
        time: event.scheduleLabel || "",
        title: event.title || "",
        body: event.description || "",
        href: event.ctaHref || "#events",
        ctaLabel: event.ctaLabel || "Learn More",
        homepageDateLabel: event.homepageDateLabel || scheduleParts[0] || "",
        homepageTimeLabel: event.homepageTimeLabel || scheduleParts[1] || "",
        location: event.location || "Sanctuary",
        locationDetail: event.locationDetail || "Worship & community",
        dateTime: event.dateTime,
        recurrenceDay: getWeekdayKey(event.recurrenceDay),
        recurrenceTime: event.recurrenceTime,
        order: event.order,
      };
    });

  return getUpcomingEvents(cmsEvents, now);
};

export default async function Home() {
  const now = new Date();
  const homepageContent = await getSanityHomepageContent();
  const events = getCmsEvents(homepageContent.events, now);
  const visibleEvents = events.length ? events : getUpcomingEvents(fallbackEvents, now);
  const primaryEvent = visibleEvents[0] || prepareChurchEvent(fallbackEvents[0], now) || fallbackEvents[0];
  const visibleSermons = await getFeaturedSermons();
  const heroImageSrc = homepageContent.homepage?.heroImageUrl || "/assets/hero.png";
  const heroImageAlt = homepageContent.homepage?.heroImageAlt || "CBF Dwarka church family";

  return (
    <main>
      <section className="hero" aria-label="CBF Dwarka introduction">
        <Image src={heroImageSrc} alt={heroImageAlt} className="hero-image" fill priority sizes="100vw" />
        <div className="hero-gradient" />
        <SiteHeader />
        <div className="hero-copy">
          <p>
            <span>Welcome to</span>
            <span>CHRISTIAN BELIEVERS FELLOWSHIP</span>
          </p>
          <h1>A Gospel-Centered Church in the Heart of Dwarka, New Delhi</h1>
        </div>
      </section>
      <div className="sunday-bg" aria-hidden="true" />

      <section className="feature-wrap" id="about" aria-label="Church information">
        <div className="feature-grid">
          {featureCards.map((card) => (
            <article className="feature-card" key={card.title}>
              <div>
                {card.icon}
                <h2>{card.title}</h2>
                {card.title === "Upcoming Events" ? (
                  <div className="mini-event">
                    <h3>{primaryEvent.title}</h3>
                    <div className="mini-date">
                      <strong>{primaryEvent.homepageDateLabel}</strong>
                      <span>{primaryEvent.homepageTimeLabel}</span>
                    </div>
                  </div>
                ) : (
                  <p>{card.body}</p>
                )}
              </div>
              <Link href={card.title === "Upcoming Events" ? "#events" : card.title === "What We Believe" ? "/about#beliefs" : "/connect"}>{card.action} <SmallArrow /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="visit" id="visit" aria-labelledby="visit-title">
        <span id="connect" className="section-anchor" aria-hidden="true" />
        <div className="content visit-layout">
          <div className="visit-copy">
            <span className="date-badge">Sun • 10:30 AM</span>
            <h2 id="visit-title">Join Us for<br />Sunday Worship</h2>
            <p className="overline">Every Sunday - 10:30 AM</p>
            <span className="gold-line" />
            <p className="visit-body">
              Come as you are and encounter the living God. Spirit-filled worship, Gospel-centered preaching, and a community that welcomes all.
            </p>
            <a className="directions" href="https://maps.app.goo.gl/vQjeCoeKBKhdb3vc7">
              Get Directions <UpRight />
            </a>
          </div>
          <address className="location-card">
            <LocationPin />
            <strong>Mount Carmel School</strong>
            <span>{churchAddress}</span>
          </address>
        </div>
      </section>

      <section className="events" id="events" aria-labelledby="events-title">
        <div className="section-header centered">
          <h2 id="events-title">Upcoming Events</h2>
          <p>Join us for worship, community, and discipleship — rooted in the Word and lived out in everyday life.</p>
        </div>
        <div className="event-grid">
          {visibleEvents.map((event) => (
            <article className="event-card" key={event.title}>
              <span>{event.time}</span>
              <h3>{event.title}</h3>
              <p>{event.body}</p>
              <a href={event.href}>{event.ctaLabel} →</a>
            </article>
          ))}
        </div>
      </section>

      <section className="sermons" id="sermons" aria-labelledby="sermons-title">
        <div className="section-header sermons-header">
          <div>
            <h2 id="sermons-title">Featured Sermons</h2>
            <p>Rooted in the Word — watch recent teachings and series.</p>
          </div>
          <Link className="watch-all" href="/sermons">Watch All Sermons <Arrow dark /></Link>
        </div>
        <div className="sermon-grid">
          {visibleSermons.map((sermon) => (
            <Link
              className="sermon-card"
              href={sermon.href}
              key={sermon.videoId || sermon.title}
              aria-label={`Watch sermon on CBF Dwarka: ${sermon.title}`}
            >
              <Image src={sermon.image} alt="" width={356} height={200} sizes="(max-width: 900px) 100vw, 356px" />
              <div className="sermon-meta" aria-hidden="true">
                <span>{sermon.number}</span>
                <strong>{sermon.kind}</strong>
              </div>
              <h3>{sermon.title}</h3>
              <p>{sermon.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="footer-top">
          <div className="footer-brand">
            <h2>CBF Dwarka</h2>
            <strong>Mount Carmel School</strong>
            <p>{churchAddress}</p>
          </div>
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <a href="mailto:cbfdwarka2021@gmail.com">cbfdwarka2021@gmail.com</a>
            <a href="tel:+919910800733">+91 99108 00733</a>
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
