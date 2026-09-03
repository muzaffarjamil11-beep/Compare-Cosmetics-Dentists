/**
 * Attaches Google ratings and review counts to the CQC clinic list.
 *
 * Google reviews are NOT an open dataset. They come from the Google Maps
 * Platform Places API, which is a paid, licensed service, and scraping Google
 * Maps or Search results breaches their Terms of Service. This script uses the
 * official API, which means you need a key with billing enabled:
 *
 *   1. console.cloud.google.com -> create/select a project
 *   2. Enable "Places API (New)"
 *   3. Create an API key, restrict it to Places API
 *   4. set GOOGLE_MAPS_API_KEY in your environment
 *
 * Usage:
 *   node scripts/fetch-google-reviews.mjs --limit 25 --dry-run   # cost-free check
 *   node scripts/fetch-google-reviews.mjs --limit 200            # first paid batch
 *   node scripts/fetch-google-reviews.mjs                        # everything
 *   node scripts/fetch-google-reviews.mjs --refresh              # ratings only
 *
 * Cost shape (plan §2.4): discovery is the expensive step and runs ONCE per
 * clinic — the place_id is then cached in src/data/place-ids.json forever, and
 * later runs only refresh ratings. Check current Places API pricing before a
 * full run; --limit exists so you can size it on a small batch first.
 *
 * Match confidence (plan §2.3): a result only counts as high confidence when
 * the postcode matches. Anything else is written to
 * src/data/review-matches-to-review.json for a human to confirm, because the
 * wrong reviews on the wrong clinic is both a quality and a legal problem.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const API = "https://places.googleapis.com/v1/places:searchText";
const KEY = process.env.GOOGLE_MAPS_API_KEY;

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const value = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};

const DRY_RUN = flag("dry-run");
const REFRESH_ONLY = flag("refresh");
const LIMIT = Number(value("limit") ?? Infinity);

const CLINICS = resolve("src/data/clinics.json");
const PLACE_IDS = resolve("src/data/place-ids.json");
const REVIEWS = resolve("src/data/reviews.json");
const NEEDS_REVIEW = resolve("src/data/review-matches-to-review.json");

const readJson = (path, fallback) =>
  existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : fallback;

const clinics = readJson(CLINICS, []);
const placeIds = readJson(PLACE_IDS, {});
const reviews = readJson(REVIEWS, {});
const needsReview = readJson(NEEDS_REVIEW, {});

if (!clinics.length) {
  console.error("No clinics found. Run scripts/build-clinics.mjs first.");
  process.exit(1);
}
if (!KEY && !DRY_RUN) {
  console.error(
    "GOOGLE_MAPS_API_KEY is not set. Add a Places API key, or pass --dry-run to preview the work without calling the API.",
  );
  process.exit(1);
}

const normalisePostcode = (v) => (v ?? "").toUpperCase().replace(/\s+/g, "");

async function findPlace(clinic) {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": KEY,
      // Only the fields we need — the field mask drives the billing tier.
      "X-Goog-FieldMask":
        "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount",
    },
    body: JSON.stringify({
      textQuery: `${clinic.name}, ${clinic.postcode}`,
      maxResultCount: 1,
      regionCode: "GB",
    }),
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${await response.text()}`);
  }
  const data = await response.json();
  return data.places?.[0] ?? null;
}

const targets = clinics
  .filter((c) => (REFRESH_ONLY ? placeIds[c.id] : !reviews[c.id]))
  .slice(0, LIMIT === Infinity ? undefined : LIMIT);

console.log(`clinics:        ${clinics.length}`);
console.log(`already rated:  ${Object.keys(reviews).length}`);
console.log(`cached place ids: ${Object.keys(placeIds).length}`);
console.log(`this run:       ${targets.length}${DRY_RUN ? " (dry run, no API calls)" : ""}`);

if (DRY_RUN) {
  for (const clinic of targets.slice(0, 10)) {
    console.log(`  would query: "${clinic.name}, ${clinic.postcode}"`);
  }
  console.log(
    "\nDry run only. Set GOOGLE_MAPS_API_KEY and drop --dry-run to fetch.",
  );
  process.exit(0);
}

let matched = 0;
let flagged = 0;
let failed = 0;

for (const [index, clinic] of targets.entries()) {
  try {
    const place = await findPlace(clinic);

    if (!place) {
      failed++;
      continue;
    }

    placeIds[clinic.id] = place.id;

    const postcodeMatches = normalisePostcode(place.formattedAddress).includes(
      normalisePostcode(clinic.postcode),
    );

    // Nothing to show without both a rating and a count.
    if (typeof place.rating !== "number" || !place.userRatingCount) {
      failed++;
      continue;
    }

    const record = {
      placeId: place.id,
      rating: place.rating,
      count: place.userRatingCount,
      googleName: place.displayName?.text ?? "",
      googleAddress: place.formattedAddress ?? "",
      fetchedAt: new Date().toISOString(),
    };

    if (postcodeMatches) {
      reviews[clinic.id] = record;
      matched++;
    } else {
      // Low confidence — hold it back for a human rather than showing it.
      needsReview[clinic.id] = { ...record, cqcName: clinic.name, cqcPostcode: clinic.postcode };
      flagged++;
    }
  } catch (error) {
    failed++;
    console.error(`  ${clinic.name}: ${error.message}`);
  }

  if ((index + 1) % 25 === 0) {
    console.log(`  ${index + 1}/${targets.length}…`);
    writeFileSync(PLACE_IDS, JSON.stringify(placeIds, null, 0));
    writeFileSync(REVIEWS, JSON.stringify(reviews, null, 0));
    writeFileSync(NEEDS_REVIEW, JSON.stringify(needsReview, null, 2));
  }

  // Stay well inside per-minute quotas.
  await new Promise((r) => setTimeout(r, 60));
}

writeFileSync(PLACE_IDS, JSON.stringify(placeIds, null, 0));
writeFileSync(REVIEWS, JSON.stringify(reviews, null, 0));
writeFileSync(NEEDS_REVIEW, JSON.stringify(needsReview, null, 2));

console.log("");
console.log(`high confidence: ${matched} (written to reviews.json)`);
console.log(`needs a human:   ${flagged} (postcode mismatch)`);
console.log(`no result:       ${failed}`);
console.log(`total rated:     ${Object.keys(reviews).length}`);
