import Link from "next/link";
import { ContentLinks } from "@/components/ContentLinks";
import { CategoryHero } from "@/components/CategoryHero";
import { ReviewArticle } from "@/components/ReviewArticle";
import { BarChart, Callout, DataTable, Figure, InfoCards, KeyIdea } from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";
import { guidePicks } from "@/lib/content";

export const metadata = buildMetadata({
  title: "10 Best Multimeters for Measuring Microamps",
  description:
    "The best multimeters for measuring microamps, ranked on µA resolution, published burden voltage and logging for sleep-current and standby-drain checks.",
  path: "/multimeters/best-multimeters-for-measuring-microamps",
  image: "https://m.media-amazon.com/images/I/71P9-kdt0QL._SL1500_.jpg",
});

const all = getAllPicks("multimeters");
const picks = guidePicks("/multimeters/best-multimeters-for-measuring-microamps")
  .map((n) => all.find((p) => p.name === n)!)
  .filter(Boolean);

const linkClass = "text-accent hover:underline";

const comparisonRows: string[][] = [
  ["1", "Fluke 287", "500.00 µA", "0.01 µA", "102 µV/µA", "Logging a sleeping board's current overnight"],
  ["2", "Fluke 289", "500.00 µA", "0.01 µA", "102 µV/µA", "One meter for µA work and milliohm checks"],
  ["3", "Fluke 87V", "600.0 µA", "0.1 µA (0.01 µA in HiRes)", "100 µV/µA", "Field and bench work that also hits mains"],
  ["4", "EEVblog Brymen BM786", "600.00 µA", "0.01 µA", "0.2 mV/µA", "60,000-count bench readings without logging"],
  ["5", "UNI-T UT181A", "600 µA", "0.01 µA (implied by counts)", "Not published", "Recording drain on a color trend screen"],
  ["6", "UNI-T UT61E+", "220.00 µA", "0.01 µA", "Not published", "Hobby sleep-current checks with a PC link"],
  ["7", "OWON B41T+", "220.00 µA", "0.01 µA", "Not published", "Unattended logging to the meter's own memory"],
  ["8", "Brymen BM235", "600.0 µA", "0.1 µA", "0.1 mV/µA", "Electricians who sometimes check standby draw"],
  ["9", "OWON OW18E", "200.00 µA", "0.01 µA", "Not published", "The lowest-cost 0.01 µA option"],
  ["10", "KAIWEETS HT118E", "200 µA", "0.01 µA (implied by counts)", "Not published", "A first 20,000-count meter for Arduino projects"],
];

const lookFor = [
  { label: "A dedicated µA range", desc: "Look for a range of a few hundred microamps. A meter whose smallest current range is in milliamps can't see sleep current at all." },
  { label: "Resolution at that range", desc: "0.01 µA steps separate 3.20 µA from 3.27 µA; 0.1 µA steps round both to 3.2 µA." },
  { label: "Published burden voltage", desc: "The voltage the meter itself drops per microamp. Lower is better, and a figure in the spec means you can correct for it." },
  { label: "Range headroom", desc: "Devices wake up and draw milliamps for a moment. A µA range that tops out too low forces a range change mid-test." },
  { label: "Logging or a PC link", desc: "Sleep current often changes over minutes or hours. Recording beats watching the display." },
  { label: "Lead and jack layout", desc: "A separate µA/mA jack, and a fuse you can replace easily, matter when you're probing current every day." },
];

