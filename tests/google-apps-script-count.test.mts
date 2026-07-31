import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source = readFileSync(
  new URL("../google-apps-script/Code.gs", import.meta.url),
  "utf8",
);
const context = vm.createContext({ console });
vm.runInContext(source, context);

const countAttendees = vm.runInContext("countAttendees_", context) as (
  sheet: {
    getLastRow: () => number;
    getRange: () => { getDisplayValues: () => string[][] };
  },
  eventId: string,
) => number;

const validateCountPayload = vm.runInContext("validateCountPayload_", context) as (
  payload: Record<string, unknown>,
) => { eventId: string; eventType: string; eventYear: number };

test("counts only attendee rows belonging to the requested event", () => {
  const sheet = {
    getLastRow: () => 5,
    getRange: () => ({
      getDisplayValues: () => [
        ["offsite-2026"],
        ["offsite-2026"],
        ["different-event"],
        ["offsite-2026"],
      ],
    }),
  };

  assert.equal(countAttendees(sheet, "offsite-2026"), 3);
});

test("returns zero when an attendee sheet has no registrations", () => {
  const sheet = {
    getLastRow: () => 1,
    getRange: () => {
      throw new Error("getRange should not be called");
    },
  };

  assert.equal(countAttendees(sheet, "offsite-2026"), 0);
});

test("validates count requests without accepting arbitrary event types", () => {
  const result = validateCountPayload({
    eventId: "offsite-2026",
    eventType: "OFFSITE",
    eventYear: 2026,
  });

  assert.deepEqual(
    { ...result },
    {
      eventId: "offsite-2026",
      eventType: "offsite",
      eventYear: 2026,
    },
  );
  assert.throws(
    () =>
      validateCountPayload({
        eventId: "offsite-2026",
        eventType: "unknown",
        eventYear: 2026,
      }),
    /Invalid event type/,
  );
});
