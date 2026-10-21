import Link from "next/link";
import { GuideListing } from "@/components/GuideListing";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Oscilloscope Guides: How-Tos and Buying Help",
  description: "Every OhmSavvy oscilloscope guide in one place: reading the screen, triggering, measuring voltage, frequency, ripple and PWM, bandwidth and sample rate.",
  path: "/oscilloscopes/guides",
});

export default function OscilloscopeGuidesPage() {
  return (
    <>
      <GuideListing
        category="oscilloscopes"
        path="/oscilloscopes/guides"
        intro="Plain-English guides to reading the screen, triggering, probes and measurements like voltage, frequency, ripple and PWM, plus what bandwidth and sample rate really mean."
      />
      <div className="mx-auto max-w-6xl px-6 pb-16 -mt-4 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-8 text-sm">
        <Link href="/oscilloscopes/best-beginner-oscilloscopes" className="font-medium text-accent hover:underline">
          Best beginner oscilloscopes
        </Link>
        <Link href="/oscilloscopes/reviews" className="text-accent hover:underline">
          All oscilloscope reviews
        </Link>
        <Link href="/oscilloscopes/comparisons" className="text-accent hover:underline">
          All oscilloscope comparisons
        </Link>
      </div>
    </>
  );
}
