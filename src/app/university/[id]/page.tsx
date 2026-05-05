"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getUniversityById } from '@/services/universityService';
import { UniversityDetail } from '@/types/university';
import Navbar from '@/components/NewNavbar';
import Hero from '@/components/UniversityProfile/hero';
import Footer from '@/components/footerSections';
import { Loader2 } from 'lucide-react';

export default function UniversityPage() {
  const { id } = useParams();
  const [university, setUniversity] = useState<UniversityDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    getUniversityById(id as string)
      .then((data) => {
        if (data) {
          setUniversity(data);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">University Not Found</h1>
          <p className="text-slate-600 mb-8">The university you are looking for does not exist or has been removed.</p>
          <a href="/explore" className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors">
            Back to Explore
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero university={university} />
        {/* Mentors section will be integrated here later */}
      </main>
      <Footer />
    </div>
  );
}
