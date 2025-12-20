import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "missing-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "missing-dataset";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token: process.env.SANITY_WRITE_TOKEN, // Editor or higher
  useCdn: false,
});
