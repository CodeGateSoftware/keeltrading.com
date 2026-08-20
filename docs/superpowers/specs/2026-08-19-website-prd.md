# Keel Public Website (keeltrading.com) — PRD

- **Date:** 2026-08-19
- **Status:** Draft for review — delivery tracked on the `Phase 15 — Public website v1` milestone
- **Repo:** `CodeGateSoftware/keeltrading.com` (public)
- **Owner:** @eaitbrahim

## 1. Problem

Keel's differentiator — auditable, fail-closed Shariah screening — matters most to an
audience that is largely **non-technical**, and today every surface of the project lives
behind GitHub: the README, Discussions, releases, docs. GitHub is a wall for exactly the
people the product should reach. Meanwhile the project already produces fresh content
weekly (announcements, compliance write-ups, research notes, show-and-tell), so a website
is a presentation layer over assets that exist — cheap to keep truthful, which matters
because Keel's entire brand is honesty.

There is also a naming collision to overcome: an established Kubernetes project is also
called Keel (keel.sh) and currently owns the bare-"keel" search results.

## 2. Goals

1. Explain Keel in plain English to a non-technical, Shariah-conscious audience.
2. Provide an install/download funnel that points to GitHub Releases (never mirrors
   binaries outside GitHub).
3. Surface project news from GitHub Discussions (Announcements first; Show and tell as a
   secondary feed) automatically.
4. Render engine documentation (glossary, fiqh-basis, operator runbook excerpts, research
   index) without duplicating it in a second source of truth.
5. Serve an Arabic edition at launch (the core audience for the differentiator), with
   French next and Spanish added only on demonstrated demand.
6. Lay the front-door foundation for future monetized "Keel advanced services" without
   coupling the site's identity to them.

## 3. Non-goals

- **No user accounts or auth.** The site never authenticates visitors; anything
  interactive deep-links to GitHub.
- **No community features.** Voting, polling, Q&A, and posting happen on GitHub
  Discussions; the site only reads and links.
- **No hosted Keel.** No execution, no data, no keys — ever on this origin.
- **No translation of user-generated content.** Discussions bodies render in their
  original language; only site chrome and editorial pages localize.
- **No profit claims, no testimonial walls, no urgency marketing.** The marketing voice
  is honest-results-first (see FR-9) — the deliberate opposite of retail-trading-site
  conventions.
- **No paid tier on this site in v1.** Monetization, when it comes, gets its own PRD.

## 4. Decisions already made (with rationale)

