import React from 'react'

export default function Desc() {
return (
    <section className="bg-[#120b08] text-[#837565] px-8 py-16 border-y border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Quote & Paragraph (Spans 7 columns on desktop) */}
        <div className="lg:col-span-7 space-y-4">
          <span className="font-label text-xs tracking-widest uppercase text-amber-500 font-semibold block">
            Single Origin Philosophy
          </span>
          
          <h2 className="font-bold font-head text-3xl md:text-4xl text-stone-100 leading-tight">
            "From Cambodia's volcanic highland mist directly to your brewing kettle."
          </h2>
          
          <p className="font-body text-stone-400 text-sm md:text-base leading-relaxed max-w-2xl">
            Unlike industrial blends, Mondulkiri beans are shade-grown under native
            dipterocarp forest trees, harvested at peak Brix sweetness by indigenous Bunong
            families, and naturally processed with pure mountain stream water.
          </p>
        </div>

        {/* Right Side: 3 Metrics with Divider Line (Spans 5 columns on desktop) */}
        <div className="lg:col-span-5 flex items-center gap-8 pl-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0">
          
          {/* Stat 1 */}
          <div className="space-y-1">
            <h3 className="font-head text-2xl md:text-3xl font-bold text-amber-500">
              800-1050m
            </h3>
            <p className="font-label text-[10px] tracking-widest uppercase text-stone-400">
              Highland Altitude
            </p>
          </div>

          {/* Stat 2 */}
          <div className="space-y-1">
            <h3 className="font-head text-2xl md:text-3xl font-bold text-amber-500">
              100%
            </h3>
            <p className="font-label text-[10px] tracking-widest uppercase text-stone-400">
              Volcanic Red Loam
            </p>
          </div>

          {/* Stat 3 */}
          <div className="space-y-1">
            <h3 className="font-head text-2xl md:text-3xl font-bold text-amber-500">
              Micro-Batch
            </h3>
            <p className="font-label text-[10px] tracking-widest uppercase text-stone-400">
              Slow Hardwood Roasting
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
