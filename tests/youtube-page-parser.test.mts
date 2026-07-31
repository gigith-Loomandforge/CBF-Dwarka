import assert from "node:assert/strict";
import test from "node:test";

import { parseYouTubePageVideos } from "../app/sermons/sermon-data.ts";

const createPageHtml = (lockups: unknown[]) =>
  `<script>var ytInitialData = ${JSON.stringify({ contents: lockups.map((lockupViewModel) => ({ lockupViewModel })) })};</script>`;

const createLockup = (id: string, title: string, duration: string) => ({
  contentId: id,
  contentType: "LOCKUP_CONTENT_TYPE_VIDEO",
  contentImage: {
    thumbnailViewModel: {
      image: {
        sources: [
          { url: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`, width: 320 },
          { url: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, width: 480 },
        ],
      },
      overlays: [
        {
          thumbnailBottomOverlayViewModel: {
            badges: [{ thumbnailBadgeViewModel: { text: duration } }],
          },
        },
      ],
    },
  },
  metadata: {
    lockupMetadataViewModel: {
      title: { content: title },
      metadata: {
        contentMetadataViewModel: {
          metadataRows: [
            {
              metadataParts: [
                { text: { content: "12 views" } },
                { text: { content: "2 days ago" } },
              ],
            },
          ],
        },
      },
    },
  },
});

test("parses YouTube's current lockup video format", () => {
  const videos = parseYouTubePageVideos(
    createPageHtml([createLockup("abcdefghijk", "Sunday teaching", "1:02:03")]),
    3,
  );

  assert.equal(videos.length, 1);
  assert.equal(videos[0]?.videoId, "abcdefghijk");
  assert.equal(videos[0]?.title, "Sunday teaching");
  assert.equal(videos[0]?.publishedAt, undefined);
  assert.match(videos[0]?.image || "", /hqdefault/);
});

test("filters Shorts and other videos of three minutes or less", () => {
  const videos = parseYouTubePageVideos(
    createPageHtml([
      createLockup("shortvideo1", "Short update", "0:59"),
      createLockup("longvideo01", "Full sermon", "45:00"),
    ]),
    3,
  );

  assert.deepEqual(videos.map((video) => video.videoId), ["longvideo01"]);
});
