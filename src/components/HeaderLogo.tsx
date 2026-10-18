import Link from "next/link";

// Scoped keyframes for the logo (kept here rather than in globals.css so the
// whole effect lives in one file). The header persists across client-side
// navigation, so the draw-in plays once per visit, not on every page.
const LOGO_CSS = `
@keyframes os-draw { from { stroke-dashoffset: 100 } to { stroke-dashoffset: 0 } }
@keyframes os-dot { 0%, 70% { opacity: 0; transform: scale(0.3) } 100% { opacity: 1; transform: scale(1) } }
@keyframes os-beam { from { stroke-dashoffset: 0 } to { stroke-dashoffset: -100 } }
.os-logo .os-trace { stroke-dasharray: 100; animation: os-draw 1.1s cubic-bezier(0.65, 0, 0.35, 1) 0.15s both }
.os-logo .os-dot { transform-box: fill-box; transform-origin: center; animation: os-dot 1.35s cubic-bezier(0.2, 0.8, 0.2, 1) both; transition: filter 0.3s ease }
.os-logo .os-beam { stroke-dasharray: 10 90; opacity: 0; filter: drop-shadow(0 0 1.6px var(--accent)) drop-shadow(0 0 3px var(--accent)); transition: opacity 0.3s ease }
.os-logo:hover .os-beam, .os-logo:focus-visible .os-beam { opacity: 1; animation: os-beam 1.4s linear infinite }
.os-logo:hover .os-dot, .os-logo:focus-visible .os-dot { filter: drop-shadow(0 0 2.5px var(--accent)) }
.os-logo .os-word { background-size: 200% 100%; background-position: 0% 0; transition: background-position 0.6s ease }
.os-logo:hover .os-word { background-position: 100% 0 }
@media (prefers-reduced-motion: reduce) {
  .os-logo .os-trace, .os-logo .os-dot { animation: none }
  .os-logo:hover .os-beam, .os-logo:focus-visible .os-beam { animation: none; opacity: 0 }
}
`;

const TRACE = "M1 9 C4 1,8 1,11 9 C14 17,18 17,21 9 L26 9";

/**
 * Header logo. On first load the signal trace draws itself in and the probe
 * node settles; on hover a bright pulse travels along the trace like a scope
 * beam and the node glows. CSS only, static under prefers-reduced-motion.
 */
export function HeaderLogo() {
  return (
    <Link
      href="/"
      aria-label="OhmSavvy home"
      className="os-logo group/logo inline-flex items-center gap-2.5 rounded-xl font-display text-lg font-bold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
    >
      <style>{LOGO_CSS}</style>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent/15 to-accent/5 ring-1 ring-accent/25 shadow-sm transition-all duration-300 ease-out group-hover/logo:-translate-y-px group-hover/logo:ring-accent/45 group-hover/logo:shadow-md motion-reduce:transition-none">
        <svg width="26" height="15" viewBox="0 0 32 18" aria-hidden className="overflow-visible">
          <path
            className="os-trace text-accent"
            d={TRACE}
            pathLength={100}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* travelling highlight, only visible on hover */}
          <path
            className="os-beam"
            d={TRACE}
            pathLength={100}
            fill="none"
            stroke="#fff1d0"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle className="os-dot text-accent" cx="26" cy="9" r="1.9" fill="currentColor" />
        </svg>
      </span>
      <span>
        <span className="text-foreground">Ohm</span>
        <span className="os-word bg-gradient-to-r from-accent via-cat-soldering to-accent bg-clip-text text-transparent">Savvy</span>
      </span>
    </Link>
  );
}
