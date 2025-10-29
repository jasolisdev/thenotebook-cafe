import { defineType, defineField } from "sanity";

const menuItem = defineType({
  name: "menuItem",
  title: "Menu Items",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Item Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      description: `Flavor notes, vibe, why it's special.`,
    }),
    defineField({
      name: "price",
      type: "string",
      title: "Price (display)",
      description: `Example: "5.50" or "6"`,
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Category",
      options: {
        list: [
          { title: "Espresso", value: "espresso" },
          { title: "Latte / Signature", value: "latte" },
          { title: "Cold Brew", value: "cold-brew" },
          { title: "Tea / Matcha", value: "tea" },
          { title: "Pastry / Food", value: "food" },
          { title: "Seasonal / Limited", value: "seasonal" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "isFeatured",
      type: "boolean",
      title: "Show on Homepage Highlights?",
      initialValue: false,
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
    }),
  ],
});

export default menuItem;
