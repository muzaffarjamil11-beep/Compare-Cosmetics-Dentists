import clinicsJson from "@/data/clinics.json";
import { getEnrichment } from "./enrichment";
import {
  computeReviewWeight,
  globalAverageRating,
  rankByWeight,
  type ReviewWeight,
} from "./ranking";

/**
 * Access layer over the CQC "Dentists" export (12,268 registered practices).
 *
 * WHAT THE CQC EXPORT CONTAINS: name, address, town, county, postcode, phone,
 * website, local authority, region, provider name, service types and a link to
 * the practice's CQC report page.
 *
 * WHAT IT DOES NOT CONTAIN: there is no rating column (the export's only
 * score-like field, "Relevance score", is empty on all 12,268 rows), no
 * pricing of any kind, and no per-clinic treatment list — "Specialisms/
 * services" describes patient categories ("Services for everyone", "Caring
 * for children (0 - 18yrs)"), not dental treatments.
 *
 * So ratings, prices and treatment-level filtering cannot be derived from this
 * file. Rather than invent figures against real named practices, the UI shows
 * those as unavailable. Treatment is carried through the search as context
 * (heading, breadcrumb, saved search) but does not narrow the clinic list.
 *
 * This module is imported only by Server Components, so the dataset stays on
 * the server and is never shipped to the browser.
 */

export type Clinic = {
  id: string;
  name: string;
  address: string;
  town: string;
  county: string;
  postcode: string;
  phone: string;
  website: string;
  authority: string;
  region: string;
  cqcUrl: string;
  provider: string;
  services: string[];
};

/** A clinic with whatever enrichment is currently available attached. */
export type RankedClinic = Clinic & {
  reviewWeight: ReviewWeight | null;
  cqcRating?: string;
  treatments?: string[];
  pricing?: {
    consultation?: number;
    treatmentFrom?: number;
    financeAvailable?: boolean;
    examRequired?: boolean;
  };
};

const CLINICS = clinicsJson as Clinic[];

/** The C term in the Bayesian score — the average across all reviewed clinics. */
const GLOBAL_AVERAGE = globalAverageRating(
  CLINICS.flatMap((c) => getEnrichment(c.id).reviews ?? []),
);

function withEnrichment(clinic: Clinic): RankedClinic {
  const extra = getEnrichment(clinic.id);
  return {
    ...clinic,
    reviewWeight: computeReviewWeight(extra.reviews ?? [], GLOBAL_AVERAGE),
    cqcRating: extra.cqcRating,
    treatments: extra.treatments,
    pricing: extra.pricing,
  };
}

export function getAllClinics(): Clinic[] {
  return CLINICS;
}

/** Full address line for display, ending in the postcode. */
export function formatAddress(clinic: Clinic): string {
  return [clinic.address, clinic.town, clinic.postcode]
    .filter(Boolean)
    .join(", ");
}

const townCounts = (() => {
  const counts = new Map<string, number>();
  for (const clinic of CLINICS) {
    counts.set(clinic.town, (counts.get(clinic.town) ?? 0) + 1);
  }
  return counts;
})();

/** Towns ordered by how many registered practices they have. */
export function getTownsByCount(): { town: string; count: number }[] {
  return [...townCounts.entries()]
    .map(([town, count]) => ({ town, count }))
    .sort((a, b) => b.count - a.count || a.town.localeCompare(b.town));
}

/**
 * Location options for the search dropdowns. 1,097 towns is too many for a
 * usable select, so this keeps the best-covered ones and sorts them A-Z.
 */
export function getLocationOptions(limit = 150): string[] {
  return getTownsByCount()
    .slice(0, limit)
    .map((entry) => entry.town)
    .sort((a, b) => a.localeCompare(b));
}

export function getRegions(): string[] {
  return [...new Set(CLINICS.map((c) => c.region).filter(Boolean))].sort();
}

/** Every town with at least one registered practice, for the locations hub. */
export function getAllTowns(): { town: string; count: number }[] {
  return getTownsByCount().sort((a, b) => a.town.localeCompare(b.town));
}

const providerCounts = (() => {
  const counts = new Map<string, number>();
  for (const clinic of CLINICS) {
    const provider = clinic.provider.trim();
    if (provider) counts.set(provider, (counts.get(provider) ?? 0) + 1);
  }
  return counts;
})();

/**
 * CQC provider records, which is how the groups and chains show up — a
 * provider running many locations is a group. `minClinics` filters out the
 * thousands of single-practice providers, which are usually one dentist's
 * own name rather than a brand worth a page.
 */
export function getProviders(
  minClinics = 1,
): { provider: string; count: number }[] {
  return [...providerCounts.entries()]
    .filter(([, count]) => count >= minClinics)
    .map(([provider, count]) => ({ provider, count }))
    .sort((a, b) => b.count - a.count || a.provider.localeCompare(b.provider));
}

export type SearchResult = {
  clinics: RankedClinic[];
  total: number;
  page: number;
  totalPages: number;
  /** True when the requested location matched no town or region. */
  locationUnmatched: boolean;
};

