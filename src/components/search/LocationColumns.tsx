import Link from "next/link";
import type { RegionSummary } from "@/lib/clinics";

/**
 * Full-width location browser: one column per region, each led by a
 * descriptive box giving that region's practice and town counts, then its
 * best-covered towns.
 *
 * Regions come from the CQC register, and every count is real, so each column
 * says something specific rather than repeating the same boilerplate.
 */
export default function LocationColumns({
  regions,
  totalTowns,
}: {
  regions: RegionSummary[];
  totalTowns: number;
}) {
  return (
    <section>
      <h2 className="text-[20px] font-bold tracking-[-0.44px] text-navy sm:text-[22px]">
        Dentists by location
      </h2>
      <p className="mt-[8px] max-w-[760px] text-[15px] leading-[1.5] text-navy/70">
        Every CQC-registered dental practice in England, grouped by region.
        Browse {totalTowns.toLocaleString("en-GB")} towns and cities, or open a
        region to compare the practices there.
      </p>

      <div className="mt-[22px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {regions.map((region) => (
          <div
            key={region.region}
            className="flex flex-col rounded-[14px] bg-white p-[16px]"
          >
            {/* Descriptive box heading the column. */}
            <h3 className="text-[16px] font-bold tracking-[-0.32px] text-navy sm:text-[17px]">
              <Link
                href={`/search?region=${encodeURIComponent(region.region)}`}
                className="hover:underline"
              >
                {region.region}
              </Link>
            </h3>
            <p className="mt-[4px] text-[13px] leading-[1.45] text-navy/60">
              {region.clinicCount.toLocaleString("en-GB")} practices across{" "}
              {region.townCount.toLocaleString("en-GB")} towns and cities.
            </p>

            <ul className="mt-[12px] flex flex-col gap-[6px] border-t border-navy/10 pt-[12px]">
              {region.towns.map(({ town, count }) => (
                <li key={town}>
                  <Link
                    href={`/search?location=${encodeURIComponent(town)}`}
                    className="text-[14px] leading-[1.4] tracking-[-0.28px] text-primary hover:underline"
                  >
                    {town}
                  </Link>
                  <span className="ml-1 text-[12px] text-navy/40">{count}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/search?region=${encodeURIComponent(region.region)}`}
              className="mt-auto pt-[12px] text-[13px] font-bold text-primary hover:underline"
            >
              All of {region.region} &rsaquo;
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-[18px]">
        <Link
          href="/locations"
          className="inline-flex items-center rounded-full border border-navy/20 px-[14px] py-[6px] text-[13px] tracking-[-0.26px] text-navy transition-colors hover:bg-primary-light"
        >
          Browse all {totalTowns.toLocaleString("en-GB")} locations &rsaquo;
        </Link>
      </div>
    </section>
  );
}
