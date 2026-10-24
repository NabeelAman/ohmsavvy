import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Rigol DS1102Z-E: 100MHz, 2 channels, 1 GSa/s (1 ch), 500 MSa/s (2 ch), 24 Mpts memory per Rigol's datasheet, 7-inch
// 800x480 display, up to 30,000 wfm/s, standard UART/I2C/SPI/parallel decode. Per rigolna.com and the DS1000Z-E
// datasheet (checked 2026-10-24), matching this site's existing DS1102Z-E Pick.
// Rigol DS1054Z: 50MHz, 4 channels, 1 GSa/s single-channel real-time sample rate, 7-inch display. Per rigolna.com
// and the DS1000Z datasheet (checked 2026-10-24), matching this site's existing DS1054Z Pick. Rigol's own DS1054Z
// page doesn't break down the sample rate with three or four channels enabled, so this page doesn't invent one.

const path = "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z";

const ds1102ze = picks.find((p) => p.name === "Rigol DS1102Z-E")!;
const ds1054z = picks.find((p) => p.name === "Rigol DS1054Z")!;

export const metadata = buildMetadata({
  title: "Rigol DS1102Z-E vs DS1054Z: Which Fits Your Lab?",
  description:
    "Rigol DS1102Z-E vs DS1054Z: 100 MHz on two channels with deep memory, versus 50 MHz across four channels. Which Rigol DS1000Z fits your bench better.",
  path: "/oscilloscopes/rigol-ds1102z-e-vs-rigol-ds1054z",
  image: ds1102ze.image,
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DS1102Z-E vs DS1054Z: Which Fits Your Lab?",
  path,
  published: "2026-10-24",
  intro:
    "Both scopes share Rigol's DS1000Z platform, a 7-inch display and the same general control layout, so the DS1102Z-E vs DS1054Z choice comes down to one trade-off: two channels at twice the bandwidth and with far more memory, or four channels at half the bandwidth. There's no single right answer — it depends on whether your bench work needs more inputs or more headroom.",
  a: {
    pick: ds1102ze,
    imageAlt: "Rigol DS1102Z-E two-channel 100 MHz oscilloscope, front panel",
    chooseIf: [
      "You rarely need more than two channels at once",
      "Your signals run faster than 10 MHz and you want real headroom above them",
      "You want to capture long events in detail — 24 Mpts of memory",
      "You mostly compare an input against an output, or a clock against data",
    ],
  },
  b: {
    pick: ds1054z,
    imageAlt: "Rigol DS1054Z four-channel 50 MHz oscilloscope, front panel",
    chooseIf: [
      "You regularly need three or four channels at once, e.g. multi-rail power supplies",
      "Your signals are mostly below a few megahertz: audio, control logic, low-speed buses",
      "You want the most channels for the least money as a general bench scope",
      "You're a student or hobbyist who values community support and tutorials",
    ],
  },
  extraSpecs: [
    { label: "Channels", a: "2", b: "4" },
    { label: "Bandwidth", a: "100MHz", b: "50MHz" },
    { label: "Sample rate, 1 channel", a: "1 GSa/s", b: "1 GSa/s" },
    { label: "Sample rate, 2 channels", a: "500 MSa/s", b: "Not broken down by Rigol" },
    { label: "Memory depth", a: "24 Mpts (per Rigol's datasheet)", b: "Not stated at the same depth" },
    { label: "Display", a: "7-inch, 800 × 480", b: "7-inch, 800 × 480" },
    { label: "Waveform capture rate", a: "Up to 30,000 wfm/s", b: "Not stated in this Pick's sourcing" },
    { label: "Serial decode", a: "UART, I2C, SPI, parallel (standard)", b: "Not called out in this Pick's sourcing" },
    { label: "Built-in generator", a: "None", b: "None" },
    { label: "Hands-on tested by OhmSavvy", a: "No", b: "Yes" },
  ],
  differences: [
    "Channel count: the DS1054Z has four analog channels against the DS1102Z-E's two — the single biggest practical difference between them.",
    "Bandwidth: the DS1102Z-E is rated 100 MHz, double the DS1054Z's 50 MHz, so it keeps more accuracy on faster signals.",
    "Memory: the DS1102Z-E documents 24 Mpts per Rigol's datasheet; this Pick's sourcing for the DS1054Z doesn't carry the same figure, so the two can't be compared head-to-head on memory depth.",
    "Both share the same DS1000Z-family 7-inch 800 × 480 display, control layout and 1 GSa/s single-channel peak sample rate.",
    "Only the DS1054Z carries OhmSavvy's Hands-on Tested badge; the DS1102Z-E hasn't been bought and tested in-house yet.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec</h2>
        <p className="text-muted leading-7 mb-4">
          The two scopes trade channel count for bandwidth almost exactly: the DS1102Z-E has half the channels of
          the DS1054Z and twice the bandwidth. Everything else — display, platform, control layout — is close enough
          that it doesn&apos;t move the decision.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Bandwidth: the DS1102Z-E doubles the DS1054Z&apos;s rated bandwidth.</>}>
            <BarChart
              items={[
                { label: "DS1102Z-E", value: 100, display: "100 MHz", highlight: true },
                { label: "DS1054Z", value: 50, display: "50 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Channel count: the DS1054Z doubles the DS1102Z-E&apos;s channel count.</>}>
            <BarChart
              items={[
                { label: "DS1054Z", value: 4, display: "4", highlight: true },
                { label: "DS1102Z-E", value: 2, display: "2" },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          Both scopes peak at the same 1 GSa/s with a single channel active. Where they diverge is what happens as
          you add channels and how long a capture you can hold at full rate — the DS1102Z-E publishes a clear 24
          Mpts figure per Rigol&apos;s datasheet, while this Pick&apos;s sourcing for the DS1054Z doesn&apos;t carry
          the same depth, so treat any memory comparison between them with caution rather than assuming parity. For
          what the sample-rate number actually buys you on screen, see{" "}
          <Link href="/oscilloscopes/what-does-gsa-s-mean" className={link}>
            what GSa/s means
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rigol DS1102Z-E vs DS1054Z: which fits your lab?</h2>
        <p className="text-muted leading-7 mb-4">
          Picking between them starts with one question: how many signals do you actually need to see at once, and
          how fast do they move?
        </p>
        <h3 className="text-lg font-semibold mb-2">If you mostly compare two signals: the DS1102Z-E</h3>
        <p className="text-muted leading-7 mb-4">
          A lot of bench work is fundamentally a two-signal comparison — an input against an output, a clock against
          a data line, a trigger against a response. For that kind of work the DS1102Z-E&apos;s extra bandwidth
          matters more than a third or fourth channel would. At 100 MHz you get real headroom over anything in the
          low tens of megahertz, where the DS1054Z&apos;s 50 MHz rating starts to compress the picture.
        </p>
        <h3 className="text-lg font-semibold mb-2">If you need more inputs at once: the DS1054Z</h3>
        <p className="text-muted leading-7 mb-4">
          Multi-rail power supplies, I2C or SPI buses with more than two lines, or any project where you want to
          watch three or four points simultaneously make the DS1054Z the more useful tool day to day, even at half
          the bandwidth. Running out of channels mid-debug — having to disconnect one probe to connect another — is
          its own kind of friction that extra bandwidth doesn&apos;t fix.
        </p>
        <KeyIdea title="Bandwidth and channel count rarely trade off evenly">
          It&apos;s tempting to treat &quot;100 MHz × 2 channels&quot; and &quot;50 MHz × 4 channels&quot; as roughly equivalent, but they
          serve different failure modes. A fast, two-signal timing problem is easier on the DS1102Z-E; a
          multi-point, slower-signal layout problem is easier on the DS1054Z. Match the choice to the kind of
          problem you hit most, not to a spec-sheet trade that looks even on paper. Our{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          walks through how to weigh the two.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Buyer or job", "Better fit", "Why"]}
          rows={[
            ["Two-signal comparisons: input/output, clock/data", "Rigol DS1102Z-E", "100 MHz headroom on the signals you're actually watching"],
            ["Multi-rail power supplies or 3-4 point debugging", "Rigol DS1054Z", "Four channels beats two regardless of bandwidth"],
            ["Signals mostly under a few megahertz", "Rigol DS1054Z", "50 MHz is plenty of headroom at that range, with more channels"],
            ["Signals in the tens of megahertz", "Rigol DS1102Z-E", "100 MHz keeps real accuracy where the DS1054Z starts to compress"],
            ["Want the most proven, widely documented pick", "Rigol DS1054Z", "OhmSavvy's Hands-on Tested pick, years of community support"],
            ["Long captures at full sample rate", "Rigol DS1102Z-E", "24 Mpts documented by Rigol's datasheet"],
          ]}
        />
        <p className="text-muted leading-7 mt-4">
          Want to see where a Siglent fits against either? The{" "}
          <Link href="/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" className={link}>
            DS1054Z vs Siglent SDS1104X-E
          </Link>{" "}
          page compares the four-channel pick against a four-channel Siglent, and{" "}
          <Link href="/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" className={link}>
            DS1102Z-E vs Siglent SDS1102CML+
          </Link>{" "}
          covers the two-channel DS1000Z-E against a budget Siglent. The{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            beginner oscilloscope roundup
          </Link>{" "}
          ranks both scopes, and the{" "}
          <Link href="/oscilloscopes/oscilloscope-buying-guide" className={link}>
            oscilloscope buying guide
          </Link>{" "}
          explains every spec from scratch.
        </p>
        <Callout title="Same platform, same learning curve">
          Because both scopes share the DS1000Z control layout and menu system, skills transfer completely between
          them — there&apos;s no relearning involved if your needs change later and you move from one to the other.
        </Callout>
      </section>
    </>
  ),
  bottomLine:
    "Choose the Rigol DS1102Z-E if your bench work is mostly two-signal comparisons at higher speed and you want the memory depth to match; choose the Rigol DS1054Z if you regularly need three or four channels at once and your signals run at a few megahertz or below. Both share the same DS1000Z-family display and controls, so neither choice locks you out of the other's skills later.",
  faqs: [
    {
      question: "Is the Rigol DS1102Z-E strictly better than the DS1054Z?",
      answer:
        "No — it trades two channels for double the bandwidth and documented 24 Mpts of memory. Whether that's better depends on your work: the DS1054Z's four channels are more useful for multi-point debugging, while the DS1102Z-E's 100 MHz and memory depth suit faster, fewer-channel comparisons.",
    },
    {
      question: "Can I add more channels to the DS1102Z-E later?",
      answer:
        "No, the DS1102Z-E is a fixed two-channel scope. If you expect to need three or four channels at any point, the DS1054Z (or a four-channel model with more bandwidth, like the Rigol DHO814) is the safer starting point.",
    },
    {
      question: "Which one has OhmSavvy actually tested?",
      answer:
        "The Rigol DS1054Z carries our Hands-on Tested badge — it's been bought and used in-house. The DS1102Z-E hasn't been tested hands-on yet, so its rating reflects published specifications only.",
    },
    {
      question: "Do they use the same probes and accessories?",
      answer:
        "Both are part of Rigol's DS1000Z family and use the same standard passive probe connector and general accessory ecosystem, so probes and most accessories are interchangeable between them.",
    },
  ],
  roundup: { label: "See all beginner oscilloscope picks", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
    { label: "What is oscilloscope bandwidth?", href: "/oscilloscopes/what-is-oscilloscope-bandwidth" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "Rigol DS1054Z vs Siglent SDS1202X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1202x-e" },
    { label: "Rigol DS1102Z-E vs Siglent SDS1102CML+", href: "/oscilloscopes/rigol-ds1102z-e-vs-siglent-sds1102cml-plus" },
    { label: "Rigol DS1054Z vs Hantek DSO2D10", href: "/oscilloscopes/rigol-ds1054z-vs-hantek-dso2d10" },
    { label: "Rigol DS1054Z vs OWON SDS1102", href: "/oscilloscopes/rigol-ds1054z-vs-owon-sds1102" },
    { label: "Hantek DSO2C10 vs FNIRSI 1014D", href: "/oscilloscopes/hantek-dso2c10-vs-fnirsi-1014d" },
  ],
};

export default function RigolDs1102zEVsRigolDs1054zPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
