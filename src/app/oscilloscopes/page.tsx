import Link from "next/link";
import { CategoryHub } from "@/components/CategoryHub";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Oscilloscope Reviews, Comparisons & Guides",
  description:
    "Pick the right oscilloscope: ranked beginner and bench scopes, in-depth reviews, head-to-head comparisons and plain-English guides to triggering and probing.",
  path: "/oscilloscopes",
});

const link = "text-accent hover:underline";

export default function OscilloscopesHubPage() {
  return (
    <CategoryHub
      category="oscilloscopes"
      path="/oscilloscopes"
      heading="Oscilloscopes: Reviews, Comparisons and Buying Guides"
      intro={[
        <>
          Choose an oscilloscope by the signals you need to see: enough bandwidth for your fastest signals, a sample rate well
          above that bandwidth, enough channels to compare signals side by side and enough memory to capture them at full speed.
          For most hobby and repair benches, a four-channel scope in the 50 to 200 MHz range covers the work.
        </>,
        <>
          Start with our{" "}
          <Link href="/oscilloscopes/best-beginner-oscilloscopes" className={link}>
            ranked list of the best beginner oscilloscopes
          </Link>
          , pick by job (audio, automotive, power supplies, embedded), compare two scopes head to head, or use the guides when a
          trace won&apos;t trigger, drifts or shows the wrong voltage.
        </>,
      ]}
      criteria={[
        {
          title: "Bandwidth for your fastest signals",
          body: "Bandwidth is the frequency at which the scope's response has fallen by 3 dB, about 30% in amplitude. A common rule of thumb is three to five times the highest frequency you need to see accurately, more for sharp digital edges, whose harmonics reach far above the clock rate.",
        },
        {
          title: "Sample rate well above bandwidth",
          body: "The sample rate sets how finely the scope slices the waveform in time. Aim for several samples per period of your fastest signal; many makers pair 100 to 200 MHz scopes with 1 GSa/s or more. Remember that the rate is often shared, so it can drop when you turn on more channels.",
        },
        {
          title: "Two channels or four",
          body: "Two channels are enough to compare an input and an output. Four channels make it far easier to debug digital buses, motor drives and power supplies, where you want clock, data, enable and supply rail on screen together.",
        },
        {
          title: "Memory depth",
          body: "Memory depth decides how long the scope can record at full sample rate. Shallow memory forces the sample rate down on long captures, hiding glitches; deep memory, measured in millions of points, lets you zoom into a long capture without losing detail.",
        },
        {
          title: "Vertical resolution",
          body: "Most scopes digitize at 8 bits, or 256 levels across the screen. Newer 12-bit models resolve 4,096 levels, which helps when you need to see small ripple or noise riding on a larger signal.",
        },
        {
          title: "Features you'll use",
          body: "Serial decoding (UART, I²C, SPI, CAN), FFT, automatic measurements, a built-in signal generator and USB or LAN control all save time. Check which ones are included and which need a paid license or upgrade.",
        },
      ]}
      faqs={[
        {
          q: "How much oscilloscope bandwidth do I need?",
          a: "Use the rule of thumb of three to five times the highest frequency you want to measure accurately. Audio and most hobby microcontroller work fit comfortably within 50 to 100 MHz. Fast digital edges, switching power supplies and RF need more, because sharp edges contain harmonics well above the base frequency. More bandwidth also shows more noise, so buy for your real signals.",
        },
        {
          q: "Is a two-channel oscilloscope enough for a beginner?",
          a: "Two channels are enough to learn on and to compare an input with an output. Four channels make debugging much easier once you work on digital communication, motor control or power supplies, where several signals interact. Many entry-level scopes now come with four channels, so plenty of beginners choose four from the start.",
        },
        {
          q: "Are handheld or pocket oscilloscopes worth buying?",
          a: "Handheld scopes are handy for automotive and field work, and some combine a scope with a multimeter. Most have less bandwidth, fewer channels, shallower memory and smaller screens than bench scopes. For learning electronics at a desk, a bench scope is usually the better tool; for portable diagnostics, a handheld can be the more practical choice.",
        },
        {
          q: "What is the difference between an 8-bit and a 12-bit oscilloscope?",
          a: "Bit depth is vertical resolution. An 8-bit scope divides the screen into 256 levels, a 12-bit scope into 4,096, so it resolves smaller changes in voltage. That helps when you look for millivolts of ripple or noise riding on a larger signal. For general digital and timing work, a good 8-bit scope is still perfectly capable.",
        },
        {
          q: "Do I need an oscilloscope if I already have a multimeter?",
          a: "A multimeter gives you a single number, such as an average or RMS voltage. An oscilloscope shows how the voltage changes over time, which reveals ripple, noise, glitches, timing and signal shape that a meter cannot. If you repair or design electronics beyond simple DC circuits, a scope is the next tool to add.",
        },
        {
          q: "Why do oscilloscope probes have a 1x/10x switch?",
          a: "In 10x mode the probe divides the signal by ten, which loads the circuit far less and gives the full probe bandwidth. 1x mode keeps full sensitivity for very small signals but has much lower bandwidth and heavier loading. Always set the scope channel to match the probe, or every voltage reading will be off by a factor of ten.",
        },
      ]}
    />
  );
}
