import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

const path = "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z";

export const metadata = buildMetadata({
  title: "Rigol DHO804 vs Rigol DS1054Z",
  description:
    "Rigol DHO804 vs Rigol DS1054Z: 12-bit resolution, 70 MHz and a touchscreen against the classic 50 MHz four-channel scope. Specs, charts and who should upgrade.",
  path: "/oscilloscopes/rigol-dho804-vs-rigol-ds1054z",
});

const link = "text-accent hover:underline";

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Rigol DHO804 vs Rigol DS1054Z",
  path,
  published: "2026-10-22",
  intro:
    "Rigol DHO804 vs Rigol DS1054Z is old favorite against new generation. Both are four-channel Rigol scopes for hobbyists and students. The DHO804 moves to 12-bit vertical resolution, 70 MHz, a 1024 × 600 touchscreen and USB-C power; the DS1054Z keeps the familiar 50 MHz platform with optional serial decoding and a large community behind it.",
  a: {
    pick: picks.find((p) => p.name === "Rigol DHO804")!,
    imageAlt: "Rigol DHO804 12-bit four-channel oscilloscope, front panel",
    chooseIf: [
      "You want 12-bit resolution to see small signals riding on larger ones",
      "You want a touchscreen, HDMI output and serial decoding included",
      "You want a compact scope that can run from a USB-C power source",
    ],
  },
  b: {
    pick: picks.find((p) => p.name === "Rigol DS1054Z")!,
    reviewHref: "/oscilloscopes/rigol-ds1054z-review",
    imageAlt: "Rigol DS1054Z four-channel digital oscilloscope",
    chooseIf: [
      "You want the scope most tutorials and forums are written around",
      "50 MHz is enough for your microcontroller and audio work",
      "You prefer physical knobs and menus to a touchscreen",
    ],
  },
  extraSpecs: [
    { label: "Vertical resolution", a: "12-bit", b: "Not listed on Rigol's 1000Z page" },
    { label: "Sample rate, 4 channels on", a: "312.5 MSa/s", b: "250 MSa/s" },
    { label: "Memory depth", a: "25 Mpts (1 ch); 5 Mpts (4 ch)", b: "12 Mpts standard; 24 Mpts optional" },
    { label: "Waveform rate", a: "30,000 wfms/s; 1,000,000 in UltraAcquire", b: "Not listed on Rigol's 1000Z page" },
    { label: "Display", a: "7-inch 1024 × 600 touchscreen", b: "7-inch" },
    { label: "Serial decoding", a: "Standard: UART, I2C, SPI, CAN, parallel", b: "Optional: RS232/UART, I2C, SPI" },
    { label: "Video out / power", a: "HDMI; USB-C power input", b: "Not listed" },
    { label: "Generator / logic", a: "None", b: "None" },
  ],
  differences: [
    "The DHO804 is a 12-bit scope; Rigol's DS1000Z-E datasheet lists 8 bits for the closely related two-channel Z-E models, and the 1000Z page doesn't list a figure for the DS1054Z.",
    "The DHO804 has 70 MHz of bandwidth against the DS1054Z's 50 MHz.",
    "With all four channels running, the DHO804 samples at 312.5 MSa/s per channel against 250 MSa/s.",
    "Serial decoding is standard on the DHO804 and optional on the DS1000Z series.",
    "The DHO804 adds a capacitive touchscreen, HDMI output and USB-C power; the DS1054Z is a conventional mains-powered benchtop.",
    "Both scopes carry our Hands-on Tested badge.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Bandwidth and four-channel sample rate compared</h2>
        <p className="text-muted leading-7 mb-4">
          Both scopes share one sample-rate budget across their channels, so the figure that matters for
          four-channel work is the per-channel rate with everything switched on.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Analog bandwidth per Rigol.</>}>
            <BarChart
              items={[
                { label: "DHO804", value: 70, display: "70 MHz", highlight: true },
                { label: "DS1054Z", value: 50, display: "50 MHz" },
              ]}
            />
          </Figure>
          <Figure caption={<>Per-channel sample rate with all four channels on.</>}>
            <BarChart
              items={[
                { label: "DHO804", value: 312.5, display: "312.5 MSa/s", highlight: true },
                { label: "DS1054Z", value: 250, display: "250 MSa/s" },
              ]}
            />
          </Figure>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">What 12 bits buys you</h2>
        <DataTable
          head={["ADC resolution", "Vertical levels", "Smallest step on an 8-division screen"]}
          rows={[
            ["8-bit", "256", "1/256 of full scale"],
            ["12-bit", "4,096", "1/4,096 of full scale"],
          ]}
        />
        <div className="mt-4">
          <KeyIdea title="When the extra bits help">
            Sixteen times as many levels means you can zoom into ripple, noise or a small sensor signal without
            the trace breaking into visible steps. For square-wave logic work the difference is far smaller. Read{" "}
            <Link href="/oscilloscopes/what-is-oscilloscope-bandwidth" className={link}>
              what oscilloscope bandwidth means
            </Link>{" "}
            for the other half of the picture.
          </KeyIdea>
        </div>
      </section>
    </>
  ),
  bottomLine:
    "For a new purchase, the DHO804 is the stronger scope: 12-bit resolution, more bandwidth, a faster four-channel sample rate, standard decoding and a modern touchscreen. The DS1054Z still makes sense if you want the most documented beginner scope and 50 MHz covers your work.",
  faqs: [
    {
      question: "Is the DHO804 a replacement for the DS1054Z?",
      answer:
        "Rigol sells both. The DHO804 is a newer platform with 12-bit resolution and a touchscreen, while the DS1054Z remains in stock on Rigol's North American site.",
    },
    {
      question: "Does the DHO804 have a built-in signal generator?",
      answer: "No. Rigol's DHO800 specifications list no built-in generator or digital channels, and neither does the DS1054Z.",
    },
    {
      question: "Which has more memory?",
      answer:
        "With one channel on, the DHO804 reaches 25 Mpts against the DS1054Z's 12 Mpts standard (24 Mpts optional). With all four channels on, the DHO804 drops to 5 Mpts.",
    },
    {
      question: "Can the DHO804 run from a battery?",
      answer: "Rigol says it takes USB-C power (15V, 3A) and can run from a portable power source, which the DS1054Z can't.",
    },
    {
      question: "Is serial decoding included?",
      answer: "On the DHO804, yes: UART, I2C, SPI, CAN and parallel are standard. On the DS1000Z series, bus triggering and decoding are listed as options.",
    },
  ],
  roundup: { label: "See the full oscilloscope roundup", href: "/oscilloscopes/best-beginner-oscilloscopes" },
  related: [
    { label: "Rigol DS1054Z vs Siglent SDS1104X-E", href: "/oscilloscopes/rigol-ds1054z-vs-siglent-sds1104x-e" },
    { label: "What does GSa/s mean?", href: "/oscilloscopes/what-does-gsa-s-mean" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
  ],
};

export default function RigolDho804VsRigolDs1054zPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
