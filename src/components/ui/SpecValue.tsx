export function SpecValue({ value }: { value: string }) {
  const normalized = value.trim().toLowerCase();
  if (normalized === "yes") {
    return (
      <span className="inline-flex items-center gap-1 text-signal font-medium">
        <span aria-hidden>✓</span> Yes
      </span>
    );
  }
  if (normalized === "no") {
    return (
      <span className="inline-flex items-center gap-1 text-muted">
        <span aria-hidden>✕</span> No
      </span>
    );
  }
  return <>{value}</>;
}
