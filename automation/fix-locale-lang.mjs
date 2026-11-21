// Sets <html lang> on the translated pages of a static export. The root layout
// (src/app/layout.tsx) owns <html> and can't see the [locale] segment, so every
// page is exported as lang="en"; this rewrites out/de.html, out/de/**.html etc.
// to their own language after the build. The root <html> has
// suppressHydrationWarning, so React accepts the changed attribute.
//   node automation/fix-locale-lang.mjs [outDir]
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(process.argv[2] || join(REPO, "out"));
const i18n = readFileSync(join(REPO, "src/lib/i18n.ts"), "utf8");
const locales = JSON.parse(i18n.match(/LOCALES\s*=\s*(\[[^\]]*\])/)[1]);

const htmlFiles = (dir) =>
  existsSync(dir) ? readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? htmlFiles(join(dir, f)) : f.endsWith(".html") ? [join(dir, f)] : [])) : [];

let changed = 0;
for (const locale of locales) {
  for (const file of [join(out, `${locale}.html`), ...htmlFiles(join(out, locale))]) {
    if (!existsSync(file)) continue;
    const html = readFileSync(file, "utf8");
    const next = html.replace(/<html lang="en"/, `<html lang="${locale}"`);
    if (next !== html) { writeFileSync(file, next); changed++; }
  }
}
console.log(`fix-locale-lang: set <html lang> on ${changed} translated page(s) in ${out}`);
