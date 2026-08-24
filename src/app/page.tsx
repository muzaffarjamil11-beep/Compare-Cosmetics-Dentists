import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TopClinics from "@/components/TopClinics";
import HowWeHelp from "@/components/HowWeHelp";
import PopularTreatments from "@/components/PopularTreatments";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TopClinics />
        <HowWeHelp />
        <PopularTreatments city="Leeds" />
      </main>
      <Footer />
    </>
  );
}
