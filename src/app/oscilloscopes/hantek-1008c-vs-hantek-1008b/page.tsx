import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { BarChart, Callout, DataTable, Figure, KeyIdea } from "@/components/HowTo";
import { ProductComparison, type ProductComparisonContent } from "@/components/ProductComparison";
import { picks } from "../best-beginner-oscilloscopes/page";
import { buildMetadata } from "@/lib/metadata";

// Hantek 1008B per https://hantek.com/products/detail/13169 and Hantek 1008C per https://hantek.com/products/detail/13170
// (both checked 2026-11-08): the two pages publish the same table: 8 analog channels, 1 MOhm, 10 mV/div-5 V/div, DC
// coupling, 12-bit, 4K memory, max input 400 V (DC + AC peak), 2.4 MSa/s real time, timebase 1 ns/div-20000 s/div,
// +/-50 ppm, edge trigger on CH1-CH8, X-Y on CH1/CH2, voltage and time measurements (Vpp, Vamp, Vmax, Vmin, Vtop, Vmid,
// Vbase, Vavg, Vrms, Vcrms, preshoot, overshoot, frequency, period, rise/fall time, +/- width, duty cycle), cursors,
// add/subtract/multiply/divide/FFT/invert, FFT windows rectangular/Hanning/Hamming/Blackman, probe scales to x10000 and
// 20:1, current ranges for CC65/CC650/CC1100 clamps, USB 2.0 full speed, no external power, 190 x 167 x 35 mm, 0.63 kg,
// 8-channel LVTTL generator 0-250 kHz, one high-pressure ignition probe listed. Both pages say "Over 80 types of automotive
// diagnostic function" in the overview and "78 types of vehicle diagnosis function" further down. The 1008C page lists
// Windows XP/7/8/10. 100 kHz bandwidth is stated only in the shared Hantek1008 manual
// https://www.hantek.com/Product/Hantek1008/Hantek1008_Manual.pdf Appendix A (per this site's 1008B Pick).
// Amazon 1008B https://www.amazon.com/dp/B01EZWJRGG (Hantek Store, In Stock at ZIP 10001, checked 2026-11-08): over 80
// automotive functions (ignition, sensor, bus detection, starter and charging circuits), video help, one-key diagnostic
// report, long-time recording, crank/cam simulation, Windows 10/7/8, 7.48 x 6.57 x 1.38 in; "What's in the box" lists only
// "1008b"; per this site's 1008B Pick, its kit photo shows no ignition probe.
// Amazon 1008C https://www.amazon.com/dp/B00BSR98KW (Hantek Store, buy box at ZIP 10001, checked 2026-11-08): same over-80
// function bullets, video help and one-key report; "What's in the box": oscilloscope, instruction CD, auto probe,
// 4 x alligator clip to coaxial cable, 4 coaxial connectors. No ignition probe named.
// Capture-window and sample-rate figures below are our arithmetic from 4K points and engine speed, not Hantek figures.

const path = "/oscilloscopes/hantek-1008c-vs-hantek-1008b";
const c = picks.find((p) => p.name === "Hantek 1008C")!;
const b = picks.find((p) => p.name === "Hantek 1008B")!;

export const metadata = buildMetadata({
  title: "Hantek 1008C vs 1008B: What Actually Differs",
  description:
    "Hantek 1008C vs 1008B: Hantek publishes identical specs for both 8-channel car scopes. We compare kits, listings and software claims so you buy the right one.",
  path: "/oscilloscopes/hantek-1008c-vs-hantek-1008b",
  image: c.image,
});

const link = "text-accent hover:underline";

