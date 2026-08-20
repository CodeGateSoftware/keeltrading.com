#!/usr/bin/env node
/**
 * One-time OG image generation (npm run og) — renders the brand SVG to a
 * 1200x630 PNG via sharp (already an Astro dependency). The output is
 * committed; re-run only if the brand art changes.
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f8f7f3"/>
  <rect x="0" y="560" width="1200" height="70" fill="#0c5d52"/>
  <g transform="translate(88,96)" fill="none" stroke="#0c5d52" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">
    <path d="M44 0v96M44 0L16 34M44 0l28 34M44 96c-30 0-48 13-57 40h114c-9-27-27-40-57-40Z"/>
  </g>
  <text x="200" y="168" font-family="-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="92" font-weight="700" fill="#1d2833">keel</text>
  <text x="88" y="300" font-family="-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="46" font-weight="600" fill="#1d2833">The auditable, open-source Shariah-compliance</text>
  <text x="88" y="362" font-family="-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="46" font-weight="600" fill="#1d2833">engine for spot crypto trading.</text>
  <text x="88" y="448" font-family="-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="34" fill="#4b5b69">Attested screening that fails closed. Rails no order can skip.</text>
  <text x="88" y="498" font-family="-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="34" fill="#4b5b69">Not a fatwa engine — an enforcement engine for a ruling you supply.</text>
  <text x="88" y="606" font-family="-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="30" font-weight="600" fill="#f8f7f3">keeltrading.com</text>
  <text x="1112" y="606" text-anchor="end" font-family="-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="26" fill="#f8f7f3">github.com/CodeGateSoftware/keel</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
await writeFile(join(root, "public/og.png"), png);
console.log("  wrote public/og.png (1200x630)");
