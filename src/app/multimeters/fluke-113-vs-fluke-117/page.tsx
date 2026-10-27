// Specs per the Picks in src/lib/multimeter-catalog.ts (Fluke 113) and best-multimeters (Fluke 117), and the sources
// already cited on fluke-113-vs-fluke-115, fluke-114-vs-fluke-117 and fluke-116-vs-fluke-117 (checked 2026-10-27):
// - Fluke 113 product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-113
//   (VCHEK LoZ volts 6.000/60.00/600.0 V, ±(2.0% + 3) DC and 45-500 Hz, ±(4.0% + 3) 500 Hz-1 kHz, input about 3 kΩ,
//   3 V DC minimum in autorange; resistance 600.0 Ω to 60.00 kΩ; capacitance 1,000 nF to 9,999 µF, ±(1.9% + 2) to
//   1,000 µF and ±(5% + 20) on the 9,999 µF range; continuity beeps <20 Ω, off >250 Ω; diode 2.000 V ±(2.0% + 3);
//   6,000 counts, 4/s; backlight; Min/Max; IEC 61010-2-033 CAT IV 600 V; 9 V, about 300 h without backlight;
//   167.1 × 85.1 × 46.0 mm, 404 g; two jacks, no current ranges; frequency, bar graph and non-contact detection not
//   listed; warranty for a new unit not stated; LoZ phase-to-earth can trip GFCI/RCD).
// - Amazon listing B004Q05ODI: True RMS in title and on the meter label; one bullet says CAT III 600 V / CAT IV 300 V,
//   which conflicts with Fluke's CAT IV 600 V. Fluke's spec tab mentions True RMS only in a footnote.
// - Fluke 114/115/116/117 datasheet (2793260b): https://media.fluke.com/ce54d963-3be9-4e70-8a3e-b1060070fdfd_original%20file.pdf
//   (117: True RMS AC V and A; DC V ±(0.5% + 2), AC V ±(1.0% + 3) 45-500 Hz; normal V input >10 MΩ DC, >5 MΩ AC;
//   AutoVolt LoZ about 3 kΩ, 600.0 V ±(2.0% + 3); VoltAlert; 6.000 A / 10.00 A AC and DC, 20 A for 30 s, 1 mA
//   resolution; resistance to 40.00 MΩ; capacitance 1 nF-9,999 µF ±(1.9% + 2); frequency to 50.00 kHz; diode test;
//   6,000 counts + 33-segment bar graph; Min/Max/Avg; CAT III 600 V; 167 × 84 × 46 mm, 550 g; 400 h; 3-year warranty;
//   temperature on the 116 only).
// - Fluke 110 Series users manual (March 2020): https://media.fluke.com/5e1db354-3a6e-49cf-9edd-b10800c0e608_original%20file.pdf
//   (VoltAlert Lo/Hi; frequency listed to 99.99 kHz, which the datasheet does not show).
// Measurement-category zone descriptions are standard IEC 61010 usage, hedged on the page.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, FlowDiagram, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-113-vs-fluke-117";

export const metadata = buildMetadata({
  title: "Fluke 113 vs Fluke 117 for Electrical Testing",
  description:
    "Fluke 113 vs 117 comparison: a CAT IV VCHEK utility meter with no amps against the electrician's 117 with LoZ, VoltAlert and 10A. What each is really for.",
  path: "/multimeters/fluke-113-vs-fluke-117",
});

const link = "text-accent hover:underline";
const all = getAllPicks("multimeters");

/**
 * What sits behind the input jacks of each meter: the 113 has a single low-impedance volts path,
 * the 117 lets you choose between a LoZ path and a high-impedance path, and adds a fused current input.
 */
