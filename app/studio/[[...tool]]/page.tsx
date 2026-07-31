import type { Metadata } from "next";
import { metadata as studioMetadata, viewport } from "next-sanity/studio";
import { Studio } from "./Studio";

export const dynamic = "force-static";

export { viewport };

export const metadata: Metadata = {
  ...studioMetadata,
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function StudioPage() {
  return <Studio />;
}
