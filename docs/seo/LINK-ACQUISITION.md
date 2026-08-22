# Link acquisition ledger (#14)

Honest link acquisition only: submissions where keel genuinely fits, always
with maintainer disclosure, never astroturfed (issue #14's own rule). Every
external action is recorded here with its status.

## Submissions

| Date | Target | Action | Status |
|---|---|---|---|
| 2026-08-22 | awesome-islamic-finance (goww7) | PR goww7/awesome-islamic-finance#2 — Developer Tools & APIs | Open, awaiting owner |
| 2026-08-22 | awesome-crypto-trading-bots (botcrypto-io, 2.5k★) | PR botcrypto-io/awesome-crypto-trading-bots#136 — Open source bots | Open, awaiting owner |
| 2026-08-22 | awesome-selfhosted (314k★) | PR awesome-selfhosted/awesome-selfhosted-data#2957 — `software/keel.yml`, Money, Budgeting & Management | **Closed by maintainer same day; submitter's account blocked org-wide** — see Lessons |

| 2026-08-22 | awesome-islamic-open-source-apps (tarekeldeeb) | PR tarekeldeeb/awesome-islamic-open-source-apps#7 — Other/Python, TOC count bumped | Open, awaiting owner |
| 2026-08-22 | engine repo topics | Added `cryptocurrency` to existing islamic-finance/shariah-compliant/halal set | Done |

**Note discovered the hard way:** awesome-selfhosted's readme repo rejects
PRs by design ("Please do not submit pull requests in this repository") —
submissions go through `awesome-selfhosted/awesome-selfhosted-data` as a
`software/<name>.yml` file. OctoBot's entry was used as the schema template.

## Lessons from the awesome-selfhosted rejection (2026-08-22)

The data-repo PR was closed by the maintainer (nodiscc) without comment
within the day, and the submitter's account was blocked org-wide — their
standing response to perceived spam. Contributing factors, honestly assessed:

1. **Retry burst before submission.** The initial (correct) discovery that
   the readme repo refuses PRs took several rapid failed PR attempts against
   it — failed-attempt bursts from a fresh fork are a classic spam signature.
   Rule adopted: on a permission error, stop and investigate; never machine-gun
   retries. One submission attempt per organization, ever.
2. **Project maturity.** Their bar is established software; keel is days old
   with 3 stars. Even a perfectly-formed submission from a spotless account
   would likely have been queued for months or rejected as too new.
3. **No evasion.** The block stands. No alternate accounts, no resubmission
   through another identity — that would be exactly the astroturfing this
   ledger forbids. If the project earns its place later (stars, releases,
   community), the maintainer's public email (nodiscc@gmail.com) is the
   honest channel for a polite note from the project author asking whether
   a future submission would be welcome. Accept silence or no as the answer. (A short apology
note — no unblock demand, submission explicitly withdrawn — was sent to
that address by the maintainer on 2026-08-22; outcome, if any, will be
recorded here.)

The other three submissions are to independent owners (goww7, botcrypto-io,
tarekeldeeb) and are unaffected by this block.

## Community participation (maintainer's hands, not the site's)

Drafts below are ready to post **from the maintainer's own Reddit account**,
disclosure first. Do not post from anywhere else; do not use vote rings.

### r/IslamicFinance — text post draft

> **I built an open-source tool that enforces (not decides) Shariah compliance on spot crypto — sharing because this community's scrutiny is exactly what it needs**
>
> Full disclosure up front: I'm the maintainer, this is my project, and I'm not here to sell anything — it's Apache-2.0, self-hosted, and there is no paid tier.
>
> keel is a compliance engine, not a fatwa machine. It never decides what's halal — you record classifications (with sources), and it enforces them deterministically: assets without an attestation are refused, trades only spend settled balances, AAOIFI §65.4 qabd is an actual executable check, and interest that accrues inside the account is counted so the purification amount is reported, not guessed.
>
> The honest result, stated by us first: none of our shipped trading rules is net-positive at the fees actually paid. We publish that on the front page. The project is the enforcement machinery and honest measurement, not alpha.
>
> Site with plain-language docs (EN/AR/FR): keeltrading.com — code: github.com/CodeGateSoftware/keel
>
> What I'd genuinely value from this community: does the fiqh framing convince you? What's missing? There's a Compliance & classification category in Discussions where classification questions are welcome as questions.

Engagement rules for follow-ups: answer questions in the comments as the
author, link the fiqh-basis doc when challenged on specifics, never claim
scholarly endorsement (none has occurred — say so plainly).

## KPIs (docs/seo/SEO-STRATEGY.md §6)

- 5 referring domains by month 3 (late 2026-11), 15 by month 6 (late 2027-02)
- Measure monthly: Google Search Console → Links report; plus a web search
  for `keeltrading.com` and `CodeGateSoftware/keel` to catch unlisted mentions
- Baseline 2026-08-22: 0 tracked referring domains; 4 submissions pending
