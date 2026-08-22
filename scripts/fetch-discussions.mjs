#!/usr/bin/env node
/**
 * FR-5 — News from Discussions.
 *
 * Reads the Announcements and Show and tell categories of
 * CodeGateSoftware/keel Discussions via the public REST endpoint and writes
 * data/discussions.json (announcements) and data/show-and-tell.json
 * (show and tell) for the News page. Items deep-link to GitHub for reading
 * and interaction; bodies stay in their original language (never translated
 * — D4/D5 non-goal).
 *
 * Deviation from the PRD, in keel's favour: GitHub's REST API now serves
 * discussions unauthenticated, so no GraphQL token and no Worker are needed.
 * GITHUB_TOKEN is still honoured when present (rate-limit headroom in CI).
 *
 * Failure policy: degrade gracefully to last-known data, per file; never
 * break the build.
 */
import { existsSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const DATA_DIR = join(root, "data");
mkdirSync(DATA_DIR, { recursive: true });

const API =
  "https://api.github.com/repos/CodeGateSoftware/keel/discussions?per_page=50&state=open";

/**
 * One output feed: category slug, destination file, item cap. `exclude`
 * instead of `category` = everything but those slugs (#73: the community's
 * own threads — Q&A, compliance classification, ideas — get a window
 * without flooding the announcements archive).
 */
const FEEDS = [
  { category: "announcements", file: "discussions.json", maxItems: 30 },
  { category: "show-and-tell", file: "show-and-tell.json", maxItems: 5 },
  {
    category: null,
    exclude: ["announcements", "show-and-tell"],
    file: "community.json",
    maxItems: 5,
    label: "discussions",
  },
];

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

const categoryUrl = (slug) =>
  `https://github.com/CodeGateSoftware/keel/discussions/categories/${slug}`;

/** Write one feed's file from the fetched discussions. */
function writeFeed(feed, discussions) {
  const items = discussions
    .filter((discussion) =>
      feed.category
        ? discussion.category?.slug === feed.category
        : !feed.exclude.includes(discussion.category?.slug ?? ""),
    )
    .sort((a, b) => b.created_at.localeCompare(a.created_at)) // newest first (#73)
    .slice(0, feed.maxItems)
    .map((discussion) => ({
      number: discussion.number,
      title: discussion.title,
      url: discussion.html_url,
      createdAt: discussion.created_at,
      author: discussion.user?.login ?? null,
      comments: discussion.comments ?? 0,
      excerpt: excerpt(discussion.body ?? ""),
    }));
  writeFileSync(
    join(DATA_DIR, feed.file),
    JSON.stringify(
      {
        category: feed.category ?? feed.label,
        categoryUrl: feed.category ? categoryUrl(feed.category) : "https://github.com/CodeGateSoftware/keel/discussions",
        fetchedAt: new Date().toISOString(),
        items,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(`  discussions: ${items.length} ${feed.category ?? feed.label}(s) -> data/${feed.file}`);
}

/** Degrade one feed's file: keep last-known data, else an empty stub. */
function degradeFeed(feed, reason) {
  const out = join(DATA_DIR, feed.file);
  if (existsSync(out)) {
    console.warn(`  WARN: ${feed.category} fetch failed (${reason}); keeping last-known items`);
    return;
  }
  writeFileSync(
    out,
    JSON.stringify(
      {
        category: feed.category ?? feed.label,
        categoryUrl: feed.category ? categoryUrl(feed.category) : "https://github.com/CodeGateSoftware/keel/discussions",
        fetchedAt: null,
        items: [],
      },
      null,
      2,
    ) + "\n",
  );
  console.warn(
    `  WARN: ${feed.category} fetch failed (${reason}); News page will show the GitHub link only`,
  );
}

try {
  const response = await fetch(API, { headers });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const all = await response.json();
  const discussions = Array.isArray(all) ? all : [];
  for (const feed of FEEDS) {
    try {
      writeFeed(feed, discussions);
    } catch (error) {
      degradeFeed(feed, error.message);
    }
  }
} catch (error) {
  for (const feed of FEEDS) degradeFeed(feed, error.message);
}
