import clinicsJson from "@/data/clinics.json";

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

const CLINICS = clinicsJson as Clinic[];

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

export type SearchResult = {
  clinics: Clinic[];
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
  page = 1,
  perPage = 9,
}: SearchOptions = {}): SearchResult {
  let results = CLINICS;
  let locationUnmatched = false;

  if (location) {
    const matched = results.filter((c) => matchesLocation(c, location));
    if (matched.length > 0) {
      results = matched;
    } else {
      locationUnmatched = true;
    }
  }

  if (region) {
    results = results.filter((c) => c.region === region);
  }

  if (service) {
    results = results.filter((c) => c.services.includes(service));
  }

  // Practices with a website and phone are the most useful to a visitor, so
  // surface those first. Beyond that the CQC export gives no ranking signal.
  const ordered = [...results].sort((a, b) => {
    const score = (c: Clinic) => (c.website ? 2 : 0) + (c.phone ? 1 : 0);
    return score(b) - score(a) || a.name.localeCompare(b.name);
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

/** Best-documented practices in a location, for the home page's top three. */
export function getTopClinics(location: string, count = 3): Clinic[] {
  return searchClinics({ location, perPage: count }).clinics;
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
