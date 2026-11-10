import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// FNIRSI 1013D (the "1013D Plus" style adds a P4100 100X probe) per https://www.fnirsi.com/products/1013d (checked
// 2026-11-07): 2 channels, 100 MHz, 1 GSa/s ("1X=5MHz, 10X=100MHz"), 7-inch 800 x 480 capacitive touch screen, rise time
// <3 ns, storage depth "240 Kbit", timebase 50 s-10 ns, vertical sensitivity "50mV-500V" (FNIRSI's wording), 1 MOhm,
// Single/Normal/Auto trigger on rising/falling edge, AC/DC, highest test voltage 1X 40 V / 10X 400 V (100X "0~4000V"),
// roll mode, one-button AUTO with 25/50/75% adaptive trigger, Lissajous and FFT, cursors, 1 GB storage for 1000
// screenshots + 1000 waveforms, 12 parameters, 6000 mAh lithium battery, about 4 hours, usable while charging, Type-C
// 5 V 2A/3A/4A, USB export. No generator or multimeter. Item weight 2.33 lb per https://www.amazon.com/dp/B0BHHYMVKV
// (checked 2026-11-07, In Stock at ZIP 10001). Body dimensions not stated by FNIRSI.
// FNIRSI 2C53T per https://www.fnirsi.com/products/2c53t (checked 2026-11-07): 2 ch, 50 MHz ("dual channel independent
// 50M"), 250 MS/s, 1 Kpts, 1 MOhm, timebase 10 ns-20 s, 10 mV/div-10 V/div (x1), max +/-400 V, Auto/Normal/Single,
// rising/falling edge, Y-T/rolling/X-Y, AC/DC, persistence off/500 ms/1 s/infinite, 8 basic math operations + FFT, cursors,
// screenshot save and export; multimeter 4.5 digits, DC 1.9999-1000 V ranges, AC to 750.0 V, AC/DC current to 9.999 A,
// resistance to 19.999 MOhm, capacitance to 99.99 mF, temperature -55 to 1300 C, diode, continuity; generator 13
// waveforms, 0-50 kHz, 1 Hz step, 0-3 V, duty 0-100%; 2.8-inch 320 x 240; 3000 mAh, standby 6 h ("laboratory theoretical
// maximum"); Type-C 5 V/1 A; 167 x 89 x 35 mm; 300 g. Conflicts: FNIRSI's highlights say "20000 counts" while its
// description and the Amazon listing say 19999 counts; the Amazon listing https://www.amazon.com/dp/B0D6VX6BFL (checked
// 2026-11-07, In Stock at ZIP 10001) gives item weight 400 g against FNIRSI's 300 g (dimensions 6.57 x 3.5 x 1.38 in
// match). No CAT rating found for the meter in either source.
// Screen-area arithmetic: a 5:3 7-inch panel is 6.00 x 3.60 in (21.6 sq in); a 4:3 2.8-inch panel is 2.24 x 1.68 in
// (3.76 sq in); ratio 5.7x. Pixels 384,000 vs 76,800, ratio 5x.

const path = "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-2c53t";
const t1013 = picks.find((p) => p.name === "FNIRSI 1013D Plus")!;
const c53t = picks.find((p) => p.name === "FNIRSI 2C53T")!;

export const metadata = buildMetadata({
  title: "FNIRSI 1013D vs 2C53T: Tablet or Handheld?",
  description:
    "FNIRSI 1013D vs 2C53T: a 7-inch 100 MHz tablet scope against a 300 g 3-in-1 handheld with a multimeter and generator. Screens to scale, charts and verdict.",
  path: "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-2c53t",
  image: t1013.image,
});

const link = "text-accent hover:underline";

