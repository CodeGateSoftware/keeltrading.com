import { defineCollection, z } from "astro:content";
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

/**
 * #41 — release notes, fetched at build time by scripts/fetch-release.mjs
 * into src/content/changelog/ (gitignored; the fetch script is the only
 * writer). One markdown file per release; frontmatter carries the tag,
 * date and GitHub URL the changelog page renders around the body.
 */
const changelog = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/changelog" }),
  schema: z.object({
    tag: z.string(),
    name: z.string(),
    publishedAt: z.string(),
    url: z.string(),
  }),
});

export const collections = {
  "engine-docs": engineDocs,
  changelog,
};
