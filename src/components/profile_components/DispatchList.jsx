import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faStar, faPenToSquare, faRepeat, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import Thumb from "./Thumb";

const smallButton =
  "flex cursor-pointer items-center gap-1 rounded px-3 py-1.5 font-label text-[10px] leading-[14px] font-semibold uppercase tracking-wider transition-colors";

// Recent orders. Two kinds:
//   status "delivered" -> shows the cupping score + Update Notes + Reorder
//   status "transit"   -> shows the arrival time + Track Courier
// onViewAll is optional. If you don't pass it, the "View All" link is hidden.
export default function DispatchList({ dispatches, onViewAll }) {
  return (
    <div className="rounded-xl bg-[#211a17] p-6 shadow-lg sm:p-10">
      <div className="mb-6 flex items-center justify-between gap-2">
        <div>
          <span className="font-label text-[10px] leading-[14px] font-semibold uppercase tracking-widest text-[#9e8e7e]">
            Provenance &amp; Delivery Archive
          </span>
          <h2 className="font-head text-[26px] leading-[34px] font-medium text-[#ede0da]">Recent Roastery Dispatches</h2>
        </div>

        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="flex shrink-0 cursor-pointer items-center gap-1 font-label text-xs leading-4 font-medium uppercase tracking-wider text-[#fcba5f] transition-colors hover:text-[#ffddb5]"
          >
            <span>View All ({dispatches.total})</span>
            <FontAwesomeIcon icon={faArrowRight} className="text-[13px]" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {dispatches.items.map((order) => {
          const delivered = order.status === "delivered";

          return (
            <div
              key={order.id}
              className="flex flex-col justify-between gap-4 rounded-lg bg-[#251e1b] p-4 transition-colors hover:bg-[#302825] md:flex-row md:items-center"
            >
              <div className="flex min-w-0 items-center gap-4">
                <Thumb image={order.image} alt={order.title} className="h-16 w-16" />

                <div className="flex min-w-0 flex-col">
                  <div className="flex flex-wrap items-center gap-1">
                    <span
                      className={`font-label text-[10px] leading-[14px] font-bold ${delivered ? "text-[#fcba5f]" : "text-[#ffb599]"}`}
                    >
                      {order.id}
                    </span>
                    <span
                      className={`rounded px-1 py-0.5 font-label text-[10px] font-semibold uppercase ${
                        delivered ? "bg-[#3b3330] text-[#fcba5f]" : "bg-[#75381e] text-[#f9a382]"
                      }`}
                    >
                      {order.badge}
                    </span>
                  </div>
                  <h3 className="truncate font-head text-xl leading-7 font-semibold text-[#ede0da]">{order.title}</h3>
                  <p className="font-body text-[13px] leading-5 text-[#d5c4b1]">{order.note}</p>
                </div>
              </div>

              {delivered ? (
                <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
                  <div className="flex items-center gap-1 rounded bg-[#130d0a] px-2 py-1.5">
                    <FontAwesomeIcon icon={faStar} className="text-[14px] text-[#fcba5f]" />
                    <span className="font-label text-[10px] leading-[14px] font-semibold text-[#ede0da]">
                      Logged: {order.score}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={`${smallButton} bg-[#302825] text-[#ede0da] hover:bg-[#d99b43] hover:text-[#563500]`}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} className="text-[12px]" />
                    <span>Update Notes</span>
                  </button>
                  <button type="button" className={`${smallButton} bg-[#d99b43] text-[#563500] hover:bg-[#fcba5f]`}>
                    <FontAwesomeIcon icon={faRepeat} className="text-[12px]" />
                    <span>Reorder</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="hidden flex-col text-right sm:flex">
                    <span className="font-label text-[10px] leading-[14px] font-semibold uppercase text-[#9e8e7e]">
                      Est. Arrival
                    </span>
                    <span className="font-body text-[13px] leading-5 font-semibold text-[#ede0da]">{order.arrival}</span>
                  </div>
                  <button type="button" className={`${smallButton} bg-[#302825] text-[#ede0da] hover:bg-[#3f3834]`}>
                    <FontAwesomeIcon icon={faLocationArrow} className="text-[12px]" />
                    <span>Track Courier</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
