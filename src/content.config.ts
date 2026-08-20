import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

/**
 * FR-4 — engine documents, fetched at build time by
 * scripts/fetch-engine-docs.mjs into src/content/engine-docs/ (gitignored;
 * the fetch script is the only writer). Titles and sources live in the
 * sidecar data/docs-meta.json written by the same script.
 */
const engineDocs = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/engine-docs" }),
});

export const collections = {
  "engine-docs": engineDocs,
};
