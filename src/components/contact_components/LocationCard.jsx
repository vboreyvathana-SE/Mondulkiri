import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

// One card for one place (Bousra or Phnom Penh).
// All the text comes in through the "location" prop, see contactData.js
export default function LocationCard({ location }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-[#211a17] p-6 shadow-lg">
      {/* top row: tag + badge */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={`flex items-center gap-1 font-label text-[10px] font-semibold uppercase tracking-widest ${location.color}`}
        >
          <span className={`h-2 w-2 rounded-full ${location.dot} ${location.pulse ? "animate-pulse" : ""}`}></span>
          {location.tag}
        </span>
        <span className="shrink-0 rounded bg-[#251e1b] px-1 py-0.5 font-label text-[10px] font-semibold text-[#d5c4b2]">
          {location.badge}
        </span>
      </div>

      <div>
        <h3 className="font-head text-[26px] leading-[34px] font-medium text-[#ede0da]">{location.name}</h3>
        <p className="mt-1 font-body text-[15px] leading-6 text-[#d5c4b1]">{location.address}</p>
      </div>

      {/* hours box */}
      <div className="flex flex-col gap-1 rounded bg-[#251e1b] p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="font-label text-xs font-medium uppercase tracking-wider text-[#9e8e7e]">
            {location.hoursLabel}
          </span>
          <span className={`text-right font-body text-[13px] font-semibold ${location.color}`}>
            {location.hoursValue}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="font-body text-[13px] text-[#d5c4b1]">{location.sessionLabel}</span>
          <span className="text-right font-body text-[13px] text-[#ede0da]">{location.sessionValue}</span>
        </div>

        <div className="mt-1 flex items-center gap-1 pt-1 text-[#9e8e7e]">
          <FontAwesomeIcon icon={location.noteIcon} className={`text-[14px] ${location.color}`} />
          <span className="font-label text-[10px] font-semibold tracking-wider">{location.noteText}</span>
        </div>
      </div>

      {/* bottom row: email + button/label */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="flex min-w-0 flex-col">
          <span className="font-label text-[10px] font-semibold uppercase tracking-wider text-[#9e8e7e]">
            {location.emailLabel}
          </span>
          <span className="truncate font-body text-[13px] text-[#ede0da]">{location.email}</span>
        </div>

        {location.actionHref ? (
          <a
            href={location.actionHref}
            className="flex shrink-0 items-center gap-1 rounded bg-[#302825] px-4 py-1 font-label text-[10px] font-semibold uppercase tracking-wider text-[#fcba5f] transition-colors hover:bg-[#3b3330]"
          >
            <span>{location.actionLabel}</span>
            <FontAwesomeIcon icon={faArrowDown} className="text-[12px]" />
          </a>
        ) : (
          <span className="shrink-0 font-label text-[10px] font-semibold uppercase text-[#9e8e7e]">
            {location.actionLabel}
          </span>
        )}
      </div>
    </div>
  );
}
