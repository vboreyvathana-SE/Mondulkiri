import { useState } from "react";
import FaqItem from "./FaqItem";
import { faqs } from "./contactData";

export default function FaqSection() {
  // which question is open right now (null = all closed)
  const [openIndex, setOpenIndex] = useState(null);

  function handleToggle(index) {
    // clicking the one that's already open closes it, otherwise open the new one
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  }

  return (
    <section className="w-full py-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="flex flex-col gap-1 text-center">
          <span className="font-label text-[10px] font-semibold uppercase tracking-widest text-[#fcba5f]">
            Direct Knowledge Base
          </span>
          <h2 className="font-head text-[28px] leading-9 font-medium text-[#ede0da] md:text-4xl md:leading-11">
            Frequently Contemplated Inquiries
          </h2>
          <p className="font-body text-[15px] leading-6 text-[#d5c4b1]">
            Essential details regarding high-plateau cupping visits, overseas transit, and artisanal bean preservation.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {faqs.map((item, index) => (
            <FaqItem
              key={item.question}
              id={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
