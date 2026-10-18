import Link from "next/link";
import { CategoryListing } from "@/components/CategoryListing";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Soldering Iron Comparisons",
  description: "Head-to-head soldering iron comparisons: specs side by side, the differences that matter, and which model to choose for your work.",
  path: "/soldering-irons/comparisons",
});

export default function SolderingIronsComparisonsPage() {
  return (
    <CategoryListing
      category="soldering-irons"
      type="comparison"
      heading="Soldering Iron Comparisons"
      intro="Head-to-head comparisons between the soldering irons in our guide. Each one puts verified specs side by side and tells you which model fits which buyer."
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