/** One shared hardware spec, two Amazon box lists. */
function SharedCoreDiagram() {
  const core = ["8 channels, 12-bit", "2.4 MSa/s, 4K points", "400 V (DC + AC peak)", "8-ch LVTTL generator, 250 kHz", "USB powered, 0.63 kg"];
  return (
    <svg
      viewBox="0 0 400 230"
      className="w-full h-auto"
      role="img"
      aria-label="Hantek 1008C vs 1008B diagram: both models share one published spec, eight 12-bit channels at 2.4 MSa/s with 4K points, 400 V inputs, an 8-channel LVTTL generator and USB power. The 1008C Amazon box list names an auto probe, four alligator-to-coax leads, four coax connectors and a CD; the 1008B listing names only the unit."
    >
      <rect x="120" y="10" width="160" height="112" rx="10" className="fill-accent/10 stroke-accent" strokeWidth="1.4" />
      <text x="200" y="28" fontSize="10" fontWeight="700" textAnchor="middle" className="fill-foreground">Shared Hantek spec table</text>
      {core.map((t, i) => (
        <text key={t} x="200" y={46 + i * 15} fontSize="8.5" textAnchor="middle" className="fill-foreground">
          {t}
        </text>
      ))}
      <path d="M160 122 L90 150 M240 122 L310 150" className="stroke-foreground fill-none" strokeWidth="1.3" />
      <rect x="10" y="150" width="170" height="72" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.3" />
      <text x="95" y="166" fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-foreground">1008C box (Amazon)</text>
      <text x="20" y="182" fontSize="8.5" className="fill-foreground">Scope, CD, auto probe</text>
      <text x="20" y="196" fontSize="8.5" className="fill-foreground">4 alligator-to-coax leads</text>
      <text x="20" y="210" fontSize="8.5" className="fill-foreground">4 coax connectors</text>
      <rect x="220" y="150" width="170" height="72" rx="8" className="fill-surface stroke-foreground" strokeWidth="1.3" />
      <text x="305" y="166" fontSize="9.5" fontWeight="700" textAnchor="middle" className="fill-foreground">1008B box (Amazon)</text>
      <text x="230" y="182" fontSize="8.5" className="fill-foreground">Lists only &quot;1008b&quot;</text>
      <text x="230" y="196" fontSize="8.5" className="fill-muted">Ask the seller what</text>
      <text x="230" y="210" fontSize="8.5" className="fill-muted">leads ship with it</text>
    </svg>
  );
}

