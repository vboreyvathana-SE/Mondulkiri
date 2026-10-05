import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faLocationDot,
  faWheatAwn,
  faGift,
  faQrcode,
  faMugSaucer,
} from "@fortawesome/free-solid-svg-icons";

// "Sovan Chamroeun" -> "SC"
function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

// The big card at the top: avatar, name, tier, points and the two buttons.
// (Redeem / Passport Check-In don't do anything yet, they wait for the API.)
export default function ProfileHeader({ member }) {
  return (
    <section className="relative w-full pb-8">
      <div className="pointer-events-none absolute -top-16 -left-12 h-96 w-96 rounded-full bg-[#fcba5f]/5 blur-3xl"></div>
      <div className="pointer-events-none absolute top-20 right-0 h-80 w-80 rounded-full bg-[#75381e]/20 blur-3xl"></div>

      <div className="relative overflow-hidden rounded-xl bg-[#211a17] p-6 shadow-xl md:p-10">
        {/* big faded cup in the corner */}
        <div className="pointer-events-none absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-5 select-none">
          <FontAwesomeIcon icon={faMugSaucer} className="text-[320px] text-[#fcba5f]" />
        </div>

        <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          {/* left: who */}
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-linear-to-tr from-[#d99b43] via-[#302825] to-[#ffb599] p-1 sm:h-28 sm:w-28">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#3b3330]">
                  <span className="font-head text-[32px] font-medium text-[#fcba5f]">
                    {getInitials(member.name)}
                  </span>
                </div>
              </div>
              <div className="absolute -right-1 -bottom-1 flex items-center justify-center rounded-full bg-[#fcba5f] p-1.5 text-[#462b00] shadow-md">
                <FontAwesomeIcon icon={faCircleCheck} className="text-[14px]" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#75381e] px-2 py-0.5 font-label text-[10px] leading-[14px] font-semibold uppercase tracking-wider text-[#f9a382]">
                  {member.badge}
                </span>
                <span className="font-label text-[10px] text-[#9e8e7e]">•</span>
                <span className="font-label text-[10px] leading-[14px] font-semibold uppercase tracking-widest text-[#fcba5f]">
                  {member.status}
                </span>
              </div>

              <h1 className="font-head text-[28px] leading-9 font-medium tracking-tight text-[#ede0da] md:text-4xl md:leading-11">
                {member.name}
              </h1>

              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 font-body text-[13px] leading-5 text-[#d5c4b1]">
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faLocationDot} className="text-[13px] text-[#fcba5f]" />
                  {member.location}
                </span>
                <span className="text-[#9e8e7e]">•</span>
                <span>Guild Patron since {member.since}</span>
                <span className="text-[#9e8e7e]">•</span>
                <span className="font-label text-[10px] font-semibold text-[#fcba5f]">ID: {member.id}</span>
              </div>
            </div>
          </div>

          {/* right: points + buttons */}
          <div className="flex flex-col items-stretch gap-4 pt-2 sm:flex-row sm:items-center lg:pt-0">
            <div className="flex min-w-[200px] flex-col justify-center rounded-lg bg-[#251e1b] px-6 py-4">
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="font-label text-[10px] leading-[14px] font-semibold uppercase tracking-wider text-[#9e8e7e]">
                  Terroir Points
                </span>
                <FontAwesomeIcon icon={faWheatAwn} className="text-[16px] text-[#fcba5f]" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-head text-4xl leading-11 font-medium text-[#fcba5f]">{member.points}</span>
                <span className="font-label text-[10px] font-semibold uppercase text-[#d5c4b1]">pts</span>
              </div>
              <p className="mt-1 font-body text-[13px] leading-5 text-[#d5c4b2]">{member.pointsNote}</p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#d99b43] px-4 py-2 font-label text-xs leading-4 font-medium uppercase tracking-wider text-[#563500] shadow-md transition-all duration-300 hover:bg-[#fcba5f]"
              >
                <FontAwesomeIcon icon={faGift} className="text-[15px]" />
                <span>Redeem Micro-Lot</span>
              </button>
              <button
                type="button"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#302825] px-4 py-2 font-label text-xs leading-4 font-medium uppercase tracking-wider text-[#d5c4b1] transition-colors hover:bg-[#3b3330] hover:text-[#ede0da]"
              >
                <FontAwesomeIcon icon={faQrcode} className="text-[15px]" />
                <span>Passport Check-In</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
