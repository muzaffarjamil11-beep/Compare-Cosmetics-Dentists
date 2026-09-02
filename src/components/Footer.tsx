import SearchForm from "./SearchForm";
import { getPopularLocations } from "@/lib/clinics";

const LEGAL_LINKS = ["Terms & Conditions", "Privacy Policy", "Cookies"];

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

export default function Footer() {
  // Four columns of real "Dentists in <town>" links, ordered by how many
  // CQC-registered practices each town actually has.
  const popular = getPopularLocations(28);
  const columns = [0, 1, 2, 3].map((i) => popular.slice(i * 7, i * 7 + 7));

  return (
    <footer className="bg-navy py-10 text-white md:py-[60px]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 md:gap-[65px] md:px-10">
        {/* Desktop: popular-location columns */}
        <div className="hidden gap-6 md:grid md:grid-cols-4">
          {columns.map((column, index) => (
            <div key={index} className="flex flex-col gap-[22px]">
              <p className="text-[24px] font-medium tracking-[-0.48px]">
                Popular searches
              </p>
              {column.map((term) => (
                <a
                  key={term}
                  href={`/search?location=${encodeURIComponent(
                    term.replace(/^Dentists in /, ""),
                  )}`}
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
            below 1280px they stack and the fields flex to fill the row. */}
        <div className="hidden flex-col gap-8 md:flex xl:flex-row xl:items-center xl:justify-between">
          <SearchForm variant="footer" />
          <Logo />
        </div>
      </div>
    </footer>
  );
}
