import type { PageKey, LocalizedPage } from "../config";
import { home, type HomeContent } from "./home";
import { features, type FeaturesContent } from "./features";
import { install, type InstallContent } from "./install";
import { docs, type DocsContent } from "./docs";
import { news, type NewsContent } from "./news";
import { community, type CommunityContent } from "./community";
import { compliance, type ComplianceContent } from "./compliance";
import { compare, type CompareContent } from "./compare";
import { about, type AboutContent } from "./about";
import { changelog, type ChangelogContent } from "./changelog";

/**
 * FR-8 — the layout reads this registry to stamp every translated page with
 * its "last translated against English revision" marker and to show the
 * stale banner when the English revision has moved past the translation.
 * (Guides are EN-only editorial pages, like the engine documents, so they
 * carry no translation entries.)
 */
export const pageDicts: Record<Exclude<PageKey, "guides">, LocalizedPage<unknown>> = {
  home,
  features,
  install,
  docs,
  news,
  community,
  compliance,
  compare,
  about,
  changelog,
};

export type {
  HomeContent,
  FeaturesContent,
  InstallContent,
  DocsContent,
  NewsContent,
  CommunityContent,
  ComplianceContent,
  CompareContent,
  AboutContent,
  ChangelogContent,
};
