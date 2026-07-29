const SECRET_PROPERTY = "RSVP_WEBHOOK_SECRET";
const SPREADSHEET_PROPERTY_PREFIX = "RSVP_SPREADSHEET_";
const SHEET_NAME = "Attendees";
const HEADERS = [
  "Submission ID",
  "Submitted at",
  "Event",
  "Event ID",
  "Event year",
  "RSVP group",
  "Attendee type",
  "Name",
  "Age",
  "Party size",
  "Source",
  "Privacy accepted",
];

function doGet() {
  return jsonResponse_({
    ok: true,
    service: "CBF Dwarka RSVP",
  });
}

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents || "{}");
    const expectedSecret =
      PropertiesService.getScriptProperties().getProperty(SECRET_PROPERTY);

    if (
      !expectedSecret ||
      !secureEquals_(String(payload.secret || ""), expectedSecret)
    ) {
      return jsonResponse_({ ok: false, error: "Unauthorized" });
    }

    const normalized = validatePayload_(payload);
    const lock = LockService.getScriptLock();
    lock.waitLock(20000);

    try {
      const spreadsheet = getOrCreateSpreadsheet_(
        normalized.eventTitle,
        normalized.eventYear,
      );
      const sheet = spreadsheet.getSheetByName(SHEET_NAME);

      if (hasSubmission_(sheet, normalized.submissionId)) {
        return jsonResponse_({
          ok: true,
          duplicate: true,
          spreadsheetId: spreadsheet.getId(),
        });
      }

      const rows = normalized.attendees.map(function (attendee) {
        return [
          asText_(normalized.submissionId),
          new Date(normalized.submittedAt),
          asText_(normalized.eventTitle),
          asText_(normalized.eventId),
          normalized.eventYear,
          asText_(normalized.primaryName),
          asText_(attendee.attendeeType),
          asText_(attendee.name),
          attendee.age,
          normalized.partySize,
          asText_(normalized.source),
          normalized.privacyAccepted,
        ];
      });

      const startRow = sheet.getLastRow() + 1;
      sheet.getRange(startRow, 1, rows.length, HEADERS.length).setValues(rows);
      sheet
        .getRange(startRow, 2, rows.length, 1)
        .setNumberFormat("dd mmm yyyy, hh:mm");

      return jsonResponse_({
        ok: true,
        duplicate: false,
        spreadsheetId: spreadsheet.getId(),
        rowsAdded: rows.length,
      });
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, error: "Unable to store RSVP" });
  }
}

function getOrCreateSpreadsheet_(eventTitle, eventYear) {
  const properties = PropertiesService.getScriptProperties();
  const propertyName = SPREADSHEET_PROPERTY_PREFIX + eventYear;
  const existingId = properties.getProperty(propertyName);

  if (existingId) {
    try {
      return SpreadsheetApp.openById(existingId);
    } catch (error) {
      properties.deleteProperty(propertyName);
    }
  }

  const safeTitle =
    String(eventTitle || "CBF Offsite")
      .replace(/[\\/:*?"<>|#%{}\[\]]/g, "")
      .trim()
      .slice(0, 80) || "CBF Offsite";
  const spreadsheet = SpreadsheetApp.create(
    safeTitle + " RSVP " + eventYear,
  );
  const sheet = spreadsheet.getSheets()[0];

  sheet.setName(SHEET_NAME);
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.setFrozenRows(1);
  sheet
    .getRange(1, 1, 1, HEADERS.length)
    .setBackground("#516100")
    .setFontColor("#ffffff")
    .setFontWeight("bold");
  sheet.autoResizeColumns(1, HEADERS.length);
  properties.setProperty(propertyName, spreadsheet.getId());

  return spreadsheet;
}

function hasSubmission_(sheet, submissionId) {
  if (sheet.getLastRow() < 2) {
    return false;
  }

  return Boolean(
    sheet
      .getRange(2, 1, sheet.getLastRow() - 1, 1)
      .createTextFinder(submissionId)
      .matchEntireCell(true)
      .findNext(),
  );
}

function validatePayload_(payload) {
  const eventYear = Number(payload.eventYear);
  const partySize = Number(payload.partySize);
  const attendees = Array.isArray(payload.attendees) ? payload.attendees : [];
  const eventId = String(payload.eventId || "").trim();

  if (!/^[a-f0-9-]{36}$/i.test(String(payload.submissionId || ""))) {
    throw new Error("Invalid submission ID");
  }

  if (!eventId || eventId.length > 120) {
    throw new Error("Invalid event ID");
  }

  if (payload.privacyAccepted !== true) {
    throw new Error("Privacy acceptance is required");
  }

  if (
    !Number.isInteger(eventYear) ||
    eventYear < 2020 ||
    eventYear > 2100
  ) {
    throw new Error("Invalid event year");
  }

  if (
    !Number.isInteger(partySize) ||
    partySize < 1 ||
    partySize > 13 ||
    attendees.length !== partySize
  ) {
    throw new Error("Invalid party size");
  }

  const normalizedAttendees = attendees.map(function (attendee) {
    const name = String(attendee.name || "").trim();
    const age = Number(attendee.age);
    const attendeeType = String(attendee.attendeeType || "");

    if (!name || name.length > 90) {
      throw new Error("Invalid attendee name");
    }

    if (!Number.isInteger(age) || age < 0 || age > 120) {
      throw new Error("Invalid attendee age");
    }

    if (
      attendeeType !== "Primary attendee" &&
      attendeeType !== "Additional member"
    ) {
      throw new Error("Invalid attendee type");
    }

    return {
      attendeeType: attendeeType,
      name: name,
      age: age,
    };
  });

  const submittedAt = new Date(payload.submittedAt);

  if (isNaN(submittedAt.getTime())) {
    throw new Error("Invalid submission date");
  }

  return {
    submissionId: String(payload.submissionId),
    submittedAt: submittedAt.toISOString(),
    eventTitle: String(payload.eventTitle || "CBF Offsite").trim().slice(0, 120),
    eventId: eventId,
    eventYear: eventYear,
    primaryName: normalizedAttendees[0].name,
    partySize: partySize,
    attendees: normalizedAttendees,
    privacyAccepted: payload.privacyAccepted === true,
    source: String(payload.source || "website").trim().slice(0, 40),
  };
}

function asText_(value) {
  const text = String(value == null ? "" : value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function secureEquals_(left, right) {
  if (left.length !== right.length) {
    return false;
  }

  let result = 0;

  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return result === 0;
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
