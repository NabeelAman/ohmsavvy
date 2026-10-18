import Link from "next/link";
import { CategoryListing } from "@/components/CategoryListing";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

export const metadata = buildMetadata({
  title: "Soldering Iron Reviews",
  description: "Every soldering iron we review, in one place: verified specs, honest strengths and limitations, and who each model actually suits.",
  path: "/soldering-irons/reviews",
});

export default function SolderingIronsReviewsPage() {
  return (
    <CategoryListing
      category="soldering-irons"
      type="review"
      picks={picks}
      heading="Soldering Iron Reviews"
      intro="In-depth reviews of every soldering iron in our guide. Each one covers verified specs, who it suits and who should skip it, and the alternatives worth considering."
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
