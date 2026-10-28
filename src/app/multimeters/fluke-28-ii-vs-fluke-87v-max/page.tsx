// Specs per Fluke, checked 2026-10-28:
// - Fluke 28 II product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-28-ii
//   "IP 67"; "3 m (10 ft)" drop with holster ("10 feet drop test" in the table); "MSHA Approved"; operating -15 °C to
//   +55 °C, -40 °C for up to 20 minutes; storage temperature not stated; three AA batteries, 800 hours; DC V 0.05% + 1,
//   AC V 0.7% + 4 (0.1 mV to 1000 V, 15 Hz to 20 kHz); DC A 0.2% + 4; AC A 1.0% + 2 (0.1 µA to 10 A, 20 A for 30 s);
//   resistance 0.1 Ω to 50 MΩ (accuracy not stated); capacitance 1 nF to 9999 µF (accuracy not stated); frequency
//   0.5 Hz to 199.99 kHz (accuracy not stated); temperature -200 to +1090 °C; 6000 counts, 20,000-count mode; bar graph;
//   2-level white backlight and backlit keypad; reversible rubber holster; TL75 leads, AC175 clips, 80BK-A probe;
//   low-pass filter; 250 µs peak capture; Min/Max/Avg, hold, relative; withstands 8,000 V spikes; 698.5 g and
//   6.35 x 10.0 x 19.81 cm with holster; CAT IV 600 V / CAT III 1000 V; limited lifetime warranty. Input Alert,
//   conductance and duty cycle are not mentioned on the page.
// - Fluke 87V MAX product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/87v-max
//   "IEC 60529: IP67"; drop "4 meters" / "up to 4-meters (13 feet)"; operating -15 °C to 55 °C, to -40 °C for 20 minutes
//   when taken from 20 °C; storage -40 °C to +60 °C; three AA batteries, 800 hours typical without backlight;
//   DC V ±(0.05% + 1); AC V ±(0.7% + 4) True RMS, 20 kHz with low-pass filter (3 dB at 1 kHz); DC A ±(0.2% + 2);
//   AC A ±(1.0% + 2) (0.1 µA to 10 A, 20 A for 30 s); resistance ±(0.2% + 1), 0.1 Ω to 50 MΩ; capacitance ±(1% + 2),
//   0.01 nF to 9999 µF; frequency ±(0.005% + 1), 0.5 Hz to 199.99 kHz; temperature -200 to 1090 °C (80BK probe -40 to
//   260 °C, ±2.2 °C or 2%); 6000 counts, 19,999-count hi-res; two-level backlight; Peak Min/Max 250 µs; Input Alert;
//   TL175 TwistGuard leads, AC175 clips; removable holster with test lead storage; approvals CE, CSA (no MSHA listed);
//   6.0 x 10.1 x 21.5 cm and 698.5 g with holster; limited lifetime warranty. LoZ not listed.
// - The 87V MAX page's comparison table lists a backlit keypad and a 32-segment bar graph for the MAX (see our
//   /multimeters/fluke-87v-vs-fluke-87v-max page notes).
// - 28 II EX is a separate intrinsically safe model: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-28-ii-ex
// - Amazon listing for the 28 II (B002X9ISWI) says the unit ships with a NIST-traceable calibration certificate with data
//   and is sold by a third party.
// IP code meanings (6 = dust-tight, 7 = temporary immersion, commonly 1 m for 30 minutes) are standard IEC 60529
// values, hedged on the page.
// Picks: Fluke 28 II (4.6) and Fluke 87V MAX (4.7) in src/lib/multimeter-catalog.ts; neither is hands-on tested by us.
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-28-ii-vs-fluke-87v-max";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 28 II vs 87V MAX for Harsh Environments",
  description:
    "Fluke 28 II vs 87V MAX comparison: both IP67, but the 28 II is MSHA approved while the MAX takes a 4 m drop and publishes tighter specs. Charts and a verdict.",
  image: all.find((p) => p.name === "Fluke 87V MAX")!.image,
  path: "/multimeters/fluke-28-ii-vs-fluke-87v-max",
});

const link = "text-accent hover:underline";

