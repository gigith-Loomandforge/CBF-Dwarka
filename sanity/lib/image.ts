import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, hasSanityConfig, projectId } from "../env";

const builder = hasSanityConfig ? createImageUrlBuilder({ projectId, dataset }) : null;

export const urlForImage = (source?: SanityImageSource) => {
  if (!builder || !source) {
    return "";
  }

  return builder.image(source).width(900).height(506).fit("crop").auto("format").url();
};
