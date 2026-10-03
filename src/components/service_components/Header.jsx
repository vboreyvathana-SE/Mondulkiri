const stats = [
  {
    label: "Altitude Harvest",
    value: "1,200 MASL",
    caption: "Sen Monorom Basalt Soil",
  },
  {
    label: "Post-Roast Freshness",
    value: "48 Hours",
    caption: "Guaranteed Direct Dispatch",
  },
  {
    label: "Cafe Partners",
    value: "85+",
    caption: "Cambodia, Bangkok & SG",
  },
  {
    label: "SCA Certified",
    value: "Q-Grader",
    caption: "In-House Sensory Quality",
  },
];

export default function Header() {
  return (
    <section className="bg-[#1b1613] text-[#e9e1d6] font-['Outfit',system-ui,sans-serif]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Header row */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="flex items-center gap-2 font-['Space_Grotesk',system-ui,sans-serif] text-[12px] font-medium uppercase tracking-[0.12em] text-[#f5a847]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5a847]" />
              Terroir Elevation • High-Altitude B2B Operations
            </p>

            <h1 className="mt-2 font-['Newsreader',Georgia,serif] text-4xl font-normal leading-tight text-[#f7f1e8] sm:text-[40px]">
              Artisanal Roastery Services &amp; B2B Partnerships
            </h1>

            <p className="mt-3 text-[15px] leading-relaxed text-[#c9bfb1]">
              From single-estate volcanic micro-lot distribution to SCA-calibrated
              barista certifications across Phnom Penh and Sen Monorom. We
              partner with Michelin-starred kitchens, bespoke boutique cafes, and
              discerning hotel chains.
            </p>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              className="rounded-md bg-[#2b2520] px-4 py-2.5 font-['Space_Grotesk',system-ui,sans-serif] text-[11px] font-semibold uppercase tracking-wider text-[#e9e1d6] transition hover:bg-[#362e27] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5a847]"
            >
              Yield Estimator
            </button>
            <button
              type="button"
              className="rounded-md bg-[#f9b457] px-4 py-2.5 font-['Space_Grotesk',system-ui,sans-serif] text-[11px] font-semibold uppercase tracking-wider text-[#2a1c0a] transition hover:bg-[#ffc474] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5a847]"
            >
              Book Cupping Session
            </button>
          </div>
        </div>

        {/* Stats */}
        <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ label, value, caption }) => (
            <div
              key={label}
              className="rounded-lg bg-[#262019] px-4 py-4"
            >
              <dt className="font-['Space_Grotesk',system-ui,sans-serif] text-[10px] font-medium uppercase tracking-[0.1em] text-[#a89d8e]">
                {label}
              </dt>
              <dd className="mt-1.5 font-['Newsreader',Georgia,serif] text-[26px] leading-tight text-[#f5a847]">
                {value}
              </dd>
              <p className="mt-2 text-[12px] text-[#d8cfc2]">{caption}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
