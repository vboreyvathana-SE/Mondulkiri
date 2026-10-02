import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";

export default function SamplerBanner() {
  return (
    <section className="w-full py-10">
      <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-lg bg-[#302825] p-6 shadow-xl md:flex-row md:p-10">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#fcba5f]/10 text-[#fcba5f]">
            <FontAwesomeIcon icon={faMugHot} className="text-[28px]" />
          </div>

          <div className="flex flex-col">
            <span className="font-label text-[10px] font-semibold uppercase tracking-widest text-[#fcba5f]">
              Sensory Guarantee
            </span>
            <h3 className="font-head text-[26px] leading-[34px] font-medium text-[#ede0da]">
              Curious about upcoming seasonal micro-lots?
            </h3>
            <p className="font-body text-[13px] leading-5 text-[#d5c4b1]">
              Request our seasonal green coffee cupping sampler set mailed directly to your roastery.
            </p>
          </div>
        </div>

        <a
          href="mailto:wholesale@mondulkiricoffee.kh?subject=Sampler%20Request"
          className="w-full rounded bg-[#18120f] px-6 py-2 text-center font-label text-xs font-medium tracking-wider whitespace-nowrap text-[#fcba5f] uppercase transition-colors hover:bg-[#251e1b] md:w-auto"
        >
          Inquire for Sample Set
        </a>
      </div>
    </section>
  );
}
