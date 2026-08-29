#!/usr/bin/env node
/**
 * Capture the Get Started guides' screenshots from keel's REAL web console.
 *
 * The browser counterpart of render-tui-shots.mjs: where that pipeline ran the
 * engine's `keel tui` under tmux and photographed the terminal, this one runs
 * `keel serve` (the local web UI the engine ships since the curses TUI was
 * deleted, keel#541) and photographs the pages in the system Chrome via
 * puppeteer-core. Every PNG it writes is a real screen of a real deployment —
 * a fresh paper working directory with the seeded 32 candidate rules, exactly
 * the state guide 1 leaves you in. No mocks, no composed imagery.
 *
 * What it does, end to end:
 *
 *   1. scaffolds a throwaway deployment in a temp dir — `keel init-config`
 *      followed by `keel rules seed`, which is exactly what `keel init` runs
 *      (see keel/cli.py: init = init-config + rules seed). The two commands
 *      are invoked separately because init's seed step resolves the database
 *      through the deployment-root detector, which cannot see a folder that
 *      has no config.yaml yet — run as one command in a fresh dir the seed
 *      lands on the machine's state root instead of the folder.
 *   2. launches `keel serve --no-open` on a loopback port and reads the
 *      one-time session-token URL it prints,
 *   3. drives Chrome to each guide view and screenshots the viewport.
 *
 * Re-run against a new engine release by pointing --keel-dir at a checkout of
 * the release tag (with `uv sync` done) — the guide copy is then updated to
 * match whatever the new screens actually show, never before.
 *
 *   node scripts/render-webui-shots.mjs \
 *     --keel-dir /tmp/keel-engine-r123 --port 8911
 *
 * Needs the system Chrome at the path below (the same executable
 * render-tui-shots.mjs uses).
 */
import { spawn, spawnSync } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import { mkdtempSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// -- arguments -----------------------------------------------------------------------------------

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};
const KEEL_DIR = resolve(arg("keel-dir", join(tmpdir(), "keel-engine-shots")));
const PORT = Number(arg("port", "8911"));
const OUT_DIR = resolve(arg("out", "public/get-started"));
const KEEP = args.includes("--keep"); // keep the scratch deployment for inspection

const keel = join(KEEL_DIR, ".venv", "bin", "keel");

/** Run one keel command in `cwd`, failing loudly — a screenshot pipeline that
 *  silently continues past a failed scaffold would photograph nothing honestly. */
function run(cwd, ...argv) {
  const r = spawnSync(keel, argv, { cwd, encoding: "utf8" });
  if (r.status !== 0) {
    console.error(`keel ${argv.join(" ")} failed (${r.status}):\n${r.stderr || r.stdout}`);
    process.exit(1);
  }
  return r.stdout;
}

// 1. scaffold a fresh paper deployment -----------------------------------------------------------

// mkdtemp, not a fixed name under /tmp: a predictable path in a
// world-writable directory is a symlink-attack surface (SonarCloud S5443),
// even for a local capture script. The Setup screenshot shows the path of
// the run that produced it — illustrative, not contractural.
const scratch = mkdtempSync(join(tmpdir(), "keel-paper-"));
console.log(`scaffolding deployment in ${scratch}`);
run(scratch, "init-config"); // writes config.yaml — the dev/paper template
run(scratch, "rules", "seed"); // the 32 candidate rules, nothing live

// 2. launch the web console ----------------------------------------------------------------------

console.log(`serving the web console on 127.0.0.1:${PORT}`);
const server = spawn(keel, ["serve", "--no-open", "--port", String(PORT)], {
  cwd: scratch,
  stdio: ["ignore", "pipe", "pipe"],
});

/** Resolve once `keel serve` has printed its one-time token URL. */
const tokenUrl = await new Promise((res, rej) => {
  const timeout = setTimeout(() => rej(new Error("keel serve did not print its URL")), 30_000);
  const onChunk = (buf) => {
    const m = /https?:\/\/\S+\?token=\S+/.exec(buf.toString());
    if (m) {
      clearTimeout(timeout);
      res(m[0]);
    }
  };
  server.stdout.on("data", onChunk);
  server.stderr.on("data", onChunk);
  server.on("exit", (code) => rej(new Error(`keel serve exited early (${code})`)));
});
console.log(`console up: ${tokenUrl.replace(/token=.*/, "token=…")}`);

// 3. capture -------------------------------------------------------------------------------------

/**
 * The six guide shots. `scroll` optionally names a `.card.step` by the strong
 * text on its head line, for the cards that sit below the fold on /setup —
 * the fetch shot targets the credentials card so the market-data card below
 * it (with the Fetch market data button) lands in the same viewport.
 * @type {Array<{ name: string; route: string; h1: string; scroll?: string }>}
 */
const SHOTS = [
  { name: "webui-setup", route: "/setup", h1: "Setup" },
  { name: "webui-status", route: "/status", h1: "Status" },
  { name: "webui-fetch", route: "/setup", h1: "Setup", scroll: "A market-data credential" },
  { name: "webui-insights", route: "/insights", h1: "Insights" },
  { name: "webui-rules", route: "/rules", h1: "Rules" },
  { name: "webui-gates", route: "/gates", h1: "Gates" },
];

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
const page = await browser.newPage();
// The engine's light "paper" theme, pinned rather than left to this machine's
// OS preference, so re-runs produce comparable shots. Same storage key the
// console's own theme toggle writes (js/theme.js).
await page.evaluateOnNewDocument(() => {
  localStorage.setItem("keel-theme", "light");
});
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

// The token URL exchanges the one-time token for the session cookie (303 → /).
// `networkidle0` never fires on this app: the console keeps a live event-stream
// connection open on every page, so "load" is the honest event to wait for.
await page.goto(tokenUrl, { waitUntil: "domcontentloaded" });

await mkdir(OUT_DIR, { recursive: true });
for (const shot of SHOTS) {
  await page.goto(`http://127.0.0.1:${PORT}${shot.route}`, { waitUntil: "domcontentloaded" });
  // The client fills #content from /api/* after load; h1 is the view's own title.
  await page.waitForSelector(`#content h1`);
  await page.waitForFunction(
    (title) => document.querySelector("#content h1")?.textContent === title,
    { timeout: 15_000 },
    shot.h1,
  );
  if (shot.scroll) {
    // Step cards carry no ids; find the one whose head line names the step.
    await page.evaluate((label) => {
      const card = [...document.querySelectorAll(".card.step")].find((c) =>
        c.querySelector("strong")?.textContent?.includes(label),
      );
      card?.scrollIntoView({ block: "start" });
    }, shot.scroll);
  }
  await new Promise((r) => setTimeout(r, 250)); // settle after scroll/paint
  const path = join(OUT_DIR, `${shot.name}.png`);
  await page.screenshot({ path });
  console.log(`captured ${path}`);
}

// 4. clean up ------------------------------------------------------------------------------------

await browser.close();
server.kill("SIGTERM");
if (!KEEP) {
  await rm(scratch, { recursive: true, force: true });
  console.log(`removed ${scratch}`);
} else {
  console.log(`kept deployment: ${scratch} (serve was: keel serve --port ${PORT})`);
}
