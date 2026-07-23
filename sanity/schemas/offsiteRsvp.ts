import { defineField, defineType } from "sanity";

export const offsiteRsvpType = defineType({
  name: "offsiteRsvp",
  title: "Offsite RSVP",
  type: "document",
  fields: [
    defineField({
      name: "event",
      title: "Event",
      type: "reference",
      to: [{ type: "offsitePage" }],
      readOnly: true,
    }),
    defineField({
      name: "primaryName",
      title: "Primary attendee name",
      type: "string",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "primaryAge",
      title: "Primary attendee age",
      type: "number",
      readOnly: true,
      validation: (rule) => rule.required().integer().min(0).max(120),
    }),
    defineField({
      name: "additionalMembers",
      title: "Additional members",
      type: "array",
      readOnly: true,
      of: [
        {
          type: "object",
          name: "additionalMember",
          title: "Additional member",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "age",
              title: "Age",
              type: "number",
              validation: (rule) => rule.required().integer().min(0).max(120),
            }),
          ],
          preview: {
            select: {
              title: "name",
              age: "age",
            },
            prepare({ title, age }) {
              return {
                title,
                subtitle: typeof age === "number" ? `Age ${age}` : "Age not set",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "partySize",
      title: "Party size",
      type: "number",
      readOnly: true,
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: "privacyAccepted",
      title: "Privacy and terms accepted",
      type: "boolean",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      readOnly: true,
      initialValue: "website",
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "primaryName",
      partySize: "partySize",
      submittedAt: "submittedAt",
    },
    prepare({ title, partySize, submittedAt }) {
      const members = partySize === 1 ? "1 attendee" : `${partySize || 1} attendees`;

      return {
        title,
        subtitle: `${members}${submittedAt ? ` - ${new Date(submittedAt).toLocaleDateString("en-IN")}` : ""}`,
      };
    },
  },
});
