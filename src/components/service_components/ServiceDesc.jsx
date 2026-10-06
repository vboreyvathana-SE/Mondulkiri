import { useState } from "react";
import { Coffee, Mail, Smartphone, Lock, Check } from "lucide-react";

const VOLUMES = [
  "Under 50 kg (Boutique Bar)",
  "50 kg – 150 kg (Multi-group Cafe)",
  "150 kg+ (Hotel / Chain)",
];

const SERVICES = ["Wholesale", "Private Label", "Training", "Gear Setup"];

const inputClass =
  "w-full rounded bg-[#241e1a] px-3.5 py-3 text-xs text-[#f3e9dc] placeholder:text-[#7a6c60] focus:outline-none focus:ring-2 focus:ring-[#f5a742]/60";

function Field({ label, htmlFor, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-[8px] font-bold uppercase tracking-wider text-[#8a7a6b]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ServiceDesc({ onSubmit }) {
  const [form, setForm] = useState({
    contact: "",
    company: "",
    email: "",
    volume: VOLUMES[1],
    services: ["Wholesale"],
    notes: "",
  });
  const [sent, setSent] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggleService = (name) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(name)
        ? f.services.filter((s) => s !== name)
        : [...f.services, name],
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form); // hook up your API call here
    setSent(true);
  };

  return (
    <section className="bg-[#2a2320] px-4 py-12 font-sans text-[#f3e9dc] md:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
        {/* ---------- Left: copy ---------- */}
        <div>
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#f5a742]">
            <Coffee size={14} />
            Private Cupping • Sen Monorom & Phnom Penh
          </p>

          <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-[#f7efe3] md:text-[40px]">
            Initiate Your Roastery Partnership
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-[#d6c8b6]">
            Connect directly with our Lead Roaster and Q-Grader team. We arrange private
            blind cuppings, send sensory samples, and assess cafe ergonomics for your
            upcoming venture.
          </p>

          <ul className="mt-6 space-y-4">
            <li className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-[#f5a742]" />
              <div>
                <a
                  href="mailto:b2b@mondulkiricoffee.kh"
                  className="text-[13px] font-bold text-[#f7efe3] hover:text-[#f5a742]"
                >
                  b2b@mondulkiricoffee.kh
                </a>
                <p className="mt-0.5 text-[11px] text-[#b8a897]">
                  Average commercial response ≤ 4 business hours
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Smartphone size={18} className="mt-0.5 shrink-0 text-[#f5a742]" />
              <div>
                <a
                  href="tel:+85523998120"
                  className="text-[13px] font-bold text-[#f7efe3] hover:text-[#f5a742]"
                >
                  +855 23 998 120 (Cambodia HQ)
                </a>
                <p className="mt-0.5 text-[11px] text-[#b8a897]">Mon - Sat • 8:00 AM - 6:00 PM ICT</p>
              </div>
            </li>
          </ul>
        </div>

        {/* ---------- Right: form ---------- */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl bg-[#120d0a] p-5 md:p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Contact Person" htmlFor="contact">
              <input
                id="contact"
                type="text"
                required
                placeholder="e.g. Sothea Chan"
                value={form.contact}
                onChange={set("contact")}
                className={inputClass}
              />
            </Field>
            <Field label="Cafe / Company Entity" htmlFor="company">
              <input
                id="company"
                type="text"
                required
                placeholder="e.g. Artisan Botanica Cafe"
                value={form.company}
                onChange={set("company")}
                className={inputClass}
              />
            </Field>
            <Field label="Business Email" htmlFor="email">
              <input
                id="email"
                type="email"
                required
                placeholder="sothea@botanica.com"
                value={form.email}
                onChange={set("email")}
                className={inputClass}
              />
            </Field>
            <Field label="Estimated Monthly Volume" htmlFor="volume">
              <select
                id="volume"
                value={form.volume}
                onChange={set("volume")}
                className={`${inputClass} [color-scheme:dark]`}
              >
                {VOLUMES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <fieldset className="mt-4">
            <legend className="mb-1.5 text-[8px] font-bold uppercase tracking-wider text-[#8a7a6b]">
              Primary Service of Interest
            </legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {SERVICES.map((s) => {
                const checked = form.services.includes(s);
                return (
                  <label
                    key={s}
                    className="flex cursor-pointer items-center gap-2 rounded bg-[#241e1a] px-3 py-2.5 text-xs font-medium text-[#f3e9dc] focus-within:ring-2 focus-within:ring-[#f5a742]/60"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleService(s)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm ${
                        checked ? "bg-[#f5a742] text-[#1a1410]" : "bg-white"
                      }`}
                    >
                      {checked && <Check size={11} strokeWidth={3.5} />}
                    </span>
                    {s}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-4">
            <Field label="Roast Notes & Special Requirements" htmlFor="notes">
              <textarea
                id="notes"
                rows={4}
                placeholder="Tell us about your target espresso profile, current machine gear, or preferred tasting dates..."
                value={form.notes}
                onChange={set("notes")}
                className={`${inputClass} resize-none`}
              />
            </Field>
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-xs text-[#d6c8b6]">
              <Lock size={14} className="shrink-0 text-[#f5a742]" />
              Non-disclosure & recipe exclusivity guaranteed
            </p>
            <button
              type="submit"
              className="rounded bg-[#f5a742] px-8 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#1a1410] hover:bg-[#ffb955] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              Submit B2B Inquiry
            </button>
          </div>

          <p role="status" className="mt-3 min-h-[1rem] text-center text-xs text-[#f5a742]">
            {sent && "Thank you. Our team will respond within 4 business hours."}
          </p>
        </form>
      </div>
    </section>
  );
}
