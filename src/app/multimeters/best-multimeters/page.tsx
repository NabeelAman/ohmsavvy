import type { Metadata } from "next";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle, type Pick } from "@/components/ReviewArticle";

export const metadata: Metadata = {
  title: "Top 10 Best Multimeters in 2026",
  description:
    "An honest, specification-based comparison of the top 10 best digital multimeters in 2026 — covering accuracy, CAT safety ratings, and value across every budget.",
  alternates: { canonical: "/multimeters/best-multimeters" },
};

export const picks: Pick[] = [
  {
    badge: "Best Overall",
    name: "Fluke 117",
    image: "https://media.fluke.com/e55511c8-92e6-46b2-b9ae-b108002dd7fa_original__size.jpg",
    rating: 4.8,
    bottomLine: "The meter working electricians actually buy with their own money, not just the one brands push.",
    verdict:
      "The Fluke 117 is the meter most working electricians reach for. True RMS readings, non-contact voltage detection, and a CAT III 600V rating make it reliable in real electrical panels, not just hobby projects.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Electricians, serious hobbyists" },
    ],
    pros: ["Trusted, well-documented reliability", "Non-contact voltage (NCV) detection built in", "Durable enough for daily field use"],
    cons: ["Premium price for casual hobbyists", "No Bluetooth/app connectivity"],
    ctaHref: "https://www.amazon.com/dp/B000O3LUEI?tag=ohmsavvy-20",
  },
  {
    badge: "Best Budget",
    name: "KAIWEETS KM200s",
    image: "https://kaiweets.com/cdn/shop/files/KAIWEETS-KM200s-True-RMS-Smart-Digital-Multimeter.jpg?width=1000",
    rating: 4.5,
    bottomLine: "Covers the fundamentals of the Fluke at under half the price — the sensible first meter.",
    verdict:
      "For under half the price of the Fluke, the KM200s covers the fundamentals well: auto-ranging, True RMS, and a non-contact voltage detector. A sensible first meter for home and hobby use.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT II 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Home use, beginners" },
    ],
    pros: ["Excellent value for the feature set", "Backlit display for low-light use", "Smart auto-ranging simplifies readings"],
    cons: ["Build quality isn't field-tool grade", "CAT II rating means it's not meant for service-panel work"],
    ctaHref: "https://www.amazon.com/dp/B0FCMBZ5TW?tag=ohmsavvy-20",
  },
  {
    badge: "Best for Electronics Hobbyists",
    name: "AstroAI DM6000AR",
    image: "https://cdn.astroai.com/astroai-banner/product/02eac7f4-b680-4f9a-e240-b28f21b3eb2b_20250120.webp",
    rating: 4.3,
    bottomLine: "The go-to recommendation for Arduino and Raspberry Pi tinkering — cheap enough not to worry about.",
    verdict:
      "This is the meter you'll see recommended most often for Arduino, Raspberry Pi, and general electronics tinkering — True RMS and 6,000-count resolution give it more precision than its price suggests, with both auto and manual ranging on tap.",
    specs: [
      { label: "Accuracy", value: "True RMS, 6,000-count" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Microcontroller & electronics projects" },
    ],
    pros: ["Very affordable for True RMS + 6,000-count resolution", "Compact and lightweight", "Both auto and manual ranging available"],
    cons: ["Build and included leads reflect the budget price point", "Fewer accessories/calibration options than pro-tier brands"],
    ctaHref: "https://www.amazon.com/dp/B071JL6LLL?tag=ohmsavvy-20",
  },
  {
    badge: "Best for Electrical Panels",
    name: "Klein Tools MM400",
    image: "https://data.kleintools.com/sites/all/product_assets/hires/klein/mm400_photo.jpg",
    rating: 4.6,
    bottomLine: "Splits the difference between the Fluke and budget picks, backed by Klein's reputation with tradespeople.",
    verdict:
      "Klein's MM400 splits the difference between the Fluke and budget options — auto-ranging, True RMS, and a CAT III rating, backed by Klein's reputation among tradespeople.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Tradespeople, home electrical work" },
    ],
    pros: ["Strong reputation for field durability", "Low-impedance mode avoids false readings", "Mid-range price for pro-level features"],
    cons: ["Bulkier than pocket-sized meters", "No app connectivity"],
    ctaHref: "https://www.amazon.com/dp/B018EXZO8M?tag=ohmsavvy-20",
  },
  {
    badge: "Best for Professionals",
    name: "Fluke 87V",
    image: "https://media.fluke.com/2725d18d-633b-40b2-b09b-b108002e4d59_original__size.jpg",
    rating: 4.8,
    bottomLine: "The step-up pick for anyone who needs CAT IV protection and high-resolution readings daily.",
    verdict:
      "The 87V is Fluke's industrial-grade step up from the 117 — a 1000V CAT III / 600V CAT IV rating, a 6,000-count main display with a 19,999-count high-resolution mode, and a 32-segment analog bar graph for watching signals change in real time.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 1000V / CAT IV 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Industrial technicians, daily professional use" },
    ],
    pros: ["Highest CAT rating in this list", "19,999-count high-resolution mode", "Analog bar graph tracks fast-changing signals"],
    cons: ["Among the most expensive picks here", "Overkill for casual home use"],
    ctaHref: "https://www.amazon.com/dp/B0002YFD1K?tag=ohmsavvy-20",
  },
  {
    badge: "Best Clamp Meter",
    name: "Milwaukee 2235-20",
    image: "https://www.milwaukeetool.com/--/web-images/sc/95924a2af12d4059acb29134f9a5c6fa?hash=8de461cf918be65701f0851f17c988fd&lang=en",
    rating: 4.6,
    bottomLine: "Skip the test leads entirely for current readings — clamp it on and read.",
    verdict:
      "A clamp meter measures current without breaking the circuit open, which is faster and safer for everyday electrical troubleshooting. The 2235-20 covers up to 400A AC with a 1-inch jaw opening and the same CAT III 600V and True RMS fundamentals as a good multimeter.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Quick current checks without disconnecting wiring" },
    ],
    pros: ["No need to break the circuit to measure current", "1-inch jaw fits most residential/commercial wiring", "Backed by Milwaukee's tool ecosystem and reputation"],
    cons: ["Clamp meters measure current only — still need a standard meter for resistance/continuity-heavy work", "Bulkier than a pocket multimeter"],
    ctaHref: "https://www.amazon.com/dp/B004F5KXBM?tag=ohmsavvy-20",
  },
  {
    badge: "Best Waterproof",
    name: "Southwire 14070T",
    image: "https://assets.southwire.com/adaptivemedia/rendition?id=e50ea3478e9024c2f714f3c4b26dae8ae448502e&prid=01200Wx1200H&clid=SAPDAM&prclid=productpictures",
    rating: 4.5,
    bottomLine: "The pick for anyone working outdoors, on job sites, or anywhere a meter might get wet or dropped.",
    verdict:
      "The TechnicianPRO is IP67-rated — fully dust-tight and able to survive submersion — on top of a CAT IV 600V / CAT III 1000V safety rating and True RMS accuracy. A magnetic hanging strap and built-in work light round it out for job-site use.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 1000V / CAT IV 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Outdoor and job-site work, drop/water risk" },
    ],
    pros: ["IP67 waterproof and dust-tight", "Built-in LED work light", "Magnetic hanging strap frees up both hands"],
    cons: ["Bulkier than a standard pocket meter", "US availability confirmed; double-check your region's listing"],
    ctaHref: "https://www.amazon.com/dp/B01MCTPTRC?tag=ohmsavvy-20",
  },
  {
    badge: "Best for Automotive",
    name: "Craftsman CMMT14171",
    image: "https://assets.craftsman.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/CMMT14171_1_1680.webp",
    rating: 4.4,
    bottomLine: "The one pick here built specifically for diagnosing cars, not just household wiring.",
    verdict:
      "Craftsman's CMMT14171 adds RPM, dwell angle, and duty-cycle measurement on top of standard True RMS multimeter functions — the specific toolkit automotive diagnostics actually needs, at a CAT III 600V rating.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Automotive diagnostics" },
    ],
    pros: ["RPM, dwell, and duty-cycle functions built in", "Familiar, trusted Craftsman brand", "Auto power-off extends battery life"],
    cons: ["Automotive functions are wasted if you don't work on cars", "Not rated for CAT IV panel work"],
    ctaHref: "https://www.amazon.com/dp/B0CF46PFLC?tag=ohmsavvy-20",
  },
  {
    badge: "Best Compact",
    name: "Extech EX330",
    image: "https://www.extech.com/netx-assets/ex330_web/?width=1500&quality=80",
    rating: 4.2,
    bottomLine: "A genuinely pocket-sized meter with a non-contact voltage detector built in.",
    verdict:
      "The EX330 trades True RMS accuracy for size — it's an auto-ranging meter small enough to actually live in a pocket, with a built-in non-contact voltage (NCV) detector for a fast first check before you even connect leads.",
    specs: [
      { label: "Accuracy", value: "Auto-ranging (not True RMS)" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Quick checks, pocket carry" },
    ],
    pros: ["Genuinely pocket-sized", "Built-in non-contact voltage detector", "Low price for a name-brand meter"],
    cons: ["Not True RMS — less accurate on non-sinusoidal signals", "Smaller display than full-size meters"],
    ctaHref: "https://www.amazon.com/dp/B000EX0AE4?tag=ohmsavvy-20",
  },
  {
    badge: "Best Value Auto-Ranging",
    name: "UNI-T UT139C",
    image: "https://meters.uni-trend.com/wp-content/uploads/2022/04/UT139C_1.jpg",
    rating: 4.4,
    bottomLine: "True RMS and auto-ranging at a price that undercuts most of this list.",
    verdict:
      "UNI-T's UT139C packs True RMS accuracy, a 6,000-count display, and both auto and manual ranging into one of the more affordable meters here — a strong value pick if you don't need a specific brand name.",
    specs: [
      { label: "Accuracy", value: "True RMS, 6,000-count" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Budget-conscious buyers who still want True RMS" },
    ],
    pros: ["True RMS at a budget price", "Both auto and manual ranging", "Non-contact voltage detection included"],
    cons: ["Less established brand recognition than Fluke/Klein", "Build quality is adequate, not rugged"],
    ctaHref: "https://www.amazon.com/dp/B081RBJ94W?tag=ohmsavvy-20",
  },
];

const faqs = [
  {
    question: "What does a CAT rating mean?",
    answer:
      "CAT (Category) ratings indicate how much transient voltage spike a meter is rated to safely withstand. CAT III 600V is the standard recommendation for home electrical panels and most residential wiring work.",
  },
  {
    question: "Do I need True RMS?",
    answer:
      "True RMS matters if you're measuring non-sinusoidal signals — common with modern electronics, variable-speed motors, and dimmer switches. For basic DC continuity checks, it's less critical.",
  },
  {
    question: "Should I get a clamp meter instead of a standard multimeter?",
    answer:
      "A clamp meter measures current by clamping around a wire — no need to break the circuit open, which is faster and safer for everyday checks. It's a great addition to a standard multimeter, not usually a replacement, since clamp meters are less practical for resistance, continuity, and low-current work.",
  },
];

export default function BestMultimetersPage() {
  return (
    <>
      <CategoryHero
        category="multimeters"
        label="Multimeters"
        heading="Find the Multimeter That Actually Fits Your Work"
        tagline="Compared honestly — no pay-for-placement."
        description="We compared accuracy specifications, CAT safety ratings, and feature sets across the multimeters most recommended by electricians, hobbyists, and verified buyer feedback."
        primaryCta={{ label: "Browse All Multimeters", href: "#fluke-117" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />
      <ReviewArticle picks={picks} faqs={faqs} />
      <section className="border-t border-border bg-surface-raised">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <p className="font-display text-xs text-muted uppercase tracking-wide mb-4">Shop by use case</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/multimeters/best-multimeter-for-electricians"
              className="rounded-lg border border-border bg-surface p-4 hover:border-accent transition-colors"
            >
              <p className="font-medium">For Electricians</p>
              <p className="mt-1 text-sm text-muted">CAT III/IV picks for panel work</p>
            </a>
            <a
              href="/multimeters/best-multimeter-for-automotive"
              className="rounded-lg border border-border bg-surface p-4 hover:border-accent transition-colors"
            >
              <p className="font-medium">For Automotive</p>
              <p className="mt-1 text-sm text-muted">RPM, dwell, and duty-cycle ready</p>
            </a>
            <a
              href="/multimeters/best-multimeter-for-home-use"
              className="rounded-lg border border-border bg-surface p-4 hover:border-accent transition-colors"
            >
              <p className="font-medium">For Home & DIY</p>
              <p className="mt-1 text-sm text-muted">Easy, affordable, no overkill</p>
            </a>
            <a
              href="/multimeters/multimeter-buying-guide"
              className="rounded-lg border border-border bg-surface p-4 hover:border-accent transition-colors"
            >
              <p className="font-medium">Buying Guide</p>
              <p className="mt-1 text-sm text-muted">CAT ratings, True RMS, and more explained</p>
            </a>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-6 py-12 border-t border-border">
        <p className="font-display text-xs text-muted uppercase tracking-wide mb-4">Reviews &amp; comparisons</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="/multimeters/fluke-117-review"
            className="rounded-lg border border-border bg-surface-raised p-4 hover:border-accent transition-colors"
          >
            <p className="font-medium">Fluke 117 Review</p>
            <p className="mt-1 text-sm text-muted">A closer look at our Best Overall pick</p>
          </a>
          <a
            href="/multimeters/fluke-117-vs-fluke-87v"
            className="rounded-lg border border-border bg-surface-raised p-4 hover:border-accent transition-colors"
          >
            <p className="font-medium">Fluke 117 vs Fluke 87V</p>
            <p className="mt-1 text-sm text-muted">Which Fluke tier actually fits your work</p>
          </a>
        </div>
      </section>
    </>
  );
}
