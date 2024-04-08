'use client';
import Navbar from '@/components/navbar';
import CountrySection from '@/components/countrySection';
import HeroSection from '@/components/heroSection';

export default function Home() {
  return (
    <main>
      <div className="mx-auto bg-[#3b0764] flex justify-center pb-2 items-center relative z-0">
        <Navbar />
        <HeroSection />
      </div>
      <CountrySection />
    </main>
  );
}
