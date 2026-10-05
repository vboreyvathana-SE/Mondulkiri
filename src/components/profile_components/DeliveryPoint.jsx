import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faLock } from "@fortawesome/free-solid-svg-icons";

// Where the coffee is sent + how it's paid. (Edit waits for the API.)
export default function DeliveryPoint({ delivery }) {
  return (
    <div className="rounded-xl bg-[#211a17] p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-label text-sm leading-[18px] font-semibold uppercase tracking-wider text-[#fcba5f]">
          Active Delivery Point
        </h3>
        <button
          type="button"
          className="cursor-pointer font-label text-[10px] leading-[14px] font-semibold uppercase text-[#d5c4b1] transition-colors hover:text-[#fcba5f]"
        >
          Edit
        </button>
      </div>

      <div className="mb-4 flex items-start gap-2">
        <FontAwesomeIcon icon={faHouse} className="mt-1 text-[16px] text-[#fcba5f]" />
        <div className="flex flex-col">
          <span className="font-body text-[15px] leading-6 font-medium text-[#ede0da]">{delivery.place}</span>
          {delivery.lines.map((line) => (
            <span key={line} className="font-body text-[13px] leading-5 text-[#d5c4b1]">
              {line}
            </span>
          ))}
          <span className="mt-1 font-body text-[13px] leading-5 text-[#d5c4b2]">{delivery.contact}</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 rounded bg-[#251e1b] p-2 font-body text-[13px] leading-5 text-[#d5c4b1]">
        <span className="flex items-center gap-1.5">
          <FontAwesomeIcon icon={faLock} className="text-[13px] text-[#fcba5f]" />
          Payment Method
        </span>
        <span className="font-label text-[10px] leading-[14px] font-semibold text-[#ede0da]">{delivery.payment}</span>
      </div>
    </div>
  );
}
