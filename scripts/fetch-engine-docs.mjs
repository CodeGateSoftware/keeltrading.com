#!/usr/bin/env node
/**
 * FR-4 — Docs pipeline.
 *
 * Fetches the pinned engine documents from CodeGateSoftware/keel at build time
 * and writes them into the content collection. Documents are NEVER hand-copied:
 * this script is the only writer of src/content/engine-docs/.
 *
 * If a pinned document disappears or moves upstream, this script exits non-zero
 * and the build fails loudly — the site must not render stale docs silently.
 *
 * Relative markdown links inside fetched documents are rewritten to absolute
 * GitHub blob URLs so they resolve from this origin; document text is untouched.
 *
 * #85 — the ref is the latest published release tag, not `main`. An operator
 * runs a release, so the documents this site renders must be the documents that
 * release shipped. The manifest keeps the policy in its `ref` field as the
 * sentinel "latest-release"; a literal branch, tag or SHA is still honored.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { LATEST_RELEASE, resolveLatestReleaseTag } from "./lib/release-tag.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const manifest = JSON.parse(
  readFileSync(join(root, "engine-docs.manifest.json"), "utf8"),
);

/**
 * The ref every fetch, rewritten link and source URL below points at. When the
 * release tag cannot be resolved the build stops: falling back to `main` would
 * silently restore the skew this pin exists to remove.
 */
const docsRef = await (async () => {
  if (manifest.ref !== LATEST_RELEASE) return manifest.ref;
  const resolved = await resolveLatestReleaseTag(root, manifest.repo);
  if (!resolved.tag) {
    console.error(
      `\nFAIL: could not resolve the latest release tag for ${manifest.repo} — ${resolved.source}.`,
    );
    console.error(
      "The docs pipeline pins to a published release and never falls back to main (#85).",
    );
    process.exit(1);
  }
  console.log(`  docs ref: ${resolved.tag} (from ${resolved.source})`);
  return resolved.tag;
})();

const DOCS_DIR = join(root, "src/content/engine-docs");
const META_FILE = join(root, "data/docs-meta.json");
mkdirSync(DOCS_DIR, { recursive: true });
mkdirSync(join(root, "data"), { recursive: true });

const EXTERNAL_DEST = /^(https?:|mailto:|data:|\/\/)/i;

/**
 * Demote level-1 ATX headings to level 2, outside code fences, so the page
 * template's H1 stays the single H1 and mid-document `#` sections (e.g. the
 * runbook's "# Part 2") become proper H2s. Deeper levels are left alone —
 * the original H2 sections already sit correctly under the template H1.
 * Heading IDs derive from text, not level, so in-page anchors are unaffected.
 */
function demoteTopLevelHeadings(markdown) {
  let inFence = false;
  return markdown
    .split("\n")
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (!inFence && /^# \S/.test(line)) return `#${line}`;
      return line;
    })
    .join("\n");
}

/** Resolve a relative markdown destination against the source file's GitHub location. */
function absolutizeLink(dest, docPath, repo, ref) {
  if (EXTERNAL_DEST.test(dest) || /^[a-z][a-z0-9+.-]*:/i.test(dest)) return dest;

  const fragmentIndex = dest.indexOf("#");
  const fragment = fragmentIndex >= 0 ? dest.slice(fragmentIndex) : "";
  const target = fragmentIndex >= 0 ? dest.slice(0, fragmentIndex) : dest;
  if (!target) return dest; // pure in-page anchor

  let resolved;
  if (target.startsWith("/")) {
    resolved = target.slice(1); // repo-root-relative
  } else {
    const baseDir = docPath.includes("/") ? docPath.slice(0, docPath.lastIndexOf("/") + 1) : "";
    const stack = baseDir ? baseDir.split("/").filter(Boolean) : [];
    for (const part of target.split("/")) {
      if (part === "." || part === "") continue;
      if (part === "..") stack.pop();
      else stack.push(part);
    }
    resolved = stack.join("/");
  }
  const treeKind = /\/$/.test(target) ? "tree" : "blob";
  return `https://github.com/${repo}/${treeKind}/${ref}/${resolved}${fragment}`;
}

function rewriteRelativeLinks(markdown, docPath, repo, ref) {
  // Match [text](destination "title") — capture the destination only.
  return markdown.replace(/(\[[^\]]*\]\()([^)\s]+)([^)]*\))/g, (_full, pre, dest, post) => {
    const absolute = absolutizeLink(dest, docPath, repo, ref);
    return `${pre}${absolute}${post}`;
  });
}

const failures = [];
const fetchedAt = new Date().toISOString();
const meta = {
  repo: manifest.repo,
  ref: docsRef,
  fetchedAt,
  sections: manifest.sections ?? [],
  docs: [],
};

for (const doc of manifest.docs) {
  const url = `https://raw.githubusercontent.com/${manifest.repo}/${docsRef}/${doc.path}`;
  let response;
  try {
    response = await fetch(url, { headers: { "user-agent": "keeltrading.com-docs-fetch" } });
  } catch (error) {
    failures.push(`${doc.path}: network error — ${error.message}`);
    continue;
  }
  if (!response.ok) {
    failures.push(
      `${doc.path}: HTTP ${response.status} at ${url}\n` +
        `  The document may have moved in ${manifest.repo}@${docsRef}. ` +
        `Update engine-docs.manifest.json to the new path — do not hand-copy the doc.`,
    );
    continue;
  }
  let markdown = await response.text();
  // Drop the document's own H1 title: the site renders the manifest title as
  // the page's single H1 (one-h1-per-page). Heading IDs are unaffected.
  markdown = markdown.replace(/^#\s+.+\n/, "");
  markdown = demoteTopLevelHeadings(markdown);
  markdown = rewriteRelativeLinks(markdown, doc.path, manifest.repo, docsRef);
  writeFileSync(join(DOCS_DIR, `${doc.slug}.md`), markdown);
  meta.docs.push({
    slug: doc.slug,
    path: doc.path,
    title: doc.title,
    en: doc.en,
    ar: doc.ar,
    fr: doc.fr ?? doc.en,
    section: doc.section ?? "reference",
    sourceUrl: `https://github.com/${manifest.repo}/blob/${docsRef}/${doc.path}`,
  });
  console.log(`  fetched ${doc.path} -> engine-docs/${doc.slug}.md`);
}

if (failures.length > 0) {
  console.error(`\nFAIL: ${failures.length} pinned engine document(s) could not be fetched:`);
  for (const failure of failures) console.error(`  - ${failure}`);
  console.error("The build stops here by design (FR-4): never render stale or missing docs.");
  process.exit(1);
}

writeFileSync(META_FILE, JSON.stringify(meta, null, 2) + "\n");
console.log(`  wrote data/docs-meta.json (${meta.docs.length} documents)`);
