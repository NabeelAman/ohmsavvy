// Specs per Fluke, checked 2026-10-27:
// - Fluke 28 II product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-28-ii
//   "IP 67 waterproof & dustproof"; "Designed to withstand 3 meter drop (with holster)" / "10 feet drop test";
//   "MSHA approval" / "MSHA Approved"; operating -15 °C to +55 °C, -40 °C for up to 20 minutes, 95% humidity;
//   "Withstands hazardous 8,000 volt spikes"; three AA batteries, 800 hours; 698.5 g with holster;
//   6.35 x 10.0 x 19.81 cm (H x W x L, with holster); AC V 0.7% + 4, 0.1 mV to 1000 V, bandwidth 15 Hz to 20 kHz;
//   DC V 0.05% + 1; DC A 0.2% + 4, AC A 1.0% + 2, 0.1 µA to 10 A (20 A for 30 s); 6000 counts, 20,000-count hi-res
//   mode; bar graph yes (segments not stated); two-level white backlight and backlit keypad; reversible rubber
//   holster; low-pass filter; 250 µs peak capture; Min/Max/Avg; resistance 0.1 Ω to 50 MΩ (accuracy not on page);
//   capacitance 1 nF to 9999 µF; frequency 0.5 Hz to 199.99 kHz; temperature -200 to +1090 °C; in the box: TL75
//   leads, AC175 clips, 80BK-A thermocouple, quick reference guide; limited lifetime warranty; CAT IV 600V /
//   CAT III 1000V.
// - Fluke 87V product page and spec tab: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-87v
//   IP30 (comparison table); drop 3 m (comparison table) vs 1 m per IEC 61010-1 (spec tab) - conflict stated on page;
//   9V alkaline, ~400 h; 355 g (624 g with holster); 201 x 98 x 52 mm with holster; operating -20 to 55 °C;
//   AC V ±(0.7% + 2), 20 kHz with low-pass filter (3 dB at 1 kHz); DC V ±(0.05% + 1); DC A ±(0.2% + 2);
//   AC A ±(1.0% + 2); 0.01 µA DC resolution; resistance ±(0.2% + 1) to 50 MΩ; 6000 counts, 19,999 hi-res; 32-segment
//   bar graph; keypad not backlit; spikes over 8000 V; approvals CE, CSA, RCM (no MSHA listed); removable holster with
//   tilt-leg; TL75 leads, 80BK probe; lifetime warranty.
// - Fluke 87V MAX drop (4 m) and IP67 per https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/87v-max
// - Amazon listing for the 28 II (B002X9ISWI): bullets say the unit is calibrated before shipment with a
//   NIST-traceable certificate with data; offers are from third-party sellers. Amazon's "300 g" weight conflicts with
//   Fluke's 698.5 g (we use Fluke and say so). The 28 II EX (B00C2DVKPC) is a different model; Fluke describes it as
//   intrinsically safe: https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-28-ii-ex
// Picks: Fluke 28 II in src/lib/multimeter-catalog.ts (4.6, not tested by us); Fluke 87V in best-multimeters (4.8,
// hands-on tested).
import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const path = "/multimeters/fluke-28-ii-vs-fluke-87v";

const all = getAllPicks("multimeters");

export const metadata = buildMetadata({
  title: "Fluke 28 II vs Fluke 87V for Industrial Work",
  description:
    "Fluke 28 II vs Fluke 87V comparison for industrial work: IP67, MSHA approval and a 3 m drop rating against the standard 87V's tighter specs, with a verdict.",
  image: all.find((p) => p.name === "Fluke 28 II")!.image,
  path: "/multimeters/fluke-28-ii-vs-fluke-87v",
});

const link = "text-accent hover:underline";

