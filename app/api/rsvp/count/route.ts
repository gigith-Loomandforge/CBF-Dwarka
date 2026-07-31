import { NextResponse } from "next/server";
import { client } from "../../../../sanity/lib/client";
import {
  getRsvpAttendeeCount,
  isGoogleSheetsConfigured,
  type RsvpEventType,
} from "../google-sheets";

const eventDocumentTypes: Record<RsvpEventType, string> = {
  offsite: "offsitePage",
  easter: "easterServicePage",
  christmas: "christmasServicePage",
};

const isRsvpEventType = (value: string | null): value is RsvpEventType =>
  Boolean(value && Object.prototype.hasOwnProperty.call(eventDocumentTypes, value));

const jsonResponse = (body: { attendeeTotal?: number; message?: string }, status = 200) =>
  NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });

export async function GET(request: Request) {
  if (!client || !isGoogleSheetsConfigured()) {
    return jsonResponse({ message: "Registration total is not available." }, 503);
  }

  const url = new URL(request.url);
  const eventId = url.searchParams.get("eventId")?.trim() || "";
  const eventType = url.searchParams.get("eventType");

  if (!eventId || eventId.length > 120 || !isRsvpEventType(eventType)) {
    return jsonResponse({ message: "This event is not available." }, 400);
  }

  let event: {
    _id: string;
    eventYear?: number;
    dateTime?: string;
    serviceDateTime?: string;
  } | null = null;

  try {
    event = await client.fetch(
      `*[_type == $documentType && _id == $eventId][0]{
        _id,
        eventYear,
        dateTime,
        serviceDateTime
      }`,
      { documentType: eventDocumentTypes[eventType], eventId },
    );
  } catch {
    return jsonResponse({ message: "Registration total is not available." }, 503);
  }

  if (!event) {
    return jsonResponse({ message: "This event is not available." }, 404);
  }

  const eventDate = event.serviceDateTime || event.dateTime;
  const fallbackYear = eventDate ? new Date(eventDate).getFullYear() : NaN;
  const eventYear = event.eventYear ?? fallbackYear;

  if (!Number.isInteger(eventYear) || eventYear < 2020 || eventYear > 2100) {
    return jsonResponse({ message: "Registration total is not available." }, 503);
  }

  try {
    const attendeeTotal = await getRsvpAttendeeCount({
      eventId,
      eventType,
      eventYear,
    });

    return jsonResponse({ attendeeTotal });
  } catch (error) {
    console.error(
      "Google Sheets RSVP count failed.",
      error instanceof Error ? error.message : "Unknown error",
    );
    return jsonResponse({ message: "Registration total is not available." }, 503);
  }
}
