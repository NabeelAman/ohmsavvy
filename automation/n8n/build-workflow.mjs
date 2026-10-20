// Generates facebook-autopost.workflow.json (importable into n8n).
// Edit the code strings here, then run: node automation/n8n/build-workflow.mjs
import { writeFileSync } from "node:fs";

const pickNext = String.raw`// Chooses the next page to post. Never-posted content goes first (content added
// after the workflow went live is treated as "new" and jumps the queue); once
// everything has been posted, the longest-ago post is recycled after
// recycleAfterDays. Categories take turns: the category posted least recently
// goes next, so no category is starved.
// Static data only persists for active (production) runs, not manual tests.
const cfg = $('Config').first().json;
const items = $input.first().json.items || [];
const data = $getWorkflowStaticData('global');
data.firstSeen = data.firstSeen || {};
data.posted = data.posted || {};
data.categoryLastPosted = data.categoryLastPosted || {};

const now = Date.now();
const firstRun = Object.keys(data.firstSeen).length === 0;
for (const it of items) {
  // On the very first run everything is "backlog" (0); afterwards, anything
  // not seen before is genuinely new and gets the current time.
  if (data.firstSeen[it.url] === undefined) data.firstSeen[it.url] = firstRun ? 0 : now;
}

const TYPE_ORDER = { review: 0, comparison: 1, 'use-case-guide': 2, roundup: 3, 'buying-guide': 4 };
// Of the candidates, take the first one from the category that has waited longest.
const fairest = (list) => {
  if (!list.length) return undefined;
  const cats = [...new Set(list.map((i) => i.category))];
  cats.sort((a, b) => (data.categoryLastPosted[a] || 0) - (data.categoryLastPosted[b] || 0));
  return list.find((i) => i.category === cats[0]);
};

const unposted = items
  .filter((i) => !data.posted[i.url])
  .sort((a, b) => (data.firstSeen[b.url] - data.firstSeen[a.url]) || (TYPE_ORDER[a.type] - TYPE_ORDER[b.type]));

let pick = fairest(unposted);
if (!pick) {
  const cutoff = now - Number(cfg.recycleAfterDays) * 86400000;
  const recyclable = items
    .filter((i) => data.posted[i.url] && data.posted[i.url] < cutoff)
    .sort((a, b) => data.posted[a.url] - data.posted[b.url]);
  pick = fairest(recyclable);
}

if (!pick) return []; // everything posted recently: skip this slot
return [{ json: { ...pick, isRepost: Boolean(data.posted[pick.url]) } }];`;

const buildCaption = String.raw`// Builds the Facebook post from the article page itself: its headline, opening
// paragraphs and section headings, and the image the page shows. All of it is
// already-published, verified copy, so nothing new is written here (no prices,
// no hype). "Tested" comes only from the feed's handsOnTested flag.
const it = $('Pick next post').first().json;
const cfg = $('Config').first().json;
const html = String($input.first().json.data || '');

const decode = (s) => s.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
const text = (s) => decode(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const meta = (prop) => { const m = html.match(new RegExp('<meta (?:property|name)="' + prop + '" content="([^"]*)"')); return m ? decode(m[1]) : ''; };
const main = (html.match(/<main[\s\S]*?<\/main>/) || [html])[0];
// Cuts at the last full sentence that fits.
const clip = (t, n) => { if (t.length <= n) return t; const cut = t.slice(0, n); const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('? '), cut.lastIndexOf('! ')); return end > 60 ? cut.slice(0, end + 1) : cut.replace(/\s+\S*$/, '') + '…'; };

const h1 = (main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1];
const title = (h1 && text(h1)) || meta('og:title').replace(/\s*\|\s*OhmSavvy$/, '') || it.title;

// Opening paragraph(s), skipping the affiliate disclosure and short card blurbs.
// Reviews take two (the verdict line and the summary); everything else takes one,
// since later paragraphs lean on the page around them ("the steps below").
// Also skips paragraphs that continue an earlier thought ("Put another way: …").
const SKIP = /^(Disclosure|Affiliate|As an Amazon|Prices|Last updated|Put another way|In other words|That said|But |So |And |Also )/i;
const paras = [...main.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => text(m[1])).filter((t) => t.length >= 80 && !SKIP.test(t) && !t.endsWith(':'));
const body = [];
for (const para of paras) {
  const room = 560 - body.join(' ').length;
  if (room < 120) break;
  body.push(clip(para, room));
  if (body.length === (it.type === 'review' ? 2 : 1)) break;
}
if (!body.length) body.push(meta('description') || it.description);

// How-to and buying guides list their section headings; picks-based pages list
// the verified products they cover (from the feed); reviews need neither.
const GENERIC = /^(Frequently asked questions|FAQ|Guides|Product reviews|Comparisons|Where to buy|How we chose|Sources|Related)/i;
const sections = [...main.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => text(m[1]).replace(/^\d+\s*/, '')).filter((t) => t && !GENERIC.test(t)).slice(0, 4);

// Image: the page's own product image (og:image); else the feed image; else the
// first figure in the article body (direct src only, so the lazy "related
// products" cards, which show other products, are never used); else the site's
// branded default image.
const og = meta('og:image');
let photo = og && !/og-default/.test(og) ? og : (it.image || '');
if (!photo) { const m = main.match(/<img[^>]*\ssrc="(https?:\/\/[^"]+)"/); if (m) photo = decode(m[1]); }
if (!photo) photo = og;

const TAGS = {
  multimeters: '#Multimeter #Electrician #ElectricalTools #DIY #TestEquipment',
  'soldering-irons': '#Soldering #Electronics #DIYElectronics #Maker #Repair',
  oscilloscopes: '#Oscilloscope #Electronics #Arduino #Maker #ElectricalEngineering',
};
const EMOJI = { review: '🔍', comparison: '⚖️', 'use-case-guide': '🧰', roundup: '🏅', 'buying-guide': '🛒', 'how-to-guide': '🛠️' };

const sep = it.url.includes('?') ? '&' : '?';
const link = it.url + sep + 'utm_source=facebook&utm_medium=social&utm_campaign=' + encodeURIComponent(cfg.utmCampaign);
const p = it.topPick;
const lines = [(EMOJI[it.type] || '📘') + ' ' + title, ...body];
if (it.type === 'review' && p && p.badge) lines.push('🏆 ' + p.badge + ' · rated ' + p.rating + '/5');
if (it.handsOnTested) lines.push(it.type === 'review' ? '✅ Hands-on tested in the OhmSavvy lab.' : '✅ Includes picks we have tested hands-on.');
const products = it.products || [];
if ((it.type === 'how-to-guide' || it.type === 'buying-guide') && sections.length) lines.push("What's inside:\n" + sections.map((s) => '• ' + s).join('\n'));
else if (it.type !== 'review' && products.length) lines.push('Picks covered: ' + products.slice(0, 4).join(', ') + (products.length > 4 ? ' and more' : '') + '.');
lines.push('👉 Read it: ' + link);
lines.push(TAGS[it.category] || '');

return [{ json: { ...it, title, link, photo, message: lines.filter(Boolean).join('\n\n') } }];`;

