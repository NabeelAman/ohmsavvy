import { GuideListing } from "@/components/GuideListing";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Multimeter Guides: How-Tos and Buying Help",
  description: "Every OhmSavvy multimeter guide in one place: how to measure voltage, current and resistance, test parts, read accuracy specs, and pick the right meter.",
  path: "/multimeters/guides",
});

export default function MultimeterGuidesPage() {
  return (
    <GuideListing
      category="multimeters"
      path="/multimeters/guides"
      intro="Whether you are chasing a dead car battery, checking a MOSFET on a repair bench or working out what OL means on the display, these guides walk through each measurement step by step: which jack and range to use, where the probes go, what a good reading looks like and the safety rules that apply. Buying guides and job-by-job picks help when it is time for a new meter."
    />
  );
}
