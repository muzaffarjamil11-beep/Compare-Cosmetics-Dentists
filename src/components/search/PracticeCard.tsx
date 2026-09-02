import Button from "@/components/Button";
import type { Practice } from "@/lib/search-data";

function RatingRow({ practice }: { practice: Practice }) {
  // Figma's row is 463px, but the substituted font renders the address ~30px
  // wider, which forced the rating onto a second line. 500px keeps the
  // intended single row with the rating flush right.
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:w-[500px] sm:justify-between">
      <span className="flex items-center gap-[12px]">
        <img
          src="/images/icon-pin.svg"
          alt=""
          className="h-[23px] w-[17px] shrink-0"
        />
        <span className="text-[15px] leading-[1.1] tracking-[-0.34px] text-navy sm:text-[17px]">
          {practice.address}
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-2">
        <span className="text-[15px] leading-[1.16] tracking-[-0.34px] text-navy sm:text-[17px]">
          {practice.rating}
        </span>
        <img
          src="/images/rating-stars.svg"
          alt={`Rated ${practice.rating} out of 5`}
          className="h-[15px] w-[83px]"
        />
        <span className="text-[15px] leading-[1.16] tracking-[-0.34px] text-navy sm:text-[17px]">
          {practice.reviews}
        </span>
      </span>
    </div>
  );
}

function PracticeLogo({ logo }: { logo: NonNullable<Practice["logo"]> }) {
  const box = "size-[62px] shrink-0 rounded-[12px] sm:size-[77px]";

  if (logo.type === "photo") {
    return (
      <img
        src={logo.src}
        alt=""
        width={77}
        height={77}
        className={`${box} object-cover ${logo.bg ?? ""}`}
      />
    );
  }

  return (
    <div className={`${box} ${logo.bg} flex items-center justify-center`}>
      <img src={logo.src} alt="" className="h-[43px] w-[46px] sm:h-[54px] sm:w-[57px]" />
    </div>
  );
}

/** Compact row used for results outside the featured block. */
function NonFeaturedCard({ practice }: { practice: Practice }) {
  return (
    <div className="flex flex-col items-start gap-[11px] rounded-[25px] bg-white px-[19px] pt-[19px] pb-[21px]">
      <h3 className="whitespace-pre-line text-[22px] font-bold leading-[0.94] tracking-[-0.56px] text-navy sm:text-[28px]">
        {`#${practice.rank} ${practice.name}`}
      </h3>
      <RatingRow practice={practice} />
    </div>
  );
}

function FeaturedCard({ practice }: { practice: Practice }) {
  return (
    <div className="flex flex-col rounded-[25px] bg-white px-[19px] pt-[19px] pb-[21px]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col items-start gap-[11px]">
          <span className="flex h-[28px] items-center rounded-[16px] bg-[#e7f9fc] px-[12px] text-[14px] leading-[1.6] font-medium text-navy">
            Featured practice
          </span>
          <h3 className="whitespace-pre-line text-[22px] font-bold leading-[0.94] tracking-[-0.56px] text-navy sm:text-[28px]">
            {`#${practice.rank} ${practice.name}`}
          </h3>
          <RatingRow practice={practice} />
        </div>
        {practice.logo && <PracticeLogo logo={practice.logo} />}
      </div>

      {practice.specs && (
        <div className="mt-[22px] grid grid-cols-2 gap-[16px] lg:grid-cols-4">
          {practice.specs.map((spec) => (
            <div
              key={spec.label}
              className="flex min-w-0 flex-col items-center gap-[10px] rounded-[8px] border border-primary-light px-[10px] py-[12px] text-center text-navy"
            >
              <span className="text-[14px] leading-[0.84] tracking-[-0.28px]">
                {spec.label}
              </span>
              <span className="text-[20px] leading-[0.84] font-bold tracking-[-0.4px]">
                {spec.prefix && (
                  <span className="mr-[3px] text-[12px]">{spec.prefix.trim()}</span>
                )}
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-[22px] flex flex-col gap-[11px] sm:flex-row">
        <Button
          variant="secondary"
          className="h-[54px] flex-1 rounded-[15px] px-4 text-[18px] tracking-[-0.4px] sm:text-[20px]"
        >
          Learn more
        </Button>
        <Button
          variant="secondary"
          className="h-[54px] flex-1 rounded-[15px] px-4 text-[18px] tracking-[-0.4px] sm:text-[20px]"
        >
          Call now
        </Button>
        <Button
          variant="primary"
          className="h-[54px] flex-1 rounded-[15px] px-4 text-[18px] tracking-[-0.4px] sm:text-[20px]"
        >
          Visit website
        </Button>
      </div>
    </div>
  );
}

export default function PracticeCard({ practice }: { practice: Practice }) {
  return practice.featured ? (
    <FeaturedCard practice={practice} />
  ) : (
    <NonFeaturedCard practice={practice} />
  );
}
