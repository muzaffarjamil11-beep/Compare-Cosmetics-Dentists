import Button from "@/components/Button";
import { getLocationOptions } from "@/lib/clinics";
import { TREATMENTS } from "@/lib/search-data";

type Variant = "hero" | "bar" | "footer";

/**
 * A single search field.
 *
 * The whole pill is a <label>, so clicking anywhere in it — the icon, the
 * blank space, or the chevron — activates the select and opens the dropdown,
 * rather than only the text hitting it. The icons are pointer-events-none so
 * they never swallow the click.
 *
 * The chevron flips while the select has focus, which is what opening the
 * dropdown does, so the arrow reverses as the list appears.
 */
function Field({
  name,
  label,
  icon,
  iconClass,
  chevron,
  options,
  defaultValue,
  compact,
  className = "",
}: {
  name: string;
  label: string;
  icon: string;
  iconClass: string;
  chevron: string;
  options: string[];
  defaultValue: string;
  compact: boolean;
  className?: string;
}) {
  const optionClass = compact ? "bg-white text-black" : "bg-white text-navy";

  return (
    <label
      className={`relative flex cursor-pointer items-center gap-3 rounded-xl bg-white pr-[18px] pl-[15px] ${
        compact ? "h-[43px]" : "h-[53px]"
      } ${className}`}
    >
      <img
        src={icon}
        alt=""
        className={`${iconClass} pointer-events-none shrink-0`}
      />
      <select
        name={name}
        aria-label={label}
        defaultValue={defaultValue}
        className={`peer w-full min-w-0 cursor-pointer appearance-none bg-transparent text-[16px] tracking-[-0.36px] outline-none sm:text-[18px] ${
          compact ? "text-black" : "text-navy"
        }`}
      >
        <option value="" className={optionClass}>
          {label}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className={optionClass}>
            {option}
          </option>
        ))}
      </select>
      <img
        src={chevron}
        alt=""
        className="pointer-events-none h-[8px] w-[14px] shrink-0 transition-transform duration-200 ease-out peer-focus:rotate-[180deg] motion-reduce:transition-none"
      />
    </label>
  );
}

/**
 * The treatment/location search used on the home hero, the footer and the
 * search page's top bar. A plain GET form, so choosing a treatment and
 * location and pressing the button navigates to
 * /search?treatment=…&location=… with no JavaScript required.
 */
export default function SearchForm({
  variant = "hero",
  defaultTreatment = "",
  defaultLocation = "",
}: {
  variant?: Variant;
  defaultTreatment?: string;
  defaultLocation?: string;
}) {
  const locations = getLocationOptions();
  const isFooter = variant === "footer";

  const icons = isFooter
    ? {
        treatment: "/images/footer-icon-treatment.svg",
        location: "/images/footer-icon-pin.svg",
        chevron: "/images/footer-icon-chevron.svg",
      }
    : {
        treatment: "/images/icon-briefcase.svg",
        location: "/images/icon-pin.svg",
        chevron: "/images/icon-chevron-down.svg",
      };

  const layout =
    variant === "hero"
      ? "flex w-full flex-col gap-[10px] lg:flex-row"
      : variant === "bar"
        ? "flex flex-col gap-[10px] md:flex-row"
        : "flex w-full flex-col gap-[10px] sm:flex-row xl:w-auto";

  const treatmentWidth =
    variant === "bar"
      ? "md:flex-[505_1_0]"
      : isFooter
        ? "min-w-0 flex-1 xl:w-[240px] xl:flex-none"
        : "w-full lg:w-auto lg:flex-1";

  const locationWidth =
    variant === "bar"
      ? "md:flex-[409_1_0]"
      : isFooter
        ? "min-w-0 flex-1 xl:w-[240px] xl:flex-none"
        : "w-full lg:w-auto lg:flex-1";

  return (
    <form action="/search" method="get" className={layout}>
      <Field
        name="treatment"
        label="Select treatment"
        icon={icons.treatment}
        iconClass="h-[19px] w-[17px]"
        chevron={icons.chevron}
        options={TREATMENTS}
        defaultValue={defaultTreatment}
        compact={isFooter}
        className={treatmentWidth}
      />

      <Field
        name="location"
        label="Select location"
        icon={icons.location}
        iconClass="h-[23px] w-[18px]"
        chevron={icons.chevron}
        options={locations}
        defaultValue={defaultLocation}
        compact={isFooter}
        className={locationWidth}
      />

      <Button
        type="submit"
        variant={isFooter ? "outline" : "primary"}
        className={
          isFooter
            ? "h-[43px] w-full shrink-0 text-[18px] tracking-[-0.36px] sm:w-[187px]"
            : variant === "bar"
              ? "h-[53px] w-full px-[15px] text-[18px] tracking-[-0.36px] md:w-[213px] md:shrink-0"
              : "h-[53px] w-full px-[15px] text-[18px] tracking-[-0.36px] lg:w-auto lg:flex-1"
        }
      >
        See the reviews
      </Button>
    </form>
  );
}
