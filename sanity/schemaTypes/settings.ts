import { defineType, defineField } from "sanity";

const settings = defineType({
  name: "settings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "businessName",
      type: "string",
      title: "Business Name",
      initialValue: "The Notebook Café",
    }),
    defineField({
      name: "address",
      type: "string",
      title: "Address",
      description:
        "Street address, city, state. This will show on the site and footer.",
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "Phone",
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Contact Email",
    }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "object",
      fields: [
        defineField({
          name: "weekday",
          type: "string",
          title: "Mon–Fri",
          description: `Example: "7am – 9pm"`,
        }),
        defineField({
          name: "weekend",
          type: "string",
          title: "Sat–Sun",
          description: `Example: "8am – Late"`,
        }),
      ],
    }),
    defineField({
      name: "social",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({
          name: "instagram",
          type: "url",
          title: "Instagram URL",
          description: "https://instagram.com/the.notebookcafe",
        }),
        defineField({
          name: "tiktok",
          type: "url",
          title: "TikTok URL",
        }),
        defineField({
          name: "spotify",
          type: "url",
          title: "Spotify / Playlist URL",
          description: "Link to your house/lofi playlist for the café vibe.",
        }),
      ],
    }),
    defineField({
      name: "announcementBanner",
      title: "Announcement Banner",
      type: "object",
      description:
        "Optional site-wide bar for things like 'Soft Opening Friday'",
      fields: [
        defineField({
          name: "isActive",
          type: "boolean",
          title: "Show Banner?",
          initialValue: false,
        }),
        defineField({
          name: "text",
          type: "string",
          title: "Banner Text",
          description: `Example: "Soft Opening Soon • Riverside, CA"`,
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "Default SEO / Meta",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          type: "string",
          title: "Default Meta Title",
        }),
        defineField({
          name: "metaDescription",
          type: "text",
          title: "Default Meta Description",
        }),
        defineField({
          name: "openGraphImage",
          type: "image",
          title: "Social Share Image",
          options: { hotspot: true },
        }),
      ],
    }),
  ],
});

export default settings;
