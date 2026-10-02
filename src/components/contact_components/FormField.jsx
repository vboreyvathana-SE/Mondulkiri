
export const inputClasses =
  "w-full rounded bg-[#251e1b] font-body text-[15px] text-[#ede0da] placeholder:text-[#9e8e7e] transition-all focus:bg-[#302825] focus:ring-1 focus:ring-[#fcba5f] focus:outline-none";

export default function FormField({ label, htmlFor, required, className = "", children }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label
        htmlFor={htmlFor}
        className="font-label text-xs font-medium uppercase tracking-wider text-[#ede0da]"
      >
        {label} {required && <span className="text-[#fcba5f]">*</span>}
      </label>
      {children}
    </div>
  );
}