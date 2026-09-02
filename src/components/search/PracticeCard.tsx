import { formatAddress, type Clinic } from "@/lib/clinics";

const ACTION_BASE =
  "flex h-[54px] flex-1 items-center justify-center rounded-[15px] px-4 text-[18px] font-bold tracking-[-0.4px] transition-transform duration-200 ease-out motion-reduce:transition-none sm:text-[20px]";

const ACTION_VARIANTS = {
  primary: "bg-primary text-white",
  secondary: "bg-primary-light text-navy",
} as const;

/**
 * Card actions are real links (to the CQC report, tel: or the practice
 * website), so they render as anchors rather than buttons. Where the export
 * has no value the control is shown inert instead of linking nowhere.
 */
function Action({
  href,
  variant,
  label,
  missingLabel,
  external = false,
}: {
  href: string;
  variant: keyof typeof ACTION_VARIANTS;
  label: string;
  missingLabel: string;
  external?: boolean;
}) {
  if (!href) {
    return (
      <span
        aria-disabled="true"
        className={`${ACTION_BASE} ${ACTION_VARIANTS[variant]} cursor-default opacity-45`}
      >
        {missingLabel}
      </span>
    );
  }

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${ACTION_BASE} ${ACTION_VARIANTS[variant]} hover:scale-105 active:scale-[0.98] motion-reduce:hover:scale-100`}
    >
      {label}
    </a>
  );
}

/**
 * The CQC export carries no rating, so the slot the design gives to stars
 * shows the practice's registration facts instead — its CQC provider and a
 * link to its published report.
 */
function MetaRow({ clinic }: { clinic: Clinic }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <span className="flex items-start gap-[12px]">
        <img
          src="/images/icon-pin.svg"
          alt=""
          className="mt-[2px] h-[23px] w-[17px] shrink-0"
        />
        <span className="text-[15px] leading-[1.25] tracking-[-0.34px] text-navy sm:text-[17px]">
          {formatAddress(clinic)}
        </span>
      </span>
      {clinic.provider && (
        <span className="pl-[29px] text-[13px] leading-[1.3] text-navy/60 sm:text-[14px]">
          CQC registered provider: {clinic.provider}
        </span>
      )}
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-[8px] rounded-[8px] border border-primary-light px-[10px] py-[12px] text-center text-navy">
      <span className="text-[14px] leading-[1] tracking-[-0.28px] text-navy/70">
        {label}
      </span>
      <span className="w-full text-[15px] leading-[1.2] font-bold tracking-[-0.3px] break-words sm:text-[17px]">
        {value}
      </span>
    </div>
  );
}

function FeaturedCard({ clinic }: { clinic: Clinic }) {
  return (
    <div className="flex flex-col rounded-[25px] bg-white px-[19px] pt-[19px] pb-[21px]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col items-start gap-[11px]">
          <span className="flex h-[28px] items-center rounded-[16px] bg-[#e7f9fc] px-[12px] text-[14px] leading-[1.6] font-medium text-navy">
            CQC registered
          </span>
          <h3 className="text-[22px] font-bold leading-[1.05] tracking-[-0.56px] text-navy sm:text-[28px]">
            {clinic.name}
          </h3>
          <MetaRow clinic={clinic} />
        </div>
      </div>

      <div className="mt-[22px] grid grid-cols-2 gap-[16px] lg:grid-cols-4">
        <InfoBox label="Town" value={clinic.town || "—"} />
        <InfoBox label="Region" value={clinic.region || "—"} />
        <InfoBox label="Phone" value={clinic.phone || "Not listed"} />
        <InfoBox
          label="Consultation"
          value={<span className="font-normal text-navy/60">On enquiry</span>}
        />
      </div>

      <div className="mt-[22px] flex flex-col gap-[11px] sm:flex-row">
        <Action
          href={clinic.cqcUrl}
          variant="secondary"
          label="CQC report"
          missingLabel="CQC report"
          external
        />
        <Action
          href={clinic.phone ? `tel:${clinic.phone.replace(/\s+/g, "")}` : ""}
          variant="secondary"
          label="Call now"
          missingLabel="No phone listed"
        />
        <Action
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

function CompactCard({ clinic }: { clinic: Clinic }) {
  return (
    <div className="flex flex-col items-start gap-[11px] rounded-[25px] bg-white px-[19px] pt-[19px] pb-[21px]">
      <div className="flex w-full flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h3 className="text-[20px] font-bold leading-[1.05] tracking-[-0.5px] text-navy sm:text-[24px]">
          {clinic.name}
        </h3>
        <span className="flex shrink-0 gap-4 text-[14px] tracking-[-0.28px]">
          {clinic.website && (
            <a
              href={clinic.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-primary hover:underline"
            >
              Website
            </a>
          )}
          {clinic.cqcUrl && (
            <a
              href={clinic.cqcUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy/70 hover:underline"
            >
              CQC report
            </a>
          )}
        </span>
      </div>
      <MetaRow clinic={clinic} />
      {clinic.phone && (
        <a
          href={`tel:${clinic.phone.replace(/\s+/g, "")}`}
          className="pl-[29px] text-[15px] font-bold tracking-[-0.3px] text-primary hover:underline sm:text-[16px]"
        >
          {clinic.phone}
        </a>
      )}
    </div>
  );
}

export default function PracticeCard({
  clinic,
  featured = false,
}: {
  clinic: Clinic;
  featured?: boolean;
}) {
  return featured ? (
    <FeaturedCard clinic={clinic} />
  ) : (
    <CompactCard clinic={clinic} />
  );
}
