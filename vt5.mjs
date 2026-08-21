import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", defaultViewport: null });
const page = await browser.newPage();
let allOk = true;
for (const loc of ["en", "ar", "fr"]) {
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(`http://localhost:4321/${loc}/compare/`, { waitUntil: "networkidle0" });
  const m = await page.evaluate(() => {
    const desc = document.querySelector('meta[name="description"]').content;
    const rows = [...document.querySelectorAll(".compare-table tbody tr")];
    return {
      intro: document.querySelectorAll(".hero .lede").length,
      descHasOctoBot: desc.includes("OctoBot"),
      footnoteHasOctoBot: document.querySelector(".doc-meta").textContent.includes("OctoBot"),
      rows: rows.length, perCard: [...new Set(rows.map(tr => tr.querySelectorAll("td").length))],
      h2count: [...document.querySelectorAll(".narrow h2")].length,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  const ok = m.rows === 9 && m.perCard[0] === 5 && m.intro === 2 && m.descHasOctoBot && m.footnoteHasOctoBot && m.h2count === 5 && m.overflow === 0;
  allOk = allOk && ok;
  console.log(loc, ok ? "OK" : "FAIL", JSON.stringify(m));
}
await browser.close();
process.exit(allOk ? 0 : 1);
