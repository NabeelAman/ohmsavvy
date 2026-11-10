import NextLink from "next/link";
import type { ComponentProps } from "react";

// Site-wide <Link> with viewport prefetching off. In production next/link prefetches every link that scrolls
// into view (one .rsc request per link, each an edge request and an ISR read on Vercel), which on these
// link-heavy article pages meant 10-25 background requests per pageview. Pages are static and load fast
// from the CDN on click anyway, so prefetch only when a caller asks for it explicitly.
export default function Link({ prefetch = false, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={prefetch} {...props} />;
}
