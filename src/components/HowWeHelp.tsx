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
        <div className="flex flex-col items-center gap-9 min-[1360px]:flex-row min-[1360px]:items-start min-[1360px]:gap-[34px]">
          {/* 350px, not Figma's 320px: the substituted font is wider than
              TT Commons Pro and 320 pushed "Cosmetic Dentist" onto a 4th
              line. 350 reproduces the intended 3-line break. */}
          <h2 className="text-center text-[32px] font-bold leading-[0.94] tracking-[-0.64px] text-navy md:text-[42px] md:tracking-[-0.84px] min-[1360px]:w-[350px] min-[1360px]:shrink-0 min-[1360px]:text-left">
            How Compare Cosmetic Dentist can help you
          </h2>

          <div className="flex w-full flex-col items-center gap-9 lg:flex-row lg:items-start lg:justify-center lg:gap-[39px] min-[1360px]:w-auto min-[1360px]:flex-1 min-[1360px]:justify-end">
            {ITEMS.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-[18px] text-center"
              >
                <div className="flex size-[50px] shrink-0 items-center justify-center rounded-[10px] bg-teal-light">
                  <img src={item.icon} alt="" className={item.iconClass} />
                </div>
                <p className="text-[18px] leading-[1.16] tracking-[-0.36px] text-navy">
                  <span className="font-bold">{item.title}</span>
                  <br />
                  {item.lines[0]}
                  <br />
                  {item.lines[1]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