const faqs = [
  {
    question: "Can any multimeter measure microamps?",
    answer:
      "No. Many electrician's meters, such as the Fluke 117, start their current measurement at amps, and others begin at tens of milliamps. To read microamps you need a meter with a dedicated µA range, usually a few hundred microamps full scale. Check the spec table for a range labeled in µA, not just a µA symbol on the dial of a sibling model.",
  },
  {
    question: "What is burden voltage and why does it matter for microamps?",
    answer:
      "Burden voltage is the drop across the meter's internal shunt while current flows through it. It is specified per microamp, so a meter rated at 100 µV/µA drops 10 mV at 100 µA. That rarely matters at sleep current, but when the circuit wakes and draws much more, a large drop can starve a low-voltage device or trigger a brown-out reset during the test.",
  },
  {
    question: "How do I measure the sleep current of an Arduino or ESP32 board?",
    answer:
      "Break the supply line and put the meter in series, with the red lead in the µA/mA jack. Start on a milliamp range so the boot current doesn't blow the fuse, then switch to the µA range once the board is asleep. Many people bridge the meter with a switch or jumper during wake-up and open it only for the sleep reading.",
  },
  {
    question: "Is 0.1 µA resolution enough for low-power electronics?",
    answer:
      "For confirming that a board sleeps at tens of microamps, yes. For comparing firmware changes that move standby current by fractions of a microamp, 0.01 µA resolution is easier to read. Remember that the accuracy spec adds a fixed number of digits, so the last digit on any meter is less certain than the display suggests.",
  },
  {
    question: "Why does my multimeter read zero on the microamp range?",
    answer:
      "Usually the meter isn't actually in series, the red lead is still in the voltage jack, or the µA/mA fuse has blown, which often happens after measuring a wake-up surge on a low range. Check the fuse with the meter's continuity mode, confirm the lead positions, and make sure the circuit's current really flows through the meter and not around it.",
  },
  {
    question: "Do I need a logging multimeter to measure standby current?",
    answer:
      "Not for a spot check, but standby current often changes as radios wake, timers fire or batteries settle. A meter that records readings, such as the Fluke 287, UNI-T UT181A or OWON B41T+, shows those changes over hours. Without logging, you only see whatever happens while you're watching the display.",
  },
];

const fitNotes: Record<string, string> = {
  "Fluke 287":
    "It leads this list because it combines 0.01 µA resolution on a 500 µA range with a published 102 µV/µA burden and on-screen TrendCapture logging, so you can leave it on a sleeping board and graph the result. It costs far more than a hobby meter, and Amazon stock comes from a third-party seller.",
  "Fluke 289":
    "Its microamp performance matches the 287: the same 500 µA range, 0.01 µA steps and 102 µV/µA burden, with logging too. It ranks second only because its extra 50 Ω low-ohm range, LoZ and low-pass filter add cost that pure current work doesn't need.",
  "Fluke 87V":
    "The 87V has a 600.0 µA range at 0.1 µA, Fluke's HiRes mode reaches 0.01 µA, and its burden of 100 µV/µA ties the Brymen BM235 for the lowest figure published here. It carries our Hands-on Tested badge. It sits below the 28x pair because it can't log readings on its own.",
  "EEVblog Brymen BM786":
    "Sixty thousand counts and a 600.00 µA range at 0.01 µA give it the finest bench display among the non-logging meters here, for much less than a Fluke 287. Its 0.2 mV/µA burden is twice that of the Fluke 87V and BM235, and it has no logging or PC link.",
  "UNI-T UT181A":
    "A 600 µA range at 60,000 counts implies 0.01 µA steps, and its 20,000-reading logger with trend graph suits watching a battery device's drain change over a night. UNI-T doesn't publish per-range resolution or burden voltage, which keeps it behind the meters above.",
  "UNI-T UT61E+":
    "Its 220.00 µA range resolves 0.01 µA at ±(0.5% + 10 digits), and the included USB cable sends readings to a PC, at a much lower price than the Fluke and Brymen meters above it. UNI-T doesn't publish the burden voltage, so you can't correct for the meter's own drop.",
  "OWON B41T+":
    "The 220 µA range reads to 0.01 µA, and the meter records up to 10,000 points over as long as 168 hours with no phone attached, which is ideal for overnight sleep-current runs. OWON states no burden voltage or CAT rating on its page.",
  "Brymen BM235":
    "It resolves only 0.1 µA on its 600.0 µA range, but Brymen publishes a low 0.1 mV/µA burden and the meter adds electrician features like AutoV LoZ and NCV. Choose it if µA checks are occasional and mains work is the main job.",
  "OWON OW18E":
    "A 200.00 µA range with 0.01 µA resolution, Bluetooth and offline recording make it the cheapest route to fine microamp readings here. Burden voltage isn't published.",
  "KAIWEETS HT118E":
    "Its 200 µA range on a 20,000-count display implies 0.01 µA steps, and DC µA accuracy is ±(0.5% + 5 digits). It ranks last because KAIWEETS doesn't print the resolution or burden voltage and the meter can't log, so it suits quick checks rather than careful characterization.",
};

