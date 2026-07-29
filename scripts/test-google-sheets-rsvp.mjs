import { existsSync, readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";

if (existsSync(".env.local")) {
  const lines = readFileSync(".env.local", "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const [key, ...valueParts] = trimmed.split("=");
    process.env[key] ||= valueParts.join("=").replace(/^["']|["']$/g, "");
  }
}

const url = process.env.GOOGLE_APPS_SCRIPT_RSVP_URL;
const secret = process.env.GOOGLE_APPS_SCRIPT_RSVP_SECRET;

if (!url || !secret) {
  throw new Error(
    "Set GOOGLE_APPS_SCRIPT_RSVP_URL and GOOGLE_APPS_SCRIPT_RSVP_SECRET before running this test.",
  );
}

const eventYear = Number(process.argv[2]) || new Date().getFullYear();
const eventType = String(process.argv[3] || "offsite").trim().toLowerCase();
const eventNames = {
  offsite: "CBF Offsite",
  easter: "CBF Easter Service",
  christmas: "CBF Christmas Service",
};

if (!(eventType in eventNames)) {
  throw new Error("Service must be one of: offsite, easter, christmas.");
}

const submissionId = randomUUID();
const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    secret,
    submissionId,
    submittedAt: new Date().toISOString(),
    eventId: "integration-test",
    eventType,
    eventTitle: eventNames[eventType],
    eventYear,
    partySize: 1,
    attendees: [
      {
        attendeeType: "Primary attendee",
        name: "Integration Test - delete this row",
        age: 0,
      },
    ],
    privacyAccepted: true,
    source: "integration-test",
  }),
  redirect: "follow",
});

const result = await response.json();

if (!response.ok || result.ok !== true) {
  throw new Error(`Google Sheets integration test failed: ${JSON.stringify(result)}`);
}

console.log(
  `Google Sheets integration test passed for ${eventType} ${eventYear}. Submission ${submissionId} was added; delete the test row after review.`,
);

if (result.spreadsheetId) {
  console.log(`Spreadsheet: https://docs.google.com/spreadsheets/d/${result.spreadsheetId}/edit`);
}
