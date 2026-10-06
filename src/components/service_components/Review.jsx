import { useState } from "react";
import { CheckCircle2, Check, Truck, FileSignature } from "lucide-react";

/* ---------- Pricing config (placeholder values: edit to match your real rates) ---------- */
const DOSE_GRAMS = 18;
const WEEKS_PER_MONTH = 4.33;

const TIERS = [
  { id: "A", min: 0, rate: 24, passes: 1 },
  { id: "B", min: 25, rate: 22, passes: 2 },
  { id: "C", min: 75, rate: 20, passes: 4 },
];

const BLENDS = [
  { id: "highland", tag: "100% Arabica", name: "Highland Reserve", notes: "Candied Citrus • Cacao", delta: 0 },
  { id: "angkor", tag: "70/30 Classic", name: "Angkor House Espresso", notes: "Caramel • Roasted Hazelnut", delta: -1.5 },
  { id: "volcanic", tag: "Rare Peaberry", name: "Volcanic Dark Roast", notes: "Smoked Chocolate • Molasses", delta: 2.5 },
];

const PACKAGING = [
  { id: "kraft", name: "Bespoke Unbleached Kraft (1kg Bags)", detail: "Valve fitted • Heat sealed • Recyclable", delta: 0 },
  { id: "tin", name: "Zero-Waste Tin Canister Buckets (5kg)", detail: "Closed-loop cafe exchange (-$0.75/kg)", delta: -0.75 },
];

const MIN_KG = 10;
const MAX_KG = 250;

const money = (n, digits = 2) =>
  n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });

/* ---------- Small pieces ---------- */
function SectionLabel({ children }) {
  return (
    <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#efe3d3]">{children}</h3>
  );
}

