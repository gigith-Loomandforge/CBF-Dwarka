import { StructuredData } from "./StructuredData";
import { absoluteUrl, siteConfig } from "./site-config";

type EventStructuredDataProps = {
  name: string;
  description?: string;
  startDate?: string;
  url: string;
  image?: string;
  locationName?: string;
  locationAddress?: string;
};

export function EventStructuredData({
  name,
  description,
  startDate,
  url,
  image,
  locationName,
  locationAddress,
}: EventStructuredDataProps) {
  if (!startDate) {
    return null;
  }

  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "Event",
        name,
        description,
        startDate,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        url: absoluteUrl(url),
        image: image ? [image] : undefined,
        location: {
          "@type": "Place",
          name: locationName || siteConfig.address.name,
          address:
            locationAddress ||
            {
              "@type": "PostalAddress",
              streetAddress: siteConfig.address.streetAddress,
              addressLocality: siteConfig.address.addressLocality,
              addressRegion: siteConfig.address.addressRegion,
              postalCode: siteConfig.address.postalCode,
              addressCountry: siteConfig.address.addressCountry,
            },
        },
        organizer: {
          "@type": "Organization",
          "@id": absoluteUrl("/#organization"),
          name: siteConfig.fullName,
          url: siteConfig.url,
        },
      }}
    />
  );
}
