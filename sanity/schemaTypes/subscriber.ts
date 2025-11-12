import { defineType, defineField } from "sanity";

export default defineType({
  name: "subscriber",
  title: "Subscribers",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
            name: "email",
            invert: false,
          })
          .error("Enter a valid email address"),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Where the signup came from (homepage, footer, etc.)",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Subscribed", value: "subscribed" },
          { title: "Pending", value: "pending" },
          { title: "Unsubscribed", value: "unsubscribed" },
        ],
        layout: "radio",
      },
      initialValue: "subscribed",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: { title: "email", subtitle: "status" },
  },
});
