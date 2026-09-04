import type { Metadata } from "next";
import HubPage, { HUB_ROBOTS } from "@/components/HubPage";
import { getProviders } from "@/lib/clinics";

export const metadata: Metadata = {
  title: "All providers | Compare Cosmetic Dentist",
  description:
    "Dental groups and providers registered with the Care Quality Commission.",
  robots: HUB_ROBOTS,
};

export default function ProvidersHub() {
  // Providers running two or more practices — a single-practice provider is
  // usually one dentist's own name rather than a brand worth its own page.
  const providers = getProviders(2);

  return (
    <HubPage
      title="Dental groups and providers"
      intro="Providers registered with the Care Quality Commission that run two or more practices, largest first. Choose one to see every practice it operates."
      columns={3}
      entries={providers.map(({ provider, count }) => ({
        label: provider,
        href: `/search?provider=${encodeURIComponent(provider)}`,
        meta: `${count}`,
      }))}
    />
  );
}
