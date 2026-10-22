import { GuideListing } from "@/components/GuideListing";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Oscilloscope Guides: How-Tos and Buying Help",
  description: "Every OhmSavvy oscilloscope guide in one place: reading the screen, triggering, measuring voltage, frequency, ripple and PWM, bandwidth and sample rate.",
  path: "/oscilloscopes/guides",
});

export default function OscilloscopeGuidesPage() {
  return (
    <GuideListing
      category="oscilloscopes"
      path="/oscilloscopes/guides"
      intro="New to scopes or chasing a stubborn glitch? Start by reading the graticule and getting a stable trigger, then move on to real measurements: ripple on a supply rail, PWM duty cycle, square-wave edges, overshoot, propagation delay and channel math. Explainers on bandwidth, sample rate and probes show what the specs mean before you buy, and the buying guide narrows down the right first scope."
    />
  );
}
