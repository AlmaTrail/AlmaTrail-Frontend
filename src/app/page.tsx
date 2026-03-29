'use client';
import Navbar from '@/components/navbar';
import HeroSection from '@/components/heroSection';
import FeatureSection from '@/components/featureSection';
import UpcomingSection from '@/components/upcomingSection';
import UniversitiesSection from '../components/universitiesSection';
import FaqSection from '../components/faq'
import FooterSection from "../components/footerSections";
import IntroSection from '@/components/introSection';
import "./globals.css";
import Link from 'next/link';
export default function Home() {
  return (
    <main>
      <div className="h-screen mx-auto bg-[#1d0828] flex justify-center pb-2 items-center relative">
        <Navbar />
        <Link href="/mentor_profile" className="absolute top-8 right-8 z-20">
            <button className='py-2 px-6 bg-white rounded-md text-[#1d0828] font-gilroy-bold shadow-sm transition duration-200 hover:bg-[#1d0828] hover:text-white border-2 border-transparent hover:border-white'>
                Profile
            </button>
        </Link>
        <HeroSection />
      </div>
      <IntroSection />
      <FeatureSection />
      {/* <UniversitiesSection /> */}
      <FaqSection />
      <UpcomingSection />
      <FooterSection />
    </main>
  );
}
