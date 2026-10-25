import Link from "next/link";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  StepHeading,
} from "@/components/HowTo";
import { buildMetadata } from "@/lib/metadata";
import { picks } from "../best-soldering-irons/page";

const description =
  "Why does my soldering iron take too long to heat up? Compare against the maker's figure, then check the supply, tip, element type, settings and the element itself.";

export const metadata = buildMetadata({
  title: "Why Is My Soldering Iron Slow to Heat Up?",
  description,
  path: "/soldering-irons/why-does-my-soldering-iron-take-too-long-to-heat-up",
});

const pick = (name: string) => picks.find((p) => p.name === name)!;
const heatUp = (name: string) => pick(name).specs.find((s) => s.label === "Heat-up time")!.value;
const pinecil = pick("Pinecil V2");

// Heat-up figures as each maker or official listing states them (see the Pick data);
// the bars show the stated seconds; the table under the chart gives each full
// stated figure with its conditions, read straight from the Pick.
const STATED = [
  { name: "Pinecil V2", seconds: 12, short: "~12 s" },
  { name: "Q-MING 60W Kit", seconds: 15, short: "~15 s" },
  { name: "Weller WE1010NA", seconds: 28, short: "~28 s" },
  { name: "X-Tronic 3020-XTS", seconds: 30, short: "under 30 s" },
];

const link = "text-accent hover:underline";

