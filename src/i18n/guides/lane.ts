/**
 * The guides lane's combined reading order: the four Get Started guides
 * (EN, steps/screenshots model) followed by the deep explainers (EN + AR,
 * article model). Sidebar order == prev/next order, so a reader can walk
 * the whole lane from "Install and first run" to the last explainer.
 */
import { guides } from "./content";
import { explainers } from "./explainers";
import type { Locale } from "../config";

export type LaneKind = "guide" | "explainer";

export interface LaneEntry {
  slug: string;
  kind: LaneKind;
}

export const lane: LaneEntry[] = [
  ...guides.map((guide) => ({ slug: guide.slug, kind: "guide" as const })),
  ...explainers.map((explainer) => ({ slug: explainer.slug, kind: "explainer" as const })),
];

export function laneNeighbors(slug: string): { prev: LaneEntry | null; next: LaneEntry | null } {
  const index = lane.findIndex((entry) => entry.slug === slug);
  return {
    prev: index > 0 ? lane[index - 1]! : null,
    next: index >= 0 && index < lane.length - 1 ? lane[index + 1]! : null,
  };
}

/** Explainers exist per-locale; Get Started guides are EN-only for now. */
export function laneHref(entry: LaneEntry, locale: Locale): string {
  if (entry.kind === "explainer" && locale === "ar") return `/ar/guides/${entry.slug}/`;
  return `/en/guides/${entry.slug}/`;
}

export function laneTitle(entry: LaneEntry, locale: Locale): string {
  if (entry.kind === "explainer") {
    const explainer = explainers.find((e) => e.slug === entry.slug);
    return locale === "ar" ? explainer!.ar.title : explainer!.en.title;
  }
  return guides.find((guide) => guide.slug === entry.slug)!.title;
}
