// Resubmits the sitemap to Google Search Console on every production deploy,
// via a service account (sitemap-submitter@nabeelaman-gsc.iam.gserviceaccount.com,
// granted Owner on the ohmsavvy.com GSC property). Same reasoning as
// submit-indexnow.mjs: Google periodically re-fetches the sitemap on its own,
// but pinging it after a real content change nudges a sooner re-crawl rather
// than waiting out that cycle.
//
// Credentials come from the GSC_SERVICE_ACCOUNT_KEY env var (the full service
// account JSON key, as a single-line string) set in Vercel — never committed
// to the repo. Uses raw JWT signing via Node's built-in crypto rather than a
// Google API client library, to keep this dependency-free like the IndexNow
// script.
import crypto from "node:crypto";

const SITE_URL = "https://ohmsavvy.com/";
const SITEMAP_URL = "https://ohmsavvy.com/sitemap.xml";
const SCOPE = "https://www.googleapis.com/auth/webmasters";

function base64url(input) {
  return Buffer.from(input).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function getAccessToken(key) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claims = {
    iss: key.client_email,
    scope: SCOPE,
    aud: key.token_uri,
    exp: now + 3600,
    iat: now,
  };
  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claims))}`;
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(unsigned)
    .sign(key.private_key, "base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const jwt = `${unsigned}.${signature}`;

  const res = await fetch(key.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Token request failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function main() {
  if (process.env.VERCEL_ENV !== "production") {
    console.log("Skipping GSC sitemap submission (not a production Vercel build).");
    return;
  }

  const rawKey = process.env.GSC_SERVICE_ACCOUNT_KEY;
  if (!rawKey) {
    console.warn("GSC: skipping — GSC_SERVICE_ACCOUNT_KEY env var is not set.");
    return;
  }

  const key = JSON.parse(rawKey);
  const token = await getAccessToken(key);

  const submitUrl = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`;
  const res = await fetch(submitUrl, { method: "PUT", headers: { Authorization: `Bearer ${token}` } });

  if (res.ok) {
    console.log(`GSC: resubmitted ${SITEMAP_URL} (status ${res.status}).`);
  } else {
    // Non-fatal: a failed GSC submission should never fail the deploy.
    console.warn(`GSC: submission failed with status ${res.status}: ${await res.text().catch(() => "")}`);
  }
}

main().catch((err) => {
  console.warn("GSC: submission errored (non-fatal):", err.message);
});
