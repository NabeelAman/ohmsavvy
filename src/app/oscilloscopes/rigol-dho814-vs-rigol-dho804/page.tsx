import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Rigol DHO814: 100MHz, 4 channels, 12-bit, 1.25 GSa/s, 25 Mpts, up to 1 Mwfms/s (UltraAcquire), 7" 1024x600
// touchscreen. Per rigolna.com/products/digital-oscilloscopes/dho800 (checked 2026-10-24), matching this site's
// DHO814 Pick. Rigol's page doesn't list dimensions or weight for the DHO800 series.
// Rigol DHO804: 70MHz, 4 channels, 12-bit, 1.25 GSa/s (1 ch), 312.5 MSa/s (4 ch), 25 Mpts (1 ch), 5 Mpts (4 ch),
// 7" 1024x600 touchscreen, HDMI out, UART/I2C/SPI/CAN/parallel decode, USB-C powered. Matching this site's existing
// DHO804 Pick (checked 2026-10-24).

const path = "/oscilloscopes/rigol-dho814-vs-rigol-dho804";

const dho814 = picks.find((p) => p.name === "Rigol DHO814")!;
const dho804 = picks.find((p) => p.name === "Rigol DHO804")!;

export const metadata = buildMetadata({
  title: "Rigol DHO814 vs DHO804: Compared",
  description:
    "Rigol DHO814 vs DHO804: same DHO800-series touchscreen platform and 4 channels, but 100 MHz against 70 MHz. Which bandwidth tier fits your bench.",
  path: "/oscilloscopes/rigol-dho814-vs-rigol-dho804",
  image: dho814.image,
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DHO814 vs DHO804: Compare Channels and Features",
  path,
  published: "2026-10-24",
  intro:
    "The DHO814 and DHO804 are the same Rigol DHO800-series scope — four channels, 12-bit resolution, a 7-inch 1024 × 600 touchscreen, HDMI out and serial decoding — at two different bandwidth tiers. There's no channel-count trade-off here like there is between other Rigol models; the only question is whether you need the extra bandwidth.",
  a: {
    pick: dho814,
    imageAlt: "Rigol DHO814 four-channel 100 MHz touchscreen oscilloscope, front panel",
    chooseIf: [
      "Your signals run up into the tens of megahertz and you want real headroom",
      "You want the fastest waveform capture rate the DHO800 series offers",
      "You're buying once and want to avoid outgrowing the bandwidth later",
      "Budget allows the step up from the DHO804",
    ],
  },
  b: {
    pick: dho804,
    imageAlt: "Rigol DHO804 four-channel 70 MHz touchscreen oscilloscope, front panel",
    chooseIf: [
      "Your signals are mostly audio, control logic or low-speed digital buses",
      "You want the same four-channel touchscreen platform for less money",
      "70 MHz already covers everything you currently work on",
      "You'd rather save the difference for probes or accessories",
    ],
  },
  extraSpecs: [
    { label: "Bandwidth", a: "100MHz", b: "70MHz" },
    { label: "Channels", a: "4", b: "4" },
    { label: "Vertical resolution", a: "12-bit", b: "12-bit" },
    { label: "Sample rate, 1 channel", a: "1.25 GSa/s", b: "1.25 GSa/s" },
    { label: "Sample rate, 4 channels", a: "Not stated by Rigol at this tier", b: "312.5 MSa/s" },
    { label: "Memory depth", a: "25 Mpts", b: "25 Mpts (1 ch); 5 Mpts (4 ch)" },
    { label: "Waveform capture rate", a: "Up to 1 Mwfms/s (UltraAcquire)", b: "Not stated in this Pick's sourcing" },
    { label: "Display", a: "7-inch touchscreen, 1024 × 600", b: "7-inch touchscreen, 1024 × 600" },
    { label: "Serial decode", a: "Not called out in this Pick's sourcing", b: "UART, I2C, SPI, CAN, parallel" },
    { label: "Power", a: "Not stated in this Pick's sourcing", b: "USB-C" },
    { label: "Hands-on tested by OhmSavvy", a: "No", b: "Yes" },
  ],
  differences: [
    "Bandwidth is the headline difference: 100 MHz on the DHO814 against 70 MHz on the DHO804 — about 43% more headroom.",
    "Both share the identical four-channel, 12-bit, 7-inch 1024 × 600 touchscreen DHO800 platform and the same 1.25 GSa/s single-channel peak sample rate.",
    "The DHO804's four-channel sample rate (312.5 MSa/s) and memory-depth-with-all-channels-on figure (5 Mpts) are documented; the DHO814's equivalent figures aren't stated at the same level of detail in this Pick's sourcing.",
    "The DHO804 is confirmed USB-C powered and lists UART/I2C/SPI/CAN/parallel decoding; this Pick's DHO814 sourcing doesn't carry those same specific details, so don't assume they differ — only that they aren't separately confirmed here.",
    "The DHO804 carries OhmSavvy's Hands-on Tested badge; the DHO814 hasn't been bought and tested in-house yet.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          Strip away the shared platform and the comparison reduces to one number: bandwidth. Everything else that
          both Picks document — channel count, resolution, single-channel sample rate, screen — is identical.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Bandwidth: the DHO814 offers about 43% more headroom than the DHO804.</>}>
            <BarChart
              items={[
                { label: "DHO814", value: 100, display: "100 MHz", highlight: true },
                { label: "DHO804", value: 70, display: "70 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Single-channel sample rate: identical on both at this platform&apos;s peak.</>}>
            <BarChart
              items={[
                { label: "DHO814, 1 ch", value: 1250, display: "1.25 GSa/s", highlight: true },
                { label: "DHO804, 1 ch", value: 1250, display: "1.25 GSa/s" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Because both scopes share the same four channels and 12-bit converter, the decision doesn&apos;t involve
          any of the usual channel-count or resolution trade-offs — it&apos;s purely about how much of a safety margin
          you want above your fastest signal. See our{" "}
          <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
            bandwidth explainer
          </Link>{" "}
          for why the rated figure isn&apos;t the same as the usable one.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DHO814 vs DHO804: which bandwidth tier fits?</h2>
        <p className="text-muted leading-7 mb-4">
          Since the platform is identical, this comparison is simpler than most on this site — it comes down to
          matching the bandwidth to your actual signals, not to a feature trade-off.
        </p>
        <h3 className="text-lg font-semibold mb-2">If your signals climb into the tens of megahertz: the DHO814</h3>
        <p className="text-muted leading-7 mb-4">
          By the usual three-to-five-times rule of thumb, a 70 MHz scope displays signals up to roughly 14–23 MHz
          accurately, while a 100 MHz scope extends that to about 20–33 MHz. If your work regularly approaches or
          exceeds the lower end of that range — faster SPI buses, RF-adjacent signals, switching power supply
          ringing — the DHO814&apos;s extra bandwidth buys real margin rather than a number on a spec sheet.
        </p>
        <h3 className="text-lg font-semibold mb-2">If you&apos;re mostly below a few tens of megahertz: the DHO804</h3>
        <p className="text-muted leading-7 mb-4">
          Audio circuits, most control logic, I2C and many SPI implementations, and general hobbyist electronics
          rarely approach 70 MHz, let alone 100 MHz. For that kind of work the DHO804 delivers the same four-channel
          touchscreen experience for less money, and the documented 312.5 MSa/s four-channel rate and 5 Mpts memory
          figure give you a clearer picture of what to expect with every channel running.
        </p>
        <KeyIdea title="When a platform is shared, buy on bandwidth margin, not on spec-sheet anxiety">
          It&apos;s easy to default to the higher-bandwidth model &quot;to be safe,&quot; but on a shared platform like this
          one, the right approach is to look at your actual signals and apply the three-to-five-times rule, then
          decide if the DHO804&apos;s 70 MHz already clears that bar with room to spare. If it does, the DHO814&apos;s extra
          bandwidth is paying for headroom you may never use.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Signals in the tens of megahertz or faster", "Rigol DHO814", "100 MHz keeps real accuracy where 70 MHz starts to compress"],
            ["Audio, control logic, low-speed buses", "Rigol DHO804", "70 MHz already covers the signal with plenty of margin"],
            ["Want documented 4-channel sample rate and memory", "Rigol DHO804", "312.5 MSa/s and 5 Mpts at 4 channels are both stated"],
            ["Buying once, want headroom against future projects", "Rigol DHO814", "More bandwidth to grow into without a second purchase"],
            ["Tightest budget on this platform", "Rigol DHO804", "Same 4-channel touchscreen platform for less"],
            ["Want the most proven, hands-on verified pick", "Rigol DHO804", "Carries OhmSavvy's Hands-on Tested badge"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Want a 100 MHz, four-channel scope at a lower price point without the DHO800&apos;s touchscreen? See how
          the{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" className={link}>
            Rigol DS1102Z-E compares against the DS1054Z
          </Link>
          . The{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>{" "}
          ranks both DHO800 models, and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          explains every spec from scratch.
        </p>
        <Callout title="Same accessories, same learning curve">
          Because the DHO814 and DHO804 share the same DHO800 platform, firmware and menu system, there&apos;s no
          relearning involved if you start on one and later use or upgrade to the other.
        </Callout>
      </section>
    </>
  ),
  bottomLine:
    "The Rigol DHO814 and DHO804 are the same four-channel, 12-bit, touchscreen platform at two bandwidth tiers. Choose the DHO814 if your signals run into the tens of megahertz or you want headroom to grow into; choose the DHO804 if your work stays below that range and you'd rather save the difference — it also carries OhmSavvy's Hands-on Tested badge, while the DHO814 doesn't yet.",
  faqs: [
    {
      question: "Is the Rigol DHO814 just a higher-bandwidth DHO804?",
      answer:
        "Functionally, yes — both share the same four-channel, 12-bit, 7-inch touchscreen DHO800 platform. The documented difference is bandwidth: 100 MHz on the DHO814 against 70 MHz on the DHO804, plus some four-channel sample-rate and memory figures that are more fully published for the DHO804 in this Pick's sourcing.",
    },
    {
      question: "Do the DHO814 and DHO804 use the same probes and accessories?",
      answer:
        "Yes. As members of the same DHO800 series, they share the same probe connector type and general accessory ecosystem.",
    },
    {
      question: "Which one should a beginner buy?",
      answer:
        "If you don't yet know whether you'll need more than 70 MHz, the DHO804 is the more conservative, better-value starting point on this platform. Buy the DHO814 only if you already have a specific reason to expect faster signals.",
    },
    {
      question: "Does either DHO800 model have a built-in signal generator?",
      answer:
        "No — neither the DHO814 nor the DHO804 includes a built-in generator in this Pick's sourcing. If you want a generator built in, look at a model like the FNIRSI 1014D instead.",
    },
    {
      question: "Which one has OhmSavvy actually tested?",
      answer:
        "The Rigol DHO804 carries our Hands-on Tested badge — it's been bought and used in-house. The DHO814 hasn't been tested hands-on yet, so its rating reflects published specifications only.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Rigol DS1102Z-E vs Rigol DS1054Z", href: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Rigol DS1054Z", href: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z" },
    { label: "Rigol DHO804 vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1104x-e" },
    { label: "Rigol DHO804 vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-dho804-vs-siglent-sds1202x-e" },
    { label: "Rigol DHO914 vs Rigol DHO804", href: "/oscilloscopes/rigol-dho914-vs-rigol-dho804" },
    { label: "Hantek DSO5102P vs Rigol DHO804", href: "/oscilloscopes/hantek-dso5102p-vs-rigol-dho804" },
  ],
};

export default function RigolDho814VsRigolDho804Page() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
