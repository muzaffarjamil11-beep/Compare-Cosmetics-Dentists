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

function Logo({ inline = false }: { inline?: boolean }) {
  return (
    <div className={inline ? "flex items-center gap-3" : "flex flex-col gap-1"}>
      <img src="/images/logo-mark-white.svg" alt="" width={38} height={34} />
      {!inline && (
        <img
          src="/images/logo-wordmark-white.svg"
          alt="Compare Cosmetic Dentist"
          width={122}
          height={28}
        />
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy px-4 py-10 text-white md:px-10 md:py-[60px]">
      <div className="mx-auto flex max-w-[1361px] flex-col gap-10 md:gap-[65px]">
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

        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="flex flex-col gap-1 md:hidden">
            <Logo inline />
            <p className="mt-3 text-[13px] tracking-[-0.39px] text-white/80">
              Copyright &copy; 2026
            </p>
          </div>

          <div className="hidden md:block">
            <Logo />
          </div>

          <div className="hidden items-center gap-[10px] md:flex">
            <div className="flex h-[43px] w-[240px] items-center gap-3 rounded-xl bg-white px-[15px]">
              <img src="/images/icon-briefcase.svg" alt="" width={17} height={19} />
              <span className="text-[18px] tracking-[-0.36px] text-navy">
                Select treatment
              </span>
            </div>
            <div className="flex h-[43px] w-[240px] items-center gap-3 rounded-xl bg-white px-[15px]">
              <img src="/images/icon-pin.svg" alt="" width={18} height={23} />
              <span className="text-[18px] tracking-[-0.36px] text-navy">
                Select location
              </span>
            </div>
            <button
              type="button"
              className="h-[43px] w-[187px] rounded-xl border border-white text-[18px] font-bold tracking-[-0.36px] text-white transition-colors hover:bg-white/10"
            >
              See the reviews
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
