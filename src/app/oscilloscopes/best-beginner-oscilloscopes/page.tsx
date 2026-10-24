import { RoundupHero } from "@/components/RoundupHero";
import { ContentLinks } from "@/components/ContentLinks";
import { ReviewArticle, type Pick } from "@/components/ReviewArticle";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Best Oscilloscopes for Beginners in 2026",
  description: "Bandwidth, sample rate, and channel count explained simply — an honest comparison of the best beginner-friendly oscilloscopes.",
  path: "/oscilloscopes/best-beginner-oscilloscopes",
});

export const picks: Pick[] = [
  {
    badge: "Best Overall",
    // Specs per rigolna.com and the DS1000Z datasheet: 50MHz, 4 channels, 1 GSa/s single channel (250 MSa/s with 3–4 on), 7-inch display.
    name: "Rigol DS1054Z",
    image: "https://valuetronics.com/cdn/shop/files/rigol_ds1054z-new_grande.jpg",
    rating: 4.8,
    bottomLine: "The default beginner oscilloscope recommendation for years, and still worth it.",
    verdict:
      "The DS1054Z has been the default recommendation for beginner oscilloscopes for years, and for good reason — 4 channels and 50MHz of bandwidth at a genuinely approachable price.",
    specs: [
      { label: "Bandwidth", value: "50MHz" },
      { label: "Channels", value: "4" },
      { label: "Sample rate", value: "1 GSa/s" },
      { label: "Best for", value: "Hobbyists, students, general electronics" },
    ],
    pros: ["4 channels at this price is rare", "Large, clear 7-inch display", "Strong community support and documentation"],
    cons: ["Menu navigation has a learning curve", "Bandwidth is modest for RF work"],
    ctaHref: "https://www.amazon.com/dp/B012938E76?tag=ohmsavvy-20",
    handsOnTested: true,
  },
  {
    badge: "Best Budget",
    name: "FNIRSI DSO152",
    image: "https://e42.psgsm.net/tb.com/p/916295/480/digital-oscilloscope-fnirsi-dso152-2.jpg",
    rating: 4.1,
    bottomLine: "A genuinely pocket-sized scope for quick diagnostics — not a bench replacement.",
    verdict:
      "A genuinely pocket-sized oscilloscope for basic signal checking — not a replacement for a bench scope, but a surprisingly capable tool for quick diagnostics on the go.",
    specs: [
      { label: "Bandwidth", value: "200kHz" },
      { label: "Channels", value: "1" },
      { label: "Sample rate", value: "2.5 MSa/s" },
      { label: "Best for", value: "Basic diagnostics, learning the fundamentals" },
    ],
    pros: ["Extremely affordable entry point", "Genuinely pocket-sized", "Good for learning basic waveform concepts"],
    cons: ["Single channel limits comparison work", "Bandwidth too low for anything beyond basic/audio-range signals"],
    ctaHref: "https://www.amazon.com/dp/B0FKN1S22Y?tag=ohmsavvy-20",
  },
  {
    badge: "Best for Growing Into",
    // Specs per siglentna.com (SDS1104X-E): 100MHz, 4 channels, 1 GSa/s (500 MSa/s per channel with all on).
    name: "Siglent SDS1104X-E",
    image: "https://valuetronics.com/cdn/shop/files/siglent_sds1104x-e.jpg",
    rating: 4.8,
    bottomLine: "More bandwidth and a better UI than the Rigol, for projects that will get more demanding.",
    verdict:
      "Double the Rigol's bandwidth (100MHz vs 50MHz) and twice its per-channel sample rate with three or four channels on (500 MSa/s vs 250 MSa/s), with a well-regarded user interface. A strong pick for anyone who expects their projects to get more demanding over time.",
    specs: [
      { label: "Bandwidth", value: "100MHz" },
      { label: "Channels", value: "4" },
      { label: "Sample rate", value: "1 GSa/s" },
      { label: "Best for", value: "Intermediate hobbyists, future-proofing" },
    ],
    pros: ["Higher bandwidth headroom than entry-level scopes", "Well-regarded, intuitive UI", "Strong value at the 100MHz tier"],
    cons: ["Pricier than the Rigol DS1054Z", "Overkill for pure beginners"],
    ctaHref: "https://www.amazon.com/dp/B0771N1ZF9?tag=ohmsavvy-20",
    handsOnTested: true,
  },
  {
    badge: "Best Compact Bench Option",
    name: "Hantek DSO2D10",
    // Specs per hantek.com (DSO2D10): 100MHz, 2 channels, 1 GSa/s, 7-inch 800×480, 1-channel 25 MHz generator.
    // Main photo of this exact Amazon listing (ASIN in ctaHref), verified by eye.
    image: "https://m.media-amazon.com/images/I/71YBWhiO8sL._SL1200_.jpg",
    rating: 4.3,
    bottomLine: "An oscilloscope and waveform generator in one unit — practical for space-limited benches.",
    verdict:
      "Combines an oscilloscope and waveform generator in one compact unit — a practical two-in-one for hobbyists who don't have bench space for separate instruments.",
    specs: [
      { label: "Bandwidth", value: "100MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "1 GSa/s" },
      { label: "Best for", value: "Space-limited benches, combined testing" },
    ],
    pros: ["Built-in waveform generator saves bench space", "Solid 100MHz bandwidth for the price", "Compact footprint"],
    cons: ["Only 2 channels, vs. 4 on the Rigol and Siglent", "The built-in generator is single-channel (25 MHz)"],
    ctaHref: "https://www.amazon.com/dp/B0D6B7HRMG?tag=ohmsavvy-20",
  },
  {
    badge: "Best 12-bit Upgrade",
    // Specs per rigolna.com (DHO800 series page and datasheet). Photo: main image of the exact Amazon listing (B0CGHQHQN7), panel reads "DHO804".
    name: "Rigol DHO804",
    image: "https://m.media-amazon.com/images/I/71FtRIGVfLL._SL1500_.jpg",
    rating: 4.8,
    bottomLine: "Four channels, 12-bit resolution and a 7-inch touchscreen in a compact body that runs from USB-C power.",
    verdict:
      "The DHO804 brings 12-bit vertical resolution to a beginner budget: 70 MHz, four channels, up to 1.25 GSa/s and 25 Mpts with one channel on, a 7-inch 1024 × 600 capacitive touchscreen, HDMI output and serial decoding of UART, I2C, SPI, CAN and parallel buses. It is powered over USB-C, so it can run from a portable power source. There is no built-in signal generator or logic channels, and sample rate and memory fall as you enable more channels (312.5 MSa/s and 5 Mpts with all four on).",
    specs: [
      { label: "Bandwidth", value: "70MHz" },
      { label: "Channels", value: "4" },
      { label: "Sample rate", value: "1.25 GSa/s (1 ch); 312.5 MSa/s (4 ch)" },
      { label: "Best for", value: "Hobbyists who want 12-bit detail and a touchscreen" },
    ],
    pros: ["12-bit vertical resolution", "7-inch 1024 × 600 touchscreen and HDMI out", "USB-C powered, compact body"],
    cons: ["No built-in signal generator or logic channels", "Per-channel sample rate drops to 312.5 MSa/s with four channels on"],
    ctaHref: "https://www.amazon.com/dp/B0CGHQHQN7?tag=ohmsavvy-20",
    handsOnTested: true,
  },
  {
    badge: "Best 2-Channel Rigol",
    // Specs per rigolna.com and the DS1000Z-E datasheet (24 Mpts standard per the datasheet; the series page says 12M standard). Photo: Amazon listing B08J3SDBDT, panel reads "DS1102Z-E".
    name: "Rigol DS1102Z-E",
    image: "https://m.media-amazon.com/images/I/710w1XllKOL._SL1500_.jpg",
    rating: 4.4,
    bottomLine: "Rigol's two-channel, 100 MHz benchtop with deep memory, for people who never need a third or fourth channel.",
    verdict:
      "The DS1102Z-E is a two-channel version of the DS1000Z platform with 100 MHz bandwidth: 1 GSa/s on one channel (500 MSa/s on two), 24 Mpts of memory per Rigol's datasheet, a 7-inch 800 × 480 display, up to 30,000 waveforms per second and standard decoding of UART, I2C, SPI and parallel buses. It has no built-in generator or digital channels. Choose it over the DS1054Z if bandwidth matters more to you than channel count.",
    specs: [
      { label: "Bandwidth", value: "100MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "1 GSa/s (1 ch); 500 MSa/s (2 ch)" },
      { label: "Best for", value: "Two-channel debugging, students" },
    ],
    pros: ["100 MHz on two channels", "Deep memory: 24 Mpts per Rigol's datasheet", "Serial decoding included"],
    cons: ["Only 2 channels", "8-bit ADC (12-bit only in High Resolution mode)", "No built-in generator"],
    ctaHref: "https://www.amazon.com/dp/B08J3SDBDT?tag=ohmsavvy-20",
  },
  {
    badge: "Best 200MHz Value",
    // Specs per siglentna.com (SDS1000X-E series). Photo: Amazon listing B06XZML6RD, panel reads "SDS1202X-E".
    name: "Siglent SDS1202X-E",
    image: "https://m.media-amazon.com/images/I/811dT41e3HL._SL1500_.jpg",
    rating: 4.5,
    bottomLine: "200 MHz on two channels with a fast 100,000 wfm/s update rate and standard serial decoding.",
    verdict:
      "The SDS1202X-E is the two-channel member of Siglent's X-E line with 200 MHz bandwidth: 1 GSa/s with one channel (500 MSa/s each with two), 14 Mpts of memory on one channel, 100,000 waveforms per second (400,000 in sequence mode), a 7-inch 800 × 480 display and standard I2C, SPI, UART, CAN and LIN trigger and decode. The MSO, AWG module, Bode plot and Wi-Fi options belong to the four-channel models, so don't count on them here.",
    specs: [
      { label: "Bandwidth", value: "200MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "1 GSa/s (1 ch); 500 MSa/s (2 ch)" },
      { label: "Best for", value: "Faster digital and switching work on two channels" },
    ],
    pros: ["200 MHz bandwidth", "100,000 wfm/s update rate", "Serial trigger and decode as standard"],
    cons: ["Only 2 channels", "No MSO, AWG or Bode plot (four-channel models only)", "Memory halves to 7 Mpts per channel with both on"],
    ctaHref: "https://www.amazon.com/dp/B06XZML6RD?tag=ohmsavvy-20",
  },
  {
    badge: "Best Basic Benchtop",
    // Specs per siglentna.com (SDS1000CML+ series). Siglent's Amazon listing says 1 Mpts memory; Siglent NA says 2 Mpts long-memory / 40 Kpts normal. Photo: Amazon listing B01J1MQC3G.
    name: "Siglent SDS1102CML+",
    image: "https://m.media-amazon.com/images/I/81yeXZHp8TL._SL1500_.jpg",
    rating: 4.2,
    bottomLine: "A simple 100 MHz, two-channel benchtop with a frequency counter and pass/fail testing, but shallow memory.",
    verdict:
      "The SDS1102CML+ is an older, simpler Siglent benchtop: 100 MHz, two channels, 1 GSa/s real-time, a 7-inch 800 × 480 display, 32 automatic measurements, FFT, a 6-digit frequency counter and pass/fail testing. Its memory is the weak point: Siglent lists 40 Kpts in normal mode and 2 Mpts in long-memory mode (its Amazon listing says 1 Mpts). It suits learning the basics; for deeper captures the X-E series and Rigol's Z-E models offer far more memory.",
    specs: [
      { label: "Bandwidth", value: "100MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "1 GSa/s" },
      { label: "Best for", value: "Classrooms and basic waveform viewing" },
    ],
    pros: ["100 MHz on two channels", "6-digit frequency counter and pass/fail", "Still sold new by Siglent NA"],
    cons: ["Shallow memory: 40 Kpts normal, 2 Mpts long-memory", "Older platform without serial decoding", "Sources disagree on memory depth"],
    ctaHref: "https://www.amazon.com/dp/B01J1MQC3G?tag=ohmsavvy-20",
  },
  {
    badge: "Best 3-in-1 Handheld",
    // Specs per hantek.com (Hantek2000 series page). Photo: hantek.com, bezel reads "Hantek2D72".
    name: "Hantek 2D72",
    image: "https://www.hantek.com/uploadpic/hantek/image/20200530/20200530083942_1184605554.jpg",
    rating: 4.3,
    bottomLine: "A handheld oscilloscope, multimeter and signal generator in one: 70 MHz, two channels, battery powered.",
    verdict:
      "The 2D72 combines a 70 MHz, two-channel oscilloscope (250 MSa/s on one channel), a 4,000-count multimeter and a one-channel signal generator (sine to 25 MHz) in a 624 g handheld with a stand and USB-C charging. The trade-offs are a 2.8-inch 320 × 240 screen and very short record length: 6K samples on one channel, 3K per channel with two. Hantek's site and the Amazon listing disagree on whether batteries are included.",
    specs: [
      { label: "Bandwidth", value: "70MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "250 MSa/s (1 ch); 125 MSa/s (2 ch)" },
      { label: "Best for", value: "Field service and portable kits" },
    ],
    pros: ["Scope, multimeter and generator in one handheld", "Sine output to 25 MHz", "Battery powered with USB-C charging"],
    cons: ["Small 2.8-inch screen", "Record length only 6K samples", "Battery inclusion differs between Hantek and the listing"],
    ctaHref: "https://www.amazon.com/dp/B0DYVD4YF6?tag=ohmsavvy-20",
  },
  {
    badge: "Best Budget Handheld 3-in-1",
    // Specs per fnirsi.com (2C53T page) and FNIRSI's Amazon listing. Vertical resolution isn't stated by FNIRSI.
    name: "FNIRSI 2C53T",
    image: "https://www.fnirsi.com/cdn/shop/files/fnirsi-2c53t-50mhz-250mss-handheld-3in1-oscilloscope-multimeter-signal-generatordigital-oscilloscopefnirsifnirsi-3123073.jpg",
    rating: 4.1,
    bottomLine: "A low-cost two-channel handheld scope with a 19,999-count True RMS multimeter and a basic generator.",
    verdict:
      "The 2C53T pairs a 50 MHz, two-channel scope at 250 MS/s with a 19,999-count True RMS multimeter (to 1000V DC and 750V AC) and a simple function generator to 50 kHz, in a 300 g handheld with a 3,000 mAh battery. The scope side is basic: 1 Kpts record depth, a 2.8-inch 320 × 240 screen and a ±400V input limit, and FNIRSI doesn't state its vertical resolution. Its multimeter is stronger than the Hantek 2D72's; its scope and generator are weaker.",
    specs: [
      { label: "Bandwidth", value: "50MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "250 MSa/s" },
      { label: "Best for", value: "Beginners who want a meter and scope in one" },
    ],
    pros: ["19,999-count True RMS multimeter built in", "Light: 300 g", "Built-in 3,000 mAh battery"],
    cons: ["1 Kpts record depth", "Generator tops out at 50 kHz", "Vertical resolution not stated"],
    ctaHref: "https://www.amazon.com/dp/B0D6VX6BFL?tag=ohmsavvy-20",
  },
  {
    badge: "Best Compact USB Scope",
    // Specs per picotech.com (PicoScope 2000 series page and datasheet). Photo: main image of the exact Amazon listing (B00GZMRZ3M); the case reads "PicoScope 2000 Series".
    name: "PicoScope 2204A",
    image: "https://m.media-amazon.com/images/I/71qPziZzn9L._SL1500_.jpg",
    rating: 4.3,
    bottomLine: "A pocket USB scope with Pico's polished software: serial decoding, spectrum analysis and a built-in generator.",
    verdict:
      "The 2204A is a two-channel, 10 MHz USB oscilloscope that uses your computer's screen through PicoScope 7 software on Windows, macOS or Linux. It samples at 100 MS/s on one channel (50 MS/s on two), has 8 kS of capture memory but can stream up to 100 MS over USB, and adds a function generator and AWG to 100 kHz, serial protocol decoding, a spectrum analyzer, mask testing and math channels. Its 10 MHz bandwidth limits it to audio, sensors and slower digital buses.",
    specs: [
      { label: "Bandwidth", value: "10MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "100 MS/s (1 ch); 50 MS/s (2 ch)" },
      { label: "Best for", value: "Laptop users, audio and slow digital buses" },
    ],
    pros: ["Polished PicoScope 7 software on Windows, macOS and Linux", "Serial decoding, spectrum analyzer and mask testing", "USB powered, under 0.2 kg"],
    cons: ["Only 10 MHz bandwidth", "8 kS capture memory (streaming aside)", "Needs a computer to use"],
    ctaHref: "https://www.amazon.com/dp/B00GZMRZ3M?tag=ohmsavvy-20",
  },
  {
    badge: "Best Lab-in-a-Box",
    // Specs per digilent.com (Analog Discovery 3 shop page). Buffer depth is not stated publicly; Digilent's spec pages were unreachable.
    name: "Digilent Analog Discovery 3",
    image: "https://cdn11.bigcommerce.com/s-7gavg/images/stencil/1280x1280/products/752/6126/AnalogDiscovery3-obl-2000__36112.1685545096.png?c=2",
    rating: 4.6,
    bottomLine: "A USB instrument that is a 14-bit two-channel scope, two-channel generator, 16-channel logic analyzer and power supply.",
    verdict:
      "The Analog Discovery 3 replaces a bench of instruments with one USB-C device and Digilent's free WaveForms software: a two-channel, 14-bit, 125 MS/s oscilloscope with 30+ MHz bandwidth (using the BNC adapter), a two-channel 14-bit waveform generator, 16 digital I/O lines for logic analysis and pattern generation with SPI, I2C, UART and CAN decoding, programmable ±5V supplies, and spectrum, network and impedance analyzers. It needs a computer, and Digilent doesn't publish its buffer size on the shop page.",
    specs: [
      { label: "Bandwidth", value: "30+ MHz (with BNC adapter)" },
      { label: "Channels", value: "2 analog + 16 digital" },
      { label: "Sample rate", value: "125 MS/s per channel" },
      { label: "Best for", value: "Students and embedded developers" },
    ],
    pros: ["14-bit scope and two-channel 14-bit generator", "16-channel logic analyzer and protocol decoding", "Programmable ±5V supplies"],
    cons: ["Needs a computer to use", "Full bandwidth needs the BNC adapter", "Buffer size not published on the shop page"],
    ctaHref: "https://www.amazon.com/dp/B0C4L59R83?tag=ohmsavvy-20",
  },
  {
    badge: "Best 2-Channel 12-bit",
    // Specs per Rigol's DHO800 datasheet (overview table). Photo: main image of the exact Amazon listing (B0CGHQ2STR, sold by RIGOL Official Store), panel reads "RIGOL DHO802 70MHz ... 1.25GSa/s 12bit". Amazon-buyable (In Stock) 2026-10-24.
    name: "Rigol DHO802",
    image: "https://m.media-amazon.com/images/I/71mCK9OyjBL._SL1500_.jpg",
    rating: 4.6,
    bottomLine: "The two-channel DHO800: 12-bit resolution, a 7-inch touchscreen and USB-C power for a lower price than the four-channel DHO804.",
    verdict:
      "The DHO802 is the two-channel model of Rigol's DHO800 series: 70 MHz, 12-bit vertical resolution, 1.25 GSa/s with one channel on (625 MSa/s with both) and 25 Mpts of memory on one channel (10 Mpts on both). It has a 7-inch 1024 × 600 capacitive touchscreen, HDMI output, LAN and standard decoding of parallel, UART, I2C, SPI and CAN, and it runs from a USB-C 15 V supply. There is no built-in signal generator and no logic channels.",
    specs: [
      { label: "Bandwidth", value: "70MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "1.25 GSa/s (1 ch); 625 MSa/s (2 ch)" },
      { label: "Best for", value: "Two-channel work that benefits from 12-bit detail" },
    ],
    pros: ["12-bit vertical resolution", "7-inch 1024 × 600 touchscreen with HDMI out", "Standard serial decoding (UART, I2C, SPI, CAN)"],
    cons: ["Two channels only", "No built-in signal generator or logic channels"],
    ctaHref: "https://www.amazon.com/dp/B0CGHQ2STR?tag=ohmsavvy-20",
  },
  {
    badge: "Best Basic 100MHz Bench",
    // Specs per Hantek's DSO5000P datasheet and product page (record length: datasheet says 24K, product page and launch notice say 40K). Photo: gallery image of the exact Amazon listing (B071P97RLC), panel reads "Hantek DSO5102P" with a 100MHz 1GSa/s badge; the main listing image showed a 70MHz badge and was rejected. Amazon-buyable 2026-10-24 (sold by a third-party seller, fulfilled by Amazon).
    name: "Hantek DSO5102P",
    image: "https://m.media-amazon.com/images/I/719BJF8XiCL._SL1500_.jpg",
    rating: 4.2,
    bottomLine: "A plain two-channel, 100 MHz mains benchtop with a 7-inch screen, for straightforward bench measurements.",
    verdict:
      "The DSO5102P is a conventional two-channel benchtop: 100 MHz, 1 GSa/s real-time, 8-bit, a 7-inch 800 × 480 display and mains power. Hantek lists edge, pulse-width, video, slope and overtime triggers, math and FFT, 32 automatic measurements and pass/fail testing. Hantek's own record-length figures disagree (24K in the datasheet, 40K on the product page), and it lists no serial decoding, generator or logic channels.",
    specs: [
      { label: "Bandwidth", value: "100MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "1 GSa/s (real-time)" },
      { label: "Best for", value: "Basic two-channel bench work on mains power" },
    ],
    pros: ["100 MHz bandwidth", "7-inch 800 × 480 display", "Math, FFT and 32 automatic measurements"],
    cons: ["Short record length (24K–40K per Hantek's own sources)", "No serial decoding, generator or logic channels listed"],
    ctaHref: "https://www.amazon.com/dp/B071P97RLC?tag=ohmsavvy-20",
  },
  {
    badge: "Best Slim Benchtop",
    // Specs per OWON's SDS1000 series product page and technical specification. No photo: neither the exact Amazon listing (B0781CXRP5) nor OWON's page shows a unit marked "SDS1102" (the main image is an SDS1022), so no image is used. Amazon-buyable (In Stock) 2026-10-24.
    name: "OWON SDS1102",
    rating: 4.2,
    bottomLine: "A slim, light two-channel 100 MHz benchtop with a 7-inch screen and simple controls.",
    verdict:
      "OWON's SDS1102 offers 100 MHz on two channels with 1 GSa/s real-time sampling, 8-bit resolution and a 7-inch 800 × 480 display in a slim body (OWON lists 301 × 152 × 70 mm and about 1.1 kg). Its record length is short at 10K points, triggering is limited to edge and video, and it has no generator, logic channels or serial decoding.",
    specs: [
      { label: "Bandwidth", value: "100MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "1 GSa/s (real-time)" },
      { label: "Best for", value: "A compact two-channel bench scope" },
    ],
    pros: ["100 MHz on two channels", "Slim, light body (about 1.1 kg)", "7-inch 800 × 480 display"],
    cons: ["10K-point record length", "Edge and video triggers only; no serial decoding or generator"],
    ctaHref: "https://www.amazon.com/dp/B0781CXRP5?tag=ohmsavvy-20",
  },
  {
    badge: "Best Isolated USB Scope",
    // Specs per OWON's VDS series product page and datasheet (the Amazon bullets quote series-level figures that don't apply to this model; OWON lists 25 MHz, 100 MSa/s and 5K for the VDS1022I). Photo: main image of the exact Amazon listing (B07PRT5WMJ), device reads "VDS1022I". Amazon-buyable 2026-10-24.
    name: "OWON VDS1022I",
    image: "https://m.media-amazon.com/images/I/51LzXAylxDL._SL1500_.jpg",
    rating: 4.1,
    bottomLine: "A small, USB-powered two-channel PC oscilloscope with an isolated USB connection, for laptop-based work.",
    verdict:
      "The VDS1022I is a PC oscilloscope with no screen of its own: two channels at 25 MHz and 100 MSa/s, 8-bit, 5K points of memory, powered from USB with an isolated USB 2.0 link to your computer. OWON lists edge, pulse, video, slope and alternate triggers plus math and FFT, all used through OWON's PC software. It weighs 0.26 kg.",
    specs: [
      { label: "Bandwidth", value: "25MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "100 MSa/s" },
      { label: "Best for", value: "Laptop-based debugging on a small budget" },
    ],
    pros: ["USB-powered with an isolated USB connection", "Small and light (0.26 kg)", "Two channels for the price of a handheld"],
    cons: ["No built-in screen: needs a PC", "25 MHz and a 5K-point record length"],
    ctaHref: "https://www.amazon.com/dp/B07PRT5WMJ?tag=ohmsavvy-20",
  },
  {
    badge: "Best 3-in-1 Pocket Tester",
    // Specs per fnirsi.com (DSO-TC3 page) and the DSO-TC3 manual V1.9. Photo: main image of the exact Amazon listing (B0BV9X733J, sold by FNIRSI's store), panel reads "FNIRSI DSO-TC3". Amazon-buyable (In Stock) 2026-10-24.
    name: "FNIRSI DSO-TC3",
    image: "https://m.media-amazon.com/images/I/71uPS5nk2nL._SL1500_.jpg",
    rating: 4.1,
    bottomLine: "A battery-powered pocket scope, component tester and signal generator in one small box.",
    verdict:
      "The DSO-TC3 combines a 500 kHz, 10 MSa/s single-input oscilloscope with a component tester (transistors, MOSFETs, diodes, capacitance, resistance, inductance) and a 6-waveform generator up to 100 kHz, on a 2.4-inch screen with a built-in rechargeable battery and USB-C charging. FNIRSI does not state its ADC resolution or memory depth. It suits learning and quick checks, not fast digital signals.",
    specs: [
      { label: "Bandwidth", value: "500kHz" },
      { label: "Channels", value: "1" },
      { label: "Sample rate", value: "10 MSa/s" },
      { label: "Best for", value: "Beginners who want a scope, component tester and generator in one" },
    ],
    pros: ["Scope, component tester and signal generator in one", "Battery-powered with USB-C charging", "Pocket-sized with a fold-out stand"],
    cons: ["500 kHz bandwidth and a small 2.4-inch screen", "ADC resolution and memory depth not stated"],
    ctaHref: "https://www.amazon.com/dp/B0BV9X733J?tag=ohmsavvy-20",
  },
  {
    badge: "Best Budget Scope + Generator",
    // Specs per fnirsi.com (1014D specification table); FNIRSI's page says both 12 and 14 standard generator signals, the spec table and Amazon say 14. Photo: main image of the exact Amazon listing (B097T5NRTZ, sold by FNIRSI's store), panel label reads "FNIRSI-1014D ... 100MHz 1GSa/s". Amazon-buyable (In Stock) 2026-10-24.
    name: "FNIRSI 1014D",
    image: "https://m.media-amazon.com/images/I/71L+POCNTVL._AC_SL1500_.jpg",
    rating: 4.3,
    bottomLine: "A two-channel 100 MHz benchtop with a built-in signal generator at an entry-level price.",
    verdict:
      "The 1014D pairs a two-channel, 100 MHz, 1 GSa/s, 8-bit oscilloscope with a 7-inch 800 × 480 screen and a built-in single-channel DDS generator (sine up to 10 MHz, other waveforms up to 2 MHz, 2.5 Vpp). FNIRSI lists FFT, X-Y mode, roll mode and USB export, and the Amazon kit includes two 1X/10X probes plus a 100X high-voltage probe. It runs from a 5 V adapter. FNIRSI quotes its memory as \"240Kbit\" and does not state the per-channel sample rate with both channels on.",
    specs: [
      { label: "Bandwidth", value: "100MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "1 GSa/s" },
      { label: "Best for", value: "Budget benches that need a scope and a signal source" },
    ],
    pros: ["Built-in DDS signal generator", "100 MHz, two channels and a 7-inch screen", "Kit includes a 100X high-voltage probe"],
    cons: ["Short, loosely specified memory (\"240Kbit\")", "Per-channel sample rate with both channels on not stated"],
    ctaHref: "https://www.amazon.com/dp/B097T5NRTZ?tag=ohmsavvy-20",
  },
  {
    badge: "Best 125 MHz 12-bit",
    // Specs per Rigol's DHO900 datasheet (linked from rigolna.com/products/digital-oscilloscopes/dho900/). Photo: main image of the exact Amazon listing (B0CGHQC6ZP, sold by RIGOL Official Store), panel reads "RIGOL DHO914 125MHz ... 1.25GSa/s 12bit". Amazon-buyable (In Stock) 2026-10-24.
    name: "Rigol DHO914",
    image: "https://m.media-amazon.com/images/I/71PMXGKRYFL._SL1500_.jpg",
    rating: 4.6,
    bottomLine: "Four 12-bit channels at 125 MHz with 16 logic inputs built in, in a compact USB-C powered body.",
    verdict:
      "The DHO914 is a four-channel, 125 MHz, 12-bit scope: 1.25 GSa/s on one channel (625 MSa/s on two, 312.5 MSa/s on three or four) and 50 Mpts of memory on one channel (25 Mpts on two, 10 Mpts on three or four). Rigol lists a 7-inch 1024 × 600 multi-touch screen, HDMI and LAN, standard parallel, UART, I2C, SPI, CAN and LIN decoding, and 16 digital channels that need the separately sold PLA2216 logic probe. It runs from a USB-C 15 V supply and weighs 1.78 kg. There is no built-in signal generator; that is the DHO914S.",
    specs: [
      { label: "Bandwidth", value: "125MHz" },
      { label: "Channels", value: "4 + 16 digital (probe sold separately)" },
      { label: "Sample rate", value: "1.25 GSa/s (1 ch); 312.5 MSa/s (4 ch)" },
      { label: "Best for", value: "Mixed analog and logic debugging on a small bench" },
    ],
    pros: ["12-bit resolution and 50 Mpts of memory", "16 digital channels built in", "Standard decoding including CAN and LIN"],
    cons: ["Logic probe (PLA2216) sold separately", "No built-in signal generator"],
    ctaHref: "https://www.amazon.com/dp/B0CGHQC6ZP?tag=ohmsavvy-20",
  },
  {
    badge: "Best 12-bit Scope + Generator",
    // Specs per Rigol's DHO900 datasheet (generator and Bode plot on S models only, datasheet footnote 7). Photo: main image of the exact Amazon listing (B0CGHRL266, sold by RIGOL Official Store), panel reads "RIGOL DHO914S 125MHz ... 1.25GSa/s 12bit" with the GI generator key. Amazon-buyable (In Stock) 2026-10-24.
    name: "Rigol DHO914S",
    image: "https://m.media-amazon.com/images/I/71XnyEAt3lL._SL1500_.jpg",
    rating: 4.6,
    bottomLine: "The DHO914 plus a built-in 25 MHz signal generator and Bode plot, for a one-box home lab.",
    verdict:
      "The DHO914S has everything in the DHO914 (four 12-bit channels at 125 MHz, 1.25 GSa/s, up to 50 Mpts, 16 digital channels with the separate PLA2216 probe, standard serial decoding, a 7-inch 1024 × 600 touchscreen and USB-C power) and adds a single-channel 25 MHz arbitrary/function generator. Rigol lists sine to 25 MHz, square to 15 MHz, ramp to 150 kHz and arbitrary waveforms to 10 MHz at 156 MSa/s and 14-bit, plus a Bode plot function that uses the generator to sweep a circuit's frequency response.",
    specs: [
      { label: "Bandwidth", value: "125MHz" },
      { label: "Channels", value: "4 + 16 digital (probe sold separately)" },
      { label: "Sample rate", value: "1.25 GSa/s (1 ch); 312.5 MSa/s (4 ch)" },
      { label: "Best for", value: "A home lab that wants scope, logic and signal source in one" },
    ],
    pros: ["Built-in 25 MHz generator with Bode plot", "12-bit resolution and 50 Mpts of memory", "16 digital channels and standard decoding"],
    cons: ["Logic probe (PLA2216) sold separately", "Costs more than the DHO914"],
    ctaHref: "https://www.amazon.com/dp/B0CGHRL266?tag=ohmsavvy-20",
  },
  {
    badge: "Best 4-Channel Scope + Generator",
    // Specs per Rigol's MSO1000Z/DS1000Z datasheet and rigolna.com/products/digital-oscilloscopes/1000z/ (memory conflicts: datasheet 24 Mpts standard, series page 12 Mpts standard / 24 Mpts optional; series page lists decoding as optional). Photo: main image of the exact Amazon listing (B08JGZ218X), panel reads "RIGOL DS1104 Z Plus ... 4 Channel 100MHz 1GSa/s"; "-S" isn't printed but the generator "Source" key is visible. Amazon-buyable 2026-10-24 (third-party seller).
    name: "Rigol DS1104Z-S Plus",
    image: "https://m.media-amazon.com/images/I/81h2yjJL3KL._SL1500_.jpg",
    rating: 4.5,
    bottomLine: "A four-channel 100 MHz classic with a two-channel 25 MHz signal generator built in.",
    verdict:
      "The DS1104Z-S Plus is the 100 MHz, generator-equipped member of Rigol's DS1000Z family: four channels, 1 GSa/s on one channel (500 MSa/s on two, 250 MSa/s on three or four), 8-bit, a 7-inch 800 × 480 display and up to 30,000 waveforms per second. Its built-in generator has two 25 MHz channels at 200 MSa/s and 14-bit. Rigol's sources disagree on memory (24 Mpts standard in the datasheet, 12 Mpts standard with 24 Mpts optional on the series page), and the series page lists serial decoding as an option. It can be upgraded to 16 logic channels with the RPL1116 kit, sold separately, and runs on mains power.",
    specs: [
      { label: "Bandwidth", value: "100MHz" },
      { label: "Channels", value: "4" },
      { label: "Sample rate", value: "1 GSa/s (1 ch); 250 MSa/s (4 ch)" },
      { label: "Best for", value: "Four-channel work that also needs two signal sources" },
    ],
    pros: ["Two-channel 25 MHz signal generator built in", "Four channels at 100 MHz", "Upgradable to 16 logic channels"],
    cons: ["8-bit with a lower-resolution 800 × 480 screen", "Rigol's memory and decoding details conflict between sources"],
    ctaHref: "https://www.amazon.com/dp/B08JGZ218X?tag=ohmsavvy-20",
  },
  {
    badge: "Best Budget 2-Channel Decoder",
    // Specs per hantek.com DSO2000 series page (products/detail/17182): DSO2C10 column shows no generator. Photo: main image of the exact Amazon listing (B09GY871QK), panel reads "Hantek DSO2C10 2 CHANNEL ... 100MHz 1GSa/s"; the shared front panel still carries WAVE GEN/GEN OUT labels. Amazon-buyable (In Stock) 2026-10-24 (third-party seller).
    name: "Hantek DSO2C10",
    image: "https://m.media-amazon.com/images/I/71e+o7BkUgS._SL1500_.jpg",
    rating: 4.3,
    bottomLine: "The DSO2D10 without the signal generator: two 100 MHz channels with deep memory and serial decoding.",
    verdict:
      "Hantek's DSO2C10 is a two-channel, 100 MHz benchtop with 1 GSa/s on one channel (500 MSa/s on both), 8-bit resolution with a high-resolution mode up to 12-bit, 8 Mpts of memory on one channel (4 Mpts on two) and a 7-inch 800 × 480 display. Hantek lists UART, LIN, CAN, SPI and I2C triggering and decoding and 32 automatic measurements. Its spec table shows no signal generator for this model, even though the front panel shares the DSO2D10's WAVE GEN labels. It runs on mains power and weighs 1.9 kg.",
    specs: [
      { label: "Bandwidth", value: "100MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "1 GSa/s (1 ch); 500 MSa/s (2 ch)" },
      { label: "Best for", value: "Low-cost serial-bus debugging on two channels" },
    ],
    pros: ["UART, I2C, SPI, CAN and LIN decoding", "8 Mpts of memory on one channel", "100 MHz at a budget price"],
    cons: ["No signal generator (unlike the DSO2D10)", "8-bit converter"],
    ctaHref: "https://www.amazon.com/dp/B09GY871QK?tag=ohmsavvy-20",
  },
  {
    badge: "Best 3-in-1 Handheld",
    // Specs per OWON's HDS200 series page (owon.com.hk/products_owon_hds200_series_digital_oscilloscope), HDS2202S column. Photo: main image of the exact Amazon listing (B0BJVK6RV7), unit reads "OWON HDS2202S 200MHz Handheld oscilloscope". Amazon-buyable (In Stock) 2026-10-24 (third-party seller, shipped by Amazon).
    name: "OWON HDS2202S",
    image: "https://m.media-amazon.com/images/I/81oGP+JFe2L._SL1500_.jpg",
    rating: 4.3,
    bottomLine: "A battery handheld that combines a 200 MHz two-channel scope, a 20,000-count multimeter and a 25 MHz generator.",
    verdict:
      "The HDS2202S is a handheld with three instruments: a two-channel, 200 MHz, 1 GSa/s, 8-bit oscilloscope with an 8K record length and 10,000 waveforms per second; a 20,000-count multimeter (1000 V DC, 750 V AC, 10 A); and a single-channel generator (sine to 25 MHz, square, pulse and arbitrary to 5 MHz). It has a 3.5-inch LCD, runs 3 to 6 hours on an 18650 battery and charges over USB-C. OWON doesn't state the per-channel sample rate with both channels on or the screen resolution.",
    specs: [
      { label: "Bandwidth", value: "200MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "1 GSa/s" },
      { label: "Best for", value: "Field work that needs a scope, meter and signal source in one" },
    ],
    pros: ["Scope, multimeter and generator in one handheld", "200 MHz on two channels", "Battery-powered with USB-C charging"],
    cons: ["Small 3.5-inch screen", "8K record length"],
    ctaHref: "https://www.amazon.com/dp/B0BJVK6RV7?tag=ohmsavvy-20",
  },
  {
    badge: "Best Deep-Memory USB Scope",
    // Specs per Pico Technology's PicoScope 2000 Series datasheet (picotech.com). No photo: the exact Amazon listing (B06WLNVPFK, sold by Tequipment) has one image, marked only "PicoScope 2000 Series", so no image is used. Amazon-buyable 2026-10-24 (low stock).
    name: "PicoScope 2206B",
    rating: 4.4,
    bottomLine: "A pocket-sized 50 MHz USB scope with 32 MS of memory and a built-in AWG, run from PicoScope 7 on your PC.",
    verdict:
      "The PicoScope 2206B is a two-channel USB oscilloscope with no screen of its own: 50 MHz, 500 MS/s with one channel (250 MS/s with two), 8-bit with resolution enhancement to 12-bit, and a 32 MS buffer. It includes a function generator and AWG (up to 1 MHz, 20 MS/s, 12-bit), is powered over USB, measures 130 × 104 × 18.8 mm and weighs under 0.2 kg. Everything is controlled from Pico's PicoScope 7 software on a PC.",
    specs: [
      { label: "Bandwidth", value: "50MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "500 MS/s (1 ch); 250 MS/s (2 ch)" },
      { label: "Best for", value: "Laptop users who want deep memory and solid PC software" },
    ],
    pros: ["32 MS buffer memory", "Built-in function generator and AWG", "USB-powered and very light"],
    cons: ["No built-in screen: needs a PC", "50 MHz bandwidth"],
    ctaHref: "https://www.amazon.com/dp/B06WLNVPFK?tag=ohmsavvy-20",
  },
  {
    badge: "Cheapest PC Scope",
    // Specs per hantek.com/products/detail/31 (6022BE column; the page's memory row doesn't clearly assign a figure to this model). No photo: no image on the exact Amazon listing (B0728HBNDV) shows "6022BE" printed on the unit, so no image is used. Amazon-buyable 2026-10-24 (third-party seller, shipped by Amazon).
    name: "Hantek 6022BE",
    rating: 4.0,
    bottomLine: "A very low-cost two-channel 20 MHz USB oscilloscope for learning on a Windows PC.",
    verdict:
      "The 6022BE is a basic PC oscilloscope with no screen: two channels, 20 MHz bandwidth, 48 MS/s maximum sample rate and an 8-bit converter, powered entirely over USB 2.0. Inputs are 1 MΩ / 25 pF with DC coupling only and a 20 mV–5 V/div range, and Hantek lists Windows software. It has no generator or logic channels (the separate 6022BL adds 16 logic inputs). Hantek doesn't clearly state its memory depth or the sample rate with both channels on.",
    specs: [
      { label: "Bandwidth", value: "20MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "48 MS/s (max)" },
      { label: "Best for", value: "Learning scope basics on a Windows laptop for very little money" },
    ],
    pros: ["Very low price", "USB-powered, no external supply", "Two channels"],
    cons: ["20 MHz and 48 MS/s limit it to slow signals", "DC coupling only; memory depth not clearly stated"],
    ctaHref: "https://www.amazon.com/dp/B0728HBNDV?tag=ohmsavvy-20",
  },
  {
    badge: "Best Touchscreen Tablet Scope",
    // Specs per fnirsi.com/products/1013d ("1013D Plus" is FNIRSI's style option for the 1013D sold with a P4100 100X probe; FNIRSI doesn't state ADC bits or the two-channel sample rate, and quotes memory as "240 Kbit"). No photo: the exact Amazon listing (B0BHHYMVKV, sold by FNIRSI's store) shows no model number on the unit, so no image is used. Amazon-buyable (In Stock) 2026-10-24.
    name: "FNIRSI 1013D Plus",
    rating: 4.1,
    bottomLine: "A battery-powered tablet oscilloscope with a 7-inch touchscreen, sold with a 100X high-voltage probe.",
    verdict:
      "The 1013D Plus is FNIRSI's 1013D tablet scope bundled with a P4100 100X probe: two channels, 100 MHz (FNIRSI notes 5 MHz with a 1X probe), 1 GSa/s and a 7-inch 800 × 480 capacitive touchscreen. It runs about 4 hours from a 6000 mAh battery, charges over USB-C and can be used while charging. FNIRSI lists FFT, Lissajous and roll modes and 1 GB of storage for screenshots and waveforms. It has no signal generator, and FNIRSI doesn't state its ADC resolution, its sample rate with both channels on, or what its \"240 Kbit\" memory figure means in points.",
    specs: [
      { label: "Bandwidth", value: "100MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "1 GSa/s" },
      { label: "Best for", value: "Portable two-channel work with a large touchscreen" },
    ],
    pros: ["7-inch touchscreen in a battery-powered tablet", "Includes a 100X high-voltage probe", "Usable while charging over USB-C"],
    cons: ["No signal generator", "ADC resolution and memory depth not clearly stated"],
    ctaHref: "https://www.amazon.com/dp/B0BHHYMVKV?tag=ohmsavvy-20",
  },
  {
    badge: "Best 150 MHz Budget Bench",
    // Specs per hantek.com DSO2000 series page (products/detail/17182), DSO2D15 column. Photo: main image of the exact Amazon listing (B08Y6KVMSV, DSO2D15 with an extra P4100 probe), panel reads "Hantek DSO2D15 ... 150MHz/1GSa/s 25MHz/200MSa/s". Amazon-buyable (In Stock) 2026-10-24 (third-party seller, shipped by Amazon).
    name: "Hantek DSO2D15",
    image: "https://m.media-amazon.com/images/I/81hiRS9DwNL._SL1500_.jpg",
    rating: 4.4,
    bottomLine: "The 150 MHz version of Hantek's DSO2000 bench scope, with a 25 MHz generator and serial decoding.",
    verdict:
      "The DSO2D15 is a two-channel, 150 MHz benchtop (2.4 ns rise time) with 1 GSa/s on one channel and 500 MSa/s on two, 8-bit resolution with a 12-bit high-resolution mode, 8 Mpts of memory on one channel (4 Mpts on two) and a 7-inch 800 × 480 display. Its built-in generator reaches 25 MHz sine and 10 MHz square or arbitrary at 200 MSa/s and 12-bit. Hantek lists UART, I2C, SPI, CAN and LIN triggering and decoding and 32 automatic measurements. It runs on mains power. This listing bundles a P4100 100X probe.",
    specs: [
      { label: "Bandwidth", value: "150MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "1 GSa/s (1 ch); 500 MSa/s (2 ch)" },
      { label: "Best for", value: "A budget bench that wants extra bandwidth and a signal source" },
    ],
    pros: ["150 MHz bandwidth", "Built-in 25 MHz signal generator", "UART, I2C, SPI, CAN and LIN decoding"],
    cons: ["8-bit converter", "Two channels only"],
    ctaHref: "https://www.amazon.com/dp/B08Y6KVMSV?tag=ohmsavvy-20",
  },
  {
    badge: "Best Budget Handheld + Meter",
    // Specs per HANMATEK's HO dual-channel series user manual V1.0.1 (linked from hanmatek.com/pages/manuals-center); HANMATEK doesn't state ADC bits. Photo: main image of the exact Amazon listing (B08VRDG94N, HANMATEK store byline), panel reads "HANMATEK HO52 Handheld oscilloscope". Amazon-buyable (In Stock) 2026-10-24.
    name: "HANMATEK HO52",
    image: "https://m.media-amazon.com/images/I/71NKZspZ+uL._AC_SL1500_.jpg",
    rating: 4.1,
    bottomLine: "A low-cost two-channel 50 MHz handheld scope with a built-in 20,000-count multimeter.",
    verdict:
      "The HO52 is a battery handheld with a two-channel, 50 MHz oscilloscope (250 MSa/s with one channel, 125 MSa/s with two; 8K points of memory on one channel, 4K on two) and a 20,000-count true-RMS multimeter rated to 1000 V DC, 750 V AC and 10 A. It has a 3.5-inch 320 × 240 screen, runs about 4 hours on two 2200 mAh cells and charges from 5 V over USB. It has no signal generator (that is the HO52S), and HANMATEK doesn't state its ADC resolution.",
    specs: [
      { label: "Bandwidth", value: "50MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "250 MSa/s (1 ch); 125 MSa/s (2 ch)" },
      { label: "Best for", value: "Field checks that need a scope and a meter on a budget" },
    ],
    pros: ["Scope and 20,000-count multimeter in one", "Two channels in a handheld", "Battery-powered with USB charging"],
    cons: ["No signal generator", "Short 8K record length and a small screen"],
    ctaHref: "https://www.amazon.com/dp/B08VRDG94N?tag=ohmsavvy-20",
  },
  {
    badge: "Best 70 MHz 3-in-1 Handheld",
    // Specs per OWON's HDS200 spec sheet (files.owon.com.cn/specifications/HDS200.pdf) and owon.com.hk HDS200 series page (the web table's column alignment is unclear; the PDF and Amazon both give 250 MSa/s). Photo: main image of the exact Amazon listing (B094FR78JB, sold by SmartTek, OWON Store byline), unit reads "OWON HDS272S Handheld oscilloscope". Amazon-buyable 2026-10-24.
    name: "OWON HDS272S",
    image: "https://m.media-amazon.com/images/I/71glhlGTTiL._SL1500_.jpg",
    rating: 4.2,
    bottomLine: "A two-channel 70 MHz handheld with a 20,000-count meter and a 25 MHz signal generator.",
    verdict:
      "OWON's HDS272S combines a two-channel, 70 MHz, 8-bit oscilloscope (250 MSa/s with one channel, 125 MSa/s with two, 8K record length) with a 20,000-count true-RMS multimeter and a single-channel generator (sine to 25 MHz, square and pulse to 5 MHz, 14-bit, up to 2.5 Vpp into 50 Ω). It has a 3.5-inch 320 × 240 screen, runs 3 to 6 hours on two 18650 cells and charges over USB-C, including from a power bank.",
    specs: [
      { label: "Bandwidth", value: "70MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "250 MSa/s (1 ch); 125 MSa/s (2 ch)" },
      { label: "Best for", value: "Portable work that needs a scope, meter and signal source" },
    ],
    pros: ["Scope, multimeter and generator in one", "USB-C charging, works from a power bank", "Fold-out stand"],
    cons: ["Small 3.5-inch screen", "8K record length"],
    ctaHref: "https://www.amazon.com/dp/B094FR78JB?tag=ohmsavvy-20",
  },
  {
    badge: "Best Budget 110 MHz Bench",
    // Specs per the HANMATEK DOS1102 user manual, section 5 (linked from hanmatek.com/pages/manuals-center); Amazon says "500 MS/s x2", the panel and maker page say 1GSa/s (the manual: 500 MS/s per channel); ADC bits not stated. Photo: main image of the exact Amazon listing (B0833YFNKP, HANMATEK store byline), panel reads "HANMATEK DOS1102 110MHz 1GSa/s". Amazon-buyable (In Stock) 2026-10-24.
    name: "HANMATEK DOS1102",
    image: "https://m.media-amazon.com/images/I/7183T+Sk7+L._SL1500_.jpg",
    rating: 4.1,
    bottomLine: "A slim, low-cost two-channel 110 MHz benchtop with a 7-inch screen and simple controls.",
    verdict:
      "The DOS1102 is a two-channel, 110 MHz benchtop (rise time 3 ns or less) with 500 MS/s per channel (1 GS/s combined, per its manual), a 10K record length and a 7-inch 800 × 480 display. HANMATEK lists math (+, −, ×, ÷) and FFT, edge and video triggers, 30 automatic measurements and saving to a USB stick. It runs from a 5 V 2 A adapter and weighs about 1.1 kg. It has no signal generator (that is the DOS1102S), no serial decoding is listed, and HANMATEK doesn't state its ADC resolution.",
    specs: [
      { label: "Bandwidth", value: "110MHz" },
      { label: "Channels", value: "2" },
      { label: "Sample rate", value: "500 MS/s per channel (1 GS/s combined)" },
      { label: "Best for", value: "A first two-channel bench scope on a tight budget" },
    ],
    pros: ["110 MHz on two channels", "7-inch 800 × 480 display", "Light 1.1 kg body on a 5 V adapter"],
    cons: ["10K record length", "Edge and video triggers only; no decoding listed"],
    ctaHref: "https://www.amazon.com/dp/B0833YFNKP?tag=ohmsavvy-20",
  },
  {
    badge: "Best 8-Channel Automotive USB Scope",
    // Specs per hantek.com/products/detail/13169 and the Hantek1008 manual Appendix A (100 kHz bandwidth is stated in the manual only; Hantek's 1008A/B/C pages share one spec table, including an ignition probe the Amazon kit photo doesn't show). No photo: the exact Amazon listing (B01EZWJRGG, Hantek Store byline) shows a case printed only "Hantek", so no image is used. Amazon-buyable 2026-10-24.
    name: "Hantek 1008B",
    rating: 3.9,
    bottomLine: "An eight-channel, 12-bit USB scope for slow automotive and sensor signals, run from a Windows PC.",
    verdict:
      "The 1008B is a USB-powered PC oscilloscope with eight analog channels and 12-bit resolution, made for automotive diagnostics. Hantek lists 2.4 MSa/s with one channel on, 4K points of memory, 1 MΩ DC-coupled inputs rated to 400 V peak and, in its manual, 100 kHz bandwidth. It also has an eight-channel LVTTL square-wave generator up to 250 kHz that can simulate crankshaft and camshaft signals, plus FFT, math and over 80 automotive test functions in its Windows software. It has no screen of its own, and Hantek doesn't state the per-channel rate with all eight channels on.",
    specs: [
      { label: "Bandwidth", value: "100kHz (per manual)" },
      { label: "Channels", value: "8" },
      { label: "Sample rate", value: "2.4 MSa/s (1 ch)" },
      { label: "Best for", value: "Automotive sensor and actuator diagnostics on a laptop" },
    ],
    pros: ["Eight channels at 12-bit", "Built-in automotive test functions and signal simulator", "USB-powered"],
    cons: ["Very low bandwidth and sample rate for electronics work", "Needs a Windows PC; no screen of its own"],
    ctaHref: "https://www.amazon.com/dp/B01EZWJRGG?tag=ohmsavvy-20",
  },
  {
    badge: "Best Pocket Mixed-Signal Scope",
    // Specs per Miniware's DS213 product page (miniware.com.cn, via the Wayback Machine capture of 2023-05-28; the live site is down) plus the exact Amazon listing (B09XXBBRPF) for bandwidth and display, which Miniware's page omits. Photo: main image of that listing, bezel reads "MINIWARE" and "DS213". Amazon-buyable (In Stock) 2026-10-24 (third-party seller, shipped by Amazon).
    name: "MINIWARE DS213",
    image: "https://m.media-amazon.com/images/I/51NO8mufcrL._SL1500_.jpg",
    rating: 4.0,
    bottomLine: "A 129 g pocket scope with two analog and two digital channels plus a built-in signal generator.",
    verdict:
      "The DS213 packs two analog channels and two digital channels into a 99.5 × 58.5 × 13.5 mm, 129 g case with a 1000 mAh battery. Miniware lists 100 MSa/s real-time sampling, an 8-bit converter, 4K points per channel, an 8 MB built-in USB disk for saved waveforms, and a generator with square waves to 8 MHz and sine, triangle and sawtooth to 20 MHz at 3 Vpp. The Amazon listing gives 15 MHz bandwidth and a 3-inch 320 × 240 screen. Miniware doesn't state the per-channel sample rate with several channels on.",
    specs: [
      { label: "Bandwidth", value: "15MHz (per Amazon listing)" },
      { label: "Channels", value: "2 analog + 2 digital" },
      { label: "Sample rate", value: "100 MSa/s" },
      { label: "Best for", value: "A pocket scope with logic inputs and a signal source" },
    ],
    pros: ["Two analog plus two digital channels", "Built-in signal generator", "Very small and light (129 g)"],
    cons: ["Small 3-inch screen", "Bandwidth stated only on the Amazon listing"],
    ctaHref: "https://www.amazon.com/dp/B09XXBBRPF?tag=ohmsavvy-20",
  },
];

const faqs = [
  {
    question: "How much bandwidth do I actually need?",
    answer:
      "For general electronics, Arduino/microcontroller work, and audio circuits, 50-100MHz is plenty. You only need higher bandwidth (200MHz+) for RF work or very high-speed digital signals.",
  },
  {
    question: "Does channel count matter for a beginner?",
    answer:
      "Yes, more than people expect. Even basic debugging often benefits from comparing two signals at once (e.g., clock vs. data line), so we'd recommend at least 2 channels, with 4 giving real long-term flexibility.",
  },
];

export default function BestOscilloscopesPage() {
  return (
    <>
      <RoundupHero
        category="oscilloscopes"
        label="Oscilloscopes"
        path="/oscilloscopes/best-beginner-oscilloscopes"
        heading="Best Beginner Oscilloscopes: Which One Should You Buy?"
        description="Bandwidth, sample rate, and channel count explained simply, with picks that won't overwhelm a first-time buyer — or leave you needing to upgrade in six months."
        updated="2026-10-21"
        picks={picks}
      />
      <ReviewArticle
        hideByline
        picks={picks}
        faqs={faqs}
        howWeChose="We compared bandwidth, channel count, and sample rate against the signals beginners and hobbyists actually measure, from audio-range work to microcontroller debugging."
      />
      <ContentLinks category="oscilloscopes" />
    </>
  );
}
