"use client";

import { useId, useState } from "react";
import { TREATMENT_TYPES } from "@/lib/search-data";

function AccordionSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}) {
  const panelId = useId();

  return (
    <div className="border-b border-navy/15">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full cursor-pointer items-center justify-between gap-4 pt-[6px] pb-[12px] text-left"
        >
          <span className="text-[20px] leading-[1.1] tracking-[-0.44px] text-navy sm:text-[22px]">
            {title}
          </span>
          {/* Asset points down; flip it when the section is open. */}
          <img
            src="/images/icon-chevron-down.svg"
            alt=""
            aria-hidden="true"
            className={`h-[8px] w-[14px] shrink-0 transition-transform duration-300 ease-out motion-reduce:transition-none ${
              open ? "rotate-[180deg]" : "rotate-[0deg]"
            }`}
          />
        </button>
      </h3>
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-[16px] pb-[18px]">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function FilterSidebar() {
  const [openSection, setOpenSection] = useState<string | null>("treatment");
  const [treatment, setTreatment] = useState(TREATMENT_TYPES[0]);

  const toggle = (key: string) =>
    setOpenSection((current) => (current === key ? null : key));

  return (
    <aside className="w-full lg:w-[320px] lg:shrink-0">
      <div className="lg:w-[270px]">
        <div className="flex items-center gap-[9px] pb-[24px]">
          <img
            src="/images/icon-filter.svg"
            alt=""
            className="h-[19px] w-[19px] shrink-0"
          />
          <h2 className="text-[24px] font-bold tracking-[-0.52px] text-navy sm:text-[26px]">
            Filter results
          </h2>
        </div>

        <AccordionSection
          title="Treatment type"
          open={openSection === "treatment"}
          onToggle={() => toggle("treatment")}
        >
          <div className="flex flex-col gap-[14px]">
            {TREATMENT_TYPES.map((type) => (
              <label
                key={type}
                className="flex cursor-pointer items-center gap-[7px]"
              >
                <input
                  type="radio"
                  name="treatment-type"
                  value={type}
                  checked={treatment === type}
                  onChange={() => setTreatment(type)}
                  className="peer sr-only"
                />
                {/* Styled control: hollow ring by default, solid navy when
                    selected, with a visible focus ring for keyboard users. */}
                <span
                  aria-hidden="true"
                  className="size-[16px] shrink-0 rounded-full border border-navy/25 bg-white transition-colors peer-checked:border-navy peer-checked:bg-navy peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                />
                <span className="text-[16px] leading-[1.1] tracking-[-0.34px] text-navy sm:text-[17px]">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection
          title="Cost"
          open={openSection === "cost"}
          onToggle={() => toggle("cost")}
        >
          <p className="text-[16px] leading-[1.4] text-navy/70">
            Price filters become available once live pricing is connected.
          </p>
        </AccordionSection>

        <AccordionSection
          title="Rating"
          open={openSection === "rating"}
          onToggle={() => toggle("rating")}
        >
          <p className="text-[16px] leading-[1.4] text-navy/70">
            Rating filters become available once live reviews are connected.
          </p>
        </AccordionSection>
      </div>
    </aside>
  );
}
