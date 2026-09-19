export function FeatureSection() {
  return (
    <section className="bg-[#120b08] text-[#837565] px-6 py-20">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* ================= CARD 01 ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-label text-amber-500 font-semibold text-sm">01</span>
              <span className="h-px w-8 bg-amber-500/40"></span>
              <span className="font-label text-xs uppercase tracking-widest text-amber-500/80">
                Terroir Provenance
              </span>
            </div>

            <h2 className="font-head text-3xl md:text-4xl text-stone-100 font-medium leading-tight">
              The Volcanic Red Loam of Sen Monorom
            </h2>

            <p className="font-body text-stone-400 text-sm md:text-base leading-relaxed">
              Perched on the eastern edge of Cambodia near the Bousra waterfalls, Mondulkiri's
              deep red soil was forged by ancient basalt eruptions millions of years ago. It drains
              rapidly during the monsoon downpours while retaining vital iron, potassium, and
              magnesium that nourish the coffee cherries' inner seed.
            </p>

            {/* Metrics Sub-block */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-head text-amber-500 font-bold text-lg block">800 - 1050m</span>
                <p className="font-body text-xs text-stone-400">Cool mountain nights slow ripening for peak sugar density</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-head text-amber-500 font-bold text-lg block">Basalt Loam</span>
                <p className="font-body text-xs text-stone-400">Naturally fertile ground with zero synthetic fertilizers</p>
              </div>
            </div>

            <a href="#geological-map" className="inline-flex items-center gap-2 font-label text-xs tracking-wider uppercase text-amber-500 hover:text-amber-400 transition-colors pt-2">
              Explore Our Geological Map <span>→</span>
            </a>
          </div>

          {/* Image Container with Floating Badge */}
          <div className="relative rounded-2xl overflow-hidden bg-stone-900 aspect-[4/3] border border-white/10 flex items-center justify-center">
            {/* Image Placeholder */}
            <span className="text-stone-600 font-label text-sm uppercase">Image Placeholder 01</span>

            {/* Floating Glass Badge (Bottom Left) */}
            <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs">
              <p className="font-head text-stone-200 font-semibold">Sen Monorom Ridge</p>
              <p className="font-mono text-[10px] text-amber-500/80">12°27' N 107°11' E</p>
            </div>
          </div>
        </div>

        {/* ================= CARD 02 (Reversed Order on Desktop) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Container with Floating Badge (Order 2 on Mobile, 1 on Desktop) */}
          <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden bg-stone-900 aspect-[4/3] border border-white/10 flex items-center justify-center">
            {/* Image Placeholder */}
            <span className="text-stone-600 font-label text-sm uppercase">Image Placeholder 02</span>

            {/* Floating Cupping Score Badge */}
            <div className="absolute bottom-4 right-4 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 w-56 space-y-2">
              <div className="flex justify-between items-center text-xs border-b border-white/10 pb-1.5">
                <span className="font-label uppercase text-stone-400 text-[10px]">Cupping Score</span>
                <span className="font-head font-bold text-amber-500">87.5</span>
              </div>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between"><span className="text-stone-400">Sweetness</span><span className="text-stone-200">9.2/10</span></div>
                <div className="flex justify-between"><span className="text-stone-400">Body & Crema</span><span className="text-stone-200">9.0/10</span></div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-label text-amber-500 font-semibold text-sm">02</span>
              <span className="h-px w-8 bg-amber-500/40"></span>
              <span className="font-label text-xs uppercase tracking-widest text-amber-500/80">
                Processing Mastery
              </span>
            </div>

            <h2 className="font-head text-3xl md:text-4xl text-stone-100 font-medium leading-tight">
              The Artisanal Sun-Cured Red Honey Tables
            </h2>

            <p className="font-body text-stone-400 text-sm md:text-base leading-relaxed">
              Rather than washing away the cherry's sugary mucilage layer, our Red Honey lots
              are depulped leaving 60% of the sweet natural pulp adhering to the parchment. For
              21 days on elevated bamboo beds, farmers turn the beans hourly beneath the
              Mondulkiri sun until amber caramelization occurs.
            </p>

            {/* Feature List */}
            <ul className="space-y-3 font-body text-xs text-stone-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">✓</span>
                <span><strong className="text-stone-100">Gentle Aeration:</strong> Raised bamboo screens prevent ground dampness and maintain airflow.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">✓</span>
                <span><strong className="text-stone-100">Intense Honey Sweetness:</strong> Natural fruit sugars infuse deeply into the green bean heart.</span>
              </li>
            </ul>

            <a href="#red-honey-process" className="inline-flex items-center gap-2 font-label text-xs tracking-wider uppercase text-amber-500 hover:text-amber-400 transition-colors pt-2">
              Order Red Honey Process <span>→</span>
            </a>
          </div>
        </div>

        {/* ================= CARD 03 ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-label text-amber-500 font-semibold text-sm">03</span>
              <span className="h-px w-8 bg-amber-500/40"></span>
              <span className="font-label text-xs uppercase tracking-widest text-amber-500/80">
                Ethical Guardianship
              </span>
            </div>

            <h2 className="font-head text-3xl md:text-4xl text-stone-100 font-medium leading-tight">
              The Indigenous Bunong Highland Collective
            </h2>

            <p className="font-body text-stone-400 text-sm md:text-base leading-relaxed">
              For generations, the Bunong people have guarded the sacred elephant sanctuaries
              and evergreen forests of northeastern Cambodia. We work directly with over 45
              Bunong farming families, paying 40% above international Fair Trade premiums while
              preserving multi-canopy agroforestry systems.
            </p>

            {/* Feature Pill */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-sm">
                🌱
              </div>
              <div>
                <h4 className="font-head text-stone-200 text-sm font-semibold">100% Shade-Grown Canopy</h4>
                <p className="font-body text-xs text-stone-400">Zero deforestation guarantee across all partner estates</p>
              </div>
            </div>

            <a href="#indigenous-collective" className="inline-flex items-center gap-2 font-label text-xs tracking-wider uppercase text-amber-500 hover:text-amber-400 transition-colors pt-2">
              Meet The Indigenous Collective <span>→</span>
            </a>
          </div>

          {/* Image Container with Floating Badge */}
          <div className="relative rounded-2xl overflow-hidden bg-stone-900 aspect-[4/3] border border-white/10 flex items-center justify-center">
            {/* Image Placeholder */}
            <span className="text-stone-600 font-label text-sm uppercase">Image Placeholder 03</span>

            {/* Floating Multi-stat Badge */}
            <div className="absolute bottom-4 right-4 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex gap-6">
              <div>
                <span className="font-head text-2xl font-bold text-amber-500 block">45+</span>
                <span className="font-label text-[10px] uppercase text-stone-400">Bunong Families</span>
              </div>
              <div className="border-l border-white/10 pl-6">
                <span className="font-head text-2xl font-bold text-amber-500 block">+40%</span>
                <span className="font-label text-[10px] uppercase text-stone-400">Living Wage Margin</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}