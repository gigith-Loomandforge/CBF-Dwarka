import Image from "next/image";
import { MobileMenu } from "./MobileMenu";

export const revalidate = 43200;

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

const churchAddress = "Sector 22, Dwarka, Delhi, 110077";
const youtubeChannelUrl = "https://www.youtube.com/@cbfdwarka";
const youtubeHandle = "@cbfdwarka";
const maxYouTubeVideosToScan = 500;

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

const events = [
  {
    time: "Sun • 10:30 AM",
    title: "Sunday Worship",
    body: "Gather for teaching, worship, and community - a gospel centric service for all ages.",
  },
  {
    time: "Fri • 6:30 PM",
    title: "Youth Fellowship",
    body: "A space for students to connect, study scripture, and build friendships.",
  },
  {
    time: "Wed • 7:30 PM",
    title: "Bible Study",
    body: "Dig deeper into the Word with teaching, discussion, and prayer.",
  },
];

type Sermon = {
  image: string;
  number: string;
  kind: string;
  title: string;
  body: string;
  href: string;
};

type YouTubeChannelListResponse = {
  items?: Array<{
    contentDetails?: {
      relatedPlaylists?: {
        uploads?: string;
      };
    };
  }>;
};

type YouTubePlaylistItemsResponse = {
  nextPageToken?: string;
  items?: Array<{
    contentDetails?: {
      videoId?: string;
    };
  }>;
};

type YouTubeThumbnails = Record<string, { url?: string; width?: number; height?: number }>;

type YouTubeVideosResponse = {
  items?: Array<{
    id?: string;
    snippet?: {
      title?: string;
      description?: string;
      thumbnails?: YouTubeThumbnails;
    };
    statistics?: {
      viewCount?: string;
    };
  }>;
};

const fallbackSermons: Sermon[] = [
  {
    image: "/assets/sermon-1.png",
    number: "01",
    kind: "Sunday Sermon",
    title: "Walking in Faith",
    body: "Discovering trust in the unknown paths.",
    href: youtubeChannelUrl,
  },
  {
    image: "/assets/sermon-2.png",
    number: "02",
    kind: "Bible Study",
    title: "The Prodigal Son",
    body: "A profound study on returning home.",
    href: youtubeChannelUrl,
  },
  {
    image: "/assets/sermon-3.png",
    number: "03",
    kind: "Midweek Message",
    title: "Grace Renewed",
    body: "Fresh perspective for the weary soul.",
    href: youtubeChannelUrl,
  },
];

const getBestThumbnail = (thumbnails?: YouTubeThumbnails) => {
  if (!thumbnails) {
    return "";
  }

  return thumbnails.maxres?.url || thumbnails.standard?.url || thumbnails.high?.url || thumbnails.medium?.url || thumbnails.default?.url || "";
};

const getVideoDescription = (description = "") => {
  const cleanDescription = description.replace(/\s+/g, " ").trim();

  if (!cleanDescription) {
    return "Watch this message from CBF Dwarka.";
  }

  const firstSentence = cleanDescription.match(/^.{1,120}?(?:[.!?](?:\s|$)|$)/)?.[0]?.trim() || cleanDescription.slice(0, 120).trim();
  return firstSentence.length > 120 ? `${firstSentence.slice(0, 117)}...` : firstSentence;
};

const youtubeApiFetch = async <T,>(path: string, params: Record<string, string>, apiKey: string) => {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${path}`);

  Object.entries({ ...params, key: apiKey }).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url, { next: { revalidate } });

  if (!response.ok) {
    throw new Error(`YouTube API request failed: ${path}`);
  }

  return response.json() as Promise<T>;
};

const getFeaturedSermons = async (): Promise<Sermon[]> => {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return fallbackSermons;
  }

  try {
    const channel = await youtubeApiFetch<YouTubeChannelListResponse>(
      "channels",
      {
        forHandle: youtubeHandle,
        part: "contentDetails",
      },
      apiKey,
    );

    const uploadsPlaylistId = channel.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      return fallbackSermons;
    }

    const videoIds: string[] = [];
    let pageToken = "";

    while (videoIds.length < maxYouTubeVideosToScan) {
      const playlistItems = await youtubeApiFetch<YouTubePlaylistItemsResponse>(
        "playlistItems",
        {
          playlistId: uploadsPlaylistId,
          part: "contentDetails",
          maxResults: "50",
          ...(pageToken ? { pageToken } : {}),
        },
        apiKey,
      );

      playlistItems.items?.forEach((item) => {
        const videoId = item.contentDetails?.videoId;

        if (videoId && videoIds.length < maxYouTubeVideosToScan) {
          videoIds.push(videoId);
        }
      });

      if (!playlistItems.nextPageToken) {
        break;
      }

      pageToken = playlistItems.nextPageToken;
    }

    const videos: NonNullable<YouTubeVideosResponse["items"]> = [];

    for (let index = 0; index < videoIds.length; index += 50) {
      const videoResponse = await youtubeApiFetch<YouTubeVideosResponse>(
        "videos",
        {
          id: videoIds.slice(index, index + 50).join(","),
          part: "snippet,statistics",
        },
        apiKey,
      );

      videos.push(...(videoResponse.items || []));
    }

    const featuredVideos = videos
      .filter((video) => video.id && video.snippet?.title && getBestThumbnail(video.snippet.thumbnails))
      .sort((left, right) => Number(right.statistics?.viewCount || 0) - Number(left.statistics?.viewCount || 0))
      .slice(0, 3);

    if (featuredVideos.length < 3) {
      return fallbackSermons;
    }

    return featuredVideos.map((video, index) => ({
      image: getBestThumbnail(video.snippet?.thumbnails),
      number: String(index + 1).padStart(2, "0"),
      kind: "Most Viewed",
      title: video.snippet?.title || "CBF Dwarka Sermon",
      body: getVideoDescription(video.snippet?.description),
      href: `https://www.youtube.com/watch?v=${video.id}`,
    }));
  } catch {
    return fallbackSermons;
  }
};

