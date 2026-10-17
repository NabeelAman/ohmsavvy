export function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="space-y-3 text-sm">
      <div>
        <p className="font-display text-xs text-signal uppercase tracking-wide mb-1.5">Reasons to buy</p>
        <ul className="space-y-1.5">
          {pros.map((pro) => (
            <li key={pro} className="flex gap-2">
              <span className="text-signal">+</span>
              <span className="text-muted">{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-display text-xs text-accent uppercase tracking-wide mb-1.5">Reasons to avoid</p>
        <ul className="space-y-1.5">
          {cons.map((con) => (
            <li key={con} className="flex gap-2">
              <span className="text-accent">−</span>
              <span className="text-muted">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
