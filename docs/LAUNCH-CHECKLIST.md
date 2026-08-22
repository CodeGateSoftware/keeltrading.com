# Launch checklist — PRD §6 success criteria

Status record for issue #6 (launch hardening) against the nine success criteria in
`docs/superpowers/specs/2026-08-19-website-prd.md` §6. Evidence dates and commands are
given per item so every green can be re-verified. Last updated 2026-08-22.

**Verdict: 9 / 9 criteria green** (two with honestly-bounded external caveats, noted
inline and under "Partially external" below — neither is claimable as more than stated).

---

## 1. HTTPS served; `www` and HTTP redirect — GREEN

Checked 2026-08-22 with `curl -sI`:

| URL | Result |
|---|---|
| `https://keeltrading.com/` | `HTTP/2 200` |
| `http://keeltrading.com/` | `301` → `https://keeltrading.com/` |
| `https://www.keeltrading.com/` | `301` → `https://keeltrading.com/` |
| `http://www.keeltrading.com/` | `301` → `https://keeltrading.com/` |

Domain wiring (PRD §11) was done once via `.github/workflows/custom-domain.yml`
(manual dispatch; idempotent) and documented in `docs/DEPLOYMENT.md`. Certificates
are Cloudflare-issued (edge headers confirm Cloudflare serving).

## 2. Every launch page in EN and AR, true RTL parity; hreflang validates — GREEN

All ten launch page families build in **en**, **ar** (and **fr**) — `index`,
`features`, `install`, `compliance`, `about`, `community`, `compare`, `news`,
`changelog`, `docs` (verified in `dist/` 2026-08-22; guides explainers exist in
en+ar, get-started guides are deliberately EN-only editorial, marked as such).

- **hreflang**: every checked page emits `hreflang` alternates for exactly the
  locales that exist (`en`/`ar`/`fr` + `x-default` on standard pages; `en`/`ar` +
  `x-default` on the guides, which have no FR edition). Spot-verified in
  `dist/{en,ar,fr}/compliance/index.html` and
  `dist/ar/guides/attestation-is-not-a-fatwa/index.html`.
- **RTL parity**: `<html dir="rtl" lang="ar">` confirmed on AR pages; a 390 px
  Puppeteer pass (2026-08-22, this branch) shows 0 px horizontal overflow on AR
  guide pages and FR pages alike (`dir`/`lang` read from the live DOM).
- Sitemaps: `https://keeltrading.com/sitemap-index.xml` → 200 (2026-08-22), with
  per-locale sitemaps generated at build.

## 3. A new announcement appears on the site within 60 minutes — GREEN (mechanism proven + demonstrated)

The mechanism is the **hourly scheduled rebuild** (FR-12): `.github/workflows/deploy.yml`
runs on `cron: "7 * * * *"` plus `workflow_dispatch`; every rebuild re-fetches the
Discussions feed and redeploys, so anything posted to the Announcements category lands
on the site within at most one hour. The `/news` pages stamp "feed last refreshed"
(2026-08-22 on the live site) so staleness is visible, not hidden.

