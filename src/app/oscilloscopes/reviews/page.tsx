import Link from "next/link";
import { CategoryListing } from "@/components/CategoryListing";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Oscilloscope Reviews",
  description: "Every oscilloscope we review, in one place: verified specs, honest strengths and limitations, and who each model actually suits.",
  path: "/oscilloscopes/reviews",
});

export default function OscilloscopesReviewsPage() {
  return (
    <CategoryListing
      category="oscilloscopes"
      type="review"
      heading="Oscilloscope Reviews"
      intro="In-depth reviews of every oscilloscope in our guide. Each one covers verified specs, who it suits and who should skip it, and the alternatives worth considering."
    >
      <Link href="/oscilloscopes/best-beginner-oscilloscopes" className="font-medium text-accent hover:underline">
        Best beginner oscilloscopes
      </Link>
      <Link href="/oscilloscopes/comparisons" className="text-accent hover:underline">
        All oscilloscope comparisons
      </Link>
      <Link href="/oscilloscopes/oscilloscope-buying-guide" className="text-accent hover:underline">
        Oscilloscope buying guide
      </Link>
    </CategoryListing>
  );
}
