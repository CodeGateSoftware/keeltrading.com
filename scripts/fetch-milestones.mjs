#!/usr/bin/env node
/**
 * #117 — the Roadmap page's data feed.
 *
 * Reads the keel repo's GitHub milestones (open + recently closed) and the
 * issues/PRs under each, via the public REST endpoints, and writes
 * data/milestones.json. The roadmap is a read of the repo's own working
 * plan — no voting, no accounts, no subscribe box (#117's non-goals).
 *
 * Failure policy (same as fetch-release / fetch-discussions): a failed
 * fetch never breaks the build. It degrades to the last known data and
 * finally to an empty stub, at which point the Roadmap page shows a plain
 * link to the GitHub milestones page.
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = join(root, "data/milestones.json");
mkdirSync(join(root, "data"), { recursive: true });

const REPO_API = "https://api.github.com/repos/CodeGateSoftware/keel";
const MILESTONES_URL = "https://github.com/CodeGateSoftware/keel/milestones";
/** Open milestones first (that's the roadmap), then the recently shipped. */
const OPEN_API = `${REPO_API}/milestones?state=open&per_page=50`;
const CLOSED_API = `${REPO_API}/milestones?state=closed&per_page=100`;
/** Issues *and* PRs under one milestone — the issues endpoint returns both. */
const itemsApi = (number) => `${REPO_API}/issues?milestone=${number}&state=all&per_page=100`;

/** Sane cap: the biggest milestone to date holds ~15 items; 30 leaves room
 *  without ever writing the whole repo into data/. The milestone's own
 *  open/closed counts stay in the output, so the page can say "and N more". */
const MAX_ITEMS_PER_MILESTONE = 30;
/** Recently-shipped section: enough to show momentum, not a full history. */
const MAX_CLOSED_MILESTONES = 5;

const headers = {
  accept: "application/vnd.github+json",
  "user-agent": "keeltrading.com-milestones-fetch",
};
if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function getJson(url) {
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return response.json();
}

/** One milestone, shaped for the page. Items are capped; the full counts
 *  (openIssues + closedIssues) travel along so the page can point to GitHub
 *  for the overflow instead of hiding it. */
async function readMilestone(milestone) {
  let items = [];
  try {
    const raw = await getJson(itemsApi(milestone.number));
    items = (Array.isArray(raw) ? raw : [])
      .slice(0, MAX_ITEMS_PER_MILESTONE)
      .map((item) => ({
        number: item.number,
        title: item.title,
        state: item.state,
        isPullRequest: item.pull_request !== undefined,
        url: item.html_url,
      }));
  } catch (error) {
    // The milestone itself still renders — without its item list.
    console.warn(`  WARN: items for milestone ${milestone.number} failed (${error.message})`);
  }

  return {
    number: milestone.number,
    title: milestone.title,
    description: milestone.description ?? "",
    state: milestone.state,
    url: milestone.html_url,
    openIssues: milestone.open_issues ?? 0,
    closedIssues: milestone.closed_issues ?? 0,
    dueOn: milestone.due_on,
    closedAt: milestone.closed_at,
    items,
  };
}

try {
  const [openRaw, closedRaw] = await Promise.all([
    getJson(OPEN_API),
    getJson(CLOSED_API),
  ]);

  // Reading order (#117): dated milestones by nearest target first, undated
  // after them (a milestone without a date is an intention, not a schedule),
  // then the recently shipped, newest closure first.
  const open = (Array.isArray(openRaw) ? openRaw : [])
    .slice()
    .sort((a, b) => {
      if (a.due_on && b.due_on) return a.due_on.localeCompare(b.due_on);
      if (a.due_on) return -1;
      if (b.due_on) return 1;
      return a.number - b.number;
    });
  const closed = (Array.isArray(closedRaw) ? closedRaw : [])
    .filter((m) => m.closed_at)
    .sort((a, b) => b.closed_at.localeCompare(a.closed_at))
    .slice(0, MAX_CLOSED_MILESTONES);

  const milestones = [];
  for (const milestone of [...open, ...closed]) {
    milestones.push(await readMilestone(milestone));
  }

  writeFileSync(
    OUT,
    JSON.stringify(
      {
        milestonesUrl: MILESTONES_URL,
        fetchedAt: new Date().toISOString(),
        milestones,
      },
      null,
      2,
    ) + "\n",
  );
  console.log(`  roadmap: ${open.length} open + ${closed.length} recently closed -> data/milestones.json`);
} catch (error) {
  const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : null;
  if (previous?.milestones?.length) {
    console.warn(`  WARN: milestones fetch failed (${error.message}); keeping last-known ${previous.milestones.length} milestones`);
  } else {
    writeFileSync(
      OUT,
      JSON.stringify(
        {
          milestonesUrl: MILESTONES_URL,
          fetchedAt: null,
          milestones: [],
        },
        null,
        2,
      ) + "\n",
    );
    console.warn(`  WARN: milestones fetch failed (${error.message}); Roadmap page will link to GitHub milestones`);
  }
}
