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

export default function Hero() {
  return (
    <section className="px-4 pt-4 md:px-10 md:pt-0">
      <div className="mx-auto flex max-w-[1361px] flex-col items-center gap-[35px] rounded-[20px] bg-teal-light px-4 py-9 md:gap-[86px] md:px-[100px] md:py-[78px]">
        <div className="flex w-full flex-col items-center gap-8 md:gap-16">
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
            <button
              type="button"
              className="h-[53px] shrink-0 rounded-xl bg-primary px-[15px] text-[18px] font-bold tracking-[-0.36px] text-white transition-opacity hover:opacity-90 md:w-auto md:flex-1"
            >
              See the reviews
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-[41px]">
          <p className="text-[16px] font-bold tracking-[-0.32px] text-navy">
            Advice you can trust
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[13px] tracking-[-0.26px] text-navy">4.9</span>
            <img src="/images/trust-stars.svg" alt="" width={57} height={13} />
            <img src="/images/feefo-badge.svg" alt="feefo" width={68} height={12} />
          </div>
        </div>
      </div>
    </section>
  );
}
