// Local "writer service": lets the local n8n (in Docker) drive the article tool.
// Runs on this laptop; n8n reaches it at http://host.docker.internal:4700.
//
//   npm run article:service
//
// Endpoints (all need header  x-token: <token from automation/ollama/.tmp-service-token>):
//   GET  /keywords          ready-to-draft keywords from the queue
//   POST /draft {keyword?}  start drafting (blank keyword = next in queue)
//   GET  /status            idle | running | ready | failed, with log tail, preview URL and QA report
//   POST /publish           push the waiting draft live
//   POST /discard           delete the waiting draft
import { spawn, execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";

const PORT = Number(process.env.ARTICLE_SERVICE_PORT || 4700);
const TOKEN_FILE = "automation/ollama/.tmp-service-token";
const STATE = "automation/ollama/.tmp-last-draft.json";
const TOKEN = process.env.ARTICLE_SERVICE_TOKEN || (existsSync(TOKEN_FILE) ? readFileSync(TOKEN_FILE, "utf8").trim() : null) || (() => {
  const t = randomBytes(18).toString("hex");
  writeFileSync(TOKEN_FILE, t);
  return t;
})();

let job = { state: "idle", keyword: null, log: "", startedAt: null, finishedAt: null };

const tail = (s, n = 60) => s.replace(/\r/g, "\n").split("\n").filter((l) => l.trim() && !/^\s*writing… \d+ tokens$/.test(l)).slice(-n).join("\n");
const draftState = () => (existsSync(STATE) ? JSON.parse(readFileSync(STATE, "utf8")) : null);

function runTool(args) {
  return execFileSync(process.execPath, ["automation/ollama/article.mjs", ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
}

function status() {
  const d = draftState();
  let state = job.state;
  if (state !== "running" && d?.previewUrl) state = "ready";
  return {
    state,
    keyword: d?.keyword ?? job.keyword,
    previewUrl: d?.previewUrl ?? null,
    livePath: d?.path ?? null,
    pageWords: d?.pageWords ?? null,
    qa: d?.qa ?? [],
    startedAt: job.startedAt,
    finishedAt: job.finishedAt,
    log: tail(job.log),
  };
}

const server = createServer(async (req, res) => {
  const send = (code, body) => { res.writeHead(code, { "content-type": "application/json" }); res.end(JSON.stringify(body)); };
  if (req.headers["x-token"] !== TOKEN) return send(401, { error: "bad or missing x-token" });
  let body = "";
  for await (const c of req) body += c;
  const json = body ? JSON.parse(body) : {};
  const url = new URL(req.url, "http://x");

  try {
    if (req.method === "GET" && url.pathname === "/status") return send(200, status());

    if (req.method === "GET" && url.pathname === "/keywords") {
      const out = runTool(["list"]);
      const keywords = [...out.matchAll(/^\s+\[([^\]]+)\] (.+?)  →  (.+?)(  \(already live\))?$/gm)]
        .filter((m) => !m[4]).map((m) => ({ category: m[1], keyword: m[2], products: m[3] }));
      return send(200, { keywords });
    }

    if (req.method === "POST" && url.pathname === "/draft") {
      if (job.state === "running") return send(409, { error: "A draft is already being written.", ...status() });
      if (draftState()) return send(409, { error: "A draft is waiting for publish/discard.", ...status() });
      const kw = (json.keyword || "").trim();
      job = { state: "running", keyword: kw || "(next in queue)", log: "", startedAt: new Date().toISOString(), finishedAt: null };
      const child = spawn(process.execPath, ["automation/ollama/article.mjs", ...(kw ? [kw] : ["--next"])], { stdio: ["ignore", "pipe", "pipe"] });
      child.stdout.on("data", (b) => { job.log += b; });
      child.stderr.on("data", (b) => { job.log += b; });
      child.on("close", (code) => {
        job.finishedAt = new Date().toISOString();
        job.state = code === 0 && draftState()?.previewUrl ? "ready" : "failed";
      });
      return send(202, { started: true, ...status() });
    }

    if (req.method === "POST" && url.pathname === "/publish") {
      const d = draftState();
      if (!d) return send(409, { error: "No draft waiting." });
      const out = runTool(["publish"]);
      job = { state: "idle", keyword: null, log: out, startedAt: null, finishedAt: new Date().toISOString() };
      return send(200, { published: true, liveUrl: `https://ohmsavvy.com${d.path}`, log: tail(out, 10) });
    }

    if (req.method === "POST" && url.pathname === "/discard") {
      if (!draftState()) return send(409, { error: "No draft waiting." });
      const out = runTool(["discard"]);
      job = { state: "idle", keyword: null, log: out, startedAt: null, finishedAt: new Date().toISOString() };
      return send(200, { discarded: true, log: tail(out, 5) });
    }

    send(404, { error: "not found" });
  } catch (e) {
    send(500, { error: String(e.stderr || e.message).slice(-2000) });
  }
});

// Docker Desktop reaches the host through host.docker.internal, which needs a
// non-loopback bind; the token keeps anything else on the network out.
server.listen(PORT, "0.0.0.0", () => {
  console.log(`OhmSavvy writer service on http://localhost:${PORT}  (n8n: http://host.docker.internal:${PORT})`);
  console.log(`Token (x-token header): ${TOKEN}`);
});
