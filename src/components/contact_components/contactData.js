// All the words for the contact page live here.
// Want to change some text? Edit it here, no need to dig through the components.

import {
  faCircleCheck,
  faMountain,
  faClock,
  faComments,
  faMugSaucer,
  faBus,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

// the three little badges at the top right of the hero
export const heroBadges = [
  { label: "Estate Direct", icon: faCircleCheck, iconColor: "text-[#fcba5f]", textColor: "text-[#d5c4b2]" },
  { label: "920 – 1,200 MASL", icon: faMountain, iconColor: "text-[#ffb599]", textColor: "text-[#d5c4b1]" },
  { label: "Bookings Open", icon: faClock, iconColor: "text-[#fcba5f]", textColor: "text-[#d5c4b2]" },
];

// dropdown options for the form
export const inquiryTypes = [
  { value: "cupping", label: "Estate Cupping Tour & Tasting (Mondulkiri)" },
  { value: "wholesale", label: "B2B Wholesale & Custom Roast Sourcing" },
  { value: "general", label: "General Roastery Inquiries" },
  { value: "press", label: "Media, Research & Press Engagements" },
];

export const partySizes = [
  { value: "1", label: "1 Person (Private Cupping)" },
  { value: "2-4", label: "2–4 Guests" },
  { value: "5-8", label: "5–8 Guests (Group Session)" },
  { value: "9+", label: "9+ Industry Delegation" },
];

// the two small phone cards under the form
export const quickContacts = [
  {
    label: "Direct Concierge",
    title: "WhatsApp & TG",
    detail: "+855 (0) 77 492 811",
    icon: faComments,
    color: "text-[#fcba5f]",
  },
  {
    label: "Lead Roaster Hearth",
    title: "Direct Roaster Desk",
    detail: "+855 (0) 23 881 902",
    icon: faMugSaucer,
    color: "text-[#ffb599]",
  },
];

// the two location cards on the right
export const locations = [
  {
    id: "bousra",
    tag: "Primary Terroir Hub",
    color: "text-[#fcba5f]",
    dot: "bg-[#fcba5f]",
    pulse: true,
    badge: "920 MASL",
    name: "Bousra Roastery & Cupping Hearth",
    address: "Bousra Waterfall Corridor, Pich Chreada District, Sen Monorom, Mondulkiri Province.",
    hoursLabel: "Sensory & Tour Hours:",
    hoursValue: "Wednesday – Sunday",
    sessionLabel: "Daily Cupping Sessions:",
    sessionValue: "08:00 — 16:00 (ICT)",
    noteIcon: faBus,
    noteText: "Daily shuttle departs Sen Monorom Central Circle at 07:30 & 12:30",
    emailLabel: "Harvest Cupping Email",
    email: "bousra@mondulkiricoffee.kh",
    actionLabel: "Terrain Pin",
    actionHref: "#elevation-map",
  },
  {
    id: "phnom-penh",
    tag: "Urban Satellite & Distribution",
    color: "text-[#ffb599]",
    dot: "bg-[#ffb599]",
    pulse: false,
    badge: "City Atelier",
    name: "Phnom Penh Atelier & Bean Dispatch",
    address: "Street 240, Quartier Daun Penh, Phnom Penh Metropolitan Area.",
    hoursLabel: "Espresso Bar & Dispatch:",
    hoursValue: "Open 7 Days A Week",
    sessionLabel: "Roastery Walk-Ins & Retail:",
    sessionValue: "07:00 — 19:00 Daily",
    noteIcon: faTruck,
    noteText: "Same-day whole bean batch fulfillment for capital accounts",
    emailLabel: "Commercial Accounts",
    email: "commercial@mondulkiricoffee.kh",
    actionLabel: "B2B Showroom",
    actionHref: "", // empty = just plain text, not a link
  },
];

export const alliances = {
  title: "Global Roaster Alliances",
  text: "Supplying unroasted Green Micro-Lots (SCA 86+) in vacuum-sealed GrainPro sacks directly to specialty micro-roasters in Singapore, Tokyo, Melbourne, and Berlin.",
  deskLabel: "Green Bean Logistics Desk:",
  email: "export@mondulkiricoffee.kh",
};

// the elevation map section
export const legend = [
  { label: "Volcanic Basalt", color: "bg-[#fcba5f]" },
  { label: "Shade Canopy", color: "bg-[#ffb599]" },
  { label: "Waterfall Mist Zone", color: "bg-[#d5c4b2]" },
];

export const mapInfo = {
  corridor: "SEN MONOROM CORRIDOR",
  coords: `12°27'14"N • 107°11'48"E`,
  trailOne: "31 km Trail",
  trailTwo: "High Basin",
  profile: "Basalt Plateau",
  soil: "Ferrosols (Red Clay)",
  datum: "Mondulkiri Geodetic Datum",
  footnote: "Terrain access via 4WD or scheduled roastery safari rover. Paved mountain pass with gentle elevation gain.",
};

// NOTE: these numbers are placeholders from the design, not real weather
export const telemetry = {
  temp: "19°C",
  condition: "Highland Mist",
  station: "Pich Chreada Weather Post",
  description: "Atmospheric conditions currently offer optimal slow-rate mucilage fermentation and gentle ambient raised-bed drying.",
  rows: [
    { label: "Ambient Humidity", value: "78% RH", highlight: false },
    { label: "UV Index & Cloud Cover", value: "3 (Filtered Mist)", highlight: false },
    { label: "Current Fermentation Phase", value: "Anaerobic Lot #28", highlight: true },
  ],
  tip: "Ideal Harvest Cupping Environment Today",
};

export const faqs = [
  {
    question: "What should we anticipate during an Estate Cupping Tour?",
    answer: "Tours begin at our Bousra nursery with a walk through the red-volcanic soil tree rows, exploring Arabica Catimor and Typica varietals under banana shade trees. You will inspect the raised drying patios and fermentation vats, followed by a calibrated 6-bowl sensory cupping session led by our Q-Grader in the cupping hearth. Tours take roughly 2.5 hours. Sensible footwear is strongly advised.",
  },
  {
    question: "What are your international shipping transit windows & freight tiers?",
    answer: "For consumer roasted whole beans, we dispatch via DHL Express air-freight with sealed degassing valves: delivery to Singapore, Bangkok, and Vietnam takes 48–72 hours; Europe, North America, and Australia take 4–6 business days. For wholesale B2B pallets (raw green or bespoke roast lots), we coordinate refrigerated Sea-LCL shipping from Sihanoukville Autonomous Port with full phytosanitary clearance.",
  },
  {
    question: "How should whole beans be stored in tropical, humid environments?",
    answer: "We recommend keeping our beans in their original multi-layered kraft pouches with the one-way valve intact, squeezed of excess air, or transferring them to a vacuum canister (such as an Atmos or Airscape). Store them in a cool, dark cabinet away from stoves and direct tropical sun. Never freeze coffee beans in unsealed containers, as moisture condensation rapidly degrades delicate aroma lipids upon thawing.",
  },
  {
    question: "Can cafes arrange custom roast profiles tailored to their house espresso bar?",
    answer: `Yes. Our roasting collective develops signature curve profiles using our dual drum Probat roasters. We calibrate development time ratio, charge temperature, and finishing notes according to your cafe's water profile and espresso extraction equipment. Contact our Phnom Penh atelier or select "B2B Wholesale" in the booking form to begin the formulation flight.`,
  },
];
