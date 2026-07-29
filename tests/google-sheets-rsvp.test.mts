import assert from "node:assert/strict";
import test from "node:test";
import {
  isGoogleSheetsConfigured,
  sendRsvpToGoogleSheets,
  type GoogleSheetsRsvpPayload,
} from "../app/api/offsite-rsvp/google-sheets.ts";

const payload: GoogleSheetsRsvpPayload = {
  submissionId: "77f14ae8-3ad8-4f1c-82d7-9362df4d65a0",
  submittedAt: "2026-07-29T12:00:00.000Z",
  eventId: "offsite-2026",
  eventTitle: "CBF Offsite",
  eventYear: 2026,
  partySize: 1,
  attendees: [
    {
      attendeeType: "Primary attendee",
      name: "Test Attendee",
      age: 30,
    },
  ],
  privacyAccepted: true,
  source: "test",
};

test("requires both Google Sheets settings", () => {
  assert.equal(isGoogleSheetsConfigured("", ""), false);
  assert.equal(isGoogleSheetsConfigured("https://script.google.com/macros/s/id/exec", ""), false);
  assert.equal(isGoogleSheetsConfigured("https://script.google.com/macros/s/id/exec", "secret"), true);
});

test("posts the RSVP and secret only to a valid Apps Script URL", async () => {
  let receivedBody = "";

  const fetchImpl: typeof fetch = async (_input, init) => {
    receivedBody = String(init?.body || "");
    return Response.json({ ok: true });
  };

  await sendRsvpToGoogleSheets(payload, {
    url: "https://script.google.com/macros/s/deployment-id/exec",
    secret: "server-only-secret",
    fetchImpl,
  });

  const body = JSON.parse(receivedBody);
  assert.equal(body.secret, "server-only-secret");
  assert.equal(body.submissionId, payload.submissionId);
  assert.equal(body.attendees[0].name, "Test Attendee");
});

test("rejects non-Apps-Script destinations", async () => {
  await assert.rejects(
    () =>
      sendRsvpToGoogleSheets(payload, {
        url: "https://example.com/webhook",
        secret: "secret",
      }),
    /invalid/,
  );
});

test("fails when Apps Script rejects a submission", async () => {
  const fetchImpl: typeof fetch = async () => Response.json({ ok: false });

  await assert.rejects(
    () =>
      sendRsvpToGoogleSheets(payload, {
        url: "https://script.google.com/macros/s/deployment-id/exec",
        secret: "secret",
        fetchImpl,
      }),
    /rejected/,
  );
});
