import Link from "next/link";
import { CategoryListing } from "@/components/CategoryListing";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

export const metadata = buildMetadata({
  title: "Multimeter Reviews",
  description: "Every multimeter we review, in one place: verified specs, honest strengths and limitations, and who each model actually suits.",
  path: "/multimeters/reviews",
});

export default function MultimetersReviewsPage() {
  return (
    <CategoryListing
      category="multimeters"
      type="review"
      picks={picks}
      heading="Multimeter Reviews"
      intro="In-depth reviews of every multimeter in our guide. Each one covers verified specs, who it suits and who should skip it, and the alternatives worth considering."
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
