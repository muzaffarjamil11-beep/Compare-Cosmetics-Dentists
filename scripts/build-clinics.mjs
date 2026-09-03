/**
 * Converts the CQC "Dentists" CSV export into a compact JSON dataset the app
 * can consume server-side.
 *
 *   node scripts/build-clinics.mjs <path-to-data.csv>
 *
 * Only the columns the CQC export actually populates are carried across.
 * Notably the export contains NO rating, pricing or per-clinic treatment
 * columns, so none are emitted here — see README notes in src/lib/clinics.ts.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const input = process.argv[2] ?? resolve(process.env.USERPROFILE ?? "", "Downloads/data.csv");
const output = resolve("src/data/clinics.json");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }
    if (char === '"') inQuotes = true;
    else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") field += char;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const raw = readFileSync(input, "utf8");
// The export starts with a human-readable preamble line before the header.
const headerStart = raw.indexOf("\nName,");
const rows = parseCsv(headerStart === -1 ? raw : raw.slice(headerStart + 1));
const header = rows[0].map((h) => h.trim());
const col = (name) => header.indexOf(name);

const IDX = {
  name: col("Name"),
  address1: col("Address 1"),
  address2: col("Address 2"),
  town: col("Town/City"),
  county: col("County"),
  postcode: col("Postcode"),
  phone: col("Phone number"),
  website: col("Website"),
  authority: col("Local authority"),
  region: col("Region"),
  url: col("URL"),
  serviceTypes: col("Service types"),
  provider: col("Provider name"),
  published: col("Report publication date"),
  locationId: col("CQC Location ID (for office use only)"),
};

const clean = (v) => (v ?? "").trim();

const seenIds = new Set();
const parsed = [];

for (const row of rows.slice(1)) {
  const name = clean(row[IDX.name]);
  const id = clean(row[IDX.locationId]);
  if (!name || !id || seenIds.has(id)) continue;
  seenIds.add(id);

  const town = clean(row[IDX.town]);
  if (!town) continue;

  // "Dentist,Doctors/GPs" style lists, de-duplicated.
  const services = [
    ...new Set(
      clean(row[IDX.serviceTypes])
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    ),
  ];

  parsed.push({
    id,
    name,
    address: [clean(row[IDX.address1]), clean(row[IDX.address2])]
      .filter(Boolean)
      .join(", "),
    town,
    county: clean(row[IDX.county]),
    postcode: clean(row[IDX.postcode]),
    phone: clean(row[IDX.phone]),
    website: clean(row[IDX.website]),
    authority: clean(row[IDX.authority]),
    region: clean(row[IDX.region]),
    cqcUrl: clean(row[IDX.url]),
    provider: clean(row[IDX.provider]),
    services,
    published: clean(row[IDX.published]),
  });
}

/**
 * Collapse duplicates, per plan §2.3: the same practice appears more than
 * once through re-registration, rebrand, or a provider/location split. A CQC
 * location ID is unique per registration so it never catches these — the
 * match has to be on name plus postcode.
 *
 * Of each group we keep the most recently published record, since older
 * registrations are the superseded ones, breaking ties on how complete the
 * contact details are.
 */
const normalise = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
const completeness = (c) => (c.website ? 2 : 0) + (c.phone ? 1 : 0);

const groups = new Map();
for (const clinic of parsed) {
  const key = `${normalise(clinic.name)}|${normalise(clinic.postcode)}`;
  const existing = groups.get(key);
  if (!existing) {
    groups.set(key, clinic);
    continue;
  }
  const newer = clinic.published.localeCompare(existing.published);
  const better =
    newer > 0 ||
    (newer === 0 && completeness(clinic) > completeness(existing));
  if (better) groups.set(key, clinic);
}

const duplicatesRemoved = parsed.length - groups.size;

const clinics = [...groups.values()]
  .map(({ published, ...clinic }) => clinic)
  .sort((a, b) => a.name.localeCompare(b.name));

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, JSON.stringify(clinics));

const towns = new Set(clinics.map((c) => c.town));
const regions = new Set(clinics.map((c) => c.region).filter(Boolean));
console.log(`rows read:   ${parsed.length}`);
console.log(`duplicates:  ${duplicatesRemoved} collapsed on name + postcode`);
console.log(`clinics:  ${clinics.length}`);
console.log(`towns:    ${towns.size}`);
console.log(`regions:  ${regions.size}`);
console.log(`websites: ${clinics.filter((c) => c.website).length}`);
console.log(`phones:   ${clinics.filter((c) => c.phone).length}`);
console.log(`written:  ${output}`);
