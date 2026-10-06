import {
  Coffee,
  Sigma,
  GraduationCap,
  Wrench,
  Package,
  SlidersHorizontal,
  BookOpen,
  BadgeCheck,
} from "lucide-react";

const pillars = [
  {
    tier: "Service Tier 01",
    title: "Wholesale & Cafe Bean Supply",
    badge: "Direct Trade",
    Icon: Coffee,
    description:
      "Consistently calibrated, volume-tiered supply of 100% Mondulkiri high-plateau Arabica and heritage fine Robusta. Roasted in small batches with strict 48-hour post-roast nitrogen-flushed shipping schedules across Cambodia and international transit hubs.",
    chips: [
      "48-Hr Guaranteed Dispatch",
      "Custom Degassing Valves",
      "Batch Density & Moisture Logs",
    ],
    feature: {
      type: "bar",
      left: "Standard Profiles Available",
      right: "Medium-Light to Full City+",
    },
    footer: {
      type: "price",
      label: "Starting at",
      value: "$18.50",
      suffix: "/ kg (50kg+ tier)",
      cta: "Request Sample Kit",
      CtaIcon: Package,
      primary: true,
    },
  },
  {
    tier: "Service Tier 02",
    title: "Private Label & Bespoke Roasting",
    badge: "Custom Curves",
    Icon: Sigma,
    description:
      "Craft your signature culinary profile. We tailor unique bean ratios combining anaerobic ferment Arabica and shade-grown honey Peaberry. Complete packaging solutions with tactile unbleached kraft finishes, gold foil stampings, and customized origin provenance labels.",
    chips: ["Bespoke Foil Stamping", "Thermal Curve Profiling", "Private Cupping Notes"],
    feature: {
      type: "note",
      text: "Proprietary Roasting Profiles Reserved Exclusively",
      right: "Min. 20kg/Run",
    },
    footer: {
      type: "turnaround",
      label: "Turnaround",
      value: "5-7 Days",
      suffix: "Profile Finalization",
      cta: "Commission Blend",
      CtaIcon: SlidersHorizontal,
    },
  },
  {
    tier: "Service Tier 03",
    title: "Traditional Phin & Barista Certification",
    badge: "Academy Modules",
    Icon: GraduationCap,
    description:
      "Elevate frontline staff into beverage artisans. We combine Western espresso science (TDS extraction, refractometry, and microfoam texturing) with ancestral Southeast Asian Phin extraction rituals and condensed-milk suspension dynamics.",
    chips: ["Espresso Thermodynamics", "Highland Cupping Protocols", "Bronze Phin Immersion"],
    feature: {
      type: "levels",
      items: [
        { label: "Foundation (Level I)", accent: false },
        { label: "Barista Pro (Level II)", accent: true },
        { label: "Sensory Mastery", accent: false },
      ],
    },
    footer: {
      type: "workshop",
      label: "Workshops in",
      value: "Phnom Penh • Mondulkiri",
      cta: "View Curriculum",
      CtaIcon: BookOpen,
    },
  },
  {
    tier: "Service Tier 04",
    title: "Cafe Equipment & Bar Ergonomics",
    badge: "Hardware & Flow",
    Icon: Wrench,
    description:
      "Prevent bottlenecking during high-volume rushes. We guide cafes in commercial espresso grouphead selection (La Marzocco, Slayer, Victoria Arduino), burr calibrations (Mahlkönig), custom water remineralization filters, and artisan bronze phin setups.",
    chips: ["Water TDS & Calcium Balancing", "Burr Alignment & Profiling", "Speed-Rail Station Layouts"],
    feature: {
      type: "sla",
      text: "Quarterly PM & Emergency Gasket Service",
      right: "24/7 SLA",
    },
    footer: {
      type: "partner",
      label: "Partner pricing",
      value: "Up to 22% Off",
      suffix: "MSRP hardware",
      cta: "Consult Engineers",
      CtaIcon: Wrench,
    },
  },
];

