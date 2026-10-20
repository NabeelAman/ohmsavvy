import Link from "next/link";
import { CategoryListing } from "@/components/CategoryListing";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Soldering Iron Reviews",
  description: "Soldering iron reviews focused on heat-up time, thermal recovery under load, and temperature stability — the specs that actually change how a repair goes.",
  path: "/soldering-irons/reviews",
});

export default function SolderingIronsReviewsPage() {
  return (
    <CategoryListing
      category="soldering-irons"
      type="review"
      heading="Soldering Iron Reviews"
      intro="Heat-up time and temperature stability under real use get checked first here, because that's what actually separates a frustrating session from an easy one. Each review also covers build quality, tip availability, and the kind of work — bench repair, portable fixes, first-time soldering — each iron is genuinely built for."
    >
      <Link href="/soldering-irons/best-soldering-irons" className="font-medium text-accent hover:underline">
        Best soldering irons
      </Link>
      <Link href="/soldering-irons/comparisons" className="text-accent hover:underline">
        All soldering iron comparisons
      </Link>
      <Link href="/soldering-irons/soldering-iron-buying-guide" className="text-accent hover:underline">
        Soldering iron buying guide
      </Link>
    </CategoryListing>
  );
}
