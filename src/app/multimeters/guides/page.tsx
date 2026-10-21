import Link from "next/link";
import { GuideListing } from "@/components/GuideListing";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Multimeter Guides: How-Tos and Buying Help",
  description: "Every OhmSavvy multimeter guide in one place: how to measure voltage, current and resistance, test parts, read accuracy specs, and pick the right meter.",
  path: "/multimeters/guides",
});

export default function MultimeterGuidesPage() {
  return (
    <>
      <GuideListing
        category="multimeters"
        path="/multimeters/guides"
        intro="Step-by-step how-to guides for measuring voltage, current and resistance, testing components and cars, plus buying guides and picks for each kind of work."
      />
      <div className="mx-auto max-w-6xl px-6 pb-16 -mt-4 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-8 text-sm">
        <Link href="/multimeters/best-multimeters" className="font-medium text-accent hover:underline">
          Best multimeters
        </Link>
        <Link href="/multimeters/reviews" className="text-accent hover:underline">
          All multimeter reviews
        </Link>
        <Link href="/multimeters/comparisons" className="text-accent hover:underline">
          All multimeter comparisons
        </Link>
      </div>
    </>
  );
}
