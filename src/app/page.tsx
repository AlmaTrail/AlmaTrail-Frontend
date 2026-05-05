import Navbar from "@/components/NewNavbar";
import HeroSection from "@/components/landing/Hero";
import ProblemSection from "@/components/landing/ProblemSection";
import JourneySection from "@/components/landing/JourneySection";
import MentorMatchSection from "@/components/landing/MentorMatchSection";
import MentorGrid from "@/components/landing/MentorGrid";
import SocialProof from "@/components/landing/SocialProof";
import ComparisonSection from "@/components/landing/ComparisonSection";
import ValueProp from "@/components/landing/ValueProp";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/footerSections";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <ProblemSection />
    <JourneySection />
    <MentorMatchSection />
    <SocialProof />
    <ComparisonSection />
    <ValueProp />
    <FinalCTA />
    <Footer />
  </div>
);

export default Index;
