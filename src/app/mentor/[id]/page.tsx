"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { 
  Star, 
  CheckCircle2, 
  School, 
  MapPin, 
  PlaneTakeoff, 
  FileText, 
  Code, 
  Brain, 
  Briefcase, 
  Mail, 
  ShieldCheck,
  Bell,
  Settings,
  Loader
} from "lucide-react";
import { useRouter } from "next/navigation";

interface MentorData {
  avgRating: number | null;
  bio: string;
  country: string;
  course: string | null;
  courses: Array<{
    college: string | null;
    courseMajor: string;
    courseName: string;
    endDate: string | null;
    id: number;
    startDate: string | null;
  }>;
  dateOfBirth: string;
  halfHourSessionPrice: number;
  id: number;
  kycStatus: string | null;
  linkedinUrl: string;
  oneHourSessionPrice: number;
  profilePicUrl: string;
  specialization: string | null;
  superpowers: string | null;
  timezone: string;
  totalSessions: number | null;
  university: {
    id: number;
    name: string;
    cardImage: string;
    country: string;
    description: string;
    globalRank: number;
    heroImage: string;
    isTop: boolean;
    location: string;
    mentorsCount: number;
    studentsCount: number;
    tag: string;
  };
  user: {
    email: string;
    emailVerified: boolean;
    firstName: string;
    id: number;
    lastName: string;
    roles: string[];
  };
  workHistories: Array<{
    company: string;
    endDate: string;
    id: number;
    location: string | null;
    roleName: string;
    startDate: string;
  }>;
}

