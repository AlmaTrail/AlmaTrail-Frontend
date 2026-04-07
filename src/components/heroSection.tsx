"use client";
import React, { useState, useRef, useEffect } from "react";

const searchMockData = {
  Mentor: [
    { id: 'm1', name: 'Dr. John Doe', description: 'Senior Software Engineer & Tech Lead', route: '/mentor/dr-john-doe' },
    { id: 'm2', name: 'Jane Smith', description: 'Product Design Lead at Meta', route: '/mentor/jane-smith' },
    { id: 'm3', name: 'Alice Johnson', description: 'AI Researcher & Data Scientist', route: '/mentor/alice-johnson' },
    { id: 'm4', name: 'Alice Wonderland', description: 'Blockchain Architect', route: '/mentor/alice-wonderland' },
  ],
  University: [
    { id: 'u1', name: 'Stanford University', description: 'Stanford, California, US', route: '/university/stanford' },
    { id: 'u2', name: 'Massachusetts Institute of Technology (MIT)', description: 'Cambridge, Massachusetts, US', route: '/university/mit' },
    { id: 'u3', name: 'Harvard University', description: 'Cambridge, Massachusetts, US', route: '/university/harvard' },
    { id: 'u4', name: 'University of Oxford', description: 'Oxford, United Kingdom', route: '/university/oxford' },
  ],
  Country: [
    { id: 'c1', name: 'United States', description: 'North America', route: '/country/united-states' },
    { id: 'c2', name: 'United Kingdom', description: 'Europe', route: '/country/united-kingdom' },
    { id: 'c3', name: 'Australia', description: 'Oceania', route: '/country/australia' },
    { id: 'c4', name: 'Canada', description: 'North America', route: '/country/canada' },
  ]
};
import Hero from "../../public/images/hero_1.png";
import Image from "next/image";
import Link from "next/link";


const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"Mentor" | "University" | "Country">("Mentor");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = searchMockData[activeFilter].filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row sm:p-8 lg:justify-between items-center gap-5 lg:mt-8">
      <div className="flex flex-col gap-4 sm:items-left md:justify-center md:items-center lg:gap-8">
        <p className="text-white font-gilroy-bold font-bold sm:text-4xl sm:text-left md:text-center md:text-5xl lg:text-6xl mt-10">
          Bridge the Gap<br /> Between<br className="flex" />Dream School and{" "}
          <br className="lg:flex hidden text-blue-500" />{" "}
          <span className="text-yellow-500"> Reality.<br /></span>
        </p>
        <p className="text-lg font-gilroy-regular sm:text-left md:text-center text-white font-medium mb-0">
          Turn your passion and knowledge into a thriving business.<br />Help your audience get ahead in life.<br />
        </p>
        <div className="flex flex-col w-full max-w-3xl mt-8">
          <div className="flex justify-start">
            <Link href={'/mentor_form'} className="w-full sm:w-auto">
              <button className="py-3 px-10 w-full sm:w-auto bg-white rounded-md text-[#1d0828] font-gilroy-bold shadow-sm transition duration-200 hover:bg-[#1d0828] hover:text-white border-2 border-transparent hover:border-white text-lg font-bold">
                Become a Mentor
              </button>
            </Link>
          </div>

          <div ref={searchContainerRef} className="relative flex bg-white px-4 py-3 rounded-md border-2 border-blue-500 overflow-visible w-full sm:max-w-md md:max-w-xl mx-auto shadow-lg mt-8 mb-4 items-center transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px"
              className="fill-gray-600 mr-3 rotate-90 shrink-0">
              <path
                d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
              </path>
            </svg>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder={`Search ${activeFilter}s...`}
              className="w-full outline-none bg-transparent text-gray-700 text-sm md:text-base font-medium" 
            />
            
            <div className="relative flex items-center ml-2 pl-3 border-l-2 border-gray-200 shrink-0">
              <select 
                value={activeFilter}
                onChange={(e) => {
                  setActiveFilter(e.target.value as "Mentor" | "University" | "Country");
                  setSearchQuery("");
                }}
                className="bg-transparent text-gray-600 text-sm md:text-base outline-none cursor-pointer hover:text-blue-600 transition-colors appearance-none pr-5 font-semibold relative z-10"
              >
                <option value="Mentor">Mentor</option>
                <option value="University">University</option>
                <option value="Country">Country</option>
              </select>
              <div className="pointer-events-none absolute right-0 flex items-center justify-center text-gray-500 z-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>

            {/* 3D Elevated Search Results Overlay */}
            {isDropdownOpen && searchQuery.length > 0 && (
              <div 
                className="absolute top-[calc(100%+12px)] left-0 w-full bg-white rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5),_0_0_20px_rgba(59,130,246,0.3)] border border-gray-100 z-[999] flex flex-col max-h-72 overflow-y-auto custom-scrollbar"
              >
                {searchResults.length > 0 ? (
                  searchResults.map(item => (
                    <Link key={item.id} href={item.route} className="group flex flex-col px-5 py-4 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 cursor-pointer transition-colors text-left items-start">
                      <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-base">{item.name}</span>
                      <span className="text-sm text-gray-500 font-medium group-hover:text-blue-400 transition-colors">{item.description}</span>
                    </Link>
                  ))
                ) : (
                  <div className="px-5 py-8 text-sm text-gray-500 text-center font-medium">
                    No matching {activeFilter.toLowerCase()}s found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Image
        className="hidden md:hidden lg:block lg:ml-16 w-[420px] h-[400px]"
        src={Hero}
        alt=""
      />
    </div>
  );
};

export default HeroSection;
