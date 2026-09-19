import { useState } from 'react';

export function BrewingGuide() {
  const [method, setMethod] = useState('phin'); // 'phin', 'press', 'coldbrew'
  const [coffeeGrams, setCoffeeGrams] = useState(32);

  // Brew parameters based on selected method
  const brewConfigs = {
    phin: { ratio: 15, temp: '93°C', time: '3:30 min', grind: 'Medium-Fine' },
    press: { ratio: 12, temp: '95°C', time: '4:00 min', grind: 'Coarse' },
    coldbrew: { ratio: 8, temp: 'Room Temp', time: '16:00 hrs', grind: 'Extra Coarse' },
  };

  const currentConfig = brewConfigs[method];
  const requiredWater = coffeeGrams * currentConfig.ratio;

  return (
    <section className="bg-[#120b08] text-[#837565] px-6 py-16">
      <div className=" bg-[#1a110d] border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Descriptions & Method Selector */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-label text-xs uppercase tracking-widest text-amber-500 font-semibold block">
              Precision Ritual
            </span>
            
            <h2 className="font-head text-3xl md:text-4xl text-stone-100 font-medium leading-tight">
              The Mondulkiri Artisan Brewing Guide
            </h2>
            
            <p className="font-body text-stone-400 text-sm leading-relaxed">
              Dense highland beans require measured extraction. Select your brew method to compute the recommended grind scale, water temperature, and golden coffee-to-water ratio.
            </p>

            {/* Method Tabs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => setMethod('phin')}
                className={`px-4 py-2.5 rounded-lg text-xs font-label uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  method === 'phin'
                    ? 'bg-[#FCBA5F] text-[#120b08]'
                    : 'bg-white/5 text-stone-300 border border-white/10 hover:border-amber-500/40'
                }`}
              >
                Phin Drip / Pour Over
              </button>

              <button
                onClick={() => setMethod('press')}
                className={`px-4 py-2.5 rounded-lg text-xs font-label uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  method === 'press'
                    ? 'bg-[#FCBA5F] text-[#120b08]'
                    : 'bg-white/5 text-stone-300 border border-white/10 hover:border-amber-500/40'
                }`}
              >
                French Press
              </button>

              <button
                onClick={() => setMethod('coldbrew')}
                className={`px-4 py-2.5 rounded-lg text-xs font-label uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  method === 'coldbrew'
                    ? 'bg-[#FCBA5F] text-[#120b08]'
                    : 'bg-white/5 text-stone-300 border border-white/10 hover:border-amber-500/40'
                }`}
              >
                Highland Cold Brew
              </button>
            </div>
          </div>

          {/* Right Column: Calculator Widget */}
          <div className="lg:col-span-6 bg-black/40 border border-white/10 rounded-xl p-6 md:p-8 space-y-8">
            
            {/* Interactive Slider & Result Box */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Slider Area */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex justify-between items-center text-xs font-label">
                  <span className="uppercase text-stone-400 tracking-wider">Ground Coffee</span>
                  <span className="font-head text-amber-500 text-lg font-bold">{coffeeGrams} g</span>
                </div>

                {/* Custom Range Input (The Interactive Ball) */}
                <input
                  type="range"
                  min="15"
                  max="40"
                  value={coffeeGrams}
                  onChange={(e) => setCoffeeGrams(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#FCBA5F]"
                />

                <div className="flex justify-between text-[11px] text-stone-500 font-body">
                  <span>Single Cup (15g)</span>
                  <span>Double Pot (40g)</span>
                </div>
              </div>

              {/* Calculated Result Box */}
              <div className="md:col-span-5 bg-stone-900/80 border border-white/10 rounded-lg p-4 space-y-1">
                <span className="font-label text-[10px] uppercase text-amber-500/90 tracking-wider block">
                  Required Spring Water
                </span>
                <p className="font-head text-3xl font-bold text-stone-100">
                  {requiredWater} ml
                </p>
                <span className="font-body text-[11px] text-stone-400 block">
                  1:{currentConfig.ratio} Golden Highland Extraction
                </span>
              </div>

            </div>

            {/* Sub-metrics Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center">
              <div>
                <span className="font-label text-[10px] uppercase text-stone-500 block">Water Temp</span>
                <span className="font-head text-amber-500 font-bold text-sm md:text-base">{currentConfig.temp}</span>
              </div>
              <div>
                <span className="font-label text-[10px] uppercase text-stone-500 block">Brew Time</span>
                <span className="font-head text-amber-500 font-bold text-sm md:text-base">{currentConfig.time}</span>
              </div>
              <div>
                <span className="font-label text-[10px] uppercase text-stone-500 block">Grind Size</span>
                <span className="font-head text-amber-500 font-bold text-sm md:text-base">{currentConfig.grind}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}