import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ohmsavvy.com"),
  title: {
    default: "OhmSavvy | Electronics Test Equipment Reviews",
    template: "%s | OhmSavvy",
  },
  description:
    "In-depth, specification-based reviews of multimeters, soldering irons, oscilloscopes, and bench test equipment — honest comparisons to help you pick the right tool.",
};

const navLinks = [
  { href: "/multimeters", label: "Multimeters" },
  { href: "/soldering-irons", label: "Soldering Irons" },
  { href: "/oscilloscopes", label: "Oscilloscopes" },
  { href: "/about", label: "About" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="border-b border-border sticky top-0 z-40 bg-background/90 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
            <Link href="/">
              <Logo />
            </Link>
            <nav className="hidden sm:flex items-center gap-7 text-sm">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="text-muted hover:text-foreground transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border mt-20">
          <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-muted">
            <p className="max-w-2xl leading-6">
              OhmSavvy is reader-supported. When you buy through links on our site, we may earn an
              affiliate commission at no extra cost to you. This supports the independent research and
              comparisons we publish.
            </p>
            <p className="mt-4">© 2026 OhmSavvy. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
