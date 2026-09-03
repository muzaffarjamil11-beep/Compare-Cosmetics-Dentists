/**
 * The enrichment seam.
 *
 * The CQC register is the spine (clinic identity and location) but, as the
 * build plan sets out, it carries no reviews, no treatments and no pricing.
 * Those three arrive from separate sources:
 *
 *   reviews    Google Places API — average rating + review count per
 *              place_id, refreshed monthly (plan §2.4). Feeds the Bayesian
 *              weighted score in src/lib/ranking.ts.
 *   treatments Crawl each clinic's site, classify against the agreed
 *              taxonomy, sample-verify by hand (plan §2.6).
 *   pricing    Editorial — set per clinic in the backend, alongside the
 *              treatment tick boxes (plan §2.6).
 *
 * None of those pipelines is connected yet, so every lookup below returns
 * undefined and the UI renders those fields as "awaiting data" rather than
 * showing invented figures against real, named practices.
 *
 * To switch a source on, populate the corresponding map (from a generated
 * JSON file, a database, or a fetch) and the cards, the weighted ranking and
 * the treatment/price/rating filters all begin working with no component
 * changes — they already read through these functions.
 *
 * NOTE ON CQC RATINGS: the plan expects a CQC rating on each record, and the
 * CQC care-directory export and syndication API do both include one. The CSV
 * supplied for this build was the website search export, which omits that
 * column — so `cqcRating` is wired up here and will populate as soon as an
 * export containing it (or API access) is available.
 */
import reviewsJson from "@/data/reviews.json";
import type { ReviewSource } from "./ranking";

/**
 * Google ratings, keyed by CQC location ID, produced by
 * scripts/fetch-google-reviews.mjs. Empty until that script is run with a
 * Places API key. Only high-confidence (postcode-matched) results land here;
 * uncertain matches are held in review-matches-to-review.json for a human.
 */
type GoogleReview = {
  placeId: string;
  rating: number;
  count: number;
  googleName?: string;
  googleAddress?: string;
  fetchedAt?: string;
};

const GOOGLE_REVIEWS = reviewsJson as Record<string, GoogleReview>;

export type ClinicEnrichment = {
  /** Google Places, and Trustpilot where a business unit exists. */
  reviews?: ReviewSource[];
  /** CQC inspection rating, e.g. "Good" or "Outstanding". */
  cqcRating?: string;
  /** Treatment slugs from the agreed taxonomy. */
  treatments?: string[];
  /** Editorial pricing, in whole pounds. */
  pricing?: {
    consultation?: number;
    treatmentFrom?: number;
    financeAvailable?: boolean;
    examRequired?: boolean;
  };
};

/**
 * Keyed by CQC location ID. Empty until a pipeline fills it — see the module
 * comment for what feeds each field.
 */
const ENRICHMENT: Record<string, ClinicEnrichment> = {};

export function getEnrichment(locationId: string): ClinicEnrichment {
  const manual = ENRICHMENT[locationId] ?? {};
  const google = GOOGLE_REVIEWS[locationId];

  if (!google) return manual;

  // Google is the base source; anything already in ENRICHMENT (e.g. a
  // Trustpilot business unit) blends alongside it by review volume.
  return {
    ...manual,
    reviews: [
      { rating: google.rating, count: google.count },
      ...(manual.reviews ?? []),
    ],
  };
}

/** True once any Google rating has been fetched — drives the attribution. */
export function hasGoogleReviews(): boolean {
  return Object.keys(GOOGLE_REVIEWS).length > 0;
}

export function hasAnyEnrichment(): boolean {
  return Object.keys(ENRICHMENT).length > 0;
}

/** True once review data exists, which is what the ranking depends on. */
export function hasReviewData(): boolean {
  return (
    hasGoogleReviews() ||
    Object.values(ENRICHMENT).some((e) => (e.reviews?.length ?? 0) > 0)
  );
}

export function hasPricingData(): boolean {
  return Object.values(ENRICHMENT).some((e) => e.pricing !== undefined);
}

export function hasTreatmentData(): boolean {
  return Object.values(ENRICHMENT).some((e) => (e.treatments?.length ?? 0) > 0);
}
