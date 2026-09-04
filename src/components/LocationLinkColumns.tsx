import Link from "next/link";
import type { RegionSummary } from "@/lib/clinics";

/**
 * Multiple columns of locations, one per region, each led by a descriptive
 * box carrying that region's real practice and town counts.
 *
 * Rendered inside an accordion panel, so it stays compact: a handful of towns
 * per column rather than the full list, with a link through to the whole
 * region. When `treatment` is passed the links carry it, so expanding
 * "Clear Aligners" gives clear-aligner links for each town.
 *
 * Presentational only — no data import — so it works inside client
 * components; the regions are passed down from the server page.
 */
export default function LocationLinkColumns({
  regions,
  treatment,
  townsPerColumn = 5,
}: {
  regions: RegionSummary[];
  treatment?: string;
  townsPerColumn?: number;
}) {
  const href = (params: Record<string, string>) => {
    const search = new URLSearchParams();
    if (treatment) search.set("treatment", treatment);
    for (const [key, value] of Object.entries(params)) search.set(key, value);
    return `/search?${search.toString()}`;
  };

  return (
    <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {regions.map((region) => (
        <div
          key={region.region}
          className="flex flex-col rounded-[12px] bg-primary-light/45 p-[14px]"
        >
          <h4 className="text-[15px] font-bold tracking-[-0.3px] text-navy">
            <Link
              href={href({ region: region.region })}
              className="hover:underline"
            >
              {treatment ? `${treatment} in ${region.region}` : region.region}
            </Link>
          </h4>
          <p className="mt-[3px] text-[12px] leading-[1.45] text-navy/60">
            {region.clinicCount.toLocaleString("en-GB")} practices across{" "}
            {region.townCount.toLocaleString("en-GB")} towns and cities.
          </p>

          <ul className="mt-[10px] flex flex-col gap-[5px] border-t border-navy/10 pt-[10px]">
            {region.towns.slice(0, townsPerColumn).map(({ town, count }) => (
              <li key={town}>
                <Link
                  href={href({ location: town })}
                  className="text-[13px] leading-[1.35] tracking-[-0.26px] text-primary hover:underline"
                >
                  {town}
                </Link>
                <span className="ml-1 text-[11px] text-navy/40">{count}</span>
              </li>
            ))}
          </ul>

          <Link
            href={href({ region: region.region })}
            className="mt-auto pt-[10px] text-[12px] font-bold text-primary hover:underline"
          >
            All of {region.region} &rsaquo;
          </Link>
        </div>
      ))}
    </div>
  );
}
