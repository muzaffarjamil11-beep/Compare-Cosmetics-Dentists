import Button from "@/components/Button";
import SelectField from "@/components/SelectField";
import { getLocationOptions } from "@/lib/clinics";
import { TREATMENTS } from "@/lib/taxonomy";

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
      <SelectField
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

      <SelectField
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
