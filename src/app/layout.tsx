import type { Metadata } from "next";
import { Big_Shoulders, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";
import Script from "next/script";
import GoogleAnalyticsLoader from "@/components/GoogleAnalyticsLoader";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";

// Applies a stored light/dark override before paint, so switching theme
// doesn't flash the wrong colors on load. No stored value = the three-state
// CSS system in globals.css falls through to prefers-color-scheme as normal.
const THEME_INIT_SCRIPT = `
  try {
    var t = localStorage.getItem("theme");
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
  } catch (e) {}
`;

// Self-hosted via next/font instead of a CSS @import — avoids the extra
// render-blocking round trip (fetch font CSS, then fetch the font files)
// that was adding ~1-2s to LCP on every page.
const bigShouldersDisplay = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--next-font-heading",
  display: "swap",
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--next-font-mono",
  display: "swap",
});
const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--next-font-sans",
  display: "swap",
});

// AdSense publisher ID. Also in public/ads.txt (without the "ca-" prefix).
const ADSENSE_CLIENT = "ca-pub-6358624783893573";

const SITE_TITLE ="OhmSavvy | Multimeter, Oscilloscope & Soldering Iron Reviews";
const SITE_DESCRIPTION =
  "In-depth, specification-based reviews of multimeters, soldering irons, and oscilloscopes — honest comparisons to help you pick the right tool.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ohmsavvy.com"),
  title: {
    default: SITE_TITLE,
    template: "%s | OhmSavvy",
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "OhmSavvy",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  verification: {
    google: "hiHeIkdBWXcmzt70-nXfNhotNZvCYz_tgUDvPrOecBI",
  },
  other: {
    "google-adsense-account": ADSENSE_CLIENT,
  },
};

// Sitewide WebSite + Organization schema — every page previously shipped with
// zero Schema.org markup unless it was a review/comparison/about page with its
// own JSON-LD. This covers the gap on category pages, guides, and the homepage.
const siteJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OhmSavvy",
    url: "https://ohmsavvy.com",
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OhmSavvy",
    url: "https://ohmsavvy.com",
    description: SITE_DESCRIPTION,
  },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${bigShouldersDisplay.variable} ${ibmPlexMono.variable} ${sourceSans3.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* AdSense site verification + Auto ads. Plain <script> so it is in the
            server HTML that Google's verifier reads; async keeps it off the
            render path. */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Script id="theme-init" strategy="beforeInteractive">{THEME_INIT_SCRIPT}</Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd).replace(/</g, "\\u003c") }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <GoogleAnalyticsLoader />
      </body>
    </html>
  );
}
