import { ImageResponse } from "next/og";
import { getPicks, picksForEntry } from "@/lib/catalog";
import { content, CONTENT_TYPE_LABELS, type Category } from "@/lib/content";

// A unique 1200x630 share image for every page, used by the n8n Facebook
// autoposter (automation/n8n/) so no two posts ever carry the same picture,
// even when several pages feature the same product photo. Each card combines
// the page's own title with its category and, when the page has one, the
// exact product photo of its first verified Pick. No AI imagery.
// /social-card/multimeters/fluke-117-review -> card for /multimeters/fluke-117-review

const CATEGORY_LABELS: Record<Category, string> = {
  multimeters: "Multimeters",
  "soldering-irons": "Soldering irons",
  oscilloscopes: "Oscilloscopes",
};

const ROUNDUPS: Record<string, { category: Category; title: string }> = {
  "/multimeters/best-multimeters": { category: "multimeters", title: "Best Multimeters" },
  "/soldering-irons/best-soldering-irons": { category: "soldering-irons", title: "Best Soldering Irons" },
  "/oscilloscopes/best-beginner-oscilloscopes": { category: "oscilloscopes", title: "Best Beginner Oscilloscopes" },
};

// Satori can only draw JPEG/PNG, so fetch the photo and embed it, or skip it.
async function photoDataUrl(url: string | undefined): Promise<string | null> {
  if (!url) return null;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    const type = res.headers.get("content-type") ?? "";
    if (!res.ok || !/image\/(jpeg|jpg|png)/.test(type)) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > 4_000_000) return null;
    return `data:${type.split(";")[0]};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

// Built once per page at deploy time (static export): every registry page plus the three roundups.
export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() {
  return [...content.map((e) => e.href), ...Object.keys(ROUNDUPS)].map((href) => ({ slug: href.slice(1).split("/") }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const href = `/${slug.join("/")}`;

  const entry = content.find((e) => e.href === href);
  const roundup = ROUNDUPS[href];
  if (!entry && !roundup) return new Response("Not found", { status: 404 });

  const category = (entry?.category ?? roundup!.category) as Category;
  const title = entry?.title ?? roundup!.title;
  const kind = entry ? CONTENT_TYPE_LABELS[entry.type] : "Ranked roundup";
  const picks = entry ? picksForEntry(entry) : getPicks(category);
  const pick = picks.find((p) => p.image);
  const photo = await photoDataUrl(pick?.image);

  const titleSize = title.length > 70 ? 50 : title.length > 45 ? 58 : 66;

  const render = (photo: string | null) =>
    new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F5F3EF", fontFamily: "sans-serif" }}>
        <div style={{ width: 14, height: "100%", background: "#C77D1E", display: "flex" }} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 48px 48px 56px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 999,
                background: "#1A1D21",
                color: "#FFFFFF",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {CATEGORY_LABELS[category]}
            </div>
            <div style={{ display: "flex", fontSize: 24, color: "#6B6F76", fontWeight: 600 }}>{kind}</div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              lineHeight: 1.12,
              fontWeight: 800,
              color: "#1A1D21",
              letterSpacing: -1,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="44" height="44" viewBox="0 0 32 32">
              <rect width="32" height="32" rx="7" fill="#C77D1E" />
              <path
                d="M4 16 C7 8,11 8,14 16 C17 24,21 24,24 16 L28 16"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div style={{ display: "flex", fontSize: 30, fontWeight: 800, color: "#1A1D21" }}>ohmsavvy.com</div>
          </div>
        </div>
        {photo ? (
          <div
            style={{
              width: 440,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#FFFFFF",
              padding: 36,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt="" style={{ maxWidth: 368, maxHeight: 520, objectFit: "contain" }} />
          </div>
        ) : null}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400" },
    }
  );

  // Some product photos make Satori throw while drawing ("a is not iterable"); fall back to the card without the
  // photo instead of failing the page (and, in the static export, the whole build).
  const headers = { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400" };
  try {
    return new Response(await render(photo).arrayBuffer(), { headers });
  } catch {
    return new Response(await render(null).arrayBuffer(), { headers });
  }
}
