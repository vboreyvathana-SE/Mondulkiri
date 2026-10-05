import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faSliders, faClockRotateLeft, faGear } from "@fortawesome/free-solid-svg-icons";
import Thumb from "./Thumb";

const smallButton =
  "flex cursor-pointer items-center gap-1 rounded px-3 py-1.5 font-label text-[10px] leading-[14px] font-semibold uppercase tracking-wider transition-colors";

// The monthly subscription: next date, the two coffees, and the 3 small buttons.
// (Modify Grind / Skip Dispatch / Settings wait for the API.)
export default function SubscriptionCard({ subscription }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-[#211a17] p-6 shadow-lg sm:p-10">
      <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 flex items-center gap-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#fcba5f]"></span>
            <span className="ml-1 font-label text-[10px] leading-[14px] font-semibold uppercase tracking-widest text-[#fcba5f]">
              {subscription.tag}
            </span>
          </div>
          <h2 className="font-head text-[26px] leading-[34px] font-medium text-[#ede0da]">{subscription.title}</h2>
        </div>

        <div className="flex flex-col items-start rounded-lg bg-[#251e1b] px-4 py-1 sm:items-end">
          <span className="font-label text-[10px] leading-[14px] font-semibold uppercase text-[#9e8e7e]">
            Next Roasting &amp; Dispatch
          </span>
          <span className="font-head text-xl leading-7 font-semibold text-[#fcba5f]">{subscription.nextDispatch}</span>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {subscription.lots.map((lot) => (
          <div
            key={lot.name}
            className="flex items-center gap-4 rounded-lg bg-[#251e1b] p-4 transition-colors hover:bg-[#302825]"
          >
            <Thumb image={lot.image} alt={lot.name} className="h-24 w-20" />

            <div className="flex min-w-0 flex-col">
              <div className={`mb-1 flex items-center gap-1 ${lot.color}`}>
                <FontAwesomeIcon icon={lot.icon} className="text-[12px]" />
                <span className="font-label text-[10px] leading-[14px] font-semibold uppercase tracking-wider">
                  {lot.tag}
                </span>
              </div>
              <h3 className="truncate font-head text-xl leading-7 font-semibold text-[#ede0da]">{lot.name}</h3>
              <p className="truncate font-body text-[13px] leading-5 text-[#d5c4b1]">{lot.details}</p>
              <div className="mt-2 flex flex-wrap items-center gap-1">
                {lot.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded bg-[#3b3330] px-1 py-0.5 font-label text-[10px] leading-[14px] font-semibold text-[#d5c4b2]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* bottom bar */}
      <div className="-mx-6 -mb-6 flex flex-wrap items-center justify-between gap-4 bg-[#130d0a] px-6 py-4 sm:-mx-10 sm:-mb-10 sm:px-10">
        <div className="flex items-center gap-2 font-body text-[13px] leading-5 text-[#d5c4b1]">
          <FontAwesomeIcon icon={faTruck} className="text-[16px] text-[#fcba5f]" />
          <span>{subscription.cadence}</span>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          <button type="button" className={`${smallButton} bg-[#302825] text-[#ede0da] hover:bg-[#3f3834]`}>
            <FontAwesomeIcon icon={faSliders} className="text-[12px]" /> Modify Grind
          </button>
          <button type="button" className={`${smallButton} bg-[#302825] text-[#ede0da] hover:bg-[#3f3834]`}>
            <FontAwesomeIcon icon={faClockRotateLeft} className="text-[12px]" /> Skip Dispatch
          </button>
          <button
            type="button"
            className={`${smallButton} bg-[#75381e] text-[#f9a382] hover:bg-[#ffb599] hover:text-[#552008]`}
          >
            <FontAwesomeIcon icon={faGear} className="text-[12px]" /> Subscription Settings
          </button>
        </div>
      </div>
    </div>
  );
}
