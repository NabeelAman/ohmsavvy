import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Hantek DSO2C10: 100MHz, 2 channels, 1 GSa/s (1 ch), 500 MSa/s (2 ch), 8-bit (12-bit high-res mode), 8 Mpts (1 ch)
// / 4 Mpts (2 ch), 7" 800x480, UART/I2C/SPI/CAN/LIN decode, 32 auto measurements, no generator, mains power, 1.9 kg.
// Matching this site's existing DSO2C10 Pick, per hantek.com (checked 2026-10-24).
// Hantek DSO2D15: same DSO2000-series platform at 150MHz, 2.4ns rise time, same 1 GSa/s / 500 MSa/s and 8/4 Mpts
// memory split, plus a built-in generator (25MHz sine, 10MHz square/arbitrary, 200 MSa/s, 12-bit). Per hantek.com
// products/detail/17182, DSO2D15 column (checked 2026-10-24), matching this site's existing DSO2D15 Pick.

const path = "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d15";

const dso2c10 = picks.find((p) => p.name === "Hantek DSO2C10")!;
const dso2d15 = picks.find((p) => p.name === "Hantek DSO2D15")!;

export const metadata = buildMetadata({
  title: "Hantek DSO2C10 vs DSO2D15: Which Should You Buy?",
  description:
    "Hantek DSO2C10 vs DSO2D15: same DSO2000-series platform, but 100 MHz with no generator against 150 MHz with a built-in 25 MHz generator.",
  path: "/oscilloscopes/hantek-dso2c10-vs-hantek-dso2d15",
  image: dso2d15.image,
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Hantek DSO2C10 vs DSO2D15: Which Should You Buy?",
  path,
  published: "2026-10-24",
  intro:
    "The DSO2C10 and DSO2D15 share the same Hantek DSO2000-series chassis, 7-inch display, serial decoding and memory architecture. Two things separate them: bandwidth (100 MHz against 150 MHz) and whether a built-in signal generator is on board at all. That second difference matters more than the bandwidth gap for most buyers.",
  a: {
    pick: dso2c10,
    imageAlt: "Hantek DSO2C10 two-channel 100 MHz benchtop oscilloscope, front panel",
    chooseIf: [
      "You already own a separate signal generator, or don't need one",
      "100 MHz is comfortably above your fastest signals",
      "You want to spend less for the same decoding and memory architecture",
      "Your work is mostly observing existing signals, not creating test stimuli",
    ],
  },
  b: {
    pick: dso2d15,
    imageAlt: "Hantek DSO2D15 two-channel 150 MHz benchtop oscilloscope with built-in signal generator, front panel",
    chooseIf: [
      "You want a built-in generator so you don't need separate test equipment",
      "Your signals run faster and 150 MHz gives you real headroom over the DSO2C10's 100 MHz",
      "You want to test filters, amplifiers or analog stages by driving them yourself",
      "You're buying one scope to cover both observing and generating signals",
    ],
  },
  extraSpecs: [
    { label: "Bandwidth", a: "100MHz", b: "150MHz" },
    { label: "Channels", a: "2", b: "2" },
    { label: "Sample rate, 1 channel", a: "1 GSa/s", b: "1 GSa/s" },
    { label: "Sample rate, 2 channels", a: "500 MSa/s", b: "500 MSa/s" },
    { label: "Memory depth", a: "8 Mpts (1 ch); 4 Mpts (2 ch)", b: "8 Mpts (1 ch); 4 Mpts (2 ch)" },
    { label: "Vertical resolution", a: "8-bit; high-res mode to 12-bit", b: "8-bit; high-res mode to 12-bit" },
    { label: "Built-in signal generator", a: "None (per Hantek's spec table)", b: "1-ch, 25MHz sine / 10MHz square or arbitrary, 200 MSa/s, 12-bit" },
    { label: "Serial decode", a: "UART, I2C, SPI, CAN, LIN", b: "UART, I2C, SPI, CAN, LIN" },
    { label: "Display", a: "7-inch, 800 × 480", b: "7-inch, 800 × 480" },
    { label: "Rise time", a: "Not separately stated for this model", b: "2.4 ns" },
  ],
  differences: [
    "Signal generator: the DSO2D15 has a built-in one-channel DDS generator; Hantek's spec table lists none for the DSO2C10, even though both front panels carry the same WAVE GEN / GEN OUT labels — go by the spec, not the panel.",
    "Bandwidth: 150 MHz on the DSO2D15 against 100 MHz on the DSO2C10, a 50% increase.",
    "Everything else that both Picks document — sample rate, memory depth, vertical resolution, serial decoding, display — is identical between them.",
    "This listing for the DSO2D15 bundles a P4100 100X probe; the DSO2C10's listing doesn't include one.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Most of the DSO2000-series spec sheet is identical between these two models. The chart below isolates the
          two numbers that actually differ: bandwidth and generator output.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Bandwidth: the DSO2D15 offers 50% more than the DSO2C10.</>}>
            <BarChart
              items={[
                { label: "DSO2D15", value: 150, display: "150 MHz", highlight: true },
                { label: "DSO2C10", value: 100, display: "100 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Generator sine-wave output: the DSO2C10 has none, per Hantek&apos;s own spec table.</>}>
            <BarChart
              items={[
                { label: "DSO2D15, sine", value: 25_000_000, display: "25 MHz", highlight: true },
                { label: "DSO2C10", value: 0, display: "None" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Sample rate, memory depth and resolution are a wash — both scopes hit 1 GSa/s on one channel, 500 MSa/s on
          two, and the same 8/4 Mpts memory split. Neither number should factor into your decision here.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Hantek DSO2C10 vs DSO2D15: which should you buy?</h2>
        <p className="text-muted leading-7 mb-4">
          Because the platforms are otherwise identical, this decision comes down to two independent questions: do
          you need a built-in generator, and does your work need more than 100 MHz of bandwidth?
        </p>
        <h3 className="text-lg font-semibold mb-2">If you need to drive a circuit, not just observe it: the DSO2D15</h3>
        <p className="text-muted leading-7 mb-4">
          Filters, amplifiers and analog stages don&apos;t produce their own test signal — you have to feed them
          one. The DSO2D15&apos;s built-in generator (25 MHz sine, 10 MHz square or arbitrary) does that from the
          same box, letting you put the input on one channel and the output on the other without reaching for
          separate equipment.
        </p>
        <h3 className="text-lg font-semibold mb-2">If you already have a generator, or don&apos;t need one: the DSO2C10</h3>
        <p className="text-muted leading-7 mb-4">
          Digital debugging — reading decoded UART, I2C, SPI, CAN or LIN traffic — doesn&apos;t need a signal
          source; the signals already exist on the bus. For that kind of work the DSO2C10 delivers the identical
          decoding, memory and sample-rate capability as the DSO2D15 for less money, with 100 MHz comfortably
          covering most digital and low-RF signals.
        </p>
        <KeyIdea title="A 50% bandwidth increase matters less than a missing generator">
          Going from 100 MHz to 150 MHz extends the usable range (by the usual three-to-five-times rule) from
          roughly 20–33 MHz to 30–50 MHz — useful, but a narrower gap than it looks on paper. Whether you need a
          built-in generator at all is normally the bigger factor in day-to-day usefulness, since it changes what
          kinds of tests you can run without buying a second instrument.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Analog circuits, filters, amplifiers you need to drive", "Hantek DSO2D15", "Built-in 25 MHz generator feeds the circuit under test"],
            ["Digital bus debugging (UART, I2C, SPI, CAN, LIN)", "Hantek DSO2C10", "Identical decoding for less money; no generator needed"],
            ["Signals approaching 100-150 MHz", "Hantek DSO2D15", "150 MHz gives real headroom where the DSO2C10 compresses"],
            ["Already own a bench signal generator", "Hantek DSO2C10", "No reason to pay for a second one built in"],
            ["Want a probe included in the box", "Hantek DSO2D15", "This listing bundles a P4100 100X probe"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Want the DSO2D15 against a different FNIRSI alternative? See{" "}
          <Link href="/oscilloscopes/hantek-dso2d15-vs-fnirsi-1014d" className={link}>
            Hantek DSO2D15 vs FNIRSI 1014D
          </Link>
          . For the DSO2C10 against a generator-equipped FNIRSI, see{" "}
          <Link href="/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" className={link}>
            Hantek DSO2C10 vs FNIRSI 1014D
          </Link>
          . The{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>{" "}
          ranks both, and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          explains every spec from scratch.
        </p>
        <Callout title="Same panel labels, different spec sheets">
          Both scopes&apos; front panels carry WAVE GEN and GEN OUT labels from the shared DSO2000 chassis design,
          but Hantek&apos;s own specification table lists a generator only for the DSO2D15. Go by the published
          spec, not what&apos;s printed on the case.
        </Callout>
      </section>
    </>
  ),
  bottomLine:
    "The Hantek DSO2C10 and DSO2D15 share the same platform, memory and decoding — the real decision is whether you need the DSO2D15's built-in 25 MHz generator, not the bandwidth difference. Buy the DSO2D15 if you need to drive circuits yourself; buy the DSO2C10 if you're mainly debugging digital signals and already have (or don't need) a separate generator.",
  faqs: [
    {
      question: "Is the Hantek DSO2D15 strictly better than the DSO2C10?",
      answer:
        "It has more bandwidth (150 MHz vs 100 MHz) and a built-in generator the DSO2C10 lacks, so it's more capable — but it also costs more. If you don't need a generator and 100 MHz covers your signals, the DSO2C10 gets you the same decoding and memory for less.",
    },
    {
      question: "Does the Hantek DSO2C10 really have no signal generator?",
      answer:
        "Correct, per Hantek's own specification table — even though its front panel carries the same WAVE GEN and GEN OUT labels as the DSO2D15, which does have one. This is a documented quirk of the shared DSO2000 chassis design: go by the spec sheet, not the panel markings.",
    },
    {
      question: "Do the DSO2C10 and DSO2D15 use the same probes?",
      answer:
        "Yes, both are part of Hantek's DSO2000 series and use the same probe connector and general accessory ecosystem. The DSO2D15 listing on this site bundles an extra P4100 100X probe.",
    },
    {
      question: "How much more bandwidth does the DSO2D15 actually give you?",
      answer:
        "By the usual three-to-five-times usable-bandwidth rule, the DSO2C10's 100 MHz rating displays signals accurately up to roughly 20-33 MHz, while the DSO2D15's 150 MHz extends that to about 30-50 MHz. It's a real but moderate increase — smaller in practice than the 50% headline number suggests.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Hantek DSO2C10 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" },
    { label: "Hantek DSO2D15 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2d15-vs-fnirsi-1014d" },
    { label: "Rigol DHO814 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho814-vs-rigol-dho804" },
    { label: "Rigol DS1102Z-E vs Rigol DS1054Z", href: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" },
  ],
};

export default function HantekDso2c10VsHantekDso2d15Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
