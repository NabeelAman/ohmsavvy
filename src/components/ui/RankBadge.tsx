export function RankBadge({ rank }: { rank: number }) {
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground font-display text-sm font-semibold shrink-0">
      #{rank}
    </span>
  );
}
