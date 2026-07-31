import { NextResponse } from "next/server";
import { client } from "../../../sanity/lib/client";
import {
  isGoogleSheetsConfigured,
  sendRsvpToGoogleSheets,
  type RsvpEventType,
} from "./google-sheets";
import { siteConfig } from "../../site-config";
import {
  maxMembers,
  normalizeName,
  validateMember,
  type RsvpMemberInput,
} from "./validation";

const maxRequestCharacters = 20_000;
const minimumFormCompletionMilliseconds = 1_500;
const maximumFormAgeMilliseconds = 2 * 60 * 60 * 1_000;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const rsvpEventConfigs: Record<
  RsvpEventType,
  { documentType: string; fallbackTitle: string; requiresActive: boolean }
> = {
  offsite: {
    documentType: "offsitePage",
    fallbackTitle: "CBF Offsite",
    requiresActive: true,
  },
  easter: {
    documentType: "easterServicePage",
    fallbackTitle: "CBF Easter Service",
    requiresActive: false,
  },
  christmas: {
    documentType: "christmasServicePage",
    fallbackTitle: "CBF Christmas Service",
    requiresActive: false,
  },
};

const isRsvpEventType = (value: unknown): value is RsvpEventType =>
  typeof value === "string" &&
  Object.prototype.hasOwnProperty.call(rsvpEventConfigs, value);

const jsonResponse = (
  body: { message: string; partySize?: number; attendeeTotal?: number },
  status = 200,
) =>
  NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });

const hasAllowedOrigin = (request: Request) => {
  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  try {
    const url = new URL(origin);
    const vercelOrigins = [
      "https://cbf-dwarka.vercel.app",
      process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "",
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
    ];

    return (
      origin === siteConfig.url ||
      origin === siteConfig.url.replace("://www.", "://") ||
      vercelOrigins.includes(origin) ||
      (url.hostname === "localhost" && ["http:", "https:"].includes(url.protocol))
    );
  } catch {
    return false;
  }
};

