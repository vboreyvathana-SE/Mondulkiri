import FlavorBar from "./FlavorBar";
import RadarChart from "./RadarChart";

export default function FlavorProfile({ flavor }) {
  return (
    <div className="rounded-xl bg-[#211a17] p-6 shadow-lg sm:p-10">
      <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <span className="font-label text-[10px] leading-[14px] font-semibold uppercase tracking-widest text-[#fcba5f]">
            Sensory Stewardship
          </span>
          <h2 className="font-head text-[26px] leading-[34px] font-medium text-[#ede0da]">Your Terroir Flavor Profile</h2>
        </div>
        <span className="w-fit rounded bg-[#251e1b] px-2 py-1 font-label text-[10px] leading-[14px] font-semibold text-[#d5c4b2]">
          {flavor.calibrated}
        </span>
      </div>

      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          {flavor.bars.map((bar) => (
            <FlavorBar
              key={bar.label}
              label={bar.label}
              valueLabel={bar.valueLabel}
              percent={bar.percent}
              fill={bar.fill}
              ends={bar.ends}
            />
          ))}

          <FlavorBar
            label={flavor.split.label}
            valueLabel={flavor.split.valueLabel}
            percent={flavor.split.first}
            ends={flavor.split.ends}
            valueColor="text-[#ffb599]"
          />
        </div>

        <div className="flex flex-col items-center justify-center rounded-lg bg-[#251e1b] p-4">
          <div className="aspect-square w-full max-w-[300px]">
            <RadarChart axes={flavor.radar} />
          </div>
          <p className="mt-2 text-center font-label text-[10px] leading-[14px] font-semibold uppercase tracking-wider text-[#9e8e7e]">
            Next Roaster's Pick recommendation matched to{" "}
            <span className="font-bold text-[#fcba5f]">{flavor.match}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
