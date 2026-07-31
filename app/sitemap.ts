import type { MetadataRoute } from "next";
import { getRecentSermons } from "./sermons/sermon-data";
import { absoluteUrl } from "./site-config";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/connect", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/sermons", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/easter-service", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/christmas-service", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/accessibility", priority: 0.2, changeFrequency: "yearly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  let sermonEntries: MetadataRoute.Sitemap = [];

  try {
    const sermons = await getRecentSermons(25);
    sermonEntries = sermons
      .filter((sermon) => sermon.videoId)
      .map((sermon) => {
        const publishedDate = sermon.publishedAt
          ? new Date(sermon.publishedAt)
          : now;

        return {
          url: absoluteUrl(`/sermons/${encodeURIComponent(sermon.videoId!)}`),
          lastModified: Number.isNaN(publishedDate.getTime()) ? now : publishedDate,
          changeFrequency: "monthly" as const,
          priority: 0.6,
          images: sermon.image ? [sermon.image] : undefined,
        };
      });
  } catch {
    sermonEntries = [];
  }

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...sermonEntries,
  ];
}
