import { formatAddress, getTopClinics, type RankedClinic } from "@/lib/clinics";

/* Three cards sit side by side from 768px, where each is only ~214px wide, so
   the type steps down for tablet and only reaches Figma's desktop sizes at
   1280px, where a card is wide enough (~384px) to carry them. */
const META_TEXT =
  "text-[13px] leading-[1.25] tracking-[-0.26px] text-navy md:text-[12px] lg:text-[13px] xl:text-[15px] xl:tracking-[-0.3px]";

function initials(name: string): string {
  return name
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join("");
}

function ClinicCard({ clinic }: { clinic: RankedClinic }) {
  return (
    <div className="flex h-full w-full flex-col rounded-[20px] bg-white p-[15px] md:p-[18px] xl:rounded-[24px]">
      <div className="flex items-start justify-between gap-3">
        {/* The name is the "learn more" link — it opens the practice's CQC
            report, so the card needs only one button. */}
        <h3 className="max-w-[175px] min-w-0 text-[22px] font-bold leading-[1.05] tracking-[-0.44px] text-navy md:text-[17px] md:tracking-[-0.34px] lg:text-[20px] lg:tracking-[-0.4px] xl:text-[26px] xl:tracking-[-0.52px]">
          <a
            href={clinic.cqcUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:underline hover:opacity-75"
          >
            {clinic.name}
          </a>
        </h3>

        {/* Logo slot. The CQC register ships no logos, so this shows the
            practice initials until a logo source is attached. */}
        <span className="flex size-[46px] shrink-0 items-center justify-center rounded-[10px] bg-primary-light text-[16px] font-bold text-navy md:size-[40px] md:text-[14px] lg:size-[46px] lg:text-[16px] xl:size-[56px] xl:rounded-[12px] xl:text-[20px]">
          {initials(clinic.name)}
        </span>
      </div>

      <div className="mt-[14px] flex items-start gap-[10px]">
        <img
          src="/images/icon-pin-small.svg"
          alt=""
          className="mt-[2px] h-[18px] w-[14px] shrink-0 md:h-[16px] md:w-[12px] xl:h-[22px] xl:w-[17px]"
        />
        <p className={META_TEXT}>{formatAddress(clinic)}</p>
      </div>

      {/* mt-auto keeps the action bottom-aligned across all three cards even
          if one address wraps to a second line. */}
      <div className="mt-auto pt-[20px]">
        {clinic.website ? (
          <a
            href={clinic.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[43px] w-full cursor-pointer items-center justify-center rounded-xl bg-primary px-2 text-[16px] font-bold tracking-[-0.32px] text-white transition-transform duration-200 ease-out hover:scale-105 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100 md:h-[40px] md:text-[14px] lg:h-[43px] lg:text-[16px] xl:h-[51px] xl:rounded-[14px] xl:text-[18px]"
          >
            Visit website
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="flex h-[43px] w-full cursor-default items-center justify-center rounded-xl bg-primary px-2 text-[16px] font-bold tracking-[-0.32px] text-white opacity-45 md:h-[40px] md:text-[14px] lg:h-[43px] lg:text-[16px] xl:h-[51px] xl:rounded-[14px] xl:text-[18px]"
          >
            No website
          </span>
        )}
      </div>
    </div>
  );
}

export default function TopClinics({ location = "Leeds" }: { location?: string }) {
  // Real CQC-registered practices for the location, best-documented first.
  const clinics = getTopClinics(location, 3);

  return (
    // The heading sits on equal space top and bottom: the section's vertical
    // padding matches the gap down to the cards.
    <section className="bg-surface py-12 md:py-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-4 md:gap-16 md:px-10">
        <h2 className="text-center text-[32px] font-bold leading-[0.94] tracking-[-0.64px] text-navy md:text-[42px] md:tracking-[-0.84px]">
          Top rated dental
          <br />
          clinics near you
        </h2>
        <div className="flex w-full flex-col items-stretch gap-4 md:flex-row md:gap-4 xl:gap-6">
          {clinics.map((clinic) => (
            <div key={clinic.id} className="md:min-w-0 md:flex-1">
              <ClinicCard clinic={clinic} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
