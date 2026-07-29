import { defineField, defineType } from "sanity";

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

export const easterServicePageType = defineType({
  name: "easterServicePage",
  title: "Easter Service Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "details", title: "Service Details" },
    { name: "rsvp", title: "RSVP" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "hero",
      initialValue: "Easter Service",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "seo",
      initialValue: { current: "easter-service" },
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      group: "hero",
      initialValue: "Resurrection Sunday",
    }),
    defineField({
      name: "summary",
      title: "Short summary",
      type: "text",
      rows: 4,
      group: "hero",
      validation: (rule) => rule.required().max(340),
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
          initialValue: "CBF Dwarka Easter Service",
        }),
      ],
    }),
    defineField({
      name: "serviceDateTime",
      title: "Service date/time",
      type: "datetime",
      group: "details",
    }),
    defineField({
      name: "eventYear",
      title: "Event year",
      type: "number",
      group: "details",
      description: "A separate Easter RSVP spreadsheet is used for each year.",
      initialValue: () => new Date().getFullYear(),
      validation: (rule) => rule.required().integer().min(2020).max(2100),
    }),
    defineField({
      name: "scheduleLabel",
      title: "Schedule label",
      type: "string",
      group: "details",
      description: "Shown when a confirmed date is not set or as supporting text below the date.",
      initialValue: "Easter Sunday at 10:30 AM",
    }),
    defineField({
      name: "locationName",
      title: "Location name",
      type: "string",
      group: "details",
      initialValue: "Mount Carmel School",
    }),
    defineField({
      name: "locationAddress",
      title: "Location address",
      type: "text",
      rows: 3,
      group: "details",
      initialValue: "CBF Dwarka, Taekwondo Room, Mount Carmel School, Sector 22, Dwarka",
    }),
    defineField({
      name: "mapUrl",
      title: "Google Maps link",
      type: "url",
      group: "details",
      validation: (rule) => rule.custom(urlValidation),
    }),
    defineField({
      name: "details",
      title: "Detail cards",
      type: "array",
      group: "details",
      of: [
        {
          type: "object",
          name: "serviceDetail",
          title: "Service detail",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "value",
            },
          },
        },
      ],
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
      initialValue: false,
      description: "Turn this off when registration for this year's Easter Service is closed.",
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
  preview: {
    select: {
      title: "title",
      eventYear: "eventYear",
      rsvpEnabled: "rsvpEnabled",
      scheduleLabel: "scheduleLabel",
      media: "heroImage",
    },
    prepare({ title, eventYear, rsvpEnabled, scheduleLabel }) {
      const rsvpState = rsvpEnabled ? "RSVP open" : "RSVP closed";
      const year = eventYear ? String(eventYear) : "Year not set";

      return {
        title: `${title || "Easter Service"} - ${year}`,
        subtitle: `${rsvpState}${scheduleLabel ? ` - ${scheduleLabel}` : ""}`,
      };
    },
  },
});
