import type { PageKey, LocalizedPage } from "../config";
import { home, type HomeContent } from "./home";
import { features, type FeaturesContent } from "./features";
import { install, type InstallContent } from "./install";
import { docs, type DocsContent } from "./docs";
import { news, type NewsContent } from "./news";
import { community, type CommunityContent } from "./community";
import { compliance, type ComplianceContent } from "./compliance";
import { about, type AboutContent } from "./about";

/**
 * FR-8 — the layout reads this registry to stamp every Arabic page with its
 * "last translated against English revision" marker and to show the stale
 * banner when the English revision has moved past the translation.
 */
export const pageDicts: Record<PageKey, LocalizedPage<unknown>> = {
  home,
  features,
  install,
  docs,
  news,
  community,
  compliance,
  about,
};

export type {
  HomeContent,
  FeaturesContent,
  InstallContent,
  DocsContent,
  NewsContent,
  CommunityContent,
  ComplianceContent,
  AboutContent,
};
