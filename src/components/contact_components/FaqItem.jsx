import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

// One question. It doesn't know if it's open, the parent (FaqSection) tells it.
export default function FaqItem({ id, question, answer, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-lg bg-[#211a17]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
        className="flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left text-[#ede0da] transition-colors hover:text-[#fcba5f] focus-visible:ring-1 focus-visible:ring-[#fcba5f] focus-visible:outline-none"
      >
        <span className="font-head text-xl font-semibold">{question}</span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`shrink-0 text-[#fcba5f] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div id={`faq-answer-${id}`} className="px-6 pb-6">
          <p className="font-body text-[15px] leading-relaxed text-[#d5c4b1]">{answer}</p>
        </div>
      )}
    </div>
  );
}
