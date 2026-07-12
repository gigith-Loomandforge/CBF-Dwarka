import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "../SiteHeader";
import { getSermonLibrary, getYoutubeEmbedUrl, youtubeChannelUrl } from "./sermon-data";

const churchAddress = "CBF Dwarka, Taekwondo Room, Mount Carmel School, Sector 22, Dwarka";
const emailAddress = "cbfdwarka2021@gmail.com";
const phoneNumber = "+91 99108 00733";
const phoneHref = "tel:+919910800733";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const formatPublishedDate = (value?: string) => {
  if (!value) {
    return "Recent teaching";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recent teaching";
  }

  return dateFormatter.format(date);
};

type SermonsPageProps = {
  selectedVideoId?: string;
};

export async function SermonsPage({ selectedVideoId }: SermonsPageProps) {
  const { selected, videos } = await getSermonLibrary(selectedVideoId);
  const selectedDescription = selected?.description || selected?.body || "Recent teaching from CBF Dwarka.";

  return (
    <main className="sermon-page">
      <SiteHeader />

      <section className="sermon-hero" aria-labelledby="sermon-page-title">
        <div>
          <p className="about-kicker">Sermons</p>
          <h1 id="sermon-page-title">Watch recent messages from CBF Dwarka.</h1>
          <p>
            Browse recent teaching, open a message, and watch the video without leaving the website.
          </p>
        </div>
        <a className="sermon-channel-link" href={youtubeChannelUrl} target="_blank" rel="noreferrer">
          Open YouTube Channel
        </a>
      </section>

      <section className="sermon-watch" aria-label="Selected sermon video">
        <div className="sermon-player-column">
          <div className="sermon-player-shell">
            {selected?.videoId ? (
              <iframe
                src={getYoutubeEmbedUrl(selected.videoId)}
                title={selected.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="sermon-player-fallback">
                {selected?.image ? <Image src={selected.image} alt="" width={480} height={360} sizes="(max-width: 900px) 100vw, 720px" /> : null}
                <a href={youtubeChannelUrl} target="_blank" rel="noreferrer">Watch on YouTube</a>
              </div>
            )}
          </div>

          <article className="sermon-selected-copy">
            <span>{formatPublishedDate(selected?.publishedAt)}</span>
            <h2>{selected?.title || "Recent CBF Dwarka Sermon"}</h2>
            <p>{selectedDescription}</p>
          </article>
        </div>

        <section className="sermon-episode-list" aria-labelledby="sermon-list-title">
          <div className="sermon-list-heading">
            <p className="about-kicker">Recent Videos</p>
            <h2 id="sermon-list-title">More Messages</h2>
          </div>
          <div className="sermon-episode-stack">
            {videos.map((video) => {
              const isActive = selected?.videoId && video.videoId === selected.videoId;

              return (
                <Link
                  className={isActive ? "sermon-episode-card active" : "sermon-episode-card"}
                  href={video.href}
                  key={video.videoId || video.title}
                  aria-current={isActive ? "page" : undefined}
                >
                  <div className="sermon-episode-image">
                    <Image src={video.image} alt="" width={356} height={200} sizes="(max-width: 900px) 100vw, 180px" />
                    <span>{video.kind}</span>
                  </div>
                  <span>
                    <strong>{video.title}</strong>
                    <small>{formatPublishedDate(video.publishedAt)}</small>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </section>

      <footer className="footer sermon-footer" id="contact">
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
