export const sermonRevalidate = 300;
export const youtubeChannelUrl = "https://www.youtube.com/@cbfdwarka";

const youtubeHandle = "@cbfdwarka";
const youtubeChannelId = "UCTRZ9Q_bNa8ZgWeNE-2b6wA";
const youtubeRssFeedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${youtubeChannelId}`;
const maxYouTubeCandidates = 50;
const maxShortVideoDurationSeconds = 180;
const defaultRecentVideoLimit = 12;

export type SermonVideo = {
  videoId?: string;
  image: string;
  number: string;
  kind: string;
  title: string;
  body: string;
  description?: string;
  publishedAt?: string;
  href: string;
  youtubeHref: string;
};

type YouTubeChannelListResponse = {
  items?: Array<{
    contentDetails?: {
      relatedPlaylists?: {
        uploads?: string;
      };
    };
  }>;
};

type YouTubePlaylistItemsResponse = {
  items?: Array<{
    contentDetails?: {
      videoId?: string;
    };
  }>;
};

type YouTubeThumbnails = Record<string, { url?: string; width?: number; height?: number }>;

type YouTubeVideosResponse = {
  items?: Array<{
    id?: string;
    snippet?: {
      title?: string;
      description?: string;
      publishedAt?: string;
      thumbnails?: YouTubeThumbnails;
    };
    contentDetails?: {
      duration?: string;
    };
  }>;
};

const fallbackSermons: SermonVideo[] = [
  {
    image: "/assets/sermon-1.png",
    number: "01",
    kind: "Sunday Sermon",
    title: "Walking in Faith",
    body: "Discovering trust in the unknown paths.",
    description: "Discovering trust in the unknown paths.",
    href: "/sermons",
    youtubeHref: youtubeChannelUrl,
  },
  {
    image: "/assets/sermon-2.png",
    number: "02",
    kind: "Bible Study",
    title: "The Prodigal Son",
    body: "A profound study on returning home.",
    description: "A profound study on returning home.",
    href: "/sermons",
    youtubeHref: youtubeChannelUrl,
  },
  {
    image: "/assets/sermon-3.png",
    number: "03",
    kind: "Midweek Message",
    title: "Grace Renewed",
    body: "Fresh perspective for the weary soul.",
    description: "Fresh perspective for the weary soul.",
    href: "/sermons",
    youtubeHref: youtubeChannelUrl,
  },
];

const getBestThumbnail = (thumbnails?: YouTubeThumbnails) => {
  if (!thumbnails) {
    return "";
  }

  return thumbnails.maxres?.url || thumbnails.standard?.url || thumbnails.high?.url || thumbnails.medium?.url || thumbnails.default?.url || "";
};

const getYouTubeDurationSeconds = (duration?: string) => {
  if (!duration) {
    return 0;
  }

  const match = duration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);

  if (!match) {
    return 0;
  }

  const [, hours = "0", minutes = "0", seconds = "0"] = match;

  return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
};

const isLongFormYouTubeVideo = (duration?: string) => {
  return getYouTubeDurationSeconds(duration) > maxShortVideoDurationSeconds;
};

const decodeXmlText = (value = "") => {
  const withoutCdata = value.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "");
  const namedEntities: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    quot: '"',
  };

  return withoutCdata.replace(/&(#\d+|#x[\da-f]+|[a-z]+);/gi, (entity, code: string) => {
    if (code[0] === "#") {
      const isHex = code[1]?.toLowerCase() === "x";
      const codePoint = Number.parseInt(code.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      return Number.isNaN(codePoint) ? entity : String.fromCodePoint(codePoint);
    }

    return namedEntities[code.toLowerCase()] || entity;
  });
};

const getXmlText = (xml: string, tagName: string) => {
  const match = xml.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`, "i"));
  return decodeXmlText(match?.[1]?.trim() || "");
};

const getXmlAttribute = (xml: string, tagName: string, attributeName: string) => {
  const match = xml.match(new RegExp(`<${tagName}[^>]*\\s${attributeName}="([^"]*)"`, "i"));
  return decodeXmlText(match?.[1]?.trim() || "");
};

export const getVideoDescription = (description = "", fallbackText = "") => {
  const cleanDescription = description.replace(/\s+/g, " ").trim();
  const sourceText = cleanDescription || fallbackText.replace(/\s+/g, " ").trim();

  if (!sourceText) {
    return "Recent teaching from CBF Dwarka.";
  }

  const firstSentence = sourceText.match(/^.{1,120}?(?:[.!?](?:\s|$)|$)/)?.[0]?.trim() || sourceText.slice(0, 120).trim();
  return firstSentence.length > 120 ? `${firstSentence.slice(0, 117)}...` : firstSentence;
};

export const getYoutubeWatchUrl = (videoId?: string) => (videoId ? `https://www.youtube.com/watch?v=${videoId}` : youtubeChannelUrl);

export const getYoutubeEmbedUrl = (videoId: string) => {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });

  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${params.toString()}`;
};

const getInternalSermonHref = (videoId?: string) => (videoId ? `/sermons/${encodeURIComponent(videoId)}` : "/sermons");

const youtubeApiFetch = async <T,>(path: string, params: Record<string, string>, apiKey: string) => {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${path}`);

  Object.entries({ ...params, key: apiKey }).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url, { next: { revalidate: sermonRevalidate } });

  if (!response.ok) {
    throw new Error(`YouTube API request failed: ${path}`);
  }

  return response.json() as Promise<T>;
};

