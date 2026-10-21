import Link from "next/link";
import { GuideListing } from "@/components/GuideListing";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Soldering Iron Guides: How-Tos and Buying Help",
  description: "Every OhmSavvy soldering guide in one place: technique, temperatures, tips and tip care, SMD work, troubleshooting and choosing the right iron for the job.",
  path: "/soldering-irons/guides",
});

export default function SolderingIronGuidesPage() {
  return (
    <>
      <GuideListing
        category="soldering-irons"
        path="/soldering-irons/guides"
        intro="Step-by-step soldering technique, temperatures, tips and tip care, SMD and rework, troubleshooting, plus buying guides and picks for each kind of work."
      />
      <div className="mx-auto max-w-6xl px-6 pb-16 -mt-4 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-8 text-sm">
        <Link href="/soldering-irons/best-soldering-irons" className="font-medium text-accent hover:underline">
          Best soldering irons
        </Link>
        <Link href="/soldering-irons/reviews" className="text-accent hover:underline">
          All soldering iron reviews
        </Link>
        <Link href="/soldering-irons/comparisons" className="text-accent hover:underline">
          All soldering iron comparisons
        </Link>
      </div>
    </>
  );
}
