/**
 * Each card's body explains a part of how the ranking actually works, rather
 * than generic reassurance:
 *
 *   1. the weighted score itself           (src/lib/ranking.ts)
 *   2. where the practice list comes from  (plan §2.1, §2.3)
 *   3. how reviews are matched to a clinic (plan §2.3, §2.4)
 *
 * The three are kept to a similar length so the row stays balanced — an
 * earlier draft ran one card to seven lines against three for the others.
 */
const ITEMS = [
  {
    icon: "/images/icon-help-1.svg",
    iconClass: "size-[24px]",
    title: "Find top-rated clinics, fast",
    body: "Ranked on a weighted review score, not a raw average, so a few five-star reviews can't outrank hundreds.",
  },
  {
    icon: "/images/icon-help-2.svg",
    iconClass: "h-[24px] w-[20px]",
    title: "Clear costs, trusted information",
    body: "Every practice is drawn from the CQC register, refreshed regularly, with closed and duplicate listings removed.",
  },
  {
    icon: "/images/icon-help-3.svg",
    iconClass: "h-[22px] w-[22px]",
    title: "Simple, no-cost booking",
    body: "Reviews are matched to a practice by name and postcode, and any uncertain match is checked by a person first.",
  },
];

export default function HowWeHelp() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-10">
        <div className="flex flex-col items-center gap-12 md:gap-16">
          {/* Centred at every width. */}
          <h2 className="max-w-[290px] text-center text-[32px] font-bold leading-[0.94] tracking-[-0.64px] text-navy md:max-w-[450px] md:text-[42px] md:tracking-[-0.84px]">
            How Compare Cosmetic Dentist can help you
          </h2>

          <div className="flex w-full flex-col items-center gap-9 md:flex-row md:items-start md:justify-center md:gap-6 lg:gap-[39px]">
            {ITEMS.map((item) => (
              <div
                key={item.title}
                className="flex w-full flex-col items-center gap-[18px] text-center md:min-w-0 md:flex-1"
              >
                <div className="flex size-[50px] shrink-0 items-center justify-center rounded-[10px] bg-teal-light">
                  <img src={item.icon} alt="" className={item.iconClass} />
                </div>
                <p className="text-[16px] leading-[1.16] tracking-[-0.32px] text-navy lg:text-[18px] lg:tracking-[-0.36px]">
                  <span className="block font-bold">{item.title}</span>
                  <span className="mt-[4px] block leading-[1.45]">
                    {item.body}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
