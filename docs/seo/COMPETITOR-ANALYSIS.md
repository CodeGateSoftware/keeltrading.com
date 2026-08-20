# keeltrading.com — Competitor Analysis

Research date: 2026-08-19, live SERP sampling (EN + AR). The "competition" is
not one market: keel faces closed-source screeners on tooling queries, fatwa
portals on Arabic queries, and entity collisions on brand queries.

## Tier 1 — Halal-crypto screeners (direct SERP competitors, EN)

| Competitor | What ranks | Their model | Gap keel exploits |
|---|---|---|---|
| [Halal Finanx](https://halalfinanx.com/crypto-screener) | "halal crypto screener" | Claims "world's first" Shariah crypto screening platform; verdict lists | Not open-source; no methodology audit; "first" claims are checkable and beatable on honesty |
| [Sharlife](https://sharlife.my/crypto-shariah) (MY) | crypto shariah analysis | Per-coin halal status + metrics | Black-box verdicts; keel = attestation you supply |
| [Saraf Screening](https://sarafscreening.com/) (AE) | halal crypto/stock screening | Screening + training + guidance | Consulting model; no enforceable engine |
| [Shariyah Review Bureau](https://shariyah.net/cryptocurrency/) (shariyah.net) | crypto assessment | Established Shariah advisory firm | The *reviewed* authority keel explicitly is not — do NOT fight here; cite and contrast ("review status: open") |
| [PIF Finance](https://pif.finance/reports/crypto) | halal crypto reports | Ratings for BTC/ETH/etc. | Same verdict-machine pattern |
| [Hudood](https://hudood.com/screening-methodology) | screening methodology | 3-tier AAOIFI-aligned tiers (Itqan/Ehtiyat/Taqwa) | Closest methodology-first competitor — still closed; keel's rulings are versioned docs in a public repo |
| [Islamic Finance Guru](https://www.islamicfinanceguru.com/crypto) | halal crypto list | Top-50 live list, strong brand | Publisher, not tooling; their "how screening works" depth is shallow |

**Shared weakness (the wedge):** every one sells *verdicts*. None publishes
rulings as auditable, version-controlled documents; none fails closed; none
states a negative measured result about itself. keel's "screening you can
check, not just trust" is factually true and unclaimed.

## Tier 2 — Adjacent authority brands (own "halal screener" mindshare)

[Zoya](https://halalwallet.us/investing/stock-screeners) and
[Musaffa](https://www.musaffa.com/) dominate "halal stock screener" and spill
into crypto queries; Islamicly rides roundups. They are *stock* screeners —
keel is a spot-crypto *compliance engine* with an operator CLI. Treat as
comparison context ("halal screeners answer *is it halal*; keel enforces *what
you ruled*"), not as head-on targets. No per-competitor `/vs/` pages (honesty
rules); one factual differences page on keel's terms (see CONTENT-CALENDAR).

## Tier 3 — Exchange Islamic accounts (SERP occupants, not competitors)

Bybit's Islamic Account, Rain (Bahrain), HAQQ/Haqqex rank for
"shariah compliant crypto trading". These are *venues*; keel is a *client-side
engine* that works against venues (nominative use only, per FR-9). Expect them
to outrank keel on commercial-intent queries — fine; keel's queries are
methodology-intent.

## Tier 4 — Arabic SERP (the information gap)

Arabic queries ("هل العملات المشفرة حلال", "فحص العملات الرقمية شرعيا") rank:

- Fatwa portals: [IslamWeb](https://www.islamweb.net/ar/fatwa/429631/), Evest's
  هيئة كبار العلماء writeups, [Al Jazeera studies](https://www.aljazeera.net/video/wisdom/2025/8/20/دراسة-شرعية-90-من-العملات-الرقمية-لا)
- YouTube scholars (Saad Al-Khathlan, Al-Shathri sessions)
- One localized tool: [CryptoHalal](https://www.cryptohalal.cc/currencies)
- Broker content marketing (ChartXpert, JustMarkets, Chart-Idea)

**Gap:** nobody explains *how screening works* in plain Arabic with an
auditable methodology. Fatwa portals cannot be outranked on the verdict
question (and keel must not try — non-goal); the methodology/how-it-works
cluster is open. Arabic glossary/fiqh explainers target it (see
CONTENT-CALENDAR).

## Tier 5 — Open-source landscape (GitHub)

The [halal-finance topic](https://github.com/topics/halal-finance) contains a
Python AAOIFI/DJIM *stock* screening engine (kindred spirit, different asset
class), Yassir/HalalTerminal wrappers, and
[awesome-islamic-finance](https://github.com/goww7/awesome-islamic-finance) —
a legitimate, relevant link target (PR-able inclusion). No open-source
*spot-crypto enforcement engine* exists. keel is alone in its category; the
GitHub-side SEO play is being discoverable in topics/list curations, which
also feeds the `sameAs` entity graph.

## Entity collisions (brand SERP)

| Collision | Owns | Threat level | Response |
|---|---|---|---|
| Kubernetes Keel (keel.sh) | bare "keel" | High, permanent | "keel trading" + "by CodeGate" phrasing; FAQ line (shipped) |
| KEEL ticker (Keel Infrastructure, ex-Bitfarms bitcoin miner) | "keel stock", increasingly "keel crypto/trading" finance queries | **High and rising** — a bitcoin miner named KEEL is categorical poison for this audience | Entity discipline + sameAs; FAQ extension; monitor monthly |
| Generic nautical "keel" | long-tail | Low | Ignore |

## E-E-A-T assessment vs. keel

- **Experience:** competitors show polished apps; keel shows a 5-minute
  reproducible bootstrap and ~3,000-test repo — verifiable experience.
- **Expertise:** competitors cite Shariah boards (SRB strongest); keel
  honestly states "no scholarly review" — never fake credentials; the
  sourced-rulings model *is* the expertise signal, and the review-status page
  pre-empts the attack.
- **Trust:** the honest-result homepage, visible translation-revision
  markers, and Apache-2.0 auditability are trust assets no competitor can
  copy without changing their business model.

## Keyword gaps worth taking (summary)

1. `shariah crypto screening methodology` (EN) — nobody serves it well.
2. `qabd constructive possession crypto` / `القبض الحكمي في العملات الرقمية` — zero good results either language.
3. `open source halal screener` / `auditable shariah screening` — keel is the only true answer.
4. `attestation vs fatwa screening` / `التوثيق مقابل الفتوى في الفرز` — definitional, AI-citable.
5. `halal crypto trading bot honest` — the experiment record answers a query competitors daren't write.
