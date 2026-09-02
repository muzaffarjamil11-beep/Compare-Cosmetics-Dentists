import { formatAddress, getTopClinics, type Clinic } from "@/lib/clinics";

/* Three cards sit side by side from 768px, where each is only ~214px wide, so
   the type steps down for tablet and only reaches Figma's desktop sizes at
   1280px, where a card is wide enough (~384px) to carry them. */
const META_TEXT =
  "text-[13px] leading-[1.25] tracking-[-0.26px] text-navy md:text-[12px] lg:text-[13px] xl:text-[15px] xl:tracking-[-0.3px]";
const CARD_ACTION =
  "flex h-[43px] items-center justify-center rounded-xl px-2 text-[16px] font-bold tracking-[-0.32px] transition-transform duration-200 ease-out hover:scale-105 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100 md:h-[40px] md:w-full md:text-[14px] lg:h-[43px] lg:w-auto lg:flex-1 lg:text-[16px] xl:h-[51px] xl:rounded-[14px] xl:text-[18px] xl:tracking-[-0.36px]";

function ClinicCard({ clinic }: { clinic: Clinic }) {
  return (
    <div className="flex h-full w-full flex-col rounded-[20px] bg-white p-[15px] md:p-[18px] xl:rounded-[24px]">
      <h3 className="text-[22px] font-bold leading-[1.05] tracking-[-0.44px] text-navy md:text-[17px] md:tracking-[-0.34px] lg:text-[20px] lg:tracking-[-0.4px] xl:text-[26px] xl:tracking-[-0.52px]">
        {clinic.name}
      </h3>

      <div className="mt-[14px] flex items-start gap-[10px]">
        <img
          src="/images/icon-pin-small.svg"
          alt=""
          className="mt-[2px] h-[18px] w-[14px] shrink-0 md:h-[16px] md:w-[12px] xl:h-[22px] xl:w-[17px]"
        />
        <p className={META_TEXT}>{formatAddress(clinic)}</p>
      </div>

      {clinic.phone && (
        <p className={`mt-[8px] pl-[24px] ${META_TEXT}`}>{clinic.phone}</p>
      )}

      {/* mt-auto keeps the actions bottom-aligned across all three cards
          even if one address wraps to a second line. */}
      <div className="mt-auto flex gap-[10px] pt-[20px] md:flex-col md:gap-[8px] lg:flex-row lg:gap-[10px]">
        <a
          href={clinic.cqcUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${CARD_ACTION} flex-1 bg-primary-light text-navy`}
        >
          CQC report
        </a>
        {clinic.website ? (
          <a
            href={clinic.website}
            target="_blank"
            rel="noopener noreferrer"
            className={`${CARD_ACTION} flex-1 bg-primary text-white`}
          >
            Visit website
          </a>
        ) : (
          <span
            aria-disabled="true"
            className={`${CARD_ACTION} flex-1 cursor-default bg-primary text-white opacity-45`}
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
    <section className="bg-surface py-12 md:py-16">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-8 px-4 md:gap-[34px] md:px-10">
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
        <p className="text-center text-[13px] text-navy/55">
          Practice details from the Care Quality Commission register. CQC
          ratings are not included in this dataset.
        </p>
      </div>
    </section>
  );
}
