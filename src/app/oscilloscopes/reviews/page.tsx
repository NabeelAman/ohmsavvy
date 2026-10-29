import Link from "next/link";
import { CategoryListing } from "@/components/CategoryListing";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Oscilloscope Reviews",
  description: "Oscilloscope reviews weighed on bandwidth, sample rate, and channel count against the signals you're likely to debug, not spec-sheet bragging rights.",
  path: "/oscilloscopes/reviews",
});

export default function OscilloscopesReviewsPage() {
  return (
    <CategoryListing
      category="oscilloscopes"
      type="review"
      heading="Oscilloscope Reviews"
      intro="Bandwidth and channel count only matter relative to what you're actually debugging, so each review here starts from the kind of signal work a scope is realistically good for — hobby electronics, microcontroller timing, general bench use — before getting into display size and extras like a built-in waveform generator."
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
      <Link href="/oscilloscopes/guides" className="text-accent hover:underline">
        All oscilloscope guides
      </Link>
    </CategoryListing>
  );
}
