import Link from "next/link";
import { CategoryListing } from "@/components/CategoryListing";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-multimeters/page";

export const metadata = buildMetadata({
  title: "Multimeter Comparisons",
  description: "Head-to-head multimeter comparisons: specs side by side, the differences that matter, and which model to choose for your work.",
  path: "/multimeters/comparisons",
});

export default function MultimetersComparisonsPage() {
  return (
    <CategoryListing
      category="multimeters"
      type="comparison"
      picks={picks}
      heading="Multimeter Comparisons"
      intro="Head-to-head comparisons between the multimeters in our guide. Each one puts verified specs side by side and tells you which model fits which buyer."
    >
      <Link href="/multimeters/best-multimeters" className="font-medium text-accent hover:underline">
        Top 10 multimeters
      </Link>
      <Link href="/multimeters/reviews" className="text-accent hover:underline">
        All multimeter reviews
      </Link>
      <Link href="/multimeters/multimeter-buying-guide" className="text-accent hover:underline">
        Multimeter buying guide
      </Link>
    </CategoryListing>
  );
}
