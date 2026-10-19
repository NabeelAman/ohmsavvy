// Generates article-writer.workflow.json for the LOCAL n8n (Docker on the laptop).
// It drives the writer service (automation/ollama/server.mjs) through a browser form:
//   form → start draft → poll until done → review page (preview link + QA report)
//   → Publish / Discard → completion page.
// Run: node automation/n8n/build-writer-workflow.mjs
import { writeFileSync } from "node:fs";

const SERVICE = "http://host.docker.internal:4700";
const auth = {
  authentication: "genericCredentialType",
  genericAuthType: "httpHeaderAuth",
};
const cred = { httpHeaderAuth: { id: "ohmsavvyWriterToken", name: "OhmSavvy writer service (x-token)" } };
const tolerant = { options: { response: { response: { neverError: true, fullResponse: true } } } };

const ifNode = (id, name, position, left, op, right) => ({
  parameters: {
    conditions: {
      options: { caseSensitive: true, leftValue: "", typeValidation: "loose", version: 2 },
      conditions: [{ id: `${id}c`, leftValue: left, rightValue: right, operator: op }],
      combinator: "and",
    },
    options: {},
  },
  id, name, type: "n8n-nodes-base.if", typeVersion: 2.2, position,
});
const strEq = { type: "string", operation: "equals" };

const qaHtml = `={{ (() => {
  const s = $json.body;
  const icon = { pass: '✅', fail: '❌', skipped: '➖' };
  const rows = (s.qa || []).map(c => '<tr><td>' + (icon[c.status] || '') + '</td><td><b>' + c.name + '</b><br><small>' + (c.notes || []).join('<br>') + '</small></td></tr>').join('');
  return '<p><b>' + s.keyword + '</b>: ' + s.pageWords + ' words</p>'
    + '<p><a href="' + s.previewUrl + '" target="_blank" style="font-size:18px">▶ Open the preview</a></p>'
    + '<table style="width:100%;text-align:left;font-size:13px">' + rows + '<tr><td>✋</td><td><b>7. Your review</b><br><small>Read the preview, then choose below.</small></td></tr></table>';
})() }}`;

