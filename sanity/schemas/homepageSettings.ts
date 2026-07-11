import { defineField, defineType } from "sanity";

export const homepageSettingsType = defineType({
  name: "homepageSettings",
  title: "Homepage Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Homepage",
      readOnly: true,
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      description: "Main image shown at the top of the homepage.",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Short description for accessibility and SEO.",
          initialValue: "CBF Dwarka church family",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      media: "heroImage",
    },
    prepare({ media }) {
      return {
        title: "Homepage Settings",
        subtitle: "Hero image and homepage media",
        media,
      };
    },
  },
});
