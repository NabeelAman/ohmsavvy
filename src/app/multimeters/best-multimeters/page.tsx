import { RoundupHero } from "@/components/RoundupHero";
import { ContentLinks } from "@/components/ContentLinks";
import { ReviewArticle, type Pick } from "@/components/ReviewArticle";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Best Multimeters in 2026",
  description: "An honest, specification-based comparison of the best digital multimeters in 2026 — covering accuracy, CAT safety ratings, and value across every budget.",
  path: "/multimeters/best-multimeters",
});

export const picks: Pick[] = [
  {
    badge: "Best Overall",
    name: "Fluke 117",
    image: "https://media.fluke.com/e55511c8-92e6-46b2-b9ae-b108002dd7fa_original__size.jpg",
    rating: 4.8,
    bottomLine: "The meter working electricians actually buy with their own money, not just the one brands push.",
    verdict:
      "The Fluke 117 is the meter most working electricians reach for. True RMS readings, non-contact voltage detection, and a CAT III 600V rating make it reliable in real electrical panels, not just hobby projects.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Electricians, serious hobbyists" },
    ],
    pros: ["Trusted, well-documented reliability", "Non-contact voltage (NCV) detection built in", "Durable enough for daily field use"],
    cons: ["Premium price for casual hobbyists", "No Bluetooth/app connectivity"],
    ctaHref: "https://www.amazon.com/dp/B000O3LUEI?tag=ohmsavvy-20",
    handsOnTested: true,
  },
  {
    badge: "Best for Field Service",
    // Specs per fluke.com (Fluke 115 page): same 167 × 84 × 46 mm, 550 g body as the 117.
    name: "Fluke 115",
    image: "https://media.fluke.com/340af005-26f3-41df-9f6a-b108002dd5d7_original__size.jpg",
    rating: 4.8,
    bottomLine: "The same Fluke reliability as the 117, in the same body, without the electrician-specific extras (NCV, AutoVolt, LoZ).",
    verdict:
      "The Fluke 115 is Fluke's field-service meter — True RMS, CAT III 600V, and a 6,000-count backlit display, like the 117, but without non-contact voltage detection or the AutoVolt AC/DC auto-selector. A strong pick if you want Fluke's reliability without the electrician-focused extras.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Field technicians, general electrical and electronics work" },
    ],
    pros: ["Same Fluke reliability and accuracy as the 117", "Same size and weight as the 117 at a lower price", "Includes capacitance and frequency measurement"],
    cons: ["No non-contact voltage (NCV) detection", "No AutoVolt AC/DC auto-selector or LoZ mode the 117 has"],
    ctaHref: "https://www.amazon.com/dp/B000OCFFMW?tag=ohmsavvy-20",
    handsOnTested: true,
  },
  {
    badge: "Best Budget",
    name: "KAIWEETS KM200s",
    image: "https://kaiweets.com/cdn/shop/files/KAIWEETS-KM200s-True-RMS-Smart-Digital-Multimeter.jpg?width=1000",
    rating: 4.5,
    bottomLine: "Covers the fundamentals of the Fluke at under half the price — the sensible first meter.",
    verdict:
      "For under half the price of the Fluke, the KM200s covers the fundamentals well: auto-ranging, True RMS, and a non-contact voltage detector. A sensible first meter for home and hobby use.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT II 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Home use, beginners" },
    ],
    pros: ["Excellent value for the feature set", "Backlit display for low-light use", "Smart auto-ranging simplifies readings"],
    cons: ["Build quality isn't field-tool grade", "CAT II rating means it's not meant for service-panel work"],
    ctaHref: "https://www.amazon.com/dp/B0FCMBZ5TW?tag=ohmsavvy-20",
  },
  {
    badge: "Best for Electronics Hobbyists",
    // Specs per astroai.com (DM6000AR page) and the Amazon listing. Neither states a CAT rating.
    name: "AstroAI DM6000AR",
    image: "https://cdn.astroai.com/astroai-banner/product/02eac7f4-b680-4f9a-e240-b28f21b3eb2b_20250120.webp",
    rating: 4.3,
    bottomLine: "The go-to recommendation for Arduino and Raspberry Pi tinkering — cheap enough not to worry about.",
    verdict:
      "This is the meter you'll see recommended most often for Arduino, Raspberry Pi, and general electronics tinkering — True RMS and 6,000-count resolution give it more precision than its price suggests, with both auto and manual ranging on tap.",
    specs: [
      { label: "Accuracy", value: "True RMS, 6,000-count" },
      { label: "Safety rating", value: "Not stated by AstroAI" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Microcontroller & electronics projects" },
    ],
    pros: ["Very affordable for True RMS + 6,000-count resolution", "6,000-count display resolves small changes", "Both auto and manual ranging available"],
    cons: ["Build and included leads reflect the budget price point", "No CAT rating stated by AstroAI, so keep it to low-voltage electronics, not panels"],
    ctaHref: "https://www.amazon.com/dp/B071JL6LLL?tag=ohmsavvy-20",
  },
  {
    badge: "Best for Electrical Panels",
    // Specs per Klein's MM400 product page and multimeter features chart (True RMS and LoZ are MM700-only).
    name: "Klein Tools MM400",
    image: "https://data.kleintools.com/sites/all/product_assets/hires/klein/mm400_photo.jpg",
    rating: 4.4,
    bottomLine: "A solid auto-ranging CAT III meter with temperature and capacitance, but not True RMS, and Klein has now discontinued it.",
    verdict:
      "Klein's MM400 is an auto-ranging, CAT III 600V meter with a 4,000-count backlit display that also reads temperature, capacitance, frequency and duty cycle. It is not True RMS, and Klein lists it as no longer in production (the MM420 replaces it), so buy it only at a clear discount or look at a True RMS meter for HVAC and variable-speed drive work.",
    specs: [
      { label: "Accuracy", value: "Auto-ranging (not True RMS)" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Tradespeople, home electrical work" },
    ],
    pros: ["Drop-rated to 1 m (3.3 ft) for job-site use", "Measures temperature, capacitance, frequency and duty cycle", "Backlight, min/max and range hold"],
    cons: ["Not True RMS, so readings on non-sinusoidal signals are less accurate", "Discontinued by Klein (replaced by the MM420)", "No low-impedance mode or NCV"],
    ctaHref: "https://www.amazon.com/dp/B018EXZO8M?tag=ohmsavvy-20",
  },
  {
    badge: "Best for Professionals",
    name: "Fluke 87V",
    image: "https://media.fluke.com/2725d18d-633b-40b2-b09b-b108002e4d59_original__size.jpg",
    rating: 4.8,
    bottomLine: "The step-up pick for anyone who needs CAT IV protection and high-resolution readings daily.",
    verdict:
      "The 87V is Fluke's industrial-grade step up from the 117 — a 1000V CAT III / 600V CAT IV rating, a 6,000-count main display with a 19,999-count high-resolution mode, and a 32-segment analog bar graph for watching signals change in real time.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 1000V / CAT IV 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Industrial technicians, daily professional use" },
    ],
    pros: ["Joint-highest CAT rating in this list (CAT IV 600V / CAT III 1000V)", "19,999-count high-resolution mode", "Analog bar graph tracks fast-changing signals"],
    cons: ["Among the most expensive picks here", "Overkill for casual home use"],
    ctaHref: "https://www.amazon.com/dp/B0002YFD1K?tag=ohmsavvy-20",
    handsOnTested: true,
  },
  {
    badge: "Best Clamp Meter",
    // Specs per milwaukeetool.com (2235-20 page) and its manual: 400A AC, 600V AC/DC, True RMS, CAT III 600V, resistance/continuity.
    name: "Milwaukee 2235-20",
    image: "https://www.milwaukeetool.com/--/web-images/sc/95924a2af12d4059acb29134f9a5c6fa?hash=8de461cf918be65701f0851f17c988fd&lang=en",
    rating: 4.6,
    bottomLine: "Skip the test leads entirely for current readings — clamp it on and read.",
    verdict:
      "A clamp meter measures current without breaking the circuit open, which is faster and safer for everyday electrical troubleshooting. The 2235-20 covers up to 400A AC with a 1-inch jaw opening and the same CAT III 600V and True RMS fundamentals as a good multimeter.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Not stated by Milwaukee" },
      { label: "Best for", value: "Quick current checks without disconnecting wiring" },
    ],
    pros: ["No need to break the circuit to measure current", "1-inch jaw fits most residential/commercial wiring", "Backed by Milwaukee's tool ecosystem and reputation"],
    cons: ["Measures AC current only (400A AC); no DC amps", "Bulkier than a pocket multimeter"],
    ctaHref: "https://www.amazon.com/dp/B004F5KXBM?tag=ohmsavvy-20",
  },
  {
    badge: "Best Waterproof",
    // Specs per southwire.com (14070T TechnicianPRO page).
    name: "Southwire 14070T",
    image: "https://assets.southwire.com/adaptivemedia/rendition?id=e50ea3478e9024c2f714f3c4b26dae8ae448502e&prid=01200Wx1200H&clid=SAPDAM&prclid=productpictures",
    rating: 4.5,
    bottomLine: "The pick for anyone working outdoors, on job sites, or anywhere a meter might get wet or dropped.",
    verdict:
      "The TechnicianPRO is IP67-rated — fully dust-tight and able to survive submersion — on top of a CAT IV 600V / CAT III 1000V safety rating and True RMS accuracy. A built-in LED work light and a Low Z function that eliminates false readings from ghost voltage round it out for job-site use.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 1000V / CAT IV 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Outdoor and job-site work, drop/water risk" },
    ],
    pros: ["IP67 waterproof and dust-tight", "Built-in LED work light", "Low Z function eliminates false readings from ghost voltage"],
    cons: ["Bulkier than a standard pocket meter", "US availability confirmed; double-check your region's listing"],
    ctaHref: "https://www.amazon.com/dp/B01MCTPTRC?tag=ohmsavvy-20",
  },
  {
    badge: "Best for Automotive",
    name: "Craftsman CMMT14171",
    image: "https://assets.craftsman.com/NAG/PRODUCT/IMAGES/HIRES/WHITEBG/CMMT14171_1_1680.webp",
    rating: 4.4,
    bottomLine: "The one pick here built specifically for diagnosing cars, not just household wiring.",
    verdict:
      "Craftsman's CMMT14171 adds RPM, dwell angle, and duty-cycle measurement on top of standard True RMS multimeter functions — the specific toolkit automotive diagnostics actually needs, at a CAT III 600V rating.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Automotive diagnostics" },
    ],
    pros: ["RPM, dwell, and duty-cycle functions built in", "Familiar, trusted Craftsman brand", "Also measures temperature and frequency"],
    cons: ["Automotive functions are wasted if you don't work on cars", "Not rated for CAT IV panel work"],
    ctaHref: "https://www.amazon.com/dp/B0CF46PFLC?tag=ohmsavvy-20",
  },
  {
    badge: "Best Compact",
    // Specs per extech.com (EX330 page) and the EX300-series datasheet, which never lists True RMS for the EX330.
    name: "Extech EX330",
    image: "https://www.extech.com/netx-assets/ex330_web/?width=1500&quality=80",
    rating: 4.2,
    bottomLine: "A genuinely pocket-sized meter with a non-contact voltage detector built in.",
    verdict:
      "The EX330 is a mini auto-ranging meter (147 × 76 × 42 mm, 260 g) with a built-in non-contact voltage (NCV) detector for a fast first check before you even connect leads, plus Type K temperature, capacitance, frequency and duty cycle. Extech doesn't list it as True RMS, unlike its True RMS models, so treat AC readings on distorted waveforms with caution.",
    specs: [
      { label: "Accuracy", value: "Auto-ranging (True RMS not stated)" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Quick checks, pocket carry" },
    ],
    pros: ["Genuinely pocket-sized", "Built-in non-contact voltage detector", "Low price for a name-brand meter"],
    cons: ["Extech doesn't list it as True RMS, so don't rely on it for distorted waveforms", "4,000-count display, coarser than 6,000-count meters"],
    ctaHref: "https://www.amazon.com/dp/B000EX0AE4?tag=ohmsavvy-20",
  },
  {
    badge: "Best Value Auto-Ranging",
    name: "UNI-T UT139C",
    image: "https://meters.uni-trend.com/wp-content/uploads/2022/04/UT139C_1.jpg",
    rating: 4.4,
    bottomLine: "True RMS and auto-ranging at a price that undercuts most of this list.",
    verdict:
      "UNI-T's UT139C packs True RMS accuracy, a 6,000-count display, and both auto and manual ranging into one of the more affordable meters here — a strong value pick if you don't need a specific brand name.",
    specs: [
      { label: "Accuracy", value: "True RMS, 6,000-count" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Budget-conscious buyers who still want True RMS" },
    ],
    pros: ["True RMS at a budget price", "Both auto and manual ranging", "Non-contact voltage detection included"],
    cons: ["Less established brand recognition than Fluke/Klein", "Build quality is adequate, not rugged"],
    ctaHref: "https://www.amazon.com/dp/B081RBJ94W?tag=ohmsavvy-20",
  },
  {
    badge: "Best for Industrial Work",
    // Specs per fluke.com (Fluke 179 product page) and the Fluke 170 Series datasheet.
    name: "Fluke 179",
    image: "https://media.fluke.com/9b686671-3197-4efc-a107-b108002df4f0_product_slideshow_main.jpg",
    rating: 4.7,
    bottomLine: "Fluke's do-everything bench-and-field meter: CAT IV 600V, True RMS, temperature and a 6,000-count display with bar graph.",
    verdict:
      "The Fluke 179 is the full-featured member of Fluke's 170 series: True RMS, CAT III 1000V and CAT IV 600V, a 6,000-count backlit display with an analog bar graph, and temperature measurement with the supplied thermocouple. It adds Min/Max-Average recording and both manual and automatic ranging, so it suits industrial maintenance and electronics work where the 117's electrician-focused extras matter less than range and resolution.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 1000V / CAT IV 600V" },
      { label: "Auto-ranging", value: "Yes (manual override)" },
      { label: "Best for", value: "Industrial maintenance, electronics, HVAC" },
    ],
    pros: ["CAT IV 600V for service entrances and outdoor feeds", "Temperature, capacitance to 10,000 µF and frequency to 100 kHz", "Min/Max-Average recording and analog bar graph"],
    cons: ["Costs more than the 117 for features many electricians won't use", "No non-contact voltage detection"],
    ctaHref: "https://www.amazon.com/dp/B00012Z0V6?tag=ohmsavvy-20",
  },
  {
    badge: "Best Rugged Klein",
    // Specs per Klein's MM700 product page and multimeter features chart. Klein lists it as no longer in production (MM720 replaces it).
    name: "Klein Tools MM700",
    image: "https://media.kleintools.io/images/original/klein/mm700.jpg",
    rating: 4.5,
    bottomLine: "Klein's toughest classic meter: True RMS, low impedance, CAT IV 600V and a 2 m drop rating, now replaced by the MM720.",
    verdict:
      "The MM700 was the top of Klein's original meter line and the only one in it with True RMS and a low-impedance mode, per Klein's own feature chart. It is rated CAT IV 600V and CAT III 1000V, survives a 2 m drop, is IP42 rated, and reads temperature to 1500°F. Klein now lists it as no longer in production, so buy it only at a fair price or look at the MM720 that replaces it.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT IV 600V / CAT III 1000V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Electricians who need CAT IV and a tough build" },
    ],
    pros: ["Low-impedance mode to rule out ghost voltage", "2 m drop rating and IP42", "Temperature to 1500°F and capacitance to 4,000 µF"],
    cons: ["Discontinued by Klein (replaced by the MM720)", "4,000-count display, coarser than 6,000-count meters", "Heavier than slim meters at 408 g"],
    ctaHref: "https://www.amazon.com/dp/B018CMKWSC?tag=ohmsavvy-20",
  },
  {
    badge: "Best Slim True RMS",
    // Specs per Klein's MM450 product page. The CAT IV 600V / CAT III 1000V figure on listings applies to the included leads; the meter is CAT III 600V.
    name: "Klein Tools MM450",
    image: "https://media.kleintools.io/images/original/klein/mm450_c.jpg",
    rating: 4.5,
    bottomLine: "A slim, current Klein True RMS meter with a reverse-contrast display and wide temperature range, rated CAT III 600V.",
    verdict:
      "The MM450 is Klein's current slim True RMS meter: CAT III 600V, auto-ranging, with a reverse-contrast 4,000-count display that adjusts its own backlight, Lead-Alert lights that show where the test leads belong, and temperature from −40°F to 1832°F. At 258 g and 2.8 cm thick it carries easily, and it is drop-rated to 2 m. It lacks a low-impedance mode and NCV, so it suits home electrical and appliance work more than panel troubleshooting.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Home electrical, appliance and HVAC work" },
    ],
    pros: ["Slim 2.8 cm body and 258 g", "Lead-Alert lights guide test lead placement", "Temperature from −40°F to 1832°F"],
    cons: ["CAT III 600V only (the CAT IV figure on listings is the leads)", "No low-impedance mode or NCV", "4,000-count display"],
    ctaHref: "https://www.amazon.com/dp/B0B6WW5ZX8?tag=ohmsavvy-20",
  },
  {
    badge: "Best Pocket Fluke",
    // Specs per fluke.com (Fluke 107 product page and Q&A: "not a true-RMS"). Auto-ranging is shown on the meter's display in Fluke's photo.
    name: "Fluke 107",
    image: "https://media.fluke.com/e66cf0ed-3cde-4d59-843e-b290012fdd69_product_slideshow_main.jpg",
    rating: 4.3,
    bottomLine: "A palm-sized Fluke with CAT III 600V and a 6,000-count display, but not True RMS.",
    verdict:
      "The Fluke 107 is a 200 g, palm-sized meter rated CAT III 600V, with a 6,000-count backlit display, capacitance, frequency and duty cycle, and a 1 m drop rating. Fluke states plainly that it is not True RMS, so on variable-speed drives and electronic loads its AC readings are less trustworthy than a 115 or 117. It suits a glovebox or toolbag second meter, or anyone who mostly checks batteries, outlets and continuity.",
    specs: [
      { label: "Accuracy", value: "Average-responding (not True RMS)" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes (per display)" },
      { label: "Best for", value: "A compact second meter, home and auto checks" },
    ],
    pros: ["Palm-sized: 142 × 69 × 28 mm, 200 g", "6,000-count backlit display", "Capacitance, frequency and duty cycle"],
    cons: ["Not True RMS", "No temperature, low-impedance mode or NCV"],
    ctaHref: "https://www.amazon.com/dp/B00HEAMMIC?tag=ohmsavvy-20",
  },
  {
    badge: "Best Features for the Money",
    // Specs per brymen.com (BM235 page and BM230-series catalog PDF). Brymen's web page and PDF disagree on CAT ratings; we use the PDF and device markings.
    name: "Brymen BM235",
    image: "https://www.brymen.com/images/ProductsList/BM230_List/BM235/imgBM235-big.jpg",
    rating: 4.6,
    bottomLine: "True RMS with AutoV LoZ, NCV, VFD mode and temperature: more electrician features than most meters at its price.",
    verdict:
      "Brymen's BM235 packs features usually found on pricier meters: True RMS, a 6,000-count backlit display, AutoV low-impedance voltage, non-contact voltage detection, a VFD mode for variable-speed drives, Type-K temperature, Max/Min/Avg and relative zero, with 1000V-rated HBC fuses. Brymen's catalog and the meter's own markings give CAT III 600V and CAT IV 300V. The US listing is the EEVblog edition, and support runs through Brymen's distributors rather than a big US brand.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Safety rating", value: "CAT III 600V / CAT IV 300V" },
      { label: "Auto-ranging", value: "Yes (manual override)" },
      { label: "Best for", value: "Electricians and enthusiasts who want every feature" },
    ],
    pros: ["AutoV LoZ and NCV built in", "VFD voltage and frequency mode", "Max/Min/Avg, relative zero and Type-K temperature"],
    cons: ["CAT IV only to 300V, below the Fluke 179 and Klein MM700", "Less familiar brand in the US; Amazon listing is the EEVblog edition"],
    ctaHref: "https://www.amazon.com/dp/B01JZ1ADCO?tag=ohmsavvy-20",
  },
  {
    badge: "Best Value Fluke",
    // Specs per fluke.com (17B+ page) and the Fluke 15B+/17B+ datasheet and users manual. Fluke makes no True RMS claim for it.
    name: "Fluke 17B+",
    image: "https://media.fluke.com/274e3e10-ff8f-4d3f-a1a6-b298015243b9_original__size.jpg",
    rating: 4.5,
    bottomLine: "A full-size Fluke with temperature, frequency, MIN MAX and relative mode, but not True RMS.",
    verdict:
      "The 17B+ is Fluke's feature-rich entry meter: CAT III 600V (CAT II 1000V), a 4,000-count backlit display, auto and manual ranging, and functions the 117 lacks, including temperature with the supplied Type K probe, frequency to 100 kHz, duty cycle, capacitance to 1,000 µF, MIN MAX and relative mode. Fluke doesn't call it True RMS, so on drives and electronic loads its AC readings are less dependable than a 115 or 117. Note that the Amazon listing's photo shows the newer 17B MAX, so check which model it ships.",
    specs: [
      { label: "Accuracy", value: "Not stated as True RMS by Fluke" },
      { label: "Safety rating", value: "CAT III 600V / CAT II 1000V" },
      { label: "Auto-ranging", value: "Yes (manual override)" },
      { label: "Best for", value: "Electronics hobbyists, students, appliance repair" },
    ],
    pros: ["Temperature, frequency and duty cycle built in", "MIN MAX and relative mode", "Hazardous-voltage LED lights at 30V or more"],
    cons: ["Not True RMS", "4,000-count display", "Amazon listing photo shows the newer 17B MAX"],
    ctaHref: "https://www.amazon.com/dp/B0779621KZ?tag=ohmsavvy-20",
  },
  {
    badge: "Best Basic Fluke",
    // Specs per fluke.com (15B+ page) and the Fluke 15B+/17B+ datasheet and users manual (frequency, temperature, MIN MAX and relative are 17B+ only).
    name: "Fluke 15B+",
    image: "https://media.fluke.com/7bc35bfe-b791-4124-ba8e-b29c012c359b_original__size.jpg",
    rating: 4.3,
    bottomLine: "The 17B+ body and safety rating without frequency, temperature or MIN MAX: a plain, tough Fluke for volts, amps and ohms.",
    verdict:
      "The 15B+ shares the 17B+'s case, CAT III 600V / CAT II 1000V rating, 4,000-count backlit display, 10A current ranges and 1,000 µF capacitance, but drops frequency, duty cycle, temperature, MIN MAX and relative mode. That makes it a straightforward, durable meter for checking voltage, current, resistance and continuity. Like the 17B+, Fluke doesn't describe it as True RMS.",
    specs: [
      { label: "Accuracy", value: "Not stated as True RMS by Fluke" },
      { label: "Safety rating", value: "CAT III 600V / CAT II 1000V" },
      { label: "Auto-ranging", value: "Yes (manual override)" },
      { label: "Best for", value: "Basic electrical and electronics checks" },
    ],
    pros: ["Fluke build with µA to 10A current ranges", "Capacitance to 1,000 µF", "Simple controls: only HOLD and RANGE"],
    cons: ["Not True RMS", "No frequency, temperature or MIN MAX", "4,000-count display"],
    ctaHref: "https://www.amazon.com/dp/B01IH41CUW?tag=ohmsavvy-20",
  },
  {
    badge: "Best Budget Pocket Fluke",
    // Specs per fluke.com (106 page) and the Fluke 106/107 users manual (diode, frequency and duty cycle are 107 only).
    name: "Fluke 106",
    image: "https://media.fluke.com/aaea60ca-d3e7-4bc5-bd50-b108002c4419_original__size.jpg",
    rating: 4.2,
    bottomLine: "The 107's palm-sized body for less, without diode test, frequency or duty cycle.",
    verdict:
      "The 106 is the 107's simpler sibling: the same 142 × 69 × 28 mm, 200 g body, CAT III 600V rating and 6,000-count display, with 4A and 10A current ranges, resistance to 40 MΩ, capacitance to 1,000 µF, continuity and data hold. It drops the 107's diode test, frequency and duty cycle, has no mA or µA ranges, and Fluke positions it for work where True RMS isn't needed.",
    specs: [
      { label: "Accuracy", value: "Average-responding (not True RMS)" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "A small, cheap backup meter" },
    ],
    pros: ["Palm-sized: 200 g", "6,000-count display", "4A and 10A current ranges"],
    cons: ["Not True RMS", "No diode test, frequency, mA or µA ranges"],
    ctaHref: "https://www.amazon.com/dp/B0GPF3FDT7?tag=ohmsavvy-20",
  },
  {
    badge: "Smallest Fluke",
    // Specs per fluke.com en-in (101 page) and the Fluke 101 datasheet and users manual. Not sold on fluke.com US; the Amazon listing is a third-party import.
    name: "Fluke 101",
    image: "https://media.fluke.com/d230fa52-dc8a-4517-99c3-b10800300020_original__size.jpg",
    rating: 4.1,
    bottomLine: "Fluke's smallest, simplest meter: volts, ohms, capacitance and frequency in 160 g, but no current measurement at all.",
    verdict:
      "The 101 is Fluke's most basic meter: 130 × 65 × 27 mm and 160 g, CAT III 600V, a 6,000-count display, 600V AC/DC, resistance to 40 MΩ, capacitance, frequency to 100 kHz, duty cycle, diode and continuity, with a 1 m drop rating. It has only two input jacks and cannot measure current, and Fluke doesn't call it True RMS. It isn't sold on Fluke's US site, so the Amazon listing comes from a third-party importer, and it carries a one-year warranty rather than two.",
    specs: [
      { label: "Accuracy", value: "Not stated as True RMS by Fluke" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Yes" },
      { label: "Best for", value: "Voltage and continuity checks only" },
    ],
    pros: ["Smallest Fluke here: 160 g", "Frequency, duty cycle, diode and capacitance", "1 m drop rating"],
    cons: ["No current measurement at all", "Not True RMS", "One-year warranty; US listing is a third-party import"],
    ctaHref: "https://www.amazon.com/dp/B00HE6MIJY?tag=ohmsavvy-20",
  },
  {
    badge: "Best Electrical Tester",
    // Specs per fluke.com (T5-600 page), the T5 datasheet and instruction sheet: AC response averaging, CAT III 600V, 100A AC OpenJaw, 3 m drop.
    name: "Fluke T5-600",
    image: "https://media.fluke.com/1d1f5018-0f9b-42aa-9262-b108002c582d_original__size.jpg",
    rating: 4.4,
    bottomLine: "Not a multimeter but an electrician's tester: volts, continuity and up to 100A AC through an open jaw, no leads in the circuit.",
    verdict:
      "The T5-600 is an electrical tester rather than a multimeter. It reads up to 600V AC or DC with automatic AC/DC selection, resistance to 1,000 Ω, continuity, and up to 100A AC through its OpenJaw current fork, so you can check a load's current without breaking the circuit. It is CAT III 600V, survives a 3 m drop, and stores its probes in the back. It is average-responding rather than True RMS and has no capacitance, frequency, diode or DC current.",
    specs: [
      { label: "Accuracy", value: "Average-responding (not True RMS)" },
      { label: "Safety rating", value: "CAT III 600V" },
      { label: "Auto-ranging", value: "Automatic AC/DC voltage selection" },
      { label: "Best for", value: "Electricians' quick voltage and current checks" },
    ],
    pros: ["100A AC current through the open jaw, no circuit break", "Automatic AC/DC voltage selection", "Survives a 3 m (10 ft) drop"],
    cons: ["Not a full multimeter: no capacitance, frequency or diode test", "Resistance only to 1,000 Ω", "AC current only; average-responding"],
    ctaHref: "https://www.amazon.com/dp/B0006Z3GZU?tag=ohmsavvy-20",
  },
  {
    badge: "Best Fluke Clamp Meter",
    // Specs and photo per fluke.com (Fluke 323 page), cross-checked against the live Amazon listing (ASIN B00AQKIEXY).
    name: "Fluke 323",
    image: "https://media.fluke.com/c0eacec0-218d-47a2-9ca4-b108002e0817_original__size.jpg",
    rating: 4.7,
    bottomLine: "A True RMS clamp meter for current measurement without breaking a circuit open — a different tool than a standard multimeter, not a replacement for one.",
    verdict:
      "The Fluke 323 reads AC current up to 400A by clamping around a conductor, with True RMS accuracy on non-sinusoidal loads. It doesn't measure DC current, capacitance, or frequency, and has no backlight or temperature mode — it's built specifically for clamp current work, not as a general-purpose meter. See our clamp meter buying guide for when this matters over a standard multimeter.",
    specs: [
      { label: "Accuracy", value: "True RMS" },
      { label: "Current range", value: "Up to 400A AC" },
      { label: "Safety rating", value: "CAT III 600V / CAT IV 300V" },
      { label: "Best for", value: "Fast current checks without breaking the circuit" },
    ],
    pros: ["True RMS accurate on non-sinusoidal AC loads", "CAT IV 300V rating for front-of-panel work", "Compact and light at 265g"],
    cons: ["AC current only — no DC current measurement", "No backlight, temperature, or frequency mode"],
    ctaHref: "https://www.amazon.com/dp/B00AQKIEXY?tag=ohmsavvy-20",
  },
  {
    badge: "Best Combo Kit",
    // Fluke's official bundle listing (fluke.com: electrical-testing/digital-multimeters/fluke-117-323-kit), cross-checked against Amazon ASIN B00DTSLWRA.
    name: "Fluke 117/323 Kit",
    image: "https://media.fluke.com/4e3f20e4-983a-45c1-8200-b31a011cf2c9_product_slideshow_main.jpg",
    rating: 4.6,
    bottomLine: "The Fluke 117 and 323 clamp meter bundled together, covering both general multimeter work and clamp current checks in one purchase.",
    verdict:
      "This official Fluke bundle pairs the 117 — our Best Overall multimeter pick — with the 323 True RMS clamp meter, covering general electrical troubleshooting and no-disconnect current checks in one kit. It costs more than either tool alone, but less than buying both at full price separately.",
    specs: [
      { label: "Includes", value: "Fluke 117 multimeter + Fluke 323 clamp meter" },
      { label: "Safety rating", value: "CAT III 600V (both tools)" },
      { label: "Carrying case", value: "Included soft case" },
      { label: "Best for", value: "Electricians who want both tools in one purchase" },
    ],
    pros: ["Covers both general multimeter and clamp current work", "Official Fluke bundle, not a third-party pairing", "Includes a carrying case"],
    cons: ["Higher upfront cost than either tool alone", "No savings if you only need one of the two tools"],
    ctaHref: "https://www.amazon.com/dp/B00DTSLWRA?tag=ohmsavvy-20",
  },
];

