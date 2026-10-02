import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNetworkWired } from "@fortawesome/free-solid-svg-icons";
import { alliances } from "./contactData";

export default function GlobalAlliances() {
  return (
    <div className="flex flex-col gap-2 overflow-hidden rounded-lg bg-[#302825] p-6">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faNetworkWired} className="text-[20px] text-[#fcba5f]" />
        <span className="font-label text-xs font-medium uppercase tracking-wider text-[#ede0da]">
          {alliances.title}
        </span>
      </div>

      <p className="font-body text-[13px] leading-5 text-[#d5c4b1]">{alliances.text}</p>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="font-label text-[10px] font-semibold text-[#fcba5f]">{alliances.deskLabel}</span>
        <span className="font-mono text-[10px] font-semibold text-[#d5c4b2]">{alliances.email}</span>
      </div>
    </div>
  );
}
