export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={(size * 18) / 32}
      viewBox="0 0 32 18"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Signal-trace mark: a smooth sine waveform, like an oscilloscope readout, with a probe-tip node */}
      <path
        d="M1 9 C4 1,8 1,11 9 C14 17,18 17,21 9 L26 9"
        fill="none"
        stroke="currentColor"
        className="text-accent"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="26" cy="9" r="1.9" fill="currentColor" className="text-accent" />
    </svg>
  );
}

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight">
      <LogoMark size={size} />
      <span>
        <span className="text-foreground">Ohm</span>
        <span className="text-accent">Savvy</span>
      </span>
    </span>
  );
}
