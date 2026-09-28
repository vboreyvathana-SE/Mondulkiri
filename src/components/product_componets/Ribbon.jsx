import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faClock, faShieldHalved, faSeedling } from '@fortawesome/free-solid-svg-icons';

export default function GuaranteeRibbon() {
  const guarantees = [
    {
      icon: faFire,
      title: 'Small-Batch Flame Drums',
      desc: 'Roasted in batches under 15kg',
    },
    {
      icon: faClock,
      title: 'Dispatched Within 48h',
      desc: 'Always shipped at peak freshness',
    },
    {
      icon: faShieldHalved,
      title: 'Nitrogen Degas Valve',
      desc: 'Kraft barrier sealed aroma',
    },
    {
      icon: faSeedling,
      title: '100% Volcanic Terroir',
      desc: 'Direct trade with Bunong growers',
    },
  ];

  return (
    <section className="bg-[#120b08] px-6 pb-12">
      <div className="bg-[#1a110d] border border-white/5 rounded-2xl p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl hover-up bg-white/5 border border-white/10 text-amber-500 flex items-center justify-center text-sm shrink-0">
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-head text-stone-100 text-sm font-semibold leading-tight">
                  {item.title}
                </h4>
                <p className="font-body text-xs text-stone-400">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}