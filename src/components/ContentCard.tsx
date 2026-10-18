import Image from "next/image";
import Link from "next/link";
import { picksForEntry } from "@/lib/catalog";
import type { ContentEntry } from "@/lib/content";
import type { Pick } from "./ReviewArticle";
import { Badge } from "./ui/Badge";
import { Stars } from "./ui/Stars";

function Thumb({ pick, tall }: { pick: Pick; tall: boolean }) {
  return (
    <div
      className={`relative ${tall ? "h-40" : "h-28"} flex-1 min-w-0 flex items-center justify-center rounded-md bg-white border border-border/60`}
    >
      {pick.image ? (
        <Image src={pick.image} alt={pick.name} fill sizes="200px" loading="lazy" className="object-contain p-3" />
      ) : (
        <span className="px-3 text-center text-[11px] text-muted">Photo pending</span>
      )}
    </div>
  );
}

/** A review or comparison card with the verified product photo(s), award badge and rating. */
export function ContentCard({ entry }: { entry: ContentEntry }) {
  const matched = picksForEntry(entry);
  const isReview = entry.type === "review";
  const shown = isReview ? matched.slice(0, 1) : matched.slice(0, 2);

  return (
    <Link
      href={entry.href}
      className="group min-w-0 rounded-lg border border-border bg-surface overflow-hidden shadow-sm hover:shadow-md hover:border-accent transition-all flex flex-col"
    >
      {shown.length > 0 && (
        <div className="relative flex gap-2 p-3 pb-0">
          {shown.map((p) => (
            <Thumb key={p.name} pick={p} tall={isReview} />
          ))}
          {!isReview && shown.length === 2 && (
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-1.5 rounded-full bg-accent text-accent-foreground font-display text-[11px] font-semibold px-2 py-1 shadow">
              VS
            </span>
          )}
        </div>
      )}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {isReview && shown[0] && (
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="signal">{shown[0].badge}</Badge>
            <Stars rating={shown[0].rating} />
          </div>
        )}
        <p className="font-semibold leading-snug group-hover:text-accent transition-colors">{entry.title}</p>
        <p className="text-sm text-muted leading-6 flex-1">{entry.description}</p>
        <span className="text-sm font-medium text-accent">
          {isReview ? "Read the review →" : "See the comparison →"}
        </span>
      </div>
    </Link>
  );
}
