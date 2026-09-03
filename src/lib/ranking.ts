/**
 * Weighted review scoring, per section 2.5 of the build plan.
 *
 * A Bayesian weighted rating pulls clinics with few reviews toward the global
 * average until they have earned enough reviews to stand on their own, so a
 * clinic with two five-star reviews cannot outrank one with hundreds:
 *
 *   score = (v / (v + m)) * R + (m / (v + m)) * C
 *
 *   R = the clinic's average rating
 *   v = the clinic's number of reviews
 *   m = minimum reviews to be "credible"
 *   C = the average rating across all clinics
 *
 * On top of that the plan applies a hard floor: clinics below MIN_REVIEWS are
 * listed but never allowed into the ranked top ten, so a thin-review clinic
 * never surfaces as a five-star result.
 */

/** Reviews needed before a clinic's own average carries full weight. */
export const CREDIBLE_REVIEWS = 20;

/** Below this, a clinic is listed but excluded from the ranked top slots. */
export const MIN_REVIEWS_FOR_TOP = 5;

export type ReviewSource = {
  /** Average rating, on the source's own scale (Google is 1-5). */
  rating: number;
  /** Total number of reviews behind that average. */
  count: number;
};

export type ReviewWeight = {
  /** Bayesian weighted score. */
  score: number;
  /** Combined review count across sources. */
  count: number;
  /** Blended raw average, for display next to the count. */
  average: number;
  /** False when the clinic is under the review floor for top placement. */
  eligibleForTop: boolean;
};

export function bayesianScore(
  { rating, count }: ReviewSource,
  globalAverage: number,
  credibleReviews = CREDIBLE_REVIEWS,
): number {
  if (count <= 0) return globalAverage;
  const weight = count / (count + credibleReviews);
  return weight * rating + (1 - weight) * globalAverage;
}

/**
 * Blends multiple sources by review volume, so a clinic with 300 Google and 5
 * Trustpilot reviews stays almost entirely Google-weighted (plan §2.5).
 */
export function blendSources(sources: ReviewSource[]): ReviewSource | null {
  const usable = sources.filter((s) => s && s.count > 0);
  if (usable.length === 0) return null;

  const count = usable.reduce((sum, s) => sum + s.count, 0);
  const rating =
    usable.reduce((sum, s) => sum + s.rating * s.count, 0) / count;
  return { rating, count };
}

export function computeReviewWeight(
  sources: ReviewSource[],
  globalAverage: number,
): ReviewWeight | null {
  const blended = blendSources(sources);
  if (!blended) return null;

  return {
    score: bayesianScore(blended, globalAverage),
    count: blended.count,
    average: blended.rating,
    eligibleForTop: blended.count >= MIN_REVIEWS_FOR_TOP,
  };
}

/** Global average rating across everything that has reviews (the C term). */
export function globalAverageRating(sources: ReviewSource[]): number {
  const usable = sources.filter((s) => s && s.count > 0);
  if (usable.length === 0) return 0;
  const total = usable.reduce((sum, s) => sum + s.rating * s.count, 0);
  const count = usable.reduce((sum, s) => sum + s.count, 0);
  return total / count;
}

/**
 * Orders by weighted score, but holds clinics under the review floor out of
 * the top positions regardless of how high their raw average is.
 */
export function rankByWeight<T>(
  items: T[],
  weightOf: (item: T) => ReviewWeight | null,
): T[] {
  const scored = items.map((item, index) => ({
    item,
    index,
    weight: weightOf(item),
  }));

  scored.sort((a, b) => {
    const aTop = a.weight?.eligibleForTop ?? false;
    const bTop = b.weight?.eligibleForTop ?? false;
    if (aTop !== bTop) return aTop ? -1 : 1;

    const aScore = a.weight?.score ?? -1;
    const bScore = b.weight?.score ?? -1;
    if (aScore !== bScore) return bScore - aScore;

    return a.index - b.index;
  });

  return scored.map((entry) => entry.item);
}
