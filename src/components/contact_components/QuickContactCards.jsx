import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { quickContacts } from "./contactData";

// the two phone number cards under the form
export default function QuickContactCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {quickContacts.map((item) => (
        <div key={item.title} className="flex items-center gap-4 rounded-lg bg-[#211a17] p-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded bg-[#251e1b] ${item.color}`}
          >
            <FontAwesomeIcon icon={item.icon} className="text-xl" />
          </div>

          <div className="flex min-w-0 flex-col">
            <span className="font-label text-[10px] font-semibold uppercase tracking-wider text-[#9e8e7e]">
              {item.label}
            </span>
            <span className="truncate font-head text-xl font-semibold text-[#ede0da]">{item.title}</span>
            <span className={`font-body text-[13px] ${item.color}`}>{item.detail}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