Demonstrated, not just designed: the keel v0.11.0 announcements
(CodeGateSoftware/keel discussions #485/#486/#487, posted 2026-08-21T23:27–23:28Z)
rendered on the site on the next hourly build. Note honestly: *posting* an
announcement is the maintainer's act outside this repo — what this criterion and
this repo own is the ≤60-minute reflection, which the schedule guarantees and the
v0.11 posts demonstrated.

## 4. Download buttons and install snippets reflect the current release — GREEN

The install page is generated from `data/release.json`, fetched at build time from
the public GitHub Releases REST endpoint (no auth, never mirrored binaries).
Verified 2026-08-22:

- `data/release.json` → `v0.11.0`, published `2026-08-21T23:09:59Z` — byte-identical
  tag and timestamp to `gh api repos/CodeGateSoftware/keel/releases/latest`.
- Live `https://keeltrading.com/en/install/` shows `v0.11.0` throughout (versioned
  asset names, `pip install ... keel_trader-0.11.0...` snippets, "fetched from
  GitHub at build time" date stamp), in all three locales.
- Because the hourly rebuild re-fetches, a new engine release updates the buttons
  within an hour without a commit.

## 5. Docs pages fail the build when an engine doc moves — GREEN

`scripts/fetch-engine-docs.mjs` fetches every document pinned in
`engine-docs.manifest.json`; on a 404 or network error it records the failure and
ends with `process.exit(1)` ("The build stops here by design (FR-4): never render
stale or missing docs."). CI surfaces this legibly: `.github/workflows/ci.yml` step
**"Fetch engine docs, release, discussions"** (`npm run fetch`) runs before type
check and build; `deploy.yml` chains the same fetch inside `npm run build`, so a
moved engine doc red-Xes Checks and blocks the deploy instead of publishing a
stale page.

## 6. Lighthouse ≥ 95 performance and ≥ 95 accessibility — GREEN

2026-08-22, Lighthouse (mobile defaults) via system Chrome:

- On `main` that morning: **99–100 performance / 96 accessibility / 100 best
  practices / 100 SEO** across launch pages.
- Re-run on this branch's rebuilt `dist` (local static serve): EN home **100/100**
  (perf/a11y; BP 100, SEO 100), EN compliance **100/100**, AR home **100/100**,
  EN install **100/100**, FR compare **100/100**.

Both runs sit comfortably above the ≥95/≥95 budget. The site ships zero client
JavaScript by design (one inline script: the light/dark choice).

## 7. Honesty review green in EN and AR before launch — GREEN (reviewed EN + AR + FR)

Final fresh-eyes review against PRD FR-9, 2026-08-22, over the **built** pages
(`dist/{en,ar,fr}/**`) **and** the i18n sources (`src/i18n/**`, plus meta/OG
descriptions, RSS, 404, and the email-copy in `functions/`):

- **No profit claims, no performance promises** — zero occurrences across all
  three locales; every mention of profit is the honest negation ("no shipped rule
  family is net positive…", "It does not promise profit").
- **No urgency tactics, no testimonials-as-proof** — pattern sweeps
  (guaranteed / risk-free / passive income / beat the market / limited time /
  act now / countdown / testimonial, plus Arabic and French equivalents) return
  zero hits on editorial pages; the only "guaranteed"-family matches are the riba
  definition ("lending at a guaranteed rate" — describing what is prohibited) and
  the Arabic word مضمون used as "content".
- **Honest-results-first** — the result box appears in the hero of every page
  family that touches results (home, features, compliance, compare, and all three
  deep guides); numbers everywhere match the engine's public figures: win rate
  **14.9%** vs break-even **14.88%** inside the venue's fee-free allowance,
  **29%** outside it (engine note: 29.18%, rounded), taker fee **~1.2% per side**,
  **0 of 90** and **0 of 82** configurations cleared — cross-checked against
  `keel` `docs/research/2026-08-20-quant-lab-note-cross-verification.md` and the
  experiment docs rendered under `/docs`.
- **Standing disclaimers present on every page, in every locale** — footer:
  not financial advice / not a fatwa or religious advice / attestation is the
  operator's act and responsibility; guides additionally carry per-article
  "neither a fatwa nor financial advice" lines.
- **Venue and competitor names under nominative use** — Alpaca/Coinbase/Robinhood
  trademark + no-affiliation wording in the footer of every page ×3 locales;
  Freqtrade/Jesse/Hummingbot/OctoBot/QuantCrawler identified by name with a
  "names appear solely to identify them" line and sourced facts with dates.
- **FR-8 translation honesty** — every translated page renders a "last translated
  against English revision" marker; all `translatedFromRev` values equal the
  current EN `rev` for all ten page families × ar/fr and all three guide
  explainers (no stale banners rendered). Bodies of Discussions posts render in
  their original language only, per the non-goals.
- **Fixes made by this pass** (FR edition only; EN/AR were clean): the FR
  compliance result-box links were still English ("The experiment record /
  The announcement" → French), two FR `aria-label`s (site nav, docs sidebar), the
  FR compare table's hidden "Property" header, and French colon spacing in the
  features "verify in the repository" lines.

## 8. A dry-run proves adding FR is content + config only — GREEN (superseded: FR shipped)

FR is not a dry-run any more — it is fully live: all ten page families, tri-lingual
site chrome (`src/i18n/ui.ts`), tri-lingual email/result-page copy in
`functions/api/`, and FR hreflang everywhere. It got there without forking
components or touching the build — content + config only, which is exactly what
criterion 8 required the dry-run to prove.

## 9. No secret ever appears in the repo — GREEN

Method (2026-08-22, this branch):

1. `git grep -E` over all tracked files (package-lock excluded) for the standard
   token shapes — GitHub PATs (`ghp_`, `github_pat_`), AWS (`AKIA`/`ASIA`),
   OpenAI/Anthropic (`sk-`, `sk-ant-`), Slack (`xox*`), Google (`AIza`),
   private-key PEM headers, Resend/Cloudflare-style key prefixes — **zero hits**.
2. A generic sweep for `token|secret|password|api_key` assignments to literal
   strings — zero non-example hits (all matches are `process.env`,
   `${{ secrets.* }}`, or documented placeholders).
3. The build-fetched `data/*.json` (release, discussions, show-and-tell,
   community, docs-meta) re-swept — clean.
4. No `.env` files exist in the checkout; `.env*` is gitignored.
5. Workflows reference secrets only through the Actions secret store
   (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `GITHUB_TOKEN`), never
   inlined; the Pages Functions read `RESEND_API_KEY`/`DB` from the Workers env.

GitHub's secret scanning with push protection (default-on for public repos) is
the standing backstop on top of the sweep.

---

## Partially external — stated honestly, not claimed green-er than reality

- **Google Search Console indexing coverage** (supports criterion 1/2 goals, not a
  §6 criterion itself): the property is verified and `sitemap-index.xml` submitted
  (2026-08-22). Coverage percentage is a function of time; it is accumulating and
  is not claimable as a number today.
- **Announcement posting** (issue #6 acceptance, PRD §10 standing rule): the
  trilingual site-launch announcements exist (keel discussions
  #460/#461/#462, 2026-08-20) and the v0.11 announcements followed
  (#485/#486/#487, 2026-08-21). Future announcements remain the maintainer's act —
  the repo's obligation is the ≤60-minute reflection (criterion 3), which is green.

## Re-verification shortcuts

```sh
# 1 — redirects
curl -sI http://keeltrading.com | grep -i location      # 301 → https
curl -sI https://www.keeltrading.com | grep -i location # 301 → apex

# 4 — release freshness
cat data/release.json | head -4   # vs gh api repos/CodeGateSoftware/keel/releases/latest

# 5 — fail-loudly path
grep -n "process.exit(1)" scripts/fetch-engine-docs.mjs

# 6 — Lighthouse (local)
python3 -m http.server -d dist 8765 &  npx lighthouse http://127.0.0.1:8765/en/

# 7 — honesty sweeps
grep -rniE "guarantee|risk[- ]free|passive income|beat the market|limited time|testimonial" src/i18n/
# (Arabic/French equivalents likewise; expect only the riba definition and negations)

# 9 — secret sweep
git grep -E "ghp_[A-Za-z0-9]{20,}|github_pat_|AKIA[A-Z0-9]{16}|sk-ant-|-----BEGIN .*PRIVATE KEY"
```
