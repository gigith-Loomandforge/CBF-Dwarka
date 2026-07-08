import { createClient } from "next-sanity";
import { apiVersion, dataset, hasSanityConfig, projectId } from "../env";

export const client = hasSanityConfig
  ? createClient({
      apiVersion,
      dataset,
      projectId,
      useCdn: false,
    })
  : null;
