'use client';
import Navbar from "@/components/navbar";
import WhyUs from "@/components/whyUs";
import Impact from "@/components/impact";
import OurTeam from "@/components/ourTeam";
import GetInTouch from '@/components/writeUs';
import FooterSection from "@/components/footerSections";
export default function AboutUs() {
    return (
      <main>
        <div className="h-screen mx-auto bg-[#1d0828] flex justify-center pb-2 items-center relative">
          <Navbar/>
          <WhyUs/>
        </div>
        <Impact/>
        <OurTeam/>
        <GetInTouch/>
        <FooterSection/>
      </main>
    );
  }