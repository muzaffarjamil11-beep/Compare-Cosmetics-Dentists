import type { Metadata } from "next";
import HubPage, { HUB_ROBOTS } from "@/components/HubPage";
import { TREATMENTS } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "All treatments | Compare Cosmetic Dentist",
  description: "Every dental treatment covered on Compare Cosmetic Dentist.",
  robots: HUB_ROBOTS,
};

export default function TreatmentsHub() {
  return (
    <HubPage
      title="Dental treatments"
      intro="Every treatment covered on the site. Choose one to compare the practices offering it near you."
      columns={3}
      entries={TREATMENTS.map((treatment) => ({
        label: treatment,
        href: `/search?treatment=${encodeURIComponent(treatment)}`,
      }))}
    />
  );
}
