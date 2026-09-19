export function VisitRoasteryBanner() {
  return (
    <section className="bg-[#120b08] px-6 py-12">
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-stone-900 min-h-80 flex items-center">
        
        {/* Background Image Placeholder with Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-stone-900 bg-cover bg-center">
          {/* Subtle dark gradient overlay to keep text crisp on the left */}
          <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/30"></div>
        </div>

        {/* Content Container (Left-aligned) */}
        <div className="relative z-10 p-8 md:p-12 max-w-xl space-y-4">
          <span className="font-label text-xs uppercase tracking-widest text-[#FCBA5F] font-semibold block">
            Visit The Bousra Roastery
          </span>

          <h2 className="font-head text-3xl md:text-4xl text-stone-100 font-medium leading-tight">
            Experience Fresh Cupping at the Source
          </h2>

          <p className="font-body text-stone-400 text-sm leading-relaxed">
            Located just 14km from Bousra Waterfall. Open daily for estate walks, hand-roasting workshops, and fresh phin tastings.
          </p>

          <div className="pt-2">
            <button className="inline-flex items-center gap-2 bg-[#FCBA5F] hover:bg-[#e0a24d] text-[#120b08] font-label text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-lg transition-colors cursor-pointer">
              <span>View Estate Directions</span>
              <span className="text-sm">↗</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}