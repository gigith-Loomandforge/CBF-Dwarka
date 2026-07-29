export type GoogleSheetsAttendee = {
  attendeeType: "Primary attendee" | "Additional member";
  name: string;
  age: number;
};

export type GoogleSheetsRsvpPayload = {
  submissionId: string;
  submittedAt: string;
  eventId: string;
  eventTitle: string;
  eventYear: number;
  partySize: number;
  attendees: GoogleSheetsAttendee[];
  privacyAccepted: true;
  source: string;
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

  let result: { ok?: boolean };

  try {
    result = (await response.json()) as { ok?: boolean };
  } catch {
    throw new Error("Google Sheets RSVP returned an invalid response.");
  }

  if (result.ok !== true) {
    throw new Error("Google Sheets RSVP rejected the submission.");
  }
};
