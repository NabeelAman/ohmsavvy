import Link from "next/link";
import { CategoryListing } from "@/components/CategoryListing";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-beginner-oscilloscopes/page";

export const metadata = buildMetadata({
  title: "Oscilloscope Comparisons",
  description: "Head-to-head oscilloscope comparisons: specs side by side, the differences that matter, and which model to choose for your work.",
  path: "/oscilloscopes/comparisons",
});

export default function OscilloscopesComparisonsPage() {
  return (
    <CategoryListing
      category="oscilloscopes"
      type="comparison"
      picks={picks}
      heading="Oscilloscope Comparisons"
      intro="Head-to-head comparisons between the oscilloscopes in our guide. Each one puts verified specs side by side and tells you which model fits which buyer."
    >
      <Link href="/oscilloscopes/best-beginner-oscilloscopes" className="font-medium text-accent hover:underline">
        Best beginner oscilloscopes
      </Link>
      <Link href="/oscilloscopes/reviews" className="text-accent hover:underline">
        All oscilloscope reviews
      </Link>
      <Link href="/oscilloscopes/oscilloscope-buying-guide" className="text-accent hover:underline">
        Oscilloscope buying guide
      </Link>
    </CategoryListing>
  );
}
