import type { Metadata } from "next";
import Link from "next/link";

import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FaqAccordion from "@/components/search/FaqAccordion";
import FilterSidebar from "@/components/search/FilterSidebar";
import LinkColumns from "@/components/search/LinkColumns";
import Pagination from "@/components/search/Pagination";
import PracticeCard from "@/components/search/PracticeCard";
import SearchTopBar from "@/components/search/SearchTopBar";
import {
  FAQS,
  POPULAR_LOCATIONS,
  POPULAR_SEARCHES,
  PRACTICES,
  SECTION_TAGS,
} from "@/lib/search-data";

export const metadata: Metadata = {
  title: "Clear Aligners near me in Leeds | Compare Cosmetic Dentist",
  description:
    "Compare top-rated clear aligner clinics in Leeds. See consultation costs, finance options and verified patient reviews before you book.",
};

const TREATMENT = "Clear Aligners";
const LOCATION = "Leeds";

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: TREATMENT, href: "#" },
  { label: LOCATION, href: "#" },
];

/** Content column is 1146px wide, centred in the 1440px frame. */
const CONTAINER = "mx-auto w-full max-w-[1146px]";

export default function SearchPage() {
  const featured = PRACTICES.filter((p) => p.featured);
  const rest = PRACTICES.filter((p) => !p.featured);

  return (
    <>
      <Header />
      <SearchTopBar />

      <main className="flex-1 bg-surface pb-16">
        <div className="px-4 md:px-10">
          <div className={CONTAINER}>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="pt-[18px]">
              <ol className="flex flex-wrap items-center gap-x-[6px] gap-y-1 text-[13px] tracking-[-0.26px] text-navy/70">
                {BREADCRUMBS.map((crumb) => (
                  <li key={crumb.label} className="flex items-center gap-[6px]">
                    <Link href={crumb.href} className="hover:underline">
                      {crumb.label}
                    </Link>
                    <span aria-hidden="true">&rsaquo;</span>
                  </li>
                ))}
                <li aria-current="page">{`${TREATMENT} near ${LOCATION}`}</li>
              </ol>
            </nav>

            <h1 className="mt-[14px] text-[22px] font-bold tracking-[-0.52px] text-navy sm:text-[26px]">
              <span className="underline">{TREATMENT}</span> near me in{" "}
              <span className="underline">{LOCATION}</span>
            </h1>

            {/* Intro / read-more bar */}
            <div className="mt-[14px] flex flex-col gap-3 rounded-[12px] bg-primary-light px-[15px] py-[17px] sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <p className="text-[14px] leading-[1.4] tracking-[-0.28px] text-navy sm:text-[16px]">
                Find {TREATMENT.toLowerCase()} in your area with Compare
                Cosmetic Dentist. Compare consultation costs, finance options
                and verified reviews before you book.
              </p>
              <button
                type="button"
                className="flex shrink-0 cursor-pointer items-center gap-2 text-[14px] font-bold tracking-[-0.28px] text-navy transition-opacity hover:opacity-70 sm:text-[16px]"
              >
                Read more
                <img
                  src="/images/icon-chevron-right.svg"
                  alt=""
                  className="h-[8px] w-[14px] -rotate-90"
                />
              </button>
            </div>

            {/* Sidebar + results */}
            <div className="mt-[26px] flex flex-col gap-8 lg:flex-row">
              <FilterSidebar />

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-[16px]">
                  {featured.map((practice) => (
                    <PracticeCard key={practice.rank} practice={practice} />
                  ))}
                </div>

                <div className="mt-[20px] flex flex-col gap-[20px]">
                  {rest.map((practice) => (
                    <PracticeCard key={practice.rank} practice={practice} />
                  ))}
                </div>

                <div className="mt-[36px]">
                  <Pagination />
                </div>
              </div>
            </div>

            {/* Lower content sits in the results column, per the design */}
            <div className="mt-[56px] flex flex-col gap-[40px] lg:pl-[352px]">
              <FaqAccordion faqs={FAQS} />

              <section className="rounded-[12px] bg-white px-[24px] py-[22px]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-[20px] font-bold tracking-[-0.44px] text-navy sm:text-[22px]">
                    Popular in {LOCATION}
                  </h2>
                  <Button
                    variant="primary"
                    className="h-[42px] w-full px-[20px] text-[16px] tracking-[-0.32px] sm:w-auto"
                  >
                    Show list
                  </Button>
                </div>
                <div className="mt-[18px] border-t border-navy/10 pt-[18px]">
                  <ul className="flex flex-wrap gap-[8px]">
                    {SECTION_TAGS.map((tag) => (
                      <li key={tag}>
                        <a
                          href="#"
                          className="inline-flex items-center rounded-full border border-navy/25 px-[12px] py-[5px] text-[12px] tracking-[-0.24px] text-navy transition-colors hover:bg-primary-light"
                        >
                          {tag}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <LinkColumns title="Popular Locations" items={POPULAR_LOCATIONS} />
              <LinkColumns title="Popular searches" items={POPULAR_SEARCHES} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