function Indicator({ selected }) {
  return (
    <span
      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
        selected ? "border-2 border-[#f5a742]" : "bg-white"
      }`}
    >
      {selected && <span className="h-2 w-2 rounded-full bg-[#f5a742]" />}
    </span>
  );
}

/* ---------- Main component ---------- */
export default function ServiceCard() {
  const [kg, setKg] = useState(35);
  const [blendId, setBlendId] = useState("highland");
  const [packId, setPackId] = useState("kraft");
  const [trio, setTrio] = useState(true);

  const tier = [...TIERS].reverse().find((t) => kg >= t.min);
  const blend = BLENDS.find((b) => b.id === blendId);
  const pack = PACKAGING.find((p) => p.id === packId);

  const rate = tier.rate + blend.delta + pack.delta;
  const cups = Math.round((kg * 1000) / DOSE_GRAMS);
  const monthly = Math.round(kg * rate * WEEKS_PER_MONTH);
  const perShot = (rate / 1000) * DOSE_GRAMS;
  const fill = ((kg - MIN_KG) / (MAX_KG - MIN_KG)) * 100;

  const privileges = [
    `${tier.passes} Complimentary Barista ${tier.passes === 1 ? "Pass" : "Passes"} / Quarter`,
    "Free Bi-Monthly Grinder Burr Calibrations",
    "Exclusive Priority Micro-Lot Allocation Rights",
  ];

  return (
    <section className="bg-[#1a1511] px-4 py-10 font-sans text-[#f3e9dc] md:px-6">
      {/* Heading */}
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-[9px] font-bold uppercase tracking-wider text-[#f5a742]">
          Dynamic Cafe Modeling
        </p>
        <h2 className="mt-1 font-serif text-4xl font-medium text-[#f7efe3]">
          Wholesale Volume & Yield Calculator
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#d6c8b6]">
          Estimate your weekly roasted bean requirement, baseline costs, and complimentary
          Academy training access based on your expected cup count.
        </p>
      </header>

      {/* Calculator card */}
      <div className="mx-auto mt-8 grid max-w-6xl gap-6 rounded-2xl bg-[#241e1a] p-5 md:p-8 lg:grid-cols-[1.6fr_1fr]">
        {/* ---------- Left: inputs ---------- */}
        <div className="space-y-7">
          {/* Slider */}
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="kg" className="text-xs font-bold uppercase tracking-wider text-[#efe3d3]">
                Weekly Bean Volume
              </label>
              <output htmlFor="kg" className="font-serif text-xl font-bold text-[#f5a742]">
                {kg} kg / week
              </output>
            </div>
            <input
              id="kg"
              type="range"
              min={MIN_KG}
              max={MAX_KG}
              step={5}
              value={kg}
              onChange={(e) => setKg(Number(e.target.value))}
              style={{
                background: `linear-gradient(to right, #f5a742 ${fill}%, #4a4039 ${fill}%)`,
              }}
              className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full focus:outline-none
                [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#f5a742]
                [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#f5a742]
                focus-visible:ring-2 focus-visible:ring-[#f5a742]/60"
            />
            <div className="mt-2 flex justify-between text-[9px] font-semibold text-[#8a7a6b]">
              <span>Boutique Bar (10kg)</span>
              <span>Busy Roastery Cafe (100kg)</span>
              <span>Hotel Group (250kg)</span>
            </div>
          </div>

          {/* Blend */}
          <fieldset>
            <legend className="sr-only">Roasting blend archetype</legend>
            <SectionLabel>Roasting Blend Archetype</SectionLabel>
            <div className="grid gap-2 sm:grid-cols-3">
              {BLENDS.map((b) => {
                const active = b.id === blendId;
                return (
                  <label
                    key={b.id}
                    className={`cursor-pointer rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-[#f5a742]/60 ${
                      active ? "bg-[#352c26]" : "bg-[#120d0a]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="blend"
                      value={b.id}
                      checked={active}
                      onChange={() => setBlendId(b.id)}
                      className="sr-only"
                    />
                    <span
                      className={`block text-[9px] font-bold uppercase tracking-wider ${
                        active ? "text-[#f5a742]" : "text-[#8a7a6b]"
                      }`}
                    >
                      {b.tag}
                    </span>
                    <span className="mt-1.5 block text-[13px] font-semibold text-[#f7efe3]">{b.name}</span>
                    <span className="mt-1 block text-[9px] font-medium text-[#8a7a6b]">{b.notes}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Packaging */}
          <fieldset>
            <legend className="sr-only">Packaging medium</legend>
            <SectionLabel>Packaging Medium</SectionLabel>
            <div className="grid gap-2 sm:grid-cols-2">
              {PACKAGING.map((p) => {
                const active = p.id === packId;
                return (
                  <label
                    key={p.id}
                    className={`flex cursor-pointer gap-3 rounded-lg px-3 py-3.5 focus-within:ring-2 focus-within:ring-[#f5a742]/60 ${
                      active ? "bg-[#352c26]" : "bg-[#120d0a]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="packaging"
                      value={p.id}
                      checked={active}
                      onChange={() => setPackId(p.id)}
                      className="sr-only"
                    />
                    <Indicator selected={active} />
                    <span>
                      <span className="block text-[13px] font-semibold text-[#f7efe3]">{p.name}</span>
                      <span className="mt-0.5 block text-[11px] text-[#b8a897]">{p.detail}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Cupping trio */}
          <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-[#120d0a] px-4 py-3.5 focus-within:ring-2 focus-within:ring-[#f5a742]/60">
            <Truck size={20} className="shrink-0 text-[#f5a742]" />
            <span className="flex-1">
              <span className="block text-[13px] font-semibold text-[#f7efe3]">
                Dispatch Complimentary Cupping Trio Prior to Supply
              </span>
              <span className="mt-0.5 block text-[11px] text-[#b8a897]">
                3 x 200g roasted whole bean flight sent via express courier
              </span>
            </span>
            <input
              type="checkbox"
              checked={trio}
              onChange={(e) => setTrio(e.target.checked)}
              className="sr-only"
            />
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${
                trio ? "bg-[#f5a742] text-[#1a1410]" : "border border-[#6b5d50]"
              }`}
            >
              {trio && <Check size={14} strokeWidth={3} />}
            </span>
          </label>
        </div>

        {/* ---------- Right: yield summary ---------- */}
        <aside className="flex flex-col rounded-lg bg-[#14100d] p-5" aria-live="polite">
          <div className="flex items-center justify-between">
            <h3 className="text-[9px] font-bold uppercase tracking-wider text-[#f5a742]">
              Yield Summary
            </h3>
            <span className="rounded bg-[#4a2e22] px-2 py-1 text-[9px] font-bold uppercase text-[#f5a742]">
              Volume Tier {tier.id}
            </span>
          </div>

          <p className="mt-6 text-[9px] font-bold uppercase tracking-wider text-[#8a7a6b]">
            Approx. Weekly Cups Prepared
          </p>
          <p className="mt-1 flex items-baseline gap-2">
            <span className="font-serif text-5xl font-bold text-[#f7efe3]">{cups.toLocaleString("en-US")}</span>
            <span className="text-xs text-[#d6c8b6]">drinks / week (@ {DOSE_GRAMS}g dose)</span>
          </p>

          <dl className="mt-5 space-y-2 rounded-lg bg-[#241e1a] p-4 text-xs">
            <div className="flex items-center justify-between">
              <dt className="text-[#d6c8b6]">Effective Wholesale Rate</dt>
              <dd className="font-bold text-[#f7efe3]">${money(rate)} / kg</dd>
            </div>
            <div className="flex items-center justify-between border-b border-[#3a312b] pb-2">
              <dt className="text-[#d6c8b6]">Estimated Monthly Cost</dt>
              <dd className="font-serif text-lg font-bold text-[#f5a742]">${monthly.toLocaleString("en-US")}</dd>
            </div>
            <div className="flex items-center justify-between pt-0.5">
              <dt className="text-[#d6c8b6]">Cost per Single Espresso Shot</dt>
              <dd className="font-bold text-[#f7efe3]">${money(perShot)} / cup</dd>
            </div>
          </dl>

          <h4 className="mt-6 text-[9px] font-bold uppercase tracking-wider text-[#8a7a6b]">
            Included Partner Privileges
          </h4>
          <ul className="mt-3 space-y-2">
            {privileges.map((p) => (
              <li key={p} className="flex items-center gap-2 text-xs text-[#f3e9dc]">
                <CheckCircle2 size={15} className="shrink-0 text-[#f5a742]" />
                {p}
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="mt-auto flex w-full items-center justify-center gap-2 rounded bg-[#f5a742] py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#1a1410] hover:bg-[#ffb955] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <FileSignature size={14} />
            Lock in Projected Rate
          </button>
          <p className="mt-2 text-center text-[9px] font-medium text-[#8a7a6b]">
            No contract commitment required for initial 30-day cupping trial
          </p>
        </aside>
      </div>
    </section>
  );
}
