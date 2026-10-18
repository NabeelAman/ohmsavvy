import type { Metadata } from "next";

// Every page must call this instead of writing a bare { title, description,
// alternates } object — Next.js does NOT derive openGraph/twitter from the
// plain title/description fields; without this, a page silently inherits the
// ROOT LAYOUT'S generic openGraph object wholesale (title, description, and
// even og:url all pointing at the homepage), which is what every page on this
// site was doing until this was added. That means a shared link's social
// preview was wrong for literally every review, guide, and comparison page.
export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `https://ohmsavvy.com${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      siteName: "OhmSavvy",
      title,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
