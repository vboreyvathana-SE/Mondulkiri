import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTowerBroadcast, faTemperatureHalf } from "@fortawesome/free-solid-svg-icons";
import { telemetry } from "./contactData";

// the weather-looking box next to the map (the numbers are fixed text for now)
export default function TelemetryPanel() {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-lg bg-[#251e1b] p-6 lg:col-span-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between pb-1">
          <span className="font-label text-[10px] font-semibold uppercase tracking-widest text-[#fcba5f]">
            Live Terroir Telemetry
          </span>
          <FontAwesomeIcon icon={faTowerBroadcast} className="text-[16px] text-[#9e8e7e]" />
        </div>

        <div className="flex items-baseline gap-2">
          <span className="font-head text-[44px] leading-none text-[#ede0da]">{telemetry.temp}</span>
          <div className="flex flex-col">
            <span className="font-head text-xl font-semibold text-[#fcba5f]">{telemetry.condition}</span>
            <span className="font-label text-[10px] font-semibold uppercase text-[#9e8e7e]">{telemetry.station}</span>
          </div>
        </div>

        <p className="font-body text-[13px] leading-5 text-[#d5c4b1]">{telemetry.description}</p>
      </div>

      <div className="flex flex-col gap-1 pt-1">
        {telemetry.rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-2 py-1">
            <span className="font-body text-[13px] text-[#d5c4b1]">{row.label}</span>
            <span
              className={`text-right font-mono text-[13px] font-semibold ${row.highlight ? "text-[#fcba5f]" : "text-[#ede0da]"}`}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded bg-[#302825] p-2">
        <FontAwesomeIcon icon={faTemperatureHalf} className="text-[18px] text-[#fcba5f]" />
        <span className="font-label text-[10px] font-semibold text-[#d5c4b2]">{telemetry.tip}</span>
      </div>
    </div>
  );
}
