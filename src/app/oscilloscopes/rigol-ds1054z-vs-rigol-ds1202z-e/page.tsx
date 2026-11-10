import Link from "@/components/AppLink";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Rigol DS1054Z: 50 MHz, 4 channels, 1 GSa/s (1 ch) / 500 MSa/s (2 ch) / 250 MSa/s (3-4 ch), 24 Mpts (1 ch) / 12 Mpts
// (2 ch) / 6 Mpts (3-4 ch), calculated rise time 7 ns, 1 mV/div to 10 V/div, 5 ns/div to 50 s/div, 30,000 wfms/s,
// decoding Parallel, RS232/UART, I2C, SPI (2 buses), 7-inch 800 x 480, 313.1 x 160.8 x 122.4 mm, 3.2 kg, CAT I 300 Vrms /
// CAT II 100 Vrms, three-year warranty, per Rigol's DS1000Z datasheet
// https://www.rigol.com/dam/global/downloads/brochures/en/data-sheet/oscilloscopes/DS1000Z_DataSheet_EN.pdf (checked
// 2026-11-08). Conflict: https://www.rigol.com/intl/products/oscilloscope/DS1000Z.html lists 12M standard / 24M optional
// memory and bus decode as an option (as recorded on this site's DS1054Z pages, checked 2026-10-24).
// Rigol DS1202Z-E: 200 MHz, 2 channels, 1 GSa/s (1 ch) / 500 MSa/s (2 ch), 24 Mpts / 12 Mpts, calculated rise time
// 1.75 ns, 500 uV/div to 10 V/div, 2 ns/div to 50 s/div, 30,000 wfms/s, same decoding list on 2 buses, 7-inch 800 x
// 480, 313.1 x 160.8 x 122.4 mm, 2.9 kg, standard probes PVP2350 350 MHz, three-year warranty, per Rigol's DS1000Z-E
// datasheet https://beyondmeasure.rigoltech.com/acton/attachment/1579/f-f55c8579-4293-4d7f-aec4-ef7ea08ad8dc/1/-/-/-/-/DS1000Z-E%20Datasheet-EN.pdf
// (checked 2026-11-08). DS1054Z is owner-tested (handsOnTested on its Pick); no test results are claimed here. Both
// ASINs buyable on Amazon.com at ZIP 10001 (checked 2026-11-08). Dead-time figures are illustrative arithmetic.

const path = "/oscilloscopes/rigol-ds1054z-vs-rigol-ds1202z-e";
const ds1054z = picks.find((p) => p.name === "Rigol DS1054Z")!;
const ds1202 = picks.find((p) => p.name === "Rigol DS1202Z-E")!;

export const metadata = buildMetadata({
  title: "Rigol DS1054Z vs DS1202Z-E: 4 Ch or 200 MHz",
  description:
    "Rigol DS1054Z vs DS1202Z-E: four 50 MHz channels or two 200 MHz ones in the same Rigol chassis. Worked through on motor drives, half-bridges and buses.",
  path: "/oscilloscopes/rigol-ds1054z-vs-rigol-ds1202z-e",
  image: ds1202.image,
});

const link = "text-accent hover:underline";

