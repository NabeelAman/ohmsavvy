import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Nav } from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ohmsavvy.com"),
  title: {
    default: "OhmSavvy | Electronics Test Equipment Reviews",
    template: "%s | OhmSavvy",
  },
  description:
    "In-depth, specification-based reviews of multimeters, soldering irons, oscilloscopes, and bench test equipment — honest comparisons to help you pick the right tool.",
  verification: {
    google: "hiHeIkdBWXcmzt70-nXfNhotNZvCYz_tgUDvPrOecBI",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="border-b border-border sticky top-0 z-40 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            <Link href="/">
              <Logo />
            </Link>
            <Nav />
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border bg-surface-raised">
          <div className="mx-auto max-w-6xl px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-2">
              <Logo />
              <p className="mt-4 max-w-sm text-sm text-muted leading-6">
                Specification-based reviews of multimeters, soldering irons, oscilloscopes, and
                test equipment — verified against manufacturer data, not marketing copy.
              </p>
            </div>
            <div>
              <p className="font-display text-xs text-muted uppercase tracking-wide mb-4">Categories</p>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/multimeters/best-multimeters" className="text-muted hover:text-foreground transition-colors">Multimeters</Link></li>
                <li><Link href="/soldering-irons/best-soldering-irons" className="text-muted hover:text-foreground transition-colors">Soldering Irons</Link></li>
                <li><Link href="/oscilloscopes/best-beginner-oscilloscopes" className="text-muted hover:text-foreground transition-colors">Oscilloscopes</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-display text-xs text-muted uppercase tracking-wide mb-4">Company</p>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/about" className="text-muted hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/about#how-were-funded" className="text-muted hover:text-foreground transition-colors">Affiliate Disclosure</Link></li>
                <li><Link href="/privacy-policy" className="text-muted hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-muted hover:text-foreground transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border">
            <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-muted">
              <p className="max-w-xl leading-5">
                OhmSavvy is reader-supported. When you buy through links on our site, we may earn
                an affiliate commission at no extra cost to you.
              </p>
              <p>© 2026 OhmSavvy. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
