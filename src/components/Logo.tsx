export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="7" fill="currentColor" className="text-accent" />
      {/* Omega mark */}
      <path
        d="M10.5 22h2.3l0.8-2.4c-1.5-1.1-2.4-2.7-2.4-4.9 0-3 1.9-5 4.3-5s4.3 2 4.3 5c0 2.2-0.9 3.8-2.4 4.9l0.8 2.4h2.3"
        fill="none"
        stroke="var(--accent-foreground)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Signal waveform accent, underlining the Omega like a trace on a scope */}
      <path
        d="M7 25.5h2l1.2-2.6 1.6 4 1.4-3.2h1.6l1-1.8 1 1.8h1.6l1.4 3.2 1.6-4 1.2 2.6h2"
        fill="none"
        stroke="var(--accent-foreground)"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
      <LogoMark size={size} />
      OhmSavvy
    </span>
  );
}
