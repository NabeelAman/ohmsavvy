import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// FNIRSI 1013D (the "1013D Plus" style adds a P4100 100X probe) per https://www.fnirsi.com/products/1013d (checked
// 2026-11-07): 2 channels, 100 MHz, 1 GSa/s ("1X=5MHz, 10X=100MHz"), 7-inch 800 x 480 capacitive touch screen, rise time
// <3 ns, storage depth "240 Kbit", timebase 50 s-10 ns, vertical sensitivity "50mV-500V" (FNIRSI's wording, no "/div"),
// 1 MOhm, Single/Normal/Auto trigger on rising/falling edge, AC/DC, highest test voltage 1X 40 V / 10X 400 V (100X probe
// "0~4000V"), roll mode, one-button AUTO, 1 GB storage for 1000 screenshots + 1000 waveforms, voltage accuracy +/-2%,
// frequency precision +/-0.01%, 12 parameters, Lissajous and FFT, 6000 mAh lithium battery, about 4 hours, usable while
// charging, Type-C 5 V 2A/3A/4A, USB export. Item weight 2.33 lb per https://www.amazon.com/dp/B0BHHYMVKV (checked
// 2026-11-07, In Stock at ZIP 10001). FNIRSI doesn't state ADC bits, the two-channel sample rate or waveform update rate.
// FNIRSI DPOS350P per the official Amazon listing https://www.amazon.com/dp/B0F6K8H5CT (bullets and A+ spec images,
// checked 2026-11-07, In Stock at ZIP 10001; fnirsi.com/products/dpos350p shows its specs only as images): 2 ch, 350 MHz,
// 1 GSa/s real time, 50,000 wfm/s, 1 ns rise time, 8- to 16-bit high-res mode, 400 V overvoltage protection, XY/Zoom/Roll,
// 1 MOhm (18 pF) inputs; generator 14 standard waveforms + custom (500 slots), 50 MHz sine / 10 MHz square, 0-5 Vpp,
// +/-2.5 V offset, duty 0.1-99.9%, 1 mV / 1 Hz resolution; spectrum analyzer 200 kHz-350 MHz FFT, 32K points, 3D
// waterfall; frequency response analyzer 100 Hz-50 MHz, 20-500 points; 7-inch 1024 x 600 IPS capacitive touch; stores
// 500 waveforms + 90 screenshots; 3.7 V 8000 mAh battery, standby "about 3 hours"; charging QC18W 12 V/1.5 A; total
// power consumption 10 W; air cooling; 190 x 128 x 37 mm; item weight 3.36 lb; kit: 2 x 350 MHz probes, QC18W charger,
// USB cable, alligator clip leads, manual; first available April 26, 2025. Conflict on the same listing: the spec table
// gives charging time "Standby ~ 5 Hours" while an A+ panel says full charge "in just 3 hours". Memory depth and
// trigger types not stated.

const path = "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-dpos350p";
const t1013 = picks.find((p) => p.name === "FNIRSI 1013D Plus")!;
const dpos = picks.find((p) => p.name === "FNIRSI DPOS350P")!;

export const metadata = buildMetadata({
  title: "FNIRSI 1013D vs DPOS350P: Tablet Scopes Compared",
  description:
    "FNIRSI 1013D vs DPOS350P: two 7-inch touchscreen tablet scopes. 100 MHz with a 100X probe and 4-hour battery, or 350 MHz with four instruments. Verdict inside.",
  path: "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-dpos350p",
  image: dpos.image,
});

const link = "text-accent hover:underline";

