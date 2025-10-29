import { defineType, defineField } from "sanity";

const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroHeadline",
      type: "string",
      title: "Main Headline",
      description: `Example: "The Notebook Café"`,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroTagline",
      type: "string",
      title: "Tagline / Subheadline",
      description: `Short line under the headline. Example: "Coffee. Culture. House Music."`,
    }),
    defineField({
      name: "statusLine",
      type: "string",
      title: "Status Line",
      description: `This shows big under the tagline. Example: "☕ Coming Soon ☕" or "Soft Opening – Riverside, CA"`,
    }),
    defineField({
      name: "ctaText",
      type: "string",
      title: "Button Text",
      description: `Example: "Follow us on Instagram" or "Get Updates"`,
    }),
    defineField({
      name: "ctaUrl",
      type: "url",
      title: "Button Link URL",
      description: `Where the button goes. Example: "https://instagram.com/the.notebookcafe"`,
    }),
    defineField({
      name: "whatToExpectBullets",
      type: "array",
      title: `Highlights / Bullets`,
      of: [{ type: "string" }],
      description: `One per line. Example: "Specialty espresso, roasted right", "House music energy, daytime into night", "Stay, study, create — Riverside"`,
    }),
    defineField({
      name: "vibeCopy",
      type: "text",
      title: "Vibe / Mission Paragraph",
      description:
        "Small paragraph under the bullets. Talk about Riverside, the music, the 'stay and create' energy.",
      rows: 3,
    }),
    defineField({
      name: "heroImage",
      type: "image",
      title: "Hero Image (future use)",
      description:
        "Optional: espresso machine / interior mood photo. Not live on the site yet.",
      options: { hotspot: true },
    }),
  ],
});

export default homePage;
