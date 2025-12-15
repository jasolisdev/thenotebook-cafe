import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactMessage",
  title: "Contact Messages",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(254)
          .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
            name: "email",
            invert: false,
          })
          .error("Enter a valid email address"),
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 6,
      validation: (Rule) => Rule.required().max(5000),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "new",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: { title: "subject", subtitle: "email" },
  },
});
