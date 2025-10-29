import { defineType, defineField } from "sanity";

const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Page Title / Heading",
      description: `Example: "Our Story" or "The Notebook Café"`,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "body",
      type: "array",
      title: "Story / Intro Copy",
      description:
        "This is the main 'who we are / what we're building in Riverside' section at the top of the About page. Add paragraphs and optional inline images.",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
        },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),

    defineField({
      name: "valuesHeading",
      type: "string",
      title: "Values Section Heading",
      description: `Example: "What we’re building"`,
      initialValue: "What we’re building",
    }),

    defineField({
      name: "valuesBullets",
      type: "array",
      title: "Values / What We Stand For",
      description: `Short bullet lines. Example: 
- "A café that plays house, soul, and groove — not top 40 radio."
- "A space you can actually sit in. Stay, settle, think, create."
- "Coffee treated with respect — from beans to texture."
- "A Riverside original — for locals and creatives alike."`,
      of: [{ type: "string" }],
    }),

    defineField({
      name: "missionHeading",
      type: "string",
      title: "Mission Card Heading",
      description: `Example: "Why we’re doing this"`,
      initialValue: "Why we’re doing this",
    }),

    defineField({
      name: "founderNote",
      type: "text",
      title: "Founder / Mission Note",
      description:
        "Appears inside the bordered card. Talk directly to the guest about why this café exists. You can add line breaks.",
      rows: 5,
    }),
  ],
});

export default aboutPage;
