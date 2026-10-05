import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faQrcode } from "@fortawesome/free-solid-svg-icons";

// The gold membership pass. The box on the right is a placeholder for a real QR code.
export default function PassCard({ member, pass }) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-linear-to-b from-[#2a1d17] via-[#251e1b] to-[#130d0a] p-6 shadow-2xl">
      <div className="pointer-events-none absolute inset-0 rounded-xl border border-[#fcba5f]/20"></div>
      <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#fcba5f]/15 blur-2xl"></div>

      <div className="relative mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faAward} className="text-[20px] text-[#fcba5f]" />
          <span className="font-label text-[10px] leading-[14px] font-semibold uppercase tracking-widest text-[#fcba5f]">
            {pass.title}
          </span>
        </div>
        <span className="font-label text-[10px] leading-[14px] font-semibold uppercase text-[#9e8e7e]">
          {pass.altitude}
        </span>
      </div>

      <div className="relative my-4">
        <p className="font-head text-xl leading-7 font-semibold text-[#ede0da]">{member.name}</p>
        <p className="font-label text-[10px] leading-[14px] font-semibold uppercase tracking-wider text-[#d5c4b2]">
          {member.tierName}
        </p>
      </div>

      <div className="relative mb-4 flex items-center justify-between gap-4 rounded-lg bg-[#130d0a]/80 p-4 backdrop-blur-sm">
        <div className="flex flex-col">
          <span className="font-label text-[10px] leading-[14px] font-semibold uppercase text-[#9e8e7e]">
            Cupping Passport
          </span>
          <span className="font-head text-xl leading-7 font-semibold text-[#fcba5f]">{pass.passportCount}</span>
          <span className="mt-0.5 font-body text-[11px] leading-4 text-[#d5c4b1]">{pass.passportNote}</span>
        </div>
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded bg-[#302825]">
          <FontAwesomeIcon icon={faQrcode} className="text-[36px] text-[#fcba5f]" />
        </div>
      </div>

      <div className="relative flex flex-wrap items-center justify-between gap-1 pt-1 font-label text-[10px] leading-[14px] font-semibold text-[#9e8e7e]">
        <span>{pass.valid}</span>
        <span className="font-bold text-[#fcba5f]">{pass.validPlaces}</span>
      </div>
    </div>
  );
}
