import { createClient } from "next-sanity";
import { apiVersion, dataset, hasSanityConfig, projectId } from "../env";

const sanityApiToken = process.env.SANITY_API_TOKEN;

export const client = hasSanityConfig
  ? createClient({
      apiVersion,
      dataset,
      projectId,
      useCdn: false,
    })
  : null;

export const writeClient = hasSanityConfig && sanityApiToken
  ? createClient({
      apiVersion,
      dataset,
      projectId,
      token: sanityApiToken,
      useCdn: false,
    })
  : null;