export default async function Home() {
  const sermons = await getFeaturedSermons();

  return (
    <main>
      <section className="hero" aria-label="CBF Dwarka introduction">
        <Image src="/assets/hero.png" alt="" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-gradient" />
        <header className="site-header">
          <a className="logo" href="#" aria-label="CBF Dwarka home">
            <Image src="/assets/logo.svg" alt="CBF Dwarka" width={94} height={120} priority />
          </a>
          <nav className="nav" aria-label="Primary navigation">
            <a className="active" href="#">Home</a>
            <a href="#about">About</a>
            <a href="#connect">Connect</a>
            <a href="#sermons">Sermons</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="language" href="/hi">हिन्दी</a>
          <MobileMenu />
        </header>
        <div className="hero-copy">
          <p>
            <span>Welcome to</span>
            <span>CHRISTIAN BELIEVERS FELLOWSHIP</span>
          </p>
          <h1>A Gospel Centric Church in Dwarka, New Delhi</h1>
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
                    <div className="mini-date">
                      <strong>Every Sunday</strong>
                      <span>10:30 AM</span>
                    </div>
                    <h3>Sunday Morning Service</h3>
                    <p>Sanctuary <span>• Worship &amp; community</span></p>
                  </div>
                ) : (
                  <p>{card.body}</p>
                )}
              </div>
              <a href={card.title === "Upcoming Events" ? "#events" : "#visit"}>{card.action} <SmallArrow /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="visit" id="visit" aria-labelledby="visit-title">
        <div className="content visit-layout">
          <div className="visit-copy">
            <span className="date-badge">Sun • 10:30 AM</span>
            <h2 id="visit-title">Join Us for<br />Sunday Worship</h2>
            <p className="overline">Every Sunday</p>
            <span className="gold-line" />
            <p className="visit-body">
              Come as you are and encounter the living God. Spirit-filled worship, Gospel-centered preaching, and a community that welcomes all.
            </p>
            <a className="directions" href="https://maps.google.com/?q=Mount+Carmel+School+Sector+22+Dwarka+Delhi+110077">
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
          {events.map((event) => (
            <article className="event-card" key={event.title}>
              <span>{event.time}</span>
              <h3>{event.title}</h3>
              <p>{event.body}</p>
              <a href="#events">Learn More →</a>
            </article>
          ))}
        </div>
      </section>

      <section className="sermons" id="sermons" aria-labelledby="sermons-title">
        <div className="section-header sermons-header">
          <div>
            <h2 id="sermons-title">Featured Sermons</h2>
            <p>Rooted in the Word — listen to recent teachings and series.</p>
          </div>
          <a className="watch-all" href={youtubeChannelUrl} target="_blank" rel="noreferrer">Watch All Sermons <Arrow dark /></a>
        </div>
        <div className="sermon-grid">
          {sermons.map((sermon) => (
            <a
              className="sermon-card"
              href={sermon.href}
              key={sermon.title}
              target="_blank"
              rel="noreferrer"
              aria-label={`Watch sermons on YouTube: ${sermon.title}`}
            >
              <img src={sermon.image} alt="" width={356} height={200} loading="eager" />
              <div className="sermon-meta">
                <span>{sermon.number}</span>
                <strong>{sermon.kind}</strong>
              </div>
              <h3>{sermon.title}</h3>
              <p>{sermon.body}</p>
            </a>
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
