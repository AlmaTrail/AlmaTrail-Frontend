"use client";
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { getExploreInitialData, getMentorsByCountryId, getFilterUniversities } from '@/services/universityService';
import { UniversityCard } from '@/types/university';
import ExploreFooterNav from '@/components/ExploreFooterNav';
import { Loader2 } from 'lucide-react';

// Country type from CountryMaster API
interface Country {
  id: number;
  name: string;
  code?: string;
  imgUrl?: string;
}

// Fallback country images keyed by country name
const COUNTRY_IMAGES: Record<string, string> = {
  'United States': 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&auto=format',
  'United Kingdom': 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&auto=format',
  'Canada': 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&auto=format',
  'Germany': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&auto=format',
  'Australia': 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&auto=format',
  'India': 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&auto=format',
};
const DEFAULT_COUNTRY_IMG = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format';

// Skeleton components
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
      <div className="h-40 bg-slate-200" />
      <div className="p-6 space-y-3">
        <div className="h-3 bg-slate-200 rounded-full w-1/3" />
        <div className="h-5 bg-slate-200 rounded-full w-3/4" />
        <div className="h-3 bg-slate-200 rounded-full w-1/2" />
      </div>
    </div>
  );
}

function SkeletonMentorCard() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-pulse">
      <div className="w-24 h-24 rounded-full bg-slate-200 mx-auto mb-6" />
      <div className="space-y-3 text-center">
        <div className="h-4 bg-slate-200 rounded-full w-2/3 mx-auto" />
        <div className="h-3 bg-slate-200 rounded-full w-1/2 mx-auto" />
        <div className="h-10 bg-slate-200 rounded-full w-full mt-6" />
      </div>
    </div>
  );
}

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

  // Data from API
  const [countriesData, setCountriesData] = useState<Country[]>([]);
  const [universitiesData, setUniversitiesData] = useState<UniversityCard[]>([]);
  const [mentorsData, setMentorsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sectionLoading, setSectionLoading] = useState(false);

  // Filter States — store country object so we have both id and name
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // Pagination
  const [showAllCountries, setShowAllCountries] = useState(false);
  const [uniPage, setUniPage] = useState(0);

  // Initial load: fetch all three from /api/explore/initial
  useEffect(() => {
    setLoading(true);
    getExploreInitialData().then(data => {
      setCountriesData(data.countries || []);
      setUniversitiesData(data.universities as any || []);
      setMentorsData(data.mentors || []);
      setLoading(false);

      // Handle URL params (came from landing page with countryId/universityId)
      const countryIdParam = searchParams.get('countryId');
      if (countryIdParam && data.countries?.length) {
        const matchedCountry = data.countries.find(c => String(c.id) === countryIdParam);
        if (matchedCountry) {
          handleCountryClick(matchedCountry, data.countries);
        }
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCountryClick = (country: Country, countriesList?: Country[]) => {
    setSelectedCountry(country);
    setUniPage(0);
    setSectionLoading(true);

    Promise.all([
      getFilterUniversities(country.id),
      getMentorsByCountryId(country.id)
    ]).then(([unis, mentors]) => {
      // getFilterUniversities returns {id, name} — map to UniversityCard shape
      setUniversitiesData(unis as any);
      setMentorsData(mentors);
      setSectionLoading(false);
      document.getElementById('universities')?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const handleClearCountry = () => {
    setSelectedCountry(null);
    setUniPage(0);
    setLoading(true);
    getExploreInitialData().then(data => {
      setCountriesData(data.countries || []);
      setUniversitiesData(data.universities as any || []);
      setMentorsData(data.mentors || []);
      setLoading(false);
    });
  };

  const showCountries = activeType === 'All' || activeType === 'Countries';
  const showUniversities = activeType === 'All' || activeType === 'Universities';
  const showMentors = activeType === 'All' || activeType === 'Mentors';

  const lowerQuery = searchQuery.trim().toLowerCase();
  const isSearching = lowerQuery.length > 0;

  // Search filtering
  const matchedCountries = countriesData.filter(c =>
    c.name.toLowerCase().includes(lowerQuery) ||
    (c.code || '').toLowerCase().includes(lowerQuery)
  );

  const matchedUniversities = universitiesData.filter(u =>
    (u.name || '').toLowerCase().includes(lowerQuery) ||
    (u.tag || '').toLowerCase().includes(lowerQuery) ||
    (u.location || '').toLowerCase().includes(lowerQuery)
  );
  const matchedUniversityIds = matchedUniversities.map(u => u.id);

  const matchedMentors = mentorsData.filter(m => {
    return !isSearching ||
      `${m.user?.firstName || ''} ${m.user?.lastName || ''}`.trim().toLowerCase().includes(lowerQuery) ||
      (m.course || '').toLowerCase().includes(lowerQuery) ||
      matchedUniversityIds.map(String).includes(String(m.university?.id));
  });

  const universityPageCount = Math.ceil(universitiesData.length / 4);
  const isAtMentorCap = selectedCountry && mentorsData.length >= 10;

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
                {['All', 'Mentors', 'Universities', 'Countries'].map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-3 py-1 rounded-full text-xs transition-colors ${activeType === type ? 'bg-indigo-600 text-white' : 'hover:bg-white'}`}
                  >{type}</button>
                ))}
              </div>

              {selectedCountry && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-2 md:mt-0">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mx-2">Active Filters:</span>
                  <button
                    onClick={handleClearCountry}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-indigo-200 transition-colors"
                  >
                    Country: {selectedCountry.name}
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                  <button
                    onClick={handleClearCountry}
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
              {!isSearching && countriesData.length > 4 && (
                <button onClick={() => setShowAllCountries(!showAllCountries)} className="text-indigo-600 font-semibold flex items-center gap-1 hover:underline">
                  {showAllCountries ? "Show less" : "View all"} <span className="material-symbols-outlined text-sm">{showAllCountries ? "expand_less" : "arrow_forward"}</span>
                </button>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-80 rounded-2xl bg-slate-200 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(isSearching ? matchedCountries : (showAllCountries ? countriesData : countriesData.slice(0, 4))).map(country => (
                  <div
                    key={country.id}
                    onClick={() => handleCountryClick(country)}
                    className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
                  >
                    <img
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={country.name}
                      src={country.imgUrl || COUNTRY_IMAGES[country.name] || DEFAULT_COUNTRY_IMG}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white text-left">
                      {country.code && <p className="text-sm uppercase tracking-widest opacity-80 mb-1">{country.code}</p>}
                      <h3 className="text-2xl font-bold">{country.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Section 3: Top Universities */}
        <div id="universities"></div>
        {(showUniversities && (!isSearching || matchedUniversities.length > 0)) && (
          <section className="bg-slate-200 py-24 px-8 rounded-t-[3rem]">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                    {isSearching ? "Universities" : selectedCountry ? `Universities in ${selectedCountry.name}` : "Top Universities"}
                  </h2>
                  {!isSearching && !selectedCountry && <p className="text-slate-600 mt-2 max-w-lg">Curated lists of prestigious institutions across the globe with high acceptance for international scholars.</p>}
                  {selectedCountry && <p className="text-slate-600 mt-2">Discover institutions and mentors from {selectedCountry.name}.</p>}
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

              {(loading || sectionLoading) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
              ) : universitiesData.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl text-center">
                  <span className="material-symbols-outlined text-4xl text-slate-300 mb-4 block">school</span>
                  <p className="text-slate-500">No universities found for this country yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {(isSearching ? matchedUniversities : universitiesData.slice(uniPage * 4, (uniPage + 1) * 4)).map(uni => (
                    <Link
                      href={`/university/${uni.id}`}
                      key={uni.id}
                      className="bg-white rounded-2xl overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-300 block border border-slate-100"
                    >
                      <div className="h-40 overflow-hidden relative bg-slate-100">
                        {uni.cardImage ? (
                          <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={uni.name} src={uni.cardImage} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-5xl text-slate-300">school</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-[10px] font-bold uppercase rounded-full tracking-wider">{uni.tag || 'University'}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{uni.name}</h3>
                        {uni.location && (
                          <p className="text-slate-500 text-sm mt-1 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">location_on</span> {uni.location}
                          </p>
                        )}
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
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
                {selectedCountry ? `Mentors from ${selectedCountry.name}` : "Featured Mentors"}
              </h2>
              <p className="text-slate-600 mt-3 text-lg">Direct guidance from those who've made it.</p>

              {/* Mentor cap info */}
              {isAtMentorCap && (
                <div className="mt-5 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm px-5 py-2.5 rounded-full">
                  <span className="material-symbols-outlined text-base">info</span>
                  Showing top 10 mentors from {selectedCountry?.name}. Select a university above to see all mentors from that institution.
                </div>
              )}
            </div>

            {isSearching && (
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-8 mt-[-2rem]">Mentors</h2>
            )}

            {(loading || sectionLoading) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, i) => <SkeletonMentorCard key={i} />)}
              </div>
            ) : mentorsData.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl text-center border border-slate-100">
                <span className="material-symbols-outlined text-4xl text-slate-300 mb-4 block">person_search</span>
                <p className="text-slate-500">No mentors found yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {(isSearching ? matchedMentors : mentorsData).map(mentor => {
                  const name = `${mentor.user?.firstName || ''} ${mentor.user?.lastName || ''}`.trim() || mentor.user?.email || 'Unknown Mentor';
                  return (
                    <div key={mentor.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                      <div className="relative w-24 h-24 mx-auto mb-6">
                        <img className="w-full h-full object-cover rounded-full shadow-md" alt={name} src={mentor.profilePicUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`} />
                        <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full border-2 border-white flex items-center justify-center h-6 w-6">
                          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <h4 className="text-lg font-bold text-slate-900">{name}</h4>
                        <p className="text-indigo-600 text-sm font-medium mt-1">
                          {mentor.university?.name || 'Unknown University'}
                          {mentor.course ? ` • ${mentor.course}` : ''}
                        </p>
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
                  );
                })}
              </div>
            )}
          </section>
        )}
      </main>

      <ExploreFooterNav />
    </div>
  );
}
