import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Hantek 6022BE per https://hantek.com/products/detail/31 (6022BE column; checked 2026-11-07): 20 MHz, 2 channels,
// 48 MS/s, 8-bit, 1 MOhm / 25 pF, DC coupling only, 20 mV to 5 V gain range, timebase 4 ns to 5 ks, edge trigger
// (rising/falling) on CH1/CH2 with Auto/Normal/Single, X-Y mode, FFT and add/subtract/multiply/divide math, cursors,
// 23 measurement functions and pass/fail, diode-clamp input protection with no voltage figure, USB 2.0 bus power,
// 205 x 120 x 35 mm, weight not stated, Windows 10/8/7/NT/XP/Vista, SDK and driver with LabVIEW/VB/VC examples, no
// generator. The page's header cites 250 MS/s and 20-200 MHz for the wider series; the 6022BE column says 48 MS/s and
// 20 MHz. Memory row doesn't map cleanly to this model.
// Hantek 6022BE Amazon listing https://www.amazon.com/dp/B0728HBNDV (checked 2026-11-07): "up to 1 M memory depth per
// channel", 20 automatic measurements (Hantek's page says 23), two passive probes, USB cable, software media.
// Hantek 1008C per https://hantek.com/products/detail/13170 (checked 2026-11-07): 8 channels, 12-bit, 2.4 MSa/s,
// 4K memory, 1 MOhm, 400 V (DC + AC peak), DC coupling, 10 mV/div to 5 V/div, edge trigger on CH1-CH8, 8-channel
// programmable LVTTL generator 0-250 kHz, "Over 80 types" of automotive functions in the overview but "78 types of
// vehicle diagnosis function" further down, one high-voltage ignition probe listed as included, USB 2.0 full speed,
// no external supply, Windows XP/7/8/10, 190 x 167 x 35 mm, 0.63 kg. 100 kHz bandwidth is stated only in the
// shared 1008 manual (per this site's 1008C Pick).
// Hantek 1008C Amazon listing https://www.amazon.com/dp/B00BSR98KW (checked 2026-11-07): over 80 automotive functions
// (ignition, sensor, bus detection, starter and charging circuits), video help, one-key diagnostic report. Per the
// 1008C Pick, the listing's included-components list doesn't name an ignition probe.
// Both ASINs had a buy box at ZIP 10001 on 2026-11-07. Samples-per-bit figures below are sample rate divided by bit
// rate, not measurements; 500 kbit/s is a common high-speed CAN rate.

const path = "/oscilloscopes/hantek-6022be-vs-hantek-1008c";
const h6022 = picks.find((p) => p.name === "Hantek 6022BE")!;
const h1008c = picks.find((p) => p.name === "Hantek 1008C")!;

export const metadata = buildMetadata({
  title: "Hantek 6022BE vs 1008C: Which for Car Work?",
  description:
    "Hantek 6022BE vs 1008C for car diagnostics: two Hantek USB scopes compared on channels, voltage headroom, ignition probe, CAN speed and test software.",
  path: "/oscilloscopes/hantek-6022be-vs-hantek-1008c",
  image: h1008c.image,
});

const link = "text-accent hover:underline";

