import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
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
      description: "Lower numbers appear first.",
      initialValue: 1,
    }),
    defineField({
      name: "dateTime",
      title: "Event date/time",
      type: "datetime",
      group: "content",
      description: "Use this for dated events. Recurring events can use the labels below.",
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
      showOnHomepage: "showOnHomepage",
    },
    prepare({ title, subtitle, showOnHomepage }) {
      return {
        title,
        subtitle: `${subtitle || "No schedule set"}${showOnHomepage ? "" : " - hidden from homepage"}`,
      };
    },
  },
});
