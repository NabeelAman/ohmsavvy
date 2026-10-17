const variants = {
  accent: "bg-accent/10 text-accent",
  signal: "bg-signal-bg text-signal",
} as const;

export type BadgeVariant = keyof typeof variants;

export function Badge({
  children,
  variant = "signal",
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
}) {
  return (
    <span
      className={`font-display text-xs uppercase tracking-wide px-2.5 py-1 rounded ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
