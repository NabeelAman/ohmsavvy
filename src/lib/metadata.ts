import type { Metadata } from "next";

// Every page must call this instead of writing a bare { title, description,
// alternates } object — Next.js does NOT derive openGraph/twitter from the
// plain title/description fields; without this, a page silently inherits the
// ROOT LAYOUT'S generic openGraph object wholesale (title, description, and
// even og:url all pointing at the homepage), which is what every page on this
// site was doing until this was added. That means a shared link's social
// preview was wrong for literally every review, guide, and comparison page.
const DEFAULT_OG_IMAGE = "https://ohmsavvy.com/og-default.jpg";

export function buildMetadata({
  title,
  description,
  path,
  image,
  languages,
}: {
  title: string;
  description: string;
  path: string;
  /** A verified product photo for review/comparison pages — falls back to the
   * site-wide branded default when omitted (most guide/category pages). */
  image?: string;
  /** hreflang alternates for a translated page, e.g. { de: "/de/...", "x-default": "/..." }. */
  languages?: Record<string, string>;
}): Metadata {
  const url = `https://ohmsavvy.com${path}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  return {
    title,
    description,
    alternates: { canonical: path, ...(languages ? { languages } : {}) },
    openGraph: {
      type: "article",
      siteName: "OhmSavvy",
      title,
      description,
      url,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
