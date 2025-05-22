import HeroSection from "../components/heroSection";
import FeaturesSection from "../components/featureSection";
import TestimonialsSection from "../components/testimonalSection";
import CallToActionSection from "../components/callToActionSection";
import PricingSection from "../components/priceSection";
import FAQSection from "../components/FAQSection";


export default function Home() {

  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToActionSection />
      <PricingSection/>
      <FAQSection />
    </div>
  );
}