/** Ten samples in a 10 ns window: one 100 MHz cycle gets all ten, 3.5 cycles of 350 MHz share them. Illustrative. */
function SamplesPerCycleDiagram() {
  const x0 = 40;
  const w = 340;
  const px = (ns: number) => x0 + (ns / 10) * w;
  const panel = (y0: number, f: number) => {
    const amp = 26;
    const pts = Array.from({ length: 401 }, (_, i) => {
      const t = (10 * i) / 400;
      return `${px(t).toFixed(1)},${(y0 - amp * Math.sin(2 * Math.PI * f * t)).toFixed(1)}`;
    }).join(" ");
    const dots = Array.from({ length: 11 }, (_, i) => ({ t: i, v: y0 - amp * Math.sin(2 * Math.PI * f * i) }));
    return (
      <g>
        <line x1={x0} x2={x0 + w} y1={y0} y2={y0} className="stroke-border" strokeWidth="0.6" />
        <polyline points={pts} className="stroke-muted fill-none" strokeWidth="1.2" />
        <polyline points={dots.map((d) => `${px(d.t).toFixed(1)},${d.v.toFixed(1)}`).join(" ")} className="stroke-accent fill-none" strokeWidth="1.2" strokeDasharray="3 2" />
        {dots.map((d) => (
          <circle key={d.t} cx={px(d.t)} cy={d.v} r="2.6" className="fill-accent" />
        ))}
      </g>
    );
  };
  return (
    <svg
      viewBox="0 0 400 236"
      className="w-full h-auto"
      role="img"
      aria-label="FNIRSI 1013D vs DPOS350P sampling diagram, illustrative. At 1 GSa/s both scopes take one sample per nanosecond. Top: a 100 MHz sine over 10 nanoseconds is one cycle with ten samples, and joining the dots gives a recognizable sine. Bottom: a 350 MHz sine over the same 10 nanoseconds is three and a half cycles sharing the same ten samples, under three per cycle, and joining the dots gives a jagged shape."
    >
      <text x="4" y="16" fontSize="9.5" fontWeight="700" className="fill-foreground">100 MHz sine at 1 GSa/s: 10 samples per cycle</text>
      {panel(62, 0.1)}
      <text x="4" y="124" fontSize="9.5" fontWeight="700" className="fill-foreground">350 MHz sine at 1 GSa/s: about 2.9 samples per cycle</text>
      {panel(170, 0.35)}
      {[0, 2, 4, 6, 8, 10].map((t) => (
        <text key={t} x={px(t)} y="216" fontSize="8" textAnchor="middle" className="fill-muted">
          {t} ns
        </text>
      ))}
      <text x="4" y="232" fontSize="8" className="fill-muted">Grey: the real signal. Dots: samples 1 ns apart. Dashed: dots joined with straight lines.</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "FNIRSI 1013D vs DPOS350P: Which Tablet Scope?",
  path,
  published: "2026-11-07",
  intro:
    "FNIRSI 1013D vs DPOS350P is a choice between two FNIRSI tablets that look alike on the bench: both have a 7-inch capacitive touchscreen, two channels, 1 GSa/s and a built-in battery. The 1013D Plus kit is the plain scope at 100 MHz, with a 6000 mAh battery FNIRSI rates for about 4 hours and a 100X probe for high voltage. The DPOS350P raises the bandwidth to 350 MHz and adds a 50 MHz generator, a spectrum analyzer and a frequency response analyzer, at the cost of a shorter 3-hour run time and a 12 V fast charger.",
  a: {
    pick: t1013,
    imageAlt: "FNIRSI 1013D Plus 7-inch touchscreen tablet oscilloscope with P4100 100X probe",
    chooseIf: [
      "Your signals stay under about 20–30 MHz: car sensors, PWM, audio, power supplies",
      "You want the longer run time: about 4 hours from 6000 mAh, and it works while charging",
      "You measure high voltage and want the 100X P4100 probe included",
      "You'd rather charge from an ordinary 5 V USB-C supply",
    ],
  },
  b: {
    pick: dpos,
    imageAlt: "FNIRSI DPOS350P 4-in-1 tablet oscilloscope with generator and spectrum analyzer",
    chooseIf: [
      "You need bandwidth above 100 MHz, or faster edges: FNIRSI lists a 1 ns rise time",
      "You want a 50 MHz generator in the same tablet, with 0–5 Vpp and ±2.5 V offset",
      "You'll plot filter or amplifier response with the 100 Hz–50 MHz frequency response analyzer",
      "You chase intermittent glitches: FNIRSI lists 50,000 waveforms per second",
    ],
  },
  extraSpecs: [
    { label: "Screen", a: "7-inch 800 × 480, capacitive touch", b: "7-inch 1024 × 600 IPS, capacitive touch" },
    { label: "Rise time", a: "Under 3 ns", b: "1 ns" },
    { label: "Built-in instruments", a: "Oscilloscope", b: "Scope, 50 MHz generator, spectrum analyzer, response analyzer" },
    { label: "Waveform update rate", a: "Not stated", b: "50,000 wfm/s" },
    { label: "Memory", a: "\"240 Kbit\" (FNIRSI's wording)", b: "Not stated" },
    { label: "Battery and run time", a: "6000 mAh, about 4 hours", b: "3.7 V 8000 mAh, about 3 hours" },
    { label: "Charging", a: "USB-C 5 V (2 A/3 A/4 A); usable while charging", b: "QC 18 W, 12 V/1.5 A; charger included" },
    { label: "Saved captures", a: "1,000 screenshots + 1,000 waveforms (1 GB)", b: "90 screenshots + 500 waveforms" },
    { label: "Probes in the kit", a: "P4100 100X high-voltage probe (Plus kit)", b: "Two 350 MHz probes" },
    { label: "Size and weight", a: "Size not stated; 2.33 lb per Amazon", b: "190 × 128 × 37 mm; 3.36 lb per Amazon" },
  ],
  differences: [
    "Bandwidth: 350 MHz on the DPOS350P against 100 MHz on the 1013D, 3.5 times more. FNIRSI notes the 1013D drops to 5 MHz with a probe on 1X.",
    "Sample rate: both list 1 GSa/s, so the DPOS350P has far fewer samples per cycle at the top of its range: about 2.9 at 350 MHz against 10 at 100 MHz.",
    "Extra instruments: only the DPOS350P has a generator (50 MHz sine, 10 MHz square), a 200 kHz–350 MHz spectrum analyzer and a 100 Hz–50 MHz frequency response analyzer.",
    "Battery: the 1013D runs about 4 hours on 6000 mAh; the DPOS350P about 3 hours on 8000 mAh, because it draws 10 W and has a cooling fan.",
    "Charging: the 1013D charges from a 5 V USB-C supply and works while charging. The DPOS350P wants an 18 W Quick Charge supply at 12 V, which is in the box.",
    "Screen: same 7-inch size, but 1024 × 600 IPS on the DPOS350P against 800 × 480 on the 1013D.",
    "Neither has our Hands-on Tested badge. The 1013D facts are from FNIRSI's product page; the DPOS350P facts are from its official Amazon listing, because FNIRSI's own page shows them only as images.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What 350 MHz on 1 GSa/s really gets you</h2>
        <p className="text-muted leading-7 mb-4">
          Both tablets sample at 1 GSa/s, one point per nanosecond. On the 1013D that&apos;s 10 points per cycle at
          its 100 MHz limit, a comfortable margin. On the DPOS350P a 350 MHz sine gets 1,000 ÷ 350 ≈ 2.9 points per
          cycle. That clears the Nyquist limit of 2, so the information is there, but the scope has to rebuild the
          shape with sin(x)/x interpolation to draw a smooth sine. FNIRSI&apos;s listing doesn&apos;t say whether it
          does.
        </p>
        <Figure
          caption={
            <>
              Illustrative: the same ten 1 ns samples on a 100 MHz sine and a 350 MHz sine. Joining the dots works at
              100 MHz; at 350 MHz the scope must interpolate to show the true shape.
            </>
          }
        >
          <SamplesPerCycleDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          In practice the DPOS350P&apos;s extra bandwidth pays off most on edges, not on 300 MHz sines. Its listed 1 ns
          rise time against the 1013D&apos;s &quot;under 3 ns&quot; means a fast logic edge looks steep instead of
          rounded, and ringing after the edge shows up. FNIRSI doesn&apos;t say what either scope samples per channel
          with both channels on. If the DPOS350P splits its 1 GSa/s between two channels, the margin at 350 MHz gets
          thinner still.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Figure caption={<>Rated bandwidth with a 10X probe. FNIRSI gives the 1013D 5 MHz on 1X.</>}>
            <BarChart
              items={[
                { label: "FNIRSI DPOS350P", value: 350, display: "350 MHz", highlight: true },
                { label: "FNIRSI 1013D Plus", value: 100, display: "100 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Samples per cycle at each scope&apos;s rated bandwidth: 1,000 ÷ 100 and 1,000 ÷ 350.</>}>
            <BarChart
              items={[
                { label: "FNIRSI 1013D Plus", value: 10, display: "10 per cycle", highlight: true },
                { label: "FNIRSI DPOS350P", value: 2.9, display: "≈2.9 per cycle" },
              ]}
            />
          </Figure>
          <Figure caption={<>Battery run time as FNIRSI states it. The DPOS350P draws 10 W and has a fan.</>}>
            <BarChart
              items={[
                { label: "FNIRSI 1013D Plus", value: 4, display: "About 4 h", highlight: true },
                { label: "FNIRSI DPOS350P", value: 3, display: "About 3 h" },
              ]}
            />
          </Figure>
          <Figure caption={<>Weight per each Amazon listing.</>}>
            <BarChart
              items={[
                { label: "FNIRSI DPOS350P", value: 3.36, display: "3.36 lb" },
                { label: "FNIRSI 1013D Plus", value: 2.33, display: "2.33 lb", highlight: true },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FNIRSI 1013D vs DPOS350P away from the bench</h2>
        <p className="text-muted leading-7 mb-4">
          Both are tablets, so the field matters. The battery numbers check out against each other. The DPOS350P&apos;s
          pack is 3.7 V × 8 Ah = 29.6 Wh, and at its listed 10 W that&apos;s 29.6 ÷ 10 ≈ 3 hours, which is what FNIRSI
          claims. FNIRSI doesn&apos;t give the 1013D&apos;s cell voltage or power draw, only 6000 mAh and about 4 hours.
        </p>
        <p className="text-muted leading-7 mb-4">
          Charging is where they part ways. The 1013D takes 5 V over USB-C at 2 A, 3 A or 4 A and keeps running while it
          charges, so a car USB-C port or a power bank can top it up. The DPOS350P specifies Quick Charge 18 W at
          12 V/1.5 A and ships with that charger; FNIRSI doesn&apos;t say whether it runs while charging. The listing
          also contradicts itself on charge time: about 5 hours in the spec table, &quot;just 3 hours&quot; in a feature
          panel.
        </p>
        <p className="text-muted leading-7 mb-4">
          For a mechanic, the 1013D Plus kit is the better field tool. Its P4100 100X probe is rated by FNIRSI to
          measure up to 4000 V, ten times the 400 V FNIRSI gives for a 10X probe, and 100 MHz is far more than car sensor and
          injector signals need. The DPOS350P&apos;s two 350 MHz probes suit fast electronics, not high voltage, and
          FNIRSI lists 400 V overvoltage protection on its inputs.
        </p>
        <KeyIdea title="Four instruments, one battery">
          The DPOS350P&apos;s generator, spectrum analyzer and response analyzer are the real reason to pay more. The
          response analyzer sweeps 100 Hz to 50 MHz at up to 500 points and plots gain and phase, the job you&apos;d
          otherwise do point by point with a generator and a scope. If you&apos;ll never plot a Bode chart or look at
          a spectrum, the 1013D gives you the same tablet format with a longer run time.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Pick", "Why"]}
          rows={[
            ["Car diagnostics: sensors, injectors, ignition", "FNIRSI 1013D Plus", "100X probe to 4000 V per FNIRSI, 4-hour battery, 5 V charging"],
            ["Filter, amplifier or power-loop response plots", "FNIRSI DPOS350P", "100 Hz–50 MHz frequency response analyzer built in"],
            ["Fast digital edges and ringing", "FNIRSI DPOS350P", "1 ns rise time against under 3 ns"],
            ["EMI or RF checks up to a few hundred MHz", "FNIRSI DPOS350P", "200 kHz–350 MHz spectrum analyzer with waterfall view"],
            ["Learning the basics on a large touchscreen", "FNIRSI 1013D Plus", "One instrument, fewer menus, edge trigger and AUTO"],
            ["Charging from a car or power bank", "FNIRSI 1013D Plus", "5 V USB-C and usable while charging"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The gaps in FNIRSI&apos;s figures</h2>
        <p className="text-muted leading-7 mb-4">
          Neither tablet is fully documented, and the gaps are different. For the 1013D, FNIRSI doesn&apos;t give the ADC
          resolution, the sample rate with both channels on, or what &quot;240 Kbit&quot; means in sample points. Its
          vertical range is printed as &quot;50mV-500V&quot; with no &quot;per division&quot;, so read it as an
          input range, not a sensitivity setting. For the DPOS350P, FNIRSI doesn&apos;t state memory depth or trigger
          types, and its own product page shows its specs only as images, so the figures here come from the official
          Amazon listing. The DPOS350P has been listed since April 2025, against October 2022 for the 1013D Plus.
        </p>
        <Callout title="Battery tablets and mains voltage">
          Running on battery with the charger unplugged, neither tablet is tied to earth, so a probe ground doesn&apos;t
          short through the mains wiring the way a bench scope&apos;s does. That doesn&apos;t make the case safe to
          touch while you probe a live circuit, and FNIRSI gives neither tablet a CAT rating. Use the 100X probe or a
          differential probe for mains-level work, unplug the charger first, and leave building wiring to an
          electrician.
        </Callout>
        <p className="text-muted leading-7 mt-4">
          Each tablet has a benchtop comparison too:{" "}
          <Link href="/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-1014d" className={link}>
            FNIRSI 1013D Plus vs FNIRSI 1014D
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/fnirsi-dpos350p-vs-fnirsi-1014d" className={link}>
            FNIRSI DPOS350P vs FNIRSI 1014D
          </Link>
          . If you&apos;re weighing the 1013D against a pocket handheld with a multimeter, see{" "}
          <Link href="/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-2c53t" className={link}>
            FNIRSI 1013D vs 2C53T
          </Link>
          . For the bandwidth arithmetic, read{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            what oscilloscope bandwidth is
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/oscilloscope-sample-rate-explained" className={link}>
            oscilloscope sample rate explained
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Buy the FNIRSI 1013D Plus for field work on signals below a few tens of MHz: car diagnostics, power supplies, PWM. It runs longer, charges from 5 V USB-C while you use it, and the kit's 100X probe handles high voltage. Buy the FNIRSI DPOS350P if you'll use the generator, spectrum analyzer and response analyzer, or need 350 MHz and a 1 ns rise time, and you're fine with 3 hours of battery and its own 12 V charger.",
  chooseNeitherIf:
    "You need serial protocol decoding or more than two channels. Neither tablet lists decoding; a four-channel bench scope such as the Rigol DHO804 covers both.",
  faqs: [
    {
      question: "Is the FNIRSI 1013D Plus different from the 1013D?",
      answer:
        "Only in the kit. FNIRSI sells the 1013D in two styles, \"1013D Std.\" and \"1013D Plus\", and the Plus adds a P4100 100X high-voltage probe. The tablet itself is the same: 100 MHz, two channels, 1 GSa/s, a 7-inch touchscreen and a 6000 mAh battery.",
    },
    {
      question: "Is 1 GSa/s enough for a 350 MHz scope?",
      answer:
        "It's tight. 1 GSa/s gives about 2.9 samples per cycle at 350 MHz, above the Nyquist minimum of 2 but low enough that the scope must interpolate to draw a smooth sine. FNIRSI doesn't state the DPOS350P's two-channel sample rate or interpolation method. Most users will see the gain in sharper edges rather than in 300 MHz sines.",
    },
    {
      question: "Which FNIRSI tablet has the longer battery life?",
      answer:
        "The 1013D: FNIRSI rates it about 4 hours from 6000 mAh, and it can run while charging over 5 V USB-C. The DPOS350P is rated about 3 hours from a 3.7 V 8000 mAh pack, since it draws 10 W and has a cooling fan. It charges with an 18 W Quick Charge adapter at 12 V, included in the box.",
    },
    {
      question: "Does the FNIRSI 1013D have a signal generator?",
      answer:
        "No. The 1013D is a scope only. If you want a generator in a FNIRSI tablet, the DPOS350P has one with sine to 50 MHz, square to 10 MHz, 0–5 Vpp and ±2.5 V offset. FNIRSI's benchtop 1014D also has one, at 2.5 Vpp.",
    },
    {
      question: "Which is better for car diagnostics?",
      answer:
        "The 1013D Plus. Car sensor, injector and CAN signals sit well under its 100 MHz, the Plus kit includes a P4100 100X probe that FNIRSI rates for up to 4000 V, and the 4-hour battery charges from a 5 V USB-C source. The DPOS350P's extra bandwidth and analyzers add little under the hood.",
    },
    {
      question: "How many captures can each tablet save?",
      answer:
        "FNIRSI gives the 1013D 1 GB of storage for up to 1,000 screenshots and 1,000 waveforms. The DPOS350P's listing says it stores 500 waveforms and 90 screenshots. Both export over USB to a computer, and the DPOS350P also takes firmware updates as .iso files.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "FNIRSI 1013D Plus vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-1014d" },
    { label: "FNIRSI DPOS350P vs FNIRSI 1014D", href: "/oscilloscopes/fnirsi-dpos350p-vs-fnirsi-1014d" },
    { label: "FNIRSI 1013D vs 2C53T", href: "/oscilloscopes/fnirsi-1013d-plus-vs-fnirsi-2c53t" },
    { label: "Best oscilloscopes for automotive diagnostics", href: "/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "Oscilloscope sample rate explained", href: "/oscilloscopes/oscilloscope-sample-rate-explained" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
  ],
};

export default function Fnirsi1013dPlusVsFnirsiDpos350pPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
