export function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="font-display text-sm text-accent">{rating.toFixed(1)}</span>
      <span className="text-accent text-xs">
        {"★".repeat(Math.round(rating))}
        {"☆".repeat(5 - Math.round(rating))}
      </span>
    </span>
  );
}
