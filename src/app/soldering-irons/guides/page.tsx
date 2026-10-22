import { GuideListing } from "@/components/GuideListing";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Soldering Iron Guides: How-Tos and Buying Help",
  description: "Every OhmSavvy soldering guide in one place: technique, temperatures, tips and tip care, SMD work, troubleshooting and choosing the right iron for the job.",
  path: "/soldering-irons/guides",
});

export default function SolderingIronGuidesPage() {
  return (
    <GuideListing
      category="soldering-irons"
      path="/soldering-irons/guides"
      intro="From your first through-hole joint to fine-pitch SMD rework, these guides cover the technique that makes solder flow: tip choice and care, temperatures for each alloy, flux, wire and connector joints, and what to do when solder beads up, bridges or lifts a pad. When you need a new iron or station, the buying guide and use-case picks compare what fits each kind of work."
    />
  );
}
