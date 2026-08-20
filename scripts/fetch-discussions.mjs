#!/usr/bin/env node
/**
 * FR-5 — News from Discussions.
 *
 * Reads the Announcements category of CodeGateSoftware/keel Discussions via the
 * public REST endpoint and writes data/discussions.json for the News page.
 * Items deep-link to GitHub for reading and interaction; bodies stay in their
 * original language (never translated — D4/D5 non-goal).
 *
 * Deviation from the PRD, in keel's favour: GitHub's REST API now serves
 * discussions unauthenticated, so no GraphQL token and no Worker are needed.
 * GITHUB_TOKEN is still honoured when present (rate-limit headroom in CI).
 *
 * Failure policy: degrade gracefully to last-known data; never break the build.
 */
import { existsSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = join(root, "data/discussions.json");
mkdirSync(join(root, "data"), { recursive: true });

const API =
  "https://api.github.com/repos/CodeGateSoftware/keel/discussions?per_page=50&state=open";
const CATEGORY = "announcements"; // Show and tell joins later (FR-5)
const MAX_ITEMS = 10;

const headers = {
  accept: "application/vnd.github+json",
  "user-agent": "keeltrading.com-discussions-fetch",
};
if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

/** Markdown body -> short plain-text excerpt, for display only. */
function excerpt(body, limit = 280) {
  const text = body
    .replace(/```[\s\S]*?```/g, " ") // code fences
    .replace(/`[^`]*`/g, " ") // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> label
    .replace(/[#>*_~|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 200 ? lastSpace : limit)}…`;
}

try {
  const response = await fetch(API, { headers });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const all = await response.json();
  const items = (Array.isArray(all) ? all : [])
    .filter((discussion) => discussion.category?.slug === CATEGORY)
    .slice(0, MAX_ITEMS)
    .map((discussion) => ({
      number: discussion.number,
      title: discussion.title,
      url: discussion.html_url,
      createdAt: discussion.created_at,
      author: discussion.user?.login ?? null,
      comments: discussion.comments ?? 0,
      excerpt: excerpt(discussion.body ?? ""),
    }));

  const data = {
    category: CATEGORY,
    categoryUrl: `https://github.com/CodeGateSoftware/keel/discussions/categories/${CATEGORY}`,
    fetchedAt: new Date().toISOString(),
    items,
  };
  writeFileSync(OUT, JSON.stringify(data, null, 2) + "\n");
  console.log(`  discussions: ${items.length} announcement(s) -> data/discussions.json`);
} catch (error) {
  if (existsSync(OUT)) {
    console.warn(`  WARN: discussions fetch failed (${error.message}); keeping last-known items`);
  } else {
    writeFileSync(
      OUT,
      JSON.stringify(
        {
          category: CATEGORY,
          categoryUrl: `https://github.com/CodeGateSoftware/keel/discussions/categories/${CATEGORY}`,
          fetchedAt: null,
          items: [],
        },
        null,
        2,
      ) + "\n",
    );
    console.warn(`  WARN: discussions fetch failed (${error.message}); News page will show the GitHub link only`);
  }
}
