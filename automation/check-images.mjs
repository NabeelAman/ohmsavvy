// Scans every page.tsx under src/app for `image: "https://..."` string literals
// and confirms each one actually renders as an <img> in a real Chromium context —
// not just that the URL returns HTTP 200. A URL can pass curl/fetch and still fail
// in-browser (e.g. ERR_BLOCKED_BY_RESPONSE.NotSameOrigin from a host's cross-origin
// resource policy) — this is exactly how the Rigol DS1054Z image bug shipped once
// and was only caught by manual Playwright testing. This script makes that check
// permanent instead of relying on someone remembering to do it by hand.
import { chromium } from "playwright";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function findPageFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      findPageFiles(full, out);
    } else if (entry === "page.tsx") {
      out.push(full);
    }
  }
  return out;
}

const pageFiles = findPageFiles("src/app");
const urlPattern = /image:\s*"(https:\/\/[^"]+)"/g;
const urls = new Set();

for (const file of pageFiles) {
  const content = readFileSync(file, "utf8");
  for (const match of content.matchAll(urlPattern)) {
    urls.add(match[1]);
  }
}

if (urls.size === 0) {
  console.log("No image URLs found to check.");
  process.exit(0);
}

console.log(`Checking ${urls.size} image URL(s) render in a real browser context...`);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("about:blank");

const failures = [];

for (const url of urls) {
  const result = await page.evaluate(
    (u) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ ok: true, w: img.naturalWidth, h: img.naturalHeight });
        img.onerror = () => resolve({ ok: false, reason: "onerror fired" });
        img.src = u;
        setTimeout(() => resolve({ ok: false, reason: "timeout after 8s" }), 8000);
      }),
    url
  );

  if (!result.ok || result.w === 0 || result.h === 0) {
    failures.push({ url, reason: result.reason ?? "naturalWidth/Height was 0" });
    console.error(`FAIL  ${url}  (${result.reason ?? "zero dimensions"})`);
  } else {
    console.log(`OK    ${url}  (${result.w}x${result.h})`);
  }
}

await browser.close();

if (failures.length > 0) {
  console.error(`\n${failures.length} image(s) failed to render in-browser. Do not merge — ` +
    `either find a source that doesn't block cross-origin embedding, or remove the image field ` +
    `(the honest placeholder is better than a broken image).`);
  process.exit(1);
}

console.log("\nAll image URLs render correctly.");
