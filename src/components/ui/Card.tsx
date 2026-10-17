export function Card({
  children,
  raised = false,
  padding = "p-6",
  className = "",
}: {
  children: React.ReactNode;
  raised?: boolean;
  padding?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-border ${raised ? "bg-surface-raised" : "bg-surface"} ${padding} ${className}`}
    >
      {children}
    </div>
  );
}
