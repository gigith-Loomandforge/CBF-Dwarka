import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  validation: (rule) =>
    rule.custom((document) => {
      if (document?.dateTime || (document?.recurrenceDay && document?.recurrenceTime)) {
        return true;
      }

      return "Add an event date/time for one-time events, or set a weekly recurrence day and time.";
    }),
  groups: [
    { name: "content", title: "Event Content", default: true },
    { name: "homepage", title: "Homepage Display" },
    { name: "settings", title: "Publishing Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "showOnHomepage",
      title: "Show on homepage",
      type: "boolean",
      group: "settings",
      description: "Turn this off to save an event in the CMS without showing it on the website.",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      group: "settings",
      description: "Used only as a tie-breaker when events have the same upcoming date/time.",
      initialValue: 1,
    }),
    defineField({
      name: "dateTime",
      title: "Event date/time",
      type: "datetime",
      group: "content",
      description: "Use this for one-time or irregular events. Weekly events can use the recurrence fields below.",
    }),
    defineField({
      name: "recurrenceDay",
      title: "Repeats weekly on",
      type: "string",
      group: "content",
      description: "Use this for weekly recurring events such as Sunday Worship.",
      options: {
        list: [
          { title: "Sunday", value: "sunday" },
          { title: "Monday", value: "monday" },
          { title: "Tuesday", value: "tuesday" },
          { title: "Wednesday", value: "wednesday" },
          { title: "Thursday", value: "thursday" },
          { title: "Friday", value: "friday" },
          { title: "Saturday", value: "saturday" },
        ],
      },
    }),
    defineField({
      name: "recurrenceTime",
      title: "Weekly recurrence time",
      type: "string",
      group: "content",
      description: "Use 24-hour HH:mm format, e.g. 10:30 or 18:30.",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (!value) {
            return context.document?.recurrenceDay ? "Add a weekly recurrence time." : true;
          }

          return /^([01]\d|2[0-3]):[0-5]\d$/.test(value) ? true : "Use 24-hour HH:mm format, e.g. 10:30.";
        }),
    }),
    defineField({
      name: "scheduleLabel",
      title: "Schedule label",
      type: "string",
      group: "content",
      description: "Shown in the event cards, e.g. Sun • 10:30 AM.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "homepageDateLabel",
      title: "Homepage date label",
      type: "string",
      group: "homepage",
      description: "Shown in the black homepage event card, e.g. Every Sunday.",
    }),
    defineField({
      name: "homepageTimeLabel",
      title: "Homepage time label",
      type: "string",
      group: "homepage",
      description: "Shown in the black homepage event card, e.g. 10:30 AM.",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "locationDetail",
      title: "Short location detail",
      type: "string",
      group: "homepage",
      description: "Shown beside the location, e.g. Worship & community.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "content",
      rows: 3,
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
      group: "content",
      initialValue: "Learn More",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA link",
      type: "string",
      group: "content",
      initialValue: "#events",
      validation: (rule) =>
        rule.custom((value) => {
          if (!value || value.startsWith("#") || value.startsWith("/")) {
            return true;
          }

          try {
            new URL(value);
            return true;
          } catch {
            return "Use a section link like #visit, a page path like /events, or a full URL.";
          }
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "scheduleLabel",
      dateTime: "dateTime",
      recurrenceDay: "recurrenceDay",
      recurrenceTime: "recurrenceTime",
      showOnHomepage: "showOnHomepage",
    },
    prepare({ title, subtitle, dateTime, recurrenceDay, recurrenceTime, showOnHomepage }) {
      const recurrenceLabel =
        recurrenceDay && recurrenceTime ? `Every ${recurrenceDay} at ${recurrenceTime}` : "";
      const timing = subtitle || recurrenceLabel || dateTime || "No schedule set";

      return {
        title,
        subtitle: `${timing}${showOnHomepage ? "" : " - hidden from homepage"}`,
      };
    },
  },
});
