import Link from "@/components/AppLink";
import { CategoryListing } from "@/components/CategoryListing";
import { ListingGuide } from "@/components/ListingGuide";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Soldering Iron Reviews",
  description: "Soldering iron reviews focused on heat-up time, thermal recovery under load, and temperature stability — the specs that actually change how a repair goes.",
  path: "/soldering-irons/reviews",
});

const link = "text-accent hover:underline";

export default function SolderingIronsReviewsPage() {
  return (
    <>
      <CategoryListing
        category="soldering-irons"
        type="review"
        heading="Soldering Iron Reviews"
        intro="Heat-up time and temperature stability under real use get checked first here, because that's what actually separates a frustrating session from an easy one. Each review also covers build quality, tip availability, and the kind of work — bench repair, portable fixes, first-time soldering — each iron is genuinely built for."
      >
        <Link href="/soldering-irons/best-soldering-irons" className="py-1 font-medium text-accent hover:underline">
          Best soldering irons
        </Link>
        <Link href="/soldering-irons/comparisons" className="py-1 text-accent hover:underline">
          All soldering iron comparisons
        </Link>
        <Link href="/soldering-irons/soldering-iron-buying-guide" className="py-1 text-accent hover:underline">
          Soldering iron buying guide
        </Link>
        <Link href="/soldering-irons/guides" className="py-1 text-accent hover:underline">
          All soldering iron guides
        </Link>
      </CategoryListing>

      <ListingGuide
        chooseTitle="What to look for when you read a soldering iron review"
        chooseIntro={
          <>
            A review is only useful if you know which numbers matter for your own work. Before you open one, decide what you
            will mostly solder: small components on circuit boards, wires and connectors, or a mix. Then check these points in
            each review, in roughly this order.
          </>
        }
        criteria={[
          {
            title: "Temperature control, not just wattage",
            body: (
              <>
                An iron with a sensor near the tip holds its set temperature as a joint pulls heat away; a basic plug-in iron
                without control just runs as hot as its element allows. A wattage figure on the box says little on its own, as
                our{" "}
                <Link href="/soldering-irons/what-wattage-soldering-iron-do-i-need" className={link}>
                  wattage guide
                </Link>{" "}
                explains.
              </>
            ),
          },
          {
            title: "Heat-up time as the maker states it",
            body: "Makers often quote a time to reach working temperature. Treat it as a best case with a small tip; a larger tip and a cold room both add time. A fast warm-up matters most for quick fixes where you switch the iron on and off often.",
          },
          {
            title: "Where the power comes from",
            body: "A bench station has its own transformer or supply. A USB-C pen iron only delivers its full power when the charger or power bank behind it can supply it, so check which supply the review assumes before you compare heat-up claims.",
          },
          {
            title: "Tip range and replacement cost",
            body: (
              <>
                Tips are the part you replace, so look at which tip series the iron takes, how many shapes are sold and whether
                they are easy to find. Our{" "}
                <Link href="/soldering-irons/soldering-iron-tip-types" className={link}>
                  tip types guide
                </Link>{" "}
                shows which shape suits which job.
              </>
            ),
          },
          {
            title: "Stand, sleep mode and ESD safety",
            body: "A stable stand, an automatic sleep or standby mode and a grounded, ESD-safe design protect your bench, your tips and sensitive chips. Reviews note which of these the maker actually lists, and say so when one is missing.",
          },
          {
            title: "What comes in the box",
            body: "Some listings are a bare iron; others are kits with a stand, spare tips, solder and a cleaning sponge or brass wool. A cheaper iron that needs extras bought separately can end up costing more than a complete kit.",
          },
        ]}
        processTitle="How OhmSavvy reviews soldering irons"
        process={[
          <>
            Every review is labelled with how it was done. Irons marked Hands-on Tested were bought and used on our own bench,
            and only those can earn our 4.8 rating. The rest are Spec-Verified: we check every spec against the maker&apos;s own
            datasheet, manual or product page, or the official Amazon listing, and we read verified-purchase owner feedback for
            patterns such as failing heaters or hard-to-find tips.
          </>,
          <>
            When the maker and the listing disagree, the review says so instead of picking one number, and a spec the maker
            doesn&apos;t publish is shown as &quot;Not stated&quot;. We never print a measurement we didn&apos;t take ourselves.
            If an iron becomes unavailable on Amazon, its review stays up with a notice and points you to the closest current
            alternative.
          </>,
          <>
            Brands can&apos;t pay for a review or a rating. We earn a commission from Amazon when you buy through our links, at no
            extra cost to you. The full method is on our{" "}
            <Link href="/about" className={link}>
              about page
            </Link>
            .
          </>,
        ]}
        related={[
          { href: "/soldering-irons/soldering-iron-buying-guide", label: "Soldering iron buying guide", note: "The full walkthrough of iron types, temperature and features before you buy." },
          { href: "/soldering-irons/soldering-iron-vs-soldering-station", label: "Soldering iron vs soldering station", note: "When a simple pen is enough and when a bench station pays off." },
          { href: "/soldering-irons/ceramic-vs-nichrome-heating-element", label: "Ceramic vs nichrome heating elements", note: "Why the heater type affects warm-up and how well heat reaches the tip." },
          { href: "/soldering-irons/best-soldering-iron-for-beginners", label: "Best soldering iron for beginners", note: "Easy-to-use picks for a first iron." },
          { href: "/soldering-irons/comparisons", label: "Soldering iron comparisons", note: "Two irons side by side when you are down to a shortlist." },
        ]}
        faqs={[
          {
            q: "What does Hands-on Tested mean on a soldering iron review?",
            a: "It means we bought that iron and used it on our own bench before publishing. Only Hands-on Tested products can carry our 4.8 rating. Other reviews are Spec-Verified: every figure is checked against the maker's data or the official Amazon listing, and the review says clearly that we haven't used that iron ourselves.",
          },
          {
            q: "Is the rating in a soldering iron review the same as the Amazon star rating?",
            a: "No. Our rating is a single editorial score out of 5 from the OhmSavvy team, based on the specs, owner feedback and, for tested irons, our own use. Amazon's stars are an average of customer reviews and can differ quite a bit from our score.",
          },
          {
            q: "Why do some soldering iron reviews say a spec is Not stated?",
            a: "We only print figures the maker or the official Amazon listing publishes. If neither gives a number, for example a heat-up time or temperature accuracy, we write Not stated rather than borrow a figure from a forum or another review site that we can't verify.",
          },
          {
            q: "Should I read a soldering iron review or a comparison first?",
            a: "Start with a review if you are weighing one iron and want to know who it suits and what its limits are. Go to a comparison when you are down to two models, because it focuses on the one or two differences that decide between them.",
          },
        ]}
      />
    </>
  );
}
