const SECRET_PROPERTY = "RSVP_WEBHOOK_SECRET";
const SPREADSHEET_PROPERTY_PREFIX = "RSVP_SPREADSHEET_";
const SHEET_NAME = "Attendees";
const EVENT_NAMES = {
  offsite: "CBF Offsite",
  easter: "CBF Easter Service",
  christmas: "CBF Christmas Service",
};
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

    if (String(payload.action || "") === "count") {
      const countRequest = validateCountPayload_(payload);
      const spreadsheet = getExistingSpreadsheet_(
        countRequest.eventType,
        countRequest.eventYear,
      );

      if (!spreadsheet) {
        return jsonResponse_({ ok: true, attendeeCount: 0 });
      }

      const sheet = spreadsheet.getSheetByName(SHEET_NAME);
      const attendeeCount = sheet
        ? countAttendees_(sheet, countRequest.eventId)
        : 0;

      return jsonResponse_({ ok: true, attendeeCount: attendeeCount });
    }

    const normalized = validatePayload_(payload);
    const lock = LockService.getScriptLock();

    if (!lock.tryLock(8000)) {
      throw new Error("RSVP storage is busy");
    }

    try {
      const spreadsheet = getOrCreateSpreadsheet_(
        normalized.eventType,
        normalized.eventYear,
      );
      const sheet = spreadsheet.getSheetByName(SHEET_NAME);

      if (hasSubmission_(sheet, normalized.submissionId)) {
        return jsonResponse_({
          ok: true,
          duplicate: true,
          spreadsheetId: spreadsheet.getId(),
          attendeeCount: countAttendees_(sheet, normalized.eventId),
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
      SpreadsheetApp.flush();

      return jsonResponse_({
        ok: true,
        duplicate: false,
        spreadsheetId: spreadsheet.getId(),
        rowsAdded: rows.length,
        attendeeCount: countAttendees_(sheet, normalized.eventId),
      });
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, error: "Unable to store RSVP" });
  }
}

function getExistingSpreadsheet_(eventType, eventYear) {
  const properties = PropertiesService.getScriptProperties();
  const propertyName =
    SPREADSHEET_PROPERTY_PREFIX + eventType.toUpperCase() + "_" + eventYear;
  const existingId = properties.getProperty(propertyName);

  if (existingId) {
    try {
      return SpreadsheetApp.openById(existingId);
    } catch (error) {
      properties.deleteProperty(propertyName);
    }
  }

  // Reuse the sheet created by the original year-only Offsite integration.
  if (eventType === "offsite") {
    const legacyPropertyName = SPREADSHEET_PROPERTY_PREFIX + eventYear;
    const legacyId = properties.getProperty(legacyPropertyName);

    if (legacyId) {
      try {
        const legacySpreadsheet = SpreadsheetApp.openById(legacyId);
        properties.setProperty(propertyName, legacyId);
        return legacySpreadsheet;
      } catch (error) {
        properties.deleteProperty(legacyPropertyName);
      }
    }
  }

  return null;
}

function getOrCreateSpreadsheet_(eventType, eventYear) {
  const existingSpreadsheet = getExistingSpreadsheet_(eventType, eventYear);

  if (existingSpreadsheet) {
    return existingSpreadsheet;
  }

  const properties = PropertiesService.getScriptProperties();
  const propertyName =
    SPREADSHEET_PROPERTY_PREFIX + eventType.toUpperCase() + "_" + eventYear;
  const spreadsheet = SpreadsheetApp.create(
    EVENT_NAMES[eventType] + " RSVP " + eventYear,
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

function countAttendees_(sheet, eventId) {
  const attendeeRows = sheet.getLastRow() - 1;

  if (attendeeRows < 1) {
    return 0;
  }

  return sheet
    .getRange(2, 4, attendeeRows, 1)
    .getDisplayValues()
    .filter(function (row) {
      return String(row[0]) === eventId;
    }).length;
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

function validateCountPayload_(payload) {
  const eventYear = Number(payload.eventYear);
  const eventId = String(payload.eventId || "").trim();
  const eventType = String(payload.eventType || "").trim().toLowerCase();

  if (!eventId || eventId.length > 120) {
    throw new Error("Invalid event ID");
  }

  if (!Object.prototype.hasOwnProperty.call(EVENT_NAMES, eventType)) {
    throw new Error("Invalid event type");
  }

  if (
    !Number.isInteger(eventYear) ||
    eventYear < 2020 ||
    eventYear > 2100
  ) {
    throw new Error("Invalid event year");
  }

  return {
    eventId: eventId,
    eventType: eventType,
    eventYear: eventYear,
  };
}

function validatePayload_(payload) {
  const eventYear = Number(payload.eventYear);
  const partySize = Number(payload.partySize);
  const attendees = Array.isArray(payload.attendees) ? payload.attendees : [];
  const eventId = String(payload.eventId || "").trim();
  const eventType = String(payload.eventType || "").trim().toLowerCase();

  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      String(payload.submissionId || ""),
    )
  ) {
    throw new Error("Invalid submission ID");
  }

  if (!eventId || eventId.length > 120) {
    throw new Error("Invalid event ID");
  }

  if (!Object.prototype.hasOwnProperty.call(EVENT_NAMES, eventType)) {
    throw new Error("Invalid event type");
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
    eventType: eventType,
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
