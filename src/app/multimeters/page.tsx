import Link from "next/link";
import { CategoryHub } from "@/components/CategoryHub";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Multimeter Reviews, Comparisons & Guides",
  description:
    "Find the right multimeter: ranked picks, in-depth reviews, head-to-head comparisons and step-by-step guides to measuring voltage, current and resistance safely.",
  path: "/multimeters",
});

const link = "text-accent hover:underline";

export default function MultimetersHubPage() {
  return (
    <CategoryHub
      category="multimeters"
      path="/multimeters"
      heading="Multimeters: Reviews, Comparisons and Buying Guides"
      intro={[
        <>
          The right multimeter is the one rated for where you measure and able to read what you measure: a CAT III or CAT IV
          safety rating for household panels, True RMS for modern AC loads, and the current and temperature ranges your work
          needs. Everything below is checked against the maker&apos;s own specifications.
        </>,
        <>
          Start with our{" "}
          <Link href="/multimeters/best-multimeters" className={link}>
            ranked list of the best multimeters
          </Link>
          , narrow it down by job (electricians, HVAC, automotive, electronics), settle a close call with a head-to-head
          comparison, or use the troubleshooting guides when a reading doesn&apos;t make sense.
        </>,
      ]}
      criteria={[
        {
          title: "Safety rating that matches the job",
          body: "IEC 61010 measurement categories tell you where a meter is safe to use: CAT II for plug-in appliances, CAT III for panels, fixed wiring and hardwired equipment, CAT IV at the service entrance and meter. The voltage beside the category matters too, so CAT III 600 V or better is the sensible floor for household mains work.",
        },
        {
          title: "True RMS for modern AC loads",
          body: "An average-responding meter is only accurate on clean sine waves. Variable-speed drives, LED drivers, dimmers and switching supplies distort the waveform, and a non-True RMS meter can read them noticeably wrong. If you work on anything beyond batteries and simple circuits, buy True RMS.",
        },
        {
          title: "The ranges you'll actually use",
          body: "Check the functions against your work: microamp ranges for flame sensors and sleep current, a 10 A current input for automotive and appliance loads, capacitance and temperature for HVAC, LoZ mode to rule out ghost voltage, and frequency or duty cycle for electronics and controls.",
        },
        {
          title: "Resolution and accuracy",
          body: "Display count sets resolution: a 6,000-count meter shows 5.999 V where a 2,000-count meter shows 5.99 V. Basic DC accuracy, quoted as ±(% of reading + digits), tells you how close that number is to the truth. Most field work is fine at 0.5%; calibration and precision electronics need 0.1% or better.",
        },
        {
          title: "Build, fusing and everyday usability",
          body: "Look for high-energy current fuses rated for the meter's category, a sturdy case and holster, auto-ranging, a backlight for dark panels, and good leads. Meters from makers that publish full specifications and independent safety certification are easier to trust when it matters.",
        },
        {
          title: "Multimeter, clamp meter or both",
          body: "A multimeter measures current by breaking the circuit; a clamp meter reads it around a conductor without disconnecting anything. Electricians and HVAC techs often carry both, while electronics and automotive work rarely needs a clamp.",
        },
      ]}
      faqs={[
        {
          q: "What is the best multimeter for a beginner?",
          a: "An auto-ranging True RMS meter with a CAT III 600 V rating, a continuity beeper and a backlight covers almost everything a beginner meets, from batteries to outlets. Avoid meters without a published safety rating for any mains work. Our best multimeter for beginners guide ranks verified picks, and the How to Use a Multimeter guide walks through a first session.",
        },
        {
          q: "Do I really need a True RMS multimeter?",
          a: "For batteries, car electrics and simple DC circuits, no. For AC that isn't a clean sine wave, yes: variable-speed motors, LED lighting, dimmers and switching power supplies can make an average-responding meter read well off. True RMS is now common even on mid-priced meters, so it's rarely worth skipping if you work on mains equipment.",
        },
        {
          q: "What CAT rating do I need for household wiring?",
          a: "CAT III is the rating for building wiring: breaker panels, fixed outlets, hardwired appliances and lighting circuits. CAT II covers only equipment that plugs into an outlet. CAT IV is for the service entrance and utility side. Pick a meter rated CAT III 600 V or higher, and make sure the test leads carry at least the same rating.",
        },
        {
          q: "What does the count on a multimeter mean?",
          a: "The count is the highest number the display can show before switching range. A 6,000-count meter reads up to 5.999 on its 6 V range, while a 2,000-count meter tops out at 1.999 and must jump to a coarser range sooner. Higher counts give finer resolution, but accuracy still depends on the meter's stated specification.",
        },
        {
          q: "How can I tell if my multimeter is reading accurately?",
          a: "Measure a known reference, such as a precision voltage reference or a fresh battery checked on a trusted meter, and compare the result against your meter's stated accuracy. Also check the test leads: a lead resistance well above a fraction of an ohm, or readings that jump when you flex the leads, point to worn leads rather than the meter.",
        },
        {
          q: "Should I buy a multimeter or a clamp meter?",
          a: "Buy a multimeter first if you work on electronics, cars or small appliances: it measures voltage, resistance and small currents precisely. Choose a clamp meter, or add one, if you regularly measure motor, HVAC or circuit currents of several amps, because it reads current without breaking the circuit. Our clamp meter buying guide explains the trade-offs.",
        },
      ]}
    />
  );
}
