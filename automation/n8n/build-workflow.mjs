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

const buildCaption = String.raw`// Builds the Facebook caption. Plain, specific and honest: no prices (they
// change), no hype words, and "tested" only when the feed says so.
const it = $input.first().json;
const cfg = $('Config').first().json;

// Deterministic variety: the same page gets a different opener on different days.
const seed = [...(it.url + new Date().toDateString())].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const pickOne = (arr) => arr[seed % arr.length];

const TAGS = {
  multimeters: '#Multimeter #Electrician #ElectricalTools #DIY #TestEquipment',
  'soldering-irons': '#Soldering #Electronics #DIYElectronics #Maker #Repair',
  oscilloscopes: '#Oscilloscope #Electronics #Arduino #Maker #ElectricalEngineering',
};
const LABEL = { multimeters: 'multimeter', 'soldering-irons': 'soldering iron', oscilloscopes: 'oscilloscope' };

const sep = it.url.includes('?') ? '&' : '?';
const link = it.url + sep + 'utm_source=facebook&utm_medium=social&utm_campaign=' + encodeURIComponent(cfg.utmCampaign);
const p = it.topPick;
const products = it.products || [];
const lines = [];

switch (it.type) {
  case 'review':
    lines.push(pickOne([
      '🔍 ' + it.title,
      'Is the ' + (p ? p.name : it.title) + ' worth it? Here is our verdict.',
      'New on OhmSavvy: ' + it.title,
    ]));
    if (p && p.bottomLine) lines.push(p.bottomLine);
    if (p && p.badge) lines.push('🏆 ' + p.badge + ' · rated ' + p.rating + '/5');
    if (it.handsOnTested) lines.push('✅ Hands-on tested in the OhmSavvy lab.');
    lines.push('Specs, strengths, limitations, and who should skip it:');
    break;
  case 'comparison':
    lines.push(pickOne([
      '⚖️ ' + it.title,
      (products[0] || 'Which one') + ' or ' + (products[1] || 'the alternative') + '? We compared them side by side.',
      'Torn between two ' + LABEL[it.category] + 's? ' + it.title,
    ]));
    lines.push(it.description + '.');
    if (it.handsOnTested) lines.push('✅ Includes a pick we have tested hands-on.');
    lines.push('Specs side by side and which to choose for your work:');
    break;
  case 'use-case-guide':
    lines.push(pickOne([
      '🧰 Best ' + LABEL[it.category] + ' ' + it.title.replace(/^For /i, 'for ').toLowerCase().replace(LABEL[it.category] + ' ', ''),
      'Choosing a ' + LABEL[it.category] + ' ' + it.title.replace(/^For /i, 'for ').toLowerCase() + '? Start here.',
    ]));
    lines.push(it.description + '.');
    if (products.length) lines.push('Our picks include: ' + products.slice(0, 3).join(', ') + '.');
    break;
  case 'roundup':
    lines.push(pickOne(['🏅 ' + it.title + ', compared honestly', 'Shopping for a ' + LABEL[it.category] + '? ' + it.title]));
    lines.push(it.description);
    if (p) lines.push('Our top pick: ' + p.name + ' (' + p.rating + '/5).');
    if (it.handsOnTested) lines.push('✅ Our top picks are hands-on tested in our lab.');
    break;
  default:
    lines.push('📘 ' + it.title);
    lines.push(it.description + '.');
}

lines.push('👉 ' + link);
lines.push(TAGS[it.category] || '');

// Posted as a photo (the product image) with this caption when the page has an
// image; otherwise as a link post, where Facebook draws the page's own card.
return [{ json: { ...it, link, photo: it.image || '', message: lines.filter(Boolean).join('\n\n') } }];`;

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
  name: "OhmSavvy: Facebook autopost (3/day)",
  nodes: [
    {
      parameters: { rule: { interval: [{ field: "cronExpression", expression: "0 9,13,19 * * *" }] } },
      id: "a1",
      name: "3x daily (9:00, 13:00, 19:00)",
      type: "n8n-nodes-base.scheduleTrigger",
      typeVersion: 1.2,
      position: [0, 0],
    },
    {
      parameters: {
        assignments: {
          assignments: [
            { id: "c1", name: "pageId", value: "PASTE_YOUR_FACEBOOK_PAGE_ID", type: "string" },
            { id: "c2", name: "graphVersion", value: "v23.0", type: "string" },
            { id: "c3", name: "feedUrl", value: "https://ohmsavvy.com/feed.json", type: "string" },
            { id: "c4", name: "recycleAfterDays", value: 14, type: "number" },
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
    { parameters: { jsCode: buildCaption }, id: "a5", name: "Build caption", type: "n8n-nodes-base.code", typeVersion: 2, position: [880, 0] },
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
      position: [1100, 0],
    },
    { parameters: {}, id: "a7", name: "Dry run: caption only (not posted)", type: "n8n-nodes-base.noOp", typeVersion: 1, position: [1320, -120] },
    ifNotEmpty("a10", "Has a photo?", [1320, 120], "={{ $json.photo }}"),
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
      position: [1540, 40],
      credentials: fbCred,
    },
    ifNotEmpty("a12", "Photo accepted?", [1760, 40], "={{ $json.post_id || '' }}"),
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
      position: [1980, 200],
      credentials: fbCred,
    },
    { parameters: { jsCode: markPosted }, id: "a9", name: "Mark as posted", type: "n8n-nodes-base.code", typeVersion: 2, position: [2200, 40] },
  ],
  connections: {
    "3x daily (9:00, 13:00, 19:00)": { main: [[{ node: "Config", type: "main", index: 0 }]] },
    Config: { main: [[{ node: "Fetch site feed", type: "main", index: 0 }]] },
    "Fetch site feed": { main: [[{ node: "Pick next post", type: "main", index: 0 }]] },
    "Pick next post": { main: [[{ node: "Build caption", type: "main", index: 0 }]] },
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
