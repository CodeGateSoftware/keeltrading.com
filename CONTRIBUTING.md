# Contributing to keeltrading.com

The site is a static Astro build with build-time pipelines over GitHub
(Announcements, Releases, engine docs). Work tracks on the
`Phase 15 — Public website v1` milestone; keep issues assigned and moving
on the Keel project board.

## Commit convention — releases are cut from it

**Every commit and PR title must be a [Conventional Commit](https://www.conventionalcommits.org/).**
The site's release changelogs are generated from these titles, exactly as the
[engine repo](https://github.com/CodeGateSoftware/keel) does — so the prefix
is load-bearing: an untyped commit is not a style nit, it is a missing
changelog entry.

```
feat(compare): 'Which venues, and why' — live venue facts
fix(deploy): pass GITHUB_TOKEN to the build so fetches stop rate-limiting
docs(contributing): conventional commits — the changelog is cut from them
```

Rules:

- **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`,
  `ci`. `feat` and `fix` land in the user-facing changelog; the rest don't.
- **Scopes** in use: `header`, `compare`, `install`, `home`, `i18n`, `news`,
  `deploy`, `ci`, `types`, `og`, `contributing`. Add a scope when one fits;
  omit it only for whole-repo changes (`chore: …`).
- **Breaking changes:** append `!` after the type (`feat(header)!:`) and add a
  `BREAKING CHANGE:` footer paragraph describing the migration.
- **Imperative, present tense, lowercase after the colon** — "add", not
  "added" or "adds". One line under ~72 characters; the body carries the why.
- **PR titles carry the conventional form** — merges use PR titles. When a PR
  closes an issue, the body carries `Closes #N` so the changelog can trace
  entry → issue → work.
- Direct pushes to `main` are acceptable for small content fixes (the site's
  own history does so), but anything with logic, styling, or pipeline impact
  goes through a PR with checks green.

## Local checks

```bash
npm run build   # fetches engine docs + release + discussions, then builds
npm run check   # astro check (type-check) — must pass
```

`npm run build` fetches from `api.github.com`; export `GITHUB_TOKEN` locally
if you hit rate limits (CI passes its built-in token).

## Prose style

Site copy is edited to newspaper style. The register is the product's — dry,
declarative, honest result first — and headlines like "Gates that refuse to
flatter" are doing real work. The rules below are about legibility, not voice.

- **One dash-set aside per sentence.** Past that, split the sentence.
- **Sentences under ~35 words.** Longer only when the length is doing something
  a break would lose, such as a parallel enumeration.
- **Gloss jargon on first use, per page.** Each page is a standalone article for
  a reader arriving from search: `PBO/CSCV`, basis points, "per leg", "taker
  fee" and "fails closed" all get expanded where they first appear on a page.
- **Figures:** `about`, not `~`, in prose; keep the tilde for tables and
  parentheses. Spell out one through nine, figures from 10 up.
- **`keel` is always lowercase**, including sentence-initial and in `<title>`.
- **Curly quotes** in prose; straight quotes only inside code.
- **CLI literals keep their exact form** — `GO-LIVE`, `TRAIN-MORE`, never
  `TRAIN MORE`.
- **Spelling is US** (`summarize`, `practiced`).
- **Meta descriptions stay under 160 characters** so they do not truncate in
  search results.

Arabic follows Modern Standard Arabic, with one settled rendering per technical
term — see the terminology table in #34.

## Honesty rules (FR-9)

No profit claims, no testimonial walls, results stated exactly as the engine
docs state them. Every factual claim about keel, other projects, or pricing
must be verifiable the day it ships — pricing cells carry a verification date
and a re-check pointer. Translations: EN is the source of truth; translated
pages carry `rev` + `translatedFromRev` (FR-8) — bump both when content
changes.
