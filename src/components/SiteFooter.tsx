import Link from "next/link";
import { Logo } from "./Logo";

const CATEGORIES = [
  {
    label: "Multimeters",
    dot: "bg-cat-multimeters",
    links: [
      { href: "/multimeters", label: "All multimeters" },
      { href: "/multimeters/best-multimeters", label: "Best multimeters" },
      { href: "/multimeters/reviews", label: "Reviews" },
      { href: "/multimeters/comparisons", label: "Comparisons" },
      { href: "/multimeters/guides", label: "Guides" },
      { href: "/multimeters/multimeter-buying-guide", label: "Buying guide" },
    ],
  },
  {
    label: "Soldering Irons",
    dot: "bg-cat-soldering",
    links: [
      { href: "/soldering-irons", label: "All soldering irons" },
      { href: "/soldering-irons/best-soldering-irons", label: "Best soldering irons" },
      { href: "/soldering-irons/reviews", label: "Reviews" },
      { href: "/soldering-irons/comparisons", label: "Comparisons" },
      { href: "/soldering-irons/guides", label: "Guides" },
      { href: "/soldering-irons/soldering-iron-buying-guide", label: "Buying guide" },
    ],
  },
  {
    label: "Oscilloscopes",
    dot: "bg-cat-oscilloscopes",
    links: [
      { href: "/oscilloscopes", label: "All oscilloscopes" },
      { href: "/oscilloscopes/best-beginner-oscilloscopes", label: "Best beginner scopes" },
      { href: "/oscilloscopes/reviews", label: "Reviews" },
      { href: "/oscilloscopes/comparisons", label: "Comparisons" },
      { href: "/oscilloscopes/guides", label: "Guides" },
      { href: "/oscilloscopes/oscilloscope-buying-guide", label: "Buying guide" },
    ],
  },
];

const COMPANY = [
  { href: "/about", label: "About OhmSavvy" },
  { href: "/contact", label: "Contact us" },
  { href: "/about#how-we-review", label: "How we test" },
  { href: "/about#ratings", label: "Our ratings" },
  { href: "/about#standards", label: "Editorial standards" },
  { href: "/about#how-were-funded", label: "Affiliate disclosure" },
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms-of-service", label: "Terms of service" },
];

const START_HERE = [
  { href: "/multimeters/how-to-use-a-multimeter", label: "How to use a multimeter" },
  { href: "/soldering-irons/how-to-use-a-soldering-iron", label: "How to use a soldering iron" },
  { href: "/oscilloscopes/how-to-use-an-oscilloscope", label: "How to use an oscilloscope" },
];

const TRUST = ["Top picks bought and tested", "Specs verified at the source"];

const linkClass = "text-muted hover:text-foreground transition-colors";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-raised">
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-10 grid gap-10 grid-cols-2 md:grid-cols-4 lg:grid-cols-12">
        <div className="col-span-2 md:col-span-4 lg:col-span-4">
          <Link href="/" aria-label="OhmSavvy home">
            <Logo />
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted leading-6">
            Specification-based reviews of multimeters, soldering irons and oscilloscopes, verified against
            manufacturer data, not marketing copy.
          </p>
          <ul className="mt-5 space-y-2 text-sm">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal-bg text-signal" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6.5l2.2 2.2L9.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <p className="font-display text-xs text-muted uppercase tracking-wide mb-2">New here? Start with</p>
            <div className="flex flex-wrap gap-2">
              {START_HERE.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  prefetch={false}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted hover:border-accent hover:text-accent transition-colors"
                >
                  {s.label} →
                </Link>
              ))}
            </div>
          </div>
        </div>

        {CATEGORIES.map((c) => (
          <nav key={c.label} aria-label={c.label} className="lg:col-span-2">
            <p className="mb-4 flex items-center gap-2 font-display text-xs uppercase tracking-wide text-foreground">
              <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} aria-hidden="true" />
              {c.label}
            </p>
            <ul className="space-y-2.5 text-sm">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} prefetch={false} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav aria-label="Company" className="lg:col-span-2">
          <p className="mb-4 font-display text-xs uppercase tracking-wide text-foreground">Company</p>
          <ul className="space-y-2.5 text-sm">
            {COMPANY.map((l) => (
              <li key={l.href}>
                <Link href={l.href} prefetch={false} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-muted">
          <p className="max-w-2xl leading-5">
            As an Amazon Associate I earn from qualifying purchases. OhmSavvy is reader-supported: when you buy through
            links on our site, we may earn an affiliate commission at no extra cost to you.
          </p>
          <div className="flex shrink-0 items-center gap-5">
            <p>© 2026 OhmSavvy. All rights reserved.</p>
            <a href="#" className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 hover:border-accent hover:text-accent transition-colors">
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
