import { groq } from "next-sanity";

export const homepageQuery = groq`{
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
