// All the words for the login / register card live here.
// Want to change some text? Edit it here, no need to dig through the components.

// the photo behind the left panel (it's in public/Images/). If the file is missing
// the panel just shows its plain dark colour, nothing breaks.
export const storyImage = "/Images/coffeeField.webp";

export const story = {
  tag: "Terroir Guild",
  titleTop: "The Artisan",
  titleItalic: "Roaster\u2019s Club",
  text: "Curated allocations of volcanic basalt micro-lots, private harvest archives, and bespoke roast profiles from Mondulkiri.",
  place: "Mondulkiri Sen Monorom",
};

// shown above the form when someone gets sent here from the cart
export const cartNotice = "Sign in or create an account to complete your order. Your bag is saved.";

export const loginText = {
  title: "Welcome Back",
  text: "Enter your credentials to access cupping allocations and member cellar reserves.",
  button: "Enter Tasting Room",
  sending: "Entering...",
};

export const registerText = {
  title: "Join the Roaster\u2019s Guild",
  text: "Create an account to receive allocation rights and tailored roast reservations.",
  button: "Complete Registration",
  sending: "Creating account...",
};

// value = what gets sent to the backend, label = what the person sees
export const accountTypes = [
  { value: "consumer", label: "Consumer" },
  { value: "reseller", label: "Reseller" },
];
