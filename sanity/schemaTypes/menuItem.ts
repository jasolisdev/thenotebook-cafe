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
      name: "section",
      type: "string",
      title: "Menu Section",
      options: {
        list: [
          { title: "Drinks", value: "drinks" },
          { title: "Meals", value: "meals" },
          { title: "Desserts", value: "desserts" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
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
      name: "icon",
      type: "string",
      title: "Icon Name",
      description: "Icon identifier for the menu item (e.g., 'espresso-cup', 'latte-glass')",
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
