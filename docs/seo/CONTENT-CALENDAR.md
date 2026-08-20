# keeltrading.com — Content Calendar

Ground rule: content derives from what the project already produces (PRD §1 —
"cheap to keep truthful"). Two lanes: **derived** (build-time from GitHub, near
zero marginal cost) and **editorial** (hand-written, EN first, AR translation
within the FR-8 review gate). Nothing ships without the honesty review (FR-9).

## Lane 1 — Derived content (automatic, already shipping)

| Asset | Source | SEO value |
|---|---|---|
| News feed (EN/AR link lists) | Discussions: announcements | Freshness signals; deep links |
| 8 engine docs (glossary, fiqh-basis, runbooks, experiments ×2, research ×2) | Manifest fetch | The methodology cluster's raw material; TechArticle schema shipped |
| Release panel (versioned install) | Releases API | "keel install" query freshness |

## Lane 2 — Editorial calendar (proposed)

Quarterly cadence the maintainer can actually keep: **1–2 pieces/month**, EN +
AR. Priority order = search-gap size × honesty fit.

### Month 1 (launch month)
1. **Title/meta rewrite of existing 8×2 pages** (zero new pages — biggest
   immediate win; table in IMPLEMENTATION-ROADMAP).
2. **"How Shariah crypto screening actually works"** (`/en/guides/how-shariah-crypto-screening-works/`, AR twin)
   — computed vs attested, fail-closed, why absence ≠ pass. Targets: "how
   halal screening works", methodology cluster. Links: compliance, glossary.

### Month 2
3. **"Qabd (constructive possession) in spot crypto, explained"** (EN + AR)
   — §65.4 in plain words, rail 17, why withdrawal capability is enforced not
   assumed. Targets: `qabd crypto`, `القبض الحكمي العملات الرقمية`. Citable
   definition shape → GEO asset.
4. **"Attestation is not a fatwa"** (EN + AR) — the governance boundary as an
   explainer. Targets: definitional cluster; pre-empts the biggest
   misunderstanding of the product.

### Month 3
5. **"How keel differs from halal screeners"** (`/en/guides/keel-vs-halal-screeners/`)
   — one factual table: verdict machines vs enforcement engine; no per-competitor
   pages, no unverifiable claims (FR-9); nominative use only.
6. **"The honest result, in full"** (EN + AR) — the measured no-net-positive
   statement as a standalone explainer linking the experiment record. Targets
   the integrity-seeking audience; strongest E-E-A-T asset.

### Months 4–6 (quarter 2)
7. "What `keel simulate` measures — and why the benchmark is DCA" (EN+AR).
8. "Reading the fiqh basis: how to audit a ruling's source" (EN+AR).
9. "The 18 rails, one by one" — rail-by-rail plain-language table page
   (EN; AR summary). Long-tail: drawdown breaker, martingale guard, etc.
10. Glossary anchors pass: every guide links each term to
    `/en/docs/glossary/#term` (AR links AR summary + EN original) — internal
    linking depth without new URLs.

### Months 7–12 (quarters 3–4, capacity permitting)
11. "Purification obligations a rail cannot see" (operator duties, USDC
    rewards) — honest boundary content.
12. "Spot vs futures vs margin: what keel refuses and why" (EN+AR) — the
    leveraged-products explainer (huge query volume, keep methodology-framed).
13. Arabic-original pieces promoted from Discussions/announcements that gained
    traction (maintainer-review gated, original language preserved on UGC).

## Formats & rules

- Guides live at `/en/guides/<slug>/` + `/ar/guides/<slug>/` (SITE-STRUCTURE).
- 1,200–1,800 words (quality-gate minimum for guides is 1,500 — allow
  shorter only when a table carries the payload); single H1; definition-first
  lede (AI engines quote definitions).
- Every guide: honest-context box if it touches results; fiqh-basis link; the
  "not a fatwa / not financial advice" line; AR rev-marker discipline.
- No: testimonials-as-proof, urgency, per-coin verdicts, profit claims.
- Publish = PR; the Discussions announcement *is* the distribution.

## Measurement per piece

- GSC: impressions on target cluster within 30 days; top-20 within 90.
- If a guide has <10 impressions/30d → the query gap was misjudged; revise
  title/H2s before writing the next one (ACCEPT gate).
