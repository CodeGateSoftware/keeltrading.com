/**
 * Get Started guides — editorial, site-authored newbie walkthroughs (EN for
 * now, like the engine documents themselves). Every command and screen below
 * was verified against keel v0.10.0: the TUI screenshots in
 * public/get-started/ were captured from a real `keel tui` session on a
 * fresh `keel init` working directory.
 */
export interface GuideStep {
  title: string;
  body: string[];
  code?: string;
  shot?: string;
  shotCaption?: string;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  intro: string;
  steps: GuideStep[];
}

export const guides: Guide[] = [
  {
    slug: "first-run",
    title: "1 · Install and first run",
    description:
      "From a fresh download to the operator console on your screen: scaffold a working directory and take the tour.",
    intro:
      "This guide starts from nothing and ends with the keel console running on your machine. Everything here is read-only and paper-side — no funds, no keys, nothing can trade. Ten minutes, four commands.",
    steps: [
      {
        title: "Step 1 — Install keel",
        body: [
          "Follow the Download page for your platform: grab the wheels from the latest GitHub release, create a virtual environment, and install the keel_trader wheel by path.",
          "Then verify the whole install — every keel distribution must report the same version:",
        ],
        code: "keel versions",
      },
      {
        title: "Step 2 — Scaffold a working directory",
        body: [
          "keel keeps everything — config, database, logs — in one working directory. Create a fresh folder and scaffold it:",
        ],
        code: "mkdir keel-paper && cd keel-paper\nkeel init",
        shot: "/get-started/tui-main.png",
        shotCaption:
          "The dashboard after a fresh keel init: paper mode, kill-switch ENGAGED by default, 32 rule candidates seeded, no data yet. Exactly what a safe starting point looks like.",
      },
      {
        title: "What keel init created",
        body: [
          "config.yaml — the deployment's settings, written in the dev/paper profile. Review the allowlist, caps, and auto_trade sections before anything else.",
          "keel.db — the local SQLite database (rules, trials, orders). logs/ — what the engine did and why.",
          "keel init also seeds the rule registry: 32 rule-product candidates (four rule families across the default allowlist), all in candidate status. Nothing is live; nothing trades.",
        ],
      },
      {
        title: "Step 3 — Open the operator console",
        body: [
          "The console (we call it the TUI) is a live, full-screen dashboard. Start it with:",
        ],
        code: "keel tui",
      },
      {
        title: "Step 4 — Take the tour: nine menus",
        body: [
          "Press m to open the menu. Everything keel does lives behind these nine entries — the guides that follow walk through the ones you'll use first: Rules, Compliance, and Data.",
        ],
        shot: "/get-started/tui-menu.png",
        shotCaption:
          "The console menu (m): Dashboard, Profile, Trading, Rules, Compliance, Data, Research, Account, Help. Number keys jump; q or Esc returns to the dashboard.",
      },
      {
        title: "Step 5 — Read the dashboard",
        body: [
          "Back on the dashboard (Esc), read it top to bottom: the deployment profile and mode, the kill-switch state, autonomy, drawdown ceilings, rail 17's attestation state, cash, positions, rules, and data freshness for every allowlisted product.",
          "The footer is your keyboard map: h help, i insights, r refresh, a autonomy, f fetch — and s/p/d/v/m switch overlays. Press ? anywhere for the current screen's help.",
        ],
      },
      {
        title: "Next",
        body: [
          "With the console running, continue to Your first simulation — it makes the dashboard's numbers real.",
        ],
      },
    ],
  },
  {
    slug: "first-simulation",
    title: "2 · Your first simulation",
    description:
      "Fetch candle history and run keel simulate — the honest GO-LIVE / TRAIN-MORE report, and how to read it.",
    intro:
      "A simulation replays the real rules, deterministically, over real history — and then tells you the truth about them. This guide fetches data, runs the report, and teaches you how to read the one word that matters.",
    steps: [
      {
        title: "Step 1 — Get a read-only market-data key",
        body: [
          "Candle history is fetched through Coinbase's authenticated client, so keel fetch needs a free Coinbase Developer Platform (CDP) key with read-only permissions — market data only, no trading scope.",
          "Put the key and secret in .env in your working directory (copy .env.example if you came from the source path). Without a key, keel fetch fails with an AuthenticationError — that is by design, not a bug.",
        ],
      },
      {
        title: "Step 2 — Warm the candle cache",
        body: [
          "From the console, press f (or open the Data menu, entry 6) and run fetch — or from the terminal:",
        ],
        code: "keel fetch",
        shot: "/get-started/tui-data.png",
        shotCaption: "The Data menu: fetch warms the candle cache for every allowlisted product; freshness, gap repair, and db import live here too.",
      },
      {
        title: "Step 3 — Run the simulation",
        body: [
          "One command replays every seeded rule family over the fetched history and compares each against a simple DCA benchmark:",
        ],
        code: "keel simulate --years 1 --skip-within-cap",
      },
      {
        title: "Step 4 — Read the report honestly",
        body: [
          "The report ends with GO-LIVE or TRAIN-MORE, naming every gate and its numbers: performance floors, the 100-trade sample floor, the overfitting check.",
          "On the default rules it will very likely say TRAIN-MORE. That is the engine working, not broken: keel refuses to flatter a backtest, and no shipped rule family is net positive at the taker fee actually paid. The honesty is the feature.",
        ],
      },
      {
        title: "Step 5 — Watch the distance to the gate",
        body: [
          "The console's insights view (i) reports read-only promotion-gate distance: how far each rule is from the floors it must clear. Use it to see whether a rule is weeks or years from eligibility.",
        ],
        shot: "/get-started/tui-insights.png",
        shotCaption: "Insights (i): promotion-gate distance and reporting, read-only.",
      },
      {
        title: "Next",
        body: [
          "Rules that clear their gates move from candidate to paper — the subject of the next guide.",
        ],
      },
    ],
  },
  {
    slug: "paper-profile",
    title: "3 · The paper profile",
    description:
      "Running the agent with pretend money: confirm prompts, the kill-switch, and what the rails stop.",
    intro:
      "The paper profile runs the full agent loop — signals, rails, orders — with pretend cash and no venue. It is the dress rehearsal: same machinery, zero stakes.",
    steps: [
      {
        title: "Step 1 — Understand profiles",
        body: [
          "A profile is a config.yaml + database pair. keel init gave you the dev/paper profile. The console's Profile menu (2) switches between discovered profiles — daily paper, live, paper-hourly — and LIVE always asks first. Profiles share nothing: separate databases, separate accounts.",
        ],
      },
      {
        title: "Step 2 — Start the agent in paper mode",
        body: [
          "From the terminal:",
        ],
        code: "keel agent",
        shot: "/get-started/tui-rules.png",
        shotCaption:
          "The Rules console (4): the lifecycle ledger — every rule with the stage it has reached. candidate → paper → live is the only road to live trading.",
      },
      {
        title: "Step 3 — Confirm every order",
        body: [
          "By default the agent previews each order and asks you at the terminal. Running headless, with no one to ask, it declines. keel autonomy on changes who is asked — never what is allowed. For the paper profile, answering prompts is the point: watch what the rails veto and why.",
        ],
      },
      {
        title: "Step 4 — The kill-switch fails closed",
        body: [
          "To stop everything: keel kill — from the terminal or the console's Trading menu. It halts trading immediately and stays engaged until you explicitly resume (keel resume asks first, deliberately). A brand-new install starts with the kill-switch ENGAGED; you saw it on the dashboard.",
        ],
      },
      {
        title: "Next",
        body: [
          "Before any live profile, the compliance work of the final guide is mandatory — the rails refuse to trade without it.",
        ],
      },
    ],
  },
  {
    slug: "compliance-attest",
    title: "4 · Attestations before anything is live",
    description:
      "The compliance menu in practice: screening, asset attestations, the venue subscription, and withdrawal capability.",
    intro:
      "keel never derives a Shariah classification from market data — you record rulings, with sources, and the engine enforces them. This guide walks the Compliance menu: the work that makes a live profile possible.",
    steps: [
      {
        title: "Step 1 — Open the Compliance menu",
        body: [
          "In the console, press m and choose Compliance (5). Everything compliance-shaped lives here — and all of it links back to a source you supply.",
        ],
        shot: "/get-started/tui-compliance.png",
        shotCaption:
          "The Compliance menu: screen, propose, attest, exemptions, subscription, purification.",
      },
      {
        title: "Step 2 — Screen the allowlist",
        body: [
          "screen shows every allowlisted product's admission verdict. Market facts are computed; Shariah classifications are attested, never inferred — an asset without an attestation is rejected, not passed by default.",
        ],
      },
      {
        title: "Step 3 — Record an asset attestation",
        body: [
          "From the terminal (or the menu's attest entry), record a classification with a source and your name:",
        ],
        code: "keel assets attest",
      },
      {
        title: "Step 4 — Attest the venue subscription (rail 14)",
        body: [
          "Rail 14 refuses live BUYs until the operator attests the venue's subscription — the monthly allowance actually spent. keel subscription shows and records it.",
        ],
        code: "keel subscription",
      },
      {
        title: "Step 5 — Attest withdrawal capability (rail 17)",
        body: [
          "Rail 17 encodes qabd (§65.4): an asset that cannot be withdrawn may not have been validly possessed. keel withdrawals records withdrawal-capability attestations per product.",
        ],
        code: "keel withdrawals",
      },
      {
        title: "Step 6 — Purification, honestly",
        body: [
          "keel purification reports non-compliant income owed to charity (KB §65.9) from what actually ran through the engine. Account-level duties no rail can see — disabling USDC rewards on idle balances, chiefly — stay on the operator's checklist, in the operator runbook.",
        ],
      },
      {
        title: "Where this leads",
        body: [
          "With attestations recorded, a rule promoted through its gates, and the go-live runbook followed, the supervised first live order is the same confirm prompt you practiced in paper — with real consequences. Read the go-live runbook before that day.",
        ],
      },
    ],
  },
];

export const guideBySlug = (slug: string) => guides.find((guide) => guide.slug === slug);
