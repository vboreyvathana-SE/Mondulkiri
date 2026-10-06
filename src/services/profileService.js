const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const emptyFlavorProfile = {
  calibrated: "No saved sensory preferences",
  bars: [
    {
      label: "Roast Profile",
      valueLabel: "Not recorded",
      percent: 0,
      fill: "bg-linear-to-r from-[#d99b43] via-[#fcba5f] to-[#ffb599]",
      ends: ["Cinnamon / Light", "Full City +", "French / Charcoal"],
    },
    {
      label: "Acidity Preference",
      valueLabel: "Not recorded",
      percent: 0,
      fill: "bg-[#d99b43]",
      ends: ["Low & Mellow", "Balanced Tartaric", "Bright Malic"],
    },
    {
      label: "Mouthfeel & Density",
      valueLabel: "Not recorded",
      percent: 0,
      fill: "bg-[#fcba5f]",
      ends: ["Tea-like Silk", "Creamy Medium", "Heavy Basalt Viscosity"],
    },
  ],
  split: {
    label: "Extraction Preference",
    valueLabel: "Not recorded",
    first: 0,
    ends: ["Traditional Cambodian Phin Filter", "Ceramic Pour Over"],
  },
  radar: [
    { label: "Roast Depth", value: 0 },
    { label: "Sweetness", value: 0 },
    { label: "Body", value: 0 },
    { label: "Clean Finish", value: 0 },
    { label: "Acidity", value: 0 },
    { label: "Aroma", value: 0 },
  ],
  match: "—",
};

function titleCase(value) {
  return String(value || "customer")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(value) {
  if (!value) return "Not recorded";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not recorded";

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatPurchaseDate(value) {
  if (!value) return "Purchase recorded";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Purchase recorded";

  return `Purchased ${new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)}`;
}

function imageUrl(path) {
  if (!path) return "";
  return `${API_URL}/${encodeURI(String(path).replace(/^\/+/, ""))}`;
}

function mapPurchase(purchase, index) {
  const quantity = Math.max(1, Number(purchase.quantity) || 1);
  const itemName = purchase.product_name || "Coffee purchase";
  const details = [
    `${quantity} × ${purchase.product_code || itemName}`,
    purchase.product_weight,
    purchase.roast_profile,
    purchase.flavor_notes,
  ].filter(Boolean);

  return {
    id: `#MK-${purchase.sale_id || purchase.product_id || index + 1}`,
    status: "recorded",
    badge: formatPurchaseDate(purchase.purchased_at),
    title: itemName,
    note: details.join(" • "),
    image: imageUrl(purchase.product_image),
  };
}

function mapProfile(data) {
  const user = data?.user;
  if (!user) {
    throw new Error("The profile response did not include an account.");
  }

  const purchases = Array.isArray(data.purchases) ? data.purchases : [];
  const accountType = titleCase(user.account_type);
  const memberName = [user.first_name, user.last_name].filter(Boolean).join(" ") || user.email;
  const totalItems = purchases.reduce((total, purchase) => total + (Number(purchase.quantity) || 0), 0);

  return {
    member: {
      name: memberName,
      badge: `${accountType} Account`,
      status: "Active",
      tierName: `${accountType} Account`,
      location: user.email,
      since: formatDate(user.joined_at),
      id: `#MDK-${user.id}`,
      points: String(totalItems),
      pointsNote: `${purchases.length} recorded purchase${purchases.length === 1 ? "" : "s"}`,
    },
    subscription: {
      tag: "No active subscription",
      title: "Subscription not configured",
      nextDispatch: "—",
      cadence: "No subscription records are available for this account.",
      lots: [],
    },
    dispatches: {
      total: purchases.length,
      items: purchases.map(mapPurchase),
    },
    flavor: emptyFlavorProfile,
    pass: {
      title: "Mondulkiri Coffee Pass",
      altitude: "—",
      passportCount: `${purchases.length} Purchases`,
      passportNote: "No cupping passport records are available.",
      valid: "ACCOUNT STATUS",
      validPlaces: "ACTIVE",
    },
    delivery: {
      place: "No delivery address on file",
      lines: user.email ? [user.email] : [],
      contact: `Account type: ${accountType}`,
      payment: "Not recorded",
    },
    privileges: {
      title: `${accountType} Account`,
      perks: [],
      inviteLink: "",
    },
  };
}

export async function getProfile() {
  const response = await fetch(`${API_URL}/users/profile.php`, {
    credentials: "include",
  });
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Unable to load profile data.");
  }

  return mapProfile(result.data);
}
