import Button from "@/components/Button";
import { LOCATIONS, TREATMENTS } from "@/lib/search-data";

function SelectField({
  icon,
  iconClass,
  label,
  options,
  className = "",
}: {
  icon: string;
  iconClass: string;
  label: string;
  options: string[];
  className?: string;
}) {
  return (
    <div
      className={`relative flex h-[53px] items-center justify-between gap-2 rounded-xl bg-white pr-[18px] pl-[15px] ${className}`}
    >
      <span className="flex min-w-0 items-center gap-3">
        <img src={icon} alt="" className={`${iconClass} shrink-0`} />
        <span className="truncate text-[16px] tracking-[-0.36px] text-navy sm:text-[18px]">
          {label}
        </span>
      </span>
      <img
        src="/images/icon-chevron-down.svg"
        alt=""
        className="pointer-events-none h-[8px] w-[14px] shrink-0"
      />
      {/* Colour set explicitly so the native dropdown stays legible. */}
      <select
        aria-label={label}
        defaultValue=""
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-white text-navy opacity-0"
      >
        <option value="" disabled />
        {options.map((option) => (
          <option key={option} value={option} className="bg-white text-navy">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function SearchTopBar() {
  return (
    <div className="bg-teal-light py-[15px]">
      <div className="px-4 md:px-10">
        <div className="mx-auto flex max-w-[1146px] flex-col gap-[10px] md:flex-row">
          <SelectField
            icon="/images/icon-briefcase.svg"
            iconClass="h-[19px] w-[17px]"
            label="Select treatment"
            options={TREATMENTS}
            className="md:flex-[505_1_0]"
          />
          <SelectField
            icon="/images/icon-pin.svg"
            iconClass="h-[23px] w-[18px]"
            label="Select location"
            options={LOCATIONS}
            className="md:flex-[409_1_0]"
          />
          <Button
            variant="primary"
            className="h-[53px] w-full px-[15px] text-[18px] tracking-[-0.36px] md:w-[213px] md:shrink-0"
          >
            See the reviews
          </Button>
        </div>
      </div>
    </div>
  );
}
