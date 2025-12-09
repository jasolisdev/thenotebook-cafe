import { defineType, defineField } from "sanity";

export default defineType({
  name: "jobApplication",
  title: "Job Applications",
  type: "document",
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Full name is required"),
    }),
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
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (Rule) => Rule.required().error("Phone number is required"),
    }),
    defineField({
      name: "positions",
      title: "Position(s) Interested In",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Barista", value: "barista" },
          { title: "Opening Shift Lead", value: "opening-lead" },
          { title: "Closing Shift Lead", value: "closing-lead" },
          { title: "Kitchen Prep/Barista", value: "kitchen-prep" },
        ],
      },
      validation: (Rule) =>
        Rule.required().min(1).error("Select at least one position"),
    }),
    defineField({
      name: "resume",
      title: "Resume",
      type: "file",
      options: {
        accept: ".pdf,.doc,.docx",
      },
      validation: (Rule) => Rule.required().error("Resume is required"),
    }),
    defineField({
      name: "employmentType",
      title: "Employment Type",
      type: "string",
      options: {
        list: [
          { title: "Full-time", value: "full-time" },
          { title: "Part-time", value: "part-time" },
          { title: "Weekends Only", value: "weekends" },
          { title: "Flexible", value: "flexible" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required().error("Employment type is required"),
    }),
    defineField({
      name: "daysAvailable",
      title: "Days Available",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Monday", value: "monday" },
          { title: "Tuesday", value: "tuesday" },
          { title: "Wednesday", value: "wednesday" },
          { title: "Thursday", value: "thursday" },
          { title: "Friday", value: "friday" },
          { title: "Saturday", value: "saturday" },
        ],
        layout: "grid",
      },
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("Select at least one day")
          .custom((days) => {
            if (!days || !Array.isArray(days)) return true;
            const hasSaturday = days.includes("saturday");
            return hasSaturday || "Saturday availability is required";
          }),
    }),
    defineField({
      name: "startDate",
      title: "When Can You Start?",
      type: "date",
      validation: (Rule) => Rule.required().error("Start date is required"),
    }),
    defineField({
      name: "hoursPerWeek",
      title: "Hours Per Week Desired",
      type: "string",
      options: {
        list: [
          { title: "0-16 Hours", value: "0-16" },
          { title: "16-20 Hours", value: "16-20" },
          { title: "20-35 Hours", value: "20-35" },
          { title: "35-40 Hours", value: "35-40" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required().error("Hours per week is required"),
    }),
    defineField({
      name: "commitmentLength",
      title: "How Long Do You Plan to Work Here?",
      type: "string",
      options: {
        list: [
          { title: "3-6 months (Seasonal/Short-term)", value: "3-6-months" },
          { title: "6-12 months", value: "6-12-months" },
          { title: "1-2 years", value: "1-2-years" },
          { title: "2+ years (Long-term/Career)", value: "2plus-years" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required().error("Commitment length is required"),
    }),
    defineField({
      name: "supplementalApplication",
      title: "Supplemental Application (Optional)",
      type: "file",
      options: {
        accept: ".pdf",
      },
      description: "Optional: Upload a completed application form if you have additional information to provide",
    }),
    defineField({
      name: "message",
      title: "Why The Notebook Café?",
      type: "text",
      rows: 4,
      description: "Tell us why you want to work here",
      validation: (Rule) =>
        Rule.required()
          .min(20)
          .error("Please write at least a few sentences about yourself"),
    }),
    defineField({
      name: "status",
      title: "Application Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Under Review", value: "reviewing" },
          { title: "Interview Scheduled", value: "interview" },
          { title: "Accepted", value: "accepted" },
          { title: "Declined", value: "declined" },
        ],
        layout: "dropdown",
      },
      initialValue: "new",
    }),
    defineField({
      name: "notes",
      title: "Internal Notes",
      type: "text",
      description: "Internal notes about the applicant (not visible to them)",
    }),
    defineField({
      name: "appliedAt",
      title: "Applied At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "email",
      positions: "positions",
      status: "status",
    },
    prepare({ title, subtitle, positions, status }) {
      return {
        title: title || "No name",
        subtitle: `${subtitle} • ${positions?.join(", ") || "No position"} • ${status}`,
      };
    },
  },
  orderings: [
    {
      title: "Application Date (Newest First)",
      name: "appliedAtDesc",
      by: [{ field: "appliedAt", direction: "desc" }],
    },
    {
      title: "Application Date (Oldest First)",
      name: "appliedAtAsc",
      by: [{ field: "appliedAt", direction: "asc" }],
    },
    {
      title: "Status",
      name: "status",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
});
