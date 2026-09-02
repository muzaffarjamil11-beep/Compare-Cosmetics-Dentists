"use client";

import { useState } from "react";
import type { Faq } from "@/lib/search-data";

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  // A single index rather than a set, so opening one closes the previous.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <h2 className="text-center text-[26px] font-bold tracking-[-0.6px] text-navy sm:text-[30px]">
        FAQs
      </h2>

      <div className="mt-[27px]">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} className="border-b border-navy/15">
              <h3>
                <button
                  type="button"
                  id={`faq-q-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-[14px] text-left"
                >
                  <span className="text-[16px] leading-[1.3] tracking-[-0.34px] text-navy sm:text-[17px]">
                    {faq.question}
                  </span>
                  {/* 14x8 chevron pointing down: -90deg while collapsed
                      (pointing right), 0deg once open. */}
                  <img
                    src="/images/icon-chevron-right.svg"
                    alt=""
                    aria-hidden="true"
                    className={`h-[8px] w-[14px] shrink-0 transition-transform duration-300 ease-out motion-reduce:transition-none ${
                      isOpen ? "rotate-[0deg]" : "-rotate-90"
                    }`}
                  />
                </button>
              </h3>

              <div
                id={`faq-a-${index}`}
                role="region"
                aria-labelledby={`faq-q-${index}`}
                className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pr-8 pb-[16px] text-[15px] leading-[1.55] tracking-[-0.3px] text-navy/75 sm:text-[16px]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
