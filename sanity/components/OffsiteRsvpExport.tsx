"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useClient } from "sanity";
import { apiVersion } from "../env";

type OffsiteRsvpExportProps = {
  document: {
    displayed: {
      title?: string;
      eventYear?: number;
    };
  };
  documentId: string;
};

type RsvpMember = {
  name?: string;
  age?: number;
};

type RsvpRecord = {
  _id: string;
  primaryName?: string;
  primaryAge?: number;
  additionalMembers?: RsvpMember[];
  partySize?: number;
  submittedAt?: string;
  source?: string;
};

const rsvpQuery = `*[
  _type == "offsiteRsvp" &&
  event._ref == $eventId
] | order(submittedAt asc) {
  _id,
  primaryName,
  primaryAge,
  additionalMembers[] {
    name,
    age
  },
  partySize,
  submittedAt,
  source
}`;

const csvCell = (value: string | number | undefined) =>
  `"${String(value ?? "").replace(/"/g, '""')}"`;

const buildCsv = (
  rsvps: RsvpRecord[],
  eventTitle: string,
  eventYear?: number,
) => {
  const headers = [
    "Event",
    "Event year",
    "RSVP group",
    "Attendee type",
    "Name",
    "Age",
    "Party size",
    "Submitted at",
    "Source",
  ];

  const rows = rsvps.flatMap((rsvp) => {
    const common = [
      eventTitle,
      eventYear,
      rsvp.primaryName,
    ];
    const submission = [
      rsvp.partySize,
      rsvp.submittedAt,
      rsvp.source || "website",
    ];

    return [
      [
        ...common,
        "Primary attendee",
        rsvp.primaryName,
        rsvp.primaryAge,
        ...submission,
      ],
      ...(rsvp.additionalMembers || []).map((member) => [
        ...common,
        "Additional member",
        member.name,
        member.age,
        ...submission,
      ]),
    ];
  });

  return [headers, ...rows]
    .map((row) => row.map((value) => csvCell(value)).join(","))
    .join("\r\n");
};

const styles = {
  page: {
    maxWidth: 880,
    margin: "0 auto",
    padding: "40px 24px",
    color: "#1f2417",
    fontFamily: "system-ui, sans-serif",
  },
  panel: {
    border: "1px solid #d9ddcf",
    borderRadius: 8,
    background: "#ffffff",
    padding: 28,
  },
  eyebrow: {
    margin: "0 0 8px",
    color: "#68724c",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0,
    textTransform: "uppercase" as const,
  },
  heading: {
    margin: "0 0 12px",
    fontSize: 28,
    lineHeight: 1.2,
  },
  body: {
    maxWidth: 650,
    margin: "0 0 24px",
    color: "#5b6252",
    lineHeight: 1.6,
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 12,
    marginBottom: 24,
  },
  stat: {
    border: "1px solid #e6e9df",
    borderRadius: 6,
    background: "#f7f8f3",
    padding: 16,
  },
  statLabel: {
    display: "block",
    marginBottom: 6,
    color: "#68724c",
    fontSize: 12,
  },
  statValue: {
    fontSize: 24,
    lineHeight: 1,
  },
  actions: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 10,
  },
  primaryButton: {
    border: 0,
    borderRadius: 5,
    background: "#516100",
    color: "#ffffff",
    cursor: "pointer",
    padding: "11px 16px",
    fontSize: 14,
    fontWeight: 700,
  },
  secondaryButton: {
    border: "1px solid #bcc3ae",
    borderRadius: 5,
    background: "#ffffff",
    color: "#29301f",
    cursor: "pointer",
    padding: "10px 16px",
    fontSize: 14,
    fontWeight: 700,
  },
  error: {
    margin: "0 0 18px",
    borderLeft: "3px solid #c7342f",
    background: "#fff3f1",
    color: "#7f1d1d",
    padding: "12px 14px",
  },
};

export function OffsiteRsvpExport({
  document,
  documentId,
}: OffsiteRsvpExportProps) {
  const client = useClient({ apiVersion });
  const eventId = documentId.replace(/^drafts\./, "");
  const eventTitle = document.displayed.title || "CBF Offsite";
  const eventYear = document.displayed.eventYear;
  const [rsvps, setRsvps] = useState<RsvpRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const attendeeCount = useMemo(
    () => rsvps.reduce((total, rsvp) => total + (rsvp.partySize || 1), 0),
    [rsvps],
  );

  const loadRsvps = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const records = await client.fetch<RsvpRecord[]>(rsvpQuery, { eventId });
      setRsvps(records);
    } catch {
      setError("RSVPs could not be loaded. Check your Studio access and try again.");
    } finally {
      setIsLoading(false);
    }
  }, [client, eventId]);

  useEffect(() => {
    let isCancelled = false;

    client
      .fetch<RsvpRecord[]>(rsvpQuery, { eventId })
      .then((records) => {
        if (!isCancelled) {
          setRsvps(records);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setError("RSVPs could not be loaded. Check your Studio access and try again.");
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [client, eventId]);

  const downloadCsv = () => {
    const csv = buildCsv(rsvps, eventTitle, eventYear);
    const blob = new Blob([`\uFEFF${csv}`], {
      type: "text/csv;charset=utf-8",
    });
    const downloadUrl = URL.createObjectURL(blob);
    const anchor = window.document.createElement("a");
    const safeTitle = eventTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    anchor.href = downloadUrl;
    anchor.download = `${safeTitle || "cbf-offsite"}-${eventYear || "rsvps"}.csv`;
    window.document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <div style={styles.page}>
      <section style={styles.panel}>
        <p style={styles.eyebrow}>Private event data</p>
        <h2 style={styles.heading}>
          RSVP export{eventYear ? ` for ${eventYear}` : ""}
        </h2>
        <p style={styles.body}>
          Download one attendee per row, including ages, for use in Excel or Google Sheets.
          This file contains private information and should only be shared with the event team.
        </p>

        {error ? <p style={styles.error}>{error}</p> : null}

        <div style={styles.stats}>
          <div style={styles.stat}>
            <span style={styles.statLabel}>RSVP submissions</span>
            <strong style={styles.statValue}>{isLoading ? "..." : rsvps.length}</strong>
          </div>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Total attendees</span>
            <strong style={styles.statValue}>{isLoading ? "..." : attendeeCount}</strong>
          </div>
        </div>

        <div style={styles.actions}>
          <button
            disabled={isLoading || rsvps.length === 0}
            onClick={downloadCsv}
            style={{
              ...styles.primaryButton,
              cursor: isLoading || rsvps.length === 0 ? "not-allowed" : "pointer",
              opacity: isLoading || rsvps.length === 0 ? 0.5 : 1,
            }}
            type="button"
          >
            Download CSV
          </button>
          <button
            disabled={isLoading}
            onClick={() => void loadRsvps()}
            style={{
              ...styles.secondaryButton,
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.5 : 1,
            }}
            type="button"
          >
            {isLoading ? "Loading..." : "Refresh"}
          </button>
        </div>
      </section>
    </div>
  );
}
