import Link from "next/link";
import { CategoryHub } from "@/components/CategoryHub";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Soldering Iron Reviews, Comparisons & Guides",
  description:
    "Choose a soldering iron: ranked stations and portables, in-depth reviews, head-to-head comparisons and step-by-step soldering and troubleshooting guides.",
  path: "/soldering-irons",
});

const link = "text-accent hover:underline";

export default function SolderingIronsHubPage() {
  return (
    <CategoryHub
      category="soldering-irons"
      path="/soldering-irons"
      heading="Soldering Irons: Reviews, Comparisons and Buying Guides"
      intro={[
        <>
          A good soldering iron holds its set temperature when the tip touches a joint, heats up quickly and takes tips you can
          still buy years from now. Those three things matter more than peak wattage, and they separate a station that makes
          soldering easy from one that fights you on every joint.
        </>,
        <>
          Start with our{" "}
          <Link href="/soldering-irons/best-soldering-irons" className={link}>
            ranked list of the best soldering irons
          </Link>
          , pick by job (electronics, beginners, portable work), compare two stations head to head, or use the troubleshooting
          guides when solder won&apos;t flow or a tip stops wetting.
        </>,
      ]}
      criteria={[
        {
          title: "Temperature control and recovery",
          body: "Closed-loop temperature control measures the tip and adds heat as the joint draws it away. Recovery, how quickly the tip returns to temperature on a big joint, matters more than the number on the box, and it's why a well-designed station can outperform a cheap iron with a higher wattage label.",
        },
        {
          title: "Power for the joints you solder",
          body: "Small through-hole and SMD work needs little power; ground planes, thick wire and connectors draw heat away fast. More available power, delivered through a tip with good thermal coupling, lets you solder big joints at a normal temperature instead of turning the iron up and cooking parts.",
        },
        {
          title: "Tips you can buy and replace",
          body: "Tips wear out, so the tip ecosystem matters as much as the iron. Check that the iron uses a standard, widely sold tip series in the shapes you need: a chisel for general work, a fine conical for SMD, and a larger bevel or chisel for heavy joints.",
        },
        {
          title: "Station, pen or portable",
          body: "Bench stations give the steadiest temperature and a proper stand. Pen-style USB-C irons are compact and fast to heat but depend on the power supply behind them. Cordless and butane irons suit field repairs where there is no outlet nearby.",
        },
        {
          title: "Safety and ESD features",
          body: "A heavy stand that holds the iron securely, auto-sleep after inactivity and a grounded, ESD-safe tip all matter on a real bench. ESD-safe designs protect sensitive chips, and sleep modes also extend tip life.",
        },
        {
          title: "Consumables that make it work",
          body: "The iron is only part of the job: flux, the right solder alloy and diameter, brass wool for cleaning and tip tinner for recovery make a bigger difference to joint quality than most people expect.",
        },
      ]}
      faqs={[
        {
          q: "What wattage soldering iron do I need for electronics?",
          a: "For hobby electronics, a temperature-controlled iron in the 40 to 70 watt range handles through-hole parts, SMD work and most wire joints comfortably. Wattage alone doesn't decide performance: a well-regulated iron with good tip contact recovers faster than a cheap, unregulated iron with a higher rating. Heavy connectors and ground planes benefit from more power.",
        },
        {
          q: "What temperature should I solder electronics at?",
          a: "A common starting point is roughly 320 to 350 °C for tin-lead solder and 350 to 380 °C for lead-free alloys, which melt at higher temperatures. Use the lowest setting that makes the joint flow within about two to three seconds; if it takes longer, use a larger tip or more power rather than simply turning the temperature up.",
        },
        {
          q: "Is a soldering station better than a soldering pen?",
          a: "A station usually holds temperature more steadily, offers a proper stand and accepts a wide range of tips, which suits a home bench. A USB-C pen heats very quickly and travels well, but its performance depends on the power supply you plug it into. Many people use a station at the bench and a pen for repairs away from it.",
        },
        {
          q: "Should I use leaded or lead-free solder?",
          a: "Tin-lead solder melts at a lower temperature and flows easily, which makes it forgiving for beginners and repair work. Lead-free solder is required in many commercial products and is safer to keep around children. Either works if your iron reaches the right temperature. Wash your hands after handling leaded solder and never eat at the bench.",
        },
        {
          q: "Why does my soldering iron tip stop working?",
          a: "Most tips fail from oxidation: the tip sits hot without a protective coat of solder, turns dark and stops wetting. Running too hot, wiping on a dry sponge and filing the plating speed it up. Keep the tip tinned between joints, use brass wool, and recover a dull tip with tip tinner. Our tip care guide covers it step by step.",
        },
        {
          q: "What should I look for in a first soldering iron?",
          a: "Look for real temperature control, a decent stand and tips you can replace. An unregulated iron that runs too hot burns tips and parts and makes good joints harder. Our best soldering irons for beginners and roundup pages list verified options at different levels, and each review explains who the iron suits.",
        },
      ]}
    />
  );
}
