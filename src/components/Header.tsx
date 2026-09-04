import { getProviders, getTownsByCount } from "@/lib/clinics";
import { SYMPTOMS, TREATMENTS, slugify } from "@/lib/taxonomy";
import HeaderShell from "./HeaderShell";
import type { NavSection } from "./NavMenu";

/**
 * Builds the navigation from the real data, then hands it to the interactive
 * shell. Locations and providers come from the CQC register; treatments and
 * symptoms from the site's own taxonomy.
 */
export default function Header() {
  const towns = getTownsByCount();
  const providers = getProviders(5);

  const sections: NavSection[] = [
    {
      label: "Locations",
      href: "/locations",
      total: towns.length,
      items: towns.slice(0, 10).map(({ town, count }) => ({
        label: `${town} (${count})`,
        href: `/search?location=${encodeURIComponent(town)}`,
      })),
    },
    {
      label: "Treatments",
      href: "/treatments",
      total: TREATMENTS.length,
      items: TREATMENTS.slice(0, 10).map((treatment) => ({
        label: treatment,
        href: `/search?treatment=${encodeURIComponent(treatment)}`,
      })),
    },
    {
      label: "Providers",
      href: "/providers",
      total: providers.length,
      items: providers.slice(0, 10).map(({ provider, count }) => ({
        label: `${provider} (${count})`,
        href: `/search?provider=${encodeURIComponent(provider)}`,
      })),
    },
    {
      label: "Symptoms",
      href: "/symptoms",
      total: SYMPTOMS.length,
      items: SYMPTOMS.slice(0, 10).map((symptom) => ({
        label: symptom.name,
        href: `/symptoms/${slugify(symptom.name)}`,
      })),
    },
  ];

  return <HeaderShell sections={sections} />;
}
