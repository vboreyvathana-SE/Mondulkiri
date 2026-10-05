import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

// The small square picture of a coffee / order.
// No picture? It shows a little box icon instead.
export default function Thumb({ image, alt, className = "" }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#130d0a] ${className}`}
    >
      {image ? (
        <img src={image} alt={alt} className="h-full w-full object-contain p-1" />
      ) : (
        <FontAwesomeIcon icon={faBoxOpen} className="text-xl text-[#9e8e7e]" />
      )}
    </div>
  );
}
