import ElevationMap from "./ElevationMap";
import TelemetryPanel from "./TelemetryPanel";
import { legend } from "./contactData";

export default function TerrainSection() {
  return (
    // scroll-mt-24 so the sticky navbar doesn't cover the title when "Terrain Pin" jumps here
    <section id="elevation-map" className="flex w-full scroll-mt-24 flex-col gap-6 py-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="font-label text-[10px] font-semibold uppercase tracking-widest text-[#fcba5f]">
            Sensory Geography
          </span>
          <h2 className="font-head text-[28px] leading-9 font-medium text-[#ede0da] md:text-4xl md:leading-11">
            Plateau Elevation &amp; Microclimate
          </h2>
        </div>

        {/* colour legend */}
        <div className="flex flex-wrap items-center gap-4 font-body text-[13px] text-[#d5c4b1]">
          {legend.map((item) => (
            <span key={item.label} className="flex items-center gap-1">
              <span className={`h-2.5 w-2.5 rounded-full ${item.color}`}></span> {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 overflow-hidden rounded-lg bg-[#211a17] p-6 shadow-xl md:p-10 lg:grid-cols-12">
        <ElevationMap />
        <TelemetryPanel />
      </div>
    </section>
  );
}
