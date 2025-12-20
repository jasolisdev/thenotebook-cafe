import { createClient } from "next-sanity";

export const hasSanityConfig = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET
);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "missing-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "missing-dataset";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: true,
});
