import Link from "next/link";
import { CategoryListing } from "@/components/CategoryListing";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Multimeter Reviews",
  description: "Multimeter reviews built around CAT safety rating and True RMS accuracy first, then features — with an honest list of who should buy something else instead.",
  path: "/multimeters/reviews",
});

export default function MultimetersReviewsPage() {
  return (
    <CategoryListing
      category="multimeters"
      type="review"
      heading="Multimeter Reviews"
      intro="Before anything else, every review here checks the safety rating and True RMS accuracy against what the meter is actually sold for. From there we cover resolution, build quality, and the specific buyer each model is a good fit for — and who'd be better off with a different pick entirely."
    >
      <Link href="/multimeters/best-multimeters" className="font-medium text-accent hover:underline">
        Top 10 multimeters
      </Link>
      <Link href="/multimeters/comparisons" className="text-accent hover:underline">
        All multimeter comparisons
      </Link>
      <Link href="/multimeters/multimeter-buying-guide" className="text-accent hover:underline">
        Multimeter buying guide
      </Link>
    </CategoryListing>
  );
}
