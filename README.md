# keeltrading.com — the public website for Keel

[![CI](https://github.com/CodeGateSoftware/keeltrading.com/actions/workflows/ci.yml/badge.svg)](https://github.com/CodeGateSoftware/keeltrading.com/actions/workflows/ci.yml)

This repository holds the public website for [Keel](https://github.com/CodeGateSoftware/keel),
the open-source, auditable Shariah-compliance engine for spot-crypto trading.

The site is a **read-only presentation layer over GitHub**: plain-English (and
plain-Arabic) explanations, documentation rendered from the engine repository,
news from GitHub Discussions, and download buttons pointing at GitHub Releases.
Community interaction (posting, voting, polling) stays on GitHub — the site
surfaces and translates, it never duplicates.

**Status: v1 implemented** against the
[PRD](docs/superpowers/specs/2026-08-19-website-prd.md) (`Phase 15 — Public
website v1`). Deploys run from GitHub Actions (add two repo secrets + one
variable per [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) and the site goes live
on `*.pages.dev` immediately); the custom domain is deferred until its
registrar completes (PRD §11). SEO strategy and roadmap:
[docs/seo/](docs/seo/SEO-STRATEGY.md).

## What is in here

- **Static-first Astro** (zero client JavaScript), deployed to Cloudflare
  Pages from `main`; every PR gets a preview.
- **Docs pipeline (FR-4)** — [engine-docs.manifest.json](engine-docs.manifest.json)
  pins the engine documents at keel's latest published release tag, resolved at
  build time (#85), so the site describes what an operator runs; `npm run build`
  fetches them and **fails loudly** if one moves. Documents are never
  hand-copied.
- **News (FR-5)** — the Announcements category of GitHub Discussions, read via
  the public REST endpoint (no token, no Worker needed — see the note in
  docs/DEPLOYMENT.md), refreshed by an hourly rebuild workflow.
- **Downloads (FR-6)** — version number, asset links, and the versioned pip
  command come from the GitHub Releases REST endpoint at build time. Buttons
  link directly to GitHub; binaries are never mirrored here.
- **i18n (FR-7/FR-8)** — English (source of truth) and a full Arabic edition
  with RTL layouts designed in from the first component, hreflang alternates,
  per-locale sitemaps, a "last translated against English revision" marker on
  every translated page, and a stale-translation banner. `fr`/`es` are
  reserved in routing for their phase.

## Working on the site

```bash
npm install
npm run dev       # fetches engine data, then serves at localhost:4321
npm run build     # fetch + build to dist/
npm run check     # astro check (type checking)
```

The fetch scripts write to `data/` and `src/content/engine-docs/` — both are
gitignored build artifacts. `GITHUB_TOKEN` in the environment is optional
(rate-limit headroom only).

### Adding a page

Page copy lives in typed dictionaries in `src/i18n/pages/`; the markup lives
once in `src/components/pages/`; the route files in `src/pages/{en,ar}/` are
thin wrappers. Adding a locale is content + config only (the FR dry-run
contract, Success criterion 8).

## Honesty rules (FR-9)

No profit claims, no performance promises, no testimonial-as-proof, no urgency
tactics. The measured result is stated by the site first: no shipped rule
family is net-positive at the taker fee actually paid; the benchmark is DCA.
Standing disclaimers (not financial advice; not a fatwa; attestation is the
operator's responsibility) ship in every footer, in both languages.

## Licensing

- Code in this repository: MIT ([LICENSE](LICENSE)).
- Site content (prose, branding, translations): © CodeGate Software — quoting
  with attribution is welcome; see [CONTENT-LICENSE.md](CONTENT-LICENSE.md).
- The keel engine is Apache-2.0 under its own repository; documents rendered
  in the Docs section are fetched from it at build time and remain under its
  license.

"Keel" is not affiliated with, endorsed by, or sponsored by any exchange or
brokerage named on the site. Venue names (Alpaca, Coinbase, Robinhood, and
others) are used nominatively to describe what the engine connects to. This
project is not affiliated with the Kubernetes project also named Keel (keel.sh).
