export function Eyebrow({
  children,
  className = "text-accent",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`font-display text-sm mb-3 tracking-wide ${className}`}>{children}</p>;
}
