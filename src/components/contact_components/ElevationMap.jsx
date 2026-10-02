import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faMugHot,
  faWater,
  faMountainSun,
  faSeedling,
  faCompass,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { mapInfo } from "./contactData";

// The "map" is not a real map, it's an SVG background with a row of 3 stops on top.
export default function ElevationMap() {
  return (
    <div className="flex flex-col gap-4 lg:col-span-8">
      <div className="relative flex h-80 w-full items-center justify-center overflow-hidden rounded-lg bg-[#251e1b] p-6">
        {/* wavy lines in the background */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
          preserveAspectRatio="none"
          viewBox="0 0 800 400"
          aria-hidden="true"
        >
          <path d="M0,220 C150,180 280,260 400,210 C520,160 680,240 800,190 L800,400 L0,400 Z" fill="#251e1b" />
          <path
            d="M0,170 C160,110 320,220 480,140 C640,60 720,150 800,100 L800,400 L0,400 Z"
            fill="#302825"
            fillOpacity="0.4"
          />
          <path
            d="M-50,300 C200,290 350,340 500,280 C650,220 750,310 850,260"
            fill="none"
            stroke="#fcba5f"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />
          <path
            d="M-50,240 C180,220 300,270 480,210 C620,150 720,230 850,180"
            fill="none"
            stroke="#ffb599"
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
          <path
            d="M-50,180 C150,150 320,190 460,120 C600,60 700,130 850,90"
            fill="none"
            stroke="#d5c4b2"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
        </svg>

        {/* coordinates tag, top left */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-1 rounded bg-[#3b3330]/80 p-2 backdrop-blur">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#fcba5f]">
            {mapInfo.corridor}
          </span>
          <span className="font-mono text-[13px] text-[#ede0da]">{mapInfo.coords}</span>
        </div>

        <div className="relative z-10 flex w-full max-w-lg flex-col gap-6">
          {/* the 3 stops */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#3b3330] text-[#ede0da] shadow-md">
                <FontAwesomeIcon icon={faBuilding} className="text-[14px]" />
              </div>
              <span className="mt-1 w-16 text-center font-label text-[10px] font-semibold text-[#9e8e7e] sm:w-auto">
                Town Hub (800m)
              </span>
            </div>

            <div className="relative mx-2 h-0.5 flex-1 bg-linear-to-r from-[#3b3330] via-[#fcba5f] to-[#d99b43]">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-label text-[10px] tracking-wider whitespace-nowrap text-[#d5c4b2] uppercase">
                {mapInfo.trailOne}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 animate-bounce items-center justify-center rounded-xl bg-[#fcba5f] font-bold text-[#462b00] shadow-lg ring-4 ring-[#fcba5f]/20 motion-reduce:animate-none">
                <FontAwesomeIcon icon={faMugHot} className="text-[18px]" />
              </div>
              <span className="mt-1 w-20 text-center font-label text-[10px] font-semibold text-[#fcba5f] sm:w-auto">
                Bousra Roastery (920m)
              </span>
            </div>

            <div className="relative mx-2 h-0.5 flex-1 bg-linear-to-r from-[#fcba5f] via-[#ffb599] to-[#3b3330]">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-label text-[10px] tracking-wider whitespace-nowrap text-[#d5c4b2] uppercase">
                {mapInfo.trailTwo}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#3b3330] text-[#ffb599] shadow-md">
                <FontAwesomeIcon icon={faWater} className="text-[14px]" />
              </div>
              <span className="mt-1 w-16 text-center font-label text-[10px] font-semibold text-[#9e8e7e] sm:w-auto">
                Cataract (1,200m)
              </span>
            </div>
          </div>

          {/* profile + soil bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded bg-[#130d0a]/80 p-2 text-[13px] backdrop-blur">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faMountainSun} className="text-[14px] text-[#fcba5f]" />
              <span className="text-[#d5c4b1]">Topographic Profile:</span>
              <span className="font-mono text-[#ede0da]">{mapInfo.profile}</span>
            </div>
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faSeedling} className="text-[14px] text-[#ffb599]" />
              <span className="text-[#d5c4b1]">Soil Type:</span>
              <span className="font-mono text-[#ede0da]">{mapInfo.soil}</span>
            </div>
          </div>
        </div>

        {/* datum label, bottom right */}
        <div className="absolute right-4 bottom-4 z-10 flex items-center gap-1 font-label text-[11px] font-semibold tracking-wider text-[#9e8e7e] uppercase">
          <FontAwesomeIcon icon={faCompass} className="text-[12px]" />
          <span>{mapInfo.datum}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-1 text-[13px] text-[#d5c4b1] sm:flex-row sm:items-center sm:justify-between">
        <span>{mapInfo.footnote}</span>

        {/* there's no KML file yet, so this button doesn't do anything for now */}
        <button
          type="button"
          className="flex shrink-0 cursor-pointer items-center gap-1 font-label text-[10px] font-semibold uppercase tracking-wider text-[#fcba5f] hover:underline"
        >
          Download GPS KML <FontAwesomeIcon icon={faDownload} className="text-[12px]" />
        </button>
      </div>
    </div>
  );
}
