"use client";
import { useState, useEffect } from 'react';
import { 
  Copy, 
  MapPin, 
  PlusCircle, 
  X, 
  Plus, 
  Info,
  ChevronDown,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import ProfilePhotoUpload from '@/components/profilePhotoUpload';
import DocumentUpload from '@/components/documentUpload';
import SchedulePicker, { WeeklySchedule } from '@/components/schedulePicker';
import timezoneData from '@/data/timezone.json';
import countryData from '@/data/country.json';
import superpowersData from '@/data/superpowers.json';
import { getFilterCountries, getFilterUniversities } from '@/services/universityService';
import { Datepicker } from 'flowbite-react';
import { format } from 'date-fns';
import Navbar from '@/components/NewNavbar';
// import "../globals.css";

export default function App() {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [mentorData, setMentorData] = useState<any>(null);
  const [isFetchingData, setIsFetchingData] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const endpoint = process.env.NEXT_PUBLIC_USERS_ME_ENDPOINT;
        if (!endpoint) throw new Error("NEXT_PUBLIC_USERS_ME_ENDPOINT is not defined");
        
        const token = Cookies.get("token") || "";

        const headers: HeadersInit = {};
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(endpoint, { headers });
        
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
        }
        
        const data = await response.json();
        console.log("User Details:", data);
        setUserDetails(data);

        const hasMentorRole = 
          data?.role?.name?.toLowerCase() === 'mentor' || 
          (typeof data?.role === 'string' && data.role.toLowerCase() === 'mentor') ||
          (Array.isArray(data?.roles) && data.roles.some((r: any) => 
            (typeof r === 'string' && r.toLowerCase() === 'mentor') || 
            (r?.name?.toLowerCase() === 'mentor')
          ));

        const mentorId = data?.mentor?.id || data?.mentorId || data?.id;

        if (hasMentorRole && mentorId) {
          const mentorEndpoint = process.env.NEXT_PUBLIC_MENTORS_ENDPOINT;
          if (mentorEndpoint) {
            const mentorUrl = `${mentorEndpoint}/${mentorId}`;
            const mentorResponse = await fetch(mentorUrl, { headers });
            
            if (mentorResponse.ok) {
              const mentorInfo = await mentorResponse.json();
              console.log("Mentor Data:", mentorInfo);
              setMentorData(mentorInfo);

              if (mentorInfo.languages) {
                const langs = typeof mentorInfo.languages === 'string' 
                  ? mentorInfo.languages.split(' ').filter((l: string) => l) 
                  : Array.isArray(mentorInfo.languages) ? mentorInfo.languages : [];
                setLanguages(langs);
              }
              if (mentorInfo.superpowers && Array.isArray(mentorInfo.superpowers)) {
                setSuperpowers(mentorInfo.superpowers);
              }
              if (mentorInfo.country) setCountryInput(mentorInfo.country);
              if (mentorInfo.whatsappNumber) {
                const parts = mentorInfo.whatsappNumber.split(' ');
                if (parts.length > 1) {
                  setWhatsappDialCode(parts[0]);
                  setWhatsappNumber(parts.slice(1).join(' '));
                } else {
                  setWhatsappNumber(mentorInfo.whatsappNumber);
                }
              }
              if (mentorInfo.workHistories && Array.isArray(mentorInfo.workHistories) && mentorInfo.workHistories.length > 0) {
                const formattedWorkHistory = mentorInfo.workHistories.map((exp: any) => ({
                  id: exp.id || Date.now(),
                  company: exp.company || '',
                  role: exp.roleName || '',
                  startDate: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : '',
                  endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : '',
                  present: !exp.endDate
                }));
                setWorkExperiences(formattedWorkHistory);
              }
              if (mentorInfo.kycDocuments && Array.isArray(mentorInfo.kycDocuments)) {
                const formattedKyc = mentorInfo.kycDocuments.map((doc: any) => ({
                  name: doc.name || doc.documentName || 'Document',
                  url: doc.url || doc.documentUrl || doc
                }));
                setKycDocuments(formattedKyc);
              }
              if (mentorInfo.schedule && typeof mentorInfo.schedule === 'object') {
                const formattedSchedule: WeeklySchedule = {};
                Object.entries(mentorInfo.schedule).forEach(([day, slots]) => {
                  const normalizedDay = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
                  if (Array.isArray(slots)) {
                    formattedSchedule[normalizedDay] = slots.map((slot: any) => ({
                      start: slot.start ? slot.start.substring(0, 5) : "09:00",
                      end: slot.end ? slot.end.substring(0, 5) : "10:00"
                    }));
                  }
                });
                if (Object.keys(formattedSchedule).length > 0) {
                  setSchedule(formattedSchedule);
                }
              }
              if (mentorInfo.profilePicUrl) {
                setProfilePhoto(mentorInfo.profilePicUrl);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setIsFetchingData(false);
      }
    };
    fetchUserDetails();

    getFilterCountries().then((data: {id: number, name: string}[]) => setCountries(data));
  }, []);

  const [countries, setCountries] = useState<{id: number, name: string}[]>([]);
  const [universities, setUniversities] = useState<{id: number, name: string}[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string>('');

  useEffect(() => {
    if (selectedCountryId) {
      getFilterUniversities(Number(selectedCountryId)).then((data: {id: number, name: string}[]) => setUniversities(data));
    } else {
      setUniversities([]);
    }
  }, [selectedCountryId]);

  const [workExperiences, setWorkExperiences] = useState<Array<{id: number; company?: string; role?: string; startDate?: string; endDate?: string; present?: boolean;}>>([{ id: 1 }]);
  const [selectedKyc, setSelectedKyc] = useState<'id' | 'passport'>('passport');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [kycDocuments, setKycDocuments] = useState<{name: string, url: string}[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [languageInput, setLanguageInput] = useState('');
  const [countryInput, setCountryInput] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  
  const [whatsappCountryCode, setWhatsappCountryCode] = useState('US');
  const [whatsappDialCode, setWhatsappDialCode] = useState('+1');
  const [whatsappNumber, setWhatsappNumber] = useState('');

  const [dob, setDob] = useState<Date | null>(null);

  useEffect(() => {
    if (mentorData?.dateOfBirth) {
      setDob(new Date(mentorData.dateOfBirth));
    }
  }, [mentorData]);

  useEffect(() => {
    const matched = countryData.find((c: any) => c.name.toLowerCase() === countryInput.toLowerCase());
    if (matched && matched.dialCode) {
      setWhatsappCountryCode(matched.code);
      setWhatsappDialCode(matched.dialCode);
    }
  }, [countryInput]);
  
  const [superpowers, setSuperpowers] = useState<string[]>([]);
  const [superpowerInput, setSuperpowerInput] = useState('');
  const [showSuperpowerDropdown, setShowSuperpowerDropdown] = useState(false);

  const filteredCountries = countryData.filter((c: any) => c.name.toLowerCase().includes(countryInput.toLowerCase()));
  const filteredSuperpowers = superpowersData.filter((s: string) => s.toLowerCase().includes(superpowerInput.toLowerCase()) && !superpowers.includes(s));
  
  const exactCountryMatch = timezoneData.find((c: any) => c.name.toLowerCase() === countryInput.toLowerCase());
  const displayTimezones = exactCountryMatch ? [exactCountryMatch] : timezoneData;

  const [schedule, setSchedule] = useState<WeeklySchedule>({
    Monday: [{ start: '17:00', end: '18:00' }, { start: '19:00', end: '21:00' }],
    Tuesday: [{ start: '08:00', end: '09:00' }],
  });

  const addLanguage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = languageInput.trim();
      if (val && !languages.includes(val)) {
        setLanguages([...languages, val]);
      }
      setLanguageInput('');
    }
  };

  const removeLanguage = (langToRemove: string) => {
    setLanguages(languages.filter(lang => lang !== langToRemove));
  };

  const addSuperpower = (val: string) => {
    const trimmed = val.trim();
    if (trimmed && !superpowers.includes(trimmed)) {
      setSuperpowers([...superpowers, trimmed]);
    }
    setSuperpowerInput('');
    setShowSuperpowerDropdown(false);
  };

  const handleSuperpowerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSuperpower(superpowerInput);
    }
  };

  const removeSuperpower = (spToRemove: string) => {
    setSuperpowers(superpowers.filter(sp => sp !== spToRemove));
  };

  const addWorkExperience = () => {
    setWorkExperiences([...workExperiences, { id: Date.now(), present: false }]);
  };

  const removeWorkExperience = (id: number) => {
    if (workExperiences.length > 1) {
      setWorkExperiences(workExperiences.filter(exp => exp.id !== id));
    }
  };

  const togglePresent = (id: number) => {
    setWorkExperiences(workExperiences.map(exp => 
      exp.id === id ? { ...exp, present: !exp.present } : exp
    ));
  };

  const updateWorkExperienceDate = (id: number, field: 'startDate' | 'endDate', date: Date | null) => {
    setWorkExperiences(workExperiences.map(exp => 
      exp.id === id ? { ...exp, [field]: date ? format(date, "yyyy-MM-dd") : '' } : exp
    ));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const mentorDetails = {
      firstName: formData.get('firstName') || '',
      lastName: formData.get('lastName') || '',
      email: formData.get('email') || '',
      university: formData.get('university') || '',
      course: formData.get('course') || '',
      specialization: formData.get('specialization') || '',
      courseStartYear: formData.get('courseStartYear') || '',
      courseEndYear: formData.get('courseEndYear') || '',
      languages: formData.get('languages') || '',
      dob: formData.get('dob') || '',
      country: formData.get('country') || '',
      countryId: formData.get('countryId') || '',
      universityId: formData.get('universityId') || '',
      timezone: formData.get('timezone') || '',
      linkedin: formData.get('linkedin') || '',
      whatsappNumber: `${whatsappDialCode} ${whatsappNumber}`.trim()
    };

    const shortBio = formData.get('shortBio') || '';

    // Build work history array
    const workHistory = workExperiences.map(exp => {
      const isPresent = formData.get(`present_${exp.id}`) === 'on';
      return {
        id: exp.id,
        company: formData.get(`company_${exp.id}`) || '',
        role: formData.get(`role_${exp.id}`) || '',
        startDate: formData.get(`startDate_${exp.id}`) || '',
        endDate: isPresent ? new Date().toISOString().split('T')[0] : formData.get(`endDate_${exp.id}`) || '',
        present: isPresent
      };
    });

    const submitFormData = new FormData();
    submitFormData.append('firstName', mentorDetails.firstName);
    submitFormData.append('lastName', mentorDetails.lastName);
    submitFormData.append('email', mentorDetails.email);
    submitFormData.append('university', mentorDetails.university);
    submitFormData.append('course', mentorDetails.course);
    submitFormData.append('specialization', mentorDetails.specialization);
    submitFormData.append('courseStartYear', mentorDetails.courseStartYear);
    submitFormData.append('courseEndYear', mentorDetails.courseEndYear);
    submitFormData.append('languages', mentorDetails.languages);
    
    superpowers.forEach((sp, index) => {
      submitFormData.append(`superpowers[${index}]`, sp);
    });

    submitFormData.append('dob', mentorDetails.dob);
    submitFormData.append('country', mentorDetails.country);
    submitFormData.append('timezone', mentorDetails.timezone);
    submitFormData.append('linkedinUrl', mentorDetails.linkedin);
    submitFormData.append('whatsappNumber', mentorDetails.whatsappNumber);

    submitFormData.append('bio', shortBio);

    workHistory.forEach((exp, index) => {
      submitFormData.append(`workHistory[${index}].company`, exp.company);
      submitFormData.append(`workHistory[${index}].role`, exp.role);
      submitFormData.append(`workHistory[${index}].startDate`, exp.startDate);
      submitFormData.append(`workHistory[${index}].endDate`, exp.endDate);
      submitFormData.append(`workHistory[${index}].present`, exp.present.toString());
    });

    Object.entries(schedule).forEach(([day, slots]) => {
      (slots as Array<{start: string, end: string}>).forEach((slot, index) => {
        submitFormData.append(`schedule['${day}'][${index}].start`, slot.start);
        submitFormData.append(`schedule['${day}'][${index}].end`, slot.end);
      });
    });

    if (profilePhoto) {
        const res = await fetch(profilePhoto);
        const blob = await res.blob();
        submitFormData.append('profilePicUrl', blob, 'profile.jpg');
      }


    for (const doc of kycDocuments) {
      if (doc.url) {
        const res = await fetch(doc.url);
        const blob = await res.blob();
        submitFormData.append('kycDocuments', blob, doc.name);
      }
    }

    try {
      const token = Cookies.get("token") || "";

      const headers: HeadersInit = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const endpoint = process.env.NEXT_PUBLIC_MENTORS_ENDPOINT;
      if (!endpoint) throw new Error("NEXT_PUBLIC_MENTORS_ENDPOINT is not defined");

      const hasMentorRole = 
        userDetails?.role?.name?.toLowerCase() === 'mentor' || 
        (typeof userDetails?.role === 'string' && userDetails.role.toLowerCase() === 'mentor') ||
        (Array.isArray(userDetails?.roles) && userDetails.roles.some((r: any) => 
          (typeof r === 'string' && r.toLowerCase() === 'mentor') || 
          (r?.name?.toLowerCase() === 'mentor')
        ));

      const mentorId = userDetails?.mentor?.id || userDetails?.mentorId || userDetails?.id;

      const isUpdate = hasMentorRole && mentorId;
      const url = isUpdate ? `${endpoint}/${mentorId}` : endpoint;
      const method = isUpdate ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers,
        body: submitFormData
      });
      
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
      }
      
      const result = await response.json();
      if (result.token) {
        Cookies.set("token", result.token);
      }
      console.log("Successfully saved mentor profile:", result);
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving mentor profile:", error);
      alert("Failed to save profile. Please try again.");
    }
  };

  if (isFetchingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="py-16 pb-32 px-4 max-w-4xl mx-auto w-full">
        <form className="space-y-12" onSubmit={handleSubmit}>
          {/* Section 1: Personal Details */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-100 p-8 md:p-12 rounded-xl shadow-[0_32px_64px_-12px_rgba(25,27,34,0.04)]"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold font-headline text-on-surface tracking-tight">Personal Details</h2>
                <p className="text-on-surface-variant font-body mt-2">Introduce yourself to the Almatrail scholarly community.</p>
              </div>
              <button type="button" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0040A1] text-white font-bold text-sm hover:bg-[#003a8a] transition-all self-start shadow-sm shadow-blue-900/10">
                <Copy size={18} />
                <span>Copy Profile URL</span>
              </button>
            </div>

            <div className="mb-8 flex justify-center md:justify-start">
              <ProfilePhotoUpload photo={profilePhoto} onPhotoChange={setProfilePhoto} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">First Name</label>
                <input 
                  name="firstName"
                  className="bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none" 
                  placeholder="e.g. Julian" 
                  type="text"
                  defaultValue={mentorData?.user?.firstName || userDetails?.firstName || ''}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Last Name</label>
                <input 
                  name="lastName"
                  className="bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none" 
                  placeholder="e.g. Thorne" 
                  type="text"
                  defaultValue={mentorData?.user?.lastName || userDetails?.lastName || ''}
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Languages Known</label>
                {languages.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {languages.map(lang => (
                      <div key={lang} className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        <span>{lang}</span>
                        <button type="button" onClick={() => removeLanguage(lang)} className="hover:text-primary/80 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <input 
                  className="bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none" 
                  placeholder="Type a language and press Enter" 
                  type="text"
                  value={languageInput}
                  onChange={(e) => setLanguageInput(e.target.value)}
                  onKeyDown={addLanguage}
                />
                <input type="hidden" name="languages" value={languages.join(' ')} />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2 relative">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Mentorship Superpowers</label>
                {superpowers.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {superpowers.map(sp => (
                      <div key={sp} className="flex items-center gap-1 bg-tertiary/10 text-tertiary px-3 py-1 rounded-full text-sm font-medium">
                        <span>{sp}</span>
                        <button type="button" onClick={() => removeSuperpower(sp)} className="hover:text-tertiary/80 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="relative">
                  <input 
                    className="w-full bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none" 
                    placeholder="Search or type a superpower and press Enter" 
                    type="text"
                    value={superpowerInput}
                    onChange={(e) => {
                      setSuperpowerInput(e.target.value);
                      setShowSuperpowerDropdown(true);
                    }}
                    onFocus={() => setShowSuperpowerDropdown(true)}
                    onBlur={() => setTimeout(() => setShowSuperpowerDropdown(false), 200)}
                    onKeyDown={handleSuperpowerKeyDown}
                  />
                  {showSuperpowerDropdown && (filteredSuperpowers.length > 0 || superpowerInput) && (
                    <div className="absolute z-50 top-[100%] left-0 w-full mt-1 bg-white border border-outline-variant/20 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                      {filteredSuperpowers.map((sp: string) => (
                        <div 
                          key={sp} 
                          className="px-4 py-2 text-sm text-on-surface hover:bg-primary/10 cursor-pointer transition-colors"
                          onClick={() => {
                            addSuperpower(sp);
                          }}
                        >
                          {sp}
                        </div>
                      ))}
                      {filteredSuperpowers.length === 0 && superpowerInput && (
                        <div 
                          className="px-4 py-2 text-sm text-on-surface hover:bg-primary/10 cursor-pointer transition-colors italic"
                          onClick={() => {
                            addSuperpower(superpowerInput);
                          }}
                        >
                          Add "{superpowerInput}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Date of Birth</label>
                <div className="relative group [&>div>div>input]:pl-10 [&>div>div>input]:bg-surface-container-low [&>div>div>input]:border-none [&>div>div>input]:focus:ring-2 [&>div>div>input]:focus:ring-primary/20 [&>div>div>input]:rounded-lg [&>div>div>input]:p-3">
                  <Datepicker 
                    maxDate={new Date()}
                    minDate={new Date(1950, 0, 1)}
                    defaultValue={new Date(2000, 0, 1)}
                    value={dob ? new Date(dob) : null}
                    onChange={(date) => setDob(date ? new Date(date) : null)}
                    icon={() => null}
                  />
                  <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors pointer-events-none z-10" />
                  <input type="hidden" name="dob" value={dob ? format(dob, "yyyy-MM-dd") : ""} />
                </div>
              </div>
              <div className="flex flex-col gap-2 md:col-span-1 relative">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Country</label>
                <div className="relative">
                  <input 
                    className="w-full bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all pl-10 outline-none" 
                    placeholder="Search country..." 
                    type="text"
                    value={countryInput}
                    onChange={(e) => {
                      setCountryInput(e.target.value);
                      setShowCountryDropdown(true);
                    }}
                    onFocus={() => setShowCountryDropdown(true)}
                    onBlur={() => setTimeout(() => setShowCountryDropdown(false), 200)}
                  />
                  <input type="hidden" name="country" value={countryInput} />
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
                </div>
                  {showCountryDropdown && filteredCountries.length > 0 && (
                  <div className="absolute z-50 top-[100%] left-0 w-full mt-1 bg-white border border-outline-variant/20 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                    {filteredCountries.map((c: any) => (
                      <div 
                        key={c.code} 
                        className="px-4 py-2 text-sm text-on-surface hover:bg-primary/10 cursor-pointer transition-colors"
                        onClick={() => {
                          setCountryInput(c.name);
                          setShowCountryDropdown(false);
                        }}
                      >
                        {c.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 md:col-span-1">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Timezone</label>
                <div className="relative">
                  <select 
                    name="timezone"
                    className="w-full bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none appearance-none" 
                    defaultValue={mentorData?.timezone || ''}
                  >
                    <option value="" disabled>Select your timezone</option>
                    {displayTimezones.map((country, idx) => (
                      <optgroup key={idx} label={country.name}>
                        {country.timezones.map((tz: any, tzIdx: number) => (
                          <option key={tzIdx} value={tz.zone}>
                            {tz.name} (UTC{tz.utc_offset})
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-2 md:col-span-1">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">WhatsApp Number</label>
                <div className="flex gap-2">
                  <select 
                    value={whatsappCountryCode}
                    onChange={(e) => {
                      const selectedCode = e.target.value;
                      setWhatsappCountryCode(selectedCode);
                      const matched = countryData.find((c: any) => c.code === selectedCode);
                      if (matched) {
                        setWhatsappDialCode(matched.dialCode);
                      }
                    }}
                    className="w-1/3 bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none appearance-none"
                  >
                    {countryData.map((c: any) => (
                      <option key={c.code} value={c.code}>{c.code} ({c.dialCode})</option>
                    ))}
                  </select>
                  <input 
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-2/3 bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none" 
                    placeholder="e.g. 9876543210"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 md:col-span-1">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">LinkedIn Profile Link</label>
                <input 
                  name="linkedin"
                  className="bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none" 
                  placeholder="https://linkedin.com/in/username" 
                  type="url"
                  defaultValue={mentorData?.linkedinUrl || ''}
                />
              </div>
            </div>
          </motion.section>

          {/* Section 2: Academic Details */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-100 p-8 md:p-12 rounded-xl shadow-[0_32px_64px_-12px_rgba(25,27,34,0.04)]"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-headline text-on-surface tracking-tight">Academic Details</h2>
              <p className="text-on-surface-variant font-body mt-2">Provide your educational background.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Institutional Email</label>
                <input 
                  name="email"
                  className="bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none" 
                  placeholder="j.thorne@university.edu" 
                  type="email"
                  defaultValue={mentorData?.user?.email || userDetails?.email || ''}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">College / University Name</label>
                <input 
                  name="university"
                  className="bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none" 
                  placeholder="e.g. Stanford University" 
                  type="text"
                  defaultValue={mentorData?.university?.name || ''}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Course Completed / In-Progress</label>
                <input 
                  name="course"
                  className="bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none" 
                  placeholder="e.g. MS" 
                  type="text"
                  defaultValue={mentorData?.course || ''}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Specialization</label>
                <input 
                  name="specialization"
                  className="bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none" 
                  placeholder="e.g. Computer Science" 
                  type="text"
                  defaultValue={mentorData?.specialization || ''}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Course Start Year</label>
                <div className="relative">
                  <select 
                    name="courseStartYear"
                    className="w-full bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none appearance-none" 
                    defaultValue={mentorData?.courseStartYear || ''}
                  >
                    <option value="" disabled>Select start year</option>
                    {Array.from({ length: 40 }, (_, i) => new Date().getFullYear() - 30 + i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Course End Year</label>
                <div className="relative">
                  <select 
                    name="courseEndYear"
                    className="w-full bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none appearance-none" 
                    defaultValue={mentorData?.courseEndYear || ''}
                  >
                    <option value="" disabled>Select end year</option>
                    <option value="In-Progress">In-Progress</option>
                    {Array.from({ length: 45 }, (_, i) => new Date().getFullYear() - 30 + i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 3: Bio About Me */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-100 p-8 md:p-12 rounded-xl shadow-[0_32px_64px_-12px_rgba(25,27,34,0.04)]"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-headline text-on-surface tracking-tight">Bio About Me</h2>
              <p className="text-on-surface-variant font-body mt-2">Tell students about your background, experience, and what makes you a great mentor.</p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Short Bio</label>
              <textarea 
                name="shortBio"
                className="bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-4 font-body text-on-surface min-h-[120px] transition-all outline-none resize-none" 
                placeholder="Write a brief introduction about yourself..."
                defaultValue={mentorData?.bio || ''}
              ></textarea>
            </div>
          </motion.section>

          {/* Section 3: Work History */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-100 p-8 md:p-12 rounded-xl"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-headline text-on-surface tracking-tight">Work History</h2>
              <p className="text-on-surface-variant font-body mt-2">Detail your professional journey.</p>
            </div>
            <div className="space-y-12">
              <AnimatePresence mode="popLayout">
                {workExperiences.map((exp, index) => (
                  <motion.div 
                    key={exp.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative"
                  >
                    {index > 0 && (
                      <button 
                        type="button"
                        onClick={() => removeWorkExperience(exp.id)}
                        className="absolute -top-4 -right-4 p-1 rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-error transition-colors shadow-sm"
                      >
                        <X size={16} />
                      </button>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Company / Organization</label>
                        <input 
                          name={`company_${exp.id}`}
                          className="bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none" 
                          placeholder="e.g. Tech University Research" 
                          type="text"
                          defaultValue={(exp as any).company || ''}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Role</label>
                        <input 
                          name={`role_${exp.id}`}
                          className="bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none" 
                          placeholder="e.g. Principal Investigator" 
                          type="text"
                          defaultValue={(exp as any).role || ''}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Start Date</label>
                          <div className="relative group [&>div>div>input]:pl-10 [&>div>div>input]:bg-surface-container-lowest [&>div>div>input]:border-none [&>div>div>input]:focus:ring-2 [&>div>div>input]:focus:ring-primary/20 [&>div>div>input]:rounded-lg [&>div>div>input]:p-3">
                            <Datepicker 
                              maxDate={new Date()}
                              value={(exp as any).startDate ? new Date((exp as any).startDate) : null}
                              onChange={(date) => updateWorkExperienceDate(exp.id, 'startDate', date || null)}
                              icon={() => null}
                            />
                            <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors pointer-events-none z-10" />
                            <input type="hidden" name={`startDate_${exp.id}`} value={(exp as any).startDate || ""} />
                          </div>
                        </div>
                        {!exp.present && (
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">End Date</label>
                            <div className="relative group [&>div>div>input]:pl-10 [&>div>div>input]:bg-surface-container-lowest [&>div>div>input]:border-none [&>div>div>input]:focus:ring-2 [&>div>div>input]:focus:ring-primary/20 [&>div>div>input]:rounded-lg [&>div>div>input]:p-3">
                              <Datepicker 
                                maxDate={new Date()}
                                minDate={(exp as any).startDate ? new Date((exp as any).startDate) : undefined}
                                value={(exp as any).endDate ? new Date((exp as any).endDate) : null}
                                onChange={(date) => updateWorkExperienceDate(exp.id, 'endDate', date || null)}
                                icon={() => null}
                              />
                              <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors pointer-events-none z-10" />
                              <input type="hidden" name={`endDate_${exp.id}`} value={(exp as any).endDate || ""} />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3 md:pt-8">
                        <input 
                          name={`present_${exp.id}`}
                          className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 cursor-pointer" 
                          id={`present-check-${exp.id}`} 
                          type="checkbox"
                          checked={exp.present}
                          onChange={() => togglePresent(exp.id)}
                        />
                        <label className="text-sm font-medium text-on-surface cursor-pointer" htmlFor={`present-check-${exp.id}`}>
                          I currently work here
                        </label>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <button 
                type="button"
                onClick={addWorkExperience}
                className="flex items-center gap-2 text-primary font-bold text-sm hover:underline transition-all"
              >
                <PlusCircle size={20} />
                <span>Add another work experience</span>
              </button>
            </div>
          </motion.section>

          {/* Section 4: Weekly Availability */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-100 p-8 md:p-12 rounded-xl shadow-[0_32px_64px_-12px_rgba(25,27,34,0.04)]"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-headline text-on-surface tracking-tight">Weekly Availability</h2>
              <p className="text-on-surface-variant font-body mt-2">Set your standard mentoring hours (UTC+0).</p>
            </div>
            <SchedulePicker schedule={schedule} onChange={setSchedule} />
          </motion.section>

          {/* Section 5: KYC Verification */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-100 p-8 md:p-12 rounded-xl shadow-[0_32px_64px_-12px_rgba(25,27,34,0.04)]"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-headline text-on-surface tracking-tight">KYC Verification</h2>
              <p className="text-on-surface-variant font-body mt-2">Upload documents supporting the fact that you graduated or are studying in the university mentioned by you.</p>
            </div>
            <div className="flex flex-col">
              <DocumentUpload 
                documents={kycDocuments} 
                onAdd={(doc) => setKycDocuments([...kycDocuments, doc])} 
                onRemove={(i) => setKycDocuments(kycDocuments.filter((_, index) => index !== i))}
                title="Upload University Documents"
              />
            </div>
            <div className="mt-6 p-4 rounded-lg bg-tertiary-fixed/30 flex gap-4 items-start">
              <Info className="text-tertiary shrink-0" size={20} />
              <p className="text-xs text-on-surface-variant font-body leading-relaxed">
                Your documents are encrypted and stored in compliance with academic privacy standards. Only Almatrail verification curators have access to this data.
              </p>
            </div>
          </motion.section>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-6 pt-8 border-t border-outline-variant/20">
            <button type="submit" className="w-full md:w-auto px-10 py-4 rounded-lg bg-[#0040A1] text-white font-headline font-bold text-lg hover:bg-[#003a8a] active:scale-[0.98] transition-all shadow-xl shadow-blue-900/15">
              Save & Continue
            </button>
            <button type="button" className="w-full md:w-auto px-10 py-4 rounded-lg bg-surface-container-high text-on-surface-variant font-headline font-semibold text-lg hover:bg-surface-container-highest active:scale-[0.98] transition-all">
              Cancel
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low py-12 px-8 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
          <span className="font-headline font-bold text-on-surface text-lg">Almatrail Editorial Mentorship</span>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-on-surface-variant font-body text-sm hover:text-primary underline underline-offset-4 transition-colors" href="#">Honor Code</a>
            <a className="text-on-surface-variant font-body text-sm hover:text-primary underline underline-offset-4 transition-colors" href="#">Academic Privacy</a>
            <a className="text-on-surface-variant font-body text-sm hover:text-primary underline underline-offset-4 transition-colors" href="#">Curator Terms</a>
          </div>
          <p className="text-on-surface-variant font-body text-sm tracking-wide">
            © 2026 Almatrail Editorial Mentorship. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}