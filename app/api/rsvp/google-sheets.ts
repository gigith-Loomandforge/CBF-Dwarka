export type GoogleSheetsAttendee = {
  attendeeType: "Primary attendee" | "Additional member";
  name: string;
  age: number;
};

export type RsvpEventType = "offsite" | "easter" | "christmas";

export type GoogleSheetsRsvpPayload = {
  submissionId: string;
  submittedAt: string;
  eventId: string;
  eventType: RsvpEventType;
  eventTitle: string;
  eventYear: number;
  partySize: number;
  attendees: GoogleSheetsAttendee[];
  privacyAccepted: true;
  source: string;
};

export type GoogleSheetsCountPayload = {
  eventId: string;
  eventType: RsvpEventType;
  eventYear: number;
};

type GoogleSheetsConfig = {
  url?: string;
  secret?: string;
  fetchImpl?: typeof fetch;
};

export const isGoogleSheetsConfigured = (
  url = process.env.GOOGLE_APPS_SCRIPT_RSVP_URL,
  secret = process.env.GOOGLE_APPS_SCRIPT_RSVP_SECRET,
) => Boolean(url?.trim() && secret?.trim());

const validateAppsScriptUrl = (value: string) => {
  const url = new URL(value);

  if (
    url.protocol !== "https:" ||
    url.hostname !== "script.google.com" ||
    !url.pathname.startsWith("/macros/s/") ||
    !url.pathname.endsWith("/exec")
  ) {
    throw new Error("The Google Apps Script RSVP URL is invalid.");
  }

  return url.toString();
};

export const sendRsvpToGoogleSheets = async (
  payload: GoogleSheetsRsvpPayload,
  config: GoogleSheetsConfig = {},
) => {
  return requestGoogleSheets(payload, config);
};

export const getRsvpAttendeeCount = async (
  payload: GoogleSheetsCountPayload,
  config: GoogleSheetsConfig = {},
) => {
  const result = await requestGoogleSheets(
    {
      action: "count",
      ...payload,
    },
    config,
  );

  if (!Number.isInteger(result.attendeeCount) || Number(result.attendeeCount) < 0) {
    throw new Error("Google Sheets RSVP returned an invalid attendee count.");
  }

  return Number(result.attendeeCount);
};

const requestGoogleSheets = async (
  payload: GoogleSheetsRsvpPayload | (GoogleSheetsCountPayload & { action: "count" }),
  config: GoogleSheetsConfig,
) => {
  const url = config.url ?? process.env.GOOGLE_APPS_SCRIPT_RSVP_URL;
  const secret = config.secret ?? process.env.GOOGLE_APPS_SCRIPT_RSVP_SECRET;
  const fetchImpl = config.fetchImpl ?? fetch;

  if (!url?.trim() || !secret?.trim()) {
    throw new Error("Google Sheets RSVP storage is not configured.");
  }

  const response = await fetchImpl(validateAppsScriptUrl(url.trim()), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      secret: secret.trim(),
    }),
    cache: "no-store",
    redirect: "follow",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Google Sheets RSVP request failed with status ${response.status}.`);
  }

  let result: { ok?: boolean; attendeeCount?: number };

  try {
    result = (await response.json()) as { ok?: boolean; attendeeCount?: number };
  } catch {
    throw new Error("Google Sheets RSVP returned an invalid response.");
  }

  if (result.ok !== true) {
    throw new Error("Google Sheets RSVP rejected the submission.");
  }

  return result;
};
