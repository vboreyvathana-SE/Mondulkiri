import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faChevronDown } from "@fortawesome/free-solid-svg-icons";

// shared look for every input / select in the card
const inputClasses =
  "w-full rounded-lg bg-[#251e1b] py-2.5 font-body text-[13px] leading-5 text-[#ede0da] placeholder:text-[#9e8e7e]/60 transition-colors focus:bg-[#302825] focus:ring-1 focus:ring-[#fcba5f]/60 focus:outline-none";

// A label with whatever input you put inside it.
function Field({ label, htmlFor, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="font-label text-[10px] leading-[14px] font-semibold uppercase tracking-wider text-[#d5c4b1]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

// Normal text / email input. `icon` is the small icon on the left (optional).
export function TextField({ label, id, icon, ...inputProps }) {
  return (
    <Field label={label} htmlFor={id}>
      <div className="relative flex items-center">
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className="pointer-events-none absolute left-3.5 text-[15px] text-[#9e8e7e]"
          />
        )}
        <input id={id} className={`${inputClasses} ${icon ? "pl-10" : "pl-3"} pr-3`} {...inputProps} />
      </div>
    </Field>
  );
}

// Password input with the little eye button to show / hide it.
export function PasswordField({ label, id, icon, ...inputProps }) {
  const [visible, setVisible] = useState(false);

  return (
    <Field label={label} htmlFor={id}>
      <div className="relative flex items-center">
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className="pointer-events-none absolute left-3.5 text-[15px] text-[#9e8e7e]"
          />
        )}
        <input
          id={id}
          type={visible ? "text" : "password"}
          className={`${inputClasses} ${icon ? "pl-10" : "pl-3"} pr-10`}
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 flex cursor-pointer items-center justify-center text-[#9e8e7e] transition-colors hover:text-[#ede0da]"
        >
          <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} className="text-[15px]" />
        </button>
      </div>
    </Field>
  );
}

// Dropdown. options = [{ value, label }, ...]
export function SelectField({ label, id, options, ...selectProps }) {
  return (
    <Field label={label} htmlFor={id}>
      <div className="relative flex items-center">
        <select id={id} className={`${inputClasses} cursor-pointer appearance-none pr-10 pl-3`} {...selectProps}>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#251e1b] text-[#ede0da]">
              {option.label}
            </option>
          ))}
        </select>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="pointer-events-none absolute right-3.5 text-[12px] text-[#9e8e7e]"
        />
      </div>
    </Field>
  );
}
