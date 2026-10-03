import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugSaucer } from "@fortawesome/free-solid-svg-icons";
import { story, storyImage } from "./authData";

// The left side: photo, title and a short line about the club.
export default function StoryPanel() {
  return (
    <div className="relative flex flex-col justify-between gap-10 overflow-hidden bg-[#251e1b] p-6 lg:col-span-5 lg:p-10">
      {/* faded photo in the background */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
        style={{ backgroundImage: `url('${storyImage}')` }}
        aria-hidden="true"
      ></div>

      <div className="relative z-10 flex flex-col">
        <div className="mb-6 flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-[#fcba5f]"></span>
          <span className="ml-1 font-label text-[10px] leading-[14px] font-semibold uppercase tracking-widest text-[#fcba5f]">
            {story.tag}
          </span>
        </div>

        <h2 className="mb-2 font-head text-[28px] leading-9 font-medium tracking-tight text-[#ede0da] md:text-4xl md:leading-11">
          {story.titleTop}
          <br />
          <span className="font-normal text-[#fcba5f] italic">{story.titleItalic}</span>
        </h2>

        <p className="max-w-xs font-body text-[13px] leading-relaxed text-[#d5c4b1]">{story.text}</p>
      </div>

      <div className="relative z-10 flex items-center gap-2 text-[#d5c4b1]/80">
        <FontAwesomeIcon icon={faMugSaucer} className="text-[16px] text-[#fcba5f]" />
        <span className="font-label text-[10px] leading-[14px] font-semibold uppercase tracking-widest">
          {story.place}
        </span>
      </div>
    </div>
  );
}
