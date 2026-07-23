import { groq } from "next-sanity";

export const homepageQuery = groq`{
  "homepage": *[_type == "homepageSettings"] | order(_updatedAt desc)[0] {
    "heroImageUrl": heroImage.asset->url,
    "heroImageAlt": coalesce(heroImage.alt, "CBF Dwarka church family")
  },
  "events": *[
    _type == "event" &&
    showOnHomepage == true &&
    (
      !defined(dateTime) ||
      dateTime >= now() ||
      (defined(recurrenceDay) && defined(recurrenceTime))
    )
  ] | order(coalesce(dateTime, "9999-12-31") asc, coalesce(order, 999) asc)[0...50] {
    title,
    order,
    dateTime,
    recurrenceDay,
    recurrenceTime,
    scheduleLabel,
    homepageDateLabel,
    homepageTimeLabel,
    location,
    locationDetail,
    description,
    ctaLabel,
    ctaHref
  }
}`;

export const offsitePageQuery = groq`*[
  _type == "offsitePage" &&
  slug.current == "offsite"
] | order(_updatedAt desc)[0] {
  _id,
  title,
  eyebrow,
  summary,
  dateTime,
  scheduleLabel,
  locationName,
  locationAddress,
  mapUrl,
  rsvpEnabled,
  rsvpTitle,
  rsvpIntro,
  metaTitle,
  metaDescription,
  body[] {
    heading,
    text
  },
  "heroImageUrl": heroImage.asset->url,
  "heroImageAlt": coalesce(heroImage.alt, title)
}`;

export const easterServicePageQuery = groq`*[
  _type == "easterServicePage" &&
  slug.current == "easter-service"
] | order(_updatedAt desc)[0] {
  _id,
  title,
  eyebrow,
  summary,
  serviceDateTime,
  scheduleLabel,
  locationName,
  locationAddress,
  mapUrl,
  metaTitle,
  metaDescription,
  details[] {
    label,
    value,
    description
  },
  body[] {
    heading,
    text
  },
  "heroImageUrl": heroImage.asset->url,
  "heroImageAlt": coalesce(heroImage.alt, title)
}`;

export const christmasServicePageQuery = groq`*[
  _type == "christmasServicePage" &&
  slug.current == "christmas-service"
] | order(_updatedAt desc)[0] {
  _id,
  title,
  eyebrow,
  summary,
  serviceDateTime,
  scheduleLabel,
  locationName,
  locationAddress,
  mapUrl,
  metaTitle,
  metaDescription,
  details[] {
    label,
    value,
    description
  },
  body[] {
    heading,
    text
  },
  "heroImageUrl": heroImage.asset->url,
  "heroImageAlt": coalesce(heroImage.alt, title)
}`;
