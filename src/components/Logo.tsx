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
      {/* Signal-trace mark: a smooth sine waveform, like an oscilloscope readout, with a probe-tip node */}
      <path
        d="M4 16 C7 8,11 8,14 16 C17 24,21 24,24 16 L28 16"
        fill="none"
        stroke="var(--accent-foreground)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="28" cy="16" r="1.8" fill="var(--accent-foreground)" />
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
