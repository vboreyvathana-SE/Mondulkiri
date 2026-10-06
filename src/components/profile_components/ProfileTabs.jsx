const tabs = [
  { id: "overview", label: "Overview & Subscriptions" },
  { id: "orders", label: "Order History & Cupping" },
  { id: "sensory", label: "Flavor Profile & Sensory" },
  { id: "addresses", label: "Addresses & Dispatch" },
  { id: "perks", label: "Roastery Guild Perks" },
];

// The row of pill buttons. `active` is the id of the open tab.
export default function ProfileTabs({ active, onChange }) {
  return (
    <nav
      role="tablist"
      aria-label="Guild Dashboard Tabs"
      className="mb-6 flex items-center gap-1 overflow-x-auto pb-2"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`profile-tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls="profile-panel"
            onClick={() => onChange(tab.id)}
            className={`cursor-pointer rounded-lg px-4 py-1.5 font-label text-xs leading-4 font-medium whitespace-nowrap uppercase tracking-wider transition-all ${
              isActive
                ? "bg-[#d99b43] text-[#563500]"
                : "bg-[#251e1b] text-[#d5c4b1] hover:bg-[#302825] hover:text-[#ede0da]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
