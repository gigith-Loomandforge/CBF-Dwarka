import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Christian Believers Fellowship Dwarka",
    short_name: "CBF Dwarka",
    description:
      "Worship, sermons, events, and community information from Christian Believers Fellowship Dwarka.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#101010",
    icons: [
      {
        src: "/favicon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
