import Link from "next/link";
import { CategoryListing } from "@/components/CategoryListing";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Soldering Iron Comparisons",
  description: "Soldering iron comparisons centered on the trade-off that matters per pair: heat-up speed, ESD-safe construction, or a complete kit versus a bare iron.",
  path: "/soldering-irons/comparisons",
});

export default function SolderingIronsComparisonsPage() {
  return (
    <CategoryListing
      category="soldering-irons"
      type="comparison"
      heading="Soldering Iron Comparisons"
      intro="Two irons at a similar price rarely differ on power alone — it's usually heat-up speed, ESD-safe construction, portability, or whether a stand and tips come in the box. Each comparison here is built around whichever of those is the actual deciding factor for that specific pair."
    >
      <Link href="/soldering-irons/best-soldering-irons" className="font-medium text-accent hover:underline">
        Best soldering irons
      </Link>
      <Link href="/soldering-irons/reviews" className="text-accent hover:underline">
        All soldering iron reviews
      </Link>
      <Link href="/soldering-irons/soldering-iron-buying-guide" className="text-accent hover:underline">
        Soldering iron buying guide
      </Link>
    </CategoryListing>
  );
}
