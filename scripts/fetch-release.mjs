#!/usr/bin/env node
/**
 * FR-6 — Downloads from Releases.
 *
 * Reads the public GitHub Releases REST endpoint (no auth required) and writes
 * data/release.json for the Install page: latest tag, release URL, and asset
 * links. Buttons link directly to GitHub assets — this site never mirrors
 * binaries.
 *
 * Failure policy (PRD risk table): degrade gracefully to the last known data.
 * A failed fetch never breaks the build; the Install page falls back to a
 * plain link to the Releases page.
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = join(root, "data/release.json");
mkdirSync(join(root, "data"), { recursive: true });

const API = "https://api.github.com/repos/CodeGateSoftware/keel/releases/latest";
// Patch releases since v0.11.1 ship wheels only; the macOS/Windows bundles
// live in the newest release that carries them (#97). Own fetch — the
// changelog's LIST_API const below would be a TDZ reference here.
const PLATFORM_LIST_API = "https://api.github.com/repos/CodeGateSoftware/keel/releases?per_page=15";
const PLATFORM_RE = /\.(dmg|pkg|exe|msi|zip)$/;
const headers = {
  accept: "application/vnd.github+json",
  "user-agent": "keeltrading.com-release-fetch",
};
if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const FALLBACK = {
  tag: null,
  name: null,
  url: "https://github.com/CodeGateSoftware/keel/releases/latest",
  publishedAt: null,
  assets: [],
  platformRelease: null,
  fetchedAt: null,
};

try {
  const response = await fetch(API, { headers });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const release = await response.json();

  let platformRelease = null;
  try {
    const listResponse = await fetch(PLATFORM_LIST_API, { headers });
    if (listResponse.ok) {
      const releases = await listResponse.json();
      const withBundles = (Array.isArray(releases) ? releases : []).find((r) =>
        (r.assets ?? []).some((a) => PLATFORM_RE.test(a.name ?? "")),
      );
      if (withBundles) {
        platformRelease = {
          tag: withBundles.tag_name,
          url: withBundles.html_url,
          assets: withBundles.assets
            .filter((a) => PLATFORM_RE.test(a.name ?? ""))
            .map((a) => ({ name: a.name, url: a.browser_download_url })),
        };
      }
    }
  } catch {
    // optional enrichment — the cards fall back to the release page without it
  }

  const data = {
    tag: release.tag_name,
    name: release.name,
    url: release.html_url,
    publishedAt: release.published_at,
    assets: (release.assets ?? []).map((asset) => ({
      name: asset.name,
      url: asset.browser_download_url,
      size: asset.size,
    })),
    platformRelease,
    fetchedAt: new Date().toISOString(),
  };
  writeFileSync(OUT, JSON.stringify(data, null, 2) + "\n");
  console.log(`  latest release: ${data.tag} (${data.assets.length} assets) -> data/release.json`);
} catch (error) {
  const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : null;
  if (previous?.tag) {
    console.warn(`  WARN: release fetch failed (${error.message}); keeping last-known ${previous.tag}`);
  } else {
    writeFileSync(OUT, JSON.stringify({ ...FALLBACK }, null, 2) + "\n");
    console.warn(`  WARN: release fetch failed (${error.message}); Install page will link to the Releases page`);
  }
}

// ---------------------------------------------------------------------------
// #41 — the changelog page. The full release list, newest first, written into
// the `changelog` content collection (gitignored; this script is the only
// writer, exactly like the engine docs). Same failure policy: a failed fetch
// never breaks the build — the page falls back to a plain Releases link.
const CHANGELOG_DIR = join(root, "src/content/changelog");
const LIST_API = "https://api.github.com/repos/CodeGateSoftware/keel/releases?per_page=100";

/** Demote every ATX heading one level, outside code fences, so each release's
 *  version heading (an H2 from the page template) stays the section's H2. */
function demoteHeadings(markdown) {
  let inFence = false;
  return markdown
    .split("\n")
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (!inFence && /^#{1,5} \S/.test(line)) return `#${line}`;
      return line;
    })
    .join("\n");
}

try {
  const response = await fetch(LIST_API, { headers });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const releases = (await response.json()).filter((release) => !release.draft);

  mkdirSync(CHANGELOG_DIR, { recursive: true });
  for (const stale of readdirSync(CHANGELOG_DIR)) {
    if (stale.endsWith(".md")) rmSync(join(CHANGELOG_DIR, stale));
  }
  for (const release of releases) {
    const frontmatter = [
      "---",
      `tag: ${JSON.stringify(release.tag_name)}`,
      `name: ${JSON.stringify(release.name ?? release.tag_name)}`,
      `publishedAt: ${JSON.stringify(release.published_at ?? "")}`,
      `url: ${JSON.stringify(release.html_url)}`,
      "---",
      "",
    ].join("\n");
    writeFileSync(
      join(CHANGELOG_DIR, `${release.tag_name}.md`),
      frontmatter + demoteHeadings(release.body ?? "") + "\n",
    );
  }
  console.log(`  changelog: ${releases.length} releases -> src/content/changelog/`);
} catch (error) {
  console.warn(`  WARN: changelog fetch failed (${error.message}); keeping any existing files`);
}
