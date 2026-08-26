#!/usr/bin/env node
/**
 * Roadmap 1.5 guard — "ensure GPTBot/ClaudeBot/PerplexityBot not blocked in
 * robots.txt" (docs/seo/IMPLEMENTATION-ROADMAP.md).
 *
 * This checks the LIVE site, not the build. public/robots.txt can be perfectly
 * correct while Cloudflare prepends a "# BEGIN Cloudflare Managed content"
 * block at the edge that disallows every AI crawler — which is exactly what
 * issue #82 found. Nothing in this repo can catch that, so nothing did.
 *
 * The origin cannot override the injected block; the fix is a zone-level
 * dashboard setting (see docs/DEPLOYMENT.md). This script exists so the
 * regression is loud instead of silent.
 *
 * Usage: node scripts/check-ai-crawlers.mjs [origin]
 * Exit 0 = no AI crawler is disallowed. Exit 1 = blocked, or unreachable.
 */
const ORIGIN = process.argv[2] || process.env.SITE_ORIGIN || "https://keeltrading.com";
const URL_ROBOTS = `${ORIGIN.replace(/\/$/, "")}/robots.txt`;

// Answer engines and their training/grounding fetchers. Blocking these is a
// GEO decision, so it must be a deliberate one — never a default left on.
const WATCHED = [
  "ClaudeBot",
  "GPTBot",
  "OAI-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
  "meta-externalagent",
  "Applebot-Extended",
  "Amazonbot",
  "Bytespider",
  "CloudflareBrowserRenderingCrawler",
];

/**
 * Parse robots.txt into groups. Consecutive User-agent lines share one group;
 * the first directive line closes the agent list, and the next User-agent
 * after that starts a fresh group (RFC 9309 §2.2.1).
 */
function parseGroups(text) {
  const groups = [];
  let current = null;
  let collectingAgents = false;

  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, "").trim();
    if (!line) continue;

    const sep = line.indexOf(":");
    if (sep === -1) continue;
    const field = line.slice(0, sep).trim().toLowerCase();
    const value = line.slice(sep + 1).trim();

    if (field === "user-agent") {
      if (!current || !collectingAgents) {
        current = { agents: [], rules: [], signals: [] };
        groups.push(current);
        collectingAgents = true;
      }
      current.agents.push(value);
      continue;
    }

    if (!current) continue;
    collectingAgents = false;
    if (field === "allow" || field === "disallow") current.rules.push({ field, value });
    if (field === "content-signal") current.signals.push(value);
  }
  return groups;
}

/** The group that applies to `agent`, preferring an exact match over `*`. */
function groupFor(groups, agent) {
  const wanted = agent.toLowerCase();
  return (
    groups.find((g) => g.agents.some((a) => a.toLowerCase() === wanted)) ||
    groups.find((g) => g.agents.includes("*")) ||
    null
  );
}

/** True when the group blocks the whole site. */
function blocksRoot(group) {
  if (!group) return false;
  const blanket = group.rules.some((r) => r.field === "disallow" && r.value === "/");
  if (!blanket) return false;
  // An explicit Allow: / alongside Disallow: / wins on the longest-match rule.
  return !group.rules.some((r) => r.field === "allow" && r.value === "/");
}

let text;
try {
  const res = await fetch(URL_ROBOTS, {
    headers: { "user-agent": "keeltrading.com-ai-crawler-check" },
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) {
    console.error(`::error::${URL_ROBOTS} returned HTTP ${res.status}`);
    process.exit(1);
  }
  text = await res.text();
} catch (err) {
  console.error(`::error::could not fetch ${URL_ROBOTS} — ${err.message}`);
  process.exit(1);
}

const groups = parseGroups(text);
const blocked = WATCHED.filter((agent) => {
  const g = groups.find((x) => x.agents.some((a) => a.toLowerCase() === agent.toLowerCase()));
  return blocksRoot(g);
});

const wildcardBlocked = blocksRoot(groupFor(groups, "*"));
const signals = groups.flatMap((g) => g.signals);

console.log(`robots.txt: ${URL_ROBOTS} (${text.split(/\r?\n/).length} lines, ${groups.length} groups)`);
if (signals.length) console.log(`Content-Signal: ${signals.join(" | ")}`);
if (text.includes("Cloudflare Managed content")) {
  console.log("note: a Cloudflare-managed block is being injected at the edge (not from this repo)");
}

if (wildcardBlocked) {
  console.error("::error::User-agent: * is disallowed from / — the whole site is closed to crawlers");
}
if (blocked.length) {
  console.error(`::error::${blocked.length} AI crawler(s) disallowed from /: ${blocked.join(", ")}`);
  console.error("Roadmap 1.5 requires these to be crawlable. This is NOT fixable from this repo —");
  console.error("it is a zone-level Cloudflare setting. See issue #82 and docs/DEPLOYMENT.md.");
}
if (blocked.length || wildcardBlocked) process.exit(1);

console.log(`OK — none of the ${WATCHED.length} watched AI crawlers are disallowed from /`);