const markPosted = String.raw`// Records the post only after Facebook accepted it.
const post = $('Build caption').first().json;
const data = $getWorkflowStaticData('global');
data.posted = data.posted || {};
data.posted[post.url] = Date.now();
data.categoryLastPosted = data.categoryLastPosted || {};
data.categoryLastPosted[post.category] = Date.now();
const res = $input.first().json;
return [{ json: { postedUrl: post.url, facebookPostId: res.post_id || res.id, format: res.post_id ? 'photo' : 'link', repost: post.isRepost } }];`;

// IF node (v2) that passes when `left` is a non-empty string.
const ifNotEmpty = (id, name, position, left) => ({
  parameters: {
    conditions: {
      options: { caseSensitive: true, leftValue: "", typeValidation: "loose" },
      conditions: [{ id: `${id}c`, leftValue: left, rightValue: "", operator: { type: "string", operation: "notEmpty", singleValue: true } }],
      combinator: "and",
    },
    options: {},
  },
  id, name, type: "n8n-nodes-base.if", typeVersion: 2, position,
});
const graph = (edge) => `=https://graph.facebook.com/{{ $('Config').first().json.graphVersion }}/{{ $('Config').first().json.pageId }}/${edge}`;
const fbCred = { httpQueryAuth: { id: "", name: "Facebook Page token (access_token)" } };

