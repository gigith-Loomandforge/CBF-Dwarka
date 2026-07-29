import { defineField, defineType } from "sanity";
import { apiVersion } from "../env";

const urlValidation = (value?: string) => {
  if (!value || value.startsWith("/")) {
    return true;
  }

  try {
    new URL(value);
    return true;
  } catch {
    return "Use a full URL or a page path that starts with /.";
  }
};

export const offsitePageType = defineType({
  name: "offsitePage",
  title: "Offsite Event",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "details", title: "Event Details" },
    { name: "rsvp", title: "RSVP" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required(),
      initialValue: "CBF Offsite",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "seo",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      initialValue: { current: "offsite" },
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      group: "hero",
      initialValue: "Church Family Gathering",
    }),
    defineField({
      name: "summary",
      title: "Short summary",
      type: "text",
      rows: 4,
      group: "hero",
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      group: "hero",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          initialValue: "CBF Dwarka offsite gathering",
        }),
      ],
    }),
    defineField({
      name: "dateTime",
      title: "Event date/time",
      type: "datetime",
      group: "details",
    }),
    defineField({
      name: "eventYear",
      title: "Event year",
      type: "number",
      group: "details",
      initialValue: () => new Date().getFullYear(),
      validation: (rule) => rule.required().integer().min(2020).max(2100),
    }),
    defineField({
      name: "isActive",
      title: "Active offsite event",
      type: "boolean",
      group: "details",
      initialValue: false,
      description:
        "The website uses the one active event at /offsite. Archive a previous event by turning this off before activating a new year.",
      validation: (rule) =>
        rule.custom(async (isActive, context) => {
          if (isActive !== true || !context.document?._id) {
            return true;
          }

          const publishedId = context.document._id.replace(/^drafts\./, "");
          const draftId = `drafts.${publishedId}`;

          try {
            const activeEventCount = await context
              .getClient({ apiVersion })
              .fetch<number>(
                `count(*[
                  _type == "offsitePage" &&
                  isActive == true &&
                  !(_id in [$publishedId, $draftId])
                ])`,
                { publishedId, draftId },
              );

            return activeEventCount === 0
              ? true
              : "Another offsite event is already active. Archive it before activating this event.";
          } catch {
            return true;
          }
        }),
    }),
    defineField({
      name: "scheduleLabel",
      title: "Schedule label",
      type: "string",
      group: "details",
      description: "Shown on the page, e.g. Sunday, 10:30 AM.",
    }),
    defineField({
      name: "locationName",
      title: "Location name",
      type: "string",
      group: "details",
    }),
    defineField({
      name: "locationAddress",
      title: "Location address",
      type: "text",
      rows: 3,
      group: "details",
    }),
    defineField({
      name: "mapUrl",
      title: "Google Maps link",
      type: "url",
      group: "details",
      validation: (rule) => rule.custom(urlValidation),
    }),
    defineField({
      name: "body",
      title: "Page content",
      type: "array",
      group: "details",
      of: [
        {
          type: "object",
          name: "contentSection",
          title: "Content section",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "heading",
              subtitle: "text",
            },
          },
        },
      ],
    }),
    defineField({
      name: "rsvpEnabled",
      title: "Enable RSVP form",
      type: "boolean",
      group: "rsvp",
      initialValue: true,
    }),
    defineField({
      name: "rsvpTitle",
      title: "RSVP title",
      type: "string",
      group: "rsvp",
      initialValue: "Confirm your attendance",
    }),
    defineField({
      name: "rsvpIntro",
      title: "RSVP intro",
      type: "text",
      rows: 3,
      group: "rsvp",
      initialValue: "Add your details and include any family members who will attend with you.",
    }),
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      group: "seo",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 2,
      group: "seo",
      validation: (rule) => rule.max(160),
    }),
  ],
  orderings: [
    {
      title: "Event year, newest first",
      name: "eventYearDesc",
      by: [{ field: "eventYear", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      eventYear: "eventYear",
      isActive: "isActive",
      scheduleLabel: "scheduleLabel",
      media: "heroImage",
    },
    prepare({ title, eventYear, isActive, scheduleLabel }) {
      const state = isActive ? "Active" : "Archived";
      const year = eventYear ? String(eventYear) : "Year not set";

      return {
        title: `${title || "CBF Offsite"} - ${year}`,
        subtitle: `${state}${scheduleLabel ? ` - ${scheduleLabel}` : ""}`,
      };
    },
  },
});
