"use client";
import { motion } from "framer-motion";
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
  Settings
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function MentorProfile() {
  const router = useRouter();
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
                    alt="Elena Rodriguez" 
                    className="w-full h-full rounded-full object-cover border-4 border-surface" 
                    src="https://picsum.photos/seed/elena-rodriguez/400/400"
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
                  <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface">Elena Rodriguez</h1>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-primary-fixed text-on-primary-fixed text-[10px] font-bold uppercase tracking-wider rounded-full">
                    <CheckCircle2 size={12} className="fill-current" />
                    Verified Mentor
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold uppercase tracking-wider rounded-full">
                    KYC
                  </div>
                </div>
                <p className="text-xl font-headline font-semibold text-primary">Senior Software Engineer at Google</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-on-surface-variant font-medium">
                  <div className="flex items-center gap-2">
                    <img 
                      alt="Stanford Logo" 
                      className="w-5 h-5 object-contain" 
                      src="https://picsum.photos/seed/stanford/40/40"
                      referrerPolicy="no-referrer"
                    />
                    <span>Stanford University</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <School size={18} />
                    <span>M.S. Computer Science, 2018</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>Mountain View, CA</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Bento Grid */}
            <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {[
                        { label: "Rating", value: "4.8", icon: <Star size={20} className="fill-current" />, color: "text-primary" },
                        { label: "Reviews", value: "124" },
                        { label: "Sessions", value: "450+" },
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
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">About Elena</h2>
              <div className="relative">
                <p className="text-lg leading-relaxed text-on-surface-variant max-w-3xl">
                  Passionate about scaling distributed systems and helping early-career engineers navigate the complexities of Big Tech. With over 6 years at Google, I've mentored 50+ interns and new grads, focusing on technical excellence and career strategic planning. My journey from a first-generation student to a Senior Engineer has taught me that the right guidance can change everything.
                </p>
                <button className="mt-2 text-primary font-bold hover:underline underline-offset-4 decoration-2 transition-all">Read More</button>
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
                    {[
                      { title: "Senior Software Engineer", sub: "Google • 2021 — Present" },
                      { title: "Software Engineer II", sub: "Google • 2018 — 2021" }
                    ].map((job, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0 text-on-surface-variant">
                          <Briefcase size={20} />
                        </div>
                        <div className="space-y-1">
                          <p className="font-headline font-bold text-on-surface leading-tight">{job.title}</p>
                          <p className="text-sm text-on-surface-variant">{job.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Education</h2>
                  <div className="space-y-8">
                    {[
                      { title: "M.S. Computer Science", sub: "Stanford University • 2018" },
                      { title: "B.S. Software Engineering", sub: "UC Berkeley • 2016" }
                    ].map((edu, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0 text-on-surface-variant">
                          <School size={20} />
                        </div>
                        <div className="space-y-1">
                          <p className="font-headline font-bold text-on-surface leading-tight">{edu.title}</p>
                          <p className="text-sm text-on-surface-variant">{edu.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Booking Panel (Sticky) */}
          <aside className="w-full lg:w-96 lg:sticky lg:top-28">
            <div className="bg-surface-container-lowest p-8 rounded-2xl ambient-shadow border border-outline-variant/10 space-y-8">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Price per session</p>
                  <h3 className="text-3xl font-headline font-black text-on-surface">$120</h3>
                </div>
                <div className="bg-primary-fixed px-3 py-1.5 rounded-lg">
                  <p className="text-[10px] font-black text-primary uppercase">Top Mentor</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Select Duration</p>
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-3 rounded-xl border-2 border-primary text-primary font-bold text-sm bg-blue-50/50 transition-all">30 Minutes</button>
                  <button className="px-4 py-3 rounded-xl border-2 border-outline-variant/20 text-on-surface-variant font-bold text-sm hover:border-primary/50 transition-all">60 Minutes</button>
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
                  onClick={() => router.push("/sessionBooking")}
                  className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-xl text-lg transition-all shadow-lg shadow-primary/20"
                >
                  Book a Session
                </motion.button>
                <button className="w-full py-4 bg-surface-container-high text-on-secondary-container font-bold rounded-xl text-lg hover:bg-surface-container-highest transition-all flex items-center justify-center gap-2">
                  <Mail size={20} />
                  Message Elena
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