export type SearchOptions = {
  location?: string;
  region?: string;
  /** Restrict to clinics whose CQC "Service types" include this value. */
  service?: string;
  /** CQC provider name, so a group's practices can be listed together. */
  provider?: string;
  /** Taxonomy treatment; applies once treatment enrichment exists. */
  treatment?: string;
  /** Max consultation price in pounds; applies once pricing exists. */
  maxPrice?: number;
  /** Minimum weighted review score; applies once review data exists. */
  minRating?: number;
  page?: number;
  perPage?: number;
};

function matchesLocation(clinic: Clinic, location: string): boolean {
  const needle = location.toLowerCase();
  return (
    clinic.town.toLowerCase() === needle ||
    clinic.authority.toLowerCase() === needle ||
    clinic.county.toLowerCase() === needle ||
    clinic.region.toLowerCase() === needle ||
    clinic.postcode.toLowerCase().startsWith(needle)
  );
}

export function searchClinics({
  location,
  region,
  service,
  provider,
  treatment,
  maxPrice,
  minRating,
  page = 1,
  perPage = 9,
}: SearchOptions = {}): SearchResult {
  let base = CLINICS;
  let locationUnmatched = false;

  if (location) {
    const matched = base.filter((c) => matchesLocation(c, location));
    if (matched.length > 0) {
      base = matched;
    } else {
      locationUnmatched = true;
    }
  }

  if (region) {
    base = base.filter((c) => c.region === region);
  }

  if (service) {
    base = base.filter((c) => c.services.includes(service));
  }

  if (provider) {
    const needle = provider.toLowerCase();
    base = base.filter((c) => c.provider.toLowerCase() === needle);
  }

  let results = base.map(withEnrichment);

  // The next three filters are no-ops until the matching enrichment source is
  // connected, so an unfilled field never silently removes every clinic.
  if (treatment) {
    results = results.filter(
      (c) => !c.treatments || c.treatments.includes(treatment),
    );
  }

  if (typeof maxPrice === "number") {
    results = results.filter((c) => {
      const price = c.pricing?.consultation;
      return price === undefined || price <= maxPrice;
    });
  }

  if (typeof minRating === "number") {
    results = results.filter(
      (c) => !c.reviewWeight || c.reviewWeight.score >= minRating,
    );
  }

  // Rank by weighted review score where reviews exist. With no review data the
  // scores tie, so the fallback keeps the best-documented practices first.
  const ordered = rankByWeight(results, (c) => c.reviewWeight).sort((a, b) => {
    const aScore = a.reviewWeight?.score ?? -1;
    const bScore = b.reviewWeight?.score ?? -1;
    if (aScore !== bScore) return 0;
    const docs = (c: Clinic) => (c.website ? 2 : 0) + (c.phone ? 1 : 0);
    return docs(b) - docs(a) || a.name.localeCompare(b.name);
  });

  const total = ordered.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;

  return {
    clinics: ordered.slice(start, start + perPage),
    total,
    page: safePage,
    totalPages,
    locationUnmatched,
  };
}

/** Top-ranked practices in a location, for the home page's top three. */
export function getTopClinics(location: string, count = 3): RankedClinic[] {
  return searchClinics({ location, perPage: count }).clinics;
}

export type RegionSummary = {
  region: string;
  clinicCount: number;
  townCount: number;
  towns: { town: string; count: number }[];
};

/**
 * Locations grouped by region, for the full-width location columns. Each
 * region carries its own practice and town counts so the column can lead with
 * a descriptive box rather than a bare list of links.
 */
export function getRegionSummaries(townsPerRegion = 10): RegionSummary[] {
  const byRegion = new Map<string, Map<string, number>>();

  for (const clinic of CLINICS) {
    if (!clinic.region) continue;
    const towns = byRegion.get(clinic.region) ?? new Map<string, number>();
    towns.set(clinic.town, (towns.get(clinic.town) ?? 0) + 1);
    byRegion.set(clinic.region, towns);
  }

  return [...byRegion.entries()]
    .map(([region, towns]) => {
      const ordered = [...towns.entries()]
        .map(([town, count]) => ({ town, count }))
        .sort((a, b) => b.count - a.count || a.town.localeCompare(b.town));

      return {
        region,
        clinicCount: ordered.reduce((sum, t) => sum + t.count, 0),
        townCount: ordered.length,
        towns: ordered.slice(0, townsPerRegion),
      };
    })
    .sort((a, b) => b.clinicCount - a.clinicCount);
}

/** "Dentists in <town>" links, generated from real practice counts. */
export function getPopularLocations(limit = 27): string[] {
  return getTownsByCount()
    .slice(0, limit)
    .map((entry) => `Dentists in ${entry.town}`);
}

/**
 * Search-term suggestions built by pairing the site's treatment taxonomy with
 * the best-covered towns. These are navigational suggestions, not claims that
 * a given practice offers a given treatment.
 */
export function getPopularSearches(treatments: string[], limit = 27): string[] {
  const towns = getTownsByCount()
    .slice(0, Math.ceil(limit / treatments.length) + 1)
    .map((entry) => entry.town);

  const searches: string[] = [];
  for (const town of towns) {
    for (const treatment of treatments) {
      searches.push(`${treatment} in ${town}`);
      if (searches.length >= limit) return searches;
    }
  }
  return searches;
}
