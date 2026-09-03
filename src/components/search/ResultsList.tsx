"use client";

import { useState } from "react";
import type { RankedClinic } from "@/lib/clinics";

/** How many results carry the "Featured practice" chip and a logo. */
const FEATURED_COUNT = 3;

const ACTION_BASE =
  "flex h-[54px] flex-1 items-center justify-center rounded-[15px] px-4 text-[18px] font-bold tracking-[-0.4px] transition-transform duration-200 ease-out motion-reduce:transition-none sm:text-[20px]";

function initials(name: string): string {
  return name
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

/**
 * Review weight. Populated from the Google Places rating and review count via
 * the Bayesian score; until that pipeline is connected there is nothing to
 * show, so the slot states that rather than inventing a figure.
 */
function ReviewWeight({ clinic }: { clinic: RankedClinic }) {
  if (!clinic.reviewWeight) {
    return (
      <span className="text-[14px] tracking-[-0.28px] text-navy/45">
        Reviews not yet connected
      </span>
    );
  }

  const { average, count, score } = clinic.reviewWeight;
  const filled = Math.round(average);

  return (
    <span className="flex items-center gap-2">
      <span className="text-[15px] tracking-[-0.3px] text-navy sm:text-[17px]">
        {average.toFixed(1)}
      </span>
      <span aria-hidden="true" className="text-[14px] tracking-[1px] text-navy">
        {"★".repeat(filled)}
        <span className="text-navy/25">{"★".repeat(5 - filled)}</span>
      </span>
      <span className="text-[15px] tracking-[-0.3px] text-navy/70 sm:text-[17px]">
        ({count.toLocaleString("en-GB")})
      </span>
      <span className="sr-only">
        Weighted score {score.toFixed(2)} from {count} reviews
      </span>
    </span>
  );
}

function LocationLine({ clinic }: { clinic: RankedClinic }) {
  return (
    <span className="flex items-start gap-[10px]">
      <img
        src="/images/icon-pin.svg"
        alt=""
        className="mt-[2px] h-[21px] w-[16px] shrink-0"
      />
      <span className="text-[15px] leading-[1.3] tracking-[-0.3px] text-navy sm:text-[17px]">
        {[clinic.address, clinic.town, clinic.postcode]
          .filter(Boolean)
          .join(", ")}
      </span>
    </span>
  );
}

function PriceBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-[8px] rounded-[8px] border border-primary-light px-[10px] py-[12px] text-center">
      <span className="text-[14px] leading-[1] tracking-[-0.28px] text-navy/70">
        {label}
      </span>
      <span className="text-[15px] leading-[1.2] font-bold tracking-[-0.3px] break-words text-navy sm:text-[17px]">
        {value}
      </span>
    </div>
  );
}

const money = (v?: number) =>
  typeof v === "number" ? `£${v.toLocaleString("en-GB")}` : "On enquiry";
const yesNo = (v?: boolean) =>
  v === undefined ? "On enquiry" : v ? "Yes" : "No";

