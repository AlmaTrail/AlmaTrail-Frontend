"use client";
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { getTopUniversities, getExploreInitialData, getMentorsByCountry, getFilterUniversities } from '@/services/universityService';
import { UniversityCard } from '@/types/university';
import ExploreFooterNav from '@/components/ExploreFooterNav';
import { Loader2 } from 'lucide-react';

const countriesData = [
  { id: 'c_usa', code: 'USA', name: 'United States', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFzRH4_c-rUMSB6REvNp55U1RAfGY6Mc7-VEWdZDVBj3lwVRNRs4L3jw_15IOOW0Qnd5Wkfs3ri-NI4Wlr3unu-uFQqNRTV8xprReAutgAJHZix_E6f280lInTA8vW1S4BBh-MdMeK_1cfWuG-XVId_1Rwug2qJKbi4HLgrbAjsPVcP1QZYMr0JPFBvomNICzBtA19XxBe7TEwVSPNen-Ft7ZLH5-xnNOb5ugkaRhjjmIFkh9IntQiCAx8jtrYJkY2b1Mw5cUZ6Q' },
  { id: 'c_uk', code: 'UK', name: 'United Kingdom', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZWjwl8JhrhZAbhhR6ToVbfynqqw5_xyCUI4WjmBcrzeqYk-HdSTVs7Z-kraj8E_c-Q2dGhGPLJFbXEu930kGGOqIWBJ7TGzCwFvCfaTaAtnXFF5gtsNw-11b8SdrBujqLCxCKOnFsCnm8TY1vYbkfpzPPd6XZL5l-ncGV5g9REuG6k4YCuLzV1j3RHQPL6e2tlp2r0lS3utRoR0_q8q5C17LYxeGIhXPFd3NOdMXlKRQNvliXtxfF1saDUunvDU_w4hOa1g-MPw' },
  { id: 'c_ger', code: 'Germany', name: 'Germany', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwAsjKs6YJQ25y6mHYMainWV-UdOg1whYDAoCuOnfWswH4Cd76U96Oe6Hq6xeX5k2i3Q2MtC0FxlAuO834Rrx4PASCmH1IMh2-gJb3JkKRoI0FlA2rqJOXdOybAGv_TGf9hxk_voQuvz5AWoWJdBQqq0332leY5Uo2Z6yxlsFOeo1fuLrS384l3FswyN0vrcRqFOtuffLmv2He41JQiHRcr3wFHUcuatTa45IZAppk1ujJC0l0mWuYUs3BcYgEY6_KOFDYuf8MqA' },
  { id: 'c_can', code: 'Canada', name: 'Canada', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANXj84yzSLWauQBWGuCfYMn-JpKvNuxvYd_F8Zx2ZpD3DCEr2_NlNsjYJ2ZusxcNfHC9YInGeZGBVEtn0yFwNJPTTsdJBCwf9krEDN5g5mGJIgG6pLGDbLCQ69Y6SRc56Kr6ij2lHXzZiY_-wCPrQBj03fpBa6yvdMmBjfnx_uJOtZ3zxpyhom-hOvQaVDXP5wwELXkl-T5fUzTEFKxDvkietWD-gIB-ne2_oHoD7lJfwzJw8X1z7yDUE42cvkSyc-fQXXXWwGMQ' },
  { id: 'c_aus', code: 'AUS', name: 'Australia', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwAsjKs6YJQ25y6mHYMainWV-UdOg1whYDAoCuOnfWswH4Cd76U96Oe6Hq6xeX5k2i3Q2MtC0FxlAuO834Rrx4PASCmH1IMh2-gJb3JkKRoI0FlA2rqJOXdOybAGv_TGf9hxk_voQuvz5AWoWJdBQqq0332leY5Uo2Z6yxlsFOeo1fuLrS384l3FswyN0vrcRqFOtuffLmv2He41JQiHRcr3wFHUcuatTa45IZAppk1ujJC0l0mWuYUs3BcYgEY6_KOFDYuf8MqA' },
];


export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}

function ExploreContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeType, setActiveType] = useState('All');
  const [universitiesData, setUniversitiesData] = useState<UniversityCard[]>([]);
  const [mentorsData, setMentorsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // UI States for Pagination
  const [showAllCountries, setShowAllCountries] = useState(false);
  const [uniPage, setUniPage] = useState(0);

  useEffect(() => {
    const countryParam = searchParams.get('country');
    const universityParam = searchParams.get('university');

    if (countryParam) {
      setSelectedCountry(countryParam);
      setLoading(true);
      // Fetch universities and mentors for this country
      Promise.all([
        getFilterUniversities(countryParam),
        getMentorsByCountry(countryParam)
      ]).then(([unis, mentors]) => {
        // We need to convert uni names to UniversityCard objects or handle it differently
        // For simplicity, let's fetch all universities and filter
        getTopUniversities().then(allUnis => {
          setUniversitiesData(allUnis.filter(u => u.location.toLowerCase().includes(countryParam.toLowerCase())));
        });
        setMentorsData(mentors);
        setLoading(false);
      });
    } else {
      // Initial view: Fetch Top 10 data
      setLoading(true);
      getExploreInitialData().then(data => {
        // Map backend University entity to UniversityCard if needed
        // Assuming backend University entity has the same fields for now
        setUniversitiesData(data.universities as any);
        setMentorsData(data.mentors);
        setLoading(false);
      });
    }
  }, [searchParams]);

  const handleCountryClick = (countryName: string) => {
    setSelectedCountry(countryName);
    setLoading(true);
    Promise.all([
      getFilterUniversities(countryName),
      getMentorsByCountry(countryName)
    ]).then(([unis, mentors]) => {
      getTopUniversities().then(allUnis => {
        setUniversitiesData(allUnis.filter(u => u.location.toLowerCase().includes(countryName.toLowerCase())));
      });
      setMentorsData(mentors);
      setLoading(false);
      document.getElementById('universities')?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const showCountries = activeType === 'All' || activeType === 'Countries';
  const showUniversities = activeType === 'All' || activeType === 'Universities';
  const showMentors = activeType === 'All' || activeType === 'Mentors';

  const lowerQuery = searchQuery.trim().toLowerCase();
  const isSearching = lowerQuery.length > 0;

  // 1. Matched Countries
  const matchedCountries = countriesData.filter(c =>
    c.name.toLowerCase().includes(lowerQuery) ||
    c.code.toLowerCase().includes(lowerQuery)
  );
  const matchedCountryIds = matchedCountries.map(c => c.id);

  // 2. Matched Universities (Direct Match OR Belongs to a Matched Country)
  const matchedUniversities = universitiesData.filter(u =>
    u.name.toLowerCase().includes(lowerQuery) ||
    u.tag.toLowerCase().includes(lowerQuery) ||
    u.location.toLowerCase().includes(lowerQuery) ||
    matchedCountryIds.includes(u.countryId)
  );
  const matchedUniversityIds = matchedUniversities.map(u => u.id);

  // 3. Matched Mentors (Search Only)
  const matchedMentors = mentorsData.filter(m => {
    return !isSearching ||
      `${m.user?.firstName || ''} ${m.user?.lastName || ''}`.trim().toLowerCase().includes(lowerQuery) || 
      (m.course || '').toLowerCase().includes(lowerQuery) ||
      matchedUniversityIds.map(String).includes(String(m.university?.id));
  });


  const universityPageCount = Math.ceil(universitiesData.length / 4);

  return (
    <div className="bg-slate-50 font-sans text-slate-900 min-h-screen">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}} />

      <main className="pb-32">
        {/* Section 1: Hero-style Global Search */}
        <section className="relative py-24 px-8 flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_#e0e7ff_0%,_transparent_40%),radial-gradient(circle_at_bottom_left,_#f1f5f9_0%,_transparent_40%)] opacity-50"></div>
          <div className="w-full max-w-3xl text-center mb-12 mt-12">
            <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-slate-900">Find your academic path.</h1>
            <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto">Connect with mentors who have walked the path you're about to take.</p>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-10 group-focus-within:opacity-25 transition duration-1000"></div>
              <div className="relative flex items-center bg-white rounded-full shadow-xl p-2 pl-6">
                <span className="material-symbols-outlined text-slate-400">search</span>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-lg px-4 text-slate-900 placeholder:text-slate-400 outline-none"
                  placeholder="Search mentors, universities, or countries..."
                  type="text"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="mr-2 text-slate-400 hover:text-slate-600 flex items-center justify-center">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                )}
                <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors">Search</button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <div className="flex flex-wrap items-center justify-center gap-3 bg-slate-200 px-4 py-2 rounded-full text-sm font-medium">
                <span className="text-slate-600">Type:</span>
                <button 
                  onClick={() => setActiveType('All')}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${activeType === 'All' ? 'bg-indigo-600 text-white' : 'hover:bg-white'}`}
                >All</button>
                <button 
                  onClick={() => setActiveType('Mentors')}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${activeType === 'Mentors' ? 'bg-indigo-600 text-white' : 'hover:bg-white'}`}
                >Mentors</button>
                 <button 
                  onClick={() => setActiveType('Universities')}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${activeType === 'Universities' ? 'bg-indigo-600 text-white' : 'hover:bg-white'}`}
                >Universities</button>
                <button 
                  onClick={() => setActiveType('Countries')}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${activeType === 'Countries' ? 'bg-indigo-600 text-white' : 'hover:bg-white'}`}
                >Countries</button>
              </div>

              {selectedCountry && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-2 md:mt-0">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mx-2">Active Filters:</span>
                  <button 
                    onClick={() => setSelectedCountry(null)}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-indigo-200 transition-colors"
                  >
                    Country: {selectedCountry}
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                  <button 
                    onClick={() => setSelectedCountry(null)}
                    className="text-slate-500 hover:text-slate-900 text-xs font-bold underline underline-offset-4 ml-2"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {isSearching && (
          <div className="max-w-7xl mx-auto px-8 mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">
              Showing results for '{searchQuery}'
            </h2>
            {matchedCountries.length === 0 && matchedUniversities.length === 0 && matchedMentors.length === 0 && (
              <div className="bg-white p-12 rounded-2xl shadow-sm text-center border border-slate-100 mt-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">No results found</h3>
                <p className="text-slate-500 mb-6">Try adjusting your filters or search for something else</p>
                <button onClick={() => setSearchQuery('')} className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-6 py-2 rounded-full font-semibold transition-colors">
                  Clear Search
                </button>
              </div>
            )}
          </div>
        )}

        {/* Section 2: Explore by Country */}
        {(showCountries && !selectedCountry && (!isSearching || matchedCountries.length > 0)) && (
          <section className="max-w-7xl mx-auto px-8 mb-24">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">{isSearching ? "Countries" : "Explore by Country"}</h2>
                {!isSearching && <p className="text-slate-600 mt-1">Top destinations for MS & PhD applicants</p>}
              </div>
              {!isSearching && (
                <button onClick={() => setShowAllCountries(!showAllCountries)} className="text-indigo-600 font-semibold flex items-center gap-1 hover:underline">
                  {showAllCountries ? "Show less" : "View all"} <span className="material-symbols-outlined text-sm">{showAllCountries ? "expand_less" : "arrow_forward"}</span>
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(isSearching ? matchedCountries : (showAllCountries ? countriesData : countriesData.slice(0, 4))).map(country => (
                <div key={country.id} onClick={() => handleCountryClick(country.name)} className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
                  <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={country.name} src={country.img} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white text-left">
                    <p className="text-sm uppercase tracking-widest opacity-80 mb-1">{country.code}</p>
                    <h3 className="text-2xl font-bold">{country.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 3: Top Universities */}
        <div id="universities"></div>
        {(showUniversities && (!isSearching || matchedUniversities.length > 0)) && (
          <section className="bg-slate-200 py-24 px-8 rounded-t-[3rem]">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900">{isSearching ? "Universities" : selectedCountry ? `Universities in ${selectedCountry}` : "Top Universities"}</h2>
                  {!isSearching && !selectedCountry && <p className="text-slate-600 mt-2 max-w-lg">Curated lists of prestigious institutions across the globe with high acceptance for international scholars.</p>}
                  {selectedCountry && <p className="text-slate-600 mt-2">Discover institutions and mentors from {selectedCountry}.</p>}
                </div>
                {!isSearching && universitiesData.length > 4 && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setUniPage(p => Math.max(0, p - 1))}
                      disabled={uniPage === 0}
                      className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${uniPage === 0 ? 'border-slate-300 text-slate-400 cursor-not-allowed opacity-50' : 'border-slate-400 hover:bg-white text-slate-700'}`}
                    >
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button
                      onClick={() => setUniPage(p => Math.min(universityPageCount - 1, p + 1))}
                      disabled={uniPage >= universityPageCount - 1}
                      className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${uniPage >= universityPageCount - 1 ? 'border-slate-300 text-slate-400 cursor-not-allowed opacity-50' : 'border-slate-400 hover:bg-white text-slate-700'}`}
                    >
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                )}
              </div>

              {loading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {(isSearching ? matchedUniversities : universitiesData.slice(uniPage * 4, (uniPage + 1) * 4)).map(uni => (
                    <Link 
                      href={`/university/${uni.id}`}
                      key={uni.id} 
                      className="bg-white rounded-2xl overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-300 block border border-slate-100"
                    >
                      <div className="h-40 overflow-hidden relative">
                        <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={uni.name} src={uni.cardImage} />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-[10px] font-bold uppercase rounded-full tracking-wider">{uni.tag}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{uni.name}</h3>
                        <p className="text-slate-500 text-sm mt-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">location_on</span> {uni.location}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Section 4: Featured Mentors */}
        {(showMentors && (!isSearching || mentorsData.length > 0)) && (
          <section className="max-w-7xl mx-auto px-8 py-24">
            <div className={`text-center mb-16 ${isSearching ? 'hidden' : 'block'}`}>
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">{selectedCountry ? `Mentors from ${selectedCountry}` : "Featured Mentors"}</h2>
              <p className="text-slate-600 mt-3 text-lg">Direct guidance from those who've made it.</p>
              {selectedCountry && mentorsData.length >= 10 && (
                <div className="mt-4 flex items-center justify-center gap-2 text-slate-400 text-sm">
                  <span className="material-symbols-outlined text-sm">info</span>
                  <p>Showing top 10 mentors. To see all available mentors, please visit the specific University page.</p>
                </div>
              )}
            </div>
            {isSearching && (
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-8 mt-[-2rem]">Mentors</h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(isSearching ? matchedMentors : mentorsData).map(mentor => {
                const name = `${mentor.user?.firstName || ''} ${mentor.user?.lastName || ''}`.trim() || mentor.user?.email || 'Unknown Mentor';
                return (
                  <div key={mentor.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <img className="w-full h-full object-cover rounded-full shadow-md" alt={name} src={mentor.profilePicUrl || `https://ui-avatars.com/api/?name=${name}`} />
                      <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full border-2 border-white flex items-center justify-center h-6 w-6">
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-bold text-slate-900">{name}</h4>
                      <p className="text-indigo-600 text-sm font-medium">{mentor.university?.name || 'Unknown University'} • {mentor.course || 'General'}</p>
                      <div className="flex items-center justify-center gap-1 my-3 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        ))}
                        <span className="text-slate-600 text-xs ml-1 font-semibold">{mentor.avgRating ? Number(mentor.avgRating).toFixed(1) : "5.0"}</span>
                      </div>
                      <div className="bg-slate-100 py-2 px-4 rounded-full inline-block mb-6">
                        <span className="text-slate-900 text-xs font-semibold">Helped {mentor.totalSessions || 0}+ students</span>
                      </div>
                      <Link href={`/mentor/${mentor.id}`}>
                        <button className="w-full py-3 rounded-full border-2 border-indigo-600 text-indigo-600 font-bold hover:bg-indigo-600 hover:text-white transition-all group-hover:-translate-y-1">View Profile</button>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </main>

      <ExploreFooterNav />
    </div>
  );
}
