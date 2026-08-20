# Deployment — Cloudflare Pages

The site is a static Astro build (FR-1) deployed to Cloudflare Pages from this
repository. **GitHub Actions owns every deploy** (`.github/workflows/deploy.yml`):

- push to `main` → production deploy
- pull request → preview deploy on a branch URL (fork PRs skip secrets and
  therefore skip the deploy step gracefully)
- hourly schedule + manual dispatch → fresh build (news, release, and docs
  refresh) and production redeploy — this is what keeps a new announcement
  on the site within 60 minutes (FR-5)

The build fails loudly if a pinned engine document moved upstream (FR-4) —
a failed fetch blocks the deploy by design.

## One-time setup (repository settings only)

1. Create a Cloudflare API token with **Cloudflare Pages → Edit** permission
   (dashboard → My Profile → API Tokens). Note your **Account ID** (Cloudflare
   dashboard right sidebar).
2. In this repo's Settings:
   - **Secrets → Actions**: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
   - **Variables → Actions**: `PAGES_PROJECT` (suggested: `keeltrading-com`)
   - Optional variable: `PUBLIC_CF_ANALYTICS_TOKEN` — the Cloudflare Web
     Analytics beacon token (FR-11: cookieless, no consent banner). Without
     it the beacon is omitted from the build.
3. Push to `main` (or run the Deploy workflow manually). The workflow creates
   the Pages project on first deploy and publishes to
   `https://<PAGES_PROJECT>.pages.dev` — **the site is live before the domain
   lands.**

No other secrets exist — the site ships zero client JavaScript and holds no
tokens in its output (Success criterion 9). `GITHUB_TOKEN` for the fetch
scripts is unnecessary (public REST; rate limits are comfortably inside
60/hr for an hourly build).

### Alternative: Pages Git integration

Connecting the repo in the Cloudflare dashboard (build command `npm run
build`, output `dist`) also works and gives PR previews natively, but then
the hourly refresh must call the Pages deployments API with its own
`CF_API_TOKEN`. The Actions model above needs no dashboard project at all;
pick one and delete the other's triggers if you switch.

## Custom domain (deferred — PRD §11)

The domain keeltrading.com was purchased 2026-08-19 and is pending registration
at the reseller (order 4166854662). Work proceeds on `*.pages.dev`. When it
lands (#9):

1. Add the zone to the Cloudflare account; point the registrar's nameservers
   at the assigned Cloudflare nameservers.
2. Pages project → **Custom domains → Set up a custom domain →
   keeltrading.com** (canonical URLs in the build already use
   `https://keeltrading.com`).
3. Add `www.keeltrading.com` with a redirect rule to the apex.
4. Force HTTPS is on by default; verify the HTTP→HTTPS redirect.
5. After the 60-day ICANN window, optionally transfer the registrar to
   Cloudflare.

## Operating notes

- **A build that cannot fetch a pinned engine doc fails on purpose** (FR-4).
  Fix by updating `engine-docs.manifest.json` to the document's new path —
  never by hand-copying content into `src/content/engine-docs/` (gitignored).
- **Release / Discussions fetch failures degrade, not fail**: the build keeps
  the last-known `data/*.json`; the Install and News pages show their GitHub
  fallbacks. `data/` contents are build artifacts and never committed.
- **Adding French (FR dry-run, Success criterion 8)**: copy the thin wrappers
  into `src/pages/fr/`, add `fr` dictionaries under `src/i18n/pages/`, and
  extend `locales` in `src/i18n/config.ts` plus the sitemap i18n map in
  `astro.config.mjs`. No component changes — that is the design contract.
- **The Discussions token question**: the PRD anticipated needing a
  fine-grained PAT (GraphQL). GitHub's REST API now serves Discussions
  unauthenticated, so no token and no Worker are required (D6's Worker option
  stays unused). `GITHUB_TOKEN` is honored if ever provided.

## Badges

CI status badge for the README (already embedded):

```markdown
[![CI](https://github.com/CodeGateSoftware/keeltrading.com/actions/workflows/ci.yml/badge.svg)](https://github.com/CodeGateSoftware/keeltrading.com/actions/workflows/ci.yml)
```
