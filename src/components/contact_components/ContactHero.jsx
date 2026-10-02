import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { heroBadges } from "./contactData";

export default function ContactHero() {
  return (
    <section className="relative w-full overflow-hidden py-10">
      {/* soft glows in the background */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-96 w-96 rounded-full bg-[#fcba5f]/5 blur-3xl"></div>
      <div className="pointer-events-none absolute top-1/2 -right-32 h-128 w-128 rounded-full bg-[#ffb599]/5 blur-[100px]"></div>

      <div className="relative z-10 flex flex-col justify-between gap-6 pb-6 md:flex-row md:items-end">
        <div className="flex max-w-2xl flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-8 bg-[#fcba5f]"></span>
            <span className="font-label text-[10px] font-semibold uppercase tracking-widest text-[#fcba5f]">
              Plateau Terroir Hospitality
            </span>
          </div>

          <h1 className="font-head text-[38px] leading-[46px] font-normal tracking-tight text-[#ede0da] md:text-[56px] md:leading-[64px]">
            Connect With <span className="text-[#fcba5f] italic">The Roastery</span>
          </h1>

          <p className="font-body text-lg leading-7 text-[#d5c4b1]">
            Rooted in the red volcanic soil of Sen Monorom, Mondulkiri Province, with our satellite cupping hearth and
            distribution atelier nestled in historical Phnom Penh.
          </p>
        </div>

        {/* the three small badges */}
        <div className="flex flex-wrap items-center gap-4 rounded-lg bg-[#251e1b] p-2 shadow-md">
          {heroBadges.map((badge, index) => (
            <div key={badge.label} className="flex items-center gap-4">
              {index > 0 && <div className="h-4 w-px bg-[#3b3330]"></div>}

              <div className="flex items-center gap-1 px-2 py-1">
                <FontAwesomeIcon icon={badge.icon} className={`text-[14px] ${badge.iconColor}`} />
                <span className={`font-label text-[10px] font-semibold uppercase tracking-wider ${badge.textColor}`}>
                  {badge.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