/** One engine bay, two channel budgets: the 1008C covers a four-cylinder's sensors and injectors at once; the 6022BE gets two. */
function EngineHookupDiagram() {
  const signals = [
    { y: 40, t: "Crank sensor" },
    { y: 60, t: "Cam sensor" },
    { y: 80, t: "Injector 1" },
    { y: 100, t: "Injector 2" },
    { y: 120, t: "Injector 3" },
    { y: 140, t: "Injector 4" },
    { y: 160, t: "Coil primary" },
    { y: 180, t: "Ignition probe" },
  ];
  return (
    <svg
      viewBox="0 0 360 215"
      className="w-full h-auto"
      role="img"
      aria-label="Hantek 6022BE vs 1008C hookup on a four-cylinder engine: the 1008C's eight inputs reach the crank sensor, cam sensor, four injectors, a coil primary and the high-voltage ignition probe at once, while the 6022BE's two inputs cover only the crank and cam sensors, so the injectors and ignition need separate passes."
    >
      <text x="180" y="16" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Four-cylinder engine signals</text>
      {signals.map((s, i) => (
        <g key={s.t}>
          <rect x="130" y={s.y - 11} width="100" height="16" rx="3" className="fill-surface stroke-border" strokeWidth="1" />
          <text x="180" y={s.y} fontSize="8.5" textAnchor="middle" className="fill-foreground">{s.t}</text>
          <path d={`M230 ${s.y - 3} H262`} className="stroke-accent" strokeWidth="1.4" />
          {i < 2 && <path d={`M130 ${s.y - 3} H98`} className="stroke-foreground" strokeWidth="1.4" />}
        </g>
      ))}
      <rect x="262" y="28" width="88" height="160" rx="8" className="fill-accent/10 stroke-accent" strokeWidth="1.5" />
      <text x="306" y="100" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-accent">1008C</text>
      <text x="306" y="114" fontSize="8.5" textAnchor="middle" className="fill-muted">8 inputs</text>
      <text x="306" y="126" fontSize="8.5" textAnchor="middle" className="fill-muted">all at once</text>
      <rect x="10" y="28" width="88" height="44" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.5" />
      <text x="54" y="47" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">6022BE</text>
      <text x="54" y="61" fontSize="8.5" textAnchor="middle" className="fill-muted">2 inputs</text>
      <text x="54" y="100" fontSize="8.5" textAnchor="middle" className="fill-muted">Injectors and</text>
      <text x="54" y="112" fontSize="8.5" textAnchor="middle" className="fill-muted">ignition: move</text>
      <text x="54" y="124" fontSize="8.5" textAnchor="middle" className="fill-muted">the probes and</text>
      <text x="54" y="136" fontSize="8.5" textAnchor="middle" className="fill-muted">run it again</text>
      <text x="180" y="207" fontSize="8" textAnchor="middle" className="fill-muted">The ignition probe is listed on Hantek&apos;s 1008C page; check it is in your box.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Hantek 6022BE vs 1008C",
  path,
  published: "2026-11-07",
  intro:
    "Hantek 6022BE vs 1008C usually comes up when someone wants a cheap USB scope for the car. The answer is the 1008C for engine diagnostics: eight 12-bit inputs rated to 400 V, an ignition probe on Hantek's parts list, an eight-channel crank and cam signal generator and 78 to 80-plus guided vehicle tests. The 6022BE has two inputs, no stated voltage limit and no car software, but at 48 MS/s and 20 MHz it is the faster scope, and that matters for CAN bus and general electronics.",
  a: {
    pick: h6022,
    imageAlt: "Hantek 6022BE two-channel 20 MHz USB oscilloscope",
    chooseIf: [
      "Your main work is electronics on the bench, with cars as an occasional extra",
      "You want to look at CAN bus edges, where 48 MS/s gives about 96 samples per 500 kbit/s bit",
      "You want X-Y mode, an SDK and LabVIEW, VB or VC examples from Hantek",
      "Two channels are enough, for example crank against cam timing",
    ],
  },
  b: {
    pick: h1008c,
    imageAlt: "Hantek 1008C eight-channel automotive diagnostic USB oscilloscope kit",
    chooseIf: [
      "You diagnose engines and want crank, cam, four injectors and ignition on screen together",
      "You want guided tests with reference waveforms instead of a blank scope",
      "You need to feed simulated crank or cam signals into an ECU on the bench, up to 250 kHz",
      "You want a stated input rating, 400 V DC plus AC peak, for injector work",
    ],
  },
  extraSpecs: [
    { label: "ADC resolution", a: "8-bit", b: "12-bit" },
    { label: "Memory", a: "Up to 1M per channel (Amazon); not clearly assigned on Hantek's page", b: "4K" },
    { label: "Maximum input", a: "Not stated (diode-clamp protection)", b: "400 V (DC + AC peak)" },
    { label: "Coupling and input", a: "DC only, 1 MΩ / 25 pF", b: "DC, 1 MΩ" },
    { label: "Trigger", a: "Rising or falling edge, CH1 or CH2", b: "Edge, any of CH1 to CH8" },
    { label: "Signal output", a: "None", b: "8-channel LVTTL, 0 to 250 kHz" },
    { label: "Ignition probe", a: "None", b: "One listed by Hantek; not named in the Amazon box list" },
    { label: "Automotive tests", a: "None", b: "78 or over 80 (Hantek's page gives both)" },
    { label: "Measurements", a: "23 (Hantek) or 20 (Amazon), plus pass/fail", b: "Not stated on the page we used" },
    { label: "Software", a: "Windows 10/8/7/NT/XP/Vista; SDK, LabVIEW/VB/VC examples", b: "Windows XP/7/8/10; video help, one-key report" },
    { label: "Size and weight", a: "205 × 120 × 35 mm; weight not stated", b: "190 × 167 × 35 mm, 0.63 kg" },
  ],
  differences: [
    "Purpose: the 1008C is an automotive diagnostic kit with guided tests; the 6022BE is a general two-channel PC scope with no vehicle software.",
    "Channels: eight on the 1008C, two on the 6022BE.",
    "Speed: 48 MS/s and 20 MHz on the 6022BE against 2.4 MSa/s and 100 kHz (manual figure) on the 1008C, so the 6022BE samples 20 times faster.",
    "Voltage: Hantek rates the 1008C's inputs to 400 V DC plus AC peak; it gives no figure for the 6022BE, only diode-clamp protection.",
    "Ignition: Hantek's 1008C page lists one high-voltage ignition probe; the 6022BE has none. The Amazon listing we link doesn't name the probe in its box contents.",
    "Generator: the 1008C has eight LVTTL square-wave outputs to 250 kHz for simulating sensors; the 6022BE has no output.",
    "Shared: both are screenless USB 2.0 boxes powered by the laptop, both are DC-coupled at 1 MΩ, and both need Windows.",
    "Neither carries our Hands-on Tested badge; this is desk research from Hantek's pages and the Amazon listings.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Hantek 6022BE vs 1008C on a running engine</h2>
        <p className="text-muted leading-7 mb-4">
          A four-cylinder engine with coil-on-plug ignition has at least eight signals worth watching during a misfire hunt.
          The 1008C can wire up all of them in one session. The 6022BE takes two at a time, which is enough to check crank
          against cam timing but means moving probes and re-cranking for every injector.
        </p>
        <Figure caption={<>Channel budget on a four-cylinder engine. The eight signals are an illustrative set; your engine may differ.</>}>
          <EngineHookupDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Hantek&apos;s 1008C page lists the high-voltage ignition probe as included, quantity one. The Amazon listing for the
          kit we link doesn&apos;t name it in the box contents. If secondary ignition is the job you bought it for, ask the
          seller before ordering. Hantek publishes the same spec table and function count for the 1008B; our{" "}
          <Link href="/oscilloscopes/hantek-1008b-vs-hantek-6022be" className={link}>
            Hantek 1008B vs 6022BE comparison
          </Link>{" "}
          covers the 8-bit against 12-bit resolution gap in detail, so this page doesn&apos;t repeat it.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Maximum sample rate, log scale. Neither figure is per channel with every channel running.</>}>
            <BarChart
              log
              items={[
                { label: "Hantek 6022BE", value: 48_000_000, display: "48 MS/s", highlight: true },
                { label: "Hantek 1008C", value: 2_400_000, display: "2.4 MSa/s" },
              ]}
            />
          </Figure>
          <Figure caption={<>Analog inputs. The 1008C also has eight generator outputs.</>}>
            <BarChart
              items={[
                { label: "Hantek 1008C", value: 8, display: "8 inputs", highlight: true },
                { label: "Hantek 6022BE", value: 2, display: "2 inputs" },
              ]}
            />
          </Figure>
          <Figure caption={<>Samples per bit on a 500 kbit/s CAN bus: sample rate divided by bit rate, single-channel figures.</>}>
            <BarChart
              items={[
                { label: "Hantek 6022BE", value: 96, display: "96 samples", highlight: true },
                { label: "Hantek 1008C", value: 4.8, display: "4.8 samples" },
              ]}
            />
          </Figure>
          <Figure caption={<>Bandwidth, log scale. The 1008C&apos;s 100 kHz comes from Hantek&apos;s shared 1008 manual.</>}>
            <BarChart
              log
              items={[
                { label: "Hantek 6022BE", value: 20_000_000, display: "20 MHz", highlight: true },
                { label: "Hantek 1008C", value: 100_000, display: "100 kHz" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">CAN bus: the one car job the 6022BE does better</h2>
        <p className="text-muted leading-7 mb-4">
          High-speed CAN commonly runs at 500 kbit/s, so each bit lasts 2 µs. At 2.4 MSa/s the 1008C takes 4.8 samples per
          bit with one channel on, enough to see that the bus is toggling but not enough to judge edge shape or ringing.
          Hantek doesn&apos;t give the per-channel rate with more channels running, so a two-wire CAN-H and CAN-L view may be
          coarser still. The 6022BE at 48 MS/s takes about 96 samples per bit, and its 20 MHz bandwidth passes the edges.
        </p>
        <p className="text-muted leading-7 mb-4">
          Hantek lists bus detection among the 1008C&apos;s vehicle tests, so its software will tell you whether the bus is
          alive. To see why a node drops off, such as slow edges from a damaged terminating resistor, the faster 6022BE shows
          more. Neither decodes CAN frames according to the pages we used.
        </p>
        <KeyIdea title="Slow but deep versus fast but narrow">
          Most engine sensor signals are slow. A 60-tooth crank wheel at 800 rpm passes 13.3 revolutions per second, or about
          800 teeth per second, and injector pulses last milliseconds. That is why Hantek can build a car scope around 2.4 MSa/s and 100 kHz. The 1008C trades speed for
          channel count and 12-bit detail. The 6022BE makes the opposite trade, which suits CAN edges and hobby electronics.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Voltage headroom on injectors and coils</h2>
        <p className="text-muted leading-7 mb-4">
          When an injector or coil primary switches off, the collapsing magnetic field produces a voltage spike that can reach
          tens of volts on an injector and several hundred volts on a coil primary. Hantek rates the 1008C&apos;s inputs to
          400 V DC plus AC peak, so a coil primary spike can come close to that limit. For the 6022BE it lists diode-clamp
          protection and no voltage figure, so we wouldn&apos;t
          connect it to a coil primary at all, and only through a x10 probe on injectors.
        </p>
        <Callout title="Ignition secondary and hybrid systems">
          Never clip either scope onto a spark plug lead or coil output. Secondary ignition runs at many kilovolts and needs a
          capacitive ignition probe, which is what Hantek lists with the 1008C. Keep both away from hybrid and EV high-voltage
          circuits, marked with orange cabling; that work needs rated equipment and training. Because both scopes share
          ground with your laptop through USB, run the laptop on battery when probing the car.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "Why"]}
          rows={[
            ["Hunting a misfire on a four-cylinder", "Hantek 1008C", "Injectors, coils and crank on screen together, plus guided tests"],
            ["Checking crank-to-cam timing after a timing belt job", "Either", "Two channels cover it; the 1008C adds reference waveforms"],
            ["Looking at CAN-H and CAN-L edge quality", "Hantek 6022BE", "About 96 samples per bit against 4.8 on the 1008C"],
            ["Bench-testing an ECU input without the engine", "Hantek 1008C", "Eight LVTTL outputs to 250 kHz simulate crank and cam signals"],
            ["Arduino, audio and hobby electronics", "Hantek 6022BE", "20 MHz and X-Y mode; the 1008C stops at 100 kHz"],
            ["Writing your own test software", "Hantek 6022BE", "Hantek publishes an SDK with LabVIEW, VB and VC examples"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          For more options, see our{" "}
          <Link href="/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics" className={link}>
            automotive oscilloscope picks
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/hantek-1008c-vs-hantek-dso2c10" className={link}>
            Hantek 1008C vs DSO2C10
          </Link>{" "}
          for the step to a bench scope, and the 6022BE against other PC scopes in{" "}
          <Link href="/oscilloscopes/picoscope-2204a-vs-hantek-6022be" className={link}>
            PicoScope 2204A vs Hantek 6022BE
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/owon-vds1022i-vs-hantek-6022be" className={link}>
            OWON VDS1022I vs Hantek 6022BE
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "For car diagnostics, buy the Hantek 1008C: eight 12-bit inputs rated to 400 V, an ignition probe on Hantek's parts list, a crank and cam simulator and dozens of guided tests. Buy the Hantek 6022BE if cars are a side job and you mostly work on electronics, or if you need to see CAN bus edges, where its 48 MS/s is 20 times faster.",
  chooseNeitherIf:
    "You want a scope you can carry around the car without a laptop. Both are screenless USB boxes; a handheld such as the OWON HDS272S runs on battery and adds a multimeter, though with two channels and no vehicle software.",
  faqs: [
    {
      question: "Can the Hantek 6022BE be used for automotive diagnostics?",
      answer:
        "For simple jobs, yes: two channels can show a crank sensor against a cam sensor, or one injector pulse through a x10 probe. It has no vehicle test library, no ignition probe and no stated input voltage rating, so coil primaries and secondary ignition are off the table. The 1008C is built for that work.",
    },
    {
      question: "What is the difference between the Hantek 1008B and 1008C?",
      answer:
        "Hantek uses the same eight-channel, 12-bit, 2.4 MSa/s hardware for the 1008A, 1008B and 1008C. Hantek's 1008B and 1008C pages publish identical spec tables and the same automotive function count, so check the kit contents instead: Hantek's 1008C page lists a high-voltage ignition probe. Our 1008B vs 6022BE page compares that hardware with the 6022BE in more depth.",
    },
    {
      question: "How many automotive tests does the Hantek 1008C have?",
      answer:
        "Hantek's own page says both \"over 80 types\" in its overview and \"78 types of vehicle diagnosis function\" in the function list. The Amazon listing says over 80, covering ignition, sensors, bus detection, starting and charging circuits. Expect roughly 80; the exact count depends on which part of Hantek's page you read.",
    },
    {
      question: "Do these Hantek scopes work on a Mac?",
      answer:
        "Not according to Hantek. The 6022BE software lists Windows 10, 8, 7, NT, XP and Vista, and the 1008C lists Windows XP, 7, 8 and 10. Neither page mentions macOS or Linux. Hantek does publish a 6022BE SDK, which some users build on, but that isn't official support.",
    },
    {
      question: "Does the 1008C ignition probe come in the box?",
      answer:
        "Hantek's 1008C product page lists one high-voltage ignition probe as included. The included-components list on the Amazon listing we link doesn't name one. If you need it for secondary ignition tests, confirm with the seller before you buy, or budget for a separate capacitive ignition probe.",
    },
    {
      question: "Which is better for learning how an oscilloscope works?",
      answer:
        "The 6022BE. It behaves like a normal two-channel scope with edge triggering, X-Y mode, FFT and cursors, and its 20 MHz covers most hobby circuits. The 1008C's software is organized around vehicle tests, and its 100 kHz bandwidth is too slow for many microcontroller signals.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Hantek 1008B vs Hantek 6022BE", href: "/oscilloscopes/hantek-1008b-vs-hantek-6022be" },
    { label: "Hantek 1008C vs Hantek DSO2C10", href: "/oscilloscopes/hantek-1008c-vs-hantek-dso2c10" },
    { label: "Best oscilloscopes for automotive diagnostics", href: "/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics" },
    { label: "PicoScope 2204A vs Hantek 6022BE", href: "/oscilloscopes/picoscope-2204a-vs-hantek-6022be" },
    { label: "OWON VDS1022I vs Hantek 6022BE", href: "/oscilloscopes/owon-vds1022i-vs-hantek-6022be" },
    { label: "Hantek 6022BE vs Hantek DSO2D10", href: "/oscilloscopes/hantek-6022be-vs-hantek-dso2d10" },
    { label: "FNIRSI DSO152 vs Hantek 6022BE", href: "/oscilloscopes/fnirsi-dso152-vs-hantek-6022be" },
    { label: "Oscilloscope sample rate explained", href: "/oscilloscopes/oscilloscope-sample-rate-explained" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
  ],
};

export default function Hantek6022beVsHantek1008cPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
