// Submits every page on the site to Bing's IndexNow endpoint so new and
// changed pages get picked up near-instantly instead of waiting for a crawl.
// Wired as the npm "postbuild" script, so it runs automatically on every
// production deploy (Vercel runs `npm run build`, which runs `postbuild`
// right after). Guarded to only actually submit on a real Vercel production
// build — NOT on the isolated/local verification builds used throughout this
// project's workflow, which would otherwise spam IndexNow on every check.
import { execFileSync } from "node:child_process";
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

// Only the pages this deploy changed (page files under src/app since the previous production deploy), plus the
// homepage. Re-sending all ~600 URLs on every deploy made Bing and partners re-crawl the whole site each time
// (Vercel usage review, 2026-11-10). If the previous commit isn't available, fall back to every route.
function changedRoutes(all) {
  const prev = process.env.VERCEL_GIT_PREVIOUS_SHA;
  if (!prev) return null;
  let files;
  try {
    files = execFileSync("git", ["diff", "--name-only", prev, "HEAD", "--", "src/app"], { encoding: "utf8" }).split(/\r?\n/);
  } catch {
    return null;
  }
  const known = new Set(all);
  const changed = new Set(["/"]);
  for (const file of files) {
    const m = file.match(/^src\/app\/(.+)\/page\.tsx$/);
    if (m && !m[1].includes("[") && known.has(`/${m[1]}`)) changed.add(`/${m[1]}`);
  }
  return [...changed];
}

async function main() {
  if (process.env.VERCEL_ENV !== "production") {
    console.log("Skipping IndexNow submission (not a production Vercel build).");
    return;
  }

  const all = extractRoutes();
  const routes = changedRoutes(all) ?? all;
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
