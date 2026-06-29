import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProductSection } from "@/components/sections/ProductSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ReviewSection } from "@/components/sections/ReviewSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <TrustBar />
      <ProductSection />
      <AboutSection />
      <ReviewSection />
      <ContactSection />
      <LocationSection />
      <NewsletterSection />
    </main>
  );
}
