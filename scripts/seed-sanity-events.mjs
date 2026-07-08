import { createClient } from "next-sanity";
import { existsSync, readFileSync } from "node:fs";

const loadLocalEnv = () => {
  if (!existsSync(".env.local")) {
    return;
  }

  const lines = readFileSync(".env.local", "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const [key, ...valueParts] = trimmed.split("=");
    process.env[key] ||= valueParts.join("=");
  }
};

loadLocalEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "nyb83ihi";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID.");
}

if (!token) {
  throw new Error("Missing SANITY_API_TOKEN. Create a Sanity write token before running this script.");
}

const client = createClient({
  apiVersion: "2026-07-07",
  dataset,
  projectId,
  token,
  useCdn: false,
});

const events = [
  {
    _id: "event-sunday-worship",
    _type: "event",
    title: "Sunday Worship",
    showOnHomepage: true,
    order: 1,
    scheduleLabel: "Sun - 10:30 AM",
    recurrenceDay: "sunday",
    recurrenceTime: "10:30",
    homepageDateLabel: "Every Sunday",
    homepageTimeLabel: "10:30 AM",
    location: "Dwarka, New Delhi",
    locationDetail: "Worship & community",
    description: "Gather with us for worship, prayer, teaching, and fellowship.",
    ctaLabel: "Plan Your Visit",
    ctaHref: "#visit",
  },
  {
    _id: "event-bible-study",
    _type: "event",
    title: "Bible Study",
    showOnHomepage: true,
    order: 2,
    scheduleLabel: "Wed - 7:30 PM",
    recurrenceDay: "wednesday",
    recurrenceTime: "19:30",
    homepageDateLabel: "Every Wednesday",
    homepageTimeLabel: "7:30 PM",
    location: "Dwarka, New Delhi",
    locationDetail: "Discipleship",
    description: "A focused time to study Scripture, ask questions, and grow together.",
    ctaLabel: "Learn More",
    ctaHref: "#events",
  },
  {
    _id: "event-prayer-gathering",
    _type: "event",
    title: "Prayer Gathering",
    showOnHomepage: true,
    order: 3,
    dateTime: "2026-07-26T12:30:00Z",
    scheduleLabel: "Sunday, Jul 26 - 6:00 PM",
    homepageDateLabel: "Sunday, Jul 26",
    homepageTimeLabel: "6:00 PM",
    location: "Dwarka, New Delhi",
    locationDetail: "Prayer",
    description: "Join the church family for prayer for one another, the city, and the church.",
    ctaLabel: "Learn More",
    ctaHref: "#events",
  },
];

await Promise.all(events.map((event) => client.createOrReplace(event)));

console.log(`Seeded ${events.length} events into ${projectId}/${dataset}.`);