| # | Decision | Rationale |
|---|----------|-----------|
| D1 | Separate **public** repo (`keeltrading.com`), not inside the engine monorepo | License boundary (engine permissive; site content © CodeGate — the monetization answer), release-train hygiene (engine's six-pyproject ceremony must not gate site tweaks), community trust, free CI minutes |
| D2 | **keeltrading.com** is the primary domain | "keel trading" is a unique two-word search brand that disambiguates from the Kubernetes Keel; `.com` muscle memory for non-technical visitors; clean email deliverability; compounds into a company brand. Purchased 2026-08-19 (5 yr) — registration **pending** at the reseller, see §11 |
| D3 | `keel.trading` deferred | It was a nice-to-have alias (short bio link, squatter defense); budget redirected to the gocheck project. Revisit when traction makes the alias earn its cost |
| D4 | **i18n in architecture from day one, phased in content**: EN (source of truth) + AR at launch → FR next → ES on demand | The audience logic differs from Alpaca (English-only, developer-first): Keel's differentiator has its center of gravity in Arabic; but 4-language launch would 4× the maintenance on compliance claims where stale = harmful |
| D5 | **Read-only layer over GitHub** with deep links | Auth, moderation, and identity already live on GitHub; the site translates and surfaces |
| D6 | Hosting: **Cloudflare Pages** (+ a Worker where a token is needed) | Free, fast, same dashboard as DNS; the Discussions GraphQL reads need a token even for public repos, so a small Worker (or CI-time fetch) holds it |
| D7 | Astro as the framework (static-first) | Content-driven site, best-in-class i18n/content primitives, ships zero-JS by default; Next.js remains an option only if app-like features ever appear |

## 5. Functional requirements

### FR-1 Architecture
Static-first Astro site, deployed on Cloudflare Pages from this repo's `main`; deploys
run when a PR is merged to `main` (plus an hourly content refresh and manual dispatch).
PRs are validated by CI, which uploads a build artifact for inspection — no per-PR
preview deployments (amended 2026-08-20; originally "every PR gets a preview
deployment"). No server-side runtime except (optionally) one Cloudflare
Worker scoped to proxying GitHub GraphQL/REST reads with the token (FR-5/6).

### FR-2 Site map (v1)
- **Home** — what Keel is in plain English; honest-results posture; primary CTAs
  (install, docs, GitHub).
- **Features** — mapped 1:1 to real engine capabilities (per-venue attested screening,
  purification ledger, evidence ledger, strategy gates, the operator console…); no
  capability may be described that the engine repo cannot show.
- **Install** — version-aware download buttons from GitHub Releases (FR-6) plus
  copy-paste bootstrap for the supported deployment layout.
- **Docs** — rendered from the engine repo at build (FR-4).
- **News** — Discussions-driven feed (FR-5).
- **Community** — curated links into Discussions categories (Ideas, Polls, Q&A,
  Show and tell) with one-plain-paragraph explanations of each.
- **Compliance** — the Shariah methodology in plain terms: screening rails, the
  per-(venue, product) attestation model, purification, what Keel does **not** do
  (it is not a fatwa, not financial advice; attestation is the operator's act);
  links to fiqh-basis and the external-scholarship statement.
- **About** — license, trademarks, brand FAQ including the keel.sh disambiguation.

### FR-3 Two reading levels
Every top-level page offers a plain-English track and an operator track, cross-linked.
The plain track explains words (reusing the engine glossary as the single definitions
source); the operator track links into the runbook and CLI references.

### FR-4 Docs pipeline
Engine docs (`docs/glossary.md`, `docs/fiqh-basis.md`, runbook excerpts, research index)
are fetched **at build time** from `CodeGateSoftware/keel` raw URLs, rendered into the
Docs section, and never hand-copied. The build fails loudly if a pinned document
disappears or moves. No runtime dependency on GitHub availability (static output).

### FR-5 News from Discussions
GraphQL reads of the Announcements category (Show and tell as a later addition) via a
read-only fine-grained PAT stored only in CI/Worker secrets — never in the repo. Refresh
by scheduled rebuild (hourly) with a manual dispatch; items deep-link to GitHub for
reading and interaction. Renders in original language only (D4/D5).

### FR-6 Downloads from Releases
Latest-version number and asset links come from the public GitHub Releases REST
endpoint (no auth); install snippets are versioned from the same fetch so the site never
shows a stale command. Download buttons link directly to GitHub assets — the site never
mirrors binaries.

### FR-7 i18n & RTL
Locale routing (`/en/…`, `/ar/…`, with `/fr/`, `/es/` reserved), hreflang + per-locale
sitemaps, and RTL layouts designed in from the first component (retrofitting RTL is a
redesign). Launch content: full EN; AR covers Home, Features, Compliance, Install, and
the glossary/fiqh summary. Adding FR afterwards must be content + config only.

### FR-8 Translation honesty
Every translated page carries a "last translated against English revision" marker; a
stale translation shows a banner linking the EN original. Compliance/fiqh statements are
never machine-published without maintainer review. User-generated content is never
translated (Non-goals).

### FR-9 Voice & honesty rules
No profit claims, no performance promises, no testimonial-as-proof sections, no urgency
tactics. Where results are shown, they mirror the engine repo's honest posture (e.g. no
rule family is net-positive at venue taker fees; benchmark = DCA). Standing disclaimers:
not financial advice; not a fatwa; attestation is the operator's responsibility. Venue
names appear under nominative use with the same no-affiliation/no-endorsement wording as
the engine README, translated.

### FR-10 Licensing
`LICENSE` = MIT for code; `CONTENT-LICENSE.md` = © CodeGate Software, quoting with
attribution permitted. The engine repo's licensing is untouched.

### FR-11 Analytics
Cloudflare Web Analytics (cookieless, no consent banner needed). The language-dimension
report is the input for the Spanish-demand decision (D4).

### FR-12 Operations
PR previews; hourly scheduled rebuilds plus manual dispatch; build-failure visibility
(Checks + a badge in the README); dependency on GitHub availability limited to build
time (except FR-5's Worker if used).

## 6. Success criteria

1. `https://keeltrading.com` serves the site over HTTPS; `www` and HTTP redirect; once
   the domain lands (§11).
2. Every launch page exists in EN and AR with true RTL parity; hreflang validates.
3. A new announcement appears on the site within 60 minutes.
4. Download buttons and install snippets reflect the current GitHub release.
5. Docs pages fail the build (not render stale) when an engine doc moves.
6. Lighthouse ≥ 95 performance and ≥ 95 accessibility on launch pages.
7. The honesty review pass (FR-9 checklist) is green in EN and AR before launch.
8. A dry-run proves adding FR is content + config only.
9. No secret ever appears in the repo; the Discussions token lives only in CI/Worker env.

## 7. Delivery plan (issues on the Phase 15 milestone)

1. **Bootstrap & licensing** — repo hygiene, LICENSE/CONTENT-LICENSE, CI placeholder,
   Cloudflare Pages project, domain-wiring plan.
2. **Scaffold & design system** — Astro project, RTL-ready primitives, header/footer,
   dark-mode-friendly plain styling.
3. **English content set** — site-map pages, plain-English copy derived from engine
   docs, honesty/compliance/trademark review.
4. **Docs pipeline** — build-time engine-docs rendering (FR-4).
5. **GitHub integration** — Discussions news feed + Releases downloads, token handling,
   rebuild triggers (FR-5/6).
6. **i18n foundation & Arabic launch set** — routing, hreflang, RTL, markers; AR
   translations of the launch pages (FR-7/8).
7. **Launch hardening** — SEO (sitemaps, OG, structured data), analytics, performance
   pass, final honesty review.
8. *(stretch, phase 2)* French translation; Spanish demand review.

## 8. Risks & mitigations

| Risk | Mitigation |
|------|------------|
| Translation drift makes a stale fiqh claim | FR-8 markers + stale banners; maintainer review gate; phase languages at maintainable pace (README.ar precedent) |
| Domain still pending registration | Operational dependency tracked in §11; preview deployments unblock all work |
| keel.sh collision persists in bare-"keel" searches | Unique "keel trading" brand phrasing everywhere; FAQ line; real content volume is the only durable fix |
| GitHub API changes / rate limits | REST for releases (generous unauthenticated), GraphQL only where needed; static output degrades gracefully to last build |
| Token leakage | CI/Worker-only secrets; repo-level secret scanning; no runtime secrets in pages |
| Scope creep toward a "real" web app | Non-goals section is the contract; anything interactive goes to GitHub |

## 9. Dependencies

- **keeltrading.com registration completing** (order 4166854662, currently "Pending
  Registration" at the GoDaddy-platform reseller). On arrival: point nameservers at the
  Cloudflare account, add the zone, wire the Pages custom domain. After the 60-day ICANN
  transfer window, optionally move the registrar to Cloudflare.
- A Cloudflare account (Pages + optional Worker) and a fine-grained read-only PAT for
  Discussions.

## 10. Out-of-repo notes

- The engine repository is **not** modified by this workstream except (optionally) adding
  a website link to its README once the site is live.
- Announcements of the site itself follow the standing rule: post in Discussions,
  naming venues explicitly where relevant.
