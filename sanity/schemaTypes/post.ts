import { defineType, defineField } from "sanity";

const post = defineType({
  name: "post",
  title: "Posts / Updates",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      type: "image",
      title: "Cover Image",
      options: { hotspot: true },
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Publish Date",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "body",
      type: "array",
      title: "Body",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
      description: `Examples: "event", "menu", "hiring", "soft-opening"`,
    }),
  ],
});

export default post;
