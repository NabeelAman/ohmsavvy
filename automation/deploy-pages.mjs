// Deploys the committed site (origin/main) to GitHub Pages, the way sessions
// have done it by hand since the move off Vercel (2026-11-13):
//   1. build origin/main in its own clean worktree (never the main checkout, so
//      other sessions' uncommitted work is never shipped);
//   2. copy out/ into the gh-pages worktree, keeping .git, CNAME and .nojekyll;
//   3. commit and push to gh-pages; then ping IndexNow and Search Console.
// Used by the daily article writer after it publishes. Safe to run by hand:
//   node automation/deploy-pages.mjs "reason"
// If another deploy is in progress (the gh-pages worktree has uncommitted files),
// it waits up to 60 minutes rather than mixing two deploys.
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const HOME = resolve(REPO, "..");
const BUILD = resolve(HOME, "zz-ohm-build");
const PAGES = resolve(HOME, "zz-ohm-pages");
const reason = process.argv[2] || "site update";

const run = (cmd, cwd = REPO) => execSync(cmd, { cwd, stdio: ["ignore", "pipe", "pipe"], encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }).trim();
const log = (m) => console.log(m);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

if (!existsSync(PAGES)) throw new Error(`gh-pages worktree not found at ${PAGES}`);

// 1. Wait for any manual deploy to finish.
for (let i = 0; ; i++) {
  const dirty = run("git status --porcelain", PAGES);
  if (!dirty) break;
  if (i >= 30) throw new Error("The gh-pages worktree has had uncommitted changes for 60 minutes (another deploy?). Not deploying.");
  if (i === 0) log("Another deploy seems to be in progress (gh-pages worktree has uncommitted files). Waiting…");
  await sleep(120_000);
}

// 2. Build origin/main in a clean worktree.
run("git fetch -q origin main gh-pages");
const sha = run("git rev-parse --short origin/main");
if (!existsSync(BUILD)) {
  run(`git worktree add -q --detach "${BUILD}" origin/main`);
} else {
  run("git checkout -q --force --detach origin/main", BUILD);
  run("git clean -fdq -e node_modules -e .next", BUILD);
}
// Share the main checkout's dependencies instead of installing a second copy.
if (!existsSync(resolve(BUILD, "node_modules"))) run(`cmd /c mklink /J "${resolve(BUILD, "node_modules")}" "${resolve(REPO, "node_modules")}"`);
log(`Building ${sha}…`);
run("npx next build", BUILD);
if (!existsSync(resolve(BUILD, "out", "index.html"))) throw new Error("Build produced no out/index.html.");

// 3. Copy into gh-pages and push.
run("git checkout -q --detach origin/gh-pages", PAGES);
// robocopy exit codes below 8 mean success.
try { execSync(`robocopy "${resolve(BUILD, "out")}" "${PAGES}" /MIR /XD .git /XF CNAME .nojekyll /NFL /NDL /NJH /NJS /NP`, { stdio: "ignore" }); } catch (e) {
  if (e.status >= 8) throw new Error(`robocopy failed with exit code ${e.status}`);
}
run("git add -A", PAGES);
if (!run("git status --porcelain", PAGES)) { log("Nothing changed on the live site."); process.exit(0); }
run(`git commit -q -m "Deploy ${sha}: ${reason.replace(/"/g, "'")}"`, PAGES);
try { run("git push -q origin HEAD:gh-pages", PAGES); } catch {
  run("git pull -q --rebase origin gh-pages", PAGES);
  run("git push -q origin HEAD:gh-pages", PAGES);
}
log(`Deployed ${sha} to GitHub Pages (${reason}).`);

// 4. Tell search engines (same as the build's postbuild step).
for (const s of ["automation/submit-indexnow.mjs", "automation/submit-gsc-sitemap.mjs"]) {
  try { log(run(`node ${s}`)); } catch (e) { log(`${s} failed: ${String(e.message).slice(0, 200)}`); }
}