export default function MentorProfile() {
  const router = useRouter();
  const params = useParams();
  const mentorId = params.id as string;
  const [mentorData, setMentorData] = useState<MentorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<30 | 60>(30);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        setLoading(true);
        const endpoint = `${process.env.NEXT_PUBLIC_MENTORS_ENDPOINT}/${mentorId}`;
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch mentor data: ${response.status}`);
        }
        
        const data = await response.json();
        setMentorData(data);
      } catch (err) {
        console.error("Error fetching mentor data:", err);
        setError(err instanceof Error ? err.message : "Failed to load mentor data");
      } finally {
        setLoading(false);
      }
    };

    if (mentorId) {
      fetchMentorData();
    }
  }, [mentorId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface font-body text-on-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="animate-spin" size={40} />
          <p className="text-on-surface-variant">Loading mentor profile...</p>
        </div>
      </div>
    );
  }

  if (error || !mentorData) {
    return (
      <div className="min-h-screen bg-surface font-body text-on-surface flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-bold text-error mb-4">{error || "Mentor not found"}</p>
          <button 
            onClick={() => router.back()}
            className="px-6 py-2 bg-primary text-on-primary rounded-lg font-bold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const fullName = `${mentorData.user.firstName} ${mentorData.user.lastName}`;
  const firstCourse = mentorData.courses?.[0];
  const rating = mentorData.avgRating || 4.8;
  const selectedPrice = selectedDuration === 30 ? mentorData.halfHourSessionPrice : mentorData.oneHourSessionPrice;
  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 frosted-nav shadow-sm h-16 flex justify-between items-center px-8 max-w-full">
        <div className="flex items-center gap-12">
          <span className="text-2xl font-bold tracking-tighter text-blue-900">Almatrail</span>
          <div className="hidden md:flex gap-8 items-center">
            <a className="font-headline text-sm font-medium tracking-tight text-slate-600 hover:text-blue-600 transition-all duration-300" href="#">Discover</a>
            <a className="font-headline text-sm font-semibold tracking-tight text-blue-700 border-b-2 border-blue-700 pb-1" href="#">My Mentors</a>
            <a className="font-headline text-sm font-medium tracking-tight text-slate-600 hover:text-blue-600 transition-all duration-300" href="#">Library</a>
            <a className="font-headline text-sm font-medium tracking-tight text-slate-600 hover:text-blue-600 transition-all duration-300" href="#">Resources</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-blue-50/50 transition-all text-slate-600">
            <Bell size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-blue-50/50 transition-all text-slate-600">
            <Settings size={20} />
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant/15">
            <img 
              alt="User profile avatar" 
              className="w-full h-full object-cover" 
              src="https://picsum.photos/seed/mentor-user/100/100"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 pt-28 pb-20">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Column: Content */}
          <div className="flex-1 space-y-12">
            {/* Profile Header Section */}
            <section className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="relative">
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-full p-1 bg-gradient-to-tr from-primary to-primary-container">
                  <img 
                    alt={fullName} 
                    className="w-full h-full rounded-full object-cover border-4 border-surface" 
                    src={mentorData.profilePicUrl || `https://picsum.photos/seed/${mentorData.user.id}/400/400`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${mentorData.user.id}/400/400`;
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute bottom-2 right-2 flex items-center justify-center">
                  <span className="absolute w-4 h-4 bg-primary-fixed-dim rounded-full connection-pulse"></span>
                  <span className="relative w-4 h-4 bg-primary rounded-full border-2 border-surface"></span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface">{fullName}</h1>
                  {mentorData.kycStatus && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-primary-fixed text-on-primary-fixed text-[10px] font-bold uppercase tracking-wider rounded-full">
                      <CheckCircle2 size={12} className="fill-current" />
                      Verified Mentor
                    </div>
                  )}
                  {mentorData.kycStatus && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold uppercase tracking-wider rounded-full">
                      KYC
                    </div>
                  )}
                </div>
                <p className="text-xl font-headline font-semibold text-primary">{mentorData.user.roles.includes("MENTOR") ? "Mentor" : "User"}</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-on-surface-variant font-medium">
                  {mentorData.university && (
                    <div className="flex items-center gap-2">
                      <img 
                        alt={mentorData.university.name} 
                        className="w-5 h-5 object-contain" 
                        src="https://picsum.photos/seed/university/40/40"
                        referrerPolicy="no-referrer"
                      />
                      <span>{mentorData.university.name}</span>
                    </div>
                  )}
                  {firstCourse && (
                    <div className="flex items-center gap-2">
                      <School size={18} />
                      <span>{firstCourse.courseName} {firstCourse.courseMajor}, {firstCourse.endDate || "In Progress"}</span>
                    </div>
                  )}
                  {mentorData.country && (
                    <div className="flex items-center gap-2">
                      <MapPin size={18} />
                      <span>{mentorData.country}</span>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Stats Bento Grid */}
            <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {[
                        { label: "Rating", value: rating.toFixed(1), icon: <Star size={20} className="fill-current" />, color: "text-primary" },
                        { label: "Reviews", value: "124" },
                        { label: "Sessions", value: mentorData.totalSessions ? `${mentorData.totalSessions}+` : "0" },
                        { label: "Resp. Time", value: "< 2h" }
                    ].map((stat, i) => (
                  <div key={i} className="bg-surface-container-low p-6 rounded-xl space-y-1">
                  <div className={`flex items-center gap-1 ${stat.color || "text-on-surface"}`}>
                    <span className="text-2xl font-bold">{stat.value}</span>
                    {stat.icon}
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{stat.label}</p>
                </div>
              ))}
            </section>

            {/* About Section */}
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">About {mentorData.user.firstName}</h2>
              <div className="relative">
                <p className="text-lg leading-relaxed text-on-surface-variant max-w-3xl">
                  {mentorData.bio}
                </p>
                {mentorData.bio && mentorData.bio.length > 300 && (
                  <button className="mt-2 text-primary font-bold hover:underline underline-offset-4 decoration-2 transition-all">Read More</button>
                )}
              </div>
            </section>

            {/* Topics Section */}
            <section className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">What You Can Ask Me</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "O-1 & H-1B Visa Strategies", desc: "Navigating the legal landscape for international tech talent.", icon: <PlaneTakeoff size={20} /> },
                  { title: "Resume & Portfolio Audit", desc: "Crafting an application that passes the 6-second recruiter test.", icon: <FileText size={20} /> },
                  { title: "System Design Interviews", desc: "Breaking down complex architectures for senior-level roles.", icon: <Code size={20} /> },
                  { title: "Career Pivoting", desc: "Moving from academia or startup environments to Big Tech.", icon: <Brain size={20} /> }
                ].map((topic, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low/50">
                    <span className="text-primary mt-1">{topic.icon}</span>
                    <div>
                      <h4 className="font-bold text-on-surface">{topic.title}</h4>
                      <p className="text-sm text-on-surface-variant">{topic.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience & Education Section */}
            <section className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Work History</h2>
                  <div className="space-y-8">
                    {mentorData.workHistories && mentorData.workHistories.length > 0 ? (
                      mentorData.workHistories.map((job) => (
                        <div key={job.id} className="flex gap-4">
                          <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0 text-on-surface-variant">
                            <Briefcase size={20} />
                          </div>
                          <div className="space-y-1">
                            <p className="font-headline font-bold text-on-surface leading-tight">{job.roleName}</p>
                            <p className="text-sm text-on-surface-variant">
                              {job.company} • {new Date(job.startDate).getFullYear()} — {job.endDate ? new Date(job.endDate).getFullYear() : "Present"}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-on-surface-variant">No work history available</p>
                    )}
                  </div>
                </div>
                <div className="space-y-6">
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Education</h2>
                  <div className="space-y-8">
                    {firstCourse ? (
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0 text-on-surface-variant">
                          <School size={20} />
                        </div>
                        <div className="space-y-1">
                          <p className="font-headline font-bold text-on-surface leading-tight">{firstCourse.courseName} {firstCourse.courseMajor}</p>
                          <p className="text-sm text-on-surface-variant">
                            {firstCourse.college || mentorData.university?.name || "Unknown University"} • {firstCourse.endDate ? new Date(firstCourse.endDate).getFullYear() : (firstCourse.startDate ? new Date(firstCourse.startDate).getFullYear() : "N/A")}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-on-surface-variant">No education details available</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Booking Panel (Sticky) */}
          <aside className="w-full lg:w-96 lg:sticky lg:top-28">
            <div className="bg-surface-container-lowest p-8 rounded-2xl ambient-shadow border border-outline-variant/10 space-y-8">
              <div className="bg-primary-fixed px-3 py-1.5 rounded-lg w-fit">
                <p className="text-[10px] font-black text-primary uppercase">Top Mentor</p>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Select Duration</p>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setSelectedDuration(30)}
                    className={`px-4 py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                      selectedDuration === 30 
                        ? 'border-primary text-primary bg-blue-50/50' 
                        : 'border-outline-variant/20 text-on-surface-variant hover:border-primary/50'
                    }`}
                  >
                    30 Minutes
                  </button>
                  <button 
                    onClick={() => setSelectedDuration(60)}
                    className={`px-4 py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                      selectedDuration === 60 
                        ? 'border-primary text-primary bg-blue-50/50' 
                        : 'border-outline-variant/20 text-on-surface-variant hover:border-primary/50'
                    }`}
                  >
                    60 Minutes
                  </button>
                </div>
                <div className="pt-2">
                  <p className="text-lg font-headline font-bold text-on-surface">
                    Session Cost: <span className="text-2xl font-black">${selectedPrice}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Availability</p>
                  <a className="text-[10px] font-bold text-primary hover:underline" href="#">Full Calendar</a>
                </div>
                <div className="flex gap-2">
                  {[
                    { day: "MON", date: "14", active: true },
                    { day: "TUE", date: "15", active: false },
                    { day: "WED", date: "16", active: true, selected: true },
                    { day: "THU", date: "17", active: false }
                  ].map((d, i) => (
                    <div key={i} className={`flex-1 flex flex-col items-center p-3 rounded-xl bg-surface-container-low gap-1 ${d.selected ? "border-2 border-primary/20" : ""}`}>
                      <span className="text-[10px] font-bold text-on-surface-variant">{d.day}</span>
                      <span className="text-sm font-bold text-on-surface">{d.date}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${d.active ? "bg-primary" : "bg-outline-variant"}`}></span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push(`/mentor/${mentorData.id}/book`)}
                  className="w-full py-4 bg-primary text-white font-bold rounded-xl text-lg transition-all shadow-lg shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
                >
                  Book a Session
                </motion.button>
                <button className="w-full py-4 bg-surface-container-high text-on-secondary-container font-bold rounded-xl text-lg hover:bg-surface-container-highest transition-all flex items-center justify-center gap-2">
                  <Mail size={20} />
                  Message {mentorData.user.firstName}
                </button>
              </div>

              <div className="pt-6 border-t border-outline-variant/15">
                <div className="flex items-center gap-3 text-on-surface-variant">
                  <ShieldCheck size={20} className="text-primary" />
                  <p className="text-xs font-medium">100% Satisfaction Guarantee or Full Refund within 24h.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}