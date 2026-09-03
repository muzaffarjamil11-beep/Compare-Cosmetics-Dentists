"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useId, useState } from "react";

function AccordionSection({
  title,
  open,
  onToggle,
  note,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  note?: string;
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
          <div className="pt-[16px] pb-[18px]">
            {note && (
              <p className="mb-3 text-[14px] leading-[1.4] text-navy/60">
                {note}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

const PRICE_BANDS = [
  { label: "Up to £25", value: "25" },
  { label: "Up to £50", value: "50" },
  { label: "Up to £100", value: "100" },
  { label: "Any price", value: "" },
];

const RATING_BANDS = [
  { label: "4.5 and above", value: "4.5" },
  { label: "4.0 and above", value: "4" },
  { label: "3.5 and above", value: "3.5" },
  { label: "Any rating", value: "" },
];

export default function FilterSidebar({
  treatments,
  regions,
  resultCount,
  pricingConnected,
  reviewsConnected,
  treatmentsConnected,
}: {
  treatments: string[];
  regions: string[];
  resultCount: number;
  pricingConnected: boolean;
  reviewsConnected: boolean;
  treatmentsConnected: boolean;
}) {
  const router = useRouter();
  const params = useSearchParams();

  const [openSection, setOpenSection] = useState<string | null>("treatment");

  const treatment = params.get("treatment") ?? "";
  const region = params.get("region") ?? "";
  const maxPrice = params.get("maxPrice") ?? "";
  const minRating = params.get("minRating") ?? "";

  const RADIO =
    "size-[16px] shrink-0 rounded-full border border-navy/25 bg-white transition-colors peer-checked:border-navy peer-checked:bg-navy peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2";
  const LABEL =
    "text-[16px] leading-[1.1] tracking-[-0.34px] text-navy sm:text-[17px]";

  const toggle = (key: string) =>
    setOpenSection((current) => (current === key ? null : key));

  /** Push a changed filter into the URL so results and links stay shareable. */
  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    router.push(`/search?${next.toString()}`, { scroll: false });
  };

  return (
    <aside className="w-full lg:w-[320px] lg:shrink-0">
      <div className="lg:w-[270px]">
        <div className="flex items-center gap-[9px] pb-[6px]">
          <img
            src="/images/icon-filter.svg"
            alt=""
            className="h-[19px] w-[19px] shrink-0"
          />
          <h2 className="text-[24px] font-bold tracking-[-0.52px] text-navy sm:text-[26px]">
            Filter results
          </h2>
        </div>
        <p className="pb-[18px] text-[14px] text-navy/60">
          {resultCount.toLocaleString("en-GB")} CQC-registered practices
        </p>

        <AccordionSection
          title="Treatment type"
          open={openSection === "treatment"}
          onToggle={() => toggle("treatment")}
          note={
            treatmentsConnected
              ? undefined
              : "Awaiting treatment detection. Treatments are not in the CQC register — they come from crawling each clinic's site — so this frames your search but does not narrow the list yet."
          }
        >
          <div className="flex flex-col gap-[14px]">
            {treatments.map((type) => (
              <label
                key={type}
                className="flex cursor-pointer items-center gap-[7px]"
              >
                <input
                  type="radio"
                  name="treatment-type"
                  value={type}
                  checked={treatment === type}
                  onChange={() => setParam("treatment", type)}
                  className="peer sr-only"
                />
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
          title="Region"
          open={openSection === "region"}
          onToggle={() => toggle("region")}
        >
          <div className="flex flex-col gap-[14px]">
            <label className="flex cursor-pointer items-center gap-[7px]">
              <input
                type="radio"
                name="region"
                value=""
                checked={region === ""}
                onChange={() => setParam("region", "")}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="size-[16px] shrink-0 rounded-full border border-navy/25 bg-white transition-colors peer-checked:border-navy peer-checked:bg-navy peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
              />
              <span className="text-[16px] leading-[1.1] tracking-[-0.34px] text-navy sm:text-[17px]">
                All regions
              </span>
            </label>
            {regions.map((r) => (
              <label
                key={r}
                className="flex cursor-pointer items-center gap-[7px]"
              >
                <input
                  type="radio"
                  name="region"
                  value={r}
                  checked={region === r}
                  onChange={() => setParam("region", r)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className="size-[16px] shrink-0 rounded-full border border-navy/25 bg-white transition-colors peer-checked:border-navy peer-checked:bg-navy peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                />
                <span className="text-[16px] leading-[1.1] tracking-[-0.34px] text-navy sm:text-[17px]">
                  {r}
                </span>
              </label>
            ))}
          </div>
        </AccordionSection>

        {/* Cost and Rating are wired to the same URL params the server reads,
            so they start narrowing results the moment the pricing backend and
            the Google Places review feed are connected. */}
        <AccordionSection
          title="Cost"
          open={openSection === "cost"}
          onToggle={() => toggle("cost")}
          note={
            pricingConnected
              ? undefined
              : "Awaiting the pricing backend. Prices are set per clinic editorially, so this filter has nothing to narrow yet."
          }
        >
          <div className="flex flex-col gap-[14px]">
            {PRICE_BANDS.map((band) => (
              <label
                key={band.label}
                className={`flex items-center gap-[7px] ${
                  pricingConnected ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                }`}
              >
                <input
                  type="radio"
                  name="maxPrice"
                  value={band.value}
                  checked={maxPrice === band.value}
                  disabled={!pricingConnected}
                  onChange={() => setParam("maxPrice", band.value)}
                  className="peer sr-only"
                />
                <span aria-hidden="true" className={RADIO} />
                <span className={LABEL}>{band.label}</span>
              </label>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection
          title="Rating"
          open={openSection === "rating"}
          onToggle={() => toggle("rating")}
          note={
            reviewsConnected
              ? "Ranked by weighted review score, so a clinic with a handful of five-star reviews cannot outrank one with hundreds."
              : "Awaiting the Google Places review feed. Ratings and review counts come from there, then feed the weighted score."
          }
        >
          <div className="flex flex-col gap-[14px]">
            {RATING_BANDS.map((band) => (
              <label
                key={band.label}
                className={`flex items-center gap-[7px] ${
                  reviewsConnected ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                }`}
              >
                <input
                  type="radio"
                  name="minRating"
                  value={band.value}
                  checked={minRating === band.value}
                  disabled={!reviewsConnected}
                  onChange={() => setParam("minRating", band.value)}
                  className="peer sr-only"
                />
                <span aria-hidden="true" className={RADIO} />
                <span className={LABEL}>{band.label}</span>
              </label>
            ))}
          </div>
        </AccordionSection>
      </div>
    </aside>
  );
}
