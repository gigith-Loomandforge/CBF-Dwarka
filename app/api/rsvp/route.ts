import { NextResponse } from "next/server";
import { client } from "../../../sanity/lib/client";
import {
  isGoogleSheetsConfigured,
  sendRsvpToGoogleSheets,
  type RsvpEventType,
} from "./google-sheets";

type RsvpMemberInput = {
  name?: unknown;
  age?: unknown;
};

const maxMembers = 12;
const maxNameLength = 90;
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

const normalizeName = (value: unknown) => (typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "");

const normalizeAge = (value: unknown) => {
  const numericValue = typeof value === "number" ? value : Number(value);
  return Number.isInteger(numericValue) ? numericValue : null;
};

const validateMember = (member: RsvpMemberInput, label: string) => {
  const name = normalizeName(member.name);
  const age = normalizeAge(member.age);

  if (!name) {
    return { error: `${label} name is required.` };
  }

  if (name.length > maxNameLength) {
    return { error: `${label} name is too long.` };
  }

  if (age === null || age < 0 || age > 120) {
    return { error: `${label} age must be between 0 and 120.` };
  }

  return { member: { name, age } };
};

export async function POST(request: Request) {
  if (!client || !isGoogleSheetsConfigured()) {
    return NextResponse.json(
      { message: "RSVP is not configured yet. Please contact CBF Dwarka directly." },
      { status: 503 },
    );
  }

  let payload: {
    eventId?: unknown;
    eventType?: unknown;
    primary?: RsvpMemberInput;
    additionalMembers?: RsvpMemberInput[];
    privacyAccepted?: unknown;
  };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid RSVP submission." }, { status: 400 });
  }

  if (payload.privacyAccepted !== true) {
    return NextResponse.json({ message: "Please accept the privacy policy and terms." }, { status: 400 });
  }

  const primaryResult = validateMember(payload.primary || {}, "Primary attendee");

  if ("error" in primaryResult) {
    return NextResponse.json({ message: primaryResult.error }, { status: 400 });
  }

  const rawAdditionalMembers = Array.isArray(payload.additionalMembers) ? payload.additionalMembers : [];

  if (rawAdditionalMembers.length > maxMembers) {
    return NextResponse.json({ message: `Please add no more than ${maxMembers} additional members.` }, { status: 400 });
  }

  const additionalMembers = [];

  for (const [index, member] of rawAdditionalMembers.entries()) {
    const hasAnyValue = Boolean(normalizeName(member.name) || String(member.age ?? "").trim());

    if (!hasAnyValue) {
      continue;
    }

    const result = validateMember(member, `Additional member ${index + 1}`);

    if ("error" in result) {
      return NextResponse.json({ message: result.error }, { status: 400 });
    }

    additionalMembers.push({
      _key: crypto.randomUUID(),
      name: result.member.name,
      age: result.member.age,
    });
  }

  const eventId = typeof payload.eventId === "string" && payload.eventId.trim() ? payload.eventId.trim() : null;
  const eventType = isRsvpEventType(payload.eventType) ? payload.eventType : null;

  if (!eventId || !eventType) {
    return NextResponse.json({ message: "This event is not available for RSVP." }, { status: 400 });
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
    return NextResponse.json(
      { message: "We could not confirm the event status. Please try again." },
      { status: 503 },
    );
  }

  if (
    !event ||
    (eventConfig.requiresActive && event.isActive !== true) ||
    event.rsvpEnabled !== true
  ) {
    return NextResponse.json(
      { message: "RSVP is closed for this event." },
      { status: 409 },
    );
  }

  const partySize = 1 + additionalMembers.length;
  const submissionId = crypto.randomUUID();
  const submittedAt = new Date().toISOString();
  const eventDate = event.serviceDateTime || event.dateTime || submittedAt;
  const eventYear = event.eventYear ?? new Date(eventDate).getFullYear();

  try {
    await sendRsvpToGoogleSheets({
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
  } catch (error) {
    console.error(
      "Google Sheets RSVP write failed.",
      error instanceof Error ? error.message : "Unknown error",
    );
    return NextResponse.json(
      { message: "We could not save your RSVP right now. Please try again." },
      { status: 503 },
    );
  }

  return NextResponse.json({
    message: "RSVP received.",
    partySize,
  });
}
