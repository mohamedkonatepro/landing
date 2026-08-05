import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import PainTicker from "@/components/PainTicker";
import Problems from "@/components/Problems";
import Comparison from "@/components/Comparison";
import Offers from "@/components/Offers";
import Objections from "@/components/Objections";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import DonneesStructurees from "@/components/DonneesStructurees";

/**
 * Structure de conversion :
 * attention (hero, avec les écrans de l'outil dans sa visionneuse)
 * → preuve → agitation (ticker + constat) → transformation (avant/après)
 * → offres → objections → action (formulaire).
 */
export default function Home() {
  return (
    <>
      <DonneesStructurees />
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <PainTicker />
        <Problems />
        <Comparison />
        <Offers />
        <Objections />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