const faqs = [
  {
    question: "What does a CAT rating mean?",
    answer:
      "CAT (Category) ratings indicate how much transient voltage spike a meter is rated to safely withstand. CAT III 600V is the standard recommendation for home electrical panels and most residential wiring work.",
  },
  {
    question: "Do I need True RMS?",
    answer:
      "True RMS matters if you're measuring non-sinusoidal signals — common with modern electronics, variable-speed motors, and dimmer switches. For basic DC continuity checks, it's less critical.",
  },
  {
    question: "Should I get a clamp meter instead of a standard multimeter?",
    answer:
      "A clamp meter measures current by clamping around a wire — no need to break the circuit open, which is faster and safer for everyday checks. It's a great addition to a standard multimeter, not usually a replacement, since clamp meters are less practical for resistance, continuity, and low-current work.",
  },
];

export default function BestMultimetersPage() {
  return (
    <>
      <RoundupHero
        category="multimeters"
        label="Multimeters"
        path="/multimeters/best-multimeters"
        heading="Best Multimeters: Find the One That Fits Your Work"
        description="We compared accuracy specifications, CAT safety ratings, and feature sets across the multimeters most recommended by electricians, hobbyists, and verified buyer feedback."
        updated="2026-10-21"
        picks={picks}
      />
      <ReviewArticle
        hideByline
        picks={picks}
        faqs={faqs}
        howWeChose="We started from the multimeters most often recommended by electricians and hobbyists, then compared CAT safety rating, True RMS, resolution, and extras like NCV and low-impedance mode against the work each kind of buyer actually does."
      />
      <ContentLinks category="multimeters" />
    </>
  );
}
