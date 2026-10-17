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
      <path
        d="M11 21.5h2.3l0.9-2.6C12.6 17.7 11.6 16 11.6 13.7c0-3.1 2-5.2 4.4-5.2s4.4 2.1 4.4 5.2c0 2.3-1 4-2.6 5.2l0.9 2.6H21"
        fill="none"
        stroke="var(--accent-foreground)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
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
