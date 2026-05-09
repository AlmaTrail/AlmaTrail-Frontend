"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Search, Loader2 } from "lucide-react";
import { 
  getFilterCountries,
  getFilterUniversities, 
  getMentorCountByLocation 
} from "@/services/universityService";

const MentorMatchSection = () => {
  const router = useRouter();
  const [countries, setCountries] = useState<{id: number, name: string}[]>([]);
  const [universities, setUniversities] = useState<{id: number, name: string}[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedUniversity, setSelectedUniversity] = useState<string>("");

  const [mentorCount, setMentorCount] = useState<number | null>(null);
  const [loadingCount, setLoadingCount] = useState<boolean>(false);

  useEffect(() => {
    // Initial fetch for countries
    getFilterCountries().then(data => {
      setCountries(data);
    });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getFilterUniversities(Number(selectedCountry)).then(data => {
        setUniversities(data);
        setSelectedUniversity("");
      });
    } else {
      setUniversities([]);
      setSelectedUniversity("");
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedUniversity) {
      setLoadingCount(true);
      getMentorCountByLocation(Number(selectedCountry), Number(selectedUniversity)).then(count => {
        setMentorCount(count);
        setLoadingCount(false);
      });
    } else {
      setMentorCount(null);
    }
  }, [selectedCountry, selectedUniversity]);

  const handleFindMentors = () => {
    let query = "";
    if (selectedCountry && selectedUniversity) {
      query = `countryId=${encodeURIComponent(selectedCountry)}&universityId=${encodeURIComponent(selectedUniversity)}`;
    } else if (selectedCountry) {
      query = `countryId=${encodeURIComponent(selectedCountry)}`;
    } else if (selectedUniversity) {
      query = `universityId=${encodeURIComponent(selectedUniversity)}`;
    }

    if (query) {
      router.push(`/explore?${query}`);
    }
  };

  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Not random mentors.<br />
              <span className="text-primary">The right mentors.</span>
            </h2>
            <div className="mt-8 flex flex-col gap-4">
              {["Same university", "Same course", "Same research domain", "Same journey"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-400 bg-white rounded-full " size={24} />
                  <span className="text-[20px] font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border bg-card p-6 shadow-elevated"
          >
            <div className="flex items-center gap-2 mb-6">
              <Search size={18} className="text-text-secondary" />
              <span className="text-sm font-semibold text-foreground">Find Your Mentor</span>
            </div>

            <div className="flex flex-col gap-4">
              {/* Country Dropdown */}
              <div>
                <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">Country</label>
                <select 
                  value={selectedCountry} 
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="" disabled>Select Country</option>
                  {countries.map(country => <option key={country.id} value={country.id}>{country.name}</option>)}
                </select>
              </div>

              {/* University Dropdown */}
              <div>
                <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">University</label>
                <select 
                  value={selectedUniversity} 
                  onChange={(e) => setSelectedUniversity(e.target.value)}
                  disabled={!selectedCountry || universities.length === 0}
                  className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                >
                  <option value="" disabled>Select University</option>
                  {universities.map(uni => <option key={uni.id} value={uni.id}>{uni.name}</option>)}
                </select>
              </div>
            </div>

            <button 
              onClick={handleFindMentors}
              disabled={loadingCount || mentorCount === 0 || mentorCount === null}
              className="mt-4 w-full rounded-xl bg-primary/10 py-6 text-center hover:bg-primary/20 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingCount ? (
                <div className="flex justify-center items-center py-2">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              ) : mentorCount === null ? (
                <div className="py-2">
                   <p className="text-lg font-bold text-primary">Find Your Mentor</p>
                   <p className="text-sm text-primary/80 mt-1">Select criteria above to see matching mentors</p>
                </div>
              ) : (
                <>
                  <p className="text-2xl font-bold text-primary">{mentorCount} matching records</p>
                </>
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MentorMatchSection;
