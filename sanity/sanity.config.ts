import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk"; // ✅ correct for Sanity v4
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "The Notebook Café",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  apiVersion: "2025-01-01",
  basePath: "/studio",

  plugins: [deskTool()], // ✅ add this line

  schema: {
    types: schemaTypes,
  },
});
