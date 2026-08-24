const ITEMS = [
  {
    icon: "/images/icon-help-1.svg",
    iconClass: "size-[24px]",
    title: "Find top-rated clinics, fast",
    lines: ["Search the best-rated clinics near", "you and compare before you book."],
  },
  {
    icon: "/images/icon-help-2.svg",
    iconClass: "h-[24px] w-[20px]",
    title: "Clear costs, trusted information",
    lines: ["See accurate treatment details and", "transparent pricing upfront."],
  },
  {
    icon: "/images/icon-help-3.svg",
    iconClass: "h-[22px] w-[22px]",
    title: "Simple, no-cost booking",
    lines: ["Book appointments easily", "with no extra cost to you."],
  },
];

/**
 * Three layouts, each chosen by whether it actually fits:
 *  - <1024px  heading centred on top, items stacked
 *  - 1024px+  heading centred on top, items in a row (needs ~864px)
 *  - 1360px+  Figma desktop: heading left in a 350px column, items right
 *             (needs 350 + 34 + 864 = 1248px of content width)
 */
export default function HowWeHelp() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-10">
        <div className="flex flex-col items-center gap-9 3xl:flex-row 3xl:items-start 3xl:gap-[34px]">
          {/* max-w-520 breaks the heading onto two lines from tablet up to
              1360px. Above that the 350px column takes over and gives
              Figma's three lines — 350 rather than Figma's 320 because the
              substituted font is wider and 320 forced a 4th line. */}
          <h2 className="max-w-[290px] text-center text-[32px] font-bold leading-[0.94] tracking-[-0.64px] text-navy md:max-w-[520px] md:text-[42px] md:tracking-[-0.84px] 3xl:w-[350px] 3xl:max-w-none 3xl:shrink-0 3xl:text-left">
            How Compare Cosmetic Dentist can help you
          </h2>

          <div className="flex w-full flex-col items-center gap-9 md:flex-row md:items-start md:gap-6 lg:gap-[39px] 3xl:w-auto 3xl:flex-1 3xl:justify-end">
            {ITEMS.map((item) => (
              <div
                key={item.title}
                className="flex w-full flex-col items-center gap-[18px] text-center md:min-w-0 md:flex-1 3xl:w-auto 3xl:flex-none"
              >
                <div className="flex size-[50px] shrink-0 items-center justify-center rounded-[10px] bg-teal-light">
                  <img src={item.icon} alt="" className={item.iconClass} />
                </div>
                {/* The copy only carries Figma's hard line breaks at the
                    width they were drawn for; below that the two spans sit
                    inline and wrap to whatever the column allows. */}
                <p className="text-[16px] leading-[1.16] tracking-[-0.32px] text-navy lg:text-[18px] lg:tracking-[-0.36px]">
                  <span className="block font-bold">{item.title}</span>
                  <span className="3xl:block">{item.lines[0]}</span>{" "}
                  <span className="3xl:block">{item.lines[1]}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