/** Rated drop heights drawn to scale against a 0 to 4.5 m ruler. */
function DropHeightDiagram() {
  // 1 m = 34 px; ground at y = 176.
  const g = 176;
  const m = 34;
  const marks = [0, 1, 2, 3, 4];
  return (
    <svg
      viewBox="0 0 360 200"
      className="w-full h-auto"
      role="img"
      aria-label="Drop rating chart drawn to scale: the Fluke 28 II is rated for a 3 meter (10 foot) drop with its holster on, and the Fluke 87V MAX for a 4 meter (13 foot) drop, one meter higher"
    >
      <line x1="40" x2="340" y1={g} y2={g} className="stroke-foreground" strokeWidth="1.5" />
      <text x="190" y="194" fontSize="9" textAnchor="middle" className="fill-muted">Concrete floor</text>
      {marks.map((v) => (
        <g key={v}>
          <line x1="40" x2="46" y1={g - v * m} y2={g - v * m} className="stroke-muted" strokeWidth="1" />
          <text x="34" y={g - v * m + 3} fontSize="9" textAnchor="end" className="fill-muted">
            {v} m
          </text>
        </g>
      ))}
      <line x1="40" x2="40" y1={g} y2={g - 4.4 * m} className="stroke-muted" strokeWidth="1" />
      {/* 28 II column */}
      <rect x="90" y={g - 3 * m} width="70" height={3 * m} rx="4" className="fill-muted/25 stroke-muted" strokeWidth="1.2" />
      <rect x="110" y={g - 3 * m - 22} width="30" height="18" rx="3" className="fill-[#f0b429]" />
      <text x="125" y={g - 3 * m - 28} fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">
        28 II
      </text>
      <text x="125" y={g - 1.5 * m} fontSize="9.5" textAnchor="middle" className="fill-foreground">3 m</text>
      <text x="125" y={g - 1.5 * m + 12} fontSize="8.5" textAnchor="middle" className="fill-muted">(10 ft, holstered)</text>
      {/* 87V MAX column */}
      <rect x="210" y={g - 4 * m} width="70" height={4 * m} rx="4" className="fill-accent/30 stroke-accent" strokeWidth="1.4" />
      <rect x="230" y={g - 4 * m - 22} width="30" height="18" rx="3" className="fill-[#f0b429]" />
      <text x="245" y={g - 4 * m - 28} fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">
        87V MAX
      </text>
      <text x="245" y={g - 2 * m} fontSize="9.5" textAnchor="middle" className="fill-foreground">4 m</text>
      <text x="245" y={g - 2 * m + 12} fontSize="8.5" textAnchor="middle" className="fill-muted">(13 ft)</text>
      <line x1="160" x2="210" y1={g - 3 * m} y2={g - 3 * m} className="stroke-muted" strokeWidth="1" strokeDasharray="3 3" />
      <text x="300" y={g - 3.5 * m} fontSize="8.5" className="fill-accent">+1 m</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 28 II vs Fluke 87V MAX: Which Is Better for Harsh Environments?",
  path,
  published: "2026-10-28",
  intro:
    "For mines and other MSHA-regulated sites, pick the Fluke 28 II: Fluke lists it as MSHA approved and doesn't list that approval for the 87V MAX. For every other harsh environment, the 87V MAX is the stronger choice, rated for a 4 m drop against the 28 II's 3 m, with tighter DC current accuracy and published accuracy for resistance, capacitance and frequency. The two meters share a lot: IP67 sealing, the same cold rating (−15 to 55 °C, down to −40 °C for 20 minutes), three AA cells for about 800 hours, a 698.5 g holstered weight, CAT IV 600V / CAT III 1000V and a limited lifetime warranty.",
  a: {
    pick: all.find((p) => p.name === "Fluke 87V MAX")!,
    imageAlt: "Fluke 87V MAX IP67 True RMS multimeter in its holster, front view",
    chooseIf: [
      "Your meter works from ladders, lifts, catwalks or truck beds, where the extra meter of drop rating counts",
      "You want every accuracy line published: resistance ±(0.2% + 1), capacitance ±(1% + 2), frequency ±(0.005% + 1)",
      "You like TL175 TwistGuard leads and an Input Alert warning for a lead left in a current jack",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 28 II")!,
    imageAlt: "Fluke 28 II rugged IP67 True RMS multimeter in its rubber holster, front view",
    chooseIf: [
      "You work underground or at a surface mine where the safety program expects MSHA-approved test equipment",
      "You want a shorter case (19.8 cm with holster against 21.5 cm) for a pouch or pocket",
      "You want the meter to arrive calibrated: the Amazon listing says it ships with a NIST-traceable certificate",
    ],
  },
  extraSpecs: [
    { label: "Ingress protection", a: "IP67", b: "IP67" },
    { label: "Drop rating", a: "4 m (13 ft)", b: "3 m (10 ft), with holster" },
    { label: "MSHA approval", a: "Not listed (CE, CSA)", b: "Yes" },
    { label: "Operating temperature", a: "−15 to 55 °C; −40 °C for 20 min", b: "−15 to 55 °C; −40 °C for 20 min" },
    { label: "DC volts / AC volts", a: "±(0.05% + 1) / ±(0.7% + 4)", b: "0.05% + 1 / 0.7% + 4" },
    { label: "DC amps", a: "±(0.2% + 2)", b: "0.2% + 4" },
    { label: "Resistance accuracy", a: "±(0.2% + 1), to 50 MΩ", b: "Not stated (range 0.1 Ω to 50 MΩ)" },
    { label: "Capacitance", a: "±(1% + 2), 0.01 nF to 9,999 µF", b: "1 nF to 9,999 µF; accuracy not stated" },
    { label: "Frequency", a: "±(0.005% + 1), to 199.99 kHz", b: "To 199.99 kHz; accuracy not stated" },
    { label: "Test leads", a: "TL175 TwistGuard", b: "TL75" },
    { label: "Input Alert", a: "Yes", b: "Not stated" },
    { label: "Battery", a: "3 × AA, 800 h", b: "3 × AA, 800 h" },
    { label: "Size / weight, holstered", a: "6.0 × 10.1 × 21.5 cm, 698.5 g", b: "6.35 × 10.0 × 19.81 cm, 698.5 g" },
    { label: "Warranty", a: "Limited lifetime", b: "Limited lifetime" },
  ],
  differences: [
    "Mining approval: Fluke lists the 28 II as MSHA approved. The 87V MAX page lists CE and CSA approvals and no MSHA.",
    "Drop rating: 4 m (13 ft) for the 87V MAX against 3 m (10 ft) with holster for the 28 II.",
    "DC amps: ±(0.2% + 2) on the 87V MAX, 0.2% + 4 on the 28 II. Every other accuracy line Fluke prints for both is identical.",
    "Published detail: the 87V MAX page gives accuracy for resistance, capacitance and frequency. The 28 II page lists only the ranges for those three functions.",
    "Accessories: TL175 TwistGuard leads and a holster with lead storage on the MAX; TL75 leads and a reversible rubber holster on the 28 II.",
    "Shared: IP67, the −15 to 55 °C rating with −40 °C excursions, 800 hours on three AAs, 698.5 g, a low-pass filter, 250 µs peak capture, −200 to 1090 °C temperature, CAT IV 600V / CAT III 1000V and a limited lifetime warranty.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Two sealed meters, one real fork in the road</h2>
        <p className="text-muted leading-7 mb-4">
          Put the two spec tabs side by side and the surprise is how little separates them. Both cases are IP67, both
          weigh exactly 698.5 g in the holster, both run three AA cells for about 800 hours, and both carry the same cold
          rating. The choice turns on two lines: who has approved the meter, and how far it is rated to fall.
        </p>
        <InfoCards
          items={[
            { label: "28 II: MSHA", desc: "The only one of the two with a listed mining approval." },
            { label: "87V MAX: 4 m drop", desc: "One meter (about 3 ft) more than the 28 II's holstered rating." },
            { label: "87V MAX: fuller spec", desc: "Accuracy published for ohms, capacitance and frequency." },
            { label: "87V MAX: DC amps", desc: "Two fewer counts of uncertainty than the 28 II." },
            { label: "Same seal and cold", desc: "IP67; −15 to 55 °C; −40 °C for 20 minutes." },
            { label: "Same power", desc: "Three AA cells, about 800 hours." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          OhmSavvy hasn&apos;t hands-on tested either meter. Our scores (4.7 for the 87V MAX, 4.6 for the 28 II) are
          desk research against Fluke&apos;s product pages and the official Amazon listings, and every figure on this
          page comes from those sources. Where Fluke prints nothing, we write &quot;not stated&quot;.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 28 II vs 87V MAX spec by spec</h2>
        <DataTable
          head={["Spec", "Fluke 28 II", "Fluke 87V MAX", "Edge"]}
          rows={[
            ["IP rating", "IP67", "IP67", "Same"],
            ["Drop", "3 m with holster", "4 m", "87V MAX"],
            ["MSHA", "Approved", "Not listed", "28 II"],
            ["Operating range", "−15 to 55 °C, −40 °C for 20 min", "−15 to 55 °C, −40 °C for 20 min", "Same"],
            ["Storage range", "Not stated", "−40 to 60 °C", "87V MAX (published)"],
            ["DC volts", "0.05% + 1", "±(0.05% + 1)", "Same"],
            ["AC volts, True RMS", "0.7% + 4, 15 Hz to 20 kHz", "±(0.7% + 4), 20 kHz", "Same"],
            ["DC amps", "0.2% + 4", "±(0.2% + 2)", "87V MAX"],
            ["AC amps", "1.0% + 2", "±(1.0% + 2)", "Same"],
            ["Current span", "0.1 µA to 10 A (20 A, 30 s)", "0.1 µA to 10 A (20 A, 30 s)", "Same"],
            ["Resistance", "0.1 Ω to 50 MΩ, accuracy not stated", "±(0.2% + 1), to 50 MΩ", "87V MAX"],
            ["Capacitance", "1 nF to 9,999 µF", "±(1% + 2), 0.01 nF to 9,999 µF", "87V MAX"],
            ["Frequency", "0.5 Hz to 199.99 kHz", "±(0.005% + 1), 0.5 Hz to 199.99 kHz", "87V MAX"],
            ["Temperature", "−200 to 1090 °C, 80BK-A", "−200 to 1090 °C, 80BK-A", "Same"],
            ["Hi-res mode", "20,000 counts", "19,999 counts", "Same in practice"],
            ["Low-pass filter / Peak", "Yes / 250 µs", "Yes / 250 µs", "Same"],
            ["Spike withstand", "8,000 V", "Not stated on the MAX page", "28 II (published)"],
            ["Battery", "3 × AA, 800 h", "3 × AA, 800 h", "Same"],
            ["Holstered size", "6.35 × 10.0 × 19.81 cm", "6.0 × 10.1 × 21.5 cm", "28 II shorter"],
            ["Weight, holstered", "698.5 g", "698.5 g", "Same"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated drop heights from Fluke&apos;s spec tabs, drawn to scale.</>}>
            <DropHeightDiagram />
          </Figure>
          <Figure caption={<>Counts added to the DC amps percentage term. Fewer is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 87V MAX", value: 2, display: "0.2% + 2", highlight: true },
                { label: "Fluke 28 II", value: 4, display: "0.2% + 4" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <Figure caption={<>Holstered case length, which decides what pouch or pocket the meter fits. Shorter is handier.</>}>
            <BarChart
              items={[
                { label: "Fluke 28 II", value: 198.1, display: "198 mm", highlight: true },
                { label: "Fluke 87V MAX", value: 215, display: "215 mm" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The DC amps gap is small in practice. Two extra counts add the value of two steps of the last digit to the
          error allowance, so on a reading such as 2.000 A, if the range resolves 0.001 A, the 28 II&apos;s window is
          wider by 0.002 A. That is irrelevant for motor and heater currents and only starts to matter on precise loop
          readings. The bigger practical gap is that Fluke doesn&apos;t publish the 28 II&apos;s resistance, capacitance
          or frequency accuracy, so a quality system that wants a stated tolerance for every function used will find it
          only on the MAX.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Harsh-environment hazards, one by one</h2>
        <p className="text-muted leading-7 mb-4">
          &quot;Harsh&quot; means different things on different sites. Go through the hazards your meter actually
          faces and the right answer usually falls out.
        </p>
        <DataTable
          head={["Hazard", "Fluke 28 II", "Fluke 87V MAX", "Verdict"]}
          rows={[
            ["Rain, hose-down, puddles", "IP67", "IP67", "Tie"],
            ["Fine dust: cement, coal, grain, sawdust", "IP67 (dust-tight)", "IP67 (dust-tight)", "Tie"],
            ["Falls from height", "3 m, holstered", "4 m", "87V MAX"],
            ["Mining regulator requirements", "MSHA approved", "Not listed", "28 II"],
            ["Brief exposure at −40 °C", "20 minutes", "20 minutes, from 20 °C", "Tie"],
            ["All-day work below −15 °C", "Not rated", "Not rated", "Neither"],
            ["Explosive atmosphere (classified area)", "Not intrinsically safe", "Not intrinsically safe", "Neither: use the 28 II EX"],
            ["Dark enclosures", "Backlit display and keypad", "Backlit display and keypad", "Tie"],
            ["Long shifts far from a store", "AA cells, 800 h", "AA cells, 800 h", "Tie"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          IP67 means the case is dust-tight (the 6) and protected against temporary immersion (the 7); the usual IEC
          60529 test is about 1 m of water for 30 minutes. Neither is rated for continuous submersion, and both still
          need the battery door and jacks clean and closed. Our{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-87v-max" className={link}>
            Fluke 87V vs 87V MAX
          </Link>{" "}
          comparison decodes the IP digits in more detail.
        </p>
        <p className="text-muted leading-7 mt-4">
          The cold rows are worth reading carefully. Both meters work continuously only down to −15 °C. The −40 °C
          figure is an excursion: Fluke words it as 20 minutes, and on the MAX adds &quot;when taken from 20 °C&quot;,
          meaning a warm meter carried out of a heated cab. A technician who works a whole shift outdoors in a northern
          winter is outside both ratings, so keep the meter inside a jacket between readings.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What MSHA approval does, and doesn&apos;t, buy you</h2>
        <p className="text-muted leading-7 mb-4">
          MSHA is the US Mine Safety and Health Administration. If your employer&apos;s electrical program for a mine
          specifies MSHA-approved instruments, the 28 II is the one of these two that Fluke lists, and that single line
          ends the comparison. Ask your safety department to confirm which approval conditions apply at your site.
        </p>
        <p className="text-muted leading-7">
          Approval is not intrinsic safety. Fluke sells the 28 II EX as its intrinsically safe version for hazardous
          (explosive) locations, and neither the standard 28 II nor the 87V MAX is described that way. If your work is
          in a classified area at a refinery, grain elevator or gas plant, you need the EX model and a permit, not
          either meter on this page.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Daily-use details: leads, holster and calibration paperwork</h2>
        <p className="text-muted leading-7 mb-4">
          The 87V MAX ships with TL175 TwistGuard leads, AC175 clips and a holster with built-in lead storage. It also lists Input Alert, which Fluke describes as an audible warning when
          the leads are in the wrong input jacks for the selected function. The 28 II ships with TL75 leads, AC175 clips and a
          reversible rubber holster; Fluke&apos;s page doesn&apos;t mention Input Alert.
        </p>
        <p className="text-muted leading-7">
          On paperwork, the 28 II&apos;s Amazon listing says the unit is calibrated before shipment and comes with a
          NIST-traceable certificate with data. That is the seller&apos;s claim rather than part of Fluke&apos;s box
          contents, and the offer is from a third-party seller, so confirm it&apos;s still described when you order.
          If your plant needs a certificate before a meter goes into service, it can save a trip to a cal lab.
        </p>
        <KeyIdea title="Same armor, different paperwork">
          The 28 II and 87V MAX share the IP67 seal, the cold rating, the battery and the weight. Buy the 28 II if a
          mining approval is on your checklist. Otherwise the 87V MAX is the better harsh-site meter: one more meter of
          drop rating, two fewer counts on DC amps, and a full set of published accuracy figures.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 28 II vs 87V MAX: which should you buy?</h2>
        <DataTable
          head={["You are…", "Buy", "Why"]}
          rows={[
            ["Underground or surface mine electrician", "Fluke 28 II", "MSHA approval listed"],
            ["Lineworker or tower and lift technician", "Fluke 87V MAX", "4 m drop rating"],
            ["Wastewater or pump-station operator", "Either", "Both IP67; pick the MAX for the fuller spec"],
            ["Food-plant electrician with wash-down", "Either", "Both sealed; same backlight and battery"],
            ["Solar or wind field technician", "Fluke 87V MAX", "Drops from racks and nacelles; published ohms accuracy"],
            ["Quality-audited maintenance team", "Fluke 87V MAX, or 28 II with certificate", "Full accuracy table vs. day-one cert"],
            ["Refinery or classified-area work", "Neither", "Use an intrinsically safe meter such as the 28 II EX"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If your environment is a dry plant floor rather than a wet or dusty site, the standard 87V gives you a
          lighter meter we have tested ourselves; see{" "}
          <Link href="/multimeters/fluke-28-ii-vs-fluke-87v" className={link}>
            Fluke 28 II vs Fluke 87V
          </Link>
          . For a wider field, read our{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          guide or the full{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            best multimeters
          </Link>{" "}
          roundup.
        </p>
      </section>

      <Callout title="Safety: a sealed meter is not a sealed circuit">
        IP67 keeps water out of the meter, not out of the circuit you&apos;re measuring. Wet gloves, wet probes and
        standing water all shorten the path from a live conductor to you. Dry the probe tips, use leads rated for the
        CAT IV 600V / CAT III 1000V category you&apos;re working in, and follow your site&apos;s lockout/tagout and
        arc-flash PPE rules. Never take either meter into a classified explosive atmosphere. If a job is outside your
        training or permit, stop and call a qualified electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "Both meters are IP67, share the same cold rating, AA battery life, weight and CAT IV 600V / CAT III 1000V protection, so the choice is narrow. Buy the Fluke 28 II if your site needs MSHA-approved equipment or you want the listing's NIST-traceable certificate. For every other harsh environment, buy the Fluke 87V MAX: it's rated for a 4 m drop instead of 3 m, carries two fewer counts on DC amps, and Fluke publishes its resistance, capacitance and frequency accuracy.",
  faqs: [
    {
      question: "Is the Fluke 28 II the same meter as the 87V MAX?",
      answer:
        "No, though they're close. Both are IP67, weigh 698.5 g holstered, run 800 hours on three AAs and share DC volts, AC volts and AC amps accuracy. The 28 II adds MSHA approval. The 87V MAX adds a 4 m drop rating, ±(0.2% + 2) DC amps against 0.2% + 4, TL175 leads and published accuracy for ohms, capacitance and frequency.",
    },
    {
      question: "Is the Fluke 87V MAX MSHA approved?",
      answer:
        "Fluke's 87V MAX page lists CE and CSA approvals and doesn't mention MSHA. The 28 II page lists MSHA approval. If your mine's electrical program specifies MSHA-approved instruments, buy the 28 II or confirm the 87V MAX's status with Fluke and your safety department before ordering.",
    },
    {
      question: "Can the Fluke 28 II or 87V MAX go underwater?",
      answer:
        "Briefly. IP67 covers temporary immersion, usually tested at about 1 m for 30 minutes under IEC 60529, so a drop into a puddle or sump shouldn't kill either meter. Neither is rated for continuous submersion. Dry it, open the battery door to check for moisture, and never take readings with a wet meter or wet probes.",
    },
    {
      question: "Which is better in extreme cold, the 28 II or the 87V MAX?",
      answer:
        "Neither has an edge. Fluke rates both for −15 to 55 °C continuously and down to −40 °C for up to 20 minutes; the MAX page adds that the excursion assumes the meter starts at 20 °C. For all-day work below −15 °C, both are outside their rating, so keep the meter warm between readings.",
    },
    {
      question: "Do the Fluke 28 II and 87V MAX have a low-pass filter for VFDs?",
      answer:
        "Yes, both do, and both list 250 µs peak capture and a −200 to 1090 °C temperature input with the 80BK-A probe. That makes either one usable on variable-frequency drive outputs in a wet or dusty plant. Fluke doesn't list a LoZ ghost-voltage mode for either meter.",
    },
    {
      question: "Is the Fluke 28 II intrinsically safe?",
      answer:
        "No. Fluke sells a separate model, the 28 II EX, as the intrinsically safe version for explosive atmospheres. The standard 28 II is MSHA approved and IP67, which is a different thing. The same applies to the 87V MAX: rugged and sealed, but not for use in a classified hazardous location.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 28 II vs Fluke 87V", href: "/multimeters/fluke-28-ii-vs-fluke-87v" },
    { label: "Fluke 87V vs Fluke 87V MAX", href: "/multimeters/fluke-87v-vs-fluke-87v-max" },
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Fluke 1587 FC vs Fluke 87V", href: "/multimeters/fluke-1587-fc-vs-fluke-87v" },
    { label: "Best multimeters for solar panel testing", href: "/multimeters/best-multimeters-for-solar-panel-testing" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke28IiVsFluke87vMaxPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
