#!/usr/bin/env node
/**
 * Render captured TUI screens (tmux capture-pane -e ANSI output) into PNG
 * "terminal screenshots" for the Get Started guides: ANSI → HTML → PNG via
 * the system Chrome (puppeteer-core), styled as a dark terminal window.
 *
 *   node scripts/render-tui-shots.mjs <input.ansi> <output.png> [title]
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import puppeteer from "puppeteer-core";

const [input, output, title = "keel tui"] = process.argv.slice(2);
if (!input || !output) {
  console.error("usage: render-tui-shots.mjs <input.ansi> <output.png> [title]");
  process.exit(1);
}

/** Minimal ANSI SGR → <span style> converter (colors, bold, dim, reverse). */
const COLORS = {
  30: "#5c6370", 31: "#e06c75", 32: "#98c379", 33: "#e5c07b",
  34: "#61afef", 35: "#c678dd", 36: "#56b6c2", 37: "#abb2bf",
  90: "#5c6370", 91: "#e06c75", 92: "#98c379", 93: "#e5c07b",
  94: "#61afef", 95: "#c678dd", 96: "#56b6c2", 97: "#ffffff",
};
const BG = {
  40: "#282c34", 41: "#e06c75", 42: "#98c379", 43: "#e5c07b",
  44: "#61afef", 45: "#c678dd", 46: "#56b6c2", 47: "#abb2bf",
  100: "#5c6370", 101: "#e06c75", 102: "#98c379", 103: "#e5c07b",
  104: "#61afef", 105: "#c678dd", 106: "#56b6c2", 107: "#ffffff",
};

function ansiToHtml(ansi) {
  let fg = null;
  let bg = null;
  let bold = false;
  let dim = false;
  let reverse = false;
  let html = "";
  const openSpan = () => {
    const styles = [];
    if (bold) styles.push("font-weight:700");
    if (dim) styles.push("opacity:.6");
    let color = fg ?? "#abb2bf";
    let background = bg ?? "transparent";
    if (reverse) [color, background] = [background === "transparent" ? "#282c34" : background, color === "#abb2bf" ? "#abb2bf" : color];
    styles.push(`color:${color}`);
    if (background !== "transparent") styles.push(`background:${background}`);
    html += `<span style="${styles.join(";")}">`;
  };
  const closeSpan = () => { html += "</span>"; };

  let i = 0;
  let spanOpen = false;
  const text = ansi
    .replaceAll("\u001b[?25l", "")
    .replaceAll("\u001b[?25h", "")
    .replaceAll("\u001b[2J", "")
    .replaceAll("\r", "");
  while (i < text.length) {
    if (text.startsWith("\u001b[", i)) {
      const m = /^\u001b\[([0-9;]*)m/.exec(text.slice(i));
      if (m) {
        if (spanOpen) { closeSpan(); spanOpen = false; }
        const params = m[1] === "" ? ["0"] : m[1].split(";");
        for (const p of params) {
          const n = Number(p);
          if (n === 0) { fg = null; bg = null; bold = dim = reverse = false; }
          else if (n === 1) bold = true;
          else if (n === 2) dim = true;
          else if (n === 7) reverse = true;
          else if (n === 22) { bold = dim = false; }
          else if (n === 27) reverse = false;
          else if (COLORS[n]) fg = COLORS[n];
          else if (BG[n]) bg = BG[n];
          else if (n === 39) fg = null;
          else if (n === 49) bg = null;
        }
        i += m[0].length;
        continue;
      }
      // other escapes: skip to final byte letter
      const m2 = /^\u001b\[[0-9;?]*[A-Za-z]/.exec(text.slice(i));
      if (m2) { i += m2[0].length; continue; }
    }
    // open a span lazily before any text
    if (!spanOpen) { openSpan(); spanOpen = true; }
    const next = text.indexOf("\u001b", i);
    const stop = next === -1 ? text.length : next;
    html += text.slice(i, stop).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    i = stop;
    if (spanOpen) { closeSpan(); spanOpen = false; }
  }
  if (spanOpen) closeSpan();
  return html;
}

const ansi = await readFile(input, "utf8");
const body = ansiToHtml(ansi)
  .split("\n")
  .map((line) => `<div class="line">${line || "&nbsp;"}</div>`)
  .join("\n");

const pageHtml = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: transparent; font-family: "SF Mono", Menlo, Monaco, "Cascadia Mono", monospace; }
  .term {
    background: #1e2127;
    border: 1px solid #3a3f4b;
    border-radius: 12px;
    padding: 10px 14px 14px;
    width: max-content;
  }
  .bar {
    display: flex; gap: 7px; align-items: center;
    padding-bottom: 9px; margin-bottom: 9px;
    border-bottom: 1px solid #3a3f4b;
  }
  .dot { width: 11px; height: 11px; border-radius: 50%; }
  .r { background: #ff5f57; } .y { background: #febc2e; } .g { background: #28c840; }
  .title { color: #5c6370; font-size: 12px; margin-inline-start: 8px; }
  .screen { font-size: 15px; line-height: 1.42; white-space: pre; color: #abb2bf; }
  .line { min-height: 1em; }
</style></head><body>
  <div class="term" id="shot">
    <div class="bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><span class="title">${title} — zsh</span></div>
    <div class="screen">${body}</div>
  </div>
</body></html>`;

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
});
const page = await browser.newPage();
await page.setContent(pageHtml, { waitUntil: "domcontentloaded" });
await page.setViewport({ width: 1400, height: 1600, deviceScaleFactor: 2 });
await new Promise((r) => setTimeout(r, 150));
const el = await page.$("#shot");
await mkdir(dirname(output), { recursive: true });
await el.screenshot({ path: output });
await browser.close();
console.log(`rendered ${output}`);