function ActionLink({
  href,
  variant,
  label,
  missingLabel,
  external = false,
}: {
  href: string;
  variant: "primary" | "secondary";
  label: string;
  missingLabel: string;
  external?: boolean;
}) {
  const colour =
    variant === "primary"
      ? "bg-primary text-white"
      : "bg-primary-light text-navy";

  if (!href) {
    return (
      <span
        aria-disabled="true"
        className={`${ACTION_BASE} ${colour} cursor-default opacity-45`}
      >
        {missingLabel}
      </span>
    );
  }

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${ACTION_BASE} ${colour} hover:scale-105 active:scale-[0.98] motion-reduce:hover:scale-100`}
    >
      {label}
    </a>
  );
}

/** Price row + actions. Rendered only for the clinic the user has active. */
function DetailPanel({ clinic }: { clinic: RankedClinic }) {
  const p = clinic.pricing;

  return (
    <div className="mt-[18px] border-t border-primary-light pt-[18px]">
      <div className="grid grid-cols-2 gap-[16px] lg:grid-cols-4">
        <PriceBox label="Consultation" value={money(p?.consultation)} />
        <PriceBox label="Finance options" value={yesNo(p?.financeAvailable)} />
        <PriceBox label="Exam Required" value={yesNo(p?.examRequired)} />
        <PriceBox
          label="Treatment Price"
          value={
            typeof p?.treatmentFrom === "number"
              ? `from £${p.treatmentFrom.toLocaleString("en-GB")}`
              : "On enquiry"
          }
        />
      </div>

      <div className="mt-[18px] flex flex-col gap-[11px] sm:flex-row">
        <ActionLink
          href={clinic.cqcUrl}
          variant="secondary"
          label="CQC report"
          missingLabel="CQC report"
          external
        />
        <ActionLink
          href={clinic.phone ? `tel:${clinic.phone.replace(/\s+/g, "")}` : ""}
          variant="secondary"
          label="Call now"
          missingLabel="No phone listed"
        />
        <ActionLink
          href={clinic.website}
          variant="primary"
          label="Visit website"
          missingLabel="No website"
          external
        />
      </div>
    </div>
  );
}

/**
 * One card design for every result: numbered, clickable, and expanding to
 * reveal pricing and actions. The top three additionally carry the featured
 * chip and a logo; lower cards stay clean, with neither.
 */
function ClinicCard({
  clinic,
  rank,
  featured,
  active,
  onSelect,
}: {
  clinic: RankedClinic;
  rank: number;
  featured: boolean;
  active: boolean;
  onSelect: () => void;
}) {
  const panelId = `clinic-panel-${clinic.id}`;

  return (
    <div className="rounded-[25px] bg-white px-[19px] pt-[19px] pb-[21px]">
      <button
        type="button"
        onClick={onSelect}
        aria-expanded={active}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-start gap-[14px] text-left"
      >
        <span className="flex min-w-0 flex-1 flex-col gap-[8px]">
          {featured && (
            <span className="flex h-[28px] w-fit items-center rounded-[16px] bg-[#e7f9fc] px-[12px] text-[14px] font-medium text-navy">
              {clinic.cqcRating ? `CQC ${clinic.cqcRating}` : "Featured practice"}
            </span>
          )}
          <span className="text-[20px] font-bold leading-[1.05] tracking-[-0.5px] text-navy sm:text-[24px]">
            #{rank} {clinic.name}
          </span>
          <LocationLine clinic={clinic} />
          <ReviewWeight clinic={clinic} />
        </span>

        {/* Logo slot, featured cards only. No logo ships in the CQC register,
            so this shows the practice initials until a source is attached. */}
        {featured && (
          <span className="flex size-[62px] shrink-0 items-center justify-center rounded-[12px] bg-primary-light text-[20px] font-bold text-navy sm:size-[77px] sm:text-[24px]">
            {initials(clinic.name)}
          </span>
        )}
      </button>

      <div
        id={panelId}
        hidden={!active}
        role="region"
        aria-label={`${clinic.name} pricing and contact`}
      >
        {active && <DetailPanel clinic={clinic} />}
      </div>
    </div>
  );
}

export default function ResultsList({
  clinics,
  startRank = 0,
}: {
  clinics: RankedClinic[];
  /** Results already listed on earlier pages, so numbering keeps running. */
  startRank?: number;
}) {
  // The first result starts expanded; selecting another moves the panel.
  const [activeId, setActiveId] = useState<string | null>(
    clinics[0]?.id ?? null,
  );

  return (
    <div className="flex flex-col gap-[16px]">
      {clinics.map((clinic, index) => (
        <ClinicCard
          key={clinic.id}
          clinic={clinic}
          rank={startRank + index + 1}
          featured={startRank + index < FEATURED_COUNT}
          active={activeId === clinic.id}
          onSelect={() =>
            setActiveId(activeId === clinic.id ? null : clinic.id)
          }
        />
      ))}
    </div>
  );
}
