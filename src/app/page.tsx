'use client';
import Navbar from '@/components/navbar';
import CountrySection from '@/components/countrySection';
import HeroSection from '@/components/heroSection';
import FeatureSection from '@/components/featureSection';
import DatashowSection from '@/components/datashowSection';
import UpcomingSection from '@/components/upcomingSection';
export default function Home() {
  return (
    <main>
      <div className="h-screen mx-auto bg-[#3b0764] flex justify-center pb-2 items-center relative z-60">
        <Navbar />
        <HeroSection />
      </div>
      <UpcomingSection/>
      <FeatureSection/>
    </main>
  );
}
