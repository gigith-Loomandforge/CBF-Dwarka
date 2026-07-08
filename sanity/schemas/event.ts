import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "showOnHomepage",
      title: "Show on homepage",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 1,
    }),
    defineField({
      name: "dateTime",
      title: "Event date/time",
      type: "datetime",
      description: "Use this for dated events. Recurring events can use the labels below.",
    }),
    defineField({
      name: "scheduleLabel",
      title: "Schedule label",
      type: "string",
      description: "Shown in the event cards, e.g. Sun • 10:30 AM.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "homepageDateLabel",
      title: "Homepage date label",
      type: "string",
      description: "Shown in the black homepage event card, e.g. Every Sunday.",
    }),
    defineField({
      name: "homepageTimeLabel",
      title: "Homepage time label",
      type: "string",
      description: "Shown in the black homepage event card, e.g. 10:30 AM.",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "locationDetail",
      title: "Short location detail",
      type: "string",
      description: "Shown beside the location, e.g. Worship & community.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
      initialValue: "Learn More",
    }),
    defineField({
      name: "ctaHref",
      title: "CTA link",
      type: "string",
      initialValue: "#events",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "scheduleLabel",
    },
  },
});
