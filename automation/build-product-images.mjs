// Pre-renders every non-Amazon product photo to static WebP files in public/img/p/ so next/image serves them
// directly instead of calling Vercel's image optimizer (billed per transformation, capped on the Hobby plan).
//
// Run after adding a Pick with a new manufacturer photo:   node automation/build-product-images.mjs
// Then commit public/img/p/ and src/lib/product-image-manifest.json. A photo missing from the manifest still works:
// src/lib/image-loader.ts falls back to the normal /_next/image optimizer for it.
//
// Skipped on purpose: hosts in OPTIMIZER_BLOCKED_HOSTS (src/lib/images.ts). Amazon listing photos must not be stored
// or modified (Associates rules) and hakkousa.com refuses proxying; both render `unoptimized` straight from the source.
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT_DIR = join(ROOT, "public", "img", "p");
const MANIFEST = join(ROOT, "src", "lib", "product-image-manifest.json");
const WIDTHS = [256, 384, 640, 828, 1200];
const QUALITY = 75;

const imagesTs = readFileSync(join(ROOT, "src", "lib", "images.ts"), "utf8");
const blockedBlock = imagesTs.match(/OPTIMIZER_BLOCKED_HOSTS = new Set\(\[([\s\S]*?)\]\)/)?.[1] ?? "";
const BLOCKED = new Set([...blockedBlock.matchAll(/"([^"]+)"/g)].map((m) => m[1]));
if (!BLOCKED.has("m.media-amazon.com")) throw new Error("Could not read OPTIMIZER_BLOCKED_HOSTS from src/lib/images.ts");

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|json)$/.test(name) && !p.endsWith("product-image-manifest.json")) out.push(p);
  }
  return out;
}

const urls = new Set();
for (const file of walk(join(ROOT, "src"))) {
  for (const m of readFileSync(file, "utf8").matchAll(/image:\s*"(https:\/\/[^"]+)"/g)) {
    if (!BLOCKED.has(new URL(m[1]).hostname)) urls.add(m[1]);
  }
}

export const hashOf = (src) => createHash("sha1").update(src).digest("hex").slice(0, 12);

mkdirSync(OUT_DIR, { recursive: true });
const manifest = {};
let failed = 0;
for (const src of [...urls].sort()) {
  const h = hashOf(src);
  try {
    const res = await fetch(src, { headers: { "User-Agent": "Mozilla/5.0 (OhmSavvy image prerender)" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const input = Buffer.from(await res.arrayBuffer());
    const { width: original } = await sharp(input).metadata();
    const widths = WIDTHS.filter((w) => w <= original);
    if (!widths.length) widths.push(original);
    for (const w of widths) {
      const file = join(OUT_DIR, `${h}-${w}.webp`);
      if (!existsSync(file)) await sharp(input).resize({ width: w }).webp({ quality: QUALITY }).toFile(file);
    }
    manifest[src] = { h, w: widths };
    console.log("ok  ", widths.join(","), src);
  } catch (err) {
    failed++;
    console.log("FAIL", err.message, src, "(stays on the /_next/image fallback)");
  }
}
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n${Object.keys(manifest).length} photos pre-rendered, ${failed} failed, manifest: src/lib/product-image-manifest.json`);
