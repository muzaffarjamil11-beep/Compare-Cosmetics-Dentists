import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TopClinics from "@/components/TopClinics";
import HowWeHelp from "@/components/HowWeHelp";
import LocationColumns from "@/components/LocationColumns";
import PopularTreatments from "@/components/PopularTreatments";
import Footer from "@/components/Footer";
import { getAllTowns, getRegionSummaries } from "@/lib/clinics";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TopClinics />
        <HowWeHelp />
        {/* The location columns are built on the server and passed into the
            client section, so the clinic dataset stays server-side. */}
        <PopularTreatments
          city="Leeds"
          locations={
            <LocationColumns
              regions={getRegionSummaries(10)}
              totalTowns={getAllTowns().length}
            />
          }
        />
      </main>
      <Footer />
    </>
  );
}