const mapYouTubeVideosToSermons = (
  videos: Array<{
    id: string;
    title: string;
    description?: string;
    publishedAt?: string;
    thumbnail: string;
  }>,
): SermonVideo[] =>
  videos.map((video, index) => ({
    videoId: video.id,
    image: video.thumbnail,
    number: String(index + 1).padStart(2, "0"),
    kind: "Recent Video",
    title: video.title,
    body: getVideoDescription(video.description, video.title),
    description: video.description?.replace(/\s+/g, " ").trim(),
    publishedAt: video.publishedAt,
    href: getInternalSermonHref(video.id),
    youtubeHref: getYoutubeWatchUrl(video.id),
  }));

const getYouTubeApiVideos = async (apiKey: string, limit: number): Promise<SermonVideo[]> => {
  const channel = await youtubeApiFetch<YouTubeChannelListResponse>(
    "channels",
    {
      forHandle: youtubeHandle,
      part: "contentDetails",
    },
    apiKey,
  );

  const uploadsPlaylistId = channel.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

  if (!uploadsPlaylistId) {
    return [];
  }

  const playlistItems = await youtubeApiFetch<YouTubePlaylistItemsResponse>(
    "playlistItems",
    {
      playlistId: uploadsPlaylistId,
      part: "contentDetails",
      maxResults: String(maxYouTubeCandidates),
    },
    apiKey,
  );

  const videoIds =
    playlistItems.items
      ?.map((item) => item.contentDetails?.videoId)
      .filter((videoId): videoId is string => Boolean(videoId))
      .slice(0, maxYouTubeCandidates) || [];

  const videos: NonNullable<YouTubeVideosResponse["items"]> = [];

  for (let index = 0; index < videoIds.length; index += 50) {
    const videoResponse = await youtubeApiFetch<YouTubeVideosResponse>(
      "videos",
      {
        id: videoIds.slice(index, index + 50).join(","),
        part: "snippet,contentDetails",
      },
      apiKey,
    );

    videos.push(...(videoResponse.items || []));
  }

  const recentVideos = videos
    .filter((video) => video.id && video.snippet?.title && getBestThumbnail(video.snippet.thumbnails) && isLongFormYouTubeVideo(video.contentDetails?.duration))
    .slice(0, limit)
    .map((video) => ({
      id: video.id || "",
      title: video.snippet?.title || "CBF Dwarka Sermon",
      description: video.snippet?.description,
      publishedAt: video.snippet?.publishedAt,
      thumbnail: getBestThumbnail(video.snippet?.thumbnails),
    }));

  return mapYouTubeVideosToSermons(recentVideos);
};

const getYouTubeApiVideoById = async (apiKey: string, videoId: string): Promise<SermonVideo | null> => {
  const videoResponse = await youtubeApiFetch<YouTubeVideosResponse>(
    "videos",
    {
      id: videoId,
      part: "snippet,contentDetails",
    },
    apiKey,
  );

  const video = videoResponse.items?.[0];

  if (!video?.id || !video.snippet?.title || !getBestThumbnail(video.snippet.thumbnails) || !isLongFormYouTubeVideo(video.contentDetails?.duration)) {
    return null;
  }

  return mapYouTubeVideosToSermons([
    {
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      publishedAt: video.snippet.publishedAt,
      thumbnail: getBestThumbnail(video.snippet.thumbnails),
    },
  ])[0];
};

const getYouTubeRssVideos = async (limit: number): Promise<SermonVideo[]> => {
  const response = await fetch(youtubeRssFeedUrl, { next: { revalidate: sermonRevalidate } });

  if (!response.ok) {
    return [];
  }

  const feed = await response.text();
  const recentVideos = feed
    .split(/<entry>/i)
    .slice(1)
    .map((entry) => {
      const id = getXmlText(entry, "yt:videoId");
      const title = getXmlText(entry, "title");
      const description = getXmlText(entry, "media:description");
      const publishedAt = getXmlText(entry, "published") || getXmlText(entry, "updated");
      const thumbnail = getXmlAttribute(entry, "media:thumbnail", "url") || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

      return { id, title, description, publishedAt, thumbnail };
    })
    .filter((video) => video.id && video.title && video.thumbnail && !/#shorts/i.test(video.description))
    .slice(0, limit);

  return mapYouTubeVideosToSermons(recentVideos);
};

export const getRecentSermons = async (limit = defaultRecentVideoLimit): Promise<SermonVideo[]> => {
  const apiKey = process.env.YOUTUBE_API_KEY?.trim().replace(/^["']|["']$/g, "");

  if (apiKey?.startsWith("AIza")) {
    try {
      const apiSermons = await getYouTubeApiVideos(apiKey, limit);

      if (apiSermons.length) {
        return apiSermons;
      }
    } catch {
      // Fall through to the public RSS feed when the API key is missing, invalid, or quota-limited.
    }
  }

  try {
    const rssSermons = await getYouTubeRssVideos(limit);

    if (rssSermons.length) {
      return rssSermons;
    }
  } catch {
    // Static cards keep the pages populated if YouTube is temporarily unavailable.
  }

  return fallbackSermons.slice(0, limit);
};

export const getFeaturedSermons = () => getRecentSermons(3);

export const getSermonLibrary = async (selectedVideoId?: string, limit = defaultRecentVideoLimit) => {
  const videos = await getRecentSermons(limit);
  const apiKey = process.env.YOUTUBE_API_KEY?.trim().replace(/^["']|["']$/g, "");
  let selected: SermonVideo | undefined = selectedVideoId ? videos.find((video) => video.videoId === selectedVideoId) : videos[0];
  let library = videos;

  if (!selected && selectedVideoId && apiKey?.startsWith("AIza")) {
    try {
      selected = (await getYouTubeApiVideoById(apiKey, selectedVideoId)) || undefined;

      if (selected) {
        library = [selected, ...videos.filter((video) => video.videoId !== selectedVideoId)];
      }
    } catch {
      selected = undefined;
    }
  }

  return {
    selected: selected || library[0],
    videos: library,
  };
};
