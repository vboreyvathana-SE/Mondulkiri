import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// The big gold button at the bottom of both forms.
export default function SubmitButton({ sending, text, sendingText }) {
  return (
    <button
      type="submit"
      disabled={sending}
      className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#fcba5f] px-4 py-3 font-label text-sm leading-[18px] font-semibold tracking-wider text-[#462b00] uppercase shadow-md transition-all hover:bg-[#d99b43] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span>{sending ? sendingText : text}</span>
      <FontAwesomeIcon icon={faArrowRight} className="text-[15px]" />
    </button>
  );
}