const advice = [
  {
    heading: "Read the current table, not the dial",
    body:
      "Model families share dials and marketing photos, so a µA symbol on a picture doesn't prove a given meter has the range. Fluke's 117 and 179, for example, have no microamp range at all. Look in the maker's specification table for the lowest current range and its resolution, and check the burden voltage line while you're there.",
  },
  {
    heading: "Plan for the wake-up spike",
    body:
      "A sleeping device can draw a few microamps and then pull tens or hundreds of milliamps when it wakes to transmit. On a µA range that surge can blow the meter's fuse or drop enough voltage across the shunt to reset the device. Bridge the meter with a switch during start-up and radio bursts, or use a higher range first and step down once the device is quiet.",
  },
  {
    heading: "Decide whether you need a record",
    body:
      "If you only confirm that a product sleeps below a target, any meter here will do. If you're tuning firmware or chasing a battery that dies after a week, a recording meter such as the Fluke 287, UNI-T UT181A or OWON B41T+ shows the pattern over time. That trade decides more of the ranking than raw resolution does.",
  },
  {
    heading: "Keep mains work in mind",
    body:
      "Several meters here, including the Fluke 87V and Brymen BM235, are also built for electrical panels, while the OWON models don't state a CAT rating on the maker's page. If the same meter will go into a distribution board, weigh the safety rating as heavily as the microamp spec.",
  },
];

