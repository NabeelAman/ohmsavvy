// Specs per Fluke, as already cited on this site's own pages (no new sources):
// - Fluke 15B+ per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-15b-plus and the
//   15B+/17B+/18B+ users manual, as used on /multimeters/fluke-17b-plus-vs-fluke-15b-plus and
//   /multimeters/fluke-15b-plus-vs-fluke-101: True RMS not claimed; 4,000 counts, 3 updates/s, backlit (backlight off
//   after 2 min, auto power off after 20 min); DC V 4/40/400/1000 V ±(0.5% + 3); AC V 40-500 Hz ±(1.0% + 3); current
//   400.0 µA / 4000 µA / 40.00 mA / 400.0 mA / 4.000 A / 10.00 A, ±(1.5% + 3), AC 40-400 Hz; resistance to 40.00 MΩ;
//   capacitance 40 nF to 1,000 µF; diode 2.000 V; continuity beeps below 70 Ω; input >10 MΩ; no frequency, duty cycle,
//   temperature, MIN MAX or relative (17B+ only); Pick: CAT III 600V / CAT II 1000V; fuses 440 mA and 11 A, 1000 V;
//   2 × AA, 500 h minimum; 183 × 91 × 49.5 mm; 455 g; IP40; one-year warranty (users manual; fluke.com page silent).
// - Fluke 115 per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-115 and the
//   114/115/116/117 datasheet (2793260b, 08/2020), as used on /multimeters/fluke-17b-plus-vs-fluke-115 and
//   /multimeters/fluke-115-vs-fluke-87v: True RMS; CAT III 600V; 6,000 counts at 4 updates/s plus a 33-segment bar graph
//   at 32/s; backlight; DC V 600.0 mV to 600.0 V ±(0.5% + 2); AC V ±(1.0% + 3), 45-500 Hz; 6.000 A and 10.00 A only,
//   DC ±(1.0% + 3), AC ±(1.5% + 3), 1 mA best resolution; 40 MΩ; 1 nF to 9,999 µF; frequency to 50 kHz (2020 manual:
//   99.99 kHz); continuity below about 20 Ω, catches opens/shorts of 500 µs or longer; Min/Max/Avg with elapsed time;
//   no temperature (116 only); one 9 V, 400 h typical; 167 × 84 × 46 mm; 550 g; 3-year warranty.
// Worked uncertainty figures on this page are arithmetic on those published specs, not measurements.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-15b-plus-vs-fluke-115";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 15B+ vs Fluke 115: Budget or Professional?",
  description:
    "Fluke 15B+ vs 115 comparison: an entry-level Fluke with µA ranges against a True RMS field meter with a 3-year warranty. Specs, charts and who needs which.",
  image: all.find((p) => p.name === "Fluke 15B+")!.image,
  path: "/multimeters/fluke-15b-plus-vs-fluke-115",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 15B+ vs Fluke 115: Budget Multimeter or Professional Meter?",
  path,
  published: "2026-10-28",
  intro:
    "Buy the Fluke 115 if you troubleshoot live equipment for a living or work on anything with electronics in the load; buy the Fluke 15B+ if you mainly check voltage, continuity and small currents and want a Fluke at the entry tier. The 115 is True RMS, shows 6,000 counts with a fast bar graph and carries a 3-year warranty. The 15B+ is not described as True RMS, but it keeps microamp and milliamp ranges that the 115 lacks entirely.",
  a: {
    pick: all.find((p) => p.name === "Fluke 15B+")!,
    imageAlt: "Fluke 15B+ entry-level digital multimeter in its yellow holster, front view",
    chooseIf: [
      "You need µA or mA readings: standby drain, sensor supplies, small DC circuits",
      "Your AC work is outlets, heaters and other loads with clean sine waveforms",
      "You want a simple two-button Fluke on AA batteries for a home or hobby bench",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 115")!,
    reviewHref: "/multimeters/fluke-115-review",
    imageAlt: "Fluke 115 True RMS field service multimeter with bar graph display, front view",
    chooseIf: [
      "You measure current or voltage on LED drivers, switch-mode supplies or variable-speed equipment",
      "You service equipment daily and value a 3-year warranty over a 1-year one",
      "You want Min/Max/Avg recording and a 33-segment bar graph for drifting readings",
    ],
  },
  extraSpecs: [
    { label: "AC measurement", a: "Not described as True RMS by Fluke", b: "True RMS" },
    { label: "Safety rating", a: "CAT III 600V / CAT II 1000V", b: "CAT III 600V" },
    { label: "Display", a: "4,000 counts, 3 updates/s, backlit", b: "6,000 counts, 4 updates/s, backlit, 33-segment bar graph" },
    { label: "Volts range", a: "To 1000 V AC/DC", b: "To 600 V AC/DC" },
    { label: "DC volts accuracy", a: "±(0.5% + 3)", b: "±(0.5% + 2)" },
    { label: "AC volts accuracy", a: "±(1.0% + 3), 40–500 Hz", b: "±(1.0% + 3), 45–500 Hz" },
    { label: "Current", a: "Six ranges, 400.0 µA to 10.00 A, ±(1.5% + 3)", b: "6.000 A and 10.00 A only; 1 mA finest step" },
    { label: "Capacitance", a: "40 nF to 1,000 µF", b: "1 nF to 9,999 µF" },
    { label: "Frequency", a: "No", b: "To 50 kHz (2020 manual: 99.99 kHz)" },
    { label: "Recording", a: "HOLD only", b: "Min/Max/Avg with elapsed time" },
    { label: "Continuity beeper", a: "Below 70 Ω", b: "Below about 20 Ω; catches 500 µs opens" },
    { label: "Temperature", a: "No", b: "No (Fluke 116 only)" },
    { label: "Battery", a: "2 × AA, 500 h minimum", b: "One 9 V, 400 h typical" },
    { label: "Size / weight", a: "183 × 91 × 49.5 mm, 455 g", b: "167 × 84 × 46 mm, 550 g" },
    { label: "Warranty", a: "1 year (users manual)", b: "3 years" },
  ],
  differences: [
    "Waveform handling: the 115 is True RMS. Fluke makes no True RMS claim for the 15B+, so trust its AC readings on sine-wave loads only.",
    "Small current: the 15B+ starts at a 400.0 µA range and has four ranges below 4 A. The 115's lowest current range is 6.000 A, so it can't usefully read milliamps.",
    "Display: 6,000 counts plus a 33-segment bar graph refreshed 32 times a second on the 115, against 4,000 counts updated three times a second on the 15B+.",
    "Warranty: three years on the 115 versus one year on the 15B+, a direct signal of which tier each meter sits in.",
    "Diagnostics: only the 115 adds Min/Max/Avg recording, frequency and a capacitance range reaching 9,999 µF, ten times the 15B+'s 1,000 µF.",
    "Same on paper: CAT III 600V protection, ±0.5% DC and ±1.0% AC basic accuracy, resistance to 40 MΩ, a backlight, and no temperature on either.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What each price tier actually buys</h2>
        <p className="text-muted leading-7 mb-4">
          The 15B+ is Fluke&apos;s entry point: a sturdy case, honest basic accuracy and a dial with only HOLD and
          RANGE buttons. The 115 sits a tier up, aimed at field technicians who measure on equipment they did not
          design and cannot simplify. The step between them is not mostly about build; both are Fluke-made, CAT III
          600V meters. It is about three things the professional tier adds and one thing it gives up.
        </p>
        <InfoCards
          items={[
            { label: "The 115 adds", desc: "True RMS on AC volts and amps, so electronic loads read correctly." },
            { label: "The 115 adds", desc: "A bar graph plus Min/Max/Avg, for readings that move or come and go." },
            { label: "The 115 adds", desc: "A 3-year warranty, three times the 15B+'s one year." },
            { label: "The 115 gives up", desc: "Every current range below 6 A: no µA, no mA, 1 mA finest step." },
            { label: "Budget tier keeps", desc: "1000 V range (CAT II), 2 × AA power rated 500 h minimum, IP40." },
            { label: "Neither has", desc: "Temperature, non-contact voltage or a low-impedance mode." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The Fluke 115 carries our Hands-on Tested badge; the owner has used it. The 15B+ has not been through our
          hands, so what we say about it is desk research against Fluke&apos;s product page and the 15B+/17B+ users
          manual. Prices move, so we don&apos;t quote them; the 115 costs noticeably more, and the question is
          whether you use what that money pays for.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Who really needs True RMS</h2>
        <p className="text-muted leading-7 mb-4">
          A meter that is not True RMS works out an AC value by assuming the waveform is a perfect sine. On a
          receptacle, a toaster, a baseboard heater or a transformer secondary, that assumption holds well enough
          and the 15B+ and the 115 show the same thing. The assumption breaks on current drawn by electronics:
          LED drivers, computer and TV power supplies, variable-speed blowers and inverters pull current in short,
          tall bursts rather than a smooth wave. There a sine-assuming meter can read well under the real value,
          which hides an overloaded circuit.
        </p>
        <DataTable
          head={["What you measure", "Waveform", "15B+ reading", "115 reading"]}
          rows={[
            ["Voltage at a wall outlet", "Close to sine", "Fine", "Fine"],
            ["Current into a space heater", "Sine", "Fine", "Fine"],
            ["Current into an LED lighting circuit", "Pulsed", "Can read low", "Correct"],
            ["Current into a desktop PC or TV", "Pulsed", "Can read low", "Correct"],
            ["Variable-speed blower or pump", "Distorted", "Unreliable", "Correct within spec"],
            ["Car battery, solar panel, DC rails", "DC", "Fine", "Fine"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          So the honest test is your workload. A homeowner, student or hobbyist who mostly reads DC, outlets and
          resistive appliances gains little from True RMS. An HVAC tech, appliance repairer or maintenance worker
          who meets electronic loads every week should treat it as a requirement. Our{" "}
          <Link href="/multimeters/best-true-rms-multimeters-under-100" className={link}>
            budget True RMS multimeters
          </Link>{" "}
          guide covers cheaper ways to get it, and the{" "}
          <Link href="/multimeters/ac-vs-dc-voltage" className={link}>
            AC vs DC voltage explainer
          </Link>{" "}
          covers the basics behind RMS.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Current: the one area where the budget Fluke wins</h2>
        <p className="text-muted leading-7 mb-4">
          The current specs run in opposite directions. The 15B+ has six current ranges from 400.0 µA up to 10.00 A,
          all at ±(1.5% + 3). The 115 has two, 6.000 A and 10.00 A, with tighter percentage figures, ±(1.0% + 3) DC
          and ±(1.5% + 3) AC. That makes the 115 the better meter on amps and the 15B+ the only one of the pair
          that can measure milliamps meaningfully. The arithmetic below uses each meter&apos;s published worst-case
          figure on the range the reading would land on.
        </p>
        <DataTable
          head={["DC current reading", "15B+ range and limit", "115 range and limit"]}
          rows={[
            ["50 mA sensor supply", "400.0 mA range: ±(0.75 + 0.3) = ±1.05 mA", "6.000 A range shows 0.050 A: ±(0.5 + 3) = ±3.5 mA"],
            ["5 A motor or heater circuit", "10.00 A range: ±(75 + 30) = ±105 mA", "6.000 A range: ±(50 + 3) = ±53 mA"],
          ]}
        />
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Figure caption={<>Worst-case allowance at 50 mA DC, from the table. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 15B+", value: 1.05, display: "±1.05 mA", highlight: true },
                { label: "Fluke 115", value: 3.5, display: "±3.5 mA" },
              ]}
            />
          </Figure>
          <Figure caption={<>Worst-case allowance at 5 A DC, from the table. Lower is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 15B+", value: 105, display: "±105 mA" },
                { label: "Fluke 115", value: 53, display: "±53 mA", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          These are limits from the spec sheets, not readings from our bench. The 50 mA case is the telling one: the
          115 would show three digits after the decimal point in amps, of which only the last one moves, and its
          allowance is more than three times wider than the 15B+&apos;s. For anything below about 100 mA, such as
          parasitic drain on a vehicle or the supply current of a small board, the budget meter is the right tool.
          For loads of a few amps, the 115 roughly halves the uncertainty.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Readings that won&apos;t sit still</h2>
        <p className="text-muted leading-7 mb-4">
          Field work rarely produces a steady number. Voltage sags when a compressor starts, a loose terminal flickers
          and a supply drifts as it warms. The 15B+ updates its digits three times a second and has no recording
          function beyond HOLD, so a brief dip can pass unseen. The 115 pairs a bar graph that refreshes 32 times a
          second with Min/Max/Avg, which keeps the lowest, highest and average value along with elapsed time while
          you watch the equipment rather than the meter.
        </p>
        <p className="text-muted leading-7 mb-4">
          Continuity differs in a way that matters for wiring checks. The 15B+ beeps below 70 Ω; the 115 beeps below
          about 20 Ω and, per Fluke&apos;s datasheet, catches opens or shorts lasting 500 µs or more, useful when
          you flex a harness or wiggle a connector to find an intermittent break. For that technique, see{" "}
          <Link href="/multimeters/how-to-find-an-intermittent-electrical-fault-with-a-multimeter" className={link}>
            how to find an intermittent electrical fault
          </Link>
          .
        </p>
        <KeyIdea title="Capacitors and frequency">
          The 115 reads capacitance from 1 nF to 9,999 µF, enough for HVAC run capacitors and large power-supply
          electrolytics. The 15B+ stops at 1,000 µF. Only the 115 reads frequency; Fluke&apos;s spec page gives
          50 kHz while the 2020 users manual lists a 99.99 kHz range, so treat 50 kHz as the safe figure.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Safety ratings and warranty side by side</h2>
        <p className="text-muted leading-7 mb-4">
          Both meters are rated CAT III 600V, which covers distribution panels, feeders and branch circuits in homes
          and light commercial buildings. The 15B+ also lists CAT II 1000V and reads up to 1000 V, but CAT II means
          plug-in equipment and appliance-level circuits, not fixed 1000 V distribution. Neither meter is rated CAT IV,
          so neither belongs on the service drop, meter base or main disconnect.
        </p>
        <DataTable
          head={["Item", "Fluke 15B+", "Fluke 115"]}
          rows={[
            ["CAT III", "600 V", "600 V"],
            ["CAT II", "1000 V", "Not listed"],
            ["CAT IV", "Not rated", "Not rated"],
            ["Fused current inputs", "440 mA and 11 A, 1000 V fuses", "Not stated in our data"],
            ["Ingress rating", "IP40", "Not stated"],
            ["Warranty", "1 year", "3 years"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The warranty gap is the clearest tier marker. Fluke&apos;s users manual gives the 15B+ one year; the 115 gets
          three. For a meter that rides in a service van, that is real cover. For a meter that lives in a kitchen
          drawer and comes out a few times a year, one year is usually enough.
        </p>
        <Callout title="Match the meter to the location">
          Prove either meter on a known live source before and after testing a circuit you plan to touch, and keep
          to CAT III locations or lower. Work at the service entrance needs a CAT IV-rated meter and leads, and
          anything you aren&apos;t qualified to do belongs with a licensed electrician.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Your situation", "Better fit", "Why"]}
          rows={[
            ["First meter for home repairs", "Fluke 15B+", "Covers outlets, fuses, batteries and continuity at the entry tier"],
            ["Car parasitic drain or small DC circuits", "Fluke 15B+", "µA and mA ranges; the 115 starts at 6 A"],
            ["HVAC service with variable-speed equipment", "Fluke 115", "True RMS and capacitance to 9,999 µF"],
            ["Appliance or electronics field repair", "Fluke 115", "True RMS, Min/Max/Avg and a fast bar graph"],
            ["Chasing an intermittent connection", "Fluke 115", "Catches 500 µs opens; bar graph shows flicker"],
            ["Meter used every working day", "Fluke 115", "3-year warranty against 1 year"],
            ["Spare meter for a toolbox or vehicle", "Fluke 15B+", "AA batteries rated 500 h minimum, simple controls"],
            ["Service entrance or 480 V work", "Neither", "Look at a CAT IV 600V meter such as the Fluke 87V"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you want the 15B+&apos;s small-current ranges plus frequency and temperature, the{" "}
          <Link href="/multimeters/fluke-17b-plus-vs-fluke-15b-plus" className={link}>
            Fluke 17B+ vs Fluke 15B+
          </Link>{" "}
          comparison covers that step. If the 115 appeals but you also want non-contact voltage and a LoZ input, read{" "}
          <Link href="/multimeters/fluke-115-vs-fluke-117" className={link}>
            Fluke 115 vs Fluke 117
          </Link>
          . The full{" "}
          <Link href="/multimeters/fluke-115-review" className={link}>
            Fluke 115 review
          </Link>{" "}
          has more on the field meter.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "The Fluke 115 is the better meter for anyone who earns money with it: True RMS, a 6,000-count display with a fast bar graph, Min/Max/Avg and a 3-year warranty. The Fluke 15B+ is the sensible budget Fluke for home, hobby and DC work, and it is the only one of the two that reads microamps and milliamps. Skip the 15B+ if you meet electronic loads often; skip the 115 if small currents matter more than AC accuracy.",
  faqs: [
    {
      question: "Is the Fluke 15B+ True RMS?",
      answer:
        "Fluke does not describe the 15B+ as True RMS on its product page or in the users manual. Its AC readings are reliable on sine-wave loads such as outlets and heaters, but they can read low on LED drivers, power supplies and variable-speed equipment. The Fluke 115 is True RMS on both AC volts and AC amps.",
    },
    {
      question: "Can the Fluke 115 measure milliamps or microamps?",
      answer:
        "Not usefully. Its only current ranges are 6.000 A and 10.00 A, so the finest step is 1 mA and a 50 mA reading carries a worst-case allowance of about ±3.5 mA. For parasitic drain, sensor loops or flame-sensor current you need a meter with mA and µA inputs, such as the 15B+, whose lowest range is 400.0 µA.",
    },
    {
      question: "What warranty do the Fluke 15B+ and 115 have?",
      answer:
        "Fluke's 15B+/17B+ users manual gives the 15B+ a one-year warranty; Fluke's US product page doesn't state a term. The Fluke 115 has a three-year warranty. Keep proof of purchase for either meter, and check the Amazon seller is an authorized source if warranty support matters to you.",
    },
    {
      question: "Can I use the Fluke 15B+ on 1000 V circuits?",
      answer:
        "Its voltage ranges reach 1000 V, but its rating at that level is CAT II 1000V, which covers plug-in equipment rather than fixed distribution. For panels and branch circuits it is rated CAT III 600V, the same as the Fluke 115. For 1000 V industrial systems or the service entrance, use a meter rated CAT III 1000V and CAT IV 600V.",
    },
    {
      question: "Does either meter measure temperature?",
      answer:
        "No. Per Fluke's manuals and datasheets, temperature is a 17B+ function rather than a 15B+ one, and in the 114 to 117 family only the 116 has it. If a thermocouple input matters, look at the 17B+ instead of the 15B+, or at the 116 instead of the 115, and check what else changes between those siblings before you buy.",
    },
    {
      question: "Is the Fluke 115 worth the extra cost for home use?",
      answer:
        "Usually not, unless your home projects include LED lighting circuits, inverters, solar equipment with AC output or HVAC equipment with variable-speed motors. For outlets, batteries, fuses, switches and continuity, the 15B+ gives Fluke build quality at the entry tier. The 115 earns its higher price through True RMS, Min/Max/Avg and its longer warranty.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 115 review", href: "/multimeters/fluke-115-review" },
    { label: "Fluke 17B+ vs Fluke 115", href: "/multimeters/fluke-17b-plus-vs-fluke-115" },
    { label: "Fluke 17B+ vs Fluke 15B+", href: "/multimeters/fluke-17b-plus-vs-fluke-15b-plus" },
    { label: "Fluke 15B+ vs Fluke 101", href: "/multimeters/fluke-15b-plus-vs-fluke-101" },
    { label: "Fluke 117 vs Fluke 15B+", href: "/multimeters/fluke-117-vs-fluke-15b-plus" },
    { label: "Fluke 115 vs Fluke 87V", href: "/multimeters/fluke-115-vs-fluke-87v" },
  ],
};

export default function Fluke15BPlusVsFluke115Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
