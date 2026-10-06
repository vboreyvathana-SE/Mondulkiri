import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Tola Sophal",
    role: "Owner, Maison Sambath • Phnom Penh",
    quote:
      "Switching our house espresso to Mondulkiri's high-altitude micro-lot elevated our whole guest identity. Their 48-hour post-roast pledge has never slipped once in two years of operation.",
  },
  {
    name: "Elena Voronina",
    role: "Beverage Director, Luminary Atelier • Siem Reap",
    quote:
      "The Phin immersion curriculum transformed how our baristas convey Cambodian heritage. Customers now seek out our slow-drip tasting flight specifically.",
  },
  {
    name: "Kasem Wattana",
    role: "Founder, Craft Root Coffee • Bangkok",
    quote:
      "Their private label roasting team engineered a custom anaerobic profile that perfectly matches our butter viennoiserie. The craft packaging with custom brass foil looks extraordinary on our retail shelves.",
  },
];

function Stars() {
  return (
    <div className="flex gap-1" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} className="fill-[#f5a742] text-[#f5a742]" aria-hidden="true" />
      ))}
    </div>
  );
}

function ArrowButton({ label, disabled, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-10 w-11 items-center justify-center rounded bg-[#241e1a] text-[#f3e9dc] transition-colors hover:bg-[#352c26] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5a742] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#241e1a]"
    >
      {children}
    </button>
  );
}

export default function ServiceDesc() {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateButtons();
    window.addEventListener("resize", updateButtons);
    return () => window.removeEventListener("resize", updateButtons);
  }, []);

  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const step = card ? card.offsetWidth + 16 : el.clientWidth; // 16px = gap-4
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="bg-[#14100d] px-4 py-10 font-sans text-[#f3e9dc] md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#f5a742]">
              Voices of the Industry
            </p>
            <h2 className="mt-1 font-serif text-4xl font-medium text-[#f7efe3]">
              Trusted by Visionary Cafes
            </h2>
          </div>
          <div className="flex gap-2">
            <ArrowButton label="Previous testimonials" disabled={!canPrev} onClick={() => scrollByCard(-1)}>
              <ArrowLeft size={18} />
            </ArrowButton>
            <ArrowButton label="Next testimonials" disabled={!canNext} onClick={() => scrollByCard(1)}>
              <ArrowRight size={18} />
            </ArrowButton>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={updateButtons}
          className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="flex w-[85%] flex-none snap-start flex-col rounded-lg bg-[#241e1a] p-5 sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
            >
              <Stars />
              <blockquote className="mt-4 text-[13px] italic leading-7 text-[#d6c8b6]">
                “{t.quote}”
              </blockquote>

              <footer className="mt-auto flex items-center gap-3 pt-8">
                <div
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#4f3b26] font-serif text-base text-[#f5a742]"
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#f7efe3]">{t.name}</p>
                  <p className="text-[9px] font-medium text-[#8a7a6b]">{t.role}</p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
