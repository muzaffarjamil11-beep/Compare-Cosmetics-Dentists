"use client";

import { useState } from "react";

type Treatment = { question: string; answer: string };

const TREATMENTS: Treatment[] = [
  {
    question: "Clear Aligners",
    answer:
      "Nearly invisible removable trays that straighten teeth gradually. Treatment usually runs 6–18 months, and the trays are worn 20–22 hours a day.",
  },
  {
    question: "Porcelain Veneers",
    answer:
      "Thin custom-made shells bonded to the front of your teeth to improve their shape, colour and alignment. With good care they typically last 10–15 years.",
  },
  {
    question: "Dental Hygienist",
    answer:
      "A professional clean that removes the plaque and tartar a toothbrush cannot reach, helping prevent gum disease. Most people benefit from a visit every six months.",
  },
  {
    question: "Composite Bonding",
    answer:
      "Tooth-coloured resin shaped directly onto the tooth to repair chips, close small gaps or reshape worn edges. It is usually completed in a single appointment.",
  },
  {
    question: "Dental  Implants",
    answer:
      "A titanium post placed into the jaw to replace a missing tooth root, finished with a crown on top. The full process normally spans three to six months.",
  },
  {
    question: "Teeth Whitening",
    answer:
      "A professional treatment that lightens the natural shade of your teeth, available in-clinic or as a dentist-supplied take-home kit. Results usually last 12–24 months.",
  },
];

export default function PopularTreatments({ city = "Leeds" }: { city?: string }) {
  // Index of the open row, or null when every row is collapsed. Holding a
  // single index (rather than a set) is what enforces "only one at a time".
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    // Equal space above and below the heading, matching the clinics section.
    <section className="bg-primary-light py-12 md:py-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-4 md:gap-16 md:px-10">
        <h2 className="text-center text-[32px] font-bold leading-[0.94] tracking-[-0.64px] text-navy md:text-[42px] md:tracking-[-0.84px]">
          Popular treatments
          <br />
          in <span className="underline">{city}</span>
        </h2>

        <div className="w-full max-w-[826px] rounded-[20px] bg-white p-[17px] md:p-[30px]">
          {/* Pulls in the first row's top padding and the last row's bottom
              padding so the collapsed card matches Figma's 359px content. */}
          <div className="-my-[23px]">
            {TREATMENTS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.question}
                  className="border-navy/10 not-first:border-t"
                >
                  <h3>
                    <button
                      type="button"
                      id={`treatment-q-${index}`}
                      aria-expanded={isOpen}
                      aria-controls={`treatment-a-${index}`}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 py-[23px] text-left"
                    >
                      <span className="text-[20px] font-bold leading-[1.08] tracking-[-0.4px] text-navy">
                        {item.question}
                      </span>
                      {/* The asset is a 14x8 chevron pointing down, so -90deg
                          points it right while collapsed and 0deg returns it
                          to pointing straight down once the answer is open. */}
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
                    id={`treatment-a-${index}`}
                    role="region"
                    aria-labelledby={`treatment-q-${index}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pr-8 pb-[23px] text-[16px] leading-[1.5] tracking-[-0.32px] text-navy/75 md:text-[18px]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
