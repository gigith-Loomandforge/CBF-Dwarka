export const apiVersion = "2026-07-07";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "nyb83ihi";
export const studioUrl = "/studio";

export const hasSanityConfig = Boolean(projectId && dataset);
