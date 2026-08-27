/**
 * Resolve the keel release tag this build describes (#85).
 *
 * Why a tag and not `main`: an operator runs a published release, so the site
 * must describe a published release. The install page already learned this the
 * hard way — it described a script served from `main`, and `main` moved the
 * Python floor from 3.11 to 3.14 underneath the copy (PR #88). Pinning the docs
 * pipeline to the released tag is the same correction, applied upstream of the
 * prose: FR-9 says this site describes what shipped.
 *
 * Resolution order, cheapest first:
 *
 *   1. data/release.json, when fetch-release.mjs wrote it recently. `npm run
 *      fetch` runs that script first, so the normal build path costs zero extra
 *      calls to the releases API.
 *   2. The releases API — one call, for a standalone run of the docs fetch.
 *   3. The last-known tag in data/release.json, when the API is unreachable.
 *      That is still a real release tag, and the ref it resolves to is recorded
 *      in data/docs-meta.json and printed on every doc page, so a reader can
 *      see exactly which version the page describes.
 *
 *      This tier is a local convenience, not CI resilience: `data/` is
 *      gitignored and no workflow caches it, so on the machine that actually
 *      ships the site the file never pre-exists. In CI the behaviour is binary
 *      — the releases API answers, or the build stops.
 *
 * There is deliberately no fallback to `main`. A silent fallback would
 * reintroduce the skew this whole change exists to remove. When no tag can be
 * resolved at all, the caller fails the build.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** Manifest sentinel: "whatever the latest published release is at build time". */
export const LATEST_RELEASE = "latest-release";

/** How recent data/release.json must be to be reused without an API call. */
const FRESH_MS = 60 * 60 * 1000;

/**
 * A git tag this pipeline is willing to trust. The resolved tag is interpolated
 * into raw.githubusercontent URLs, GitHub blob URLs and build logs, so it is
 * validated at the boundary rather than anywhere downstream: whatever the
 * releases API hands back, only a plain version tag gets past this line.
 *
 * Deliberately narrow. keel tags releases `v0.11.2`; anything that does not
 * look like that is treated as unresolved, and the caller fails the build.
 */
const TAG_PATTERN = /^v?[0-9]+(\.[0-9]+){0,3}(-[0-9A-Za-z.-]{1,32})?$/;

/** @param {unknown} tag @returns {string|null} the tag, or null if untrusted. */
function trustedTag(tag) {
  return typeof tag === "string" && TAG_PATTERN.test(tag) ? tag : null;
}

function readReleaseFile(root) {
  const file = join(root, "data/release.json");
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

/**
 * @param {string} root project root
 * @param {string} repo owner/name, e.g. CodeGateSoftware/keel
 * @returns {Promise<{tag: string|null, source: string}>} tag is null when
 *   nothing could be resolved; source explains where the tag came from.
 */
export async function resolveLatestReleaseTag(root, repo) {
  const cached = readReleaseFile(root);
  const cachedAge = cached?.fetchedAt ? Date.now() - Date.parse(cached.fetchedAt) : Number.NaN;
  const cachedTag = trustedTag(cached?.tag);
  if (cachedTag && cachedAge >= 0 && cachedAge < FRESH_MS) {
    return { tag: cachedTag, source: "data/release.json, written this build" };
  }

  const headers = {
    accept: "application/vnd.github+json",
    "user-agent": "keeltrading.com-docs-fetch",
  };
  if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const release = await response.json();
    const apiTag = trustedTag(release?.tag_name);
    if (!apiTag) throw new Error("the releases API returned no usable tag_name");
    return { tag: apiTag, source: "the GitHub releases API" };
  } catch (error) {
    if (cachedTag) {
      return {
        tag: cachedTag,
        source: `data/release.json, last known — the releases API is unreachable (${error.message})`,
      };
    }
    return { tag: null, source: `the releases API is unreachable (${error.message})` };
  }
}
