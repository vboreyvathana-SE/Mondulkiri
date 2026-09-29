import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot, faShieldHalved, faClock, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Subscription() {
  const [frequency, setFrequency] = useState('2weeks');

  return (
    <section className="bg-[#120b08] px-6 py-12">
      <div className=" bg-[#1a110d] border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Offer Details & Frequency Selector */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
              <FontAwesomeIcon icon={faMugHot} className="text-amber-500 text-xs" />
              <span className="font-label text-[10px] uppercase tracking-widest text-amber-500/90 font-semibold">
                Roaster's Club • Never Run Out Of Fresh Crema
              </span>
            </div>

            <h2 className="font-head text-3xl md:text-4xl text-stone-100 font-medium leading-tight">
              Highland Reserve Subscription
            </h2>

            <p className="font-body text-stone-400 text-sm md:text-base leading-relaxed">
              Freshly batch-roasted every alternating Monday and dispatched directly to your
              doorstep with guaranteed 48-hour post-roast degas timing. Enjoy complimentary
              shipping and 15% off cellar reserve selections.
            </p>

            {/* Interactive Frequency Picker */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="inline-flex p-1 rounded-xl bg-black/50 border border-white/10 gap-1">
                <button
                  onClick={() => setFrequency('1week')}
                  className={`px-4 py-2 rounded-lg text-xs font-label uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    frequency === '1week'
                      ? 'bg-[#FCBA5F] text-[#120b08]'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Every 1 Week
                </button>

                <button
                  onClick={() => setFrequency('2weeks')}
                  className={`px-4 py-2 rounded-lg text-xs font-label uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    frequency === '2weeks'
                      ? 'bg-[#FCBA5F] text-[#120b08]'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Every 2 Weeks
                </button>

                <button
                  onClick={() => setFrequency('4weeks')}
                  className={`px-4 py-2 rounded-lg text-xs font-label uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    frequency === '4weeks'
                      ? 'bg-[#FCBA5F] text-[#120b08]'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Every 4 Weeks
                </button>
              </div>

              <span className="font-label text-xs uppercase tracking-wider text-amber-500 font-bold">
                Save 15% On Every Roast
              </span>
            </div>

          </div>

          {/* Right Column: Subscriber Privileges Box */}
          <div className="lg:col-span-5 bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
            <span className="font-label text-[10px] uppercase tracking-widest text-stone-400 font-semibold block border-b border-white/5 pb-2">
              Subscriber Privileges
            </span>

            {/* Privilege Item 1 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={faShieldHalved} className="text-sm" />
              </div>
              <div className="space-y-1">
                <h4 className="font-head text-stone-100 text-base font-medium">
                  Priority Micro-Lot Access
                </h4>
                <p className="font-body text-xs text-stone-400 leading-relaxed">
                  Early allocations of small 100kg experimental ferments and Peaberry crops before public shop availability.
                </p>
              </div>
            </div>

            {/* Privilege Item 2 */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={faClock} className="text-sm" />
              </div>
              <div className="space-y-1">
                <h4 className="font-head text-stone-100 text-base font-medium">
                  Complete Flexibility
                </h4>
                <p className="font-body text-xs text-stone-400 leading-relaxed">
                  Pause, switch roast origins, adjust grind size, or cancel seamlessly anytime through your Maison portal.
                </p>
              </div>
            </div>

            {/* Join CTA Button */}
            <Link to="login" className="w-full bg-[#FCBA5F] hover:bg-[#e0a24d] text-[#120b08] font-label text-xs uppercase tracking-wider font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg">
              <span>Join Roaster's Club</span>
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}