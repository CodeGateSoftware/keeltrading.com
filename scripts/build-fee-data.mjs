#!/usr/bin/env node
/**
 * #136 — Fee Reality experiment data builder.
 *
 * Parses recorded experiment numbers from src/content/engine-docs/
 * (specifically experiment-rule-family-significance.md) and updates
 * data/fee-reality-experiments.json at build time.
 *
 * Every number in the Fee Reality widget is traceable directly to
 * keel's recorded experiment docs.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const docFile = join(root, "src/content/engine-docs/experiment-rule-family-significance.md");
const outFile = join(root, "data/fee-reality-experiments.json");

let currentData = null;
if (existsSync(outFile)) {
  try {
    currentData = JSON.parse(readFileSync(outFile, "utf8"));
  } catch (err) {
    // fallback
  }
}

if (!existsSync(docFile)) {
  console.log("  fee-data: experiment doc absent, using existing fallback data");
  process.exit(0);
}

try {
  const content = readFileSync(docFile, "utf8");
  const lines = content.split("\n");
  const families = currentData?.families || {};

  for (const line of lines) {
    if (!line.startsWith("|")) continue;
    const parts = line.split("|").map((p) => p.trim());
    if (parts.length < 12) continue;

    const familyKey = parts[1];
    const regime = parts[2];
    const n = parseInt(parts[3].replace(/,/g, ""), 10);
    const nEff = parseFloat(parts[4].replace(/,/g, ""));
    const payoff = parseFloat(parts[5]);
    const breakEven = parseFloat(parts[6]);
    const winRate = parseFloat(parts[7]);
    const edge = parseFloat(parts[8].replace(/\*\*/g, "").replace(/−/g, "-"));

    if (!families[familyKey]) continue;

    const targetKey = regime.includes("outside") ? "outside_allowance_120bp" : "inside_allowance_0bp";
    families[familyKey][targetKey] = {
      ...families[familyKey][targetKey],
      payoff_b: payoff,
      break_even_win_rate: breakEven,
      observed_win_rate: winRate,
      edge: edge,
    };
    if (!isNaN(n)) families[familyKey].n_pooled = n;
    if (!isNaN(nEff)) families[familyKey].n_eff = nEff;
  }

  const output = {
    updatedAt: new Date().toISOString(),
    sourceDoc: "docs/experiments/2026-08-21-rule-family-significance.md",
    sourceUrl: "https://github.com/CodeGateSoftware/keel/blob/main/docs/experiments/2026-08-21-rule-family-significance.md",
    families,
  };

  writeFileSync(outFile, JSON.stringify(output, null, 2) + "\n");
  console.log("  wrote data/fee-reality-experiments.json (synced from experiment docs)");
} catch (err) {
  console.warn("  fee-data warning:", err.message, "— retaining fallback data");
}