function InputPathsDiagram() {
  return (
    <svg
      viewBox="0 0 360 250"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of the measurement paths in each meter: the Fluke 113 has two jacks and one volts path through about 3 kilohms; the Fluke 117 has three jacks, a choice between AutoVolt at about 3 kilohms and normal volts above 5 megohms AC or 10 megohms DC, plus a fused 10 amp current input"
    >
      <text x="88" y="16" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-foreground">Fluke 113</text>
      <text x="268" y="16" fontSize="11" fontWeight="700" textAnchor="middle" className="fill-foreground">Fluke 117</text>
      <line x1="178" x2="178" y1="8" y2="240" className="stroke-border" strokeWidth="1" strokeDasharray="4 4" />

      <rect x="16" y="30" width="144" height="40" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.2" />
      <text x="88" y="48" fontSize="9.5" textAnchor="middle" className="fill-foreground">Two jacks</text>
      <text x="88" y="62" fontSize="9" textAnchor="middle" className="fill-muted">COM and V/Ω</text>
      <path d="M88 70 V96" className="stroke-foreground" strokeWidth="1.4" />
      <rect x="16" y="96" width="144" height="50" rx="8" className="fill-accent/10 stroke-accent" strokeWidth="1.4" />
      <text x="88" y="116" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">VCHEK only</text>
      <text x="88" y="132" fontSize="9" textAnchor="middle" className="fill-muted">≈3 kΩ, always loads</text>
      <rect x="16" y="160" width="144" height="40" rx="8" className="fill-surface stroke-border" strokeWidth="1.2" />
      <text x="88" y="178" fontSize="9.5" textAnchor="middle" className="fill-foreground">No current input</text>
      <text x="88" y="192" fontSize="9" textAnchor="middle" className="fill-muted">use a clamp meter</text>

      <rect x="196" y="30" width="144" height="40" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.2" />
      <text x="268" y="48" fontSize="9.5" textAnchor="middle" className="fill-foreground">Three jacks</text>
      <text x="268" y="62" fontSize="9" textAnchor="middle" className="fill-muted">A, COM and V/Ω</text>
      <path d="M232 70 V96 M304 70 V96" className="stroke-foreground" strokeWidth="1.4" />
      <rect x="196" y="96" width="70" height="50" rx="8" className="fill-accent/10 stroke-accent" strokeWidth="1.4" />
      <text x="231" y="116" fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-accent">AutoVolt</text>
      <text x="231" y="132" fontSize="9" textAnchor="middle" className="fill-muted">≈3 kΩ</text>
      <rect x="270" y="96" width="70" height="50" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <text x="305" y="116" fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-foreground">V AC / V DC</text>
      <text x="305" y="132" fontSize="9" textAnchor="middle" className="fill-muted">&gt;5 / &gt;10 MΩ</text>
      <rect x="196" y="160" width="144" height="40" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.2" />
      <text x="268" y="178" fontSize="9.5" textAnchor="middle" className="fill-foreground">Fused A input</text>
      <text x="268" y="192" fontSize="9" textAnchor="middle" className="fill-muted">6 A and 10 A, AC/DC</text>

      <text x="180" y="230" fontSize="9" textAnchor="middle" className="fill-muted">Impedances per Fluke; the 117 lets you pick the path, the 113 does not.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 113 vs Fluke 117: Which Is Better for Electrical Testing?",
  path,
  published: "2026-10-28",
  intro:
    "For general electrical testing the Fluke 117 is the better meter, because it measures current, reads volts with or without a low-impedance load and adds VoltAlert non-contact detection. The Fluke 113 is not a cheaper 117. It is a verification tool: its single VCHEK position proves a conductor live, dead or carrying phantom voltage, Fluke rates it CAT IV 600V, and it has no amps at all. Buy it only when proving power wiring is the whole job.",
  a: {
    pick: all.find((p) => p.name === "Fluke 113")!,
    imageAlt: "Fluke 113 utility multimeter with the VCHEK low-impedance position on its dial, front view",
    chooseIf: [
      "Your job is proving conductors live or dead, not diagnosing the loads on them",
      "You need Fluke's CAT IV 600V rating for work at the origin of the installation",
      "You already carry a clamp meter for every current reading",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 117")!,
    reviewHref: "/multimeters/fluke-117-review",
    imageAlt: "Fluke 117 electrician's True RMS multimeter with the VoltAlert sensor at the top, front view",
    chooseIf: [
      "You troubleshoot circuits and equipment, not just verify them",
      "You want both a LoZ check and an ordinary high-impedance volts reading on one dial",
      "You want current, frequency and non-contact detection without a second tool",
    ],
  },
  extraSpecs: [
    { label: "Volts positions", a: "VCHEK LoZ only, about 3 kΩ", b: "AutoVolt LoZ plus V AC (>5 MΩ) and V DC (>10 MΩ)" },
    { label: "Volts accuracy", a: "±(2.0% + 3), DC and 45–500 Hz", b: "DC ±(0.5% + 2); AC ±(1.0% + 3); LoZ ±(2.0% + 3)" },
    { label: "Non-contact voltage", a: "Not listed", b: "VoltAlert, Lo and Hi sensitivity" },
    { label: "Current", a: "None (two jacks)", b: "6 A and 10 A AC/DC; 20 A for 30 s" },
    { label: "Resistance", a: "600 Ω to 60 kΩ", b: "600 Ω to 40 MΩ" },
    { label: "Capacitance", a: "1,000 nF to 9,999 µF", b: "1 nF to 9,999 µF" },
    { label: "Frequency", a: "Not stated", b: "To 50 kHz (manual: 99.99 kHz)" },
    { label: "Display", a: "6,000 counts; bar graph not stated", b: "6,000 counts + 33-segment bar graph" },
    { label: "Min/Max", a: "Min/Max", b: "Min/Max/Avg" },
    { label: "Safety rating", a: "CAT IV 600V per Fluke (Amazon: CAT III 600V / CAT IV 300V)", b: "CAT III 600V" },
    { label: "Battery life", a: "About 300 h (9 V)", b: "About 400 h (9 V)" },
    { label: "Weight", a: "404 g", b: "550 g" },
    { label: "Warranty", a: "Not stated for a new unit", b: "3 years" },
  ],
  differences: [
    "Both meters have a low-impedance volts check of about 3 kΩ, but on the 113 it is the only way to read volts. The 117 also keeps normal high-impedance V AC and V DC positions.",
    "The 117 measures current on 6 A and 10 A ranges through a fused A jack. The 113 has two jacks and no current function.",
    "Only the 117 has VoltAlert non-contact detection, frequency and a 33-segment bar graph.",
    "Fluke rates the 113 CAT IV 600V and the 117 CAT III 600V; one Amazon bullet for the 113 gives a lower CAT IV 300V figure.",
    "The 113 is 146 g lighter (404 g against 550 g), but its resistance stops at 60 kΩ against the 117's 40 MΩ.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What the Fluke 113 is actually for</h2>
        <p className="text-muted leading-7 mb-4">
          Most people who search for the 113 assume it sits below the 117 on a ladder of electrician&apos;s meters. It
          doesn&apos;t. Fluke sells it as a utility meter, and its dial is shaped around a single question asked over
          and over: is this conductor energized, and if not, is it the one I think it is? The 117 answers that question
          too, then goes on to measure what the circuit is doing.
        </p>
        <InfoCards
          items={[
            { label: "113: the job", desc: "Prove live, dead or ghost; then confirm the conductor by continuity." },
            { label: "117: the job", desc: "Prove the circuit, then measure the load: amps, Hz, capacitors." },
            { label: "113: the edge", desc: "CAT IV 600V per Fluke, 404 g, one-position VCHEK." },
            { label: "117: the edge", desc: "Two volts inputs, a 10 A range and VoltAlert built in." },
            { label: "Shared", desc: "LoZ against phantom voltage, 6,000 counts, backlight, 9 V battery." },
            { label: "Our testing", desc: "The 117 is owner-tested; the 113 is desk research on Fluke specs." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The Fluke 117 is one of the meters the site owner has bought and used, so it carries our Hands-on Tested
          badge, and the{" "}
          <Link href="/multimeters/fluke-117-review" className={link}>
            Fluke 117 review
          </Link>{" "}
          goes into it in depth. The 113 has not been through that, so every statement about it below comes from
          Fluke&apos;s spec tab and the official Amazon listing. If you are choosing between the 113 and the
          general-purpose model with no LoZ at all, our{" "}
          <Link href="/multimeters/fluke-113-vs-fluke-115" className={link}>
            Fluke 113 vs Fluke 115
          </Link>{" "}
          page works through VCHEK and its circuit-loading trade-off in more detail.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Both have LoZ; only the 117 lets you switch it off</h2>
        <p className="text-muted leading-7 mb-4">
          This is the difference that decides the pair, and spec tables bury it. Fluke lists a low-impedance input of
          about 3 kΩ on the 113&apos;s VCHEK position and on the 117&apos;s AutoVolt position, with the same
          ±(2.0% + 3) accuracy line. On a shared conduit full of abandoned conductors, the two behave alike: coupled
          voltage drains through the meter and a real supply stays put.
        </p>
        <Figure caption={<>Measurement paths behind each meter&apos;s jacks, drawn from Fluke&apos;s published input impedances.</>}>
          <InputPathsDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          The 117 then has a second choice the 113 lacks. Turn one click to V AC or V DC and the input rises above 5 MΩ
          or 10 MΩ, so the meter barely disturbs what it reads. That matters on anything that isn&apos;t a stiff mains
          supply: a thermostat output, a doorbell transformer under load, a photocell or occupancy-sensor lead, a
          battery bank feeding a small inverter. On the 113 those readings all pass through 3 kΩ, and Fluke adds that
          its autorange won&apos;t register below 3 V DC, so low-voltage signals are largely out of reach.
        </p>
        <p className="text-muted leading-7">
          LoZ also draws real current, and Fluke&apos;s 113 page warns that phase-to-earth LoZ checks can trip a GFCI
          or RCD. The same physics applies to the 117&apos;s AutoVolt position. The difference is that a 117 user can
          make the hot-to-ground check on V AC instead, while a 113 user has to test hot to neutral or reset the
          device afterward. Our explainer on{" "}
          <Link href="/multimeters/why-does-my-gfci-outlet-keep-tripping" className={link}>
            why a GFCI keeps tripping
          </Link>{" "}
          covers the trip threshold.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 113 vs 117 comparison, function by function</h2>
        <DataTable
          head={["Function", "Fluke 113", "Fluke 117"]}
          rows={[
            ["Low-impedance volts", "VCHEK, 6 / 60 / 600 V", "AutoVolt, 600.0 V, AC/DC auto-select"],
            ["High-impedance volts", "No", "600 mV to 600 V AC and DC"],
            ["Falls back to continuity when dead", "Yes, on VCHEK", "No; separate continuity position"],
            ["Non-contact detection", "Not listed", "VoltAlert"],
            ["Amps AC/DC", "No", "6.000 A and 10.00 A"],
            ["Resistance", "To 60.00 kΩ", "To 40.00 MΩ"],
            ["Continuity", "Beeps below 20 Ω, off above 250 Ω", "Beeps below 20 Ω"],
            ["Capacitance", "1,000 nF to 9,999 µF", "1 nF to 9,999 µF, ±(1.9% + 2)"],
            ["Frequency", "Not stated", "To 50.00 kHz"],
            ["Diode test", "2.000 V, ±(2.0% + 3)", "Yes"],
            ["Temperature", "No", "No (the 116 has it)"],
            ["Recording", "Min/Max", "Min/Max/Avg"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Best basic volts accuracy on each meter, ±% of reading. Lower is better.</>}>
            <BarChart
              items={[
                { label: "117 V DC", value: 0.5, display: "0.5% + 2", highlight: true },
                { label: "117 V AC", value: 1.0, display: "1.0% + 3" },
                { label: "117 AutoVolt", value: 2.0, display: "2.0% + 3" },
                { label: "113 VCHEK", value: 2.0, display: "2.0% + 3" },
              ]}
            />
          </Figure>
          <Figure caption={<>Typical battery life on one 9 V cell without the backlight, in hours, per Fluke.</>}>
            <BarChart
              items={[
                { label: "Fluke 113", value: 300, display: "About 300 h" },
                { label: "Fluke 117", value: 400, display: "About 400 h", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The first chart shows the cost of a meter with no high-impedance position. On LoZ the two are equal, but the
          117 can read DC four times more tightly by switching to V DC. On a 120.0 V reading, ±(2.0% + 3) allows about
          ±2.7 V, while the 117&apos;s V AC line of ±(1.0% + 3) allows about ±1.5 V. For proving a circuit live, either
          is plenty. For checking whether a supply sits inside a tolerance band, the 117 is the meter to trust.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The 113&apos;s real advantage: CAT IV 600V</h2>
        <p className="text-muted leading-7 mb-4">
          Measurement category describes how much transient energy a meter is built to survive at a point in the
          supply. The closer you work to the utility, the larger the possible surge. Fluke lists the 113 under
          IEC 61010-2-033 at CAT IV 600V, and the meter body in the listing photo is printed the same. The 117 is rated
          CAT III 600V.
        </p>
        <DataTable
          head={["Where you measure (typical)", "Category", "Fluke 113", "Fluke 117"]}
          rows={[
            ["Service drop, meter base, line side of the main", "CAT IV", "Rated, per Fluke", "Not rated"],
            ["Distribution panel, feeders, busway", "CAT III", "Rated", "Rated"],
            ["Branch circuits, receptacles, fixed equipment", "CAT III / II", "Rated", "Rated"],
            ["Plug-in appliance on a cord", "CAT II", "Rated", "Rated"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The zones above are the common reading of IEC 61010 categories, not a site survey, so check your own
          employer&apos;s rules. Note the source conflict: one bullet on the 113&apos;s Amazon listing gives CAT III
          600V and CAT IV 300V, below Fluke&apos;s figure. We follow Fluke. If you need CAT IV and current together, the{" "}
          <Link href="/multimeters/fluke-117-vs-fluke-87v" className={link}>
            Fluke 117 vs Fluke 87V
          </Link>{" "}
          comparison covers a meter that has both.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">A verification routine with each meter</h2>
        <p className="text-muted leading-7 mb-4">
          Picture opening a disconnect to isolate a load and proving it dead before work. With the 113 the routine
          never leaves one dial position: check the meter on a known live source, test each conductor on the load side,
          and when nothing is there the same position confirms the conductor by continuity. With the 117 you can sweep
          the enclosure with VoltAlert before the leads come out, then use AutoVolt for the contact checks.
        </p>
        <FlowDiagram
          steps={[
            { label: "Prove the meter", sub: "Known live source first" },
            { label: "Test each conductor", sub: "113 VCHEK or 117 AutoVolt" },
            { label: "Near 0 V on LoZ", sub: "Phantom drained, not a feed" },
            { label: "Prove the meter again", sub: "Live-dead-live, then work" },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The routine is the same on both, and that is the point: for verification alone, the 113 gives up nothing
          important. The gap opens the moment the job turns into diagnosis. A small motor that trips its overload
          needs a current reading, and a portable generator holding the wrong speed needs a frequency reading; the
          117 takes both and the 113 lists neither. Our guide to{" "}
          <Link href="/multimeters/why-does-my-multimeter-show-voltage-when-measuring-a-disconnected-circuit" className={link}>
            voltage on a disconnected circuit
          </Link>{" "}
          explains why the LoZ step collapses a phantom reading.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Situation", "Better fit", "Why"]}
          rows={[
            ["Utility or service-entrance verification", "Fluke 113", "CAT IV 600V per Fluke; one-position live/dead check"],
            ["Switching and isolation checks, clamp in the truck", "Fluke 113", "VCHEK covers the meter's whole job"],
            ["Residential or commercial service calls", "Fluke 117", "Amps, high-impedance volts and VoltAlert"],
            ["Apprentice's first meter", "Fluke 117", "One tool for everything you'll be asked to measure"],
            ["Tracing circuits in old buildings", "Either", "Both have a 3 kΩ LoZ check"],
            ["Low-voltage controls and sensors", "Fluke 117", "The 113 always loads the circuit"],
            ["Motor, fan or generator troubleshooting", "Fluke 117", "Current, frequency and capacitance from 1 nF"],
            ["HVAC flame sensors or temperature", "Neither", "Those need the Fluke 116"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For the electrician-side alternatives in the same family, see{" "}
          <Link href="/multimeters/fluke-114-vs-fluke-117" className={link}>
            Fluke 114 vs Fluke 117
          </Link>{" "}
          for the LoZ meter without amps, and{" "}
          <Link href="/multimeters/fluke-116-vs-fluke-117" className={link}>
            Fluke 116 vs Fluke 117
          </Link>{" "}
          for the HVAC model. The{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          guide ranks meters beyond Fluke&apos;s 110 Series.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Where the published specs disagree</h2>
        <KeyIdea title="Read these before you buy">
          On the 113, Fluke and Amazon disagree on the safety rating (CAT IV 600V against CAT III 600V / CAT IV 300V),
          True RMS appears on the meter label and Amazon title but only in a footnote on Fluke&apos;s spec tab, and Fluke
          states no warranty term for a new unit (its reconditioned R-FLUKE-113 lists 3 years). On the 117, Fluke&apos;s
          2020 users manual lists a 99.99 kHz frequency range that the datasheet&apos;s 50.00 kHz ceiling doesn&apos;t
          show; the 117&apos;s 3-year warranty is published.
        </KeyIdea>
      </section>

      <Callout title="Safety: a LoZ reading near zero is not permission to touch">
        Both meters drain phantom voltage on their low-impedance positions, which makes a near-zero reading more
        meaningful but still not proof of isolation. Prove the meter on a known live source before and after, follow
        your lockout procedure, and keep the 117 off the service drop and meter base, where its CAT III 600V rating
        doesn&apos;t apply. VoltAlert silence on the 117 is not proof of dead either. If you aren&apos;t qualified to
        work inside panels or at the service entrance, call a licensed electrician or the utility.
      </Callout>
    </>
  ),
  bottomLine:
    "The Fluke 117 is the better meter for electrical testing in general: it reads volts through either a LoZ or a high-impedance input, measures current to 10 A, and adds VoltAlert and frequency. The Fluke 113 is the right choice only for verification work, where its one-position VCHEK check, Fluke-stated CAT IV 600V rating and lighter body matter and a clamp meter handles every amp reading.",
  faqs: [
    {
      question: "What is the Fluke 113 used for?",
      answer:
        "It is a utility meter for proving conductors live or dead. Its VCHEK position reads voltage through a low input impedance of about 3 kΩ and switches to a continuity check when nothing is there. It also reads resistance to 60 kΩ, capacitance and diodes, but it has no current ranges, so it is a verification tool rather than a troubleshooting meter.",
    },
    {
      question: "Do the Fluke 113 and 117 both have LoZ?",
      answer:
        "Yes. Fluke lists about 3 kΩ on the 113's VCHEK position and on the 117's AutoVolt position, with the same ±(2.0% + 3) accuracy. The difference is that the 113 has no other way to read volts, while the 117 also has normal V AC and V DC positions above 5 MΩ and 10 MΩ for circuits a low-impedance input would pull down.",
    },
    {
      question: "Which is safer to use at the service entrance?",
      answer:
        "The Fluke 113, on paper. Fluke rates it CAT IV 600V, which covers the meter base and service conductors, and the 117 is rated CAT III 600V, which stops at the distribution panel. One Amazon bullet for the 113 quotes CAT IV 300V instead, so confirm the rating printed on the meter you receive.",
    },
    {
      question: "Can a Fluke 113 replace a Fluke 117 for an electrician?",
      answer:
        "Only for part of the work. The 113 handles live-dead checks, ghost voltage and continuity, but it can't measure current, frequency or resistance above 60 kΩ, and it has no non-contact sensor. An electrician who also carries a clamp meter and a pen tester can manage with it; most service electricians are better served by the 117.",
    },
    {
      question: "Does the Fluke 113 have non-contact voltage detection?",
      answer:
        "Fluke's 113 spec tab lists no non-contact function, so plan on a separate pen tester. In this pair, only the 117 has it: VoltAlert, a sensor in the top edge with Lo and Hi sensitivity settings. A silent non-contact check is never proof that a conductor is dead, on either tool.",
    },
    {
      question: "Can the Fluke 113 or 117 measure temperature?",
      answer:
        "No. Neither meter lists a temperature function. Fluke's 110 Series datasheet gives the Type K thermocouple input to the Fluke 116 only, which also adds a 600.0 µA range for furnace flame sensors. If you need temperature and current on one meter, look outside the 110 Series at a model such as the Fluke 179.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 117 review", href: "/multimeters/fluke-117-review" },
    { label: "Fluke 113 vs Fluke 115", href: "/multimeters/fluke-113-vs-fluke-115" },
    { label: "Fluke 114 vs Fluke 117", href: "/multimeters/fluke-114-vs-fluke-117" },
    { label: "Fluke 116 vs Fluke 117", href: "/multimeters/fluke-116-vs-fluke-117" },
    { label: "Fluke 117 vs Fluke 87V", href: "/multimeters/fluke-117-vs-fluke-87v" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke113VsFluke117Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
