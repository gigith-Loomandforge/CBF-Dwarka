import { NextResponse } from "next/server";
import { writeClient } from "../../../sanity/lib/client";

type RsvpMemberInput = {
  name?: unknown;
  age?: unknown;
};

const maxMembers = 12;
const maxNameLength = 90;

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
  if (!writeClient) {
    return NextResponse.json(
      { message: "RSVP is not configured yet. Please contact CBF Dwarka directly." },
      { status: 503 },
    );
  }

  let payload: {
    eventId?: unknown;
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
  const partySize = 1 + additionalMembers.length;

  await writeClient.create({
    _type: "offsiteRsvp",
    ...(eventId
      ? {
          event: {
            _type: "reference",
            _ref: eventId,
          },
        }
      : {}),
    primaryName: primaryResult.member.name,
    primaryAge: primaryResult.member.age,
    additionalMembers,
    partySize,
    privacyAccepted: true,
    submittedAt: new Date().toISOString(),
    source: "website",
  });

  return NextResponse.json({
    message: "RSVP received.",
    partySize,
  });
}
