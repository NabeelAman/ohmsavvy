import type { Pick } from "@/components/ReviewArticle";

// Multimeters verified for the use-case "Top 10" guides but not shown on the
// curated /multimeters/best-multimeters roundup. Same rules as every Pick: specs
// per the maker or the official Amazon listing (see each "Specs per" comment),
// photo checked against the exact ASIN, Amazon-buyable when added, rating 4.7
// or lower unless the owner has hands-on tested it. Looked up through
// src/lib/catalog.ts, so guides, cards and product strips find these by name.
export const multimeterCatalogPicks: Pick[] = [
  {
    badge: "Best for Low Resistance",
    // Specs per fluke.com (Fluke 289 page), the 289 datasheet and the 287/289 Users Manual spec tables. Photo: Amazon main image of B0012B51HI, shows "289 TRUE RMS MULTIMETER" and the LoΩ 50Ω dial position. Amazon-buyable 2026-10-24.
    name: "Fluke 289",
    image: "https://m.media-amazon.com/images/I/71LKJXNQ5CL._SL1500_.jpg",
    rating: 4.7,
    bottomLine: "The only handheld here with a 50 Ω range at 1 mΩ resolution, plus 0.01 µA current resolution and on-screen trend logging.",
    verdict:
      "The Fluke 289 is a 50,000-count True RMS logging meter rated CAT IV 600V / CAT III 1000V. Its two-terminal 50 Ω range resolves 1 mΩ using a 10 mA test current, and relative mode removes test-lead resistance, so you can check shunts, contacts and PCB traces without a separate milliohm meter. The 500 µA range resolves 0.01 µA with a published burden of about 102 µV per µA. TrendCapture graphs logged readings on the meter itself, and LoZ and a low-pass filter cover electrical work too. The catch is the price, roughly three times a good hobby meter.",
    specs: [
      { label: "Accuracy", value: "True RMS, 0.025% basic DC V" },
      { label: "Safety rating", value: "CAT IV 600V / CAT III 1000V" },
      { label: "Auto-ranging", value: "Yes (manual override)" },
      { label: "Best for", value: "Low-ohm, µA and logged electronics work" },
    ],
    pros: ["50 Ω range with 1 mΩ resolution and REL lead zeroing", "500 µA range with 0.01 µA resolution and published burden voltage", "Logs and graphs readings on screen (TrendCapture)"],
    cons: ["Expensive, and sold here by a third-party seller", "Two-terminal low-ohm range, not true 4-wire Kelvin"],
    ctaHref: "https://www.amazon.com/dp/B0012B51HI?tag=ohmsavvy-20",
  },
  {
    badge: "Best Logging Meter for Electronics",
    // Specs per fluke.com (Fluke 287 page), the 287 datasheet and the 287/289 Users Manual. The Amazon listing's "Category I/II" wording conflicts with Fluke's CAT IV 600V / CAT III 1000V; we use Fluke. Photo: Amazon main image of B0015PMU8E, shows "287 TRUE RMS MULTIMETER". Amazon-buyable 2026-10-24.
    name: "Fluke 287",
    image: "https://m.media-amazon.com/images/I/71P9-kdt0QL._SL1500_.jpg",
    rating: 4.6,
    bottomLine: "Fluke's electronics logging meter: 50,000 counts, 0.01 µA resolution and graphs on the meter, without the 289's industrial extras.",
    verdict:
      "The 287 shares the 289's 50,000-count display, 500 µA range with 0.01 µA resolution, 100 mF capacitance and TrendCapture logging, and it carries the same CAT IV 600V / CAT III 1000V rating. It drops the 289's 50 Ω low-ohm range, LoZ and low-pass filter, so its finest resistance resolution is 0.01 Ω on the 500 Ω range (with relative mode to zero the leads). For bench electronics, sleep-current checks and logging a drifting supply overnight, it does the job for less than the 289.",
    specs: [
      { label: "Accuracy", value: "True RMS, 0.025% basic DC V" },
      { label: "Safety rating", value: "CAT IV 600V / CAT III 1000V" },
      { label: "Auto-ranging", value: "Yes (manual override)" },
      { label: "Best for", value: "Electronics design, µA and logging" },
    ],
    pros: ["0.01 µA resolution on the 500 µA range", "On-screen trend logging with real-time clock", "Limited lifetime warranty"],
    cons: ["No 50 Ω low-ohm range (that's the 289)", "Third-party seller and an Amazon listing with wrong CAT wording"],
    ctaHref: "https://www.amazon.com/dp/B0015PMU8E?tag=ohmsavvy-20",
  },
  {
    badge: "Best Brymen for Electronics",
    // Specs per the Brymen BM786 user manual (hosted by EEVblog, linked from eevblog.store). brymen.com has no BM786 page; this is the EEVblog-exclusive model. Photo: Amazon main image of B08N61LF4Z, shows "BRYMEN BM786 ... EEVBlog". Amazon-buyable 2026-10-24.
    name: "EEVblog Brymen BM786",
    image: "https://m.media-amazon.com/images/I/8141kUMRO1L._SL1500_.jpg",
    rating: 4.6,
    bottomLine: "A 60,000-count Brymen with 0.01 µA and 0.01 Ω resolution and CAT IV 600V, for about a third of a Fluke 287.",
    verdict:
      "The BM786 is a Brymen meter made for the EEVblog: AC+DC True RMS, 60,000 counts, CAT III 1000V / CAT IV 600V, and 0.03% best DC voltage accuracy. Its 600.00 µA range resolves 0.01 µA at ±(0.075%+20 digits), and its 600.00 Ω range resolves 0.01 Ω. Brymen publishes a burden of 0.2 mV per µA, twice the BM235's, so in very low-voltage circuits it drops more voltage than you may expect. The BeepLit continuity responds in under 100 µs. It has no logging or PC link, but for hands-on bench work and PCB repair it's a strong all-rounder.",
    specs: [
      { label: "Accuracy", value: "AC+DC True RMS, 0.03% DC V" },
      { label: "Safety rating", value: "CAT III 1000V / CAT IV 600V" },
      { label: "Auto-ranging", value: "Yes (manual override)" },
      { label: "Best for", value: "Bench electronics and PCB repair" },
    ],
    pros: ["0.01 µA and 0.01 Ω resolution at 60,000 counts", "Fast latching BeepLit continuity (<100 µs)", "Relative zero, Max/Min/Avg and crest capture"],
    cons: ["0.2 mV/µA burden is higher than the BM235's", "No data logging or PC connection"],
    ctaHref: "https://www.amazon.com/dp/B08N61LF4Z?tag=ohmsavvy-20",
  },
  {
    badge: "Best Under $100 for Electronics",
    // Specs per meters.uni-trend.com (UT61+ series page) and the UT61B+/D+/E+ user manual. Photo: Amazon main image of B093BS9MYM, shows "UT61E+ ... 22000 Counts". Amazon-buyable 2026-10-24.
    name: "UNI-T UT61E+",
    image: "https://m.media-amazon.com/images/I/61p7ga5bJnL._SL1500_.jpg",
    rating: 4.5,
    bottomLine: "A 22,000-count True RMS meter under $100 with 0.01 µA and 0.01 Ω resolution, REL mode and a USB link.",
    verdict:
      "The UT61E+ is UNI-T's 22,000-count version of the UT61+ series: True RMS, CAT III 1000V / CAT IV 600V, with a 220.00 µA range at 0.01 µA resolution and a 220.00 Ω range at 0.01 Ω (±0.5% + 10 digits). REL mode subtracts lead resistance, which UNI-T's manual tells you to do for low-ohm readings. It also adds capacitance to 220 mF, frequency to 220 MHz, hFE, NCV and a USB cable for PC readout. It has no temperature function (that's the UT61D+), and UNI-T doesn't publish its burden voltage.",
    specs: [
      { label: "Accuracy", value: "True RMS, ±(0.05%+5) DC V" },
      { label: "Safety rating", value: "CAT III 1000V / CAT IV 600V" },
      { label: "Auto-ranging", value: "Yes (manual override)" },
      { label: "Best for", value: "Arduino, hobby electronics, PCB repair" },
    ],
    pros: ["0.01 µA and 0.01 Ω resolution for under $100", "REL mode to zero test-lead resistance", "USB PC link, capacitance to 220 mF, frequency to 220 MHz"],
    cons: ["No temperature measurement", "Burden voltage not published"],
    ctaHref: "https://www.amazon.com/dp/B093BS9MYM?tag=ohmsavvy-20",
  },
  {
    badge: "Best Color-Screen Data Logger",
    // Specs per meters.uni-trend.com (UT181A page) and the UT181 series datasheet. Per-range resolution isn't published; 0.01 µA / 0.01 Ω follow from 600 µA / 600 Ω ranges at 60,000 counts. Photo: Amazon main image of B08X9WXJTL, shows "UT181A" and "60000 COUNTS". Amazon-buyable 2026-10-24.
    name: "UNI-T UT181A",
    image: "https://m.media-amazon.com/images/I/71KbgYU4GiL._SL1500_.jpg",
    rating: 4.4,
    bottomLine: "A 60,000-count colour-screen logging meter that stores 20,000 readings and graphs them, for well under Fluke 287 money.",
    verdict:
      "The UT181A is a True RMS logging meter with a 3.5-inch colour TFT, 60,000 counts and CAT III 1000V / CAT IV 600V. Its lowest ranges are 600 µA and 600 Ω, so at 60,000 counts it reads to 0.01 µA and 0.01 Ω, though UNI-T doesn't print a per-range resolution. It logs 20,000 readings with a real-time clock and trend graph, measures two thermocouples at once, and runs on a rechargeable Li-ion pack. It has IP65 sealing and a 1 kHz low-pass filter. Bluetooth needs UNI-T's optional adaptor, despite what the listing implies.",
    specs: [
      { label: "Accuracy", value: "True RMS, ±(0.025%+5) DC V" },
      { label: "Safety rating", value: "CAT III 1000V / CAT IV 600V" },
      { label: "Auto-ranging", value: "Yes (manual override)" },
      { label: "Best for", value: "Logging battery drain and drift" },
    ],
    pros: ["20,000-reading logger with trend graph on a colour screen", "60,000 counts, 600 µA and 600 Ω lowest ranges", "Rechargeable battery and IP65 sealing"],
    cons: ["Bluetooth needs an optional adaptor", "UNI-T doesn't publish per-range resolution or burden voltage"],
    ctaHref: "https://www.amazon.com/dp/B08X9WXJTL?tag=ohmsavvy-20",
  },
  {
    badge: "Best Dedicated Micro-Ohm Meter",
    // Specs per meters.uni-trend.com (UT620A page) and the UT620A datasheet. The page also lists a 60 mΩ/10 A range; the datasheet and the dial in the photo start at 120 mΩ/5 A, which we use. Photo: Amazon main image of B01LXLPXW4, shows "UT620A Digital Micro Ohm Meters". Amazon-buyable 2026-10-24.
    name: "UNI-T UT620A",
    image: "https://m.media-amazon.com/images/I/61RkylYoIjL._SL1500_.jpg",
    rating: 4.3,
    bottomLine: "A 4-wire micro-ohm meter with 10 µΩ resolution and up to 5 A test current, for resistance a multimeter can't resolve.",
    verdict:
      "The UT620A isn't a multimeter. It's a 4-wire (Kelvin) DC resistance meter that drives up to 5 A through the part on its 120 mΩ range, so lead and contact resistance drop out and it resolves 10 µΩ. Accuracy is ±(0.25% + 25 digits) from 120 mΩ to 600 Ω, on a 60,000-count display, and it ships with Kelvin clips. Zeroing, high/low limit comparison, wire-length calculation, 1,000-reading storage and USB make it suit motor windings, busbars, welds and connectors. It costs as much as a Fluke 289 and is sold by a third-party seller.",
    specs: [
      { label: "Accuracy", value: "±(0.25%+25), 4-wire DC" },
      { label: "Safety rating", value: "Not stated" },
      { label: "Auto-ranging", value: "No (manual ranges)" },
      { label: "Best for", value: "Windings, busbars, welds, contacts" },
    ],
    pros: ["True 4-wire Kelvin measurement with 10 µΩ resolution", "Up to 5 A test current on the lowest range", "Limit comparison, wire length and 1,000-reading memory"],
    cons: ["Resistance only; no voltage or current", "Expensive, heavy (1.5 kg) and sold by a third-party seller"],
    ctaHref: "https://www.amazon.com/dp/B01LXLPXW4?tag=ohmsavvy-20",
  },
  {
    badge: "Best Budget Micro-Ohm Meter",
    // Specs per meters.uni-trend.com (UT620C+ page). UNI-T gives only "±0.1%FS", no per-range accuracy. Photo: Amazon main image of B0D73NCL5S, shows "UT620C+ Micro Ohm Meter" (kit photo includes Chinese-language manual and box). Amazon-buyable 2026-10-24.
    name: "UNI-T UT620C+",
    image: "https://m.media-amazon.com/images/I/71v98pmYqsL._SL1500_.jpg",
    rating: 4.3,
    bottomLine: "A compact 4-wire micro-ohmmeter reading down to 1 µΩ with a 1 A test current, for about a third of the UT620A's price.",
    verdict:
      "The UT620C+ is a palm-sized 4-wire resistance meter covering 0.001 mΩ to 300 kΩ. On its lowest range it drives 1 A and resolves 0.001 mΩ (1 µΩ). UNI-T quotes accuracy only as \"up to ±0.1% FS\", with no per-range table. It stores 500 readings, connects over USB-C, is IP54 rated and runs on a rechargeable 3,200 mAh battery. Its 1 A test current is lower than the UT620A's 5 A, but it's far cheaper. The Amazon photo shows Chinese-language packaging and manual, so check what's in the box.",
    specs: [
      { label: "Accuracy", value: "Up to ±0.1% FS (4-wire DC)" },
      { label: "Safety rating", value: "Not stated (input protection 36V)" },
      { label: "Auto-ranging", value: "Yes (manual option)" },
      { label: "Best for", value: "Low-ohm checks on wires, fuses, shunts" },
    ],
    pros: ["1 µΩ resolution with 4-wire Kelvin leads", "Compact 480 g, IP54, rechargeable", "500-reading memory and USB-C"],
    cons: ["UNI-T publishes no per-range accuracy", "Kit photo shows Chinese-language manual and box"],
    ctaHref: "https://www.amazon.com/dp/B0D73NCL5S?tag=ohmsavvy-20",
  },
  {
    badge: "Best Bluetooth Logger Under $100",
    // Specs per owon.com.hk (B41T+ page). OWON's page gives no CAT rating; the meter's front is marked 1000V CAT III. Photo: Amazon main image of B0BZCWZKJF, shows "OWON B41T+". Amazon-buyable 2026-10-24.
    name: "OWON B41T+",
    image: "https://m.media-amazon.com/images/I/71sFTZYXw3L._SL1500_.jpg",
    rating: 4.2,
    bottomLine: "A 22,000-count Bluetooth meter with 0.01 µA and 0.01 Ω resolution that logs 10,000 points by itself.",
    verdict:
      "The B41T+ is OWON's 4½-digit (22,000-count) True RMS meter. Its 220 µA range resolves 0.01 µA and its 220 Ω range resolves 0.01 Ω, both at ±(0.5% + 10 digits), and relative mode zeroes the leads. Bluetooth 4.0 sends readings to a phone app, and the \"+\" model records up to 10,000 points over as long as 168 hours with no phone attached, so it can log a project's sleep current overnight. OWON doesn't state a CAT rating on its page (the case says 1000V CAT III), AC voltage tops out at 750 V and burden voltage isn't published.",
    specs: [
      { label: "Accuracy", value: "True RMS, ±(0.1%+2) DC V" },
      { label: "Safety rating", value: "1000V CAT III (case marking)" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Logging µA sleep current on a budget" },
    ],
    pros: ["0.01 µA and 0.01 Ω resolution", "Offline logging of 10,000 points without a phone", "Bluetooth app, capacitance to 220 mF, temperature"],
    cons: ["OWON publishes no CAT rating or burden voltage", "AC voltage limited to 750 V"],
    ctaHref: "https://www.amazon.com/dp/B0BZCWZKJF?tag=ohmsavvy-20",
  },
  {
    badge: "Best Budget µA Meter",
    // Specs per owon.com.hk (OW18D/E page). CAT rating from the meter's front marking; OWON's page doesn't state it. Photo: Amazon main image of B0B2QVQZR6, shows "OW18E ... 20000 Counts". Amazon-buyable 2026-10-24 (only 1 left at check).
    name: "OWON OW18E",
    image: "https://m.media-amazon.com/images/I/71VEqMwGfDL._SL1500_.jpg",
    rating: 4.1,
    bottomLine: "A sub-$60 True RMS meter with a 200.00 µA range, 0.01 Ω resolution, Bluetooth and offline logging.",
    verdict:
      "The OW18E is a 19,999-count (sold as 20,000) True RMS meter. Its 200.00 µA range resolves 0.01 µA at ±(0.5% + 10 digits) DC and its 200.00 Ω range resolves 0.01 Ω. It adds NCV, a flashlight, Type-K temperature, capacitance to 20 mF and a 20 A range, plus BLE 4.0 and offline recording on the E model. The case is marked 1000V CAT III / 600V CAT IV, but OWON's page doesn't state a rating and doesn't publish burden voltage. Amazon showed only one in stock when we checked.",
    specs: [
      { label: "Accuracy", value: "True RMS, ±(0.1%+2) DC V" },
      { label: "Safety rating", value: "1000V CAT III / 600V CAT IV (case marking)" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Arduino and hobby electronics on a budget" },
    ],
    pros: ["0.01 µA and 0.01 Ω resolution under $60", "Bluetooth with offline recording", "NCV, flashlight and temperature included"],
    cons: ["Low stock on Amazon at last check", "OWON publishes no burden voltage or CAT rating"],
    ctaHref: "https://www.amazon.com/dp/B0B2QVQZR6?tag=ohmsavvy-20",
  },
  {
    badge: "Cheapest 20,000-Count µA Meter",
    // Specs per kaiweets.com (HT118E page, "Upgraded Specification"). Per-range resolution isn't published; 0.01 µA / 0.01 Ω follow from 200 µA / 200 Ω ranges at 20,000 counts. Photo: Amazon main image of B0B7WFPB4T, shows "HT118E ... 20000 Counts". Amazon-buyable 2026-10-24.
    name: "KAIWEETS HT118E",
    image: "https://m.media-amazon.com/images/I/81lmVClgFiL._SL1500_.jpg",
    rating: 4.2,
    bottomLine: "A $45 True RMS meter with 20,000 counts and a 200 µA range, but no relative mode for low-ohm work.",
    verdict:
      "The HT118E has a 20,000-count display, CAT III 1000V / CAT IV 600V and a 200 µA range at ±(0.5% + 5 digits) DC. At 20,000 counts that implies 0.01 µA resolution, though KAIWEETS doesn't print it. It covers temperature, capacitance, frequency, NCV and continuity, with lit input jacks and a flashlight. Its 200 Ω range is only ±(1.0% + 15 digits) and KAIWEETS lists no relative mode, so you have to subtract lead resistance yourself. That makes it better for sleep-current checks than for milliohm work.",
    specs: [
      { label: "Accuracy", value: "True RMS, ±(0.08%+5) DC V" },
      { label: "Safety rating", value: "CAT III 1000V / CAT IV 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Beginner Arduino and µA checks" },
    ],
    pros: ["200 µA range with 20,000 counts for about $45", "CAT III 1000V / CAT IV 600V", "Lit input jacks, NCV and flashlight"],
    cons: ["No relative mode listed for zeroing test leads", "Per-range resolution and burden voltage not published"],
    ctaHref: "https://www.amazon.com/dp/B0B7WFPB4T?tag=ohmsavvy-20",
  },
  {
    badge: "Best Klein True RMS Under $70",
    // Specs per kleintools.com (MM420 page) and the MM420 instruction manual (current table: 400.0 µA range, 0.1 µA). Photo: Amazon main image of B0B57PFFYX, meter face reads "MM420 Digital Multi-Meter ... TrueRMS". Amazon-buyable 2026-10-24 (sold by Amazon.com, $64.96).
    name: "Klein Tools MM420",
    image: "https://m.media-amazon.com/images/I/51hgJ2yCwqL._SL1500_.jpg",
    rating: 4.5,
    bottomLine: "Klein's everyday True RMS, auto-ranging meter: µA to 10 A, temperature and capacitance, rated CAT III 600V.",
    verdict:
      "The MM420 is a 4,000-count, True RMS, auto-ranging meter rated CAT III 600V. It measures AC/DC current from a 400.0 µA range (0.1 µA resolution) up to 10 A, resistance to 50 MΩ, capacitance to 400 µF, frequency to 50 kHz and temperature from -40 to 1832°F with the included thermocouple. Lead-Alert lights show which jacks to use, it has Min/Max, a backlight and a 2 m drop rating. There's no LoZ mode or NCV, and Klein rates it for indoor use only.",
    specs: [
      { label: "Accuracy", value: "True RMS, 4,000-count" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes (manual RANGE button)" },
      { label: "Best for", value: "Home electrical, HVAC and appliance work" },
    ],
    pros: ["µA, mA and 10 A ranges on AC and DC", "Temperature, capacitance and frequency included", "Lead-Alert jack lights help beginners"],
    cons: ["No LoZ mode or non-contact voltage detection", "CAT III 600V only, not for service-entrance work"],
    ctaHref: "https://www.amazon.com/dp/B0B57PFFYX?tag=ohmsavvy-20",
  },
  {
    badge: "Best Electrician's Meter Under $100",
    // Specs per kleintools.com (MM720 page) and the MM720 instruction manual (frequency to 500 kHz per manual; Klein's 04/26 selection guide shows 50 kHz). Photo: Amazon main image of B0B57PDQJC, meter face reads "MM720 Digital Multi-Meter ... TrueRMS ... CAT IV 600V CAT III 1000V". Amazon-buyable 2026-10-24 (sold by Amazon.com, $99.96).
    name: "Klein Tools MM720",
    image: "https://m.media-amazon.com/images/I/61Ba-L7Q2RL._SL1500_.jpg",
    rating: 4.6,
    bottomLine: "CAT IV 600V, 1000V, LoZ and True RMS for just under $100, the most panel-ready meter in this price range.",
    verdict:
      "The MM720 is rated CAT IV 600V / CAT III 1000V and measures up to 1000V AC/DC, with a LoZ mode for ghost voltages. It is True RMS, auto-ranging and 6,000-count, and the reverse-contrast display adjusts itself to the light. Current runs from a 600.0 µA range (0.1 µA) to 10 A. It adds 60 MΩ resistance, capacitance to 6,000 µF, temperature to 1832°F, IP42 and a 2 m drop rating, and a carrying pouch comes in the box. Klein lists no NCV, and at $99.96 it sits right at the $100 limit.",
    specs: [
      { label: "Accuracy", value: "True RMS, 6,000-count" },
      { label: "Safety rating", value: "CAT IV 600V / CAT III 1000V" },
      { label: "Auto-ranging", value: "Yes (manual RANGE button)" },
      { label: "Best for", value: "Electricians working panels and feeders" },
    ],
    pros: ["CAT IV 600V and 1000V AC/DC", "LoZ mode for ghost voltages", "IP42, 2 m drop rating and pouch included"],
    cons: ["Price sits right at $100", "No non-contact voltage detection"],
    ctaHref: "https://www.amazon.com/dp/B0B57PDQJC?tag=ohmsavvy-20",
  },
  {
    badge: "Best Smart-Mode Klein",
    // Specs per kleintools.com (MM460S page) and the MM460S instruction manual (Smart mode, 400.0 µA range, 330 g). Photo: Amazon main image of B0GX22H15F, meter face reads "MM460S Smart Digital Multi-Meter ... TrueRMS". Amazon-buyable 2026-10-24 (sold by Amazon.com, $79.98).
    name: "Klein Tools MM460S",
    image: "https://m.media-amazon.com/images/I/71wHNx2q9aL._SL1500_.jpg",
    rating: 4.4,
    bottomLine: "A True RMS Klein whose Smart mode picks AC/DC voltage, resistance or continuity for you, a gentle start for beginners.",
    verdict:
      "In Smart mode the MM460S works out whether you're measuring AC or DC voltage, resistance or continuity without turning the dial (the minimum voltage it detects there is 0.8V). Outside Smart mode it is a regular auto-ranging True RMS meter. It reads current from a 400.0 µA range up to 10 A, resistance to 50 MΩ, capacitance to 4,000 µF and temperature to 1832°F. The 4,000-count reverse-contrast display is backlit, it's rated CAT III 600V with a 2 m drop rating, and Lead-Alert gives visual and audible warnings for wrong lead placement. There's no LoZ or NCV, and it is for indoor use.",
    specs: [
      { label: "Accuracy", value: "True RMS, 4,000-count" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes, plus Smart mode" },
      { label: "Best for", value: "Beginners and quick household checks" },
    ],
    pros: ["Smart mode auto-detects V, Ω and continuity", "µA to 10 A plus temperature and capacitance", "Backlit reverse-contrast display"],
    cons: ["CAT III 600V only", "No LoZ or non-contact voltage detection"],
    ctaHref: "https://www.amazon.com/dp/B0GX22H15F?tag=ohmsavvy-20",
  },
  {
    badge: "Best Basic Manual-Ranging",
    // Specs per kleintools.com (MM325 page) and the MM325 instruction manual (2,000-count, DC-only current, 200 µA range). Not True RMS (no TRMS claim). Photo: Amazon main image of B0B57L9FNL, meter face reads "MM325 Digital Multi-Meter ... CAT III 600V MAX". Amazon-buyable 2026-10-24 (sold by Amazon.com, $29.98).
    name: "Klein Tools MM325",
    image: "https://m.media-amazon.com/images/I/51EPzXFvIAL._SL1500_.jpg",
    rating: 4.1,
    bottomLine: "A $30 Klein for checking outlets, batteries and continuity, as long as you're happy picking ranges yourself.",
    verdict:
      "The MM325 is a manual-ranging, 2,000-count meter rated CAT III 600V. It reads AC/DC voltage to 600V, DC current from a 200 µA range up to 10 A, and resistance to 2 MΩ, and it has diode, continuity and a 1.5V/9V battery test. Lead-Alert lights, a backlight and a 2 m drop rating come from Klein's pricier meters. Klein doesn't claim True RMS for it, it can't measure AC current, and you have to choose each range on the dial.",
    specs: [
      { label: "Accuracy", value: "Not True RMS (2,000-count)" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "No (manual ranging)" },
      { label: "Best for", value: "Basic household and battery checks" },
    ],
    pros: ["About $30 from a major tool brand", "Battery test for 1.5V and 9V cells", "Lead-Alert lights and backlit display"],
    cons: ["Manual ranging and not True RMS", "No AC current, capacitance or temperature"],
    ctaHref: "https://www.amazon.com/dp/B0B57L9FNL?tag=ohmsavvy-20",
  },
  {
    badge: "Best True RMS Under $40",
    // Specs per the KAIWEETS HT118A user manual (spec tables: 1000V DC / 750V AC, 600 µA range at 0.1 µA, 2 x AA) and kaiweets.com (3-year warranty). kaiweets.com product text says 600V AC/DC, which conflicts with the manual, Amazon listing and meter face. Photo: Amazon main image of B07SHLS639, shows "KAIWEETS HT118A ... 6000 Counts TRUE RMS". Amazon-buyable 2026-10-24 (sold by KAIWEETS Direct, $37.99).
    name: "KAIWEETS HT118A",
    image: "https://m.media-amazon.com/images/I/81THgD001tL._SL1500_.jpg",
    rating: 4.4,
    bottomLine: "True RMS, CAT III 1000V and µA current with NCV and temperature for under $40.",
    verdict:
      "The HT118A is a 6,000-count, auto-ranging True RMS meter with an analog bar. KAIWEETS's manual rates it CAT III 1000V / CAT IV 600V for up to 1000V DC and 750V AC, and current runs from a 600 µA range (0.1 µA) to 10 A. It also measures resistance to 60 MΩ, capacitance, frequency to 10 MHz, duty cycle and temperature, and adds NCV, a Live-wire test, Min/Max, jack lights, a flashlight and a kickstand. KAIWEETS gives a 3-year warranty. Its own product page lists 600V AC/DC, which disagrees with the manual and the meter face.",
    specs: [
      { label: "Accuracy", value: "True RMS, 6,000-count" },
      { label: "Safety rating", value: "CAT III 1000V / CAT IV 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Budget all-rounder for home, car and hobby" },
    ],
    pros: ["µA, mA and 10 A ranges", "NCV, temperature and Min/Max included", "3-year warranty"],
    cons: ["Maker's product page and manual disagree on max voltage", "Bulky compared with slim meters"],
    ctaHref: "https://www.amazon.com/dp/B07SHLS639?tag=ohmsavvy-20",
  },
  {
    badge: "Best Rechargeable Smart Meter",
    // Specs per the KAIWEETS KM602 user manual (general and accuracy tables: CAT III 600V, 600V max, 600 mA/6 A/10 A current, 3.7V Li-ion) and kaiweets.com (3-year warranty). Amazon and kaiweets.com claim CAT III 1000V / CAT IV 600V; the manual and the printed meter face say CAT III 600V, used here. Photo: Amazon main image of B0C53BLWKC, shows "KAIWEETS KM602 ... TRUE RMS ... 600V CAT III". Amazon-buyable 2026-10-24 (sold by KAIWEETS Direct, $52.24).
    name: "KAIWEETS KM602",
    image: "https://m.media-amazon.com/images/I/81x7i23bCIL._SL1500_.jpg",
    rating: 4.2,
    bottomLine: "A rechargeable True RMS meter whose Smart mode measures voltage, resistance or continuity without turning a dial.",
    verdict:
      "The KM602 starts in Smart mode, where it detects voltage, resistance and continuity on its own, and a FUNC button switches to manual mode. It has a full-screen colour display, 6,000 counts with an analog bar, True RMS, and a built-in 1,200 mAh lithium battery that charges by cable. It measures up to 600V AC/DC, current on 600 mA, 6 A and 10 A ranges (no µA), resistance to 60 MΩ, capacitance, frequency, duty cycle and temperature, and it has NCV, Live, Max/Min/Avg and a flashlight. KAIWEETS's manual rates it CAT III 600V, lower than the 1000V figure on its listing.",
    specs: [
      { label: "Accuracy", value: "True RMS, 6,000-count" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes, plus Smart mode" },
      { label: "Best for", value: "Beginners who want a no-dial, rechargeable meter" },
    ],
    pros: ["Smart mode plus manual mode", "Rechargeable, no batteries to buy", "NCV, temperature and Max/Min/Avg"],
    cons: ["No µA range; smallest current resolution 0.1 mA", "Listing's CAT IV claim isn't backed by the manual"],
    ctaHref: "https://www.amazon.com/dp/B0C53BLWKC?tag=ohmsavvy-20",
  },
  {
    badge: "Best Waterproof Voltage Checker",
    // Specs per southwire.com (16030A page) and the 16030A operating manual (True RMS, 4,000-count, 600V, IP67, no current function, 2-year warranty). Photo: Amazon main image of B01MDMAHMJ, meter face reads "16030A Autoselecting Multimeter ... TRUE RMS ... IP67 ... CAT IV 600V". Amazon-buyable 2026-10-24 (sold by Amazon.com, $48.22, only 1 left).
    name: "Southwire 16030A",
    image: "https://m.media-amazon.com/images/I/81FAgUDXakL._SL1500_.jpg",
    rating: 4.0,
    bottomLine: "A rugged CAT IV 600V, IP67 voltage-and-continuity meter that picks AC or DC for you, with no current ranges at all.",
    verdict:
      "The 16030A is a simplified True RMS meter for electricians who mostly check voltage. One button cycles between voltage, resistance and continuity. In voltage mode it picks AC or DC itself, and in resistance or continuity it switches to voltage if the circuit is live (above 2.6V). It reads to 600V AC/DC on a 4,000-count backlit display and resistance to 400 kΩ, and it adds a 100-600V non-contact detector, a flashlight and Autohold. The housing is IP67 and the rating is CAT IV 600V. It cannot measure current, capacitance or frequency. Southwire gives a two-year warranty.",
    specs: [
      { label: "Accuracy", value: "True RMS, 4,000-count" },
      { label: "Safety rating", value: "CAT IV 600V" },
      { label: "Auto-ranging", value: "Yes (auto-selects AC/DC)" },
      { label: "Best for", value: "Quick voltage and continuity checks on the job" },
    ],
    pros: ["CAT IV 600V and IP67 waterproof housing", "Automatic AC/DC selection and Autohold", "Built-in NCV and flashlight"],
    cons: ["No current, capacitance or frequency measurement", "Resistance tops out at 400 kΩ"],
    ctaHref: "https://www.amazon.com/dp/B01MDMAHMJ?tag=ohmsavvy-20",
  },
  {
    badge: "Best HVAC Multimeter",
    // Specs per fluke.com (Fluke 116 product page and spec table). Photo: Amazon main image of B000NI69YA, shows "FLUKE 116 TRUE RMS MULTIMETER". Amazon-buyable 2026-10-24.
    name: "Fluke 116",
    image: "https://m.media-amazon.com/images/I/61OQ92+Yl5L._SL1500_.jpg",
    rating: 4.6,
    bottomLine: "Fluke's HVAC multimeter: a 0.1 µA flame-sensor range, temperature, capacitance and LoZ in a CAT III 600V body.",
    verdict:
      "The 116 is built around HVAC controls work. It has a 600.0 µA AC/DC range with 0.1 µA resolution for flame-rod checks, a Type K temperature input (-40 to 400 °C), capacitance to 9,999 µF for run and start capacitors, and an AUTO-V/LoZ mode that cuts ghost-voltage readings. It is True RMS with a 6,000-count backlit display and Min/Max/Average. The catch is that it has no mA or amp ranges at all, so you need a clamp meter for motor and compressor current.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Not stated by Fluke (manual RANGE button)" },
      { label: "Best for", value: "HVAC flame sensors, capacitors, controls" },
    ],
    pros: ["600.0 µA range with 0.1 µA resolution for flame sensors", "Temperature and capacitance built in", "AUTO-V/LoZ against ghost voltages"],
    cons: ["No mA or amp ranges, so current needs a separate clamp", "CAT III 600V only"],
    ctaHref: "https://www.amazon.com/dp/B000NI69YA?tag=ohmsavvy-20",
  },
  {
    badge: "Best HVAC Clamp Meter",
    // Specs per fluke.com (Fluke 902 FC product page). fluke.com lists temperature as -40 to 400 °C in the table but -10 to 400 °C in the features. Photo: Amazon main image of B01BENTS7M, shows "FLUKE 902 FC". Amazon-buyable 2026-10-24.
    name: "Fluke 902 FC",
    image: "https://m.media-amazon.com/images/I/71AWCVA5sDL._SL1500_.jpg",
    rating: 4.5,
    bottomLine: "A True RMS HVAC clamp with a 200 µA flame-sensor range, capacitance, temperature and Fluke Connect wireless.",
    verdict:
      "The 902 FC combines a 600 A AC clamp with a DC µA range (200 µA, 0.1 µA resolution) for flame rectification, capacitance to 1,000 µF, contact temperature and Min/Max recording. Readings can be sent to a phone with Fluke Connect. Its CAT III 600V / CAT IV 300V rating and 600 V limit suit residential and light-commercial equipment. Fluke doesn't list a LoZ mode, DC amps or inrush, and resistance stops at 60 kΩ.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 600V / CAT IV 300V" },
      { label: "Auto-ranging", value: "Not stated" },
      { label: "Best for", value: "HVAC service: amps, flame sensors, capacitors" },
    ],
    pros: ["DC µA range (200 µA, 0.1 µA) for flame sensors", "Capacitance to 1,000 µF and temperature", "Fluke Connect wireless logging"],
    cons: ["No DC amps, inrush or LoZ listed", "Resistance only to 60 kΩ"],
    ctaHref: "https://www.amazon.com/dp/B01BENTS7M?tag=ohmsavvy-20",
  },
  {
    badge: "Best Budget HVAC Clamp",
    // Specs per kleintools.com (CL445 product page and datasheet) and the CL445 instruction manual. Photo: Amazon main image of B0BL42ZS1P, shows "KLEIN TOOLS CL445". Amazon-buyable 2026-10-24.
    name: "Klein Tools CL445",
    image: "https://m.media-amazon.com/images/I/515QTzqjnZL._SL1500_.jpg",
    rating: 4.4,
    bottomLine: "An HVAC clamp with a 0.1 µA flame-sensor range, inrush, NCV and temperature, rated CAT IV 600V.",
    verdict:
      "The CL445 is Klein's HVAC clamp. It measures AC current to 600 A with an inrush mode, and through the test leads it reads DC microamps (600.0 µA, 0.1 µA resolution) for flame sensors, capacitance to 6 mF and temperature from -148 to 1832 °F. It shows volts and amps at the same time, has NCV in the jaw, a backlit 6,000-count display and a worklight. AC voltage stops at 750 V, DC at 600 V, and it can't clamp DC current.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT IV 600V / CAT III 750V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "HVAC techs: amps, inrush, flame sensors" },
    ],
    pros: ["DC µA range with 0.1 µA resolution", "Inrush mode and simultaneous V + A display", "NCV, backlight and worklight"],
    cons: ["No DC amps through the clamp", "No LoZ mode listed"],
    ctaHref: "https://www.amazon.com/dp/B0BL42ZS1P?tag=ohmsavvy-20",
  },
  {
    badge: "Best Compact HVAC Clamp",
    // Specs per the Fieldpiece SC260 operator's manual (v22) and fieldpiece.com product page. The manual lists no µA range. Photo: Amazon main image of B00KLYJG78, shows "SC260" on the meter. Amazon-buyable 2026-10-24.
    name: "Fieldpiece SC260",
    image: "https://m.media-amazon.com/images/I/510EKrM0AgL._SL1500_.jpg",
    rating: 4.2,
    bottomLine: "A small True RMS HVACR clamp with capacitance, temperature and NCV, but no microamp range.",
    verdict:
      "The SC260 is Fieldpiece's pocket-sized HVACR clamp: 400 A AC, 600 V AC/DC, capacitance from 4 nF to 4 mF for run caps, Type K temperature from -30 to 752 °F, NCV and a blue backlight, with a swivel magnet for hanging. Auto Select picks the measurement from what the leads detect. Fieldpiece's manual lists no microamp range, so it can't check flame sensors, and it has a 4,000-count display and a one-year warranty.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes (Auto Select)" },
      { label: "Best for", value: "A compact backup clamp for AC/R service" },
    ],
    pros: ["Capacitance to 4 mF for run and start caps", "Temperature and NCV built in", "Small, with a swivel magnet"],
    cons: ["No microamp range for flame sensors", "4,000-count display and one-year warranty"],
    ctaHref: "https://www.amazon.com/dp/B00KLYJG78?tag=ohmsavvy-20",
  },
  {
    badge: "Best Wireless HVAC Clamp",
    // Specs per the Fieldpiece SC480 operator's manual (v18). Photo: Amazon main image of B0848S9YWT, shows "SC480" and "CAT III 1000V / CAT IV 600V". Amazon-buyable 2026-10-24.
    name: "Fieldpiece SC480",
    image: "https://m.media-amazon.com/images/I/71zZvCq9xML._SL1500_.jpg",
    rating: 4.5,
    bottomLine: "An HVACR power clamp that measures watts and power factor, checks phase rotation and sends readings to the Job Link app.",
    verdict:
      "The SC480 does more than a standard HVAC clamp. Besides 600 A AC, inrush, a 1000 µA DC range (0.1 µA) for flame sensors, capacitance to 10 mF and temperature from -58 to 2372 °F, it measures active power (W), VA, VAr and power factor, checks 3-phase rotation, and has a low-pass filter for VFD voltage. Readings go to the Job Link app over Bluetooth. It is CAT IV 600V / CAT III 1000V with a 10,000-count dual display, but it can't clamp DC current and the warranty is one year.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT IV 600V / CAT III 1000V" },
      { label: "Auto-ranging", value: "Yes (manual Range button)" },
      { label: "Best for", value: "HVACR techs who need power, phase rotation and app logging" },
    ],
    pros: ["Watts, VA, VAr and power factor", "Phase rotation, inrush and VFD low-pass filter", "µA DC range and Job Link wireless"],
    cons: ["No DC amps through the clamp", "One-year warranty"],
    ctaHref: "https://www.amazon.com/dp/B0848S9YWT?tag=ohmsavvy-20",
  },
  {
    badge: "Best for Solar PV",
    // Specs per fluke.com (Fluke 393 FC product page and spec table; fluke.com labels the DC power ranges in kVA). Photo: Amazon main image of B09BHJNMZK, shows "393 FC CAT III 1500V TRMS CLAMP METER". Amazon-buyable 2026-10-24.
    name: "Fluke 393 FC",
    image: "https://m.media-amazon.com/images/I/51EtT0H8l2L._SL1500_.jpg",
    rating: 4.7,
    bottomLine: "Fluke's solar clamp: CAT III 1500V, 1500 V DC, 999.9 A DC through the jaw and DC power, in an IP54 body.",
    verdict:
      "The 393 FC is built for PV arrays. It is rated CAT III 1500 V / CAT IV 600 V, measures up to 1500 V DC and 1000 V AC, clamps up to 999.9 A AC or DC with a zero function for DC, and the included 18-inch iFlex extends AC current to 2500 A. It calculates DC power, sounds an audio polarity alarm to catch miswired strings, and its continuity check lights the display green. It is IP54 and logs to Fluke Connect. It has no temperature or µA function and costs far more than a general clamp.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 1500V / CAT IV 600V" },
      { label: "Auto-ranging", value: "Not stated" },
      { label: "Best for", value: "Solar PV installation and service" },
    ],
    pros: ["1500 V DC and CAT III 1500V rating", "DC clamp to 999.9 A plus DC power", "Audio polarity alarm, IP54 and iFlex included"],
    cons: ["Expensive for anyone not working on PV", "No temperature or µA function"],
    ctaHref: "https://www.amazon.com/dp/B09BHJNMZK?tag=ohmsavvy-20",
  },
  {
    badge: "Best Budget AC/DC Clamp",
    // Specs per kaiweets.com (HT208D product page and parameter table; the table lists AC voltage to 750 V and DC to 1000 V). Photo: Amazon main image of B08CX6VHWV, shows "KAIWEETS HT208D". Amazon-buyable 2026-10-24.
    name: "KAIWEETS HT208D",
    image: "https://m.media-amazon.com/images/I/91R9erZ0CNL._SL1500_.jpg",
    rating: 4.2,
    bottomLine: "A low-cost 1000 A AC/DC clamp with 1000 V DC, CAT III 1000V, LoZ, VFD and inrush modes.",
    verdict:
      "The HT208D clamps AC and DC current to 1000 A and measures DC voltage to 1000 V (AC to 750 V), with a CAT IV 600V / CAT III 1000V rating. That makes it an affordable way to read DC string current on small solar systems. It adds LoZ, a VFD filter, AC inrush, NCV, temperature to 1000 °C, capacitance and a color 6,000-count display. KAIWEETS doesn't publish resolution figures on its page, the current accuracy is ±(2.5% + 5), and there is no µA range or solar-specific function such as polarity alarm or DC power.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT IV 600V / CAT III 1000V" },
      { label: "Auto-ranging", value: "Yes (manual RAN button)" },
      { label: "Best for", value: "Budget DC current and small solar checks" },
    ],
    pros: ["AC and DC clamp current to 1000 A", "1000 V DC and CAT III 1000V", "LoZ, VFD filter, inrush and NCV"],
    cons: ["No µA range or PV-specific functions", "Resolution not published; ±(2.5% + 5) current accuracy"],
    ctaHref: "https://www.amazon.com/dp/B08CX6VHWV?tag=ohmsavvy-20",
  },
  {
    badge: "Best for 4-20 mA Loops",
    // Specs per fluke.com (Fluke 789 ProcessMeter product page and spec table). Photo: Amazon main image of B000R8ETKW, shows "FLUKE 789 PROCESSMETER". Amazon-buyable 2026-10-24 (third-party seller, 1 left).
    name: "Fluke 789",
    image: "https://m.media-amazon.com/images/I/71dt8oDb+JL._SL1500_.jpg",
    rating: 4.7,
    bottomLine: "A full multimeter that also sources, simulates and powers 4-20 mA loops, with 0.001 mA resolution.",
    verdict:
      "The 789 ProcessMeter is a 1000 V CAT IV 600V / CAT III 1000V multimeter with a process calibrator built in. It measures DC mA to 30 mA with 0.001 mA resolution and 0.05% accuracy, and it sources or simulates 0-20 or 4-20 mA at the same resolution, with 24 V compliance. A built-in 24 V loop supply powers a transmitter, the 250 Ω HART resistor is selectable, % of span shows next to the mA reading, and SpanCheck, step and ramp make valve and transmitter checks quick. It is expensive, and Amazon's new stock was down to one unit from a third-party seller.",
    specs: [
      { label: "Accuracy", value: "True RMS AC volts; 0.05% DC mA" },
      { label: "Safety rating", value: "CAT IV 600V / CAT III 1000V" },
      { label: "Auto-ranging", value: "Yes (manual RANGE)" },
      { label: "Best for", value: "Instrument techs: 4-20 mA loops and transmitters" },
    ],
    pros: ["0.001 mA measure and source resolution", "24 V loop power and 250 Ω HART resistor", "% of span, SpanCheck, step and ramp"],
    cons: ["Around $1,300 or more", "Limited new Amazon stock from a third-party seller"],
    ctaHref: "https://www.amazon.com/dp/B000R8ETKW?tag=ohmsavvy-20",
  },
  {
    badge: "Best mA Clamp",
    // Specs per fluke.com (Fluke 771 product page). Photo: Amazon main image of B000R81ARM, shows "FLUKE 771 MILLIAMP PROCESS CLAMP METER". Amazon-buyable 2026-10-24.
    name: "Fluke 771",
    image: "https://m.media-amazon.com/images/I/51kxFeWPzbL._SL1500_.jpg",
    rating: 4.6,
    bottomLine: "Reads 4-20 mA loop current through a clamp, so you don't have to break the loop.",
    verdict:
      "The 771 measures DC milliamps through a small clamp: 0 to 20.99 mA at 0.2% + 2 counts and up to 100 mA, with 0.01 mA resolution. The dual backlit display shows mA and % of the 4-20 mA span together. The detachable jaw on an extension cable reaches conductors up to 4.5 mm in crowded cabinets, and an LED spotlight helps in dark enclosures. It only measures: it can't source, simulate or power a loop (that's the 772 and 773), and Fluke doesn't list a CAT rating for it.",
    specs: [
      { label: "Accuracy", value: "0.2% + 2 counts (0-20.99 mA)" },
      { label: "Safety rating", value: "Not stated by Fluke" },
      { label: "Auto-ranging", value: "Not stated" },
      { label: "Best for", value: "Checking 4-20 mA loops without breaking them" },
    ],
    pros: ["Clamp-on mA reading with 0.01 mA resolution", "Shows mA and % of 4-20 mA span", "Detachable jaw and LED spotlight"],
    cons: ["Measure only: no source, simulate or loop power", "Costs more than many full multimeters"],
    ctaHref: "https://www.amazon.com/dp/B000R81ARM?tag=ohmsavvy-20",
  },
  {
    badge: "Best mA Clamp with Loop Power",
    // Specs per fluke.com (Fluke 772 product page and functional specifications). Photo: Amazon main image of B002EL4LIK, shows "FLUKE 772 MILLIAMP PROCESS CLAMP METER". Amazon-buyable 2026-10-24.
    name: "Fluke 772",
    image: "https://m.media-amazon.com/images/I/5118UQtLrHL._SL1500_.jpg",
    rating: 4.6,
    bottomLine: "A mA clamp that also sources, simulates and powers 4-20 mA loops with 24 V.",
    verdict:
      "The 772 adds calibrator functions to the 771's clamp. It measures 0 to 20.99 mA through the jaw at 0.2% + 5 counts, or 0 to 24.00 mA in series at 0.2% + 2 counts. It sources 0-24 mA (24 mA into 1,000 Ω), simulates a transmitter, and powers one from its 24 V loop supply. Linear ramp and 25% steps, plus a mA and % of span display, cover valve stroking and transmitter checks. Fluke lists no voltage measurement or CAT rating, and the price is high.",
    specs: [
      { label: "Accuracy", value: "0.2% + 2 counts in series; 0.2% + 5 clamp" },
      { label: "Safety rating", value: "Not stated by Fluke" },
      { label: "Auto-ranging", value: "Not stated" },
      { label: "Best for", value: "Loop troubleshooting and transmitter checks" },
    ],
    pros: ["Clamp, in-series measure, source and simulate", "24 V loop power", "Ramp, 25% steps and % of span display"],
    cons: ["Around $1,460 on Amazon", "No voltage measurement"],
    ctaHref: "https://www.amazon.com/dp/B002EL4LIK?tag=ohmsavvy-20",
  },
  {
    badge: "Best HVAC Clamp with LoZ",
    // Specs per the UEi DL579 data sheet (ueitest.com). Amazon's title says "AC/DC", but UEi lists AC amps only through the jaw. Photo: Amazon main image of B0BCVLP8MQ, shows "UEi DL579". Amazon-buyable 2026-10-24.
    name: "UEi DL579",
    image: "https://m.media-amazon.com/images/I/51QWwE-xF3L._SL1500_.jpg",
    rating: 4.3,
    bottomLine: "An HVAC/R clamp with AC/DC microamps, Low Z, LRA inrush and two temperature probes.",
    verdict:
      "The DL579 targets HVAC/R troubleshooting. It clamps AC current to 600 A, reads AC and DC microamps (600.0 µA at 0.1 µA, up to 2,000 µA) for flame sensors, and has Low Z, NCV and LRA inrush. Capacitance runs to 6,000 µF, temperature from -328 to 2462 °F, and the kit includes two K-type probes. It has a backlit dual display, auto and manual ranging, and reads 1000 V DC / 750 V AC. Its CAT IV 300V / CAT III 600V rating is lower than some rivals, the warranty is one year, and the clamp doesn't read DC amps.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT IV 300V / CAT III 600V" },
      { label: "Auto-ranging", value: "Yes (manual RANGE)" },
      { label: "Best for", value: "HVAC/R techs who want µA, Low Z and inrush" },
    ],
    pros: ["AC/DC µA ranges with 0.1 µA resolution", "Low Z, NCV and LRA inrush", "Two K-type temperature probes included"],
    cons: ["No DC amps through the clamp", "CAT IV only to 300V; one-year warranty"],
    ctaHref: "https://www.amazon.com/dp/B0BCVLP8MQ?tag=ohmsavvy-20",
  },
  {
    badge: "Best Value Automotive",
    // Specs per innova.com (Innova 3340 product page + FAQs) and the official Amazon listing. CAT II 600V is read off the meter face in the listing photo; Innova's text doesn't state a CAT rating. Photo: Amazon main image of B000KIMHRQ (meter printed "3340a"). Amazon-buyable 2026-10-24.
    name: "Innova 3340",
    image: "https://m.media-amazon.com/images/I/71CIsZUufML._SL1500_.jpg",
    rating: 4.5,
    bottomLine: "A proper engine-analyzer meter (RPM, dwell, duty cycle, pulse width, temperature) with the inductive pickup in the box.",
    verdict:
      "The Innova 3340 is built for car work: it reads RPM from 0 to 10,000 with the included inductive clamp (conventional, DIS and coil-on-plug), plus dwell, duty cycle, millisecond pulse width, frequency and temperature with the supplied probe. It's auto-ranging with Min/Max and Hold and a 10 MΩ input that's safe around ECUs. Innova doesn't claim True RMS, the meter face shows only CAT II 600V, and the 15 A input is unfused (15-second tests with a 15-minute rest).",
    specs: [
      { label: "Accuracy", value: "True RMS not stated" },
      { label: "Safety rating", value: "CAT II 600V (marked on meter)" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "DIY engine diagnostics" },
    ],
    pros: ["Inductive RPM pickup and temperature probe included", "RPM, dwell, duty cycle and pulse width", "Min/Max and Hold for catching drops"],
    cons: ["Only CAT II 600V: not for household panel work", "15 A input is unfused and limited to 15-second tests"],
    ctaHref: "https://www.amazon.com/dp/B000KIMHRQ?tag=ohmsavvy-20",
  },
  {
    badge: "Best Professional Automotive",
    // Specs per fluke.com (Fluke 88V page + spec tab) and the Fluke 88V Users Manual (average responding, 6,000 counts / 19,999 HiRes, 600.0 µA range). Photo: Amazon main image of B000WTB67K, shows "FLUKE 88V". Amazon-buyable 2026-10-24.
    name: "Fluke 88V",
    image: "https://m.media-amazon.com/images/I/61gfccU3v-L._SL1500_.jpg",
    rating: 4.7,
    bottomLine: "Fluke's top automotive meter: CAT IV 600V, 0.1% DC accuracy, 250 µs peak capture and a lifetime warranty.",
    verdict:
      "The 88V adds the automotive functions to Fluke's 80-series core: millisecond pulse width for injectors, duty cycle to 99.9%, RPM with an inductive pickup and temperature with a probe. Min/Max/Average recording with a 250 µs Peak Min/Max catches cranking dips and intermittent dropouts, and it's rated CAT III 1000V / CAT IV 600V, which matters on hybrid systems. Two things to know: it's average-responding, not True RMS, and Fluke lists the inductive pickup and temperature probe as optional for the bare 88V.",
    specs: [
      { label: "Accuracy", value: "Average-responding, ±(0.1% + 1) DC" },
      { label: "Safety rating", value: "CAT III 1000V / CAT IV 600V" },
      { label: "Auto-ranging", value: "Yes (manual override)" },
      { label: "Best for", value: "Professional and hybrid-vehicle work" },
    ],
    pros: ["250 µs Peak Min/Max catches fast glitches", "10 A continuous, 20 A for 30 seconds", "Limited lifetime warranty"],
    cons: ["Not True RMS", "Expensive, and the RPM pickup and temperature probe are sold separately"],
    ctaHref: "https://www.amazon.com/dp/B000WTB67K?tag=ohmsavvy-20",
  },
  {
    badge: "Best Budget Battery Checker",
    // Specs per innova.com (Innova 3320 product page + FAQs) and the official Amazon listing; CAT I and the 1.5/6/9/12V battery-load positions are read off the meter face. Photo: Amazon main image of B000EVYGZA, shows "INNOVA 3320". Amazon-buyable 2026-10-24.
    name: "Innova 3320",
    image: "https://m.media-amazon.com/images/I/81w4giNVNoL._AC_SL1500_.jpg",
    rating: 4.2,
    bottomLine: "A simple auto-ranging meter with green/yellow/red battery-load LEDs that make quick battery checks easy.",
    verdict:
      "The 3320 keeps things simple: auto-ranging DC/AC volts, resistance, diode and continuity, AC/DC milliamps and a 10 A DC input, plus a battery-load test with color LEDs (Innova calls it a \"small battery load test\"; the dial has 1.5, 6, 9 and 12 V positions). The 10 MΩ input is ECU-safe. It has no RPM, temperature or Min/Max, it's marked only CAT I, and the 10 A input is unfused (15 seconds on, 15 minutes off).",
    specs: [
      { label: "Accuracy", value: "True RMS not stated" },
      { label: "Safety rating", value: "CAT I (marked on meter)" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Quick battery and fuse checks" },
    ],
    pros: ["Color LED battery-load test", "Auto-ranging and easy for beginners", "ECU-safe 10 MΩ input"],
    cons: ["CAT I only: keep it off mains wiring", "No RPM, temperature or Min/Max"],
    ctaHref: "https://www.amazon.com/dp/B000EVYGZA?tag=ohmsavvy-20",
  },
  {
    badge: "Best Guided Battery & Charging Tests",
    // Specs per powerprobe.com (DM300AUTO page) and the DM300AUTO User Manual (spec tables, 2-year warranty). Photo: Amazon main image of B0DNTZQGJ9, shows "DM300AUTO". Amazon-buyable 2026-10-24 (sold by ForgeLane Group).
    name: "Power Probe DM300AUTO",
    image: "https://m.media-amazon.com/images/I/51RQLllbWGL._SL1000_.jpg",
    rating: 4.3,
    bottomLine: "An automotive meter that walks you through cranking-voltage and alternator tests and reads current through a fuse without pulling it.",
    verdict:
      "The DM300AUTO's guided modes are the selling point: a cranking-voltage test and normal or smart alternator charging tests for 12 V and 24 V systems, each with on-screen pass/fail, plus a fuse-current mode that estimates current through MINI, ATC and MAXI fuses up to 80 A from the voltage drop. It's True RMS, CAT III 1000V / CAT IV 600V, with a 6,000-count color screen and 30 A in-line current with the 30 A probe. The trade-offs are basic: voltage accuracy is ±(2% + 3 digits), there's no RPM, temperature or Min/Max, and it costs a lot more than a regular meter.",
    specs: [
      { label: "Accuracy", value: "True RMS, ±(2% + 3) voltage" },
      { label: "Safety rating", value: "CAT III 1000V / CAT IV 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Battery, starter and alternator checks" },
    ],
    pros: ["Guided cranking and alternator tests with pass/fail", "Reads current through fuses without removing them", "30 A in-line current with the 30 A probe"],
    cons: ["Coarse ±2% voltage accuracy for the price", "No RPM, temperature or Min/Max"],
    ctaHref: "https://www.amazon.com/dp/B0DNTZQGJ9?tag=ohmsavvy-20",
  },
  {
    badge: "Most Rugged",
    // Specs per powerprobe.com (DM600MAX page) and the DM600MAX User Manual (IP67, 0.03% DCV, 400.0 µA range, 2-year warranty). Conflict: the manual lists the 30A probe as optional; Amazon says it's included. Photo: Amazon main image of B0DWTD82L8, shows "DM600MAX". Amazon-buyable 2026-10-24.
    name: "Power Probe DM600MAX",
    image: "https://m.media-amazon.com/images/I/51-MwANUKeL._SL1000_.jpg",
    rating: 4.5,
    bottomLine: "An IP67, True RMS shop meter with 0.03% DC accuracy, LoZ, Bluetooth logging and temperature to 1,200 °C.",
    verdict:
      "The DM600MAX is a high-end general meter that Power Probe sells to automotive techs. It's IP67 and drop-rated to 4 ft, True RMS, with a 4,000-count (40,000 high-resolution) color screen, DC voltage accuracy as good as ±(0.03% + 1), a 400.0 µA range for parasitic-draw work, LoZ for ghost voltages, frequency and duty cycle to 100 kHz, Min/Max/Average, Peak Hold, 40,000-reading memory and Bluetooth to the Power Probe Link app. It has no RPM or dwell, and the 30 A probe is listed as optional in the manual even though the Amazon listing says it's included.",
    specs: [
      { label: "Accuracy", value: "True RMS, ±(0.03% + 1) DC" },
      { label: "Safety rating", value: "CAT III 1000V / CAT IV 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Pro techs who need a tough meter" },
    ],
    pros: ["IP67 and 4 ft drop rating", "µA range, LoZ and Bluetooth logging", "Temperature to 1,200 °C with included thermocouple"],
    cons: ["Costs more than most automotive meters", "No RPM or dwell functions"],
    ctaHref: "https://www.amazon.com/dp/B0DWTD82L8?tag=ohmsavvy-20",
  },
  {
    badge: "Best Engine Analyzer Under $60",
    // Specs per the official Amazon listing (no BTMETER maker page found). The listing gives RPM as 600–12,000 in one place and 300–1,200 in another; the BT-705A inductive clamp is NOT included. Photo: Amazon main image of B07WVX4L8K, shows "BTMETER BT-770K". Amazon-buyable 2026-10-24.
    name: "BTMETER BT-770K",
    image: "https://m.media-amazon.com/images/I/71URv9nbd0L._SL1500_.jpg",
    rating: 4.2,
    bottomLine: "True RMS plus dwell, pulse width, duty cycle and RPM (with an extra clamp) at a budget price.",
    verdict:
      "The BT-770K packs automotive functions into a 6,000-count True RMS meter: dwell for 4/5/6/8 cylinders, 0.1–10 ms injector pulse width, duty cycle, temperature with the included thermocouple, 20 A current, Min/Max with peak hold and NCV, plus a rear magnet and auto backlight for under-hood work. RPM needs BTMETER's BT-705A inductive clamp, which isn't in the box, and the listing gives two different RPM ranges. It's marked CAT III 1000V. All specs come from the Amazon listing because BTMETER has no product page.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 1000V (marked on meter)" },
      { label: "Auto-ranging", value: "Yes (manual override)" },
      { label: "Best for", value: "Budget engine diagnostics" },
    ],
    pros: ["Dwell, pulse width and duty cycle", "20 A current and temperature", "Magnet and auto backlight for under-hood use"],
    cons: ["RPM clamp sold separately", "Specs come only from the Amazon listing, which contradicts itself in places"],
    ctaHref: "https://www.amazon.com/dp/B07WVX4L8K?tag=ohmsavvy-20",
  },
  {
    badge: "Cheapest With RPM & Dwell",
    // Specs per the official Amazon listing (no ANENG maker spec page found); CAT III 600V / CAT II 1000V and dial ranges read off the meter face. Photo: Amazon main image of B0DMK53DQC, shows "ANENG SZ26". Amazon-buyable 2026-10-24.
    name: "ANENG SZ26",
    image: "https://m.media-amazon.com/images/I/71NjO8Jf10L._SL1500_.jpg",
    rating: 3.9,
    bottomLine: "An old-school manual-range engine analyzer with RPM and dwell for 4, 6 and 8 cylinders, plus a big probe kit.",
    verdict:
      "The SZ26 is a classic engine-analyzer layout: a 1,999-count manual-ranging meter with RPM (500–10,000) and dwell for 4, 6 and 8-cylinder engines, duty cycle, DC/AC voltage, DC current to 10 A, resistance, diode and continuity. It comes with alligator clips, back-probe pins and piercing probes. It has no auto-ranging, AC current, Min/Max or listed True RMS, ANENG doesn't say how RPM is picked up, and the specs come only from the Amazon listing.",
    specs: [
      { label: "Accuracy", value: "True RMS not stated" },
      { label: "Safety rating", value: "CAT III 600V / CAT II 1000V" },
      { label: "Auto-ranging", value: "No (manual)" },
      { label: "Best for", value: "Older carbureted cars and small engines" },
    ],
    pros: ["RPM and dwell for 4/6/8 cylinders", "Big accessory kit with back-probe pins", "Very low price"],
    cons: ["Manual ranging and only 1,999 counts", "No AC current or Min/Max"],
    ctaHref: "https://www.amazon.com/dp/B0DMK53DQC?tag=ohmsavvy-20",
  },
  {
    badge: "Cheapest Glovebox Meter",
    // Specs per astroai.com (AM33D page: CAT II 600V / CAT III 300V, manual range, 2000 counts, not True RMS) and the official Amazon listing. Photo: Amazon main image of B01ISAMUA6, shows "AstroAI AM33D". Amazon-buyable 2026-10-24.
    name: "AstroAI AM33D",
    image: "https://m.media-amazon.com/images/I/71+FegWytVL._SL1500_.jpg",
    rating: 3.8,
    bottomLine: "A basic manual-range meter for checking battery voltage, fuses and continuity on the road.",
    verdict:
      "The AM33D is a 2,000-count manual-ranging meter for basic checks: DC and AC voltage to 600 V, DC current from a 2000 µA range up to 10 A, resistance, diode and continuity, with a backlight and data hold. That covers resting battery voltage, charging voltage and blown fuses. It can't measure AC current and has no auto-ranging, Min/Max, temperature or automotive functions. AstroAI rates it CAT II 600V / CAT III 300V.",
    specs: [
      { label: "Accuracy", value: "Average-responding (not True RMS)" },
      { label: "Safety rating", value: "CAT II 600V / CAT III 300V" },
      { label: "Auto-ranging", value: "No (manual)" },
      { label: "Best for", value: "Glovebox battery and fuse checks" },
    ],
    pros: ["Very low price", "Backlit display with data hold", "2000 µA range for small current checks"],
    cons: ["Manual ranging with no Min/Max to catch cranking dips", "No AC current or automotive functions"],
    ctaHref: "https://www.amazon.com/dp/B01ISAMUA6?tag=ohmsavvy-20",
  },
  {
    badge: "Best Under $15",
    // Specs per the official Amazon listing (accuracy table, CAT III 600V); no KM100 page on kaiweets.com. Photo: Amazon main image of B08CX9W7G3, shows "KAIWEETS KM100". Amazon-buyable 2026-10-24.
    name: "KAIWEETS KM100",
    image: "https://m.media-amazon.com/images/I/81AI4HcSdBL._SL1500_.jpg",
    rating: 3.8,
    bottomLine: "A cheap CAT III 600V manual-range meter with a case, good enough for battery voltage and fuse checks.",
    verdict:
      "The KM100 is a 2,000-count manual-ranging meter: DC and AC voltage to 600 V at ±(1.0% + 5), DC current at 20 mA, 200 mA and 10 A, resistance, diode and continuity, with a backlight, data hold, double fuses and a carrying case. It's rated CAT III 600V, higher than most meters at this price. It can't measure AC current and has no auto-ranging, Min/Max, temperature or automotive functions, and KAIWEETS's own site doesn't list it, so the specs come from the Amazon listing.",
    specs: [
      { label: "Accuracy", value: "±(1.0% + 5) DC V (True RMS not stated)" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "No (manual)" },
      { label: "Best for", value: "Basic battery and fuse checks" },
    ],
    pros: ["Lowest price here", "CAT III 600V with double fuses", "Comes with a carrying case"],
    cons: ["Manual ranging, 2,000 counts", "No AC current, Min/Max or temperature"],
    ctaHref: "https://www.amazon.com/dp/B08CX9W7G3?tag=ohmsavvy-20",
  },
];
