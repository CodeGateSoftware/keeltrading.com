/**
 * FR-7 — i18n & RTL in the architecture from day one.
 *
 * `en` is the source of truth; `ar` was the launch translation and `fr` has
 * since shipped the full page set. `es` is not a locale yet (D4) — adding one
 * must stay content + config only.
 */
export const locales = ["en", "ar", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function dirFor(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "ar" || value === "fr";
}

/** The site map (FR-2). Slugs stay identical across locales for v1. */
export const pageKeys = [
  "home",
  "features",
  "install",
  "docs",
  "assistant",
  "news",
  "community",
  "compliance",
  "compare",
  "about",
  "changelog",
  "guides",
] as const;
export type PageKey = (typeof pageKeys)[number];

export function localePath(locale: Locale, key: PageKey): string {
  if (key === "home") return `/${locale}/`;
  if (key === "docs") return `/${locale}/docs/`;
  if (key === "guides") return `/${locale}/guides/`;
  return `/${locale}/${key}/`;
}

export const SITE = "https://keeltrading.com";

/** FR-7 — hreflang alternates for a standard site-map page (exists in both locales). */
export function alternatesFor(key: PageKey): { locale: Locale; path: string }[] {
  return locales.map((locale) => ({ locale, path: localePath(locale, key) }));
}

export const ENGINE_REPO = "CodeGateSoftware/keel";
export const ENGINE_URL = "https://github.com/CodeGateSoftware/keel";
export const ENGINE_RELEASES_URL = "https://github.com/CodeGateSoftware/keel/releases";
export const ENGINE_DISCUSSIONS_URL = "https://github.com/CodeGateSoftware/keel/discussions";

/** FR-8 — a translation is stale when its source revision moved past it. */
export interface LocalizedPage<T> {
  en: T & { rev: string };
  ar: T & { rev: string; translatedFromRev: string };
  fr: T & { rev: string; translatedFromRev: string };
}

export function isStaleTranslation<T>(page: LocalizedPage<T>, locale: Locale): boolean {
  if (locale === "en") return false;
  return page[locale].translatedFromRev !== page.en.rev;
}

/** Deterministic, locale-neutral date rendering (YYYY-MM-DD). */
export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  return iso.slice(0, 10);
}