/** Operating temperature windows as Fluke lists them, on a -45 to 60 °C axis. */
function TemperatureWindowDiagram() {
  const x = (c: number) => 30 + ((c + 45) / 105) * 300;
  const ticks = [-40, -20, 0, 20, 40, 55];
  return (
    <svg
      viewBox="0 0 360 170"
      className="w-full h-auto"
      role="img"
      aria-label="Operating temperature chart: the Fluke 87V is listed from minus 20 to 55 degrees Celsius continuously. The Fluke 28 II is listed from minus 15 to 55 degrees continuously, and down to minus 40 degrees for up to 20 minutes."
    >
      <line x1={x(-45)} x2={x(60)} y1="128" y2="128" className="stroke-border" strokeWidth="1" />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1="124" y2="132" className="stroke-muted" strokeWidth="1" />
          <text x={x(t)} y="146" fontSize="9" textAnchor="middle" className="fill-muted">
            {t} °C
          </text>
        </g>
      ))}
      <text x="30" y="22" fontSize="10.5" fontWeight="700" className="fill-foreground">Fluke 87V</text>
      <rect x={x(-20)} y="30" width={x(55) - x(-20)} height="22" rx="4" className="fill-accent/40" />
      <text x={x(18)} y="45" fontSize="9" textAnchor="middle" className="fill-foreground">-20 to 55 °C, continuous</text>
      <text x="30" y="74" fontSize="10.5" fontWeight="700" className="fill-accent">Fluke 28 II</text>
      <rect x={x(-40)} y="82" width={x(-15) - x(-40)} height="22" rx="4" className="fill-none stroke-accent" strokeWidth="1.4" strokeDasharray="4 3" />
      <rect x={x(-15)} y="82" width={x(55) - x(-15)} height="22" rx="4" className="fill-accent" />
      <text x={x(-27.5)} y="97" fontSize="8.5" textAnchor="middle" className="fill-accent">20 min</text>
      <text x={x(20)} y="97" fontSize="9" textAnchor="middle" fill="#fff">-15 to 55 °C, continuous</text>
      <text x="180" y="164" fontSize="9" textAnchor="middle" className="fill-muted">
        Dashed: short-term rating only. Neither meter is listed above 55 °C.
      </text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "multimeters",
  heading: "Fluke 28 II vs Fluke 87V: Which Is Better for Industrial Work?",
  path,
  published: "2026-10-27",
  intro:
    "For industrial work in wet, dusty or underground environments, the Fluke 28 II is the better fit: Fluke rates it IP67, approves it for mining (MSHA), rates it for a 3 m drop and lets it go to -40 °C for 20 minutes. For indoor plant maintenance, the Fluke 87V is the stronger instrument, with slightly tighter AC volts and DC amps specs, a 0.01 µA DC resolution and a lighter case. Both share the CAT IV 600V / CAT III 1000V rating, a low-pass filter for drives, 250 µs peak capture, temperature input and a lifetime warranty.",
  a: {
    pick: all.find((p) => p.name === "Fluke 28 II")!,
    imageAlt: "Fluke 28 II rugged IP67 True RMS multimeter in its holster, front view",
    chooseIf: [
      "You work in mines, quarries or tunnels where an MSHA-approved meter is expected",
      "Your meter gets hosed down, rained on or dropped into water and sludge",
      "You want a backlit keypad, 800 hours on AA cells and, per the Amazon listing, a calibration certificate in the box",
    ],
  },
  b: {
    pick: all.find((p) => p.name === "Fluke 87V")!,
    reviewHref: "/multimeters/fluke-87v-review",
    imageAlt: "Fluke 87V True RMS industrial digital multimeter, front view",
    chooseIf: [
      "Your industrial work is in dry electrical rooms: MCCs, drive cabinets, PLC panels",
      "You want the tighter published AC volts and DC amps accuracy and a full resistance accuracy spec",
      "You want the meter we've tested hands-on, and a slimmer, lighter case on the belt",
    ],
  },
  extraSpecs: [
    { label: "Ingress protection", a: "IP67, waterproof and dustproof", b: "IP30" },
    { label: "MSHA approval", a: "Yes", b: "Not listed (CE, CSA, RCM)" },
    { label: "Drop rating", a: "3 m (10 ft) with holster", b: "3 m (comparison table); 1 m per IEC 61010-1 (spec tab)" },
    { label: "Operating temperature", a: "-15 to 55 °C; -40 °C for 20 min; 95% RH", b: "-20 to 55 °C" },
    { label: "Spike withstand", a: "8,000 V", b: "Over 8,000 V" },
    { label: "AC volts", a: "0.7% + 4, 15 Hz to 20 kHz", b: "±(0.7% + 2), 20 kHz" },
    { label: "DC amps", a: "0.2% + 4", b: "±(0.2% + 4) on 60 mA; ±(0.2% + 2) on 400 mA" },
    { label: "Resistance", a: "0.1 Ω to 50 MΩ; accuracy not stated on page", b: "To 50 MΩ, ±(0.2% + 1)" },
    { label: "Hi-res mode", a: "20,000 counts", b: "19,999 counts" },
    { label: "Battery", a: "3 × AA, 800 h", b: "9V alkaline, ~400 h" },
    { label: "Backlit keypad", a: "Yes", b: "No" },
    { label: "Weight with holster", a: "698.5 g (Amazon lists 300 g)", b: "624 g" },
    { label: "Calibration certificate", a: "NIST-traceable, per Amazon listing", b: "Not included with the standard model" },
    { label: "Warranty", a: "Limited lifetime", b: "Lifetime" },
  ],
  differences: [
    "Environment: the 28 II is IP67 (sealed against dust and rated for temporary immersion). The 87V is IP30, with no rated water protection.",
    "Mining: Fluke lists MSHA approval for the 28 II. The 87V's listed approvals are CE, CSA and RCM, with no MSHA.",
    "Cold: the 28 II can run down to -40 °C for up to 20 minutes. Its continuous range starts at -15 °C, while the 87V's starts lower, at -20 °C.",
    "Precision: the 87V's AC volts (0.7% + 2) and DC amps on the 400 mA range (0.2% + 2) carry two fewer counts than the 28 II's (0.7% + 4 and 0.2% + 4); on the 60 mA loop range both are 0.2% + 4. DC volts are identical at 0.05% + 1.",
    "Power and visibility: three AA cells for 800 hours and a backlit keypad on the 28 II; one 9V for about 400 hours and an unlit keypad on the 87V.",
    "Shared: CAT IV 600V / CAT III 1000V, a low-pass filter, 250 µs peak capture, 10 A input (20 A for 30 s), -200 to 1090 °C temperature, frequency to about 200 kHz and a lifetime warranty.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Two kinds of industrial</h2>
        <p className="text-muted leading-7 mb-4">
          &quot;Industrial work&quot; covers two very different days. One is spent indoors in a climate-controlled
          electrical room, chasing a drive fault or calibrating a loop. The other is spent at a pit, a pump station, a
          wash-down line or a conveyor gallery coated in dust. The 87V was built for the first, and the 28 II was built
          to bring nearly the same measuring set to the second.
        </p>
        <InfoCards
          items={[
            { label: "28 II: sealed", desc: "IP67 against IP30. The case is the reason the 28 II exists." },
            { label: "28 II: MSHA", desc: "Fluke lists MSHA approval; the 87V page doesn't." },
            { label: "28 II: cold excursions", desc: "Down to -40 °C for 20 minutes." },
            { label: "87V: tighter digits", desc: "Two fewer counts on AC volts and DC amps." },
            { label: "87V: lighter", desc: "624 g holstered against 698.5 g." },
            { label: "Same safety rating", desc: "Both CAT IV 600V / CAT III 1000V." },
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          We own and have tested the 87V; it holds our 4.8 rating. The 28 II is scored 4.6 from Fluke&apos;s published
          specs and its Amazon listing, not from our own use. Our{" "}
          <Link href="/multimeters/fluke-87v-review" className={link}>
            Fluke 87V review
          </Link>{" "}
          has the full measurement detail.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 28 II vs 87V spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Much of the electrical spec is shared, which is no accident: Fluke presents the 28 II as a rugged meter with
          87V-class functions. Where the numbers do part ways, the 87V wins the measuring lines and the 28 II wins
          everything to do with surviving the site.
        </p>
        <DataTable
          head={["Spec", "Fluke 28 II", "Fluke 87V", "Edge"]}
          rows={[
            ["Safety rating", "CAT IV 600V / CAT III 1000V", "CAT IV 600V / CAT III 1000V", "Same"],
            ["DC volts", "0.05% + 1, to 1000 V", "±(0.05% + 1), to 1000 V", "Same"],
            ["AC volts", "0.7% + 4, 15 Hz to 20 kHz", "±(0.7% + 2), 20 kHz", "87V"],
            ["Low-pass filter", "Yes", "Yes, 3 dB at 1 kHz", "Same"],
            ["DC amps", "0.2% + 4", "±(0.2% + 4) on 60 mA; ±(0.2% + 2) on 400 mA", "Tie on loops; 87V on 400 mA"],
            ["AC amps", "1.0% + 2", "±(1.0% + 2)", "Same"],
            ["Current span", "0.1 µA to 10 A (20 A, 30 s)", "To 10 A (20 A, 30 s); 0.01 µA DC resolution", "87V"],
            ["Resistance", "0.1 Ω to 50 MΩ", "±(0.2% + 1), to 50 MΩ", "87V (spec published)"],
            ["Capacitance", "1 nF to 9,999 µF", "To 9,999 µF", "Same"],
            ["Frequency", "0.5 Hz to 199.99 kHz", "To 200 kHz", "Same"],
            ["Temperature", "-200 to 1090 °C, 80BK-A", "-200 to 1090 °C, 80BK", "Same"],
            ["Peak capture", "250 µs", "250 µs", "Same"],
            ["IP rating", "IP67", "IP30", "28 II"],
            ["MSHA", "Approved", "Not listed", "28 II"],
            ["Drop", "3 m with holster", "3 m (table) / 1 m (spec tab)", "28 II or tie"],
            ["Operating temperature", "-15 to 55 °C; -40 °C, 20 min", "-20 to 55 °C", "Depends"],
            ["Battery", "3 × AA, 800 h", "9V, ~400 h", "28 II"],
            ["Keypad backlight", "Yes", "No", "28 II"],
            ["Weight with holster", "698.5 g", "624 g", "87V"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Operating temperature windows from Fluke&apos;s spec tabs.</>}>
            <TemperatureWindowDiagram />
          </Figure>
          <Figure caption={<>Published battery life. Higher is better.</>}>
            <BarChart
              items={[
                { label: "Fluke 28 II (3 × AA)", value: 800, display: "800 h", highlight: true },
                { label: "Fluke 87V (9V)", value: 400, display: "~400 h" },
              ]}
            />
          </Figure>
        </div>
        <div className="mt-4">
          <Figure
            caption={
              <>
                Illustrative: allowed DC error on a 12.00 mA loop reading, assuming both meters resolve 0.01 mA on that
                range (Fluke&apos;s 28 II page doesn&apos;t list its range steps). Fluke&apos;s 83V/87V detailed specifications give the 87V&apos;s 60 mA range as ±(0.2% + 4), so at loop currents the two come out the same; the 87V&apos;s tighter + 2 applies on its 400 mA range.
              </>
            }
          >
            <BarChart
              items={[
                { label: "Fluke 87V: 0.2% + 4 (60 mA range)", value: 0.064, display: "±0.064 mA" },
                { label: "Fluke 28 II: 0.2% + 4", value: 0.064, display: "±0.064 mA" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          The working: 0.2% of 12.00 mA is 0.024 mA. Two counts of 0.01 mA add 0.02 mA on the 87V; four add 0.04 mA on
          the 28 II. On a 4–20 mA loop, where 16 mA spans the full process range, ±0.064 mA is about 0.4% of span,
          which is fine for &quot;is the transmitter alive and roughly right?&quot; but loose for a calibration record.
          For loop work in more depth, see our{" "}
          <Link href="/multimeters/best-multimeters-for-4-20ma-loop-testing" className={link}>
            4–20 mA loop testing
          </Link>{" "}
          guide.
        </p>
        <div className="mt-4">
          <KeyIdea title="Conflicts in the sources">
            Fluke&apos;s 87V page gives two drop figures: 3 m in its comparison table and a 1 m drop per IEC 61010-1 in
            the spec tab, so the 28 II&apos;s 3 m (with holster) is either equal or three times better. Amazon lists the
            28 II at 300 g, while Fluke says 698.5 g with holster; we use Fluke&apos;s figure. Fluke&apos;s 28 II page
            also gives no resistance accuracy, so we can&apos;t compare that line.
          </KeyIdea>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Harsh-site jobs: where each meter belongs</h2>
        <p className="text-muted leading-7 mb-4">
          Walk through a heavy-industry site and the right choice changes from building to building. The 28 II&apos;s
          case earns its weight wherever water, slurry or dust can reach the meter; the 87V&apos;s tighter numbers
          matter where the environment is controlled and the reading goes into a report.
        </p>
        <DataTable
          head={["Location or job", "Better fit", "Reason"]}
          rows={[
            ["Underground or surface mine", "Fluke 28 II", "MSHA approval listed; dust-tight case"],
            ["Wash-down food or beverage line", "Fluke 28 II", "IP67 rating covers spray and brief immersion"],
            ["Pump and lift stations, wastewater", "Fluke 28 II", "Wet floors, drops into sumps"],
            ["Outdoor substation or yard in winter", "Fluke 28 II", "-40 °C excursions for up to 20 minutes"],
            ["MCC room and drive cabinets", "Fluke 87V", "Same low-pass filter, tighter AC volts digits, lighter"],
            ["Instrument loops and calibration checks", "Fluke 87V", "0.01 µA DC resolution; same 0.2% + 4 as the 28 II on the 60 mA loop range"],
            ["Steady cold storage below -15 °C", "Fluke 87V", "Its continuous rating goes to -20 °C"],
            ["Hot process areas above 55 °C", "Neither", "Both stop at 55 °C; keep the meter out of the heat"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          The cold-storage row surprises people. The 28 II&apos;s headline -40 °C is a 20-minute excursion rating. For
          a technician who stays inside a -18 °C freezer to work on evaporator fans, the 87V&apos;s continuous -20 °C
          floor is the better published match. For someone stepping out of a heated truck to an outdoor disconnect in
          a northern winter, the 28 II&apos;s short-term rating is the useful one.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">MSHA approval and the calibration certificate</h2>
        <p className="text-muted leading-7 mb-4">
          MSHA is the US Mine Safety and Health Administration. Fluke lists the 28 II as MSHA approved, and the 87V&apos;s
          page lists no such approval. If your mine&apos;s electrical program calls for approved test equipment, that
          line can decide the purchase on its own. Check the approval&apos;s conditions with your safety department;
          an approval is not the same as intrinsic safety. Fluke sells a separate 28 II EX for hazardous locations, and
          the standard 28 II on this page is not that model.
        </p>
        <p className="text-muted leading-7">
          The Amazon listing for the 28 II also says the unit is calibrated before shipment and comes with a
          NIST-traceable certificate with data. Plants working under a quality system often need a calibration record
          before a meter enters service, so that can save a trip to a cal lab. The offer comes from a third-party
          seller rather than Amazon itself, so confirm the certificate is still described on the listing when you
          order. Fluke&apos;s own 87V box contents list no certificate.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Fluke 28 II vs 87V: which should you buy?</h2>
        <DataTable
          head={["You are…", "Buy", "Why"]}
          rows={[
            ["Mine electrician", "Fluke 28 II", "MSHA listed, IP67, 3 m drop"],
            ["Plant maintenance tech, mostly indoors", "Fluke 87V", "Tighter specs, lighter, tested by us"],
            ["Instrument and controls tech", "Fluke 87V", "Better DC amps digits for loop checks"],
            ["Water or wastewater operator", "Fluke 28 II", "Wet environment is the main risk"],
            ["Food plant electrician with wash-down", "Fluke 28 II", "Survives hose-down cleaning cycles"],
            ["Outdoor utility or yard work", "Fluke 28 II, or 87V MAX", "Both IP67; the MAX adds a 4 m drop rating"],
            ["Needs a cal certificate on day one", "Fluke 28 II", "Listing includes a NIST-traceable certificate"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          If you like the 87V&apos;s layout but need sealing, there is a third option: the 87V MAX is also IP67 and
          rated for a 4 m drop. We compare it with the standard model in{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-87v-max" className={link}>
            Fluke 87V vs Fluke 87V MAX
          </Link>
          . For other industrial meters, see{" "}
          <Link href="/multimeters/fluke-87v-vs-fluke-289" className={link}>
            Fluke 87V vs Fluke 289
          </Link>{" "}
          and our{" "}
          <Link href="/multimeters/best-multimeter-for-electricians" className={link}>
            best multimeter for electricians
          </Link>{" "}
          guide.
        </p>
      </section>

      <Callout title="Safety: rugged doesn't mean rated for every hazard">
        A sealed case protects the meter, not you. Neither the standard 28 II nor the 87V is described by Fluke as
        intrinsically safe, so don&apos;t take either into a classified hazardous (explosive) atmosphere; that needs a
        meter certified for it, and your site&apos;s permit. On industrial switchgear, follow lockout/tagout and wear
        the arc-flash PPE your site&apos;s hazard assessment requires. Both meters are CAT IV 600V / CAT III 1000V
        only with leads of the same rating, and wet hands or probes can defeat any rating. If you&apos;re unsure whether
        a circuit is in scope for you, stop and get a qualified electrician.
      </Callout>
    </>
  ),
  bottomLine:
    "Choose the Fluke 28 II when the environment is the problem: IP67 sealing, MSHA approval, a 3 m drop rating, short cold excursions to -40 °C, 800-hour AA battery life and a backlit keypad make it the mine and wash-down meter. Choose the Fluke 87V, our hands-on tested pick, for indoor plant and controls work, where its tighter AC volts and DC amps specs and lighter case count for more. Both share the same safety rating and drive-ready features.",
  faqs: [
    {
      question: "Is the Fluke 28 II the same as an 87V?",
      answer:
        "Not quite. It shares most of the 87V's functions, including the CAT IV 600V / CAT III 1000V rating, low-pass filter, 250 µs peak capture, temperature input and 0.05% + 1 DC volts. It adds an IP67 case, MSHA approval and a backlit keypad, but its AC volts and DC amps specs carry two more counts than the 87V's.",
    },
    {
      question: "Is the Fluke 28 II intrinsically safe?",
      answer:
        "Fluke doesn't describe the standard 28 II as intrinsically safe. It lists MSHA approval and IP67 sealing, which is a different thing. Fluke sells a separate model, the 28 II EX, for hazardous locations. Don't take the standard 28 II into a classified explosive atmosphere; ask your safety department which certified meter your site requires.",
    },
    {
      question: "Which is more accurate, the Fluke 28 II or 87V?",
      answer:
        "The 87V, slightly. Fluke lists both at 0.05% + 1 on DC volts and 1.0% + 2 on AC amps, but the 87V's AC volts are ±(0.7% + 2) against 0.7% + 4 on the 28 II, and its DC amps are ±(0.2% + 2) against 0.2% + 4 on the 400 mA range (both are 0.2% + 4 on the 60 mA range used for 4-20 mA loops). Fluke also publishes a resistance accuracy for the 87V but not for the 28 II.",
    },
    {
      question: "Does the Fluke 28 II come with a calibration certificate?",
      answer:
        "The Amazon listing we link to says the unit is calibrated before shipment and ships with a NIST-traceable certificate with data. That comes from the seller's listing, not Fluke's box contents, which list only the meter, TL75 leads, AC175 clips, the 80BK-A probe and a quick reference guide. Confirm the listing still says so when you order.",
    },
    {
      question: "Can the Fluke 87V be used outdoors?",
      answer:
        "Yes, in dry conditions. Its operating range is -20 °C to 55 °C and it carries the same CAT IV 600V rating as the 28 II. What it lacks is water protection: Fluke rates it IP30. For rain, spray or work near standing water, the IP67 28 II or 87V MAX is the safer meter to own.",
    },
    {
      question: "How long do the batteries last in the Fluke 28 II?",
      answer:
        "Fluke quotes 800 hours from three AA batteries. The 87V runs on a single 9V alkaline cell rated about 400 hours without the backlight. On a meter used all shift, the 28 II roughly halves how often you change batteries, and AA cells are easier to find at a remote site than 9V ones.",
    },
  ],
  roundup: { label: "See the full multimeter roundup", href: "/multimeters/best-multimeters" },
  related: [
    { label: "Fluke 87V review", href: "/multimeters/fluke-87v-review" },
    { label: "Fluke 87V vs Fluke 87V MAX", href: "/multimeters/fluke-87v-vs-fluke-87v-max" },
    { label: "Fluke 87V vs Fluke 289", href: "/multimeters/fluke-87v-vs-fluke-289" },
    { label: "Fluke 87V vs Fluke 179", href: "/multimeters/fluke-87v-vs-fluke-179" },
    { label: "Best multimeters for 4-20 mA loop testing", href: "/multimeters/best-multimeters-for-4-20ma-loop-testing" },
    { label: "Best multimeter for electricians", href: "/multimeters/best-multimeter-for-electricians" },
  ],
};

export default function Fluke28IiVsFluke87vPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="multimeters" current={path} />
    </>
  );
}