export async function POST(request: Request) {
  if (!client || !isGoogleSheetsConfigured()) {
    return jsonResponse({ message: "RSVP is not configured yet. Please contact CBF Dwarka directly." }, 503);
  }

  if (!hasAllowedOrigin(request)) {
    return jsonResponse({ message: "This RSVP request could not be accepted." }, 403);
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);

  if (declaredLength > maxRequestCharacters) {
    return jsonResponse({ message: "This RSVP submission is too large." }, 413);
  }

  let payload: {
    eventId?: unknown;
    eventType?: unknown;
    submissionId?: unknown;
    formStartedAt?: unknown;
    website?: unknown;
    primary?: RsvpMemberInput;
    additionalMembers?: RsvpMemberInput[];
    privacyAccepted?: unknown;
  };

  try {
    const body = await request.text();

    if (body.length > maxRequestCharacters) {
      return jsonResponse({ message: "This RSVP submission is too large." }, 413);
    }

    const parsed = JSON.parse(body) as unknown;

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Invalid payload");
    }

    payload = parsed;
  } catch {
    return jsonResponse({ message: "Invalid RSVP submission." }, 400);
  }

  if (typeof payload.website === "string" && payload.website.trim()) {
    return jsonResponse({ message: "RSVP received." });
  }

  const formStartedAt = Number(payload.formStartedAt);
  const formAge = Date.now() - formStartedAt;

  if (
    !Number.isFinite(formStartedAt) ||
    formAge < minimumFormCompletionMilliseconds ||
    formAge > maximumFormAgeMilliseconds
  ) {
    return jsonResponse({ message: "Please review the form and submit it again." }, 429);
  }

  if (payload.privacyAccepted !== true) {
    return jsonResponse({ message: "Please accept the privacy policy and terms." }, 400);
  }

  const primaryResult = validateMember(payload.primary || {}, "Primary attendee");

  if ("error" in primaryResult) {
    return jsonResponse({ message: primaryResult.error }, 400);
  }

  const rawAdditionalMembers = Array.isArray(payload.additionalMembers) ? payload.additionalMembers : [];

  if (rawAdditionalMembers.length > maxMembers) {
    return jsonResponse({ message: `Please add no more than ${maxMembers} additional members.` }, 400);
  }

  const additionalMembers = [];

  for (const [index, rawMember] of rawAdditionalMembers.entries()) {
    const member = rawMember && typeof rawMember === "object" ? rawMember : {};
    const hasAnyValue = Boolean(normalizeName(member.name) || String(member.age ?? "").trim());

    if (!hasAnyValue) {
      continue;
    }

    const result = validateMember(member, `Additional member ${index + 1}`);

    if ("error" in result) {
      return jsonResponse({ message: result.error }, 400);
    }

    additionalMembers.push({
      _key: crypto.randomUUID(),
      name: result.member.name,
      age: result.member.age,
    });
  }

  const eventId = typeof payload.eventId === "string" && payload.eventId.trim() ? payload.eventId.trim() : null;
  const eventType = isRsvpEventType(payload.eventType) ? payload.eventType : null;
  const requestedSubmissionId =
    typeof payload.submissionId === "string" && uuidPattern.test(payload.submissionId)
      ? payload.submissionId
      : null;

  if (!eventId || eventId.length > 120 || !eventType || !requestedSubmissionId) {
    return jsonResponse({ message: "This event is not available for RSVP." }, 400);
  }

  const eventConfig = rsvpEventConfigs[eventType];
  let event: {
    _id: string;
    title?: string;
    eventYear?: number;
    dateTime?: string;
    serviceDateTime?: string;
    isActive?: boolean;
    rsvpEnabled?: boolean;
  } | null = null;

  try {
    event = await client.fetch(
      `*[_type == $documentType && _id == $eventId][0]{
        _id,
        title,
        eventYear,
        dateTime,
        serviceDateTime,
        isActive,
        rsvpEnabled
      }`,
      { documentType: eventConfig.documentType, eventId },
    );
  } catch {
    return jsonResponse({ message: "We could not confirm the event status. Please try again." }, 503);
  }

  let isLatestAnnualEvent = true;

  if (event && eventType !== "offsite") {
    const slug = eventType === "easter" ? "easter-service" : "christmas-service";

    try {
      const latestEventId = await client.fetch<string | null>(
        `(*[
          _type == $documentType &&
          slug.current == $slug
        ] | order(coalesce(eventYear, 0) desc, _updatedAt desc))[0]._id`,
        { documentType: eventConfig.documentType, slug },
      );
      isLatestAnnualEvent = latestEventId === event._id;
    } catch {
      return jsonResponse({ message: "We could not confirm the event status. Please try again." }, 503);
    }
  }

  const currentYear = new Date().getUTCFullYear();

  if (
    !event ||
    (eventConfig.requiresActive && event.isActive !== true) ||
    event.rsvpEnabled !== true ||
    !isLatestAnnualEvent ||
    (typeof event.eventYear === "number" && event.eventYear < currentYear)
  ) {
    return jsonResponse({ message: "RSVP is closed for this event." }, 409);
  }

  const partySize = 1 + additionalMembers.length;
  const submissionId = requestedSubmissionId;
  const submittedAt = new Date().toISOString();
  const eventDate = event.serviceDateTime || event.dateTime || submittedAt;
  const eventYear = event.eventYear ?? new Date(eventDate).getFullYear();

  try {
    const result = await sendRsvpToGoogleSheets({
      submissionId,
      submittedAt,
      eventId,
      eventType,
      eventTitle: event.title || eventConfig.fallbackTitle,
      eventYear,
      partySize,
      attendees: [
        {
          attendeeType: "Primary attendee",
          name: primaryResult.member.name,
          age: primaryResult.member.age,
        },
        ...additionalMembers.map((member) => ({
          attendeeType: "Additional member" as const,
          name: member.name,
          age: member.age,
        })),
      ],
      privacyAccepted: true,
      source: "website",
    });

    return jsonResponse({
      message: "RSVP received.",
      partySize,
      attendeeTotal:
        Number.isInteger(result.attendeeCount) && Number(result.attendeeCount) >= 0
          ? Number(result.attendeeCount)
          : undefined,
    });
  } catch (error) {
    console.error(
      "Google Sheets RSVP write failed.",
      error instanceof Error ? error.message : "Unknown error",
    );
    return jsonResponse({ message: "We could not save your RSVP right now. Please try again." }, 503);
  }

}
