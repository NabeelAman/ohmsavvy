// Educational page. Burden voltage is a well-established DMM engineering concept (how a current range's internal
// shunt/fuse drops voltage) — no per-instance citation required for the general mechanism per CONTENT_STANDARDS.md
// §1. Every product-specific burden figure below is copied verbatim from an existing verified Pick's own verdict
// text in src/lib/multimeter-catalog.ts / src/app/multimeters/best-multimeters/page.tsx. The worked example's
// resulting error percentages are illustrative arithmetic built on those real, cited burden figures.
import Link from "@/components/AppLink";
import {
  BarChart,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const all = getAllPicks("multimeters");
const fluke289 = all.find((p) => p.name === "Fluke 289")!;
const bm786 = all.find((p) => p.name === "EEVblog Brymen BM786")!;
const bm235 = all.find((p) => p.name === "Brymen BM235")!;

const description =
  "What a multimeter's burden voltage is, why it matters on low-voltage circuits, and real published burden figures from verified meters.";

export const metadata = buildMetadata({
  title: "Multimeter Burden Voltage Explained",
  description,
  path: "/multimeters/multimeter-burden-voltage-explained",
  image: fluke289.image,
});

const link = "text-accent hover:underline";

/** Burden voltage model: the meter's internal sense resistor sits in series with the circuit, dropping a small voltage. */
function BurdenDiagram() {
  return (
    <svg
      viewBox="0 0 320 160"
      className="w-full h-auto"
      role="img"
      aria-label="Burden voltage model. The meter is wired in series to measure current, and its internal sense resistor drops a small voltage, the burden voltage, which subtracts from the voltage actually available to the rest of the circuit."
    >
      <path d="M30 40 V120 H70" className="stroke-foreground" strokeWidth="1.8" fill="none" />
      <text x="10" y="85" fontSize="11" className="fill-muted">Source</text>
      <path d="M30 40 H120" className="stroke-foreground" strokeWidth="1.8" />
      <rect x="120" y="28" width="70" height="24" rx="3" className="fill-accent/30 stroke-accent" strokeWidth="1.8" />
      <text x="155" y="44" fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-accent">Meter (A)</text>
      <text x="155" y="18" fontSize="8.5" textAnchor="middle" className="fill-muted">Internal sense resistor</text>
      <path d="M190 40 H260 V120 H70" className="stroke-foreground" strokeWidth="1.8" fill="none" />
      <rect x="240" y="60" width="26" height="40" rx="3" className="fill-surface stroke-foreground" strokeWidth="1.8" />
      <text x="253" y="83" fontSize="9" fontWeight="700" textAnchor="middle" className="fill-foreground" transform="rotate(90 253 83)">Load</text>
      <text x="155" y="70" fontSize="9.5" textAnchor="middle" className="fill-muted">Burden voltage drops here</text>
      <text x="155" y="145" fontSize="9.5" textAnchor="middle" className="fill-muted">Load sees less voltage than the source actually supplies</text>
    </svg>
  );
}

export default function MultimeterBurdenVoltageExplainedPage() {
  return (
    <HowToShell
      title="Multimeter Burden Voltage Explained"
      description={description}
      published="2026-11-28"
      path="/multimeters/multimeter-burden-voltage-explained"
      category="multimeters"
      intro={
        <>
          Burden voltage is the small voltage a multimeter&apos;s current range drops across its own internal sense
          resistor while measuring current, because measuring current always means wiring the meter in series with
          the circuit. That drop subtracts from the voltage actually available to the rest of the circuit, and while
          it&apos;s usually too small to notice on a 12V or mains circuit, it can measurably throw off a reading on a
          low-voltage circuit like a 3.3V sensor line or a coin-cell project. This guide works through real published
          burden figures and what they mean in practice.
        </>
      }
      aside={{
        image: fluke289.image,
        alt: "Fluke 289 True RMS logging multimeter, which publishes its burden voltage figure",
        caption: (
          <>
            Higher-end meters like the Fluke 289 publish an exact burden figure. Budget meters often don&apos;t
            state one at all — see{" "}
            <Link href="/multimeters/is-a-cheap-multimeter-accurate" className={link}>
              is a cheap multimeter accurate
            </Link>{" "}
            for the same publish-or-don&apos;t-publish pattern on accuracy specs.
          </>
        ),
      }}
      toc={[
        { id: "what", label: "What burden voltage actually is" },
        { id: "math", label: "The math: when it actually matters" },
        { id: "real", label: "Real published burden figures" },
        { id: "causes", label: "Symptoms and fixes" },
        { id: "avoid", label: "How to avoid it entirely" },
        { id: "which-meter", label: "Which meter to use" },
      ]}
      faq={[
        {
          q: "What is burden voltage in simple terms?",
          a:
            "It's the voltage a multimeter's current range drops across its own internal sensing element while you measure current. Since measuring current means putting the meter in series with the circuit, that small drop is unavoidable, and it subtracts from the voltage the rest of the circuit actually sees.",
        },
        {
          q: "Does burden voltage matter for a 12V or mains circuit?",
          a:
            "Rarely in practice. A burden drop of a few millivolts to tens of millivolts is a negligible fraction of 12V or mains voltage. It becomes meaningful on circuits where the operating voltage itself is only a few volts, where the same millivolt-level drop is a much larger percentage.",
        },
        {
          q: "Why do some meters not publish a burden voltage spec?",
          a:
            "It's a secondary spec that most general-purpose meters simply don't test for or publish, the same way many budget meters don't publish a precise accuracy percentage. Meters aimed at bench and electronics work, like the Fluke 289 and Brymen BM786, are more likely to state it because their users are more likely to care.",
        },
        {
          q: "How do I avoid burden voltage error entirely?",
          a:
            "Measure voltage and resistance separately instead of current where you can, or use a dedicated low-burden shunt with a voltmeter across it if you need a precise current reading on a low-voltage circuit. A clamp meter also avoids burden voltage entirely, since it measures current without being wired into the circuit at all.",
        },
        {
          q: "Is a lower burden voltage always better?",
          a:
            "For low-voltage, precision current measurement, yes, a lower burden figure means less error. It isn't a general-purpose quality signal the way accuracy or CAT rating is — most users measuring current on 12V-and-up circuits will never notice the difference between a published burden figure and an unpublished one.",
        },
      ]}
      next={[
        {
          href: "/multimeters/is-a-cheap-multimeter-accurate",
          title: "Is a Cheap Multimeter Accurate?",
          desc: "The same publish-or-don't-publish pattern, applied to accuracy specs instead of burden voltage.",
        },
        {
          href: "/multimeters/multimeter-input-impedance-explained",
          title: "Multimeter Input Impedance Explained",
          desc: "The voltage-range counterpart to burden voltage's current-range loading effect.",
        },
      ]}
    >
      <section>
        <h2 id="what" className="text-xl font-semibold mb-3">What burden voltage actually is</h2>
        <p className="text-muted leading-7 mb-4">
          To measure current, a multimeter has to become part of the circuit, wired in series rather than across
          it like a voltmeter. Inside, that current flows through a small sense resistor (or a fuse) so the meter
          can calculate the current from the voltage it develops. That voltage drop is the burden voltage, and it&apos;s
          a real, physical reduction in the voltage available to the rest of the circuit while the meter is in the
          loop.
        </p>
        <Figure caption={<>The meter&apos;s internal sense resistor sits in series with the circuit and drops a small burden voltage.</>}>
          <BurdenDiagram />
        </Figure>
      </section>

      <section>
        <h2 id="math" className="text-xl font-semibold mb-3">The math: when it actually matters</h2>
        <p className="text-muted leading-7 mb-4">
          Burden voltage is usually specified per microamp of current, in microvolts or millivolts per µA. Worked
          example using a real published figure: the Fluke 289&apos;s 500 µA range carries a stated burden of about
          102 µV per µA. Measuring 200 µA in a circuit, the burden drop is 102 µV × 200 = 20,400 µV = 20.4 mV. On a
          12V circuit, that&apos;s 0.17% of the supply, negligible. On a 3.3V sensor circuit, the same 20.4 mV drop is
          0.62% of the supply, which can be enough to shift a borderline sensor reading.
        </p>
        <Figure caption={<>Same 20.4 mV burden drop, illustrative percentage of supply voltage at three common circuit voltages.</>}>
          <BarChart
            items={[
              { label: "3.3V circuit", value: 0.62, display: "≈0.62%", highlight: true },
              { label: "5V circuit", value: 0.41, display: "≈0.41%" },
              { label: "12V circuit", value: 0.17, display: "≈0.17%" },
            ]}
          />
        </Figure>
        <KeyIdea title="Lower supply voltage means more sensitivity to burden voltage">
          The burden drop itself doesn&apos;t change with the circuit&apos;s supply voltage — only its significance as a
          percentage does. The same meter that&apos;s perfectly fine on a 12V automotive circuit can introduce a real
          error on a 3.3V logic-level sensor line.
        </KeyIdea>
      </section>

      <section>
        <h2 id="real" className="text-xl font-semibold mb-3">Real published burden figures</h2>
        <p className="text-muted leading-7 mb-4">
          Among already-verified picks on this site, higher-end bench-oriented meters are the ones that publish an
          exact burden figure:
        </p>
        <DataTable
          head={["Meter", "Published burden", "Notes"]}
          rows={[
            ["Fluke 289", "≈102 µV per µA (500 µA range)", "Published alongside its 0.01 µA resolution"],
            ["EEVblog Brymen BM786", "0.2 mV per µA (200 µV/µA)", "Brymen states this is twice the Brymen BM235's own figure"],
            ["UNI-T UT61E+", "Not published", "UNI-T's manual doesn't state a burden figure"],
            ["OWON B41T+ / OW18E", "Not published", "OWON doesn't state a burden figure on either model"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The pattern mirrors what we&apos;ve found with accuracy specs generally: meters built with bench and electronics
          use in mind are more likely to publish this figure, since their users are the ones most likely to be
          working at low voltages where it matters.
        </p>
      </section>

      <section>
        <h2 id="causes" className="text-xl font-semibold mb-3">Symptoms and fixes</h2>
        <DataTable
          head={["Symptom", "Likely cause", "Fix"]}
          rows={[
            ["Current reading seems to lower a low-voltage sensor's output", "Burden voltage subtracting from supply", "Check the meter's burden spec, or measure volts and amps separately"],
            ["No way to tell if burden voltage is an issue", "Meter doesn't publish a burden figure", "Assume it's non-negligible on sub-5V circuits; verify with a known-good reference"],
            ["Reading differs between two meters on the same low-voltage circuit", "Different burden voltages between meters", "Use the meter with the lower, published burden figure for low-voltage work"],
          ]}
        />
      </section>

      <section>
        <h2 id="avoid" className="text-xl font-semibold mb-3">How to avoid it entirely</h2>
        <p className="text-muted leading-7">
          The cleanest way around burden voltage on a sensitive, low-voltage circuit is to not measure current
          in-line at all. Measure the voltage across a known shunt resistor instead and calculate current with
          Ohm&apos;s law, or use a clamp meter, which senses current magnetically with no series connection and
          therefore no burden voltage whatsoever. See our{" "}
          <Link href="/multimeters/clamp-meter-buying-guide" className={link}>
            clamp meter buying guide
          </Link>{" "}
          for when that trade-off is worth it.
        </p>
      </section>

      <section>
        <h2 id="which-meter" className="text-xl font-semibold mb-3">Which meter to use</h2>
        <p className="text-muted leading-7 mb-6">
          For general electrical and automotive work, burden voltage is rarely worth worrying about. For low-voltage
          electronics and sensor work, a meter that actually publishes its burden figure lets you do the math instead
          of guessing.
        </p>
        <ProductStrip
          title="Meters that publish a burden figure"
          items={[
            {
              name: "Fluke 289",
              image: fluke289.image,
              alt: "Fluke 289 True RMS logging multimeter",
              href: "/multimeters/best-multimeters-for-measuring-microamps",
              note: "Publishes a 102 µV per µA burden on its 500 µA range, alongside 0.01 µA resolution.",
            },
            {
              name: "EEVblog Brymen BM786",
              image: bm786.image,
              alt: "EEVblog Brymen BM786 bench multimeter",
              href: "/multimeters/best-multimeters-for-measuring-microamps",
              note: "States its 0.2 mV per µA burden directly against the Brymen BM235's lower figure.",
            },
            {
              name: "Brymen BM235",
              image: bm235.image,
              alt: "Brymen BM235 multimeter with AutoV LoZ",
              href: "/multimeters/best-multimeter-for-electricians",
              note: "The lower-burden reference point the BM786's own spec sheet compares itself against.",
            },
          ]}
        />
      </section>
    </HowToShell>
  );
}
