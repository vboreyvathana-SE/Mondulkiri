import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { inputClasses } from "./FormField";

// A dropdown with a small icon on the right.
// options = [{ value, label }, ...]
export default function SelectBox({ id, name, value, onChange, required, options, placeholder, icon = faChevronDown }) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`${inputClasses} appearance-none py-2 pr-10 pl-4`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-[#251e1b] text-[#ede0da]">
            {option.label}
          </option>
        ))}
      </select>

      <FontAwesomeIcon
        icon={icon}
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm text-[#d5c4b1]"
      />
    </div>
  );
}
