import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FaqAccordion from "@/components/search/FaqAccordion";
import FilterSidebar from "@/components/search/FilterSidebar";
import LinkColumns from "@/components/search/LinkColumns";
import Pagination from "@/components/search/Pagination";
import PracticeCard from "@/components/search/PracticeCard";
import SearchTopBar from "@/components/search/SearchTopBar";
import {
  getPopularLocations,
  getPopularSearches,
  getRegions,
  searchClinics,
} from "@/lib/clinics";
import { FAQS, SECTION_TAGS, TREATMENTS } from "@/lib/search-data";

export const metadata: Metadata = {
  title: "Find a CQC-registered dentist near you | Compare Cosmetic Dentist",
  description:
    "Search 12,268 CQC-registered dental practices across England by town and region. See addresses, phone numbers, websites and published CQC reports.",
};

const CONTAINER = "mx-auto w-full max-w-[1146px]";
const PER_PAGE = 9;

type SearchParams = Promise<{
  treatment?: string;
  location?: string;
  region?: string;
  page?: string;
}>;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const treatment = params.treatment?.trim() ?? "";
  const location = params.location?.trim() ?? "";
  const region = params.region?.trim() ?? "";
  const page = Number.parseInt(params.page ?? "1", 10) || 1;

  const results = searchClinics({
    location,
    region,
    page,
    perPage: PER_PAGE,
  });

  const buildHref = (nextPage: number) => {
    const next = new URLSearchParams();
    if (treatment) next.set("treatment", treatment);
    if (location) next.set("location", location);
    if (region) next.set("region", region);
    if (nextPage > 1) next.set("page", String(nextPage));
    const qs = next.toString();
    return qs ? `/search?${qs}` : "/search";
  };

  const heading = treatment
    ? `${treatment} near me${location ? ` in ${location}` : ""}`
    : location
      ? `Dentists in ${location}`
      : "CQC-registered dentists";

  const [featured, ...compact] = results.clinics;

  return (
    <>
      <Header />
      <SearchTopBar treatment={treatment} location={location} />

      <main className="flex-1 bg-surface pb-16">
        <div className="px-4 md:px-10">
          <div className={CONTAINER}>
            <nav aria-label="Breadcrumb" className="pt-[18px]">
              <ol className="flex flex-wrap items-center gap-x-[6px] gap-y-1 text-[13px] tracking-[-0.26px] text-navy/70">
                <li className="flex items-center gap-[6px]">
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                  <span aria-hidden="true">&rsaquo;</span>
                </li>
                {treatment && (
                  <li className="flex items-center gap-[6px]">
                    <span>{treatment}</span>
                    <span aria-hidden="true">&rsaquo;</span>
                  </li>
                )}
                <li aria-current="page">{location || "All locations"}</li>
              </ol>
            </nav>

            <h1 className="mt-[14px] text-[22px] font-bold tracking-[-0.52px] text-navy sm:text-[26px]">
              {treatment && <span className="underline">{treatment}</span>}
              {treatment ? " near me" : "CQC-registered dentists"}
              {location && (
                <>
                  {" in "}
                  <span className="underline">{location}</span>
                </>
              )}
            </h1>

            <div className="mt-[14px] flex flex-col gap-3 rounded-[12px] bg-primary-light px-[15px] py-[17px] sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <p className="text-[14px] leading-[1.4] tracking-[-0.28px] text-navy sm:text-[16px]">
                {results.total.toLocaleString("en-GB")} CQC-registered dental
                practices{location ? ` matching ${location}` : ""}
                {region ? ` in ${region}` : ""}. Details come from the Care
                Quality Commission register — addresses, phone numbers,
                websites and published inspection reports.
              </p>
            </div>

            {results.locationUnmatched && (
              <p className="mt-4 rounded-[12px] bg-white px-[15px] py-[14px] text-[15px] text-navy">
                No practices matched <strong>{location}</strong>, so every
                registered practice is shown. Try a nearby town from the
                location list.
              </p>
            )}

            <div className="mt-[26px] flex flex-col gap-8 lg:flex-row">
              <Suspense
                fallback={<div className="w-full lg:w-[320px] lg:shrink-0" />}
              >
                <FilterSidebar
                  treatments={TREATMENTS}
                  regions={getRegions()}
                  resultCount={results.total}
                />
              </Suspense>

              <div className="min-w-0 flex-1">
                {results.clinics.length === 0 ? (
                  <p className="rounded-[25px] bg-white px-[19px] py-[24px] text-[16px] text-navy">
                    No practices found for this combination. Try clearing the
                    region filter.
                  </p>
                ) : (
                  <>
                    <div className="flex flex-col gap-[16px]">
                      <PracticeCard clinic={featured} featured />
                    </div>
                    <div className="mt-[20px] flex flex-col gap-[20px]">
                      {compact.map((clinic) => (
                        <PracticeCard key={clinic.id} clinic={clinic} />
                      ))}
                    </div>
                  </>
                )}

                <div className="mt-[36px]">
                  <Pagination
                    page={results.page}
                    totalPages={results.totalPages}
                    buildHref={buildHref}
                  />
                </div>
              </div>
            </div>

            <div className="mt-[56px] flex flex-col gap-[40px] lg:pl-[352px]">
              <FaqAccordion faqs={FAQS} />

              <section className="rounded-[12px] bg-white px-[24px] py-[22px]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-[20px] font-bold tracking-[-0.44px] text-navy sm:text-[22px]">
                    Browse by treatment
                  </h2>
                </div>
                <div className="mt-[18px] border-t border-navy/10 pt-[18px]">
                  <ul className="flex flex-wrap gap-[8px]">
                    {[...TREATMENTS, ...SECTION_TAGS].map((tag) => (
                      <li key={tag}>
                        <Link
                          href={`/search?treatment=${encodeURIComponent(tag)}${
                            location
                              ? `&location=${encodeURIComponent(location)}`
                              : ""
                          }`}
                          className="inline-flex items-center rounded-full border border-navy/25 px-[12px] py-[5px] text-[12px] tracking-[-0.24px] text-navy transition-colors hover:bg-primary-light"
                        >
                          {tag}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <LinkColumns
                title="Popular Locations"
                items={getPopularLocations(27).map((label) => {
                  const town = label.replace(/^Dentists in /, "");
                  return {
                    label,
                    href: `/search?location=${encodeURIComponent(town)}`,
                  };
                })}
              />
              <LinkColumns
                title="Popular searches"
                items={getPopularSearches(TREATMENTS, 27).map((label) => {
                  const [t, l] = label.split(" in ");
                  return {
                    label,
                    href: `/search?treatment=${encodeURIComponent(
                      t,
                    )}&location=${encodeURIComponent(l ?? "")}`,
                  };
                })}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
