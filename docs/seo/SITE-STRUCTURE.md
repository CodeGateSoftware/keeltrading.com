# keeltrading.com — Site Structure

## Current architecture (as built, v1)

```
/                        → 301-style redirect to /en/ (meta-refresh, noindex)
/en/                     Home — brand + honest result + CTAs
├── /en/features/        Engine capabilities, each linked to proving source
├── /en/install/         Five-minute bootstrap + versioned release panel
├── /en/docs/            Docs index (fetched-at-build provenance)
│   ├── glossary/        Engine glossary (anchored ## terms)
│   ├── fiqh-basis/      The fiqh basis (rulings + sources)
│   ├── operator-runbook/
│   ├── go-live-runbook/
│   ├── experiment-honest-result-restated/
│   ├── experiment-hourly-backtest/
│   ├── research-lahlou-speculation-risk/
│   └── research-money-management/
├── /en/news/            Discussions announcements feed (deep links)
├── /en/community/       Curated Discussions categories
├── /en/compliance/      Methodology in plain terms (computed vs attested…)
└── /en/about/           License, trademarks, keel.sh/KEEL disambiguation FAQ
/ar/                     Full mirror: Home, Features, Install, Docs index
│                        (AR summaries + EN originals), News, Community,
│                        Compliance, About — RTL, rev-markers, stale banners
/fr/, /es/               Reserved in routing; no pages until phased in
/404                     Bilingual 404
```

Rules already enforced: every page ships hreflang (en/ar/x-default) where the
page exists in both locales; docs slugs are manifest-controlled and stable;
all external interaction links point at GitHub.

## Planned extensions (Phase 2+)

```
/en/guides/<slug>/       Editorial explainers (calendar lane 2)
/ar/guides/<slug>/       AR twins (same slugs; translated, rev-marked)
```

Deliberately **not** built (and why):

- **Per-term glossary pages** (`/glossary/qabd/`) — current entries are too
  short for quality gates; single anchored page wins until the glossary grows.
- **Per-competitor `/vs/` pages** — violates FR-9 honesty posture and the
  no-denigration brand; one factual differences guide instead.
- **Coin-verdict pages ("is X halal")** — would make keel a fatwa engine,
  which it is not (non-goal, and the founding differentiator).
- **Blog as a category** — "News" (derived) + "Guides" (editorial) keep the
  presentation-layer contract legible; a `/blog/` would invite scope creep.

## Internal-linking map (target state)

```
Home ─┬─→ Features ─→ (source links out to repo)
      ├─→ Compliance ─→ fiqh-basis doc ─→ glossary anchors
      ├─→ Guides ─→ glossary anchors + compliance + relevant docs
      ├─→ Install ─→ go-live runbook doc
      ├─→ Docs (index) ─→ all 8 docs
      ├─→ News / Community ─→ GitHub (external)
      └─→ About ─→ disambiguation anchors
Footer: honest-result link sitewide (already shipped)
```

Every guide must carry ≥3 internal links (two-way where the target has a
"related" surface); glossary anchors are the connective tissue of the
methodology cluster.

## URL & technical conventions

- Locales: `/en/`, `/ar/` prefixes; `fr`/`es` reserved. Slugs identical across
  locales (v1 contract; translated slugs only with a redirect map).
- Trailing slashes on; canonical = `https://keeltrading.com` host only.
- Docs page URLs are slugs from `engine-docs.manifest.json` — if a slug ever
  retires, ship a 301 in Cloudflare (Bulk Redirects) before removing.
- Sitemaps: `sitemap-index.xml` with per-locale alternates (shipped);
  guides join automatically via the integration.
- Schema per template: Home (Organization + SoftwareApplication + WebSite),
  guides (Article), docs (TechArticle + BreadcrumbList), glossary
  (DefinedTermSet), 404 (none, noindex).
