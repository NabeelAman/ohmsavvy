import { SpecValue } from "./SpecValue";

export type Spec = { label: string; value: string };

export function SpecList({ specs }: { specs: Spec[] }) {
  return (
    <dl className="rounded-lg border border-border bg-surface p-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm h-fit">
      {specs.map((s) => (
        <div key={s.label} className="contents">
          <dt className="text-muted">{s.label}</dt>
          <dd className="font-medium text-right">
            <SpecValue value={s.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
