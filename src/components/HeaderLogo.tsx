import Link from "next/link";

/**
 * Header logo with motion: the sine trace is drawn twice as long as it shows and
 * clipped, so on hover it slides one period and reads as a live signal; the probe
 * node pulses. Pure CSS (no JS), and static under prefers-reduced-motion.
 */
export function HeaderLogo() {
  return (
    <Link href="/" aria-label="OhmSavvy home" className="group/logo inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 ring-1 ring-accent/20 transition-all duration-300 group-hover/logo:bg-accent/15 group-hover/logo:ring-accent/40 group-hover/logo:shadow-[0_0_18px_-4px_var(--accent)]">
        <svg width="26" height="15" viewBox="0 0 32 18" aria-hidden className="overflow-visible">
          <defs>
            <clipPath id="logo-trace-clip">
              <rect x="0" y="0" width="26" height="18" />
            </clipPath>
          </defs>
          <g clipPath="url(#logo-trace-clip)">
            <path
              d="M-19 9 C-16 1,-12 1,-9 9 C-6 17,-2 17,1 9 C4 1,8 1,11 9 C14 17,18 17,21 9 C24 1,28 1,31 9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              className="text-accent transition-transform duration-[900ms] ease-in-out group-hover/logo:translate-x-[20px] motion-reduce:transition-none"
            />
          </g>
          <circle cx="26" cy="9" r="4" fill="currentColor" className="text-accent opacity-0 group-hover/logo:animate-ping group-hover/logo:opacity-40 motion-reduce:animate-none" />
          <circle cx="26" cy="9" r="1.9" fill="currentColor" className="text-accent" />
        </svg>
      </span>
      <span>
        <span className="text-foreground">Ohm</span>
        <span className="bg-gradient-to-r from-accent to-cat-soldering bg-clip-text text-transparent">Savvy</span>
      </span>
    </Link>
  );
}
