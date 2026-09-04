import type { Metadata } from "next";
import HubPage, { HUB_ROBOTS } from "@/components/HubPage";
import { SYMPTOMS, slugify } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "All symptoms | Compare Cosmetic Dentist",
  description: "Common dental symptoms and what they usually mean.",
  robots: HUB_ROBOTS,
};

export default function SymptomsHub() {
  return (
    <HubPage
      title="Dental symptoms"
      intro="Common symptoms and the treatments that usually address them. Choose a symptom to find practices that can help."
      columns={3}
      entries={SYMPTOMS.map((symptom) => ({
        label: symptom.name,
        href: `/symptoms/${slugify(symptom.name)}`,
      }))}
    />
  );
}
