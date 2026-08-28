/**
 * Shared docs-navigation model (Aiven-style): sections with line icons,
 * a virtual Quickstart entry, and helpers shared by the sidebar, the docs
 * landing cards, and prev/next links. Reads data/docs-meta.json written by
 * the fetch script.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Read a build-time data file from data/. Resolves via process.cwd() — the
 * Astro build and dev server always run from the project root, unlike
 * import.meta.url which points at dist/chunks/*.mjs during builds.
 */
export function readDataFile<T>(name: string): T | null {
  try {
    return JSON.parse(readFileSync(join(process.cwd(), "data", name), "utf8")) as T;
  } catch {
    return null;
  }
}

export type SectionId = "get-started" | "guides" | "reference" | "decisions" | "research";

export interface DocMeta {
  slug: string;
  path: string;
  title: string;
  en: string;
  ar: string;
  fr: string;
  section: SectionId;
  sourceUrl: string;
}

export interface SectionMeta {
  id: SectionId;
  en: string;
  ar: string;
  fr: string;
}

interface MetaFile {
  repo: string;
  ref: string;
  fetchedAt: string;
  sections: SectionMeta[];
  docs: DocMeta[];
}

/** Only reachable if data/docs-meta.json is missing — a real build cannot get
 *  here, because the fetch script writes that file or exits non-zero. The ref
 *  is left empty rather than naming a branch: since #85 the site describes a
 *  release tag, and a hard-coded "main" here would be a claim, not a default. */
const FALLBACK_META: MetaFile = {
  repo: "CodeGateSoftware/keel",
  ref: "",
  fetchedAt: "",
  sections: [],
  docs: [],
};

export function loadDocsMeta(): MetaFile {
  return readDataFile<MetaFile>("docs-meta.json") ?? FALLBACK_META;
}

/** Section line icons — simple strokes, same visual weight as the brand mark. */
export const sectionIcons: Record<SectionId, string> = {
  // rocket
  "get-started":
    '<path d="M12 3c3 1 5 3.5 5 7l-2.5 2.5L16 15l-3 1-1 3-2.5-2.5L7 19l1-3-2.5-2.5H10c0-3.5 0-8 2-11Z" fill="none"/>',
  // compass
  guides:
    '<circle cx="12" cy="12" r="9" fill="none"/><path d="m15 9-2 5-4 1 2-5 4-1Z" fill="none"/>',
  // open book
  reference:
    '<path d="M12 5c-2-1.4-4.5-1.7-7-1v14c2.5-.7 5-.4 7 1 2-1.4 4.5-1.7 7-1V4c-2.5-.7-5-.4-7 1Zm0 0v14" fill="none"/>',
  // a record with a ruling: the document, and the check that settles it
  decisions:
    '<path d="M7 3h7l4 4v14H7z" fill="none"/><path d="M14 3v4h4" fill="none"/><path d="m10 14 2 2 4-4" fill="none"/>',
  // flask
  research:
    '<path d="M10 3v6L4.5 18a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 9V3M8.5 3h7" fill="none"/>',
};

export function sectionIconSvg(section: SectionId): string {
  return `<svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${sectionIcons[section]}</svg>`;
}

export function sectionLabel(
  section: SectionMeta,
  locale: "en" | "ar" | "fr",
): string {
  if (locale === "ar") return section.ar;
  if (locale === "fr") return section.fr;
  return section.en;
}

export interface NavDoc {
  slug: string;
  title: string;
  section: SectionId;
}

/** Flattened reading order: sidebar order == prev/next order. Decisions sit
 *  between reference and research: the "what it is" pages, then the recorded
 *  "why it is that way", then the measurements. Within the section, manifest
 *  order is ADR number (0001, 0002, 0003, …). */
export function readingOrder(meta: MetaFile): NavDoc[] {
  const order: SectionId[] = ["guides", "reference", "decisions", "research"];
  return order.flatMap((section) =>
    meta.docs.filter((doc) => doc.section === section).map((doc) => ({ slug: doc.slug, title: doc.title, section })),
  );
}

export function neighbors(slug: string): { prev: NavDoc | null; next: NavDoc | null } {
  const order = readingOrder(loadDocsMeta());
  const index = order.findIndex((doc) => doc.slug === slug);
  return {
    prev: index > 0 ? order[index - 1]! : null,
    next: index >= 0 && index < order.length - 1 ? order[index + 1]! : null,
  };
}
