import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { ElectionInfoSection } from "@/components/landing/ElectionInfoSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ElectionInfoSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
