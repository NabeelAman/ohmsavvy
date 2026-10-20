# Facebook autopost (n8n)

Posts 5 times a day (8:00, 11:00, 14:00, 17:00 and 20:00 Dubai time) to the OhmSavvy Facebook Page. Each slot is a **photo post**
(the product image, with the caption and the page URL as its text). Pages without a product image (most how-tos and
buying guides) go out as a link post, where Facebook draws the page's card. New reviews, comparisons and guides go
out first, automatically.

Live on the cloud n8n as **"OhmSavvy: Facebook autopost (5/day)"**: https://n8n.nabeelaman.com/workflow/zjheKM1k4yJna134

## How it works

```
Schedule (5x daily) → Config → Fetch https://ohmsavvy.com/feed.json → Pick next post
  → Build caption → Dry run? ──yes──► stop (caption visible in the execution log)
                              └─no──► Has a photo? ──yes──► POST /{page-id}/photos ─► accepted? ──yes──► Mark as posted
                                                   │                                  └─no─┐
                                                   └─no──────────────────────────────► POST /{page-id}/feed (link) ─► Mark as posted
```

If Facebook can't fetch a product image (some manufacturer sites block hotlinking), that slot falls back to a link post
instead of being skipped.

- **Content source:** `https://ohmsavvy.com/feed.json`, generated from `src/lib/content.ts`. Publish a page with
  its registry entry and it's in the feed on the next deploy. No other step is needed.
- **Queue order:** never-posted pages first. Anything that appears after the workflow went live is treated as new
  and posted before the backlog. Categories take turns (multimeters → soldering irons → oscilloscopes).
- **Recycling:** once everything has been posted, the page posted longest ago is reposted, but never within
  `recycleAfterDays` (default 10) of its last post.
- **Captions and images come from the article page itself** (*Fetch article page* → *Build caption*): the page's
  H1 as the title, its opening paragraph (two for reviews), then its section headings (how-to and buying guides) or
  the verified picks it covers. The photo is the page's own product image (og:image, else the first figure in the
  article body, else the site's default image). Award and rating come from the feed, and "Hands-on tested in the
  OhmSavvy lab" appears only for products flagged as tested. Nothing new is written, so there are no prices or hype.
- **Page:** Ohm Savvy, ID `108696581096211`, set as `pageId` in the Config node.
  Links carry `utm_source=facebook&utm_medium=social&utm_campaign=fb_autopost`, so GA4 shows the traffic.

## One-time setup

1. **Facebook Page ID:** `108696581096211` (Ohm Savvy, facebook.com/ohmsavvy), already set in the Config node.
2. **Page access token** with the `pages_manage_posts` and `pages_read_engagement` permissions:
   - Create an app at developers.facebook.com (type: Business) and add the Pages use case.
   - In Graph API Explorer, select the app, request those two permissions, then *Get Page Access Token* for the
     OhmSavvy Page.
   - Exchange it for a **long-lived** token (Access Token Debugger → *Extend Access Token*). A long-lived *Page*
     token from a long-lived user token doesn't expire unless the password or the app's permissions change.
3. **In n8n:** go to *Credentials → New → Query Auth*. Name it `Facebook Page token (access_token)`, set
   **Name** = `access_token` and **Value** = the Page token.
4. **Import:** *Workflows → Import from file →* `facebook-autopost.workflow.json`.
5. **Config node:** paste your `pageId`. Check that `graphVersion` is a currently supported version in Meta's Graph
   API changelog, and update it if it's been retired. On *Post to Facebook Page*, select the credential from step 3.
6. **Dry run first:** `dryRun` is `true` on import. Click *Execute workflow* and read the caption in the *Build
   caption* output. Nothing is posted.
7. **Go live:** set `dryRun` to `false`, save, and toggle the workflow **Active**.

> The posting history (what's been posted, and when) lives in the workflow's static data, which n8n only saves on
> **active, scheduled** runs, not manual test runs. So testing never uses up the queue.

## Changing things

- **Times / frequency:** edit the cron in the trigger node (`0 8,11,14,17,20 * * *`). The timezone is set in the
  workflow settings (`Asia/Dubai`).
- **Caption wording or hashtags:** edit `automation/n8n/build-workflow.mjs`, run
  `node automation/n8n/build-workflow.mjs`, and re-import, so the repo stays the source of truth.
- **Pause:** toggle the workflow inactive. The queue position is kept.

## Rules the captions follow

They're bound by `automation/CONTENT_STANDARDS.md`: no product fact that isn't in the verified data, "tested" only
for `handsOnTested` products, and no invented results, testimonials or prices.