const workflow = {
  name: "OhmSavvy: Facebook autopost (5/day)",
  nodes: [
    {
      parameters: { rule: { interval: [{ field: "cronExpression", expression: "0 8,11,14,17,20 * * *" }] } },
      id: "a1",
      name: "5x daily (8, 11, 14, 17, 20)",
      type: "n8n-nodes-base.scheduleTrigger",
      typeVersion: 1.2,
      position: [0, 0],
    },
    {
      parameters: {
        assignments: {
          assignments: [
            { id: "c1", name: "pageId", value: "108696581096211", type: "string" },
            { id: "c2", name: "graphVersion", value: "v23.0", type: "string" },
            { id: "c3", name: "feedUrl", value: "https://ohmsavvy.com/feed.json", type: "string" },
            { id: "c4", name: "recycleAfterDays", value: 10, type: "number" },
            { id: "c5", name: "utmCampaign", value: "fb_autopost", type: "string" },
            { id: "c6", name: "dryRun", value: true, type: "boolean" },
          ],
        },
        options: {},
      },
      id: "a2",
      name: "Config",
      type: "n8n-nodes-base.set",
      typeVersion: 3.4,
      position: [220, 0],
    },
    {
      parameters: { url: "={{ $json.feedUrl }}", options: { response: { response: { responseFormat: "json" } } } },
      id: "a3",
      name: "Fetch site feed",
      type: "n8n-nodes-base.httpRequest",
      typeVersion: 4.2,
      position: [440, 0],
    },
    { parameters: { jsCode: pickNext }, id: "a4", name: "Pick next post", type: "n8n-nodes-base.code", typeVersion: 2, position: [660, 0] },
    {
      parameters: { url: "={{ $json.url }}", options: { response: { response: { responseFormat: "text", outputPropertyName: "data" } } } },
      id: "a13",
      name: "Fetch article page",
      type: "n8n-nodes-base.httpRequest",
      typeVersion: 4.2,
      position: [880, 0],
    },
    { parameters: { jsCode: buildCaption }, id: "a5", name: "Build caption", type: "n8n-nodes-base.code", typeVersion: 2, position: [1100, 0] },
    {
      parameters: {
        conditions: {
          options: { caseSensitive: true, leftValue: "", typeValidation: "loose" },
          conditions: [
            {
              id: "d1",
              leftValue: "={{ $('Config').first().json.dryRun }}",
              rightValue: true,
              operator: { type: "boolean", operation: "true", singleValue: true },
            },
          ],
          combinator: "and",
        },
        options: {},
      },
      id: "a6",
      name: "Dry run?",
      type: "n8n-nodes-base.if",
      typeVersion: 2,
      position: [1320, 0],
    },
    { parameters: {}, id: "a7", name: "Dry run: caption only (not posted)", type: "n8n-nodes-base.noOp", typeVersion: 1, position: [1540, -120] },
    ifNotEmpty("a10", "Has a photo?", [1540, 120], "={{ $json.photo }}"),
    {
      // Facebook downloads the product image from its URL. If it can't (some
      // manufacturer sites block hotlinking), the slot falls back to a link post.
      parameters: {
        method: "POST",
        url: graph("photos"),
        authentication: "genericCredentialType",
        genericAuthType: "httpQueryAuth",
        sendBody: true,
        contentType: "form-urlencoded",
        bodyParameters: {
          parameters: [
            { name: "url", value: "={{ $json.photo }}" },
            { name: "caption", value: "={{ $json.message }}" },
          ],
        },
        options: { response: { response: { neverError: true } } },
      },
      id: "a11",
      name: "Post photo + caption",
      type: "n8n-nodes-base.httpRequest",
      typeVersion: 4.2,
      position: [1760, 40],
      credentials: fbCred,
    },
    ifNotEmpty("a12", "Photo accepted?", [1980, 40], "={{ $json.post_id || '' }}"),
    {
      parameters: {
        method: "POST",
        url: graph("feed"),
        authentication: "genericCredentialType",
        genericAuthType: "httpQueryAuth",
        sendBody: true,
        contentType: "form-urlencoded",
        bodyParameters: {
          parameters: [
            { name: "message", value: "={{ $('Build caption').first().json.message }}" },
            { name: "link", value: "={{ $('Build caption').first().json.link }}" },
          ],
        },
        options: {},
      },
      id: "a8",
      name: "Post link (no photo)",
      type: "n8n-nodes-base.httpRequest",
      typeVersion: 4.2,
      position: [2200, 200],
      credentials: fbCred,
    },
    { parameters: { jsCode: markPosted }, id: "a9", name: "Mark as posted", type: "n8n-nodes-base.code", typeVersion: 2, position: [2420, 40] },
  ],
  connections: {
    "5x daily (8, 11, 14, 17, 20)": { main: [[{ node: "Config", type: "main", index: 0 }]] },
    Config: { main: [[{ node: "Fetch site feed", type: "main", index: 0 }]] },
    "Fetch site feed": { main: [[{ node: "Pick next post", type: "main", index: 0 }]] },
    "Pick next post": { main: [[{ node: "Fetch article page", type: "main", index: 0 }]] },
    "Fetch article page": { main: [[{ node: "Build caption", type: "main", index: 0 }]] },
    "Build caption": { main: [[{ node: "Dry run?", type: "main", index: 0 }]] },
    "Dry run?": {
      main: [
        [{ node: "Dry run: caption only (not posted)", type: "main", index: 0 }],
        [{ node: "Has a photo?", type: "main", index: 0 }],
      ],
    },
    "Has a photo?": { main: [[{ node: "Post photo + caption", type: "main", index: 0 }], [{ node: "Post link (no photo)", type: "main", index: 0 }]] },
    "Post photo + caption": { main: [[{ node: "Photo accepted?", type: "main", index: 0 }]] },
    "Photo accepted?": { main: [[{ node: "Mark as posted", type: "main", index: 0 }], [{ node: "Post link (no photo)", type: "main", index: 0 }]] },
    "Post link (no photo)": { main: [[{ node: "Mark as posted", type: "main", index: 0 }]] },
  },
  settings: { executionOrder: "v1", timezone: "Asia/Dubai" },
  pinData: {},
};

writeFileSync(new URL("./facebook-autopost.workflow.json", import.meta.url), JSON.stringify(workflow, null, 2) + "\n");
console.log("wrote facebook-autopost.workflow.json");
