import { hasReviewData } from "@/lib/enrichment";
import { CREDIBLE_REVIEWS, MIN_REVIEWS_FOR_TOP } from "@/lib/ranking";

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
 * The heading is centred at every width, with the ranking explanation beneath
 * it and the three items in a row below that.
 *
 * The explanation describes the weighted score implemented in
 * src/lib/ranking.ts, and reads the live thresholds from there so the copy
 * cannot drift from the code. The closing line changes depending on whether
 * review data is actually connected yet, so it never overstates what the
 * ranking is currently using.
 */
export default function HowWeHelp() {
  const reviewsConnected = hasReviewData();

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-10">
        <div className="flex flex-col items-center gap-12 md:gap-16">
          <div className="flex flex-col items-center gap-[18px]">
            <h2 className="max-w-[290px] text-center text-[32px] font-bold leading-[0.94] tracking-[-0.64px] text-navy md:max-w-[640px] md:text-[42px] md:tracking-[-0.84px]">
              How Compare Cosmetic Dentist can help you
            </h2>

            <div className="max-w-[760px] text-center">
              <p className="text-[15px] leading-[1.6] text-navy/75 sm:text-[17px]">
                We rank practices on a weighted review score rather than a raw
                star average, so a clinic with a couple of five-star reviews
                cannot outrank one with hundreds. Ratings backed by fewer than{" "}
                {CREDIBLE_REVIEWS} reviews are pulled toward the overall
                average until a practice has earned enough to stand on its own,
                and any practice with fewer than {MIN_REVIEWS_FOR_TOP} reviews
                is listed but held out of the top positions.
              </p>
              <p className="mt-[10px] text-[14px] leading-[1.6] text-navy/55 sm:text-[15px]">
                {reviewsConnected
                  ? "Practice records come from the Care Quality Commission register; ratings and review counts come from Google."
                  : "Practice records come from the Care Quality Commission register. Review data is still being connected — until then practices are ordered by how complete their public record is."}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-9 md:flex-row md:items-start md:justify-center md:gap-6 lg:gap-[39px]">
            {ITEMS.map((item) => (
              <div
                key={item.title}
                className="flex w-full flex-col items-center gap-[18px] text-center md:min-w-0 md:flex-1"
              >
                <div className="flex size-[50px] shrink-0 items-center justify-center rounded-[10px] bg-teal-light">
                  <img src={item.icon} alt="" className={item.iconClass} />
                </div>
                {/* The copy only carries Figma's hard line breaks at the width
                    they were drawn for; below that the two spans sit inline
                    and wrap to whatever the column allows. */}
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
