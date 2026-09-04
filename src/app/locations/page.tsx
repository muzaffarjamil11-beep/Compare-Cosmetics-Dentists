import type { Metadata } from "next";
import HubPage, { HUB_ROBOTS } from "@/components/HubPage";
import { getAllTowns } from "@/lib/clinics";

export const metadata: Metadata = {
  title: "All locations | Compare Cosmetic Dentist",
  description:
    "Every town and city in England with a CQC-registered dental practice.",
  robots: HUB_ROBOTS,
};

export default function LocationsHub() {
  const towns = getAllTowns();

  return (
    <HubPage
      title="Dentists by location"
      intro="Every town and city in England with at least one CQC-registered dental practice. Choose a location to compare the practices there."
      entries={towns.map(({ town, count }) => ({
        label: `Dentists in ${town}`,
        href: `/search?location=${encodeURIComponent(town)}`,
        meta: `${count}`,
      }))}
    />
  );
}
