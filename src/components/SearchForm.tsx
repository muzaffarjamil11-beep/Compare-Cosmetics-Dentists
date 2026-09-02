import Button from "@/components/Button";
import { getLocationOptions } from "@/lib/clinics";
import { TREATMENTS } from "@/lib/search-data";

type Variant = "hero" | "bar" | "footer";

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

  const textClass = isFooter ? "text-black" : "text-navy";
  const optionClass = isFooter ? "bg-white text-black" : "bg-white text-navy";

  // Class strings must stay literal — Tailwind cannot see interpolated names.
  const fieldBase = isFooter
    ? "relative flex h-[43px] items-center gap-3 rounded-xl bg-white pr-[18px] pl-[15px]"
    : "relative flex h-[53px] items-center gap-3 rounded-xl bg-white pr-[18px] pl-[15px]";
  const field = (extra: string) => `${fieldBase} ${extra}`;

  const selectClass = `w-full min-w-0 cursor-pointer appearance-none bg-transparent text-[16px] tracking-[-0.36px] outline-none sm:text-[18px] ${textClass}`;

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
      <div className={field(treatmentWidth)}>
        <img
          src={icons.treatment}
          alt=""
          className="h-[19px] w-[17px] shrink-0"
        />
        <select
          name="treatment"
          aria-label="Select treatment"
          defaultValue={defaultTreatment}
          className={selectClass}
        >
          <option value="" className={optionClass}>
            Select treatment
          </option>
          {TREATMENTS.map((treatment) => (
            <option key={treatment} value={treatment} className={optionClass}>
              {treatment}
            </option>
          ))}
        </select>
        <img
          src={icons.chevron}
          alt=""
          className="pointer-events-none h-[8px] w-[14px] shrink-0"
        />
      </div>

      <div className={field(locationWidth)}>
        <img src={icons.location} alt="" className="h-[23px] w-[18px] shrink-0" />
        <select
          name="location"
          aria-label="Select location"
          defaultValue={defaultLocation}
          className={selectClass}
        >
          <option value="" className={optionClass}>
            Select location
          </option>
          {locations.map((location) => (
            <option key={location} value={location} className={optionClass}>
              {location}
            </option>
          ))}
        </select>
        <img
          src={icons.chevron}
          alt=""
          className="pointer-events-none h-[8px] w-[14px] shrink-0"
        />
      </div>

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
