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
// import "../globals.css";

export default function App() {
  const [userDetails, setUserDetails] = useState<any>(null);

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
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  const [workExperiences, setWorkExperiences] = useState([{ id: 1, present: false }]);
  const [selectedKyc, setSelectedKyc] = useState<'id' | 'passport'>('passport');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [kycDocuments, setKycDocuments] = useState<{name: string, url: string}[]>([]);
  const [schedule, setSchedule] = useState<WeeklySchedule>({
    Monday: [{ start: '17:00', end: '18:00' }, { start: '19:00', end: '21:00' }],
    Tuesday: [{ start: '08:00', end: '09:00' }],
  });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const personalDetails = {
      firstName: formData.get('firstName') || '',
      lastName: formData.get('lastName') || '',
      email: formData.get('email') || '',
      university: formData.get('university') || '',
      course: formData.get('course') || '',
      languages: formData.get('languages') || '',
      dob: formData.get('dob') || '',
      country: formData.get('country') || '',
      timezone: formData.get('timezone') || '',
      linkedin: formData.get('linkedin') || ''
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
    submitFormData.append('personalDetails.firstName', personalDetails.firstName);
    submitFormData.append('personalDetails.lastName', personalDetails.lastName);
    submitFormData.append('personalDetails.email', personalDetails.email);
    submitFormData.append('personalDetails.university', personalDetails.university);
    submitFormData.append('personalDetails.course', personalDetails.course);
    submitFormData.append('personalDetails.languages', personalDetails.languages);
    submitFormData.append('personalDetails.dob', personalDetails.dob);
    submitFormData.append('personalDetails.country', personalDetails.country);
    submitFormData.append('personalDetails.timezone', personalDetails.timezone);
    submitFormData.append('personalDetails.linkedin', personalDetails.linkedin);

    submitFormData.append('shortBio', shortBio);

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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 glass-header border-b border-outline-variant/20">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <span className="text-2xl font-bold tracking-tighter text-primary font-headline">Almatrail</span>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-on-surface-variant tracking-wider uppercase hidden sm:block">
              Mentor Onboarding
            </span>
            <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-primary/10">
              <img 
                alt="Professional headshot" 
                className="w-full h-full object-cover" 
                src="https://picsum.photos/seed/mentor/100/100"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-32 px-4 max-w-4xl mx-auto w-full">
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
              <button type="button" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-fixed text-on-primary-fixed font-bold text-sm hover:bg-primary-fixed/80 transition-all self-start">
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
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Last Name</label>
                <input 
                  name="lastName"
                  className="bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none" 
                  placeholder="e.g. Thorne" 
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Institutional Email</label>
                <input 
                  name="email"
                  className="bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none" 
                  placeholder="j.thorne@university.edu" 
                  type="email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">College / University Name</label>
                <input 
                  name="university"
                  className="bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none" 
                  placeholder="e.g. Stanford University" 
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Course Completed / In-Progress</label>
                <input 
                  name="course"
                  className="bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none" 
                  placeholder="e.g. MS in Computer Science" 
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Languages Known (comma separated)</label>
                <input 
                  name="languages"
                  className="bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none" 
                  placeholder="e.g. English, Spanish, French" 
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Date of Birth</label>
                <div className="relative group">
                  <input 
                    name="dob"
                    className="w-full bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 pl-10 font-body text-on-surface transition-all outline-none appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer" 
                    type="date"
                  />
                  <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-2 md:col-span-1">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Country</label>
                <div className="relative">
                  <input 
                    name="country"
                    className="w-full bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all pl-10 outline-none" 
                    placeholder="London, United Kingdom" 
                    type="text"
                  />
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                </div>
              </div>
              <div className="flex flex-col gap-2 md:col-span-1">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Timezone</label>
                <div className="relative">
                  <select 
                    name="timezone"
                    className="w-full bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none appearance-none" 
                    defaultValue=""
                  >
                    <option value="" disabled>Select your timezone</option>
                    {timezoneData.map((country, idx) => (
                      <optgroup key={idx} label={country.name}>
                        {country.timezones.map((tz, tzIdx) => (
                          <option key={tzIdx} value={tz.zone}>
                            {tz.name} ({tz.utc_offset})
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">LinkedIn Profile Link</label>
                <input 
                  name="linkedin"
                  className="bg-surface-container-low border-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none" 
                  placeholder="https://linkedin.com/in/username" 
                  type="url"
                />
              </div>
            </div>
          </motion.section>

          {/* Section 2: Bio About Me */}
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
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Role</label>
                        <input 
                          name={`role_${exp.id}`}
                          className="bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 rounded-lg p-3 font-body text-on-surface transition-all outline-none" 
                          placeholder="e.g. Principal Investigator" 
                          type="text"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">Start Date</label>
                          <div className="relative group">
                            <input 
                              name={`startDate_${exp.id}`}
                              className="w-full bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 rounded-lg p-3 pl-10 font-body text-on-surface transition-all outline-none appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer" 
                              type="date"
                            />
                            <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors pointer-events-none" />
                          </div>
                        </div>
                        {!exp.present && (
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold font-headline text-on-surface-variant tracking-widest uppercase">End Date</label>
                            <div className="relative group">
                              <input 
                                name={`endDate_${exp.id}`}
                                className="w-full bg-surface-container-lowest border-none focus:ring-2 focus:ring-primary/20 rounded-lg p-3 pl-10 font-body text-on-surface transition-all outline-none appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer" 
                                type="date"
                              />
                              <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors pointer-events-none" />
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
            <button type="submit" className="w-full md:w-auto px-10 py-4 rounded-lg bg-gradient-to-r from-primary to-primary-container text-white font-headline font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20">
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