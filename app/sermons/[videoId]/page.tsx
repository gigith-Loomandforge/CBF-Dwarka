import type { Metadata } from "next";
import { SermonsPage } from "../SermonsPage";
import { getSermonLibrary } from "../sermon-data";

export const revalidate = 300;

type SermonVideoPageProps = {
  params: Promise<{
    videoId: string;
  }>;
};

export async function generateMetadata({ params }: SermonVideoPageProps): Promise<Metadata> {
  const { videoId } = await params;
  const { selected } = await getSermonLibrary(videoId);

  return {
    title: selected ? `${selected.title} | CBF Dwarka Sermons` : "Sermons | CBF Dwarka",
    description: selected?.body || "Watch recent sermons and teaching videos from Christian Believers Fellowship Dwarka.",
    alternates: {
      canonical: `/sermons/${encodeURIComponent(videoId)}`,
    },
    openGraph: selected
      ? {
          title: `${selected.title} | CBF Dwarka Sermons`,
          description: selected.body,
          images: selected.image ? [{ url: selected.image }] : undefined,
        }
      : undefined,
  };
}

export default async function SermonVideoPage({ params }: SermonVideoPageProps) {
  const { videoId } = await params;

  return <SermonsPage selectedVideoId={videoId} />;
}
