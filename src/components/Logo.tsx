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
      {/* Signal-trace mark: an oscilloscope/multimeter waveform with a probe-tip node */}
      <path
        d="M5 17h4l2.2-7 3.4 14 3-11.5 2 4.5h4.6"
        fill="none"
        stroke="var(--accent-foreground)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24.8" cy="17" r="1.8" fill="var(--accent-foreground)" />
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