/** Both screens drawn to the same scale (30 px per inch), plus the 2C53T's whole case. */
function ScreenScaleDiagram() {
  const s = 30;
  return (
    <svg
      viewBox="0 0 420 252"
      className="w-full h-auto"
      role="img"
      aria-label="FNIRSI 1013D vs 2C53T screens drawn to the same scale. The 1013D's 7-inch, 800 by 480 screen measures about 6.0 by 3.6 inches, 21.6 square inches. The 2C53T's whole case is 167 by 89 millimeters, and its 2.8-inch, 320 by 240 screen measures about 2.24 by 1.68 inches, 3.76 square inches, so the tablet's screen has about 5.7 times the area."
    >
      <text x="10" y="16" fontSize="10" fontWeight="700" className="fill-foreground">FNIRSI 1013D screen</text>
      <rect x="10" y="26" width={6.0 * s} height={3.6 * s} rx="3" className="fill-accent/10 stroke-accent" strokeWidth="1.4" />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`v${i}`} x1={10 + ((i + 1) * 6.0 * s) / 10} x2={10 + ((i + 1) * 6.0 * s) / 10} y1="26" y2={26 + 3.6 * s} className="stroke-border" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <line key={`h${i}`} x1="10" x2={10 + 6.0 * s} y1={26 + ((i + 1) * 3.6 * s) / 8} y2={26 + ((i + 1) * 3.6 * s) / 8} className="stroke-border" strokeWidth="0.5" />
      ))}
      <path d={`M14 ${26 + 1.8 * s} q 11 -32 22 0 t 22 0 t 22 0 t 22 0 t 22 0 t 22 0 t 22 0 t 22 0`} className="fill-none stroke-accent" strokeWidth="1.4" />
      <text x="10" y={26 + 3.6 * s + 16} fontSize="9" className="fill-foreground">7-inch, 800 × 480</text>
      <text x="10" y={26 + 3.6 * s + 29} fontSize="9" className="fill-muted">6.0 × 3.6 in ≈ 21.6 sq in</text>

      <text x="222" y="16" fontSize="10" fontWeight="700" className="fill-foreground">FNIRSI 2C53T, whole case</text>
      <rect x="222" y="26" width={3.5 * s} height={6.57 * s} rx="10" className="fill-surface stroke-foreground" strokeWidth="1.4" />
      <rect x={222 + (3.5 * s - 2.24 * s) / 2} y="38" width={2.24 * s} height={1.68 * s} rx="2" className="fill-accent/10 stroke-accent" strokeWidth="1.4" />
      <path d={`M${222 + (3.5 * s - 2.24 * s) / 2 + 3} ${38 + 0.84 * s} q 6 -14 12 0 t 12 0 t 12 0 t 12 0 t 12 0`} className="fill-none stroke-accent" strokeWidth="1.2" />
      <rect x="236" y="104" width="77" height="44" rx="4" className="fill-surface stroke-border" strokeWidth="1" />
      <text x="274.5" y="130" fontSize="8.5" textAnchor="middle" className="fill-muted">keys</text>
      <circle cx="248" cy="196" r="7" className="fill-surface stroke-border" />
      <circle cx="274.5" cy="196" r="7" className="fill-surface stroke-border" />
      <circle cx="301" cy="196" r="7" className="fill-surface stroke-border" />
      <text x="274.5" y="216" fontSize="8" textAnchor="middle" className="fill-muted">meter jacks</text>
      <text x="338" y="44" fontSize="9" className="fill-foreground">Case</text>
      <text x="338" y="56" fontSize="9" className="fill-foreground">167 × 89 mm</text>
      <text x="338" y="76" fontSize="9" className="fill-foreground">Screen 2.8-inch,</text>
      <text x="338" y="88" fontSize="9" className="fill-foreground">320 × 240</text>
      <text x="338" y="102" fontSize="9" className="fill-muted">2.24 × 1.68 in</text>
      <text x="338" y="114" fontSize="9" className="fill-muted">≈ 3.76 sq in</text>
      <text x="10" y="244" fontSize="8.5" className="fill-muted">Same scale throughout. FNIRSI doesn&apos;t publish the 1013D&apos;s case size, so only its screen is drawn.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "FNIRSI 1013D vs 2C53T: Tablet or 3-in-1 Handheld?",
  path,
  published: "2026-11-07",
  intro:
    "FNIRSI 1013D vs 2C53T is really a question of what you carry to the job. The 1013D Plus is a two-channel 100 MHz tablet with a 7-inch touchscreen, 1 GSa/s and a 100X probe for high voltage, and it is only an oscilloscope. The 2C53T is a 300 g handheld that combines a 50 MHz two-channel scope, a 19,999-count multimeter and a 50 kHz signal generator, on a 2.8-inch screen. One sees more; the other does more.",
  a: {
    pick: t1013,
    imageAlt: "FNIRSI 1013D Plus tablet oscilloscope with 7-inch touchscreen and 100X probe",
    chooseIf: [
      "You want a big screen: the 7-inch panel has about 5.7 times the 2C53T's area",
      "Your signals reach past 10 MHz, or you need fast edges: 100 MHz and under 3 ns rise",
      "You need captures longer than 1 Kpts, or want to save up to 1,000 of them",
      "You'll probe high voltage and want the P4100 100X probe in the kit",
    ],
  },
  b: {
    pick: c53t,
    imageAlt: "FNIRSI 2C53T handheld 3-in-1 oscilloscope, multimeter and signal generator",
    chooseIf: [
      "You'd otherwise carry a multimeter too: it measures to 1000 V DC, 750 V AC and 10 A",
      "You want a pocketable tool: 167 × 89 × 35 mm and 300 g per FNIRSI",
      "You need a basic signal source: 13 waveforms up to 50 kHz",
      "Long days away from power matter: FNIRSI quotes up to 6 hours standby",
    ],
  },
  extraSpecs: [
    { label: "Screen", a: "7-inch 800 × 480, capacitive touch", b: "2.8-inch 320 × 240, buttons" },
    { label: "Record length", a: "\"240 Kbit\" (FNIRSI's wording)", b: "1 Kpts" },
    { label: "Timebase", a: "10 ns to 50 s", b: "10 ns to 20 s" },
    { label: "Multimeter", a: "None", b: "19,999 counts: 1000 V DC, 750 V AC, 10 A, 20 MΩ, 100 mF, temperature" },
    { label: "Signal generator", a: "None", b: "13 waveforms, 0–50 kHz, 0–3 V" },
    { label: "Max input", a: "40 V (1X), 400 V (10X), 4000 V (100X)", b: "±400 V" },
    { label: "Battery", a: "6000 mAh, about 4 hours; usable while charging", b: "3000 mAh, up to 6 h standby" },
    { label: "Charging", a: "USB-C 5 V, 2 A/3 A/4 A", b: "USB-C 5 V, 1 A" },
    { label: "Size and weight", a: "Size not stated; 2.33 lb per Amazon", b: "167 × 89 × 35 mm; 300 g (FNIRSI) or 400 g (Amazon)" },
  ],
  differences: [
    "Scope speed: 100 MHz and 1 GSa/s on the 1013D against 50 MHz per channel and 250 MS/s on the 2C53T. The tablet samples four times faster.",
    "Record length: the 2C53T stores 1 Kpts per capture. FNIRSI quotes the 1013D as \"240 Kbit\", which, whatever it means in points, is longer.",
    "Extra instruments: only the 2C53T has a multimeter (19,999 counts, True RMS) and a signal generator (13 waveforms to 50 kHz). The 1013D is a scope only.",
    "Screen: 7-inch 800 × 480 touchscreen against a 2.8-inch 320 × 240 display, about 5.7 times the area and 5 times the pixels.",
    "Size: the 2C53T is a 167 × 89 × 35 mm handheld at 300 g per FNIRSI. The 1013D weighs 2.33 lb per Amazon; FNIRSI doesn't give its size.",
    "High voltage: the 1013D Plus kit includes a 100X probe rated by FNIRSI to 4000 V; the 2C53T's scope input is listed at ±400 V.",
    "Neither has our Hands-on Tested badge. Both assessments are desk research from FNIRSI's product pages and the Amazon listings.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">The screens, side by side</h2>
        <p className="text-muted leading-7 mb-4">
          Screen size is the first thing you notice and the last thing spec tables explain. The 1013D&apos;s 7-inch
          5:3 panel works out to about 6.0 × 3.6 inches, or 21.6 square inches. The 2C53T&apos;s 2.8-inch 4:3 panel
          is 2.24 × 1.68 inches, 3.76 square inches. That&apos;s 5.7 times the area and 384,000 pixels against
          76,800.
        </p>
        <Figure
          caption={
            <>
              Both screens to the same scale, with the 2C53T&apos;s full case. The whole handheld, at 167 mm, is about as
              tall as the tablet&apos;s screen is wide.
            </>
          }
        >
          <ScreenScaleDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          With two traces, cursors and a measurement readout, a 2.8-inch screen gets crowded fast. That&apos;s fine
          for a quick look at a sensor or a PWM line in the field. For comparing two signals in detail, or showing a
          waveform to someone else, the tablet wins clearly, and its touch and gesture controls make zooming quicker
          than stepping through menus with buttons.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Figure caption={<>Screen area in square inches, from each panel&apos;s diagonal and aspect ratio.</>}>
            <BarChart
              items={[
                { label: "FNIRSI 1013D Plus", value: 21.6, display: "21.6 sq in", highlight: true },
                { label: "FNIRSI 2C53T", value: 3.76, display: "3.76 sq in" },
              ]}
            />
          </Figure>
          <Figure caption={<>Bandwidth with a 10X probe. FNIRSI gives the 1013D 5 MHz on 1X.</>}>
            <BarChart
              items={[
                { label: "FNIRSI 1013D Plus", value: 100, display: "100 MHz", highlight: true },
                { label: "FNIRSI 2C53T", value: 50, display: "50 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Real-time sample rate. The 1013D&apos;s 1 GSa/s is four times the 2C53T&apos;s 250 MS/s.</>}>
            <BarChart
              items={[
                { label: "FNIRSI 1013D Plus", value: 1000, display: "1 GSa/s", highlight: true },
                { label: "FNIRSI 2C53T", value: 250, display: "250 MS/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Rated battery time. The 2C53T&apos;s 6 h is FNIRSI&apos;s &quot;laboratory theoretical maximum&quot;.</>}>
            <BarChart
              items={[
                { label: "FNIRSI 2C53T", value: 6, display: "Up to 6 h", highlight: true },
                { label: "FNIRSI 1013D Plus", value: 4, display: "About 4 h" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FNIRSI 1013D vs 2C53T on a repair job</h2>
        <p className="text-muted leading-7 mb-4">
          Most faults start with a meter, not a scope. Is the supply there? Is that fuse open? Is the sensor getting
          5 V? The 2C53T answers those on its own, with DC ranges to 1000 V, AC to 750 V, current to 10 A, resistance,
          capacitance to 99.99 mF, diode and continuity. Then you switch to scope mode to see whether the signal on that
          pin is clean. With the 1013D you need a separate multimeter in the bag for the first half of that job.
        </p>
        <p className="text-muted leading-7 mb-4">
          The 2C53T&apos;s weak point is its 1 Kpts record. A thousand points spread across the screen is fine for a
          repeating signal. It isn&apos;t enough to capture a long, one-off event, such as a full engine crank or a
          supply start-up, at any detail: at a slow timebase the sample rate has to fall to fit the whole event into
          1,000 points. The 1013D&apos;s memory figure is poorly explained, but at 1 GSa/s and with 1,000 saved
          waveforms, it&apos;s the better tool for catching and keeping a capture.
        </p>
        <p className="text-muted leading-7 mb-4">
          The generator on the 2C53T is basic: 13 waveforms, up to 50 kHz, 0–3 V, adjustable duty cycle. That&apos;s
          enough to fake a slow sensor signal or feed an audio stage. The 1013D has none.
        </p>
        <KeyIdea title="Charging tells you how each is meant to be used">
          The 1013D charges at 5 V and up to 4 A over USB-C and keeps working while it charges, so it can sit on a
          bench plugged in all day. The 2C53T charges at 5 V and 1 A from a 3000 mAh pack, the profile of a meter that
          lives in a tool bag and gets topped up overnight.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "Why"]}
          rows={[
            ["One tool in the bag for appliance or electronics repair", "FNIRSI 2C53T", "Meter, scope and generator in 300 g"],
            ["Car diagnostics with high-voltage probing", "FNIRSI 1013D Plus", "100X probe to 4000 V per FNIRSI, big screen for crank captures"],
            ["Comparing two signals in detail", "FNIRSI 1013D Plus", "5.7 times the screen area, 1 GSa/s, longer record"],
            ["Signals above about 10–15 MHz", "FNIRSI 1013D Plus", "100 MHz against 50 MHz"],
            ["Students who need a meter and a scope", "FNIRSI 2C53T", "Two instruments covered, plus a basic generator"],
            ["Long one-off captures", "FNIRSI 1013D Plus", "The 2C53T's 1 Kpts record limits detail on slow timebases"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What FNIRSI&apos;s listings don&apos;t agree on</h2>
        <p className="text-muted leading-7 mb-4">
          The 2C53T has two small conflicts. FNIRSI&apos;s product highlights call the meter &quot;20000 counts&quot;
          while its own description and the Amazon listing say 19,999. FNIRSI lists the weight as 300 g; Amazon says
          400 g, though the dimensions match at 167 × 89 × 35 mm. Neither changes the verdict. We also found no CAT
          rating for the 2C53T&apos;s multimeter in either source, which matters if you plan to measure mains.
        </p>
        <p className="text-muted leading-7 mb-4">
          On the 1013D, FNIRSI gives no case dimensions, no ADC resolution and no two-channel sample rate, and its
          memory figure, &quot;240 Kbit&quot;, isn&apos;t a unit scope makers normally use. The 1013D Plus is the
          1013D sold with a P4100 100X probe; the tablet is the same.
        </p>
        <Callout title="Mains and a meter without a CAT rating">
          The 2C53T&apos;s meter ranges reach 750 V AC, but a range isn&apos;t a safety rating, and FNIRSI doesn&apos;t
          publish a CAT category for it in the sources we checked. On a distribution panel or a household circuit, use
          a meter rated CAT III or higher. With either scope, unplug the charger before probing anything mains-powered,
          use the 100X or a differential probe for high voltage, and call an electrician for building wiring.
        </Callout>
        <p className="text-muted leading-7 mt-4">
          The 2C53T has other rivals on{" "}
          <Link href="/oscilloscopes/owon-hds272s-vs-fnirsi-2c53t" className={link}>
            OWON HDS272S vs FNIRSI 2C53T
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" className={link}>
            Hantek 2D72 vs FNIRSI 2C53T
          </Link>
          . The 1013D is set against FNIRSI&apos;s four-instrument tablet on{" "}
          <Link href="/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-dpos350p" className={link}>
            FNIRSI 1013D vs DPOS350P
          </Link>{" "}
          and against a benchtop on{" "}
          <Link href="/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-1014d" className={link}>
            FNIRSI 1013D Plus vs FNIRSI 1014D
          </Link>
          . For car work in particular, see the{" "}
          <Link href="/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics" className={link}>
            automotive oscilloscope picks
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the FNIRSI 2C53T if you want one 300 g tool that measures volts, amps and ohms, shows two 50 MHz traces and puts out a basic test signal, and you can live with a 2.8-inch screen and 1 Kpts captures. Buy the FNIRSI 1013D Plus if the scope is the job: 100 MHz, 1 GSa/s, a 7-inch touchscreen, longer captures and a 100X probe for high voltage, with a separate meter in the bag.",
  chooseNeitherIf:
    "You'll measure on mains distribution panels. Neither lists a CAT rating; use a CAT III or CAT IV rated multimeter for that, and a differential probe for any scope work on mains.",
  faqs: [
    {
      question: "Does the FNIRSI 1013D have a multimeter?",
      answer:
        "No. The 1013D is an oscilloscope only, with cursor measurements and 12 automatic parameters but no meter inputs, generator or component tester. The 2C53T adds a 19,999-count multimeter with voltage, current, resistance, capacitance, temperature, diode and continuity modes, plus a 50 kHz generator.",
    },
    {
      question: "Is 50 MHz on the 2C53T enough for car diagnostics?",
      answer:
        "For most sensor and actuator signals, yes. Crank and cam sensors, injector pulses and lambda sensors run far below 50 MHz. The bigger limit is the 2C53T's 1 Kpts record, which keeps long captures such as a full crank coarse, and its ±400 V input. The 1013D Plus kit adds a 100X probe that FNIRSI rates to 4000 V.",
    },
    {
      question: "How much bigger is the 1013D's screen?",
      answer:
        "About 5.7 times the area. The 7-inch 5:3 panel is roughly 6.0 × 3.6 inches, 21.6 square inches; the 2C53T's 2.8-inch 4:3 panel is 2.24 × 1.68 inches, 3.76 square inches. The tablet also has 800 × 480 pixels against 320 × 240, five times as many, and it's a touchscreen.",
    },
    {
      question: "Which has the longer battery life?",
      answer:
        "FNIRSI rates the 2C53T at up to 6 hours standby from 3000 mAh, calling that a laboratory theoretical maximum, and the 1013D at about 4 hours from 6000 mAh. The 1013D can run while charging over 5 V USB-C at up to 4 A; the 2C53T charges at 5 V, 1 A.",
    },
    {
      question: "What is the difference between the FNIRSI 1013D and 1013D Plus?",
      answer:
        "The kit. FNIRSI sells the same tablet in two styles: \"1013D Std.\" and \"1013D Plus\". The Plus includes a P4100 100X high-voltage probe, which FNIRSI says can measure up to 4000 V. Specs such as 100 MHz, 1 GSa/s, the 7-inch screen and the 6000 mAh battery are identical.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "FNIRSI 1013D vs DPOS350P", href: "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-dpos350p" },
    { label: "FNIRSI 1013D Plus vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-1014d" },
    { label: "FNIRSI 2C53T vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-2c53t-vs-fnirsi-1014d" },
    { label: "OWON HDS272S vs FNIRSI 2C53T", href: "/oscilloscopes/owon-hds272s-vs-fnirsi-2c53t" },
    { label: "Hantek 2D72 vs FNIRSI 2C53T", href: "/oscilloscopes/hantek-2d72-vs-fnirsi-2c53t" },
    { label: "FNIRSI 2C53T vs WESTOBiG 2C53P Plus", href: "/oscilloscopes/fnirsi-2c53t-vs-westobig-2c53p-plus" },
    { label: "Best oscilloscopes for automotive diagnostics", href: "/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics" },
    { label: "Oscilloscope vs multimeter", href: "/oscilloscopes/oscilloscope-vs-multimeter" },
  ],
};

export default function Fnirsi1013dPlusVsFnirsi2c53tPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
