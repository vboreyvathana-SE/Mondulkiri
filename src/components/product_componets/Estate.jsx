import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

export default function Estate() {
  return (
    <section className="w-full bg-[#120b08] p-6 md:p-10">
      <div className="w-full bg-[#1a110d] border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Badges, Title, and Description */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Pill Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-500 font-label text-[10px] uppercase tracking-widest font-semibold">
                <FontAwesomeIcon icon={faCircle} className="text-[6px] animate-pulse" />
                <span>Current Harvest 2025 / 2026</span>
              </div>
              <span className="font-label text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
                Sen Monorom Estate
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-head text-3xl md:text-5xl text-stone-100 font-medium leading-tight">
              Estate Harvests & Micro-Lot Reserves
            </h1>

            {/* Subtext */}
            <p className="font-body text-stone-400 text-sm md:text-base leading-relaxed">
              Nurtured on ancient Bousra basalt ridges, hand-sorted at peak cherry ripeness, and flame-drum roasted in Sen Monorom to preserve delicate aromatic oils and indigenous sweetness.
            </p>

          </div>

          {/* Right Side: Terroir Spec Grid Box */}
          <div className="lg:col-span-4 bg-black/40 border border-white/10 rounded-xl p-6">
            <div className="grid grid-cols-3 gap-4 text-left">
              
              {/* Elevation */}
              <div className="space-y-1">
                <span className="font-label text-[10px] uppercase text-stone-400 tracking-wider block">
                  Elevation
                </span>
                <span className="font-head text-amber-500 font-bold text-lg md:text-xl block">
                  850–1,050m
                </span>
                <span className="font-body text-xs text-stone-400 block">
                  Bousra Plateau
                </span>
              </div>

              {/* Substrate */}
              <div className="space-y-1 border-l border-white/10 pl-4">
                <span className="font-label text-[10px] uppercase text-stone-400 tracking-wider block">
                  Substrate
                </span>
                <span className="font-head text-stone-200 font-bold text-lg md:text-xl block">
                  Basaltic
                </span>
                <span className="font-body text-xs text-stone-400 block">
                  Volcanic Red Clay
                </span>
              </div>

              {/* Canopy */}
              <div className="space-y-1 border-l border-white/10 pl-4">
                <span className="font-label text-[10px] uppercase text-stone-400 tracking-wider block">
                  Canopy
                </span>
                <span className="font-head text-stone-200 font-bold text-lg md:text-xl block">
                  100% Shade
                </span>
                <span className="font-body text-xs text-stone-400 block">
                  Wild Banana & Teak
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}