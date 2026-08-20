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
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = join(root, "data/release.json");
mkdirSync(join(root, "data"), { recursive: true });

const API = "https://api.github.com/repos/CodeGateSoftware/keel/releases/latest";
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
  fetchedAt: null,
};

try {
  const response = await fetch(API, { headers });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const release = await response.json();

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
