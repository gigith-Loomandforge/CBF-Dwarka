"use client";

import Link from "next/link";
import { FormEvent, useMemo, useRef, useState } from "react";

type AdditionalMember = {
  id: string;
  name: string;
  age: string;
};

type SubmitState =
  | { status: "idle"; message: "" }
  | { status: "loading"; message: "Submitting your RSVP..." }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

type OffsiteRsvpFormProps = {
  eventId?: string;
  title: string;
  intro: string;
};

const createMember = (id: number): AdditionalMember => ({
  id: `family-member-${id}`,
  name: "",
  age: "",
});

export function OffsiteRsvpForm({ eventId, title, intro }: OffsiteRsvpFormProps) {
  const memberId = useRef(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [members, setMembers] = useState<AdditionalMember[]>([]);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle", message: "" });

  const partySize = useMemo(() => 1 + members.filter((member) => member.name.trim() || member.age.trim()).length, [members]);

  const updateMember = (id: string, field: "name" | "age", value: string) => {
    setMembers((currentMembers) =>
      currentMembers.map((member) => (member.id === id ? { ...member, [field]: value } : member)),
    );
  };

  const removeMember = (id: string) => {
    setMembers((currentMembers) => currentMembers.filter((member) => member.id !== id));
  };

  const addMember = () => {
    memberId.current += 1;
    setMembers((currentMembers) => [...currentMembers, createMember(memberId.current)]);
  };

  const resetForm = () => {
    setName("");
    setAge("");
    setMembers([]);
    setPrivacyAccepted(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState({ status: "loading", message: "Submitting your RSVP..." });

    try {
      const response = await fetch("/api/offsite-rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          primary: { name, age },
          additionalMembers: members.map((member) => ({ name: member.name, age: member.age })),
          privacyAccepted,
        }),
      });

      const data = (await response.json()) as { message?: string; partySize?: number };

      if (!response.ok) {
        setSubmitState({ status: "error", message: data.message || "Unable to submit the RSVP right now." });
        return;
      }

      const confirmedCount = data.partySize || partySize;
      setSubmitState({
        status: "success",
        message: `Thank you. Your RSVP for ${confirmedCount} ${confirmedCount === 1 ? "attendee" : "attendees"} has been received.`,
      });
      resetForm();
    } catch {
      setSubmitState({ status: "error", message: "Unable to submit the RSVP right now. Please try again." });
    }
  };

  return (
    <form className="offsite-rsvp-form" onSubmit={handleSubmit}>
      <div className="offsite-form-header">
        <p className="about-kicker">RSVP</p>
        <h2 id="offsite-rsvp-title">{title}</h2>
        <p>{intro}</p>
      </div>

      <div className="offsite-form-grid">
        <label>
          <span>Name</span>
          <input
            autoComplete="name"
            maxLength={90}
            name="name"
            onChange={(event) => setName(event.target.value)}
            required
            type="text"
            value={name}
          />
        </label>
        <label>
          <span>Age</span>
          <input
            inputMode="numeric"
            max="120"
            min="0"
            name="age"
            onChange={(event) => setAge(event.target.value)}
            required
            type="number"
            value={age}
          />
        </label>
      </div>

      <div className="offsite-members">
        <div className="offsite-members-header">
          <div>
            <h3>Additional members</h3>
            <p>Add family members attending with you.</p>
          </div>
          <button
            className="offsite-secondary-button"
            disabled={members.length >= 12}
            onClick={addMember}
            type="button"
          >
            Add member
          </button>
        </div>

        {members.map((member, index) => (
          <div className="offsite-member-card" key={member.id}>
            <div className="offsite-member-title">
              <h4>Family member {index + 1}</h4>
              <button aria-label={`Remove family member ${index + 1}`} className="offsite-remove-button" onClick={() => removeMember(member.id)} type="button">
                Remove
              </button>
            </div>
            <div className="offsite-member-row">
              <label>
                <span>Name</span>
                <input
                  maxLength={90}
                  onChange={(event) => updateMember(member.id, "name", event.target.value)}
                  required={Boolean(member.age)}
                  type="text"
                  value={member.name}
                />
              </label>
              <label>
                <span>Age</span>
                <input
                  inputMode="numeric"
                  max="120"
                  min="0"
                  onChange={(event) => updateMember(member.id, "age", event.target.value)}
                  required={Boolean(member.name)}
                  type="number"
                  value={member.age}
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <label className="offsite-consent">
        <input
          checked={privacyAccepted}
          onChange={(event) => setPrivacyAccepted(event.target.checked)}
          required
          type="checkbox"
        />
        <span>
          I agree to the <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms &amp; Conditions</Link>.
        </span>
      </label>

      <div className="offsite-form-footer">
        <p>{partySize} {partySize === 1 ? "attendee" : "attendees"} in this RSVP</p>
        <button className="offsite-primary-button" disabled={submitState.status === "loading"} type="submit">
          {submitState.status === "loading" ? "Submitting" : "Submit RSVP"}
        </button>
      </div>

      {submitState.message ? (
        <p className={`offsite-form-status ${submitState.status}`} role={submitState.status === "error" ? "alert" : "status"}>
          {submitState.message}
        </p>
      ) : null}
    </form>
  );
}