export default function BestMultimetersForMeasuringMicroampsPage() {
  return (
    <>
      <CategoryHero
        category="multimeters"
        label="Multimeters · Microamps"
        heading="Top 10 Best Multimeters for Measuring Microamps"
        tagline="Ranked on µA resolution, burden voltage and logging."
        description="Our top 10 best multimeters for measuring microamps, ranked for sleep current, standby drain and battery-powered electronics: from 50,000-count Fluke loggers to 20,000-count budget meters with a 200 µA range."
        primaryCta={{ label: "See the Full Roundup", href: "/multimeters/best-multimeters" }}
        secondaryCta={{ label: "Compare Side by Side", href: "#full-comparison" }}
        stats={[
          { value: `${picks.length}`, label: "Compared" },
          { value: "100%", label: "Spec-Verified" },
          { value: "$0", label: "Sponsored" },
        ]}
      />

      <section className="mx-auto max-w-4xl px-6 pt-12 space-y-10">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What microamp measurement asks of a meter</h2>
          <p className="text-muted leading-7">
            Microamps show up when a product is supposed to be doing nothing: a microcontroller in deep sleep, a remote
            on standby, a sensor node between readings, or a car module that should have shut down. A meter has to put
            itself in series with that current, resolve it in fractions of a microamp, and avoid disturbing the circuit
            with its own voltage drop. Most general-purpose meters fall short on at least one of those, and some can&apos;t
            read below milliamps at all. Our step-by-step guides to{" "}
            <Link href="/multimeters/how-to-measure-microamps-with-a-multimeter" className={linkClass}>
              measuring microamps
            </Link>{" "}
            and{" "}
            <Link href="/multimeters/how-to-measure-standby-current-in-an-electronic-device" className={linkClass}>
              measuring standby current
            </Link>{" "}
            cover the hookup.
          </p>
          <p className="text-muted leading-7">
            This ranking puts the lowest current range, its resolution and the published burden voltage first, then
            logging, because a sleep-current problem rarely reveals itself in the ten seconds you spend watching a display.
            Every figure comes from the maker&apos;s spec tables or manual. If you&apos;re trying to find out why a board
            or appliance pulls more than it should, start with{" "}
            <Link href="/multimeters/circuit-drawing-too-much-current" className={linkClass}>
              a circuit drawing too much current
            </Link>
            ; for microcontroller boards, see{" "}
            <Link href="/multimeters/how-to-measure-current-consumption-of-an-arduino-with-a-multimeter" className={linkClass}>
              measuring an Arduino&apos;s current consumption
            </Link>
            .
          </p>
        </div>

        <Callout title="Current ranges and fuses">
          On a current range the meter is close to a short circuit. Never touch the leads across a battery, power supply
          or outlet while they sit in the µA/mA or A jack: the fuse will blow at best, and on mains a meter without proper
          high-breaking-capacity fuses can fail violently. Switch off, break the circuit, connect the meter in series, then
          power up. Move the red lead back to the voltage jack as soon as you finish.
        </Callout>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">Quick comparison</h2>
          <DataTable
            head={["#", "Meter", "Lowest µA range", "Finest µA step", "Burden (µA ranges)", "Best for"]}
            rows={comparisonRows}
            mono={[0]}
          />
          <p className="text-xs text-muted leading-5">
            &quot;Implied by counts&quot; means the maker lists the range and display counts but not the per-range
            resolution. The Fluke 87V&apos;s 0.01 µA figure applies in its 19,999-count HiRes mode.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">How the ten compare on paper</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Figure
              caption={
                <>
                  Voltage the meter drops at 100 µA, calculated from each maker&apos;s published burden per microamp.
                  Lower disturbs the circuit less. The other five meters don&apos;t publish a figure.
                </>
              }
            >
              <BarChart
                items={[
                  { label: "Fluke 87V", value: 10, display: "10 mV", highlight: true },
                  { label: "Brymen BM235", value: 10, display: "10 mV", highlight: true },
                  { label: "Fluke 287", value: 10.2, display: "10.2 mV" },
                  { label: "Fluke 289", value: 10.2, display: "10.2 mV" },
                  { label: "EEVblog Brymen BM786", value: 20, display: "20 mV" },
                ]}
              />
            </Figure>
            <Figure caption={<>Maximum display counts. The Fluke 87V reads 6,000 counts normally and 19,999 in HiRes mode.</>}>
              <BarChart
                items={[
                  { label: "EEVblog Brymen BM786", value: 60000, display: "60,000", highlight: true },
                  { label: "UNI-T UT181A", value: 60000, display: "60,000", highlight: true },
                  { label: "Fluke 287", value: 50000, display: "50,000" },
                  { label: "Fluke 289", value: 50000, display: "50,000" },
                  { label: "UNI-T UT61E+", value: 22000, display: "22,000" },
                  { label: "OWON B41T+", value: 22000, display: "22,000" },
                  { label: "KAIWEETS HT118E", value: 20000, display: "20,000" },
                  { label: "OWON OW18E", value: 19999, display: "19,999" },
                  { label: "Fluke 87V", value: 19999, display: "19,999 (HiRes)" },
                  { label: "Brymen BM235", value: 6000, display: "6,000" },
                ]}
              />
            </Figure>
          </div>
          <Figure
            caption={
              <>
                Full scale of each meter&apos;s lowest current range. A smaller range gives finer steps at the same count;
                a larger one leaves more room before a wake-up surge forces a range change.
              </>
            }
          >
            <BarChart
              items={[
                { label: "Fluke 87V", value: 600, display: "600 µA" },
                { label: "EEVblog Brymen BM786", value: 600, display: "600 µA" },
                { label: "UNI-T UT181A", value: 600, display: "600 µA" },
                { label: "Brymen BM235", value: 600, display: "600 µA" },
                { label: "Fluke 287", value: 500, display: "500 µA" },
                { label: "Fluke 289", value: 500, display: "500 µA" },
                { label: "UNI-T UT61E+", value: 220, display: "220 µA" },
                { label: "OWON B41T+", value: 220, display: "220 µA" },
                { label: "OWON OW18E", value: 200, display: "200 µA", highlight: true },
                { label: "KAIWEETS HT118E", value: 200, display: "200 µA", highlight: true },
              ]}
            />
          </Figure>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">What to look for in a microamp meter</h2>
          <InfoCards items={lookFor} />
          <KeyIdea title="Burden voltage in practice">
            A burden of 100 µV/µA sounds tiny, and at 5 µA it is: half a millivolt. But if the device wakes and pulls
            2 mA while the meter is still on its µA range, the same shunt would want to drop 200 mV, enough to brown out a
            1.8 V or 3.3 V part. That&apos;s why careful microamp work uses a bypass switch, and why a published burden
            figure is worth more than another digit of resolution. For more on reading accuracy specs, see{" "}
            <Link href="/multimeters/multimeter-accuracy-for-electronics-repair" className={linkClass}>
              multimeter accuracy for electronics repair
            </Link>
            ; for car standby drain, which usually sits in milliamps, see{" "}
            <Link href="/multimeters/how-to-measure-parasitic-battery-drain" className={linkClass}>
              measuring parasitic battery drain
            </Link>
            .
          </KeyIdea>
        </div>
      </section>

      <ReviewArticle
        picks={picks}
        faqs={faqs}
        howWeChose="We ranked these ten for microamp work: the smallest current range and its resolution first, then the burden voltage the maker publishes, then logging and PC links for long sleep-current runs. Figures come from maker spec tables, manuals and official listings; this is desk research, and only the Fluke 87V carries our Hands-on Tested badge."
        fitNotes={fitNotes}
        advice={advice}
      />
      <ContentLinks category="multimeters" current="/multimeters/best-multimeters-for-measuring-microamps" />
    </>
  );
}
