import Link from "@/components/AppLink";
import { CategoryListing } from "@/components/CategoryListing";
import { ListingGuide } from "@/components/ListingGuide";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Soldering Iron Comparisons",
  description: "Soldering iron comparisons centered on the trade-off that matters per pair: heat-up speed, ESD-safe construction, or a complete kit versus a bare iron.",
  path: "/soldering-irons/comparisons",
});

const link = "text-accent hover:underline";

export default function SolderingIronsComparisonsPage() {
  return (
    <>
      <CategoryListing
        category="soldering-irons"
        type="comparison"
        heading="Soldering Iron Comparisons"
        intro="Two irons at a similar price rarely differ on power alone — it's usually heat-up speed, ESD-safe construction, portability, or whether a stand and tips come in the box. Each comparison here is built around whichever of those is the actual deciding factor for that specific pair."
      >
        <Link href="/soldering-irons/best-soldering-irons" className="py-1 font-medium text-accent hover:underline">
          Best soldering irons
        </Link>
        <Link href="/soldering-irons/reviews" className="py-1 text-accent hover:underline">
          All soldering iron reviews
        </Link>
        <Link href="/soldering-irons/soldering-iron-buying-guide" className="py-1 text-accent hover:underline">
          Soldering iron buying guide
        </Link>
      </CategoryListing>

      <ListingGuide
        chooseTitle="How to pick the right comparison for your shortlist"
        chooseIntro={
          <>
            Most people land here with two irons in mind and one nagging doubt. Work out which kind of choice you are really
            making first; the right comparison is the one built around that question, not the one with the longest spec table.
          </>
        }
        criteria={[
          {
            title: "Bench station vs pen iron",
            body: (
              <>
                If you are torn between a mains-powered station and a compact USB-C iron, the real trade is a fixed bench setup
                against portability. Pairs such as the{" "}
                <Link href="/soldering-irons/pinecil-v2-vs-hakko-fx-888dx" className={link}>
                  Pinecil V2 vs Hakko FX-888DX
                </Link>{" "}
                are built around that split.
              </>
            ),
          },
          {
            title: "Two stations at a similar price",
            body: (
              <>
                Between two bench stations, the deciding points are usually temperature control, the tip series each takes and
                the stand. The{" "}
                <Link href="/soldering-irons/weller-we1010-vs-hakko-fx-888dx" className={link}>
                  Weller WE1010 vs Hakko FX-888DX
                </Link>{" "}
                comparison is a good example.
              </>
            ),
          },
          {
            title: "Two portable irons",
            body: (
              <>
                For pocket irons, look at the power input each accepts, the tips available and the screen and controls. See the{" "}
                <Link href="/soldering-irons/pinecil-v2-vs-ts101-soldering-iron" className={link}>
                  Pinecil V2 vs TS101
                </Link>{" "}
                and{" "}
                <Link href="/soldering-irons/ts101-vs-fnirsi-hs-02a" className={link}>
                  TS101 vs FNIRSI HS-02A
                </Link>
                .
              </>
            ),
          },
          {
            title: "Iron only or iron plus hot air",
            body: (
              <>
                If you rework surface-mount parts, a 2-in-1 station with a hot air gun may suit you better than a second iron.
                The{" "}
                <Link href="/soldering-irons/weller-we1010na-vs-yihua-862bd-plus" className={link}>
                  Weller WE1010NA vs YIHUA 862BD+
                </Link>{" "}
                comparison covers that choice.
              </>
            ),
          },
          {
            title: "Budget kit vs better iron",
            body: (
              <>
                A low-cost kit gets you started with everything in one box; a better iron costs more but holds temperature
                properly. The{" "}
                <Link href="/soldering-irons/pinecil-v2-vs-q-ming-60w-kit" className={link}>
                  Pinecil V2 vs Q-MING 60W kit
                </Link>{" "}
                comparison weighs exactly that.
              </>
            ),
          },
          {
            title: "Total cost, not sticker price",
            body: "Add up what each option needs before you can solder: a stand, a USB-C power supply for a pen iron, spare tips, solder and flux. A comparison that looks close on price can split clearly once the extras are counted.",
          },
        ]}
        processTitle="How OhmSavvy compares soldering irons"
        process={[
          <>
            Each comparison puts both irons&apos; specs side by side, taken from the maker&apos;s datasheet, manual or product
            page or the official Amazon listing. Where a figure isn&apos;t published, the table says &quot;Not stated&quot;
            rather than guessing, and where two sources disagree, we point that out.
          </>,
          <>
            We then pick the one or two differences that actually decide the pair and explain who should buy which iron. Any
            iron in a comparison that we have bought and used on our bench carries a Hands-on Tested badge; for the others we
            work from published data and verified owner feedback, and we never present that as our own testing.
          </>,
          <>
            If one of the two irons stops being sold on Amazon, the comparison stays online with a notice and its buy button
            points to the closest current alternative. How we fund the site and rate products is set out on our{" "}
            <Link href="/about" className={link}>
              about page
            </Link>
            .
          </>,
        ]}
        related={[
          { href: "/soldering-irons/best-soldering-irons", label: "Best soldering irons", note: "Our ranked list if you'd rather start from the top picks." },
          { href: "/soldering-irons/what-wattage-soldering-iron-do-i-need", label: "What wattage soldering iron do I need?", note: "Make sense of power figures before comparing two irons." },
          { href: "/soldering-irons/soldering-iron-tip-types", label: "Soldering iron tip types", note: "Which tip shapes to check each iron can take." },
          { href: "/soldering-irons/best-soldering-iron-for-rework", label: "Best soldering iron for rework", note: "Picks for desoldering and surface-mount repair." },
          { href: "/soldering-irons/reviews", label: "Soldering iron reviews", note: "The full write-up on a single iron." },
        ]}
        faqs={[
          {
            q: "How do you decide which soldering irons to compare?",
            a: "We pair irons that buyers genuinely weigh against each other: similar price, similar use, or a common upgrade path, such as a budget kit against a better pen iron. Every iron in a comparison has to be on sale on Amazon when we publish it.",
          },
          {
            q: "Are the specs in a soldering iron comparison measured by OhmSavvy?",
            a: "No. Spec tables come from the maker's own data or the official Amazon listing, so you can check them yourself. Hands-on notes only appear for irons we have bought and used on our bench, and those carry a Hands-on Tested badge.",
          },
          {
            q: "What if neither iron in a comparison suits me?",
            a: "Our ranked best soldering irons list covers the main kinds of buyer, from first-time hobbyists to repair benches, with a pick for each. If you're still unsure, the buying guide walks through how to choose from scratch, starting from the kind of soldering you do.",
          },
        ]}
      />
    </>
  );
}