/** Two jobs from power electronics: three phases plus current (4 inputs) vs a half-bridge's dead time (2 fast inputs). */
function PowerStageDiagram() {
  const phase = (y: number, shift: number) => {
    let d = "";
    for (let x = 0; x <= 150; x += 5) {
      const v = y - 12 * Math.sin(((x + shift) / 150) * 2 * Math.PI);
      d += `${x === 0 ? "M" : " L"}${20 + x} ${v.toFixed(1)}`;
    }
    return d;
  };
  return (
    <svg
      viewBox="0 0 400 215"
      className="w-full h-auto"
      role="img"
      aria-label="Rigol DS1054Z vs DS1202Z-E use-case diagram. Left: a three-phase motor drive, where the DS1054Z shows phases A, B and C plus a current probe on its four channels. Right: one leg of a half-bridge, where the DS1202Z-E's two fast channels show the high-side and low-side gate signals and the dead time between them, a gap of tens of nanoseconds that needs fast edges and fine time resolution."
    >
      <text x="20" y="18" fontSize="10" fontWeight="700" className="fill-foreground">DS1054Z: 3 phases + current</text>
      <path d={phase(48, 0)} className="stroke-accent fill-none" strokeWidth="1.4" />
      <path d={phase(88, 50)} className="stroke-foreground fill-none" strokeWidth="1.4" />
      <path d={phase(128, 100)} className="stroke-muted fill-none" strokeWidth="1.4" />
      <path d={phase(168, 25)} className="stroke-accent/60 fill-none" strokeWidth="1.2" strokeDasharray="3 2" />
      {["CH1 A", "CH2 B", "CH3 C", "CH4 I"].map((t, i) => (
        <text key={t} x="176" y={52 + i * 40} fontSize="8.5" className="fill-muted">{t}</text>
      ))}
      <text x="20" y="205" fontSize="8.5" className="fill-muted">250 MSa/s each, 4 ns per sample</text>

      <text x="220" y="18" fontSize="10" fontWeight="700" className="fill-accent">DS1202Z-E: one half-bridge leg</text>
      <path d="M220 90 H260 V50 H330 V90 H385" className="stroke-accent fill-none" strokeWidth="1.6" />
      <path d="M220 130 H250 V170 H338 V130 H385" className="stroke-foreground fill-none" strokeWidth="1.6" />
      <text x="388" y="70" fontSize="8.5" textAnchor="end" className="fill-accent">high-side gate</text>
      <text x="388" y="186" fontSize="8.5" textAnchor="end" className="fill-foreground">low-side gate</text>
      <path d="M250 110 H260" className="stroke-foreground" strokeWidth="1" />
      <path d="M330 110 H338" className="stroke-foreground" strokeWidth="1" />
      <text x="255" y="122" fontSize="8" textAnchor="middle" className="fill-foreground">dead</text>
      <text x="334" y="122" fontSize="8" textAnchor="middle" className="fill-foreground">dead</text>
      <text x="220" y="205" fontSize="8.5" className="fill-muted">500 MSa/s each, 2 ns per sample</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1054Z vs DS1202Z-E",
  path,
  published: "2026-11-08",
  intro:
    "Rigol DS1054Z vs DS1202Z-E puts two scopes from the same Rigol family side by side: same 313 × 161 × 122 mm case, same 7-inch 800 × 480 screen, same 1 GSa/s and 30,000 waveforms per second. The DS1054Z spreads that over four 50 MHz channels; the DS1202Z-E puts it into two 200 MHz channels. The DS1054Z is one of the scopes our owner has tested hands-on. We use power electronics to show the trade, because a motor drive wants many channels while a half-bridge's dead time wants fast ones.",
  a: {
    pick: ds1054z,
    imageAlt: "Rigol DS1054Z four-channel 50 MHz digital oscilloscope",
    chooseIf: [
      "You need three or four signals on one timebase: motor phases, SPI, sequenced rails",
      "Your edges are slower than about 25 ns and your clocks under 10 MHz",
      "You want the scope our owner has tested hands-on",
      "You want 250 MSa/s and 6 Mpts on each of four channels",
    ],
  },
  b: {
    pick: ds1202,
    imageAlt: "Rigol DS1202Z-E two-channel 200 MHz digital oscilloscope",
    chooseIf: [
      "You measure dead time, gate edges or ringing in nanoseconds",
      "You look at clocks from 10 to 40 MHz",
      "You want a 500 µV/div range for small ripple and noise",
      "Two channels at a time are enough for what you probe",
    ],
  },
  extraSpecs: [
    { label: "Sample rate, all channels on", a: "250 MSa/s each (3–4 ch)", b: "500 MSa/s each (2 ch)" },
    { label: "Memory, all channels on", a: "6 Mpts each (datasheet)", b: "12 Mpts each" },
    { label: "Rise time (calculated, Rigol)", a: "7 ns", b: "1.75 ns" },
    { label: "Fastest timebase", a: "5 ns/div", b: "2 ns/div" },
    { label: "Most sensitive range", a: "1 mV/div", b: "500 µV/div" },
    { label: "Serial decoding", a: "Parallel, UART, I2C, SPI (option per product page)", b: "Parallel, UART, I2C, SPI" },
    { label: "Weight", a: "3.2 kg", b: "2.9 kg" },
    { label: "OhmSavvy assessment", a: "Hands-on Tested", b: "Desk research" },
  ],
  differences: [
    "Channels: four on the DS1054Z, two on the DS1202Z-E.",
    "Bandwidth: 200 MHz on the DS1202Z-E, four times the DS1054Z's 50 MHz. Calculated rise time is 1.75 ns against 7 ns.",
    "Per-channel resources with everything on: 250 MSa/s and 6 Mpts each on the DS1054Z with four channels; 500 MSa/s and 12 Mpts each on the DS1202Z-E with two.",
    "Sensitivity: 500 µV/div on the DS1202Z-E against 1 mV/div on the DS1054Z.",
    "Same case dimensions, screen, 30,000 wfms/s capture rate, decoder list and three-year warranty. Rigol's DS1000Z product page calls bus decoding an option and lists 12 Mpts standard for the DS1054Z; the datasheet doesn't.",
    "The DS1054Z carries our Hands-on Tested badge; the DS1202Z-E assessment is desk research from Rigol's datasheet.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Both scopes have the same total sampling budget of 1 GSa/s. What changes is how it&apos;s divided and how
          fast each channel&apos;s front end is.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Rated bandwidth from Rigol&apos;s two datasheets.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1202Z-E", value: 200, display: "200 MHz", highlight: true },
                { label: "Rigol DS1054Z", value: 50, display: "50 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Analog channels.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 4, display: "4", highlight: true },
                { label: "Rigol DS1202Z-E", value: 2, display: "2" },
              ]}
            />
          </Figure>
          <Figure caption={<>Sample rate per channel with every channel switched on.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1202Z-E", value: 500, display: "500 MSa/s (2 ch)", highlight: true },
                { label: "Rigol DS1054Z", value: 250, display: "250 MSa/s (4 ch)" },
              ]}
            />
          </Figure>
          <Figure caption={<>Samples per cycle at rated bandwidth with every channel on. The DS1054Z wins this one.</>}>
            <BarChart
              items={[
                { label: "Rigol DS1054Z", value: 5, display: "5 (250 ÷ 50)", highlight: true },
                { label: "Rigol DS1202Z-E", value: 2.5, display: "2.5 (500 ÷ 200)" },
              ]}
            />
          </Figure>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Two power-electronics jobs, two different winners</h2>
        <p className="text-muted leading-7 mb-4">
          A three-phase motor drive and a half-bridge sit on the same kind of bench, but they ask opposite things of a
          scope. One needs breadth, the other needs speed.
        </p>
        <Figure
          caption={
            <>
              Left: phases A, B and C plus a current probe fill all four DS1054Z inputs. Right: the high-side and
              low-side gates of one leg, with the dead time between them, need the DS1202Z-E&apos;s fast channels.
              Waveforms are illustrative.
            </>
          }
        >
          <PowerStageDiagram />
        </Figure>
        <h3 className="text-lg font-semibold mt-4 mb-2">Three phases and a current: the DS1054Z</h3>
        <p className="text-muted leading-7 mb-4">
          Checking that a drive&apos;s three phases are 120° apart and that current tracks them needs four traces on
          one timebase. Motor PWM runs in the kHz to tens of kHz, far inside 50 MHz, and 250 MSa/s per channel is
          plenty. The DS1202Z-E can only show two of those at once, so you would compare pairs and lose the full
          picture.
        </p>
        <h3 className="text-lg font-semibold mb-2">Dead time in a half-bridge: the DS1202Z-E</h3>
        <p className="text-muted leading-7 mb-4">
          Dead time is the gap where both switches are off, often tens to a few hundred nanoseconds. Two things limit
          how well you can read it. Sample spacing: 2 ns per sample on the DS1202Z-E with both channels on, 2 ns on
          the DS1054Z with two on (4 ns with three or four). And edge speed: the DS1054Z&apos;s 7 ns rise time blurs
          each end of the gap. For an illustrative 50 ns dead time, two 7 ns edges are a large fraction of the
          interval; two 1.75 ns edges barely register.
        </p>
        <KeyIdea title="The samples-per-cycle surprise">
          With every channel on, the DS1054Z actually has the healthier ratio at its own limit: 250 MSa/s against 50
          MHz is 5 samples per cycle. The DS1202Z-E&apos;s 500 MSa/s against 200 MHz is 2.5. The DS1202Z-E still sees
          far more, but near 200 MHz with both channels on, single-shot captures are thin. Turn one channel off for
          1 GSa/s when you need detail at the top of the band.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DS1054Z vs DS1202Z-E: which should you buy?</h2>
        <DataTable
          head={["Job", "Pick", "Why"]}
          rows={[
            ["Three-phase BLDC or inverter output", "DS1054Z", "Three phases plus current on one screen"],
            ["Half-bridge dead time and gate edges", "DS1202Z-E", "1.75 ns rise time, 2 ns sample spacing"],
            ["SPI with CLK, CS, MOSI and MISO", "DS1054Z", "All four lines at once"],
            ["25 MHz SPI clock signal integrity", "DS1202Z-E", "200 MHz keeps the 5th harmonic"],
            ["Power-rail sequencing on 3 or 4 rails", "DS1054Z", "One capture shows the order"],
            ["Millivolt ripple on a switching supply", "DS1202Z-E", "500 µV/div floor and faster front end"],
            ["General hobby bench", "DS1054Z", "Four inputs cover more everyday jobs"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What each one can and can&apos;t measure</h2>
        <h3 className="text-lg font-semibold mb-2">Rigol DS1054Z: wide and slow</h3>
        <p className="text-muted leading-7 mb-4">
          The DS1054Z suits multi-signal timing below about 10 MHz: buses, motor drives, sequencing, audio. Its 7 ns
          rise time sets an accurate-edge floor near 20 to 35 ns. It can&apos;t properly show ringing on fast gates or
          the shape of clocks above about 10 MHz, and with four channels on each one gets 6 Mpts per Rigol&apos;s
          datasheet.
        </p>
        <h3 className="text-lg font-semibold mb-2">Rigol DS1202Z-E: narrow and fast</h3>
        <p className="text-muted leading-7 mb-4">
          The DS1202Z-E reads edges down to roughly 5 to 9 ns, clocks to about 40 MHz and millivolt ripple at 500
          µV/div. Its 12 Mpts per channel with both on is twice the DS1054Z&apos;s four-channel figure. It can&apos;t
          show a third or fourth signal, which rules it out for multi-phase and full-bus work.
        </p>
        <Callout title="Power stages bite back">
          Half-bridges and motor drives often run from rectified mains or high-voltage DC. Both Rigols have
          earth-referenced inputs rated CAT I 300 Vrms and CAT II 100 Vrms, so a ground clip on a switching node
          shorts it to earth. Use high-voltage differential probes for anything not referenced to the low-voltage
          ground, and discharge bus capacitors before touching the board.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question: the DS1054Z&apos;s two spec sheets</h2>
        <p className="text-muted leading-7 mb-4">
          Rigol&apos;s DS1000Z datasheet lists 24 Mpts standard and decoding with no option label. Its product page
          lists 12 Mpts standard, 24 Mpts optional, and calls bus decoding an option. The DS1202Z-E&apos;s DS1000Z-E
          datasheet lists 24 Mpts and decoding as standard, and we found no conflicting page. If the DS1054Z&apos;s
          memory or decoding sways you, check what the listing includes.
        </p>
        <p className="text-muted leading-7">
          Related pairs:{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" className={link}>
            Rigol DS1102Z-E vs DS1054Z
          </Link>{" "}
          for the 100 MHz middle step,{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1202z-e" className={link}>
            Rigol DS1102Z-E vs DS1202Z-E
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/rigol-ds1202z-e-vs-rigol-dho802" className={link}>
            Rigol DS1202Z-E vs DHO802
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" className={link}>
            Rigol DHO802 vs DS1054Z
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/hantek-dso2d15-vs-rigol-ds1054z" className={link}>
            Hantek DSO2D15 vs Rigol DS1054Z
          </Link>
          . Our{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-review" className={link}>
            Rigol DS1054Z review
          </Link>{" "}
          covers that scope alone, and{" "}
          <Link href="/oscilloscopes/how-to-measure-ringing-on-a-mosfet-gate-signal-with-an-oscilloscope" className={link}>
            measuring MOSFET gate ringing
          </Link>{" "}
          shows the fast-edge side in practice.
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Choose the Rigol DS1054Z if your work involves three or four signals at once and stays under about 10 MHz: motor phases, buses, rail sequencing. It's also the one our owner has tested. Choose the Rigol DS1202Z-E if you measure fast edges, dead time, ringing or 10 to 40 MHz clocks and two channels at a time are enough; it's four times faster on every channel it has.",
  chooseNeitherIf:
    "You need four channels and fast edges together, for example two half-bridge legs at once. A four-channel 100 MHz or faster scope such as the Siglent SDS1104X-E covers both better.",
  faqs: [
    {
      question: "Is the DS1202Z-E an upgrade from the DS1054Z?",
      answer:
        "It's a different trade rather than a straight upgrade. You gain four times the bandwidth (200 MHz against 50 MHz), a 1.75 ns rise time and a 500 µV/div range, but you give up two channels. The case, screen, 1 GSa/s total, capture rate, decoder list and warranty are the same in Rigol's datasheets.",
    },
    {
      question: "Can the DS1054Z measure MOSFET dead time?",
      answer:
        "It can show it, but not precisely when the gap is short. Its 7 ns calculated rise time smears each edge, and with three or four channels on, samples are 4 ns apart. For dead times of a few hundred nanoseconds it's workable; for tens of nanoseconds, the DS1202Z-E's 1.75 ns rise time is far better suited.",
    },
    {
      question: "Do both Rigol scopes decode serial buses?",
      answer:
        "Both datasheets list parallel, RS232/UART, I2C and SPI decoding on two buses. For the DS1054Z, Rigol's DS1000Z product page describes bus trigger and decode as an option, which conflicts with its datasheet. The DS1202Z-E's DS1000Z-E datasheet lists them without an option label.",
    },
    {
      question: "Which is better for a three-phase motor controller?",
      answer:
        "The DS1054Z. Seeing phases A, B and C together, plus a current probe on the fourth channel, is the normal way to check phase balance and commutation. Motor PWM frequencies sit far below 50 MHz. The DS1202Z-E would make you compare phases two at a time.",
    },
    {
      question: "Are the two scopes the same size?",
      answer:
        "Rigol lists both at 313.1 × 160.8 × 122.4 mm. The DS1054Z weighs 3.2 kg and the DS1202Z-E 2.9 kg without packaging. Both run from 100 to 240 V mains at up to 50 W, and Rigol gives both a three-year warranty on the mainframe.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1054Z review", href: "/oscilloscopes/rigol-ds1054z-review" },
    { label: "Rigol DS1102Z-E vs Rigol DS1054Z", href: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" },
    { label: "Rigol DS1102Z-E vs Rigol DS1202Z-E", href: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1202z-e" },
    { label: "Rigol DS1202Z-E vs Rigol DHO802", href: "/oscilloscopes/rigol-ds1202z-e-vs-rigol-dho802" },
    { label: "Rigol DS1202Z-E vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1202z-e-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO802 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho802-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Hantek DSO2D15 vs Rigol DS1054Z", href: "/oscilloscopes/hantek-dso2d15-vs-rigol-ds1054z" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Measure MOSFET gate ringing", href: "/oscilloscopes/how-to-measure-ringing-on-a-mosfet-gate-signal-with-an-oscilloscope" },
    { label: "Best oscilloscopes for power supply testing", href: "/oscilloscopes/best-oscilloscopes-for-power-supply-testing" },
  ],
};

export default function RigolDs1054zVsRigolDs1202zEPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
