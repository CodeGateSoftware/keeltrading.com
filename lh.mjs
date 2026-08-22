import puppeteer from "puppeteer-core";
import { spawnSync } from "node:child_process";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  defaultViewport: null,
  args: ["--remote-debugging-port=9222"],
});
const pages = ["/en/", "/en/compare/", "/en/news/", "/ar/"];
for (const p of pages) {
  const r = spawnSync("npx", ["lighthouse", `https://keeltrading.com${p}`, "--port=9222", "--quiet", "--chrome-flags=--headless=new", "--only-categories=performance,accessibility,best-practices,seo", "--output=json", "--output-path=stdout"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  try {
    const report = JSON.parse(r.stdout);
    const cats = Object.fromEntries(Object.entries(report.categories).map(([k, v]) => [k, Math.round(v.score * 100)]));
    const metrics = report.audits;
    console.log(p, JSON.stringify({ ...cats, LCP: metrics["largest-contentful-paint"]?.displayValue, CLS: metrics["cumulative-layout-shift"]?.displayValue }));
  } catch {
    console.log(p, "PARSE-FAIL", (r.stdout || r.stderr || "").slice(0, 200));
  }
}
await browser.close();
