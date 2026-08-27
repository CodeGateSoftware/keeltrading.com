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

No other secrets exist — the site ships no framework and exactly one inline
script (the visitor's light/dark choice, persisted in localStorage), and holds
no tokens in its output (Success criterion 9). `GITHUB_TOKEN` for the fetch
scripts is unnecessary (public REST; rate limits are comfortably inside
60/hr for an hourly build).

### Alternative: Pages Git integration

Connecting the repo in the Cloudflare dashboard (build command `npm run
build`, output `dist`) also works and gives PR previews natively, but then
the hourly refresh must call the Pages deployments API with its own
`CF_API_TOKEN`. The Actions model above needs no dashboard project at all;
pick one and delete the other's triggers if you switch.

## Custom domain (PRD §11 — the registrar has released the domain)

Work runs on `*.pages.dev` until the custom domain is wired. Steps (the
canonical-URL side needs no changes — the build has always emitted
`https://keeltrading.com`):

1. Cloudflare dashboard → **Add a domain** → `keeltrading.com` (Free plan);
   Cloudflare assigns two nameservers.
2. GoDaddy (registrar) → nameservers → replace `ns35/36.domaincontrol.com`
   with the assigned pair. Propagation can take up to 24–48 h.
3. In the zone's DNS: `CNAME keeltrading.com → keeltrading-com.pages.dev`
   (proxied) and `CNAME www → keeltrading-com.pages.dev` (proxied; apex CNAME
   is flattened by Cloudflare automatically).
4. Run the **Attach custom domain** workflow (Actions → manual dispatch) — it
   attaches both hostnames to the Pages project via the API and reports
   certificate provisioning. Alternatively: Pages project → Custom domains →
   add both by hand.
5. Redirect `www` → apex: Cloudflare **Rules → Redirect Rules** —
   `www.keeltrading.com/*` → `https://keeltrading.com/$1` (301). (Zone-level;
   not automatable with the Pages-scoped token.)
6. HTTP→HTTPS is forced by Pages automatically once the domain is active.

After the 60-day ICANN window (from 2026-08-19), optionally transfer the
registrar to Cloudflare.

## AI crawler access (zone setting, not code — issue #82)

`public/robots.txt` is four lines and allows everything. The **served**
`robots.txt` is not: Cloudflare prepends a `# BEGIN Cloudflare Managed content`
block at the edge that disallows nine AI crawlers (`ClaudeBot`, `GPTBot`,
`CCBot`, `Google-Extended`, `meta-externalagent`, `Applebot-Extended`,
`Amazonbot`, `Bytespider`, `CloudflareBrowserRenderingCrawler`) and sets
`Content-Signal: ai-train=no,use=reference`.

The origin cannot override an edge-injected block — editing `public/robots.txt`
does nothing. It is turned off in the dashboard: the `keeltrading.com` zone →
the AI crawler control that mentions managed `robots.txt` or content signals.
Cloudflare has shipped this as **AI Crawl Control**, previously **AI Audit** /
"Block AI bots"; the label has moved across releases, so search the zone for the
setting rather than a fixed menu path.

This contradicts roadmap 1.5, which requires GPTBot/ClaudeBot/PerplexityBot to
be crawlable — blocking them opts the site out of being cited by answer engines,
while normal Google Search indexing is unaffected (`search=yes` and
`User-agent: * Allow: /` still stand). `ai-train=no` is a defensible stance to
keep; the blanket `Disallow: /` per crawler is the part that costs GEO reach.

Verify with `npm run check:ai-crawlers` (any origin: `node
scripts/check-ai-crawlers.mjs https://staging.example`). The **AI crawler
access** workflow runs it daily against production and fails loudly while the
block is in place. It is intentionally not in `ci.yml` — it tests production,
not the pull request.

## Operating notes

- **A build that cannot fetch a pinned engine doc fails on purpose** (FR-4).
  Fix by updating `engine-docs.manifest.json` to the document's new path —
  never by hand-copying content into `src/content/engine-docs/` (gitignored).
- **The docs ref is a release tag, not a branch** (#85). `npm run fetch` runs
  `fetch-release.mjs` first, so `fetch-engine-docs.mjs` reads the tag from
  `data/release.json` without a second call to the releases API. If no tag can
  be resolved at all, the docs fetch exits non-zero: there is deliberately no
  fallback to `main`, which is the skew the pin removes. The last-known-tag
  fallback in `release-tag.mjs` is a local convenience only — `data/` is
  gitignored and no workflow caches it, so in CI the releases API is the sole
  source and a failure stops the build.
- **Release / Discussions fetch failures degrade, not fail** *for page content*:
  the build keeps the last-known `data/*.json`; the Install and News pages show
  their GitHub fallbacks. `data/` contents are build artifacts and never
  committed. One exception since #85 — the **tag** the release fetch resolves is
  load-bearing for the docs pin above, so a build that cannot resolve one stops
  rather than degrading. The live site is unaffected: Cloudflare Pages keeps
  serving the last successful deployment.
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
