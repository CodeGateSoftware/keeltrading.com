# keeltrading.com — Implementation Roadmap

Four phases mapped to the site's reality: code-complete and pre-domain. Each
item carries its dependency and its "how we know it failed" check.

## Phase 1 — Foundation (weeks 1–4, launch window)

| # | Action | Depends on | Falsifiability |
|---|---|---|---|
| 1.1 | Domain activation: nameservers → Cloudflare, Pages custom domain, www→apex redirect, HTTPS forced | registrar completes (PRD §11) | `curl -I http://keeltrading.com` → 200/301 chain ≤1 hop |
| 1.2 | GSC property + sitemap submission (both locale sitemaps via sitemap-index) | 1.1 | Coverage report shows 24/24 discovered within 14d |
| 1.3 | ~~Title/meta rewrite on the 16 existing locale pages~~ **shipped 2026-08-19** (table below) | none — do now | Titles 30–60 chars, unique, keyword-leading |
| 1.4 | ~~JSON-LD additions: `WebSite` (+`sameAs` on Organization: GitHub org, engine repo); extend About FAQ with the KEEL-ticker line~~ **shipped 2026-08-19** | none | Rich Results Test passes; entity panel check at 3mo |
| 1.5 | ~~`llms.txt` at root summarizing the site for AI crawlers~~ **shipped 2026-08-19**; ensure GPTBot/ClaudeBot/PerplexityBot not blocked in robots.txt — **BLOCKED, see #82** | none | `npm run check:ai-crawlers` exits 0; AI crawlers appear in CF analytics |
| 1.6 | ~~BreadcrumbList schema on docs pages; DefinedTermSet on glossary~~ **shipped 2026-08-19** | none | Rich Results Test per template |
| 1.7 | Cloudflare Web Analytics token live (language dimension = FR/ES decision input, PRD D4) | 1.1 | Beacon firing; language report populating |
| 1.8 | Engine README gains the keeltrading.com link (PRD §10 allows) — entity `sameAs` reinforcement | 1.1 | Reciprocal links crawlable |

> **1.5 blocker (found 2026-08-23, issue #82).** `public/robots.txt` is correct,
> but Cloudflare injects a `# BEGIN Cloudflare Managed content` block at the edge
> that disallows nine AI crawlers — `ClaudeBot`, `GPTBot`, `CCBot`,
> `Google-Extended`, `meta-externalagent`, `Applebot-Extended`, `Amazonbot`,
> `Bytespider`, `CloudflareBrowserRenderingCrawler` — and sets
> `Content-Signal: ai-train=no`. The origin cannot override it; the remedy is a
> zone-level dashboard setting (docs/DEPLOYMENT.md § AI crawler access).
> `llms.txt` therefore ships and serves 200 while the crawlers it exists for are
> told not to read the pages it points at. `scripts/check-ai-crawlers.mjs` now
> fails loudly on this, daily, so it cannot go quiet again.

### Title/meta rewrite table (current → proposed, EN shown; AR mirrors)

| Page | Current title | Proposed (≤60 chars) |
|---|---|---|
| Home | Keel — the open-source, auditable Shariah-compliance engine for spot crypto | Keel: Open-Source Shariah Compliance Engine for Crypto |
| Features | Features — everything the engine can show | Shariah Compliance Engine Features — keel |
| Install | Install keel | Install keel — From Source or GitHub Releases |
| Docs | Docs — rendered from the engine repository | keel Docs: Glossary, Fiqh Basis, Runbooks |
| Compliance | Compliance — the methodology in plain terms | Shariah Compliance Methodology, in Plain Terms |
| News | News — announcements from the project | keel News — Announcements & Research Notes |
| Community | Community — on GitHub, by design | keel Community on GitHub Discussions |
| About | About this site and the Keel name | About keel — Name, License, keel.sh & KEEL FAQ |

## Phase 2 — Expansion (weeks 5–12)

- Launch `/en/guides/` + `/ar/guides/` with calendar items 2–4 (CONTENT-CALENDAR).
- Internal-linking pass: home → guides; guides → compliance/glossary/docs;
  glossary anchors deep-linked (calendar item 10, can pull forward).
- Honest link acquisition: awesome-islamic-finance PR, Islamic-finance
  subreddit/communities (disclose project authorship — the brand is honesty),
  one GitHub-topic discoverability task (topics on engine repo).
- First GEO check: search target queries in AI Overviews/Perplexity/ChatGPT;
  log which pages get cited (baseline for KPI).
- **Check:** 3 methodology queries in top-10 by week 12, or re-audit titles.

## Phase 3 — Scale (weeks 13–24)

- Calendar items 5–10; glossary anchor interlink complete.
- Breadcrumb + Article schema mature; consider HowTo — **no** (deprecated);
  no FAQPage for SERP purposes (retired May 2026) — QAPage only if genuine
  Q&A content appears.
- CWV field-data pass (CrUX threshold: LCP <2.5s, INP <200ms, CLS <0.1);
  zero-JS architecture should make this trivial — verify, don't assume.
- Arabic SERP review: which AR explainers cracked the fatwa-dominated
  queries; adjust AR cadence accordingly.
- **Check:** 10 non-brand top-10s; 300 AR clicks/mo (GSC).

## Phase 4 — Authority (months 7–12)

- Thought-leadership pieces (items 11–13); original-data content (experiment
  records are unpurchaseable original research — surface them as citeable
  summaries with stable numbers).
- PR: the honest-result story is genuinely newsworthy to Islamic-finance
  press; 2–3 pitches.
- FR/ES decision from a year of CF language data (PRD D4) — if FR launches,
  it is content + config only (verified dry-run contract).
- Optional: `keel.trading` alias revisit (PRD D3) if brand SERP still leaked.
- **Check:** brand queries top-1 + sitelinks; 40 referring domains; AI
  citations ≥15 sources.

## Dependencies & sequencing

Domain (1.1) gates everything external; items 1.3–1.6 are code changes
shippable to `*.pages.dev` previews today. Guides lane (Phase 2) does not
start until 1.2 confirms indexation, so early content isn't burned on an
unindexed origin.
