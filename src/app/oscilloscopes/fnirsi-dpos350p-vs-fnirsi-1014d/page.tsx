import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// FNIRSI DPOS350P: 350MHz, 2 channels, 1 GSa/s, 50,000 wfm/s refresh, 1ns rise time, 8-16bit high-res mode, 50MHz
// DDS generator (14 waveforms + custom, 50MHz sine/10MHz square), 350MHz spectrum analyzer (200kHz-350MHz FFT, 32K
// points, 3D waterfall), 50MHz frequency response analyzer (100Hz-50MHz sweep), 7" 1024x600 touchscreen. Matching
// this site's existing DPOS350P Pick, per the official Amazon listing (B0F6K8H5CT, manufacturer FNIRSI) (checked
// 2026-10-24).
// FNIRSI 1014D: 100MHz, 2 channels, 1 GSa/s, 8-bit, 7" 800x480 screen, single-channel DDS generator (sine to 10MHz,
// other waveforms to 2MHz, 2.5Vpp), FFT/X-Y/roll modes, USB export, memory quoted as "240Kbit", kit includes two
// 1X/10X probes plus a 100X high-voltage probe, 5V adapter power. Matching this site's existing 1014D Pick, per
// fnirsi.com/products/1014d (checked prior session).

const path = "/oscilloscopes/fnirsi-dpos350p-vs-fnirsi-1014d";

const dpos350p = picks.find((p) => p.name === "FNIRSI DPOS350P")!;
const t1014d = picks.find((p) => p.name === "FNIRSI 1014D")!;

