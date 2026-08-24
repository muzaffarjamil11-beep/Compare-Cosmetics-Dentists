import Button from "./Button";

const SEARCH_TERMS = [
  "Search term one",
  "Search term two",
  "Search term three",
  "Search term four",
  "Search term five",
  "Search term six",
  "Search term seven",
];

const LEGAL_LINKS = ["Terms & Conditions", "Privacy Policy", "Cookies"];

const TREATMENTS = [
  "Clear Aligners",
  "Porcelain Veneers",
  "Dental Hygienist",
  "Composite Bonding",
  "Dental Implants",
  "Teeth Whitening",
];

const LOCATIONS = ["Leeds", "Huddersfield", "Manchester", "London"];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-[15px]">
      <img
        src="/images/logo-mark-white.svg"
        alt=""
        className={compact ? "h-[34px] w-[38px]" : "h-[51px] w-[58px]"}
      />
      <img
        src="/images/logo-wordmark-white.svg"
        alt="Compare Cosmetic Dentist"
        className={compact ? "h-[28px] w-[122px]" : "h-[42px] w-[182px]"}
      />
    </div>
  );
}

/**
 * Footer variant of the search field. Unlike the hero's teal-on-white
 * version, Figma fills these icons and label in black (#000) rather than
 * the brand blue.
 */
function FooterSelect({
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
      className={`relative flex h-[43px] items-center justify-between rounded-xl bg-white pr-[18px] pl-[15px] ${className}`}
    >
      <span className="flex items-center gap-3">
        <img src={icon} alt="" className={iconClass} />
        <span className="text-[18px] tracking-[-0.36px] text-black">{label}</span>
      </span>
      <img
        src="/images/footer-icon-chevron.svg"
        alt=""
        className="pointer-events-none h-[8px] w-[14px] shrink-0"
      />
      {/* The colour must be set explicitly: the surrounding footer is
          text-white, and the native dropdown popup inherits it, which
          renders the options white-on-white and invisible. */}
      <select
        aria-label={label}
        defaultValue=""
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-white text-black opacity-0"
      >
        <option value="" disabled />
        {options.map((option) => (
          <option key={option} value={option} className="bg-white text-black">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy py-10 text-white md:py-[60px]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 md:gap-[65px] md:px-10">
        {/* Desktop: search-term columns */}
        <div className="hidden gap-6 md:grid md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, col) => (
            <div key={col} className="flex flex-col gap-[22px]">
              <p className="text-[24px] font-medium tracking-[-0.48px]">
                Popular searches
              </p>
              {SEARCH_TERMS.map((term) => (
                <a
                  key={term}
                  href="#"
                  className="text-[20px] tracking-[-0.4px] text-white/90 transition-opacity hover:opacity-70"
                >
                  {term}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile: legal links */}
        <div className="flex flex-col gap-3 md:hidden">
          {LEGAL_LINKS.map((label) => (
            <a
              key={label}
              href="#"
              className="text-[16px] tracking-[-0.48px] text-white/90"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Mobile: logo left, copyright on its right */}
        <div className="flex items-center justify-between gap-4 md:hidden">
          <Logo compact />
          <p className="shrink-0 text-[13px] tracking-[-0.39px] text-white/80">
            Copyright &copy; 2026
          </p>
        </div>

        {/* Fields left, logo right — but the pair needs 942px plus a gap, so
            below 1280px they stack and the fields flex to fill the row
            instead of overflowing. */}
        <div className="hidden flex-col gap-8 md:flex xl:flex-row xl:items-center xl:justify-between">
          <div className="flex w-full items-center gap-[10px] xl:w-auto">
            <FooterSelect
              icon="/images/footer-icon-treatment.svg"
              iconClass="h-[19px] w-[17px]"
              label="Select treatment"
              options={TREATMENTS}
              className="min-w-0 flex-1 xl:w-[240px] xl:flex-none"
            />
            <FooterSelect
              icon="/images/footer-icon-pin.svg"
              iconClass="h-[23px] w-[18px]"
              label="Select location"
              options={LOCATIONS}
              className="min-w-0 flex-1 xl:w-[240px] xl:flex-none"
            />
            <Button
              variant="outline"
              className="h-[43px] w-[187px] shrink-0 text-[18px] tracking-[-0.36px]"
            >
              See the reviews
            </Button>
          </div>

          <Logo />
        </div>
      </div>
    </footer>
  );
}
