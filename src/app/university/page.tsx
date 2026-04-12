"use client";
import Navbar from '../../components/navbar';
import Hero from '../../components/UniversityProfile/hero';
import MentorsSection from '../../components/UniversityProfile/MentorSection';
import Newsletter from '../../components/UniversityProfile/NewsLetter';
import Footer from '../../components/footerSections';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <main className="flex-grow">
        <Hero />
        <MentorsSection />
        {/* <Newsletter /> */}
      </main>
      <Footer />
    </div>
  );
}
