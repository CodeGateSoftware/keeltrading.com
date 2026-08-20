# Deployment — Cloudflare Pages

The site is a static Astro build (FR-1) deployed on Cloudflare Pages from this
repository's `main`. Every PR gets a preview deployment via the Pages Git
integration. This document is the one-time setup and the operating notes.

## One-time setup

### 1. Create the Pages project (Git integration)

In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.

- Repository: `CodeGateSoftware/keeltrading.com`, production branch `main`
- Build command: `npm run build` (this runs the fetch scripts, then `astro build`)
- Build output directory: `dist`
- Environment variable (optional, production + preview):
  - `PUBLIC_CF_ANALYTICS_TOKEN` — Cloudflare Web Analytics beacon token
    (FR-11: cookieless, no consent banner). Without it the beacon is omitted.
  - `GITHUB_TOKEN` — not required. The release and Discussions reads use the
    public REST endpoints unauthenticated; a token only adds rate-limit headroom.

No runtime secrets exist — the site ships zero client JavaScript and holds no
tokens in its output (Success criterion 9).

### 2. Scheduled rebuilds (hourly)

`.github/workflows/rebuild.yml` triggers a production build every hour (plus a
manual dispatch) by calling the Cloudflare Pages deployments API. Configure:

- Repository **variable** `PAGES_PROJECT` = the Pages project name
- Repository **secrets** `CF_ACCOUNT_ID` and `CF_API_TOKEN`
  (token scope: *Cloudflare Pages → Edit*)

Until those are set, the workflow skips gracefully with a note.

### 3. Custom domain (once registration completes — PRD §11)

The domain keeltrading.com was purchased 2026-08-19 and is pending registration
at the reseller (order 4166854662). When it lands:

1. Add the zone to the Cloudflare account; point the registrar's nameservers at
   the assigned Cloudflare nameservers.
2. In the Pages project: **Custom domains → Set up a custom domain →
   keeltrading.com**. Cloudflare creates the `CNAME` (or flattens at the apex).
3. Add `www.keeltrading.com` as a second custom domain with a redirect rule to
   the apex (or the reverse — pick one canonical; the build's canonical URLs
   use `https://keeltrading.com`).
4. Force HTTPS is on by default; HTTP→HTTPS redirect is automatic.
5. After the 60-day ICANN window, optionally transfer the registrar to
   Cloudflare.

Until then, the `*.pages.dev` preview URL serves every branch — the domain is
not a blocker for any workstream.

## Operating notes

- **A build that cannot fetch a pinned engine doc fails on purpose** (FR-4).
  Fix by updating `engine-docs.manifest.json` to the document's new path —
  never by hand-copying content into `src/content/engine-docs/` (gitignored).
- **Release / Discussions fetch failures degrade, not fail**: the build keeps
  the last-known `data/*.json`; the Install and News pages show their GitHub
  fallbacks. The files under `data/` are build artifacts and never committed.
- **Adding French (FR dry-run, Success criterion 8)**: add `fr` pages by
  copying the thin wrappers in `src/pages/fr/`, add `fr` dictionaries under
  `src/i18n/pages/`, and extend `locales` in `src/i18n/config.ts` and the
  sitemap i18n map in `astro.config.mjs`. No component changes are needed —
  that is the design contract.
- **The Discussions token question**: the PRD anticipated needing a
  fine-grained PAT (GraphQL). GitHub's REST API now serves Discussions
  unauthenticated, so no token and no Worker are required (D6's Worker option
  stays unused). `GITHUB_TOKEN` is still honored if ever provided.

## Badges

CI status badge for the README (after the first Actions run on GitHub):

```markdown
[![CI](https://github.com/CodeGateSoftware/keeltrading.com/actions/workflows/ci.yml/badge.svg)](https://github.com/CodeGateSoftware/keeltrading.com/actions/workflows/ci.yml)
```
