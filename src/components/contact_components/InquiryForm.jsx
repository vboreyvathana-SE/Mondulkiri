import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLock, faUsers } from "@fortawesome/free-solid-svg-icons";
import FormField, { inputClasses } from "./FormField";
import SelectBox from "./SelectBox";
import { inquiryTypes, partySizes } from "./contactData";
import { sendInquiry } from "./sendInquiry";

// what the form looks like when it's empty
const emptyForm = {
  inquiryType: "",
  fullName: "",
  email: "",
  organization: "",
  partySize: "2-4",
  targetDate: "",
  message: "",
  shuttle: false,
};

export default function InquiryForm() {
  const [formData, setFormData] = useState(emptyForm);
  // status can be: "idle", "sending", "sent" or "error"
  const [status, setStatus] = useState("idle");

  // one function for every field, it uses the input's "name" to know which one changed
  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // hide the old success / error message once they start typing again
    if (status !== "sending") {
      setStatus("idle");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    try {
      await sendInquiry(formData);
      setFormData(emptyForm);
      setStatus("sent");
    } catch (error) {
      console.error("Could not send inquiry:", error);
      setStatus("error");
    }
  }

  return (
    <div className="relative overflow-hidden rounded-lg bg-[#211a17] p-6 shadow-xl md:p-10">
      <div className="mb-6 flex flex-col gap-1">
        <span className="font-label text-[10px] font-semibold uppercase tracking-widest text-[#fcba5f]">
          Schedule Tasting / Inquire
        </span>
        <h2 className="font-head text-[26px] leading-[34px] font-medium text-[#ede0da]">
          Cupping Room &amp; Terroir Liaison
        </h2>
        <p className="font-body text-[15px] leading-6 text-[#d5c4b1]">
          Reserve a sensory cupping flight with our roastmasters or initiate a dedicated micro-lot wholesale account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField label="Nature of Inquiry" htmlFor="inquiryType" required>
          <SelectBox
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            required
            placeholder="Select intention..."
            options={inquiryTypes}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField label="Full Name" htmlFor="fullName" required>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Sopheak Chen"
              required
              className={`${inputClasses} px-4 py-2`}
            />
          </FormField>

          <FormField label="Email Address" htmlFor="email" required>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="sopheak@domain.com"
              required
              className={`${inputClasses} px-4 py-2`}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField label="Organization / Café" htmlFor="organization">
            <input
              id="organization"
              name="organization"
              type="text"
              value={formData.organization}
              onChange={handleChange}
              placeholder="Optional"
              className={`${inputClasses} px-4 py-2`}
            />
          </FormField>

          <FormField label="Party Size" htmlFor="partySize">
            <SelectBox
              id="partySize"
              name="partySize"
              value={formData.partySize}
              onChange={handleChange}
              options={partySizes}
              icon={faUsers}
            />
          </FormField>

          <FormField label="Target Date" htmlFor="targetDate">
            <input
              id="targetDate"
              name="targetDate"
              type="date"
              value={formData.targetDate}
              onChange={handleChange}
              className={`${inputClasses} px-4 py-2 [color-scheme:dark]`}
            />
          </FormField>
        </div>

        <FormField label="Sensory Preferences & Specific Notes" htmlFor="message" required>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Mention specific roast varieties of interest (e.g., Natural Anaerobic Red Bourbon), transport requirements from Sen Monorom town, or volume specifications..."
            required
            className={`${inputClasses} p-4`}
          />
        </FormField>

        <div className="mt-1 flex items-start gap-2">
          <input
            id="shuttle"
            name="shuttle"
            type="checkbox"
            checked={formData.shuttle}
            onChange={handleChange}
            className="mt-1 h-4 w-4 cursor-pointer accent-[#fcba5f]"
          />
          <label htmlFor="shuttle" className="cursor-pointer font-body text-[13px] leading-5 text-[#d5c4b1] select-none">
            Request Sen Monorom eco-shuttle transfer pickup (Complimentary for scheduled tasting guests at Bousra Roastery).
          </label>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row">
          <span className="flex items-center gap-1 font-label text-[10px] font-semibold tracking-widest text-[#9e8e7e]">
            <FontAwesomeIcon icon={faLock} className="text-[10px]" /> Strict confidentiality for commercial blend briefs.
          </span>

          <button
            type="submit"
            disabled={status === "sending"}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-[#d99b43] px-10 py-4 font-label text-xs font-semibold uppercase tracking-widest text-[#563500] shadow-lg transition-all hover:bg-[#fcba5f] hover:shadow-[#fcba5f]/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <span>{status === "sending" ? "Sending..." : "Transmit Reservation"}</span>
            <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
          </button>
        </div>

        {status === "sent" && (
          <div role="status" className="rounded bg-[#302825] p-4 text-center font-body text-[15px] text-[#fcba5f]">
            Confirmation dispatch recorded. Our roastery hospitality concierge will contact you within 6 business hours.
          </div>
        )}

        {status === "error" && (
          <div role="alert" className="rounded bg-[#93000a]/40 p-4 text-center font-body text-[15px] text-[#ffdad6]">
            Something went wrong and your inquiry was not sent. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}
