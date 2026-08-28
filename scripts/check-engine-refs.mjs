/**
 * Fails when a link into the keel repository names a branch instead of the ref
 * this build resolved (#91).
 *
 * #85 pinned the docs pipeline to the published release tag; #91 did the same
 * for hand-written links, via `src/lib/engine-url.ts`. Neither is self-keeping:
 * the next person to paste a GitHub URL into a component or a copy file
 * reintroduces the skew, and nothing would notice.
 *
 * This is that guard, and it exists because a review pointed out the PR
 * claiming it already did. `grep blob/main` was the sentence; it was never
 * wired to anything, and it would not have caught two forms this repo already
 * contained — `tree/main/packages` and `raw.githubusercontent.../keel/main/...`.
 * So the pattern here matches any engine URL carrying a branch name, in any of
 * the shapes GitHub serves.
 *
 * ## The two allowlisted exceptions, and why each is correct
 *
 * `scripts/install.sh` — deliberately NOT pinnable. The file does not exist at
 * v0.11.2 (`git cat-file -e v0.11.2:scripts/install.sh` fails); it lives on the
 * default branch only. Pinning it would turn the install page's primary command
 * into a 404. The install page says so in its own copy. The exemption is by
 * URL path, not by file — the guide and any future page may quote the same
 * installer command (#97's guide line tripped the per-file form).
 *
 * `src/content/` — fetched release-note prose, gitignored, written by
 * scripts/fetch-release.mjs. Those links are quotes from releases as published;
 * rewriting them would edit what a release said.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const SRC = join(root, "src");

/** Any keel URL whose ref position holds a branch-shaped name rather than a tag. */
const BRANCHY = /CodeGateSoftware\/keel\/(?:blob|tree|raw)\/(main|master|HEAD)\//g;
/** raw.githubusercontent.com puts the ref straight after the repo, with no verb. */
const RAW = /raw\.githubusercontent\.com\/CodeGateSoftware\/keel\/(main|master|HEAD)\//g;

const ALLOW = [
  { path: "src/components/pages/InstallPage.astro", why: "scripts/install.sh exists only on the default branch (#91)" },
  { path: "src/content/", why: "fetched release-note quotes — the site must not rewrite what a release said" },
];

const allowed = (rel) => ALLOW.some((a) => rel === a.path || rel.startsWith(a.path));

/** The installer URL is exempt wherever it appears — see the header note. */
const INSTALLER_URL = "/scripts/install.sh";
const installerLink = (url) => url.includes(INSTALLER_URL);

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else yield full;
  }
}

const findings = [];
for (const file of walk(SRC)) {
  const rel = relative(root, file);
  if (allowed(rel)) continue;
  const text = readFileSync(file, "utf8");
  for (const re of [BRANCHY, RAW]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
      // The match ends at the branch slash; the path follows. The installer
      // URL is the one deliberately-main-pinned link — exempt it anywhere.
      if (installerLink(text.slice(m.index, m.index + 160))) continue;
      const line = text.slice(0, m.index).split("\n").length;
      findings.push(`${rel}:${line} — engine link pinned to '${m[1]}': ${m[0]}`);
    }
  }
}

if (findings.length > 0) {
  console.error(`\nFAIL: ${findings.length} engine link(s) name a branch instead of the resolved ref:\n`);
  for (const f of findings) console.error(`  - ${f}`);
  console.error(
    "\nBuild the URL with `engineSourceUrl` from src/lib/engine-url.ts, which pins to the ref\n" +
      "in data/docs-meta.json. A branch link invites a reader to verify a release against code\n" +
      "that is not in it (#91). If the target genuinely only exists on the default branch, add it\n" +
      "to ALLOW in this file with the reason.\n",
  );
  process.exit(1);
}

console.log(`ok: no engine link names a branch (${ALLOW.length} documented exception(s))`);
