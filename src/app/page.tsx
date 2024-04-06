'use client';
import Navbar from '@/components/navbar';
import Hero from "../../public/images/hero_1.png";
import Image from "next/image";

import CountrySection from '@/components/countrySection';
import HeroSection from '@/components/heroSection';


export default function Home() {
  return (
    <main>
      <div className="h-screen">
        <div className="h-3/4 mx-auto bg-[#3b0764] flex justify-center pb-2 items-center relative z-0">
          <Navbar />
          <HeroSection />
        </div>
        <CountrySection />
      </div>
    </main>
  );
}
