import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TopClinics from "@/components/TopClinics";
import HowWeHelp from "@/components/HowWeHelp";
import PopularTreatments from "@/components/PopularTreatments";
import Footer from "@/components/Footer";
import { getRegionSummaries } from "@/lib/clinics";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TopClinics />
        <HowWeHelp />
        {/* Region data is read on the server and passed down, so the clinic
            dataset stays server-side. */}
        <PopularTreatments city="Leeds" regions={getRegionSummaries(6)} />
      </main>
      <Footer />
    </>
  );
}