function Feature({ feature }) {
  switch (feature.type) {
    case "bar":
      return (
        <div>
          <div className="mb-1 flex items-center justify-between text-[8px] font-bold uppercase tracking-wider">
            <span className="text-[#a8793a]">{feature.left}</span>
            <span className="text-[#f5a742]">{feature.right}</span>
          </div>
          <div className="flex h-2 overflow-hidden rounded-sm bg-[#120e0b]">
            <div className="w-[38%] bg-[#d8a24f]" />
            <div className="w-[30%] bg-[#c8873a]" />
            <div className="w-[32%] bg-[#6b2e1c]" />
          </div>
        </div>
      );
    case "note":
      return (
        <div className="flex items-center justify-between rounded bg-[#120e0b] px-3 py-2">
          <span className="flex items-center gap-2 text-[11px] font-medium text-[#f5a742]">
            <BadgeCheck size={14} />
            {feature.text}
          </span>
          <span className="text-[8px] font-bold uppercase tracking-wider text-[#8a7a6b]">
            {feature.right}
          </span>
        </div>
      );
    case "levels":
      return (
        <div className="grid grid-cols-3 gap-1.5">
          {feature.items.map((item) => (
            <div
              key={item.label}
              className={`rounded bg-[#120e0b] px-2 py-1.5 text-center text-[10px] font-semibold ${
                item.accent ? "text-[#f5a742]" : "text-[#e9dfd2]"
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>
      );
    case "sla":
      return (
        <div className="flex items-center justify-between rounded bg-[#120e0b] px-3 py-2">
          <span className="text-[11px] font-medium text-[#e9dfd2]">{feature.text}</span>
          <span className="text-[9px] font-bold text-[#f5a742]">{feature.right}</span>
        </div>
      );
    default:
      return null;
  }
}

function CardFooter({ footer }) {
  const { label, value, suffix, cta, CtaIcon, primary } = footer;
  const valueClass =
    footer.type === "price"
      ? "text-lg font-extrabold text-[#f5a742]"
      : footer.type === "workshop"
      ? "text-base font-serif font-bold text-[#f5a742]"
      : "text-base font-serif font-bold text-[#f5a742]";

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-baseline gap-1.5">
        <span className="text-[8px] font-bold uppercase tracking-wider text-[#8a7a6b]">
          {label}
        </span>
        <span className={valueClass}>{value}</span>
        {suffix && <span className="text-[11px] text-[#b8a897]">{suffix}</span>}
      </div>
      <button
        type="button"
        className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a742] ${
          primary
            ? "bg-[#f5a742] text-[#1a1410] hover:bg-[#ffb955]"
            : "bg-[#3a312b] text-[#f3e9dc] hover:bg-[#473c34]"
        }`}
      >
        <CtaIcon size={12} />
        {cta}
      </button>
    </div>
  );
}

function PillarCard({ pillar }) {
  const { tier, title, badge, Icon, description, chips, feature, footer } = pillar;
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-[#3a312b] bg-[#241e1a] p-4">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#3a312b] text-[#f5a742]">
            <Icon size={16} />
          </div>
          <div>
            <p className="text-[8px] font-bold uppercase tracking-wider text-[#8a7a6b]">
              {tier}
            </p>
            <h3 className="font-serif text-xl font-semibold leading-tight text-[#f7efe3]">
              {title}
            </h3>
          </div>
        </div>
        <span className="shrink-0 rounded bg-[#4a2e22] px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-[#f5a742]">
          {badge}
        </span>
      </header>

      <p className="text-[12px] leading-relaxed text-[#cdbfae]">{description}</p>

      <ul className="flex flex-wrap gap-1.5">
        {chips.map((chip) => (
          <li
            key={chip}
            className="rounded bg-[#3a312b] px-2 py-1 text-[9px] font-medium text-[#b8a897]"
          >
            {chip}
          </li>
        ))}
      </ul>

      <Feature feature={feature} />

      <div className="mt-auto pt-3">
        <CardFooter footer={footer} />
      </div>
    </article>
  );
}

export default function CafeModelling() {
  return (
    <section className="min-h-screen bg-[#14100d] p-4 font-sans text-[#f3e9dc] md:p-8">
      <div className="mx-auto max-w-5xl rounded-md border border-[#0c0c0e] p-5 md:p-6">
        <p className="text-[9px] font-bold uppercase tracking-wider text-[#f5a742]">
          Capabilities & Stewardship
        </p>
        <h2 className="mt-1 font-serif text-4xl font-semibold text-[#f7efe3]">
          Precision Roastery Pillars
        </h2>
        <p className="mt-2 max-w-md text-[13px] leading-relaxed text-[#cdbfae]">
          Every offering is rooted in sustainable Cambodian provenance, unhurried drum
          roasting, and technical sensory precision.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          {pillars.map((pillar) => (
            <PillarCard key={pillar.tier} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}
