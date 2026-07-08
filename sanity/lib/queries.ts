import { groq } from "next-sanity";

export const homepageQuery = groq`{
  "events": *[_type == "event" && showOnHomepage == true] | order(coalesce(order, 999) asc, coalesce(dateTime, "9999-12-31") asc)[0...3] {
    title,
    scheduleLabel,
    homepageDateLabel,
    homepageTimeLabel,
    location,
    locationDetail,
    description,
    ctaLabel,
    ctaHref
  },
  "featuredVideos": *[_type == "featuredVideo" && showOnHomepage == true] | order(coalesce(order, 999) asc, _updatedAt desc)[0...3] {
    title,
    description,
    category,
    youtubeUrl,
    youtubeVideoId,
    thumbnail
  }
}`;
