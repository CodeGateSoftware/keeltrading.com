# keel on social media — playbook

Status: proposal (no accounts exist yet). The one urgent item is **handle
reservation** (§1) — everything else can follow at the project's pace.

## 1. Reserve handles first (cheap insurance, do now)

The bare-"keel" namespace is already triple-collided (keel.sh, the KEEL
ticker, nautical noise). Social handles are first-come; reserving costs
nothing but the owner's time. Register **`keeltrading`** (fallback:
`keeltradingcom`, `keel_by_cg`) everywhere below — even platforms not in
phase 1 — using the project's identity/email:

- [ ] X/Twitter — `@keeltrading`
- [ ] YouTube — `@keeltrading` (channel)
- [ ] Telegram — `t.me/keeltrading` (channel)
- [ ] Instagram — `@keeltrading`
- [ ] TikTok — `@keeltrading`
- [ ] LinkedIn — company page "Keel by CodeGate Software"
- [ ] Bluesky / Mastodon — `@keeltrading` (optional mirrors)
- [ ] GitHub org already exists: `CodeGateSoftware`

Record every account's credential recovery in the owner's password manager
(no credentials in this repo, ever).

## 2. Platform strategy — phased like the locales

| Phase | Platform | Why | Cadence |
|---|---|---|---|
| 1 | **X/Twitter** | Dev + fintech crowd (EN); baseline discovery; where OSS lives publicly | 2–4 posts/wk |
| 1 | **Telegram channel** | The Arabic crypto/Islamic-finance audience's water cooler; broadcast-only mirrors announcements | auto (RSS → channel) |
| 2 | **YouTube** | The Arabic SERP research showed YouTube scholars dominate this topic — the core AR audience consumes video; web-console walkthroughs and methodology explainers fit | 1–2 videos/mo |
| 3 | Instagram / TikTok | Mass AR/FR audience; 60-second "what is qabd" style explainers | weekly, repurposed |
| 3 | LinkedIn | Islamic-finance professionals, if enterprise ever matters | monthly |

## 3. Voice rules (FR-9 applies double on social)

1. **The honest result goes first** — even in a bio. Bio line (all platforms):
   *"Open-source Shariah compliance engine for spot crypto. Not a fatwa. No
   shipped rule is net-positive at its fees — stated by us, first."*
2. No profit claims, no urgency, no moon talk, no engagement-bait. If a post
   can't be true on the worst day of the market, it doesn't ship.
3. **Announcements originate in GitHub Discussions** (the standing rule);
   social amplifies with a link back. Social never breaks news first.
4. Community questions get answered once briefly, then linked to Discussions
   — the canonical place stays GitHub.
5. Never answer "is X halal?" — the fatwa boundary is the product's edge.
   Redirect to the compliance methodology and fiqh-basis.
6. Venue names nominatively only; never imply endorsement.
7. Screenshots of the web console (public/get-started/) and numbers from the
   experiment record are the visual language. No stock chart imagery, no
   rockets, no lambos — a keel, a terminal, a table of honest numbers.

## 4. The content engine (derived first, created second)

The project already produces content weekly — social mostly re-shapes it:

**Derived (near-zero marginal cost):**
- Every Discussions announcement → X thread + Telegram post (RSS bridge:
  `/en/news/rss.xml` now exists for automation)
- Experiment records → "one honest number" posts (e.g. 0-of-90
  configurations, 49.4 vs 2.15 signals/asset-year)
- Release notes → version post with the install card
- Glossary terms → definition-of-the-week (EN + AR) — definition-shaped
  content is what AI engines and fatwa-fatigued readers both want
- Get Started screenshots → web-console walkthrough threads

**Created (phase-gated):**
- YouTube: "Run keel in five minutes" (screen recording of the actual web
  console), "What attestation means", AR-language methodology explainers
- Instagram/TikTok: 60-second explainers from the glossary, AR-first

## 5. Wiring into the site (after accounts exist)

- Footer "The project" section: social links
- Organization JSON-LD `sameAs`: add each profile URL (entity graph — SEO
  strategy §3)
- News page: Telegram/X follow links
- About FAQ (open-source section): link the playbook where relevant

## 6. Measurement

- Phase-1 KPI: X followers < 1k is fine — the real signal is Discussions
  referral traffic (GitHub traffic insights) and AR-edition visits from
  social (Cloudflare Analytics referrers)
- Do not chase vanity metrics; a smaller honest audience is the brand