const comparison: ProductComparisonContent = {
  category: "oscilloscopes",
  heading: "Hantek 1008C vs 1008B",
  path,
  published: "2026-11-08",
  intro:
    "Hantek 1008C vs 1008B is a question with a short answer: on Hantek's own product pages, the two publish the same spec table, line for line. Both are eight-channel, 12-bit USB scopes at 2.4 MSa/s with 4K points, 400 V inputs, an eight-channel 250 kHz signal simulator and the same \"over 80\" automotive tests. What differs is the Amazon listing: the 1008C itemizes leads and an auto probe, the 1008B lists only the unit. Buy whichever is cheaper on the day once you know what is in the box.",
  a: {
    pick: c,
    imageAlt: "Hantek 1008C eight-channel automotive USB oscilloscope kit",
    chooseIf: [
      "You want a listing that itemizes its leads: an auto probe, four alligator-to-coax leads and four coax connectors",
      "It costs the same as or less than the 1008B when you check",
      "You want the instruction CD in the box",
      "You run an older Windows XP laptop in the shop (listed on Hantek's 1008C page)",
    ],
  },
  b: {
    pick: b,
    imageAlt: "Hantek 1008B eight-channel automotive USB oscilloscope and leads",
    chooseIf: [
      "It is cheaper on the day and you already own BNC test leads",
      "You confirmed with the seller which leads and probes ship",
      "You want the same published hardware and diagnostic software",
      "Your laptop runs Windows 7, 8 or 10, as the listing states",
    ],
  },
  extraSpecs: [
    { label: "Spec table on Hantek's page", a: "Identical to the 1008B", b: "Identical to the 1008C" },
    { label: "Resolution and rate", a: "12-bit, 2.4 MSa/s", b: "12-bit, 2.4 MSa/s" },
    { label: "Memory", a: "4K", b: "4K" },
    { label: "Maximum input", a: "400 V (DC + AC peak)", b: "400 V (DC + AC peak)" },
    { label: "Vertical range (x1)", a: "10 mV/div to 5 V/div", b: "10 mV/div to 5 V/div" },
    { label: "Timebase", a: "1 ns/div to 20000 s/div", b: "1 ns/div to 20000 s/div" },
    { label: "Generator", a: "8 channels, LVTTL, 0–250 kHz", b: "8 channels, LVTTL, 0–250 kHz" },
    { label: "Automotive tests", a: "\"Over 80\" (overview), \"78\" (function list)", b: "\"Over 80\" (overview), \"78\" (function list)" },
    { label: "Ignition probe", a: "Listed by Hantek; not named in the Amazon box list", b: "Listed by Hantek; not shown in the Amazon kit photo" },
    { label: "Amazon box list", a: "Scope, CD, auto probe, 4 alligator-to-coax leads, 4 coax connectors", b: "\"1008b\" only" },
    { label: "Windows versions", a: "XP, 7, 8, 10 (Hantek page)", b: "7, 8, 10 (Amazon)" },
    { label: "Size and weight", a: "190 × 167 × 35 mm, 0.63 kg", b: "190 × 167 × 35 mm, 0.63 kg" },
  ],
  differences: [
    "Hardware: none that Hantek publishes. Both product pages carry the same channels, resolution, sample rate, memory, input rating, timebase, generator, size and weight.",
    "Software: both pages and both Amazon listings give the same automotive function count (\"over 80\", or 78 in the function list). We found no published difference in the diagnostic library.",
    "Kit: the 1008C Amazon listing names an auto probe, four alligator-clip-to-coax cables, four coax connectors and a CD. The 1008B listing names only the unit.",
    "Ignition probe: Hantek lists one high-pressure ignition probe for both, but neither Amazon listing confirms one in the box.",
    "Operating systems: Hantek's 1008C page lists Windows XP through 10; the 1008B listing gives Windows 7, 8 and 10.",
    "Neither carries our Hands-on Tested badge; both assessments are desk research from published specs.",
  ],
  sections: (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Hantek 1008C vs 1008B: what the spec sheets say</h2>
        <p className="text-muted leading-7 mb-4">
          We put Hantek&apos;s two product pages side by side on November 8, 2026. Every row matched: eight channels, 1
          MΩ DC-coupled inputs, 12-bit, 4K memory, 2.4 MSa/s, a 400 V (DC + AC peak) limit, 1 ns/div to 20000 s/div,
          edge triggering on any channel, the same voltage and time measurements, the same current-clamp ranges, 190 × 167
          × 35 mm and 0.63 kg. Both even repeat the same internal inconsistency, &quot;over 80&quot; tests in the overview
          and &quot;78 types&quot; in the function list.
        </p>
        <Figure caption={<>One published spec, two different Amazon box lists. Confirm leads and the ignition probe with the seller.</>}>
          <SharedCoreDiagram />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          If you have read that the C is the higher tier with more software, Hantek&apos;s current pages and both Amazon
          listings don&apos;t support it: they describe the same function set in the same words. If a seller
          claims extra functions on the 1008C, ask them to name the tests the 1008B lacks.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Spec by spec: the numbers both share</h2>
        <p className="text-muted leading-7 mb-4">
          Since the hardware matches, the useful charts are about what that shared hardware can do on a car. The key limit
          is 4K points. To fit one full engine revolution on screen, the scope must slow its sample rate to 4,000 divided
          by the revolution time.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Figure caption={<>Our arithmetic: fastest sample rate that still fits one crank revolution into 4K points.</>}>
            <BarChart
              items={[
                { label: "800 rpm idle (75 ms)", value: 53, display: "about 53 kSa/s" },
                { label: "3,000 rpm (20 ms)", value: 200, display: "200 kSa/s" },
                { label: "6,000 rpm (10 ms)", value: 400, display: "400 kSa/s", highlight: true },
              ]}
            />
          </Figure>
          <Figure caption={<>Time held by 4K points at the full 2.4 MSa/s, against one idle revolution.</>}>
            <BarChart
              items={[
                { label: "One revolution at 800 rpm", value: 75, display: "75 ms" },
                { label: "4K points at 2.4 MSa/s", value: 1.7, display: "about 1.7 ms", highlight: true },
              ]}
            />
          </Figure>
        </div>
        <p className="text-muted leading-7 mt-4">
          In practice that is fine for crank and cam sensors, injector pulses, alternator ripple and starter or charging
          current through a clamp, which are slow next to 100 kHz. It is short for a CAN bus at 500 kbit/s, where each bit lasts
          2 µs and 2.4 MSa/s gives under five samples per bit. Hantek doesn&apos;t say how 2.4 MSa/s divides with all eight
          channels on, so assume less per channel when you use them all.
        </p>
        <KeyIdea title="12 bits matters more than speed here">
          The 1008&apos;s 12-bit converter splits each range into 4,096 levels against 256 for an 8-bit scope. On a 5 V
          sensor signal that is the difference between seeing a 20 mV glitch and losing it in the quantization steps. It is
          the main reason to pick this platform over a faster general-purpose USB scope for sensor work.
        </KeyIdea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Which should you buy?</h2>
        <DataTable
          head={["Situation", "Pick", "One-line reason"]}
          rows={[
            ["The 1008C is cheaper or the same price", "Hantek 1008C", "Same published hardware, itemized leads"],
            ["The 1008B is clearly cheaper and you own BNC leads", "Hantek 1008B", "Same published hardware and software"],
            ["You need an ignition probe for secondary ignition", "Either, after asking", "Neither listing confirms one in the box"],
            ["Shop laptop still runs Windows XP", "Hantek 1008C", "Hantek's 1008C page lists XP"],
            ["You need CAN decoding or fast electronics work", "Neither", "100 kHz and 2.4 MSa/s are too slow"],
          ]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">What both can and can&apos;t measure</h2>
        <p className="text-muted leading-7 mb-4">
          Eight channels let you watch the crank sensor, both cam sensors and several injectors at once, which a two- or
          four-channel scope can&apos;t. The 250 kHz LVTTL generator can simulate crank and cam signals to test an ECU
          input on the bench. The software adds guided tests with reference waveforms and video help, and a one-key
          report. Neither has a screen; both need a Windows laptop over USB. Neither reaches past the 100 kHz bandwidth
          in Hantek&apos;s manual, so electronics work beyond audio is out of range. For a general-purpose USB scope,
          see{" "}
          <Link href="/oscilloscopes/picoscope-2204a-vs-hantek-1008c" className={link}>
            PicoScope 2204A vs Hantek 1008C
          </Link>
          .
        </p>
        <Callout title="Running engines and ignition voltage">
          Hantek rates the inputs at 400 V (DC + AC peak). Ignition secondary voltage is many times that, so it must only
          be read through a capacitive ignition pickup, never by connecting a lead directly. Injector and coil primary
          circuits can spike to hundreds of volts when they switch off; use an attenuator (Hantek&apos;s software
          supports 20:1, x10 and higher probe scales). Keep leads and
          the laptop clear of belts and fans, and never work on a running engine in a closed garage.
        </Callout>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">The trust question: kit contents</h2>
        <p className="text-muted leading-7 mb-4">
          The only real risk in this choice is the box. Hantek&apos;s pages list a high-pressure ignition probe for both
          models, but the 1008C box list on Amazon doesn&apos;t name one, and the 1008B kit photo doesn&apos;t show one. The
          1008B listing names no leads at all. Before ordering, message the seller and ask for the packing list in writing.
          That costs nothing and settles the one difference these two actually have.
        </p>
        <p className="text-muted leading-7">
          For each model against a general-purpose scope, see{" "}
          <Link href="/oscilloscopes/hantek-1008b-vs-hantek-6022be" className={link}>
            Hantek 1008B vs 6022BE
          </Link>
          ,{" "}
          <Link href="/oscilloscopes/hantek-6022be-vs-hantek-1008c" className={link}>
            Hantek 6022BE vs 1008C
          </Link>{" "}
          and{" "}
          <Link href="/oscilloscopes/hantek-1008c-vs-hantek-dso2c10" className={link}>
            Hantek 1008C vs DSO2C10
          </Link>
          , or the{" "}
          <Link href="/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics" className={link}>
            automotive oscilloscope picks
          </Link>
          .
        </p>
      </section>
    </>
  ),
  bottomLine:
    "Hantek publishes identical specs for the 1008C and 1008B: eight 12-bit channels, 2.4 MSa/s, 4K points, 400 V inputs, a 250 kHz eight-channel simulator and the same automotive test library. Buy the 1008C if it costs the same or less, since its listing itemizes the leads. Buy the 1008B if it is cheaper and the seller confirms what ships.",
  chooseNeitherIf:
    "You need to decode CAN or LIN, see signals above 100 kHz, or work without a laptop. Both are slow, screenless Windows USB scopes.",
  faqs: [
    {
      question: "What is the difference between the Hantek 1008B and 1008C?",
      answer:
        "On Hantek's product pages, none in hardware: the spec tables match line for line, and both claim the same automotive function count. The difference we found is the Amazon listing. The 1008C's box list names an auto probe, four alligator-to-coax leads and four coax connectors; the 1008B's names only the unit.",
    },
    {
      question: "Does the Hantek 1008C have more automotive tests than the 1008B?",
      answer:
        "Not according to Hantek's current pages or the two Amazon listings. All four describe \"over 80\" automotive functions, and both Hantek pages say \"78 types\" in their function lists. If a seller says the 1008C has extra tests, ask which ones; we couldn't find a published list that differs.",
    },
    {
      question: "Do the 1008B and 1008C come with an ignition probe?",
      answer:
        "Hantek's pages list one high-pressure ignition probe for each. The 1008C Amazon box list doesn't name one, and the 1008B listing's kit photo doesn't show one. Ask the seller before buying if you need it for secondary ignition, because direct connection to ignition secondary would far exceed the 400 V input rating.",
    },
    {
      question: "Can the Hantek 1008B or 1008C run on a Mac?",
      answer:
        "Hantek lists only Windows: XP, 7, 8 and 10 on the 1008C page, and 7, 8 and 10 on the 1008B Amazon listing. Neither source mentions macOS or Linux. On a Mac you would need a Windows installation, and USB driver support in that setup isn't something Hantek documents.",
    },
    {
      question: "Is the Hantek 1008 fast enough for CAN bus?",
      answer:
        "Not for decoding. High-speed CAN at 500 kbit/s has 2 µs bits, and 2.4 MSa/s gives under five samples per bit, with a 100 kHz bandwidth in Hantek's manual that rounds the edges. You can see bus activity, but for CAN shape and decoding a faster scope such as the Hantek DSO2C10 fits better.",
    },
  ],
  roundup: { label: "See the automotive oscilloscope picks", href: "/oscilloscopes/best-oscilloscopes-for-automotive-diagnostics" },
  related: [
    { label: "Hantek 1008B vs Hantek 6022BE", href: "/oscilloscopes/hantek-1008b-vs-hantek-6022be" },
    { label: "Hantek 6022BE vs Hantek 1008C", href: "/oscilloscopes/hantek-6022be-vs-hantek-1008c" },
    { label: "Hantek 1008C vs Hantek DSO2C10", href: "/oscilloscopes/hantek-1008c-vs-hantek-dso2c10" },
    { label: "PicoScope 2204A vs Hantek 1008C", href: "/oscilloscopes/picoscope-2204a-vs-hantek-1008c" },
    { label: "Best beginner oscilloscopes", href: "/oscilloscopes/best-beginner-oscilloscopes" },
    { label: "Oscilloscope buying guide", href: "/oscilloscopes/oscilloscope-buying-guide" },
  ],
};

export default function Hantek1008cVsHantek1008bPage() {
  return (
    <>
      <ProductComparison comparison={comparison} />
      <ContentLinks category="oscilloscopes" current={path} />
    </>
  );
}
