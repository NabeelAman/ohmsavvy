import Link from "next/link";
import { CategoryListing } from "@/components/CategoryListing";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Multimeter Comparisons",
  description: "Multimeter head-to-heads built around the one spec that actually decides most purchases: CAT safety rating versus the work you'll actually use the meter for.",
  path: "/multimeters/comparisons",
});

export default function MultimetersComparisonsPage() {
  return (
    <CategoryListing
      category="multimeters"
      type="comparison"
      heading="Multimeter Comparisons"
      intro="Most multimeter decisions come down to a safety-rating or feature trade-off — CAT II versus CAT III, True RMS versus a cheaper average-responding meter, a clamp function versus a standard probe setup. Each comparison here names that trade-off directly instead of burying it under a spec table."
    >
      <Link href="/multimeters/best-multimeters" className="font-medium text-accent hover:underline">
        Best multimeters
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