export default function WhyDoesMySolderingIronTakeTooLongToHeatUpPage() {
  return (
    <HowToShell
      title="Why Does My Soldering Iron Take Too Long to Heat Up?"
      description={description}
      path="/soldering-irons/why-does-my-soldering-iron-take-too-long-to-heat-up"
      category="soldering-irons"
      published="2026-10-25"
      intro={
        <>
          Waiting a minute or more for an iron that its maker says reaches temperature in seconds is
          usually a sign of something specific: a supply that can&apos;t deliver full power, a tip that
          isn&apos;t passing heat along, a setting, or an element on its way out. Before chasing any of
          those, though, check what &ldquo;normal&rdquo; is for your iron, because heat-up times vary
          widely by design.
        </>
      }
      aside={{
        image: pinecil.image,
        alt: "Pinecil V2 portable soldering iron",
        caption: (
          <>
            Pine64 states a heat-up time for the Pinecil V2 only with a 20V or higher supply. See our{" "}
            <Link href="/soldering-irons/pinecil-v2-review" className={link}>
              Pinecil V2 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "whats-normal", label: "What counts as slow" },
        { id: "supply", label: "1. The supply can't deliver full power" },
        { id: "tip", label: "2. A heavy, loose or oxidised tip" },
        { id: "element", label: "3. The element design" },
        { id: "settings", label: "4. Settings that look like slow heating" },
        { id: "failing", label: "5. A failing element or sensor" },
        { id: "quick-reference", label: "Quick reference" },
      ]}
      faq={[
        {
          q: "How long should a soldering iron take to heat up?",
          a: "Use your own iron's published figure, measured the way the maker measured it. Among the irons in our comparison, stated figures run from a few seconds to about half a minute, each measured under its own conditions (supply voltage, start and end temperature). Several makers, including Hakko for the FX-888DX, don't publish a figure at all.",
        },
        {
          q: "Why does my USB-C iron heat quickly on one charger and slowly on another?",
          a: "The iron can only draw what the charger and cable negotiate. A charger that offers a lower voltage, or a cable that limits current, gives the iron less power, so it heats more slowly and sags more on joints. Portable irons often state their fastest heat-up time only for a particular supply.",
        },
        {
          q: "The display says it's at temperature but the tip won't melt solder. Is that slow heating?",
          a: "Usually not. The display reads a sensor behind the end of the tip. If the very end is oxidised or the tip isn't seated properly, the sensor reaches the setpoint while the working surface stays too cool to melt solder. Clean and re-tin the tip and check it is fully seated before suspecting the element.",
        },
        {
          q: "Does a higher-wattage iron always heat up faster?",
          a: "Not always. Wattage sets how much power is available, but heat-up time also depends on how close the element sits to the tip, how much metal the tip has and how the controller manages power. Compare the stated heat-up figures rather than wattage alone.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/why-does-my-soldering-iron-temperature-keep-dropping",
          title: "Why Does My Soldering Iron Temperature Keep Dropping?",
          desc: "Heats up fine, then sags on every joint: the recovery problem.",
        },
        {
          href: "/soldering-irons/how-to-test-a-soldering-iron",
          title: "How to Test a Soldering Iron",
          desc: "The unplugged resistance check and a timed heat-up test.",
        },
      ]}
    >
      <section>
        <h2 id="whats-normal" className="text-xl font-semibold mb-3">What counts as slow</h2>
        <p className="text-muted leading-7 mb-4">
          Heat-up time is only meaningful against your own iron&apos;s figure, measured under the same
          conditions. Makers state it differently: some to a working temperature, some over a stated range,
          some only with a particular supply. Here is what the makers of the irons in our comparison state:
        </p>
        <Figure
          caption={
            <>
              Heat-up times as stated by each maker or its official listing, with their conditions. They
              aren&apos;t measured the same way, so treat this as a sense of scale rather than a ranking.
              Hakko, for one, doesn&apos;t publish a figure for the FX-888DX.
            </>
          }
        >
          <BarChart
            items={STATED.map((s) => ({ label: s.name, value: s.seconds, display: s.short, highlight: s.name === "Pinecil V2" }))}
          />
        </Figure>
        <div className="mt-4">
          <DataTable
            head={["Iron", "Heat-up time as stated, with conditions"]}
            rows={STATED.map((s) => [s.name, heatUp(s.name)])}
          />
        </div>
        <p className="text-muted leading-7 mt-4">
          Time your iron from cold with a clock, using the same supply and setpoint each time. If it is
          close to the maker&apos;s figure, nothing is wrong. If it takes several times longer, or
          noticeably longer than it used to, work through the causes below.
        </p>
      </section>

      <section>
        <StepHeading n={1} id="supply">The supply can&apos;t deliver full power</StepHeading>
        <p className="text-muted leading-7">
          This is the most common cause with USB-C and DC-powered irons. They can only draw what the supply
          offers. Pine64 states the Pinecil V2&apos;s heat-up time as &ldquo;{heatUp("Pinecil V2")}&rdquo;,
          so a charger that negotiates a lower voltage gives a slower start. A phone charger, a laptop
          charger that doesn&apos;t offer the higher Power Delivery voltages, or a thin cable can all hold
          an iron back. Try the supply the maker recommends. If the iron is fast on that, the original
          supply was the cause. Our guide to{" "}
          <Link href="/multimeters/usb-c-charger-not-delivering-full-power" className={link}>
            USB-C chargers that don&apos;t deliver full power
          </Link>{" "}
          explains how to check what is actually being supplied.
        </p>
      </section>

      <section>
        <StepHeading n={2} id="tip">A heavy, loose or oxidised tip</StepHeading>
        <p className="text-muted leading-7">
          The element has to heat the tip as well as itself, so a large chisel or heavy bent tip takes
          longer to come up to temperature than a fine one on the same iron. That is normal. What isn&apos;t
          normal is a tip that isn&apos;t pushed fully home or held firmly, since heat crosses the joint
          between element and tip poorly when they don&apos;t make good contact. Check the tip is seated as
          the manual describes. An oxidised tip also feels &ldquo;slow&rdquo; even when the iron is at
          temperature, because solder won&apos;t wet it. Cleaning and re-tinning, covered in our{" "}
          <Link href="/soldering-irons/soldering-iron-tip-care" className={link}>
            tip care guide
          </Link>
          , sorts that out.
        </p>
      </section>

      <section>
        <StepHeading n={3} id="element">The element design</StepHeading>
        <p className="text-muted leading-7">
          Some irons are simply slow by design. Basic plug-in irons that heat a separate tip from a
          wire-wound element behind it generally take longer to warm up than irons that build the element
          and sensor close to the tip. If your iron has always taken a long time, that is probably its
          design rather than a fault. Our comparison of{" "}
          <Link href="/soldering-irons/ceramic-vs-nichrome-heating-element" className={link}>
            ceramic and nichrome heating elements
          </Link>{" "}
          explains the difference.
        </p>
      </section>

      <section>
        <StepHeading n={4} id="settings">Settings that look like slow heating</StepHeading>
        <p className="text-muted leading-7">
          Before blaming the hardware, check the setpoint. An iron set lower than you think, or set in
          Fahrenheit when you meant Celsius, will reach its target and then not melt solder properly. On
          irons with a sleep or standby mode, picking the iron up after it has dropped to standby means
          waiting for it to climb back, which can feel like a slow start. Some stations also offer a boost
          or power setting worth checking in the manual.
        </p>
      </section>

      <section>
        <StepHeading n={5} id="failing">A failing element or sensor</StepHeading>
        <p className="text-muted leading-7">
          An iron that used to heat quickly and has gradually slowed down, never reaches the setpoint, or
          heats in fits and starts may have a failing element, sensor or handle cable. With the iron
          unplugged and cool, measure the element&apos;s resistance and compare it with the figure in the
          manual. Our guide to{" "}
          <Link href="/soldering-irons/how-to-test-a-soldering-iron" className={link}>
            testing a soldering iron
          </Link>{" "}
          walks through that check and a timed heat-up test.
        </p>
        <Callout title="Test unplugged, and let it cool">
          Only measure an iron&apos;s element with the plug pulled and the tip cool. Stop using any iron
          with a damaged cable or cracked handle rather than testing it powered.
        </Callout>
      </section>

      <section>
        <h2 id="quick-reference" className="text-xl font-semibold mb-3">Quick reference</h2>
        <DataTable
          head={["What you see", "Likely cause", "What to do"]}
          rows={[
            ["USB-C or DC iron slow on one supply only", "Supply gives less power", "Use a supply and cable that meet the iron's input rating"],
            ["Slower with a big tip than a small one", "More metal to heat", "Normal; use the smaller tip when you can"],
            ["Display at setpoint, solder won't melt", "Oxidised or badly seated tip", "Clean, re-tin and reseat the tip"],
            ["Always slow since new", "Element design", "Compare with the maker's figure; consider a faster iron"],
            ["Slow only after resting", "Standby mode", "Check the sleep setting"],
            ["Got slower over time, or erratic", "Failing element, sensor or cable", "Resistance check with the iron unplugged"],
          ]}
        />
        <KeyIdea title="Same iron, different supply, different iron">
          For a portable iron, the supply is part of the tool. Most &ldquo;slow iron&rdquo; complaints about
          USB-C irons disappear on a charger that offers the voltage the maker quotes.
        </KeyIdea>
      </section>
    </HowToShell>
  );
}
