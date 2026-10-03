// "Sign In | Register" tabs with the little "Estate Portal" label on the right.
const tabs = [
  { id: "login", label: "Sign In" },
  { id: "register", label: "Register" },
];

export default function AuthTabs({ active, onChange }) {
  return (
    <div className="mb-6 flex items-center justify-between border-b border-[#302825]/60 pb-1">
      <div role="tablist" aria-label="Account" className="flex gap-4">
        {tabs.map((tab) => {
          const isActive = active === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => onChange(tab.id)}
              className={`-mb-0.5 cursor-pointer border-b-2 pb-2 font-label text-xs leading-4 tracking-wider uppercase transition-colors ${
                isActive
                  ? "border-[#fcba5f] font-semibold text-[#fcba5f]"
                  : "border-transparent font-medium text-[#d5c4b1] hover:text-[#ede0da]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <span className="font-label text-[10px] leading-[14px] font-semibold uppercase tracking-widest text-[#9e8e7e]">
        Estate Portal
      </span>
    </div>
  );
}
