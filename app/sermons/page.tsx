import type { Metadata } from "next";
import { SermonsPage } from "./SermonsPage";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Sermons | CBF Dwarka",
  description:
    "Watch recent sermons and teaching videos from Christian Believers Fellowship Dwarka.",
  alternates: {
    canonical: "/sermons",
  },
};

export default function SermonIndexPage() {
  return <SermonsPage />;
}
