/**
 * Engine-repository links, built from the ref this build actually resolved.
 *
 * #85 pinned the docs pipeline to the latest published release tag; #91 is the
 * same skew in hand-written links. The ref lives in exactly one place —
 * data/docs-meta.json, written by scripts/fetch-engine-docs.mjs — and every
 * link into the engine repo is constructed from it here, so a hand-written
 * href cannot drift from the release the reader is running.
 *
 * `grep -rn "blob/main" src/ | grep -v "src/content/"` returning nothing is the
 * lint that keeps it that way. (src/content/changelog is fetched release-note
 * prose: those links are quotes, and the site must not rewrite what a release
 * said.)
 */
import { loadDocsMeta } from "../components/docs/nav";

/** A heading anchor. Fragments survive pinning — #scholarly-review-status must
 *  still land on that section, not at the top of the file. */
export type EngineHash = `#${string}`;

/** A pointer into the engine repository, as copy files carry it: a repo-relative
 *  path, never a URL. The component builds the URL at the resolved ref. */
export interface EngineSource {
  /** Repo-relative, e.g. "keel/compliance/screen.py" or "docs/glossary.md". */
  path: string;
  /** "tree" for a directory listing; "blob" (the default) for a single file. */
  kind?: "blob" | "tree";
  /** Optional heading anchor, appended verbatim. */
  hash?: EngineHash;
}

/**
 * Build an absolute GitHub URL at the ref this build resolved.
 *
 * Throws — deliberately, and loudly — when no ref was resolved. nav.ts's
 * FALLBACK_META sets `ref: ""` rather than naming a branch, because a
 * hard-coded "main" would be a claim rather than a default. Falling back here
 * would restore exactly the skew this removes: a "Verify in the repository"
 * link that shows the reader code their release does not contain. Astro
 * surfaces the throw as a build failure, which is the intended behaviour and
 * matches FR-4 — the build stops rather than publishing a false pointer.
 */
export function engineSourceUrl(source: EngineSource): string {
  const { repo, ref } = loadDocsMeta();
  const path = source.path.replace(/^\/+/, "");

  if (!path) {
    throw new Error("engine link: an empty path cannot be pinned to a ref.");
  }
  if (!ref || !repo) {
    throw new Error(
      `engine link: data/docs-meta.json resolved no ${!ref ? "ref" : "repo"}, so "${path}" ` +
        "cannot be pinned. Run `npm run fetch` — scripts/fetch-engine-docs.mjs writes it. " +
        'There is deliberately no fallback to "main": an unpinned link would invite a reader ' +
        "to verify a release against code that is not in it.",
    );
  }

  return `https://github.com/${repo}/${source.kind ?? "blob"}/${ref}/${path}${source.hash ?? ""}`;
}

/** Convenience for the common case: a single file, optionally at an anchor. */
export function engineBlobUrl(path: string, hash?: EngineHash): string {
  return engineSourceUrl({ path, hash });
}
