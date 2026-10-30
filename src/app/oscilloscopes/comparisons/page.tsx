import Link from "next/link";
import { CategoryListing } from "@/components/CategoryListing";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Oscilloscope Comparisons",
  description: "Oscilloscope comparisons built around bandwidth headroom, channel count, and the compact-combo trade-offs that actually decide which scope earns bench space.",
  path: "/oscilloscopes/comparisons",
});

export default function OscilloscopesComparisonsPage() {
  return (
    <CategoryListing
      category="oscilloscopes"
      type="comparison"
      heading="Oscilloscope Comparisons"
      intro="The scopes in this category tend to differ on one or two axes at most — bandwidth headroom, channel count, or a built-in waveform generator traded for fewer channels. Each comparison isolates that specific trade-off rather than restating a spec sheet both scopes already share."
    >
      <Link href="/oscilloscopes/best-beginner-oscilloscopes" className="py-1 font-medium text-accent hover:underline">
        Best beginner oscilloscopes
      </Link>
      <Link href="/oscilloscopes/reviews" className="py-1 text-accent hover:underline">
        All oscilloscope reviews
      </Link>
      <Link href="/oscilloscopes/oscilloscope-buying-guide" className="py-1 text-accent hover:underline">
        Oscilloscope buying guide
      </Link>
    </CategoryListing>
  );
}
