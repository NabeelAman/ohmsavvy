import Link from "@/components/AppLink";
import {
  BarChart,
  Callout,
  DataTable,
  Figure,
  HowToShell,
  KeyIdea,
  ProductStrip,
} from "@/components/HowTo";
import { getAllPicks } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

const description =
  "Most hobby electronics and general PCB work is comfortable at 40-65W. Wattage sets how fast an iron recovers heat, not how hot it gets — here's how to match it.";

export const metadata = buildMetadata({
  title: "What Wattage Soldering Iron Do I Need?",
  description,
  path: "/soldering-irons/what-wattage-soldering-iron-do-i-need",
});

const all = getAllPicks("soldering-irons");
const pick = (name: string) => all.find((p) => p.name === name)!;
const spec = (name: string, label: string) => pick(name).specs.find((s) => s.label === label)?.value ?? "Not stated";
const pinecil = pick("Pinecil V2");
const hakko888dx = pick("Hakko FX-888DX");
const yihua862 = pick("YIHUA 862BD+");

const link = "text-accent hover:underline";

export default function WhatWattageSolderingIronDoINeedPage() {
  return (
    <HowToShell
      title="What Wattage Soldering Iron Do I Need?"
      description={description}
      published="2026-11-06"
      updated="2026-11-06"
      path="/soldering-irons/what-wattage-soldering-iron-do-i-need"
      category="soldering-irons"
      intro={
        <>
          For most hobby electronics, general PCB work, and household repairs, an iron in the roughly 40-65W
          range is comfortable. Fine SMD and delicate circuit-board work can get by on less if the iron has good
          temperature control and a small tip; heavy connectors, thick wire, or anything with a large grounded
          copper area to heat benefits from more, sometimes 70W or above. Wattage itself doesn&apos;t set the
          maximum temperature an iron reaches — it sets how fast the iron can replace the heat a joint pulls
          away, which is what actually determines whether a tip holds its temperature under real work.
        </>
      }
      aside={{
        image: pinecil.image,
        alt: "Pinecil V2 portable soldering iron",
        caption: (
          <>
            Pine64 states two power figures for the Pinecil V2 depending on the supply. See our{" "}
            <Link href="/soldering-irons/pinecil-v2-review" className={link}>
              Pinecil V2 review
            </Link>
            .
          </>
        ),
      }}
      toc={[
        { id: "myth", label: "Wattage vs. temperature: the common mix-up" },
        { id: "by-task", label: "Wattage by the work you're doing" },
        { id: "recovery", label: "Why thermal recovery is what actually matters" },
        { id: "station-vs-iron", label: "Station wattage vs. iron wattage" },
        { id: "irons", label: "Irons at a glance" },
      ]}
      faq={[
        {
          q: "Does higher wattage mean a hotter soldering iron?",
          a: "Not directly. Wattage is the rate at which the element can produce heat, not the final temperature — that's set by the thermostat or digital setpoint. A 25W iron and a 100W iron can both be built to reach 350°C; the difference shows up when heat is being pulled away quickly, such as on a large joint, where the higher-wattage iron recovers back to temperature faster.",
        },
        {
          q: "Is a higher-wattage iron better for beginners?",
          a: "Not automatically — a simple, non-temperature-controlled high-wattage iron can run hot enough to damage small components or lift pads if left on a joint too long. For most beginners doing general electronics, a temperature-controlled iron in the 40-65W range is a better balance of safety margin and enough recovery for real work than chasing maximum wattage.",
        },
        {
          q: "What wattage do I need for SMD soldering?",
          a: "Fine SMD work is usually more about a small, precise tip and good temperature control than raw wattage — many stations in the 40-65W range handle SMD comfortably with the right tip. Very fine, low-thermal-mass joints can even be more forgiving on a lower-wattage iron, since there's less risk of overheating a tiny pad.",
        },
        {
          q: "What wattage do I need for thick wire or connectors?",
          a: "Heavier gauge wire and larger metal connectors pull heat away fast, so an iron with more wattage in reserve — commonly 70W and up for this kind of work — holds its temperature better than a lower-wattage iron asked to do the same joint. A joint that takes much longer than usual to flow solder is a sign the iron is losing the recovery race.",
        },
        {
          q: "Why does a soldering station list two wattage numbers?",
          a: "One number is usually the total power the station's base unit draws, which covers its display, controller, and power supply as well as the heating element; the other, smaller number is what the iron itself delivers as heat at the tip. Compare the iron wattage figure, not the station figure, when judging heating capability.",
        },
        {
          q: "Can I use a low-wattage iron for everything if I'm patient?",
          a: "For small, forgiving joints, yes. For anything with real thermal mass — a ground plane on a PCB, a thick wire, a large connector — a low-wattage iron may never fully reach the solder's melting point at the joint even given more time, because the joint is carrying heat away as fast as the iron can supply it. That's a wattage limitation, not a patience problem.",
        },
      ]}
      next={[
        {
          href: "/soldering-irons/why-does-my-soldering-iron-take-too-long-to-heat-up",
          title: "Why Does My Soldering Iron Take Too Long to Heat Up?",
          desc: "Stated heat-up times compared, and what slows an iron down.",
        },
        {
          href: "/soldering-irons/soldering-iron-buying-guide",
          title: "Soldering Iron Buying Guide",
          desc: "Wattage alongside temperature control, tip selection, and the rest.",
        },
      ]}
    >
      <section id="myth" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Wattage vs. temperature: the common mix-up</h2>
        <p className="text-muted leading-7 mb-4">
          Wattage describes a rate of heat delivery, not a temperature. A resistive heating element converts
          electrical power to heat continuously, and the iron&apos;s thermostat or digital controller decides when
          to cut that power off to hold a setpoint — which is why a 60W iron and a 25W iron can both be rated to
          the same maximum temperature on paper. The real-world difference appears only once heat starts leaving
          the tip faster than the element can replace it: that&apos;s when the lower-wattage iron&apos;s
          temperature actually sags, while the higher-wattage one holds steady.
        </p>
        <KeyIdea title="Wattage is a reserve, not a thermostat">
          Think of wattage as how big a heat &quot;tank&quot; the iron can refill from per second, not how hot
          the water in the tank gets. The setpoint controls temperature; wattage controls how well that
          temperature survives contact with a real joint.
        </KeyIdea>
      </section>

      <section id="by-task" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Wattage by the work you&apos;re doing</h2>
        <p className="text-muted leading-7 mb-4">
          These are general guidelines, not hard cutoffs — a well-designed low-wattage station with a good tip
          can outperform a poorly designed higher-wattage iron on the same joint. Still, as a starting point for
          matching an iron to the work:
        </p>
        <DataTable
          head={["Typical work", "Rough wattage guideline", "Why"]}
          rows={[
            ["Fine SMD, small PCB pads", "15–40W", "Low thermal mass; small tips transfer heat efficiently at lower power"],
            ["General hobby electronics, through-hole PCBs", "40–65W", "Covers most joints without excess heat risk to components"],
            ["Larger connectors, ground planes, moderate wire gauge", "60–80W", "More reserve to counter faster heat loss into the joint"],
            ["Heavy wire, large terminals, high-thermal-mass joints", "80W and up", "Needed to reach and hold melting temperature before the joint pulls heat away faster than it arrives"],
          ]}
        />
      </section>

      <section id="recovery" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Why thermal recovery is what actually matters</h2>
        <p className="text-muted leading-7 mb-4">
          Touch a cold joint with a hot tip and the tip&apos;s temperature dips immediately as heat flows into the
          metal around it — exactly like touching a hot pan to a cold burner briefly lowers the burner&apos;s
          surface temperature. A higher-wattage element pours heat back in faster, so the dip is smaller and
          shorter. An underpowered iron on a large joint can stay in that dip indefinitely, never reaching
          solder&apos;s melting point at the joint even though the display still shows the setpoint — the
          classic case covered in{" "}
          <Link href="/soldering-irons/soldering-iron-not-melting-solder" className={link}>
            soldering iron not melting solder
          </Link>
          .
        </p>
        <Figure caption="Comparing stated power across a few irons in our comparison. Higher numbers mean more heat reserve, not a higher maximum temperature.">
          <BarChart
            items={[
              { label: "Q-MING 60W Kit", value: 60, display: "60W" },
              { label: "Pinecil V2 (USB-C PD)", value: 60, display: "~60W" },
              { label: "X-Tronic 3020-XTS (iron)", value: 60, display: "60W" },
              { label: "Weller WE1010NA (iron)", value: 70, display: "70W", highlight: true },
              { label: "YIHUA 862BD+ (iron)", value: 75, display: "75W" },
              { label: "Pinecil V2 (24V DC max)", value: 88, display: "up to 88W" },
            ]}
          />
        </Figure>
        <p className="text-muted leading-7 mt-4">
          Figures are each maker&apos;s or official listing&apos;s own stated power, measured under their own
          conditions — the Pinecil V2&apos;s two figures above reflect the same iron on two different supplies,
          which is also why a USB-C iron&apos;s effective wattage depends on the charger it&apos;s plugged into,
          not just the iron itself.
        </p>
      </section>

      <section id="station-vs-iron" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Station wattage vs. iron wattage</h2>
        <p className="text-muted leading-7 mb-4">
          Bench stations often publish two different wattage figures, and it&apos;s easy to compare the wrong
          one. The larger number is usually the station&apos;s total power draw, which includes its display,
          temperature controller, and internal power supply in addition to the heating element; the smaller
          number is what the handpiece itself delivers as heat. The Hakko FX-888DX, for example, is listed as a{" "}
          {spec("Hakko FX-888DX", "Power")} — the 65W iron figure is the one that actually determines its
          recovery against a joint, not the 100W station figure.
        </p>
        <DataTable
          head={["Station", "Stated power"]}
          rows={[
            ["Hakko FX-888DX", spec("Hakko FX-888DX", "Power")],
            ["Weller WE1010NA", spec("Weller WE1010NA", "Power")],
          ]}
        />
      </section>

      <section id="irons" className="scroll-mt-28">
        <h2 className="text-xl font-semibold mb-3">Irons at a glance</h2>
        <p className="text-muted leading-7 mb-5">
          These picks span the lower and higher ends of the range discussed above. For the broader set of specs
          to compare beyond wattage, see the{" "}
          <Link href="/soldering-irons/soldering-iron-buying-guide" className={link}>
            soldering iron buying guide
          </Link>
          .
        </p>
        <ProductStrip
          title="Irons at different wattage levels"
          items={[
            {
              name: "Pinecil V2",
              image: pinecil.image,
              alt: "Pinecil V2 portable USB-C soldering iron",
              href: "/soldering-irons/pinecil-v2-review",
              note: `Up to ${spec("Pinecil V2", "Power")}, scaling with the supply you use.`,
            },
            {
              name: "Hakko FX-888DX",
              image: hakko888dx.image,
              alt: "Hakko FX-888DX soldering station",
              href: "/soldering-irons/hakko-fx888d-review",
              note: `${spec("Hakko FX-888DX", "Power")}, a common choice for general hobby and repair work.`,
            },
            {
              name: "YIHUA 862BD+",
              image: yihua862.image,
              alt: "YIHUA 862BD+ hot air rework station",
              href: "/soldering-irons/best-soldering-iron-for-circuit-board-repair",
              note: `${spec("YIHUA 862BD+", "Power")}, extra reserve for rework alongside general soldering.`,
            },
          ]}
        />
      </section>

      <Callout title="More wattage isn't automatically safer">
        A high-wattage, non-temperature-controlled iron left resting on a small component or thin PCB trace can
        overheat and damage it quickly. Match wattage to the work, and prefer an iron with real temperature
        control once you&apos;re doing more than occasional simple joints.
      </Callout>
    </HowToShell>
  );
}