export const metadata = buildMetadata({
  title: "FNIRSI DPOS350P vs 1014D: Which Offers More?",
  description:
    "FNIRSI DPOS350P vs 1014D: a 350 MHz 4-in-1 scope/generator/spectrum analyzer against a simpler 100 MHz scope with a basic generator.",
  path: "/oscilloscopes/fnirsi-dpos350p-vs-fnirsi-1014d",
  image: dpos350p.image,
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "FNIRSI DPOS350P vs 1014D: Which Model Offers More?",
  path,
  published: "2026-10-25",
  intro:
    "Both are FNIRSI benchtop-style scopes with a built-in signal generator, but the DPOS350P is a considerably more ambitious instrument: more than 3x the bandwidth, a far stronger generator, and two extra instruments — a spectrum analyzer and a frequency response analyzer — built into the same touchscreen. The 1014D is the simpler, more established option.",
  a: {
    pick: dpos350p,
    imageAlt: "FNIRSI DPOS350P 4-in-1 oscilloscope, generator, spectrum analyzer and frequency response analyzer, front view",
    chooseIf: [
      "You need more bandwidth: 350 MHz against the 1014D's 100 MHz",
      "You want a spectrum analyzer and frequency response analyzer built in",
      "You want a stronger generator (up to 50 MHz sine vs 10 MHz)",
      "You're comfortable with a new, more complex device without a long independent track record",
    ],
  },
  b: {
    pick: t1014d,
    imageAlt: "FNIRSI 1014D two-channel 100 MHz benchtop oscilloscope with signal generator, front view",
    chooseIf: [
      "100 MHz bandwidth comfortably covers your signals",
      "You want a simpler device with a shorter learning curve",
      "You want the bundled probe kit (two 1X/10X probes plus a 100X HV probe)",
      "You'd rather buy the lower-complexity, lower-cost option",
    ],
  },
  extraSpecs: [
    { label: "Bandwidth", a: "350MHz", b: "100MHz" },
    { label: "Channels", a: "2", b: "2" },
    { label: "Sample rate", a: "1 GSa/s", b: "1 GSa/s" },
    { label: "Vertical resolution", a: "8-16 bit high-res mode", b: "8-bit" },
    { label: "Waveform refresh rate", a: "50,000 wfm/s", b: "Not stated in this Pick's sourcing" },
    { label: "Rise time", a: "1 ns (documented)", b: "Not stated in this Pick's sourcing" },
    { label: "Signal generator", a: "14 waveforms + custom, up to 50MHz sine / 10MHz square", b: "1-ch DDS, sine to 10MHz, other waveforms to 2MHz" },
    { label: "Spectrum analyzer", a: "200kHz-350MHz FFT, 32K points, 3D waterfall", b: "None" },
    { label: "Frequency response analyzer", a: "100Hz-50MHz sweep", b: "None" },
    { label: "Display", a: "7-inch, 1024 × 600, touchscreen", b: "7-inch, 800 × 480" },
    { label: "Memory", a: "Not stated at the same detail in this Pick's sourcing", b: "Quoted by FNIRSI as \"240Kbit\"" },
    { label: "Included accessories", a: "Not detailed to the same level in this Pick's sourcing", b: "Two 1X/10X probes plus a 100X HV probe" },
  ],
  differences: [
    "Bandwidth: 350 MHz on the DPOS350P against 100 MHz on the 1014D — more than 3.5x.",
    "Extra instruments: only the DPOS350P includes a spectrum analyzer and a frequency response analyzer alongside the oscilloscope and generator — the 1014D is scope-plus-generator only.",
    "Generator: the DPOS350P's 50 MHz sine / 10 MHz square output is 5x the 1014D's 10 MHz sine / 2 MHz other-waveform generator.",
    "Documentation detail: the DPOS350P's listing gives specific refresh rate (50,000 wfm/s) and rise time (1 ns) figures the 1014D's sourcing doesn't carry; conversely, the 1014D's probe kit is more explicitly detailed.",
    "Both share the same 1 GSa/s sample rate and two-channel count.",
    "Maturity: the 1014D is an established pick on this site with more real-world track record; the DPOS350P is newer and not yet independently tested long-term.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The DPOS350P leads on nearly every scope-side spec and adds two instruments the 1014D doesn&apos;t have at
          all. The chart below focuses on the two numbers that separate them most: bandwidth and generator reach.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Bandwidth: the DPOS350P offers 3.5x the 1014D&apos;s rated bandwidth.</>}>
            <BarChart
              items={[
                { label: "DPOS350P", value: 350, display: "350 MHz", highlight: true },
                { label: "1014D", value: 100, display: "100 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Generator sine-wave output: the DPOS350P reaches 5x higher.</>}>
            <BarChart
              items={[
                { label: "DPOS350P, sine", value: 50, display: "50 MHz", highlight: true },
                { label: "1014D, sine", value: 10, display: "10 MHz" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Beyond the headline numbers, the DPOS350P&apos;s spectrum analyzer (200 kHz–350 MHz FFT with a 3D waterfall
          display) and frequency response analyzer (100 Hz–50 MHz sweep) are capabilities the 1014D simply doesn&apos;t
          offer at any level — they&apos;re separate instruments bundled into the same touchscreen, not an enhanced
          version of what the 1014D already does.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">FNIRSI DPOS350P vs 1014D: which model offers more?</h2>
        <p className="text-muted leading-7 mb-4">
          On raw capability the DPOS350P wins almost every category — the real question is whether you need that
          capability, or whether it adds cost and complexity you won&apos;t use.
        </p>
        <h3 className="text-lg font-semibold mb-2">If you need more than a scope and a basic generator: the DPOS350P</h3>
        <p className="text-muted leading-7 mb-4">
          RF and EMI troubleshooting benefits directly from a built-in spectrum analyzer, and testing filters or
          amplifiers is easier with a dedicated frequency response analyzer that sweeps and plots gain/phase
          automatically. If your bench work touches any of that, the DPOS350P replaces what would otherwise be
          several separate instruments.
        </p>
        <h3 className="text-lg font-semibold mb-2">If you just need a straightforward scope with a generator: the 1014D</h3>
        <p className="text-muted leading-7 mb-4">
          For general electronics work — checking a microcontroller signal, driving a simple filter, basic
          debugging — the 1014D&apos;s 100 MHz and 10 MHz generator cover the job without the DPOS350P&apos;s added
          complexity, learning curve, or unproven track record.
        </p>
        <KeyIdea title="More instruments mean more to learn">
          A 4-in-1 device like the DPOS350P packs real capability into one touchscreen, but each additional
          instrument (spectrum analyzer, frequency response analyzer) is its own thing to learn to use well. If you
          won&apos;t actually use the extra two-thirds of the feature set, the simpler 1014D may serve you better
          day to day, not just at a lower price.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["RF/EMI troubleshooting or filter/amplifier testing", "FNIRSI DPOS350P", "Built-in spectrum and frequency response analyzers"],
            ["Signals approaching or above 100 MHz", "FNIRSI DPOS350P", "350 MHz bandwidth vs. 100 MHz"],
            ["General electronics debugging, nothing exotic", "FNIRSI 1014D", "Covers the job without extra complexity"],
            ["Want the bundled high-voltage probe kit", "FNIRSI 1014D", "Includes two 1X/10X probes plus a 100X HV probe"],
            ["Want the more established, longer-tested pick", "FNIRSI 1014D", "More real-world track record on this site"],
            ["Need a stronger built-in generator", "FNIRSI DPOS350P", "50 MHz sine vs. 10 MHz"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Want to see the 1014D against a Hantek alternative instead? See{" "}
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
        <Callout title="The DPOS350P is a newer, unproven entrant">
          Unlike the 1014D, which has an established track record on this site, the DPOS350P is a new product
          without independent long-term reviews yet. Its feature set on paper is strong, but factor that
          uncertainty into the decision if you&apos;re risk-averse about buying something newer.
        </Callout>
      </section>
    </>
  ),
  bottomLine:
    "The FNIRSI DPOS350P outclasses the 1014D on nearly every spec — more than 3x the bandwidth, a stronger generator, and two extra built-in instruments (spectrum analyzer, frequency response analyzer) the 1014D doesn't have. But it's also newer, more complex, and less proven. Choose the DPOS350P if you'll actually use that extra capability; choose the simpler, more established 1014D if a straightforward 100 MHz scope with a basic generator covers your work.",
  faqs: [
    {
      question: "Is the FNIRSI DPOS350P strictly better than the 1014D?",
      answer:
        "On documented specs, yes — more bandwidth (350 MHz vs 100 MHz), a stronger generator, and a built-in spectrum analyzer and frequency response analyzer the 1014D doesn't have. The trade-offs are more complexity and a shorter, less proven track record than the more established 1014D.",
    },
    {
      question: "Does the FNIRSI 1014D have a spectrum analyzer?",
      answer:
        "No — the 1014D's feature set in this site's sourcing covers oscilloscope, FFT display, X-Y mode and roll mode, plus its built-in generator. A dedicated spectrum analyzer with frequency sweep and 3D waterfall display is only on the DPOS350P.",
    },
    {
      question: "Which comes with a better accessory kit?",
      answer:
        "The 1014D's kit is more explicitly documented in this site's sourcing: two 1X/10X probes plus a 100X high-voltage probe. The DPOS350P's included accessories aren't detailed to the same level here, so check the current listing if that matters to you.",
    },
    {
      question: "Is the DPOS350P a good choice for a first oscilloscope?",
      answer:
        "It can be, but its four-instrument feature set has a steeper learning curve than the simpler 1014D. If you're new to oscilloscopes and don't yet need a spectrum analyzer or frequency response analyzer, the 1014D may be the easier starting point.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "Hantek DSO2C10 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" },
    { label: "Hantek 1008C vs Hantek DSO2C10", href: "/oscilloscopes/hantek-1008c-vs-hantek-dso2c10" },
    { label: "OWON HDS272S vs FNIRSI 2C53T", href: "/oscilloscopes/owon-hds272s-vs-fnirsi-2c53t" },
  ],
};

export default function FnirsiDpos350pVsFnirsi1014dPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
