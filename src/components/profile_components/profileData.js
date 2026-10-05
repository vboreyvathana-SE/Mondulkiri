// The tab names + the SAMPLE profile that the page shows for now.
// Everything inside sampleProfile is made-up demo content (from the Stitch design).
// When the API exists, profileService.js returns the real thing in this same shape.

import {
  faMedal,
  faLeaf,
  faMugHot,
  faBoxOpen,
  faGift,
} from "@fortawesome/free-solid-svg-icons";

export const tabs = [
  { id: "overview", label: "Overview & Subscriptions" },
  { id: "orders", label: "Order History & Cupping" },
  { id: "sensory", label: "Flavor Profile & Sensory" },
  { id: "addresses", label: "Addresses & Dispatch" },
  { id: "perks", label: "Roastery Guild Perks" },
];

export const sampleProfile = {
  member: {
    name: "Sovan Chamroeun",
    badge: "Highland Guild Connoisseur",
    status: "Tier II Active",
    tierName: "Guild Tier II Connoisseur",
    location: "Phnom Penh & Mondulkiri",
    since: "Oct 2023",
    id: "#MDK-8841-CON",
    points: "1,420",
    pointsNote: "Equiv. 2 Reserve 250g Micro-Lots",
  },

  subscription: {
    tag: "Active Terroir Cask Subscription",
    title: "Monthly Micro-Lot Explorer",
    nextDispatch: "November 14, 2026",
    cadence: "Monthly Cadence: Standard Ground Courier (Phnom Penh Urban Express)",
    lots: [
      {
        tag: "Lot #MDK-PB09",
        icon: faMedal,
        color: "text-[#fcba5f]",
        name: "Rare Peaberry Reserve",
        details: "Full Roast • Dark Cocoa, Fig & Spices",
        chips: ["250g Whole Bean", "1,250 MASL"],
        image: "/Images/coffee-bag.png",
      },
      {
        tag: "Micro-Lot Natural",
        icon: faLeaf,
        color: "text-[#ffb599]",
        name: "Bousra Estate Caturra",
        details: "Medium Roast • Bergamot, Lychee & Molasses",
        chips: ["250g Whole Bean", "Bousra Plateau"],
        image: "/Images/coffee-bag.png",
      },
    ],
  },

  dispatches: {
    total: 14,
    items: [
      {
        id: "#MK-9412",
        status: "delivered",
        badge: "Delivered • Oct 16",
        title: "Highland Harvest Cupping Set (3 x 200g)",
        note: "Includes Red Honey Micro-Lot & Phin Brewer",
        image: "",
        score: "91.5 / 100",
      },
      {
        id: "#MK-9280",
        status: "transit",
        badge: "In Transit • Departed Roastery",
        title: "Custom Dark Roast Blend (500g)",
        note: "Origin: Sen Monorom Highland Volcanic Baseline",
        image: "/Images/coffee-bag.png",
        arrival: "Tomorrow, 3:00 PM",
      },
    ],
  },

  flavor: {
    calibrated: "Calibrated over 18 Roasts",
    // percent = how full the bar is (0 to 100)
    bars: [
      {
        label: "Roast Profile",
        valueLabel: "Medium-Dark (72%)",
        percent: 72,
        fill: "bg-linear-to-r from-[#d99b43] via-[#fcba5f] to-[#ffb599]",
        ends: ["Cinnamon / Light", "Full City +", "French / Charcoal"],
      },
      {
        label: "Acidity Preference",
        valueLabel: "Stone Fruit & Citrus (65%)",
        percent: 65,
        fill: "bg-[#d99b43]",
        ends: ["Low & Mellow", "Balanced Tartaric", "Bright Malic"],
      },
      {
        label: "Mouthfeel & Density",
        valueLabel: "Velvety & Syrupy (88%)",
        percent: 88,
        fill: "bg-[#fcba5f]",
        ends: ["Tea-like Silk", "Creamy Medium", "Heavy Basalt Viscosity"],
      },
    ],
    // the last bar is split in two colours
    split: {
      label: "Extraction Preference",
      valueLabel: "Phin 60% / V60 40%",
      first: 60,
      ends: ["Traditional Cambodian Phin Filter", "Ceramic Pour Over"],
    },
    // value = 0 to 1, order matters: top, upper-right, lower-right, bottom, lower-left, upper-left
    radar: [
      { label: "Roast Depth", value: 0.82 },
      { label: "Sweetness", value: 0.75 },
      { label: "Body", value: 0.63 },
      { label: "Clean Finish", value: 0.75 },
      { label: "Acidity", value: 0.74 },
      { label: "Aroma", value: 0.7 },
    ],
    match: "96.4%",
  },

  pass: {
    title: "Highland Terroir Pass",
    altitude: "Volcanic 1,200M",
    passportCount: "09 / 12 Lots",
    passportNote: "3 more to unlock Private Estate Cupping",
    valid: "VALID ACROSS ROASTERIES",
    validPlaces: "SEN MONOROM • PHNOM PENH",
  },

  delivery: {
    place: "BKK1 Residence • Urban Haven",
    lines: ["Street 302, Boeng Keng Kang 1", "Phnom Penh, Cambodia (12302)"],
    contact: "Direct Courier Contact: +855 12 498 331",
    payment: "ABA Pay (••9021)",
  },

  privileges: {
    title: "Tier II Privilege Unlocked",
    perks: [
      {
        icon: faMugHot,
        title: "Free Bi-Monthly Sensory Cuppings",
        text: "Valid at Sen Monorom Tasting Room and Phnom Penh Flagship.",
      },
      {
        icon: faBoxOpen,
        title: "First Access to Micro-Harvests",
        text: "48-hour priority window before public drop of Peaberry lots.",
      },
      {
        icon: faGift,
        title: "Gift Terroir Experience",
        text: "Invite up to 2 guests to the Highland Roast Lab with your pass.",
      },
    ],
    inviteLink: "mondulkiri.coffee/guild/sovanc",
  },
};
