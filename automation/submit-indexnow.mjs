// Submits every page on the site to Bing's IndexNow endpoint so new and
// changed pages get picked up near-instantly instead of waiting for a crawl.
// Wired as the npm "postbuild" script, so it runs automatically on every
// production deploy (Vercel runs `npm run build`, which runs `postbuild`
// right after). Guarded to only actually submit on a real Vercel production
// build — NOT on the isolated/local verification builds used throughout this
// project's workflow, which would otherwise spam IndexNow on every check.
import { readFileSync } from "node:fs";

const HOST = "ohmsavvy.com";
const SITE = `https://${HOST}`;
// Public by design: IndexNow verifies ownership via a world-readable
// <key>.txt file at the site root, so the key itself isn't a secret.
const KEY = "3d330f5428ae4ab690c3ef13361d9cec";
const KEY_LOCATION = `${SITE}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

function extractRoutes() {
  const sitemapSrc = readFileSync("src/app/sitemap.ts", "utf8");
  const contentSrc = readFileSync("src/lib/content.ts", "utf8");

  const staticPagesBlock = sitemapSrc.match(/const staticPages = \[([\s\S]*?)\];/)?.[1] ?? "";
  const staticRoutes = [...staticPagesBlock.matchAll(/"([^"]*)"/g)].map((m) => m[1]);

  const registryRoutes = [...contentSrc.matchAll(/href:\s*"(\/[^"]+)"/g)].map((m) => m[1]);

  const routes = new Set([...staticRoutes, ...registryRoutes].map((r) => (r === "" ? "/" : r)));
  return [...routes];
}

async function main() {
  if (process.env.VERCEL_ENV !== "production") {
    console.log("Skipping IndexNow submission (not a production Vercel build).");
    return;
  }

  const routes = extractRoutes();
  const urlList = routes.map((r) => `${SITE}${r}`);

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  if (res.ok) {
    console.log(`IndexNow: submitted ${urlList.length} URLs (status ${res.status}).`);
  } else {
    // Non-fatal: a failed IndexNow submission should never fail the deploy.
    console.warn(`IndexNow: submission failed with status ${res.status}: ${await res.text().catch(() => "")}`);
  }
}

main().catch((err) => {
  console.warn("IndexNow: submission errored (non-fatal):", err.message);
});
