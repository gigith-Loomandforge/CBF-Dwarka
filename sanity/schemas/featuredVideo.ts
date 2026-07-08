import { defineField, defineType } from "sanity";

export const featuredVideoType = defineType({
  name: "featuredVideo",
  title: "Featured Video",
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
      name: "category",
      title: "Category label",
      type: "string",
      description: "Shown above the title, e.g. Sunday Sermon or Most Viewed.",
      initialValue: "Sunday Sermon",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "youtubeVideoId",
      title: "YouTube video ID",
      type: "string",
      description: "Optional. If set, the site can use YouTube's thumbnail when no custom thumbnail is uploaded.",
    }),
    defineField({
      name: "thumbnail",
      title: "Custom thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "thumbnail",
    },
  },
});
