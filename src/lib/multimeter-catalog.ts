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
    badge: "Best Budget Meter for Electronics",
    // Specs per meters.uni-trend.com (UT61+ series page) and the UT61B+/D+/E+ user manual. Photo: Amazon main image of B093BS9MYM, shows "UT61E+ ... 22000 Counts". Amazon-buyable 2026-10-24.
    name: "UNI-T UT61E+",
    image: "https://m.media-amazon.com/images/I/61p7ga5bJnL._SL1500_.jpg",
    rating: 4.5,
    bottomLine: "A budget 22,000-count True RMS meter with 0.01 µA and 0.01 Ω resolution, REL mode and a USB link.",
    verdict:
      "The UT61E+ is UNI-T's 22,000-count version of the UT61+ series: True RMS, CAT III 1000V / CAT IV 600V, with a 220.00 µA range at 0.01 µA resolution and a 220.00 Ω range at 0.01 Ω (±0.5% + 10 digits). REL mode subtracts lead resistance, which UNI-T's manual tells you to do for low-ohm readings. It also adds capacitance to 220 mF, frequency to 220 MHz, hFE, NCV and a USB cable for PC readout. It has no temperature function (that's the UT61D+), and UNI-T doesn't publish its burden voltage.",
    specs: [
      { label: "Accuracy", value: "True RMS, ±(0.05%+5) DC V" },
      { label: "Safety rating", value: "CAT III 1000V / CAT IV 600V" },
      { label: "Auto-ranging", value: "Yes (manual override)" },
      { label: "Best for", value: "Arduino, hobby electronics, PCB repair" },
    ],
    pros: ["0.01 µA and 0.01 Ω resolution at a budget price", "REL mode to zero test-lead resistance", "USB PC link, capacitance to 220 mF, frequency to 220 MHz"],
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
    badge: "Best Budget Bluetooth Logger",
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
    bottomLine: "A budget True RMS meter with a 200.00 µA range, 0.01 Ω resolution, Bluetooth and offline logging.",
    verdict:
      "The OW18E is a 19,999-count (sold as 20,000) True RMS meter. Its 200.00 µA range resolves 0.01 µA at ±(0.5% + 10 digits) DC and its 200.00 Ω range resolves 0.01 Ω. It adds NCV, a flashlight, Type-K temperature, capacitance to 20 mF and a 20 A range, plus BLE 4.0 and offline recording on the E model. The case is marked 1000V CAT III / 600V CAT IV, but OWON's page doesn't state a rating and doesn't publish burden voltage. Amazon showed only one in stock when we checked.",
    specs: [
      { label: "Accuracy", value: "True RMS, ±(0.1%+2) DC V" },
      { label: "Safety rating", value: "1000V CAT III / 600V CAT IV (case marking)" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Arduino and hobby electronics on a budget" },
    ],
    pros: ["0.01 µA and 0.01 Ω resolution at a budget price", "Bluetooth with offline recording", "NCV, flashlight and temperature included"],
    cons: ["Low stock on Amazon at last check", "OWON publishes no burden voltage or CAT rating"],
    ctaHref: "https://www.amazon.com/dp/B0B2QVQZR6?tag=ohmsavvy-20",
  },
  {
    badge: "Cheapest 20,000-Count µA Meter",
    // Specs per kaiweets.com (HT118E page, "Upgraded Specification"). Per-range resolution isn't published; 0.01 µA / 0.01 Ω follow from 200 µA / 200 Ω ranges at 20,000 counts. Photo: Amazon main image of B0B7WFPB4T, shows "HT118E ... 20000 Counts". Amazon-buyable 2026-10-24.
    name: "KAIWEETS HT118E",
    image: "https://m.media-amazon.com/images/I/81lmVClgFiL._SL1500_.jpg",
    rating: 4.2,
    bottomLine: "A budget True RMS meter with 20,000 counts and a 200 µA range, but no relative mode for low-ohm work.",
    verdict:
      "The HT118E has a 20,000-count display, CAT III 1000V / CAT IV 600V and a 200 µA range at ±(0.5% + 5 digits) DC. At 20,000 counts that implies 0.01 µA resolution, though KAIWEETS doesn't print it. It covers temperature, capacitance, frequency, NCV and continuity, with lit input jacks and a flashlight. Its 200 Ω range is only ±(1.0% + 15 digits) and KAIWEETS lists no relative mode, so you have to subtract lead resistance yourself. That makes it better for sleep-current checks than for milliohm work.",
    specs: [
      { label: "Accuracy", value: "True RMS, ±(0.08%+5) DC V" },
      { label: "Safety rating", value: "CAT III 1000V / CAT IV 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Beginner Arduino and µA checks" },
    ],
    pros: ["200 µA range with 20,000 counts at a budget price", "CAT III 1000V / CAT IV 600V", "Lit input jacks, NCV and flashlight"],
    cons: ["No relative mode listed for zeroing test leads", "Per-range resolution and burden voltage not published"],
    ctaHref: "https://www.amazon.com/dp/B0B7WFPB4T?tag=ohmsavvy-20",
  },
  {
    badge: "Best Budget Klein True RMS",
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
    badge: "Best Budget Electrician's Meter",
    // Specs per kleintools.com (MM720 page) and the MM720 instruction manual (frequency to 500 kHz per manual; Klein's 04/26 selection guide shows 50 kHz). Photo: Amazon main image of B0B57PDQJC, meter face reads "MM720 Digital Multi-Meter ... TrueRMS ... CAT IV 600V CAT III 1000V". Amazon-buyable 2026-10-24 (sold by Amazon.com, $99.96).
    name: "Klein Tools MM720",
    image: "https://m.media-amazon.com/images/I/61Ba-L7Q2RL._SL1500_.jpg",
    rating: 4.6,
    bottomLine: "CAT IV 600V, 1000V, LoZ and True RMS at a budget price, the most panel-ready meter in this tier.",
    verdict:
      "The MM720 is rated CAT IV 600V / CAT III 1000V and measures up to 1000V AC/DC, with a LoZ mode for ghost voltages. It is True RMS, auto-ranging and 6,000-count, and the reverse-contrast display adjusts itself to the light. Current runs from a 600.0 µA range (0.1 µA) to 10 A. It adds 60 MΩ resistance, capacitance to 6,000 µF, temperature to 1832°F, IP42 and a 2 m drop rating, and a carrying pouch comes in the box. Klein lists no NCV.",
    specs: [
      { label: "Accuracy", value: "True RMS, 6,000-count" },
      { label: "Safety rating", value: "CAT IV 600V / CAT III 1000V" },
      { label: "Auto-ranging", value: "Yes (manual RANGE button)" },
      { label: "Best for", value: "Electricians working panels and feeders" },
    ],
    pros: ["CAT IV 600V and 1000V AC/DC", "LoZ mode for ghost voltages", "IP42, 2 m drop rating and pouch included"],
    cons: ["Priced at the top of the budget tier", "No non-contact voltage detection"],
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
    bottomLine: "A low-cost Klein for checking outlets, batteries and continuity, as long as you're happy picking ranges yourself.",
    verdict:
      "The MM325 is a manual-ranging, 2,000-count meter rated CAT III 600V. It reads AC/DC voltage to 600V, DC current from a 200 µA range up to 10 A, and resistance to 2 MΩ, and it has diode, continuity and a 1.5V/9V battery test. Lead-Alert lights, a backlight and a 2 m drop rating come from Klein's pricier meters. Klein doesn't claim True RMS for it, it can't measure AC current, and you have to choose each range on the dial.",
    specs: [
      { label: "Accuracy", value: "Not True RMS (2,000-count)" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "No (manual ranging)" },
      { label: "Best for", value: "Basic household and battery checks" },
    ],
    pros: ["Low cost from a major tool brand", "Battery test for 1.5V and 9V cells", "Lead-Alert lights and backlit display"],
    cons: ["Manual ranging and not True RMS", "No AC current, capacitance or temperature"],
    ctaHref: "https://www.amazon.com/dp/B0B57L9FNL?tag=ohmsavvy-20",
  },
  {
    badge: "Best Low-Cost True RMS",
    // Specs per the KAIWEETS HT118A user manual (spec tables: 1000V DC / 750V AC, 600 µA range at 0.1 µA, 2 x AA) and kaiweets.com (3-year warranty). kaiweets.com product text says 600V AC/DC, which conflicts with the manual, Amazon listing and meter face. Photo: Amazon main image of B07SHLS639, shows "KAIWEETS HT118A ... 6000 Counts TRUE RMS". Amazon-buyable 2026-10-24 (sold by KAIWEETS Direct, $37.99).
    name: "KAIWEETS HT118A",
    image: "https://m.media-amazon.com/images/I/81THgD001tL._SL1500_.jpg",
    rating: 4.4,
    bottomLine: "True RMS, CAT III 1000V and µA current with NCV and temperature at a low price.",
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
    cons: ["Expensive for a single-function-group meter", "Limited new Amazon stock from a third-party seller"],
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
    cons: ["Expensive", "No voltage measurement"],
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
    badge: "Best Budget Engine Analyzer",
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
    badge: "Best Ultra-Budget Pick",
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
  {
    badge: "Best Fluke Utility Meter with VCHEK",
    // Specs per fluke.com (Fluke 113 product/spec page) and the official Amazon listing (B004Q05ODI). Conflict: fluke.com gives IEC 61010-2-033 CAT IV 600 V and the meter is printed "CAT IV 600V", but an Amazon bullet says CAT III 600 V / CAT IV 300 V; we use Fluke. True RMS per the Amazon title and the meter's front label (fluke.com spec page doesn't state it). Photo: Amazon main image of B004Q05ODI, shows "FLUKE 113 TRUE RMS MULTIMETER", VCHEK and LOW IMPEDANCE. Amazon-buyable 2026-10-27.
    name: "Fluke 113",
    image: "https://m.media-amazon.com/images/I/61L0VkFzIZL._SL1500_.jpg",
    rating: 4.4,
    bottomLine: "A 6000-count utility meter built around VCHEK: one LoZ dial position that reads voltage and drops to continuity when the circuit is dead.",
    verdict:
      "The Fluke 113 is a two-jack, 6000-count meter for utility and service work. Its VCHEK position is a low-impedance (about 3 kΩ) voltage test on 6, 60 and 600 V ranges at ±(2.0% + 3), and it switches to a continuity check when no voltage is present, which helps sort ghost voltage from a live feed. It also measures resistance to 60 kΩ and capacitance up to 9999 µF, with min/max and a backlit display, and Fluke rates it CAT IV 600V. It has no current ranges at all, and Fluke warns that LoZ readings phase-to-earth can trip a GFCI or RCD.",
    specs: [
      { label: "Accuracy", value: "True RMS, ±(2.0% + 3) VCHEK volts" },
      { label: "Safety rating", value: "CAT IV 600V (per Fluke)" },
      { label: "Auto-ranging", value: "Yes (manual override)" },
      { label: "Best for", value: "Utility and ghost-voltage checks" },
    ],
    pros: ["VCHEK LoZ voltage test that falls back to continuity", "Capacitance up to 9999 µF on a two-jack meter", "Fluke rates it CAT IV 600V"],
    cons: ["No current measurement", "Resistance tops out at 60 kΩ", "Amazon listing quotes a lower CAT rating than Fluke does"],
    ctaHref: "https://www.amazon.com/dp/B004Q05ODI?tag=ohmsavvy-20",
  },
  {
    badge: "Best Go/No-Go Electrician Meter",
    // Specs per fluke.com (Fluke 114 product/spec page) and the official Amazon listing (B000IZ9FD0). fluke.com's overview mentions "current" but its spec table lists no current ranges and the meter has only COM/+ jacks; we treat it as voltage/resistance only. Weight: Fluke 550 g, Amazon 0.51 kg. Photo: Amazon main image of B000IZ9FD0, shows "FLUKE 114 TRUE RMS MULTIMETER", AUTO-V LoZ and CAT III 600V. Amazon-buyable 2026-10-27.
    name: "Fluke 114",
    image: "https://m.media-amazon.com/images/I/61iC35IcD9L._SL1500_.jpg",
    rating: 4.5,
    bottomLine: "A True RMS voltage-and-continuity meter with AutoVolt LoZ, made for quick go/no-go checks on 600 V circuits.",
    verdict:
      "The Fluke 114 does voltage, resistance and continuity, and nothing else. AutoVolt picks AC or DC on its own on a low-impedance input, so ghost voltage from long cable runs reads near zero instead of fooling you. The regular ranges are better: DC volts at ±(0.5% + 2) and True RMS AC volts at ±(1.0% + 3) from 45 to 500 Hz, plus resistance to 40 MΩ. Min/Max/Average with elapsed time, a white LED backlight and a 3-year warranty round it out. There's no current, capacitance or temperature, and it's rated CAT III 600V, not CAT IV.",
    specs: [
      { label: "Accuracy", value: "True RMS, ±(0.5% + 2) DC V" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes (manual override)" },
      { label: "Best for", value: "Electrician go/no-go voltage checks" },
    ],
    pros: ["AutoVolt AC/DC selection on a LoZ input", "Min/Max/Average with elapsed time", "Resistance up to 40 MΩ"],
    cons: ["No current or capacitance", "CAT III 600V only", "3-year warranty, not lifetime"],
    ctaHref: "https://www.amazon.com/dp/B000IZ9FD0?tag=ohmsavvy-20",
  },
  {
    badge: "Best No-Frills Fluke 170 Series",
    // Specs per fluke.com (Fluke 175 product/spec page) and the official Amazon listing (B00012Z0UM, "Fluke 175 ESFP"). 6,000 counts and 33-segment bar graph per the Fluke 170 Series detailed specifications (Pub 10824-eng, farnell.com/datasheets/2631819.pdf), which list the backlight on the 177 and 179 only; the photo shows no backlight button. Photo: Amazon main image of B00012Z0UM, shows "FLUKE 175 TRUE RMS MULTIMETER" with test leads and "600V CAT IV / 1000V CAT III". Amazon-buyable 2026-10-27.
    name: "Fluke 175",
    image: "https://m.media-amazon.com/images/I/71MHzMKDxPL._SL1500_.jpg",
    rating: 4.5,
    bottomLine: "The entry 170-series Fluke: True RMS volts and amps to 10 A, CAT IV 600V and a lifetime warranty, minus the 177's backlight.",
    verdict:
      "The Fluke 175 covers the full general-purpose set: True RMS AC volts and amps, DC volts at ±(0.15% + 2), current to 10 A on fused 400 mA and 10 A jacks, resistance to 50 MΩ, capacitance to 10,000 µF and frequency to 100 kHz. Display Hold, Auto Hold and Min/Max-average recording are there, and it carries CAT III 1000V / CAT IV 600V ratings with a lifetime warranty. Compared with the 177 it gives up some DC accuracy (0.15% against 0.09%) and Fluke doesn't list a backlight. Battery life is about 200 hours on a 9 V cell.",
    specs: [
      { label: "Accuracy", value: "True RMS, ±(0.15% + 2) DC V" },
      { label: "Safety rating", value: "CAT III 1000V / CAT IV 600V" },
      { label: "Auto-ranging", value: "Yes (manual override)" },
      { label: "Best for", value: "General electrical and electronic repair" },
    ],
    pros: ["True RMS volts and amps, current to 10 A", "CAT III 1000V / CAT IV 600V", "Lifetime warranty"],
    cons: ["No backlight (the 177 and 179 have one)", "No temperature (that's the 179)", "About 200 h battery life on a 9 V"],
    ctaHref: "https://www.amazon.com/dp/B00012Z0UM?tag=ohmsavvy-20",
  },
  {
    badge: "Best Backlit Everyday Fluke",
    // Specs per fluke.com (Fluke 177 product/spec page) and the official Amazon listing (B005WFW26S). Amazon's "1.81 g" item weight is a listing error; Fluke states 420 g. Photo: Amazon main image of B005WFW26S, shows "FLUKE 177 TRUE RMS MULTIMETER" with backlight button and "600V CAT IV / 1000V CAT III". Amazon-buyable 2026-10-27.
    name: "Fluke 177",
    image: "https://m.media-amazon.com/images/I/71RYn-8eR1L._SL1500_.jpg",
    rating: 4.6,
    bottomLine: "The middle 170-series meter: 0.09% DC volts, True RMS to 10 A and a backlight, without paying for the 179's thermometer.",
    verdict:
      "The Fluke 177 adds a backlight and tighter DC accuracy, ±(0.09% + 2), to the 175's feature set. It's a 6000-count True RMS meter with a 33-segment bar graph, AC and DC current to 10 A, resistance to 50 MΩ, capacitance to 10,000 µF and frequency to 100 kHz, plus Hold, Auto Hold and Min/Max/Average. It's rated CAT III 1000V / CAT IV 600V and carries a lifetime warranty. There's no temperature input, no LoZ and no low-pass filter, so it's a general troubleshooting meter rather than a VFD or HVAC tool.",
    specs: [
      { label: "Accuracy", value: "True RMS, ±(0.09% + 2) DC V" },
      { label: "Safety rating", value: "CAT III 1000V / CAT IV 600V" },
      { label: "Auto-ranging", value: "Yes (manual override)" },
      { label: "Best for", value: "Everyday electrical troubleshooting" },
    ],
    pros: ["0.09% basic DC volts accuracy", "Backlight and fast 33-segment bar graph", "Lifetime warranty"],
    cons: ["No temperature (the 179 has it)", "No LoZ or low-pass filter", "9 V battery, about 200 h"],
    ctaHref: "https://www.amazon.com/dp/B005WFW26S?tag=ohmsavvy-20",
  },
  {
    badge: "Best Rugged Industrial Meter",
    // Specs per fluke.com (Fluke 87V MAX product/spec page) and the official Amazon listing (B07YQSBJSB, bare meter with TL175 leads; B0B6R4J4RP is the MC4/solar lead kit). LoZ isn't listed by Fluke for this model. Photo: Amazon main image of B07YQSBJSB, shows "FLUKE 87V MAX TRUE RMS MULTIMETER", IP67 and "1000V CAT III / 600V CAT IV". Amazon-buyable 2026-10-27.
    name: "Fluke 87V MAX",
    image: "https://m.media-amazon.com/images/I/61tdkYzn87L._SL1500_.jpg",
    rating: 4.7,
    bottomLine: "The 87V's measurement set in an IP67 case rated for a 4 m drop, with 800-hour AA battery life and a backlit keypad.",
    verdict:
      "Fluke lists the 87V MAX at ±(0.05% + 1) DC volts, ±(0.7% + 4) True RMS AC volts, 0.1 µA to 10 A current, frequency to 199.99 kHz and a 19,999-count hi-res mode, plus a low-pass filter for VFD work, 250 µs Peak Min/Max and a −200 to 1090 °C temperature input with the included 80BK-A probe. It's rated CAT IV 600V / CAT III 1000V, sealed to IP67 and drop-tested to 4 m, and runs about 800 hours on three AAs. It comes with TL175 TwistGuard leads and a lifetime warranty. Fluke doesn't list LoZ, and it costs more than a standard 87V.",
    specs: [
      { label: "Accuracy", value: "True RMS, ±(0.05% + 1) DC V" },
      { label: "Safety rating", value: "CAT IV 600V / CAT III 1000V" },
      { label: "Auto-ranging", value: "Yes (manual override)" },
      { label: "Best for", value: "Industrial, outdoor and VFD work" },
    ],
    pros: ["IP67 and 4 m drop rating", "Low-pass filter, 250 µs peak capture and temperature", "About 800 h on three AA cells"],
    cons: ["No LoZ listed by Fluke", "Costs more than the standard 87V"],
    ctaHref: "https://www.amazon.com/dp/B07YQSBJSB?tag=ohmsavvy-20",
  },
  {
    badge: "Best IP67 Meter for Mining and Field Work",
    // Specs per fluke.com (Fluke 28 II product/spec page) and the official Amazon listing (B002X9ISWI; listing says the unit ships with a NIST-traceable calibration certificate; sold by a third party). Amazon's "300 g" weight conflicts with Fluke's 698.5 g with holster; we use Fluke. Not the 28 II EX (B00C2DVKPC). Photo: Amazon main image of B002X9ISWI, shows "FLUKE 28 II TRUE RMS MULTIMETER", IP67 and "1000V CAT III / 600V CAT IV". Amazon-buyable 2026-10-27.
    name: "Fluke 28 II",
    image: "https://m.media-amazon.com/images/I/71JaS21Kb0L._SL1500_.jpg",
    rating: 4.6,
    bottomLine: "An IP67, MSHA-approved True RMS meter with 87V-class volts accuracy, a low-pass filter and a 3 m drop rating.",
    verdict:
      "The Fluke 28 II publishes ±(0.05% + 1) DC volts and ±(0.7% + 4) True RMS AC volts over 15 Hz to 20 kHz, current from 0.1 µA to 10 A, frequency to 199.99 kHz and temperature from −200 to +1090 °C with the included 80BK-A probe. It adds a low-pass filter, 250 µs peak capture, Min/Max/Avg and a 20,000-count hi-res mode. It's IP67, MSHA approved, rated CAT IV 600V / CAT III 1000V and drop-tested to 3 m, and runs 800 hours on three AAs with a lifetime warranty. Fluke doesn't list LoZ, and the Amazon offer is from a third-party seller.",
    specs: [
      { label: "Accuracy", value: "True RMS, 0.05% + 1 DC V" },
      { label: "Safety rating", value: "CAT IV 600V / CAT III 1000V" },
      { label: "Auto-ranging", value: "Yes (manual override)" },
      { label: "Best for", value: "Wet, dusty and mining sites" },
    ],
    pros: ["IP67 and MSHA approved", "Low-pass filter, peak capture and temperature", "Listing includes a NIST-traceable calibration certificate"],
    cons: ["3 m drop rating (the 87V MAX is rated 4 m)", "Third-party seller on Amazon", "No LoZ listed by Fluke"],
    ctaHref: "https://www.amazon.com/dp/B002X9ISWI?tag=ohmsavvy-20",
  },
  {
    badge: "Best Insulation Multimeter",
    // Specs per fluke.com (Fluke 1587 FC product/spec page) and the Fluke 1587 FC/1577 technical data sheet (6000-count display), plus the official Amazon listing (B017OVC2UI, bare meter; the I400, 62MAX+ and MDT kits are separate ASINs). fluke.com lists the case as both "soft" and "hard"; Amazon's 1645 g item weight conflicts with Fluke's 550 g. Photo: Amazon main image of B017OVC2UI, shows "FLUKE 1587 FC INSULATION MULTIMETER", INSULATION TEST button and "600V CAT IV / 1000V CAT III". Amazon-buyable 2026-10-27.
    name: "Fluke 1587 FC",
    image: "https://m.media-amazon.com/images/I/71XrB9ZhFwL._SL1500_.jpg",
    rating: 4.6,
    bottomLine: "A True RMS multimeter and 50–1000 V insulation tester in one, with PI/DAR tests and Fluke Connect logging to your phone.",
    verdict:
      "The 1587 FC tests insulation at 50, 100, 250, 500 and 1000 V from 0.01 MΩ to 2 GΩ, runs PI and DAR timed ratio tests, and won't start a test if it sees more than 30 V on the terminals. Over Fluke Connect it saves readings to the app with TrendIt graphs and temperature compensation. As a meter it's 6000-count True RMS with ±(0.09% + 2) DC volts, a low-pass filter for VFDs, capacitance to 9999 µF and temperature from −40 to 537 °C. It's rated CAT IV 600V / CAT III 1000V. Current tops out at 400 mA with no 10 A jack, the case is only IP40 and the warranty is 3 years.",
    specs: [
      { label: "Accuracy", value: "True RMS, ±(0.09% + 2) DC V" },
      { label: "Safety rating", value: "CAT IV 600V / CAT III 1000V" },
      { label: "Auto-ranging", value: "Yes (manual override)" },
      { label: "Best for", value: "Motor, cable and insulation testing" },
    ],
    pros: ["Insulation test 50–1000 V up to 2 GΩ with PI/DAR", "Fluke Connect wireless logging and trend graphs", "Low-pass filter and temperature input"],
    cons: ["mA current only (400 mA max), no 10 A input", "IP40 case and 3-year warranty"],
    ctaHref: "https://www.amazon.com/dp/B017OVC2UI?tag=ohmsavvy-20",
  },
  {
    badge: "Best Rugged Non-RMS Fluke",
    // Specs per fluke.com (https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-27-ii) and the official Amazon listing (B002X9IPB2, "Fluke 27II AVG Multimeter"). Average responding per the Amazon title/bullet ("AVG multimeter"); fluke.com's spec table doesn't state RMS type. Amazon overview's "Corded Electric" power source conflicts with Fluke's 3 × AA; we use Fluke. Photo: Amazon main image of B002X9IPB2, shows "FLUKE 27 II MULTIMETER", IP67 and "1000V CAT III / 600V CAT IV". Amazon-buyable 2026-10-28 (sold by Amazon.com).
    name: "Fluke 27 II",
    image: "https://m.media-amazon.com/images/I/61MXAUq8KHL._AC_SL1500_.jpg",
    rating: 4.4,
    bottomLine: "The 28 II's IP67, 3 m-drop body with average-responding AC, for harsh sites where the loads are plain sine waves.",
    verdict:
      "The Fluke 27 II is built for wet, dusty and cold work: IP67 sealing, a 3 m (10 ft) drop rating, MSHA approval and an operating range of −15 to +55 °C, with −40 °C allowed for 20 minutes. It's a 6000-count meter with DC volts at ±(0.1% + 1), AC volts at ±(0.5% + 3) across a 40 Hz to 30 kHz bandwidth, current from 0.1 µA to 10 A, capacitance to 9999 µF and frequency to 199.99 kHz. Min/Max/Avg, Relative and a backlight are included, and three AA cells last about 800 hours. AC is average responding, not True RMS, so readings on VFD outputs or other distorted waveforms will be off. If you need True RMS, look at the 28 II.",
    specs: [
      { label: "Accuracy", value: "Average responding, ±(0.1% + 1) DC V" },
      { label: "Safety rating", value: "CAT IV 600V / CAT III 1000V" },
      { label: "Auto-ranging", value: "Yes (manual RANGE)" },
      { label: "Best for", value: "Wet, dusty or cold sites with sine-wave loads" },
    ],
    pros: ["IP67, 3 m drop and MSHA approval", "0.1 µA to 10 A current and 40 Hz–30 kHz AC bandwidth", "Limited lifetime warranty, about 800 h on 3 × AA"],
    cons: ["Average responding, not True RMS", "No temperature function", "Heavy at about 700 g with holster"],
    ctaHref: "https://www.amazon.com/dp/B002X9IPB2?tag=ohmsavvy-20",
  },
  {
    badge: "Best Basic Insulation Multimeter",
    // Specs per fluke.com (https://www.fluke.com/en-us/product/electrical-testing/insulation-testers/fluke-1577) and the official Amazon listing (B000VRJFPI). Conflict: an Amazon bullet says "550V and 1000V" test voltages; Fluke, the Amazon description and the dial say 500 V and 1000 V, which we use. fluke.com's spec table also lists 50/100/250 V rows (shared with the 1587), but the 1577 tests only at 500 V and 1000 V. Display count not stated. Photo: Amazon main image of B000VRJFPI, shows "FLUKE 1577 INSULATION MULTIMETER" and the 500 V / 1000 V insulation position. Amazon-buyable 2026-10-28 (Granny's Picks, fulfilled by Amazon; other new offers).
    name: "Fluke 1577",
    image: "https://m.media-amazon.com/images/I/51EaCLDWKzL._AC_SL1181_.jpg",
    rating: 4.5,
    bottomLine: "A True RMS multimeter with a 500 V / 1000 V insulation tester built in, for motor, cable and switchgear checks.",
    verdict:
      "The Fluke 1577 combines a True RMS multimeter with an insulation tester. It applies 500 V or 1000 V and reads insulation resistance from 0.1 to 600 MΩ at ±(2.0% + 5). It won't start a test if more than 30 V is on the circuit, and it discharges capacitive voltage when the test ends. A remote probe is included. The meter side covers volts to 1000 V (DC ±(0.2% + 2)), current to 400 mA and resistance to 50 MΩ, and Fluke rates it CAT IV 600V / CAT III 1000V with a 3-year warranty. Four AA cells give about 1000 insulation tests. Compared with the 1587 FC it has only two test voltages, a 600 MΩ ceiling, no 10 A input and IP40 sealing.",
    specs: [
      { label: "Accuracy", value: "True RMS, ±(0.2% + 2) DC V" },
      { label: "Safety rating", value: "CAT IV 600V / CAT III 1000V" },
      { label: "Auto-ranging", value: "Yes (manual RANGE)" },
      { label: "Best for", value: "Motor, cable and switchgear insulation checks" },
    ],
    pros: ["500 V and 1000 V insulation tests to 600 MΩ", "Live-circuit lockout above 30 V and auto discharge", "About 1000 insulation tests on 4 × AA"],
    cons: ["Only two test voltages and a 600 MΩ ceiling", "Current tops out at 400 mA", "IP40 only; 3-year warranty"],
    ctaHref: "https://www.amazon.com/dp/B000VRJFPI?tag=ohmsavvy-20",
  },
  {
    badge: "Best mA Source Without the 789's Price",
    // Specs per fluke.com (https://www.fluke.com/en-us/product/calibration-tools/ma-loop-calibrators/fluke-787b) and the official Amazon listing (B071ZPSQ88). fluke.com doesn't state a built-in 24 V loop supply or HART resistor for the 787B (the 789 has both); simulate mode needs an external 15–48 V supply. Display count not stated. Amazon bullet gives only "CAT III 1000 V"; Fluke and the meter say CAT IV 600V / CAT III 1000V. Photo: Amazon main image of B071ZPSQ88, shows "FLUKE 787B PROCESSMETER" and "OUTPUT 0-24mA SOURCE / SIMULATE". Amazon-buyable 2026-10-28 (buy box seller "Amazan-Warehouse", a third party; other new offers).
    name: "Fluke 787B",
    image: "https://m.media-amazon.com/images/I/613oILGqB5L._SL1000_.jpg",
    rating: 4.6,
    bottomLine: "A True RMS ProcessMeter that measures, sources and simulates 0-20 or 4-20 mA, without the 789's built-in loop supply.",
    verdict:
      "The Fluke 787B puts an mA loop calibrator into a 1000 V True RMS multimeter. It sources or simulates 0–20 or 4–20 mA (to 24 mA over-range) at ±0.05% of span, drives up to 1,200 Ω at 20 mA, and steps or ramps the output automatically. The 0% and 100% keys jump straight to span ends. On the meter side you get DC volts at ±(0.1% + 1), a 30 mA range at ±(0.05% + 2), a 1 A range (0.44 A continuous) and frequency to 20 kHz on a backlit dual display. Fluke lists CAT IV 600V / CAT III 1000V and a 3-year warranty. Unlike the 789, Fluke doesn't list a built-in 24 V loop supply, so simulate mode needs an external 15–48 V supply. There's no 10 A input, and sourcing at 12 mA runs about 10 hours on 4 × AA.",
    specs: [
      { label: "Accuracy", value: "True RMS; 0.05% of span mA source" },
      { label: "Safety rating", value: "CAT IV 600V / CAT III 1000V" },
      { label: "Auto-ranging", value: "Yes (manual RANGE)" },
      { label: "Best for", value: "Sourcing and simulating 4-20 mA signals" },
    ],
    pros: ["Sources and simulates 0-20 / 4-20 mA at 0.05% of span", "Auto step, ramp and 0%/100% span keys", "True RMS DMM with a 30 mA range at ±(0.05% + 2)"],
    cons: ["No built-in 24 V loop supply listed (the 789 has one)", "Current tops out at 1 A, no 10 A input", "About 10 h battery life while sourcing"],
    ctaHref: "https://www.amazon.com/dp/B071ZPSQ88?tag=ohmsavvy-20",
  },
  {
    badge: "Best Average-Responding Fluke Workhorse",
    // Specs per fluke.com (https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-77-iv) and the official Amazon listing (B000U8WQ4U, "Fluke 77-4 Automotive Digital Multimeter"). fluke.com says "Average responding AC measurements", so not True RMS. Warranty, IP and drop not stated on the fluke.com page. Photo: Amazon main image of B000U8WQ4U, shows "FLUKE 77 IV MULTIMETER" and "600V CAT IV / 1000V CAT III". Amazon-buyable 2026-10-28 (ships from Amazon, sold by kandk-co).
    name: "Fluke 77 IV",
    image: "https://m.media-amazon.com/images/I/61Dk7I2rw-L._SL1500_.jpg",
    rating: 4.3,
    bottomLine: "The updated Fluke 77: a 6000-count, 10 A, 1000 V meter with capacitance and a backlight, but average-responding AC.",
    verdict:
      "The Fluke 77 IV replaces the original 77. It reads 6000 counts with a fast 33-segment bar graph and covers DC volts to 1000 V at ±(0.3% + 1), current to 10 A on fused 400 mA and 10 A inputs, resistance to 50 MΩ, capacitance to 9,999 µF and frequency to about 100 kHz. Min/Max, a backlight and auto or manual ranging are included, and Fluke rates it CAT III 1000V / CAT IV 600V. A 9 V battery lasts about 400 hours. AC is average responding, not True RMS, and AC volts at ±(2.0% + 2) is loose. Amazon lists it as an automotive meter, but it has no RPM, duty cycle or temperature functions, which the 88V has.",
    specs: [
      { label: "Accuracy", value: "Average responding, ±(0.3% + 1) DC V" },
      { label: "Safety rating", value: "CAT III 1000V / CAT IV 600V" },
      { label: "Auto-ranging", value: "Yes (manual RANGE)" },
      { label: "Best for", value: "General electrical and electronic repair" },
    ],
    pros: ["10 A current on fused 400 mA and 10 A inputs", "Capacitance to 9,999 µF and frequency to ~100 kHz", "CAT III 1000V / CAT IV 600V, about 400 h on a 9 V"],
    cons: ["Average responding, not True RMS", "AC volts only ±(2.0% + 2)", "No temperature, duty cycle or RPM despite the 'automotive' listing"],
    ctaHref: "https://www.amazon.com/dp/B000U8WQ4U?tag=ohmsavvy-20",
  },
  {
    badge: "Best Wireless Fluke Connect Meter",
    // Specs per fluke.com (https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/fluke-3000-fc) and the official Amazon listing (B00JJQ3Y6S). fluke.com lists DC V accuracy as 0.09% + 2 and 0.15% + 2 without mapping them to ranges; we quote the best figure. Current is 400 mA max (no 10 A jack, confirmed on the photo). Drop rating not stated. Temperature needs the separate t3000 FC module. Photo: Amazon main image of B00JJQ3Y6S, shows "FLUKE 3000 FC TRUE RMS MULTIMETER" with TL175 leads and alligator clips. Amazon-buyable 2026-10-28 (sold by Amazon.com).
    name: "Fluke 3000 FC",
    image: "https://m.media-amazon.com/images/I/81DO0fA5YCL._AC_SL1500_.jpg",
    rating: 4.4,
    bottomLine: "A True RMS meter that sends readings to the Fluke Connect app and shows up to three wireless modules on its own screen.",
    verdict:
      "The Fluke 3000 FC is a 6000-count True RMS meter with Fluke Connect. It sends readings to a phone up to 20 m away in open air (about 6.5 m through drywall), where you can trend and share them. It can also show its own reading plus up to three wireless modules on screen at once, which helps when the panel and the equipment are in different places. Fluke names it as the replacement for the discontinued 233 remote-display meter. DC volts reach 1000 V at a best ±(0.09% + 2), and it adds capacitance to 9999 µF, frequency to 99.99 kHz, Min/Max and a backlight. Fluke rates it CAT III 1000V / CAT IV 600V and IP54, with a 3-year warranty. Current stops at 400 mA, temperature needs the separate t3000 FC module, and there's no logging memory in the meter.",
    specs: [
      { label: "Accuracy", value: "True RMS, ±(0.09% + 2) DC V" },
      { label: "Safety rating", value: "CAT III 1000V / CAT IV 600V" },
      { label: "Auto-ranging", value: "Yes (manual RANGE)" },
      { label: "Best for", value: "Remote readings and multi-point checks via app" },
    ],
    pros: ["Fluke Connect, up to 20 m open-air range", "Shows its own reading plus three wireless modules", "IP54, 340 g, 250 h on 3 × AA"],
    cons: ["Current only to 400 mA, no 10 A input", "Temperature needs the t3000 FC module", "No in-meter logging memory"],
    ctaHref: "https://www.amazon.com/dp/B00JJQ3Y6S?tag=ohmsavvy-20",
  },
  {
    badge: "Best for 1500 V Solar Strings",
    // Specs per fluke.com (https://www.fluke.com/en-us/product/electrical-testing/digital-multimeters/283-fcpv-solar-digital-multimeter) and the official Amazon listing (B0DGBYD8ZK). KIT: no bare 283 FC is listed on Amazon.com, so this Pick is the 283 FC/PV kit (283 FC meter + a283 FC wireless 60 A AC/DC clamp + MC4 and TL175-HV leads). The meter has no current jacks; current is via the clamp only. Amazon item weight "16 ounces" conflicts with Fluke's 0.7 kg for the meter; we use Fluke. Photo: Amazon main image of B0DGBYD8ZK, a kit shot showing the "FLUKE 283 FC TRUE RMS 1500V MULTIMETER" and the "a283 FC" clamp. Amazon-buyable 2026-10-28 (sold by Amazon.com).
    name: "Fluke 283 FC/PV",
    image: "https://m.media-amazon.com/images/I/81xYPvQd-cL._SL1500_.jpg",
    rating: 4.5,
    bottomLine: "A CAT III 1500V True RMS meter and wireless 60 A AC/DC clamp kit with MC4 leads for solar PV strings.",
    verdict:
      "The Fluke 283 FC/PV kit is built for DC systems up to 1500 V, such as solar strings, wind, rail and data centers. The 6000-count True RMS meter reads DC to 1500 V at ±(0.09% + 3) up to 600 V and ±(0.15% + 2) on the 1500 V range, with CAT III 1500V / CAT IV 1000V ratings. The a283 FC clamp sends 0–60 A AC/DC current (±(1.5% + 0.15 A)) to the meter wirelessly, so the meter can show volts, amps and calculated VA together. Polarity alerts, a user limit gauge, a readiness self-check, time-stamped logging and Fluke Connect are built in, and the kit includes Stäubli MC4 leads. The meter has no current jacks of its own, it's rated only IP52 with a 2 m drop, and the clamp's warranty is 1 year against the meter's limited lifetime.",
    specs: [
      { label: "Accuracy", value: "True RMS, ±(0.09% + 3) DC V" },
      { label: "Safety rating", value: "CAT III 1500V / CAT IV 1000V" },
      { label: "Auto-ranging", value: "Yes (manual RANGE)" },
      { label: "Best for", value: "Solar PV strings and 1500 V DC systems" },
    ],
    pros: ["1500 V DC range with CAT III 1500V rating", "Wireless 60 A AC/DC clamp and MC4 leads included", "Polarity alerts, limit gauge, self-check and logging"],
    cons: ["Sold only as a kit on Amazon", "No current jacks on the meter; current only via the clamp", "IP52 and 2 m drop; clamp has a 1-year warranty"],
    ctaHref: "https://www.amazon.com/dp/B0DGBYD8ZK?tag=ohmsavvy-20",
  },
];