const workflow = {
  id: "OhmSavvyWriter01",
  name: "OhmSavvy: write an article (local Ollama)",
  nodes: [
    {
      parameters: {
        path: "ohmsavvy-write-article",
        formTitle: "Write an OhmSavvy article",
        formDescription: "Drafts a buying guide with Ollama on this laptop, using only verified product data, and runs the 5 QA checkpoints. It takes about 10–25 minutes; keep this tab open and the review page appears here when it's ready.",
        formFields: {
          values: [
            { fieldLabel: "Keyword", placeholder: "Leave blank for the next keyword in the queue", requiredField: false },
          ],
        },
        responseMode: "lastNode",
        options: { buttonLabel: "Write article" },
      },
      id: "w1", name: "Write article form", type: "n8n-nodes-base.formTrigger", typeVersion: 2.2, position: [0, 0],
      webhookId: "ohmsavvy-write-article",
    },
    {
      parameters: {
        method: "POST", url: `${SERVICE}/draft`, ...auth,
        sendBody: true, specifyBody: "json", jsonBody: "={{ JSON.stringify({ keyword: $json.Keyword || '' }) }}",
        ...tolerant,
      },
      id: "w2", name: "Start draft", type: "n8n-nodes-base.httpRequest", typeVersion: 4.2, position: [220, 0], credentials: cred,
    },
    ifNode("w3", "Busy writing another?", [440, 0], "={{ $json.statusCode === 409 && $json.body.state === 'running' }}", { type: "boolean", operation: "true", singleValue: true }, ""),
    {
      parameters: { operation: "completion", completionTitle: "Already writing", completionMessage: "={{ 'Another article is being written right now (' + $json.body.keyword + '). Try again when it has finished.' }}" },
      id: "w4", name: "Busy", type: "n8n-nodes-base.form", typeVersion: 2.3, position: [660, -160],
    },
    { parameters: { amount: 60, unit: "seconds" }, id: "w5", name: "Wait 1 minute", type: "n8n-nodes-base.wait", typeVersion: 1.1, position: [660, 40], webhookId: "ohmsavvy-wait" },
    { parameters: { url: `${SERVICE}/status`, ...auth, ...tolerant }, id: "w6", name: "Check status", type: "n8n-nodes-base.httpRequest", typeVersion: 4.2, position: [880, 40], credentials: cred },
    ifNode("w7", "Still writing?", [1100, 40], "={{ $json.body.state }}", strEq, "running"),
    ifNode("w8", "Draft ready?", [1320, 120], "={{ $json.body.state }}", strEq, "ready"),
    {
      parameters: {
        operation: "completion",
        completionTitle: "The draft didn't pass QA",
        completionMessage: "={{ 'Nothing was published. Last log lines:\\n\\n' + ($json.body.log || '').split('\\n').slice(-12).join('\\n') }}",
      },
      id: "w9", name: "Failed", type: "n8n-nodes-base.form", typeVersion: 2.3, position: [1540, 260],
    },
    {
      parameters: {
        formFields: {
          values: [
            { fieldLabel: "Review", fieldType: "html", html: qaHtml },
            { fieldLabel: "Decision", fieldType: "dropdown", fieldOptions: { values: [{ option: "Publish" }, { option: "Discard" }] }, requiredField: true },
          ],
        },
        options: { formTitle: "Draft ready: review it", buttonLabel: "Confirm" },
      },
      id: "w10", name: "Review draft", type: "n8n-nodes-base.form", typeVersion: 2.3, position: [1540, 40],
    },
    ifNode("w11", "Publish?", [1760, 40], "={{ $json.Decision }}", strEq, "Publish"),
    { parameters: { method: "POST", url: `${SERVICE}/publish`, ...auth, ...tolerant }, id: "w12", name: "Publish", type: "n8n-nodes-base.httpRequest", typeVersion: 4.2, position: [1980, -60], credentials: cred },
    {
      parameters: {
        operation: "completion",
        completionTitle: "={{ $json.statusCode === 200 ? 'Published ✓' : 'Publish failed' }}",
        completionMessage: "={{ $json.statusCode === 200 ? 'Live in about 2 minutes at ' + $json.body.liveUrl + '. The Facebook autoposter will share it in its next slot.' : ($json.body.error || 'Unknown error') }}",
      },
      id: "w13", name: "Published", type: "n8n-nodes-base.form", typeVersion: 2.3, position: [2200, -60],
    },
    { parameters: { method: "POST", url: `${SERVICE}/discard`, ...auth, ...tolerant }, id: "w14", name: "Discard", type: "n8n-nodes-base.httpRequest", typeVersion: 4.2, position: [1980, 140], credentials: cred },
    {
      parameters: { operation: "completion", completionTitle: "Discarded", completionMessage: "The draft was deleted and its keyword is back in the queue." },
      id: "w15", name: "Discarded", type: "n8n-nodes-base.form", typeVersion: 2.3, position: [2200, 140],
    },
  ],
  connections: {
    "Write article form": { main: [[{ node: "Start draft", type: "main", index: 0 }]] },
    "Start draft": { main: [[{ node: "Busy writing another?", type: "main", index: 0 }]] },
    "Busy writing another?": { main: [[{ node: "Busy", type: "main", index: 0 }], [{ node: "Wait 1 minute", type: "main", index: 0 }]] },
    "Wait 1 minute": { main: [[{ node: "Check status", type: "main", index: 0 }]] },
    "Check status": { main: [[{ node: "Still writing?", type: "main", index: 0 }]] },
    "Still writing?": { main: [[{ node: "Wait 1 minute", type: "main", index: 0 }], [{ node: "Draft ready?", type: "main", index: 0 }]] },
    "Draft ready?": { main: [[{ node: "Review draft", type: "main", index: 0 }], [{ node: "Failed", type: "main", index: 0 }]] },
    "Review draft": { main: [[{ node: "Publish?", type: "main", index: 0 }]] },
    "Publish?": { main: [[{ node: "Publish", type: "main", index: 0 }], [{ node: "Discard", type: "main", index: 0 }]] },
    Publish: { main: [[{ node: "Published", type: "main", index: 0 }]] },
    Discard: { main: [[{ node: "Discarded", type: "main", index: 0 }]] },
  },
  settings: { executionOrder: "v1", timezone: "Asia/Dubai" },
  pinData: {},
};

writeFileSync(new URL("./article-writer.workflow.json", import.meta.url), JSON.stringify(workflow, null, 2) + "\n");
console.log("wrote article-writer.workflow.json");
