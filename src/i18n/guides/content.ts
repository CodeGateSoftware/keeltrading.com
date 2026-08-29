/**
 * Get Started guides — editorial, site-authored newbie walkthroughs (EN for
 * now, like the engine documents themselves). Every command, page and button
 * below was verified against keel v0.12.2: the screenshots in
 * public/get-started/ were captured by scripts/render-webui-shots.mjs from a
 * real `keel serve` console on a fresh paper working directory — the curses
 * TUI these guides used to teach was deleted from the engine before v0.12.2
 * (keel#541), and the web console replaced it.
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
      "From a fresh download to the web console in your browser: scaffold a working directory and take the tour.",
    intro:
      "This guide starts from nothing and ends with the keel console open in your browser. Everything here is read-only and paper-side — no funds, no keys, nothing can trade. Ten minutes, four commands.",
    steps: [
      {
        title: "Step 1 — Install keel",
        body: [
          "Follow the Download page for your platform: grab the wheels from the latest GitHub release, create a virtual environment, and install the keel_trader wheel by path. (No terminal ceremony wanted? The engine's installer does the same from the published wheels: curl -fsSL https://raw.githubusercontent.com/CodeGateSoftware/keel/main/scripts/install.sh | bash — auditable line by line before you run it. This guide keeps the manual path so you see every piece.)",
          "Then verify the whole install — every keel distribution must report the same version:",
        ],
        code: "keel versions",
      },
      {
        title: "Step 2 — Scaffold a working directory",
        body: [
          "keel keeps everything — config, database, logs — in one working directory. Create a fresh folder and write the two pieces with the commands that name exactly what each one writes. (keel init runs these same two back to back, but its seeding step resolves the database through keel's state-root rules, which cannot see a folder that has no config.yaml yet — as two commands in this order, the second sees the config the first wrote, and the database lands in your folder.)",
        ],
        code: "mkdir keel-paper && cd keel-paper\nkeel init-config\nkeel rules seed",
        shot: "/get-started/webui-setup.png",
        shotCaption:
          "The console's Setup page after the scaffold (yours will show your folder's paths): config file, database and the 32-rule library done; a market-data credential and everything judgement-shaped still outstanding. Paper places nothing.",
      },
      {
        title: "What the scaffold created",
        body: [
          "config.yaml — the deployment's settings, written in the dev/paper profile. Review the allowlist, caps, and auto_trade sections before anything else.",
          "keel.db — the local SQLite database (rules, trials, orders). logs/ — what the engine did and why.",
          "keel rules seed also populates the rule registry: 32 rule-product candidates — four rule families (pullback_continuation, rsi_meanrev, dca, turtle_breakout) across the default eight-product allowlist — all in candidate status. Nothing is live; nothing trades.",
        ],
      },
      {
        title: "Step 3 — Open the web console",
        body: [
          "The console is a small web page the engine itself serves, bound to your machine's loopback address only:",
        ],
        code: "keel serve",
      },
      {
        title: "Step 4 — Take the tour: seven views",
        body: [
          "keel serve prints a URL carrying a one-time token for this run, opens your browser, and from there everything lives behind the header's seven views. Status (the page you land on) answers \"is it alive\"; Setup is the checklist of what this deployment still needs; Activity, Insights, Rules and Venues report what keel did and found; Gates lists every capability-increasing action and what gates it. The eighth header entry, Docs, links out to the documentation you are reading.",
        ],
        shot: "/get-started/webui-status.png",
        shotCaption:
          "The console's Status view with the seven-view header: Status, Setup, Activity, Insights, Rules, Venues, Gates. The paper badge (top right) is the deployment's mode; the footer says it is served from this machine only.",
      },
      {
        title: "Step 5 — Read the dashboard",
        body: [
          "Read the Status page top to bottom: the mode and kill-switch state (ENGAGED on a fresh install), autonomy, rail 11's drawdown breaker; the equity card — high-water mark, paper cash, drawdown against its ceilings; rail 17's withdrawal attestation; the market session. Below the cards, three tables: open positions, rule counts (candidate=32), and data freshness — \"No market data yet\", which the next guide fixes.",
          "The page re-reads itself every fifteen seconds, so the figures move without you reloading. The theme toggle in the header is yours; the mode badge is the config's, and no page in this console can change it — that is a terminal action by design.",
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
          "Give it to keel from the terminal — it prompts with the echo off and stores the pair in your operating system's keychain, not in a file, and never on the command line where shell history could keep it:",
        ],
        code: "keel credentials set CDP_API_KEY",
        shot: "/get-started/webui-fetch.png",
        shotCaption:
          "The Setup page's paper-stage checklist, scrolled to the two steps this guide touches: the credential step's Save a market-data credential form (key and secret, straight into the OS keychain), and the Market data step below it.",
      },
      {
        title: "Step 2 — Warm the candle cache",
        body: [
          "On the console's Setup page, the Market data step has a Fetch market data button — it runs the fetch as a background job and the page shows its progress. Or run it from the terminal:",
        ],
        code: "keel fetch",
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
          "The console's Insights view reports read-only promotion-gate distance: how far each rule is from the floors it must clear. On a fresh deployment its gate-distance table says so plainly — no rule has the 20 trades the sample floor needs — which is exactly the report's TRAIN-MORE, one click away, re-read every fifteen seconds.",
        ],
        shot: "/get-started/webui-insights.png",
        shotCaption:
          "The Insights view: the account card with its drawdown ceilings, promotion-gate distance, and the journal — read-only reporting.",
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
          "A profile is a config.yaml + database pair, one folder, sharing nothing: separate databases, separate accounts. The folder you are in is the deployment keel operates — the console's Setup page names the config and database files it resolved, and the mode badge in the header says what that config declares. Switching profiles is changing folder, not clicking: mode is a config edit plus a terminal action, and LIVE always asks first. The console displays the mode; it cannot change it.",
        ],
      },
      {
        title: "Step 2 — Start the agent in paper mode",
        body: [
          "From the terminal, in the deployment folder:",
        ],
        code: "keel agent",
        shot: "/get-started/webui-rules.png",
        shotCaption:
          "The console's Rules view — the lifecycle ledger. While the agent runs, every rule is still a candidate and the live-rules table is empty: candidate → paper → live is the only road to live trading.",
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
          "To stop everything: keel kill — always allowed, from any terminal. It halts trading immediately and stays engaged until you explicitly resume (keel resume asks first, deliberately). A brand-new install starts with the kill-switch ENGAGED — you saw it on the Status page, and your agent's first cycle on a fresh deployment says it too, logging skipped: kill_switch. The console's Gates view names keel resume for what it is — a capability-increasing action behind the terminal gate.",
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
      "The Setup checklist's live stage in practice: screening, asset attestations, the venue subscription, and withdrawal capability.",
    intro:
      "keel never derives a Shariah classification from market data — you record rulings, with sources, and the engine enforces them. This guide walks the \"To go live\" stage of the console's Setup checklist and the Gates view behind it: the work that makes a live profile possible.",
    steps: [
      {
        title: "Step 1 — Where the compliance work lives",
        body: [
          "The console's Setup page ends in a stage headed To go live — every attestation the rails refuse to trade without, each with its state and the command that records it. The Gates view is the other half of the picture: every action that increases what keel can do without asking again, and the interactive-terminal gate each one passes through. The view states it plainly: it cannot perform any of them.",
        ],
        shot: "/get-started/webui-gates.png",
        shotCaption:
          "The Gates view: keel autonomy on, keel resume, keel withdrawals attest --enabled and friends — each with what it increases, and the terminal gate (a typed yes at an interactive TTY) it must pass.",
      },
      {
        title: "Step 2 — Screen and attest the allowlist",
        body: [
          "The Setup checklist's step \"Every allowlisted asset screened and attested\" is judgement-shaped, and the page says what that means: keel can record your ruling; it must never choose it for you. Market facts are computed; Shariah classifications are attested, never inferred — an asset without an attestation is unknown, not fine, and the step's detail reads \"unattested: ADA, BTC, …\" until you clear it.",
          "The step's own form — Record this attestation — asks for exactly the ruling: asset code, sector, backing ('ayn, dayn, or native), whether holding it earns a return, a source, and your name. Nothing is pre-filled or defaulted; an attestation without a cited source is refused like a missing one. The same action at the terminal:",
        ],
        code: "keel assets attest --asset X --sector ... --backing ... --source ...",
      },
      {
        title: "Step 3 — Attest the venue subscription (rail 14)",
        body: [
          "Rail 14 refuses live BUYs until the operator attests the venue's subscription — the monthly allowance actually spent. What you pay the venue is a fact only you have; keel cannot read your billing. This one stays at the terminal — the checklist itself prints the command — and keel subscription show reads it back:",
        ],
        code: "keel subscription attest --venue ... --tier ...",
      },
      {
        title: "Step 4 — Attest withdrawal capability (rail 17)",
        body: [
          "Rail 17 encodes qabd (§65.4): an asset that cannot be withdrawn may not have been validly possessed. keel withdrawals attest records withdrawal-capability attestations per product — the attestation carries a 7-day TTL and needs an interactive terminal, as both the checklist and the Gates view say outright.",
        ],
        code: "keel withdrawals attest --enabled",
      },
      {
        title: "Step 5 — Purification, honestly",
        body: [
          "keel purification reports non-compliant income owed to charity (KB §65.9) from what actually ran through the engine. Account-level duties no rail can see — disabling USDC rewards on idle balances, chiefly — appear in the checklist as the venue-interest step, and keel will never show that one as done: the venue's API does not expose enrolment, and a green check that verifies nothing turns an open risk into a false assurance. It stays on the operator's checklist, in the operator runbook.",
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
