import Button from "./Button";

const TREATMENTS = [
  "Clear Aligners",
  "Porcelain Veneers",
  "Dental Hygienist",
  "Composite Bonding",
  "Dental Implants",
  "Teeth Whitening",
];

const LOCATIONS = ["Leeds", "Huddersfield", "Manchester", "London"];

function SelectField({
  icon,
  iconWidth,
  iconHeight,
  label,
  options,
}: {
  icon: string;
  iconWidth: number;
  iconHeight: number;
  label: string;
  options: string[];
}) {
  return (
    <div className="relative flex h-[53px] flex-1 items-center rounded-xl bg-white pl-[15px] pr-[18px]">
      <div className="flex items-center gap-3">
        <img src={icon} alt="" width={iconWidth} height={iconHeight} />
        <span className="text-[18px] tracking-[-0.36px] text-navy">{label}</span>
      </div>
      <img
        src="/images/icon-chevron-down.svg"
        alt=""
        width={14}
        height={8}
        className="pointer-events-none absolute right-[18px]"
      />
      <select
        aria-label={label}
        defaultValue=""
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
      >
        <option value="" disabled />
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function Rating() {
  return (
    <div className="flex shrink-0 items-center gap-1 md:gap-2">
      <span className="text-[13px] leading-[1.16] tracking-[-0.26px] text-navy">
        4.9
      </span>
      <img
        src="/images/stars-5.svg"
        alt="Rated 4.9 out of 5"
        width={68}
        height={12}
      />
      <img src="/images/feefo-logo.svg" alt="feefo" width={57} height={13} />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="pt-4 pb-[30px] md:pt-0">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-10">
        <div className="rounded-[20px] bg-teal-light px-4 pt-9 pb-[33px] md:pt-[78px] md:pb-[33px]">
          <div className="mx-auto flex w-full max-w-[835px] flex-col gap-[35px] md:gap-[86px]">
            <div className="flex flex-col items-center gap-8 md:gap-16">
              <div className="flex flex-col items-center gap-[30px] text-center text-navy">
                <h1 className="text-[40px] font-bold leading-[0.94] tracking-[-0.8px] md:text-[50px] md:tracking-[-1px]">
                  Smarter dental
                  <br className="md:hidden" /> choices,
                  <br />
                  made simple
                </h1>
                <p className="text-[18px] leading-[1.16] tracking-[-0.36px] md:text-[24px] md:tracking-[-0.48px]">
                  We are the independent consumer
                  <br />
                  hub for UK dentistry
                </p>
              </div>

              <div className="flex w-full flex-col gap-[10px] md:flex-row">
                <SelectField
                  icon="/images/icon-briefcase.svg"
                  iconWidth={17}
                  iconHeight={19}
                  label="Select treatment"
                  options={TREATMENTS}
                />
                <SelectField
                  icon="/images/icon-pin.svg"
                  iconWidth={18}
                  iconHeight={23}
                  label="Select location"
                  options={LOCATIONS}
                />
                <Button
                  variant="primary"
                  className="h-[53px] flex-1 px-[15px] text-[18px] tracking-[-0.36px]"
                >
                  See the reviews
                </Button>
              </div>
            </div>

            <div className="flex w-full flex-wrap items-center justify-between gap-x-2 gap-y-3 md:gap-x-4">
              <p className="whitespace-nowrap text-[16px] font-bold leading-[1.16] tracking-[-0.32px] text-navy">
                Advice you can trust
              </p>
              <Rating />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
