import { MapPin } from "lucide-react";

export default function Review({
  imageSrc = "/images/mondulkiri-beans.jpg", // replace with your own image path
  imageAlt = "Roasted coffee beans spilling over volcanic rock",
  caption = "Sen Monorom Estate • Lot #MK-882",
}) {
  return (
    <section className="bg-[#120d0a] px-4 py-10 text-[#f3e9dc] md:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-10">
        {/* Text column */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#f5a742]">
            Uncompromising Origin Stewardship
          </p>

          <h2 className="mt-3 font-serif text-4xl font-medium leading-tight text-[#f7efe3] md:text-[40px]">
            The Mondulkiri Volcanic Crucible
          </h2>

          <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#d6c8b6]">
            Perched on the eastern Cambodian highlands, our estates benefit from
            mineral-heavy red earth, dense highland morning fog, and steady tropical
            breezes. When roasted in our Sen Monorom drum workshop, each batch unlocks
            notes of candied tamarind, dark cacao nibs, wild honey, and toasted
            macadamia.
          </p>

          <dl className="mt-5 flex flex-wrap gap-x-12 gap-y-4">
            <div>
              <dt className="text-[9px] font-bold uppercase tracking-wider text-[#8a7a6b]">
                Varietals
              </dt>
              <dd className="mt-1 font-serif text-lg font-semibold text-[#f7efe3]">
                Catimor • Bourbon • Robusta
              </dd>
            </div>
            <div>
              <dt className="text-[9px] font-bold uppercase tracking-wider text-[#8a7a6b]">
                Fermentation
              </dt>
              <dd className="mt-1 font-serif text-lg font-semibold text-[#f7efe3]">
                72-Hr Anaerobic / Honey
              </dd>
            </div>
          </dl>
        </div>

        {/* Image column */}
        <figure className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#3a2a1e] to-[#1a120d]">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="aspect-[16/10] w-full object-cover"
            loading="lazy"
          />
          <figcaption className="absolute bottom-0 left-4 flex items-center gap-1.5 rounded-t-md bg-[#120d0a]/90 px-3 py-1.5 text-[10px] font-semibold text-[#f3e9dc]">
            <MapPin size={12} className="text-[#f5a742]" />
            {caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
