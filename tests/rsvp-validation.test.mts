import assert from "node:assert/strict";
import test from "node:test";

import {
  normalizeAge,
  normalizeName,
  validateMember,
} from "../app/api/rsvp/validation.ts";

test("normalizes attendee names without changing their words", () => {
  assert.equal(normalizeName("  Hanna   Thomas  "), "Hanna Thomas");
  assert.equal(normalizeName(null), "");
});

test("accepts only whole numeric ages", () => {
  assert.equal(normalizeAge(0), 0);
  assert.equal(normalizeAge("120"), 120);
  assert.equal(normalizeAge(" 35 "), 35);

  for (const value of ["", " ", "12.5", "-1", null, undefined, true, {}, []]) {
    assert.equal(normalizeAge(value), null);
  }
});

test("rejects ages outside the supported range", () => {
  assert.deepEqual(validateMember({ name: "Attendee", age: -1 }, "Primary attendee"), {
    error: "Primary attendee age must be between 0 and 120.",
  });
  assert.deepEqual(validateMember({ name: "Attendee", age: 121 }, "Primary attendee"), {
    error: "Primary attendee age must be between 0 and 120.",
  });
});

test("returns a normalized valid attendee", () => {
  assert.deepEqual(validateMember({ name: "  Family   Member ", age: "8" }, "Additional member 1"), {
    member: { name: "Family Member", age: 8 },
  });
});
