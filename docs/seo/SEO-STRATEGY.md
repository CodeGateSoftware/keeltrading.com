# keeltrading.com — SEO Strategy

- **Date:** 2026-08-19
- **Mode:** New-site strategic planning (`/seo plan`) — the domain is registered but
  pending activation (PRD §11), so this plan is pre-launch. Revisit the KPI table
  once GSC has 30 days of data.
- **Companion docs:** [COMPETITOR-ANALYSIS.md](./COMPETITOR-ANALYSIS.md) ·
  [CONTENT-CALENDAR.md](./CONTENT-CALENDAR.md) ·
  [IMPLEMENTATION-ROADMAP.md](./IMPLEMENTATION-ROADMAP.md) ·
  [SITE-STRUCTURE.md](./SITE-STRUCTURE.md)

## 1. Situation

keeltrading.com markets **keel** — an open-source, auditable Shariah-compliance
engine for spot crypto. The site ships with 24 indexable pages in English and
Arabic (hreflang wired), zero client JS, Lighthouse ≥ 95 targets, and a build
that renders engine documentation directly from GitHub.

Three forces define the search landscape:

1. **The "KEEL" name is triple-collided.** Kubernetes Keel (keel.sh) owns bare
   "keel"; NASDAQ ticker KEEL (Keel Infrastructure, ex-Bitfarms — a *bitcoin
   mining* company) now pollutes "keel trading" and "keel crypto" queries; and
   generic boating/ship words fill the rest. A ticker named KEEL that mines
   bitcoin is the worst possible SERP neighbour for a Shariah-compliance
   brand — it makes entity disambiguation an existential SEO task, not a
   nice-to-have.
2. **The halal-crypto-screening SERP is commercial and closed.** Every ranking
   tool (HalalFinanx, Sharlife, Saraf, PIF, Hudood, IFG) is a proprietary
   verdict machine: "we screened it, trust us." None is open-source; none is
   an enforcement engine; none publishes its rulings as auditable documents.
3. **The Arabic SERP is fatwa-dominated.** Arabic queries about crypto
   halalness return fatwa portals and YouTube scholars — almost no tooling, no
   methodology explanations. There is a real information gap for *plain-Arabic
   explanations of how screening works* — exactly what keel's Arabic edition
   (glossary/fiqh summaries, README.ar-derived vocabulary) is built to serve.

## 2. Positioning (the wedge)

> **The only open-source, auditable Shariah-compliance engine — the screening
> you can check, not just trust.**

Every competitor sells verdicts. keel enforces *your* rulings, fails closed,
and states its own honest result on the front page. This maps to three search
positions no competitor occupies:

| Position | Query space | Why keel can own it |
|---|---|---|
| Auditable methodology | "shariah screening methodology", "how halal screening works", "AAOIFI crypto screening" | The fiqh-basis doc *is* the answer; competitors hide methodology |
| Tool-agnostic explainers | "qabd constructive possession crypto", "attestation vs screening", "purification spot crypto" | Glossary + AR summaries; definition-shaped content wins AI citations |
| Honest measurement | "crypto trading bot honest results", "DCA benchmark backtest" | The experiment record is unpurchaseable authenticity |

**Hard boundary (PRD non-goals + FR-9):** keel never answers "is X halal?" as
an authority, never claims a fatwa, never promises profit. SEO content stays in
the methodology/tooling lane and links to the fiqh basis for rulings. This
constraint is also the differentiator — lean into it, never around it.

## 3. Entity strategy (the KEEL collisions)

With three "keel" entities in play, Google needs unambiguous signals for who
we are:

1. **Consistent naming:** always "keel by CodeGate Software" (or
   "keeltrading.com") in titles, JSON-LD (`Organization` + `SoftwareApplication`
   already shipped), OG profiles, and GitHub org profile. Never bare "Keel"
   in title tags.
2. **`sameAs` wiring:** add to Organization schema the GitHub org, the engine
   repo, and (when created) social profiles. Cross-link engine README ↔ site
   (PRD §10 allows adding the site link to the engine README).
3. **Disambiguation page as anchor:** `/about/` FAQ already handles keel.sh;
   extend with one line about the KEEL ticker so AI engines citing "Keel
   crypto" can separate the entities.
4. **Brand query targets (12-month):** top-3 for "keel trading", "keel
   shariah", "keel compliance engine"; site-links for "keeltrading".
   Non-brand queries are won with methodology content (§2), not the homepage.

## 4. Bilingual strategy (EN + AR)

- **EN** targets the global methodology/tooling space (developer + curious
  investor).
- **AR** targets the fatwa-gap: plain-Arabic explainers of *how screening
  works*, what قبض/qabd means in spot settlement, why attestation ≠ fatwa —
  terminology locked to the engine's own README.ar vocabulary.
- hreflang is already correct (en/ar/x-default + sitemap alternates). The
  FR/ES expansion decision (PRD D4) will be made from the Cloudflare
  Analytics language dimension — an SEO input unique to this setup.
- Translation-honesty markers (FR-8) are an E-E-A-T asset: visible revision
  discipline signals genuine expertise, not content-farming.

## 5. Technical foundation (status)

Already in place at launch: static HTML, zero-JS, HTTPS (Cloudflare), XML
sitemap with hreflang alternates, robots.txt, canonical URLs, OG/Twitter,
Organization/SoftwareApplication/TechArticle schema, cookieless analytics
hook, 404. Gaps to close in Phase 1: GSC verification + sitemap submission,
`llms.txt` (GEO), BreadcrumbList on docs, DefinedTermSet on the glossary,
WebSite schema on home. See IMPLEMENTATION-ROADMAP.md.

## 6. KPI targets

| Metric | Baseline (launch) | 3 months | 6 months | 12 months |
|---|---|---|---|---|
| Indexed pages (GSC) | 24 of 24 submitted | 24 | 24–30 | 30+ |
| Brand SERP ("keel trading") | not present | top-10 own domain | top-3 + sitelinks | top-1 |
| "keel shariah" / "keel compliance" | — | top-5 | top-1 | top-1 |
| Non-brand methodology queries in top-10 | 0 | 3 | 10 | 20+ |
| Arabic organic clicks (GSC, /ar/) | 0 | 50/mo | 300/mo | 1,000/mo |
| AI citations (AEO monitor) | 0 | first observed | 5 sources | 15 sources |
| Core Web Vitals (field) | — | pass (LCP<2.5s, INP<200ms, CLS<0.1) | pass | pass |
| Referring domains (honest links) | 0 | 5 | 15 | 40 |

Falsifiability check (per the skill's ACCEPT principle): if "keel shariah" is
not top-5 at 3 months with 24 indexed pages and 5 referring domains, the entity
strategy (§3) has failed, not the whole plan — re-audit the `sameAs`/naming
signals before touching content.

## 7. Risks

| Risk | Mitigation |
|---|---|
| KEEL-ticker SERP pollution grows (miner does PR) | Entity discipline (§3); "keel by CodeGate" phrasing everywhere |
| Ranking for fatwa-adjacent Arabic queries tempts scope creep | Non-goals contract; every AR explainer ends at the fiqh-basis link, never a verdict |
| Docs pipeline freshness vs. SEO stability (URLs change when docs move) | Slugs are manifest-controlled and stable; 301 via Cloudflare if a slug ever retires |
| Comparison-page temptation violates FR-9 honesty rules | One factual "how keel differs" page, no per-competitor vs pages, no unverifiable claims |
| Thin glossary term pages trip quality gates | Keep single-page glossary with anchors; per-term pages only if entries grow |
