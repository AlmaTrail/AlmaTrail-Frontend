"use client";
import {
  Search,
  Bell,
  Calendar,
  Clock,
  ExternalLink,
  Settings,
  ChevronRight,
  Menu,
} from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types for our data
interface Session {
  id: string;
  studentName: string;
  studentAvatar: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  status: "active" | "upcoming";
}

const UPCOMING_SESSIONS: Session[] = [
  {
    id: "1",
    studentName: "Elena Rodriguez",
    studentAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    date: "Monday, Oct 24",
    time: "5:00 PM - 6:00 PM",
    duration: "60 Min",
    type: "Thesis Review",
    status: "active",
  },
  {
    id: "2",
    studentName: "Marcus Chen",
    studentAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    date: "Tuesday, Oct 25",
    time: "2:00 PM - 2:30 PM",
    duration: "30 Min",
    type: "Quick Sync",
    status: "upcoming",
  },
  {
    id: "3",
    studentName: "Sasha Vykos",
    studentAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    date: "Friday, Oct 28",
    time: "11:00 AM - 12:00 PM",
    duration: "60 Min",
    type: "Draft Feedback",
    status: "upcoming",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-outline-variant/10 h-16">
        <div className="max-w-7xl mx-auto h-full px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-8 md:gap-12">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <div className="w-5 h-5 border-t-2 border-l-2 border-white rotate-45 transform translate-x-1 translate-y-1" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-primary font-headline">
                Almatrail
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-8 font-headline text-sm font-medium tracking-tight">
              <a
                href="#"
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                Discover
              </a>
              <a
                href="#"
                className="text-primary font-semibold relative after:absolute after:bottom-[-20px] after:left-0 after:right-0 after:h-[2px] after:bg-primary"
              >
                My Mentors
              </a>
              <a
                href="#"
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                Library
              </a>
              <a
                href="#"
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                Resources
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/15 group focus-within:border-primary/30 focus-within:bg-surface-container-lowest transition-all">
              <Search className="w-4 h-4 text-on-surface-variant group-focus-within:text-primary" />
              <input
                type="text"
                placeholder="Search sessions..."
                className="bg-transparent border-none focus:ring-0 text-sm w-48 ml-2 outline-none"
              />
            </div>
            <button className="text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary-container/20 hover:scale-105 transition-transform cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150"
                alt="Mentor Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="lg:hidden text-on-surface-variant">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow pt-28 pb-20 max-w-7xl mx-auto w-full px-4 md:px-8">
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-headline font-extrabold text-4xl lg:text-5xl tracking-tight text-on-surface mb-3">
                My Sessions
              </h1>
              <p className="text-on-surface-variant font-body text-lg max-w-2xl leading-relaxed">
                Manage your editorial consultations and guide your students
                through their publishing journey.
              </p>
            </motion.div>

            {/* Quick Stats */}
            <div className="flex gap-4">
              <StatCard
                label={<span className="text-black">Total Hours</span>}
                value={<span className="text-black">128.5</span>}
              />

              <StatCard
                label={<span className="text-black">This Week</span>}
                value={<span className="text-black">12</span>}
              />
            </div>
          </div>
        </header>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Sessions Feed */}
          <div className="lg:col-span-9">
            {/* Tabs */}
            <div className="flex items-center gap-8 mb-8 border-b border-outline-variant/15 overflow-x-auto whitespace-nowrap scrollbar-hide">
              <TabButton
                active={activeTab === "upcoming"}
                onClick={() => setActiveTab("upcoming")}
                label="Upcoming"
              />
              
              <TabButton
                active={activeTab === "past"}
                onClick={() => setActiveTab("past")}
                label="Past Sessions"
              />
            </div>

            {/* Session Cards */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {activeTab === "upcoming" && (
                  <motion.div
                    key="upcoming-list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {UPCOMING_SESSIONS.map((session, index) => (
                      <SessionCard
                        key={session.id}
                        session={session}
                        index={index}
                      />
                    ))}
                  </motion.div>
                )}
                {activeTab !== "upcoming" && (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center text-on-surface-variant"
                  >
                    No sessions found in this category.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-8 sticky top-24">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Calendar className="w-4 h-4 text-secondary" />
                </div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-secondary">
                  Availability
                </h4>
              </div>

              <div className="space-y-5">
                <AvailabilityRow day="Tomorrow" time="9:00 AM - 1:00 PM" />
                <AvailabilityRow day="Wednesday" time="2:00 PM - 6:00 PM" />
              </div>

              <button className="w-full mt-8 py-3 bg-white border border-outline-variant/20 text-primary font-bold text-sm rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95">
                Manage Schedule
              </button>
            </motion.div>

            {/* Additional Sidebar Meta */}
            <div className="px-2">
              <h5 className="text-xs font-bold text-on-surface-variant/50 uppercase tracking-widest mb-4">
                Resources
              </h5>
              <ul className="space-y-3">
                <SidebarLink
                  icon={<Clock className="w-4 h-4" />}
                  label="Session Guidelines"
                />
                <SidebarLink
                  icon={<Settings className="w-4 h-4" />}
                  label="Account Settings"
                />
              </ul>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-highest border-t border-outline-variant/10 pt-16 pb-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <span className="text-xl font-black text-on-surface font-headline tracking-tighter">
                ALMATRAIL
              </span>
              <p className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">
                © 2024 Almatrail Editorial Mentorship. All rights reserved.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <FooterLink label="Honor Code" />
              <FooterLink label="Editorial Guidelines" />
              <FooterLink label="Privacy Policy" />
              <FooterLink label="Contact Support" />
            </div>
          </div>

          <div className="pt-8 border-t border-outline-variant/5 flex justify-center">
            <p className="text-[10px] text-on-surface-variant/40 leading-relaxed text-center max-w-xl">
              Almatrail is a dedicated space for academic excellence and
              editorial integrity. Our platform connects global knowledge
              leaders with the next generation of publishing talent.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sub-components
function StatCard({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-surface-container-low px-6 py-4 rounded-xl min-w-[140px] border border-outline-variant/5 shadow-sm"
    >
      <span className="text-[10px] uppercase tracking-widest text-secondary font-bold block mb-1">
        {label}
      </span>
      <span className="text-2xl font-headline font-extrabold text-primary">
        {value}
      </span>
    </motion.div>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`pb-4 px-2 text-sm font-bold transition-all relative ${
        active ? "text-primary" : "text-on-surface-variant hover:text-primary"
      }`}
    >
      {label}
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
        />
      )}
    </button>
  );
}

function SessionCard({
  session,
  index,
}: {
  session: Session;
  index: number;
  key?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative p-6 rounded-xl transition-all duration-300 group overflow-hidden ${
        session.status === "active"
          ? "bg-surface-container-lowest shadow-md border border-outline-variant/10"
          : "bg-surface-container-low/40 hover:bg-surface-container-low border border-transparent hover:border-outline-variant/10 pointer-events-auto"
      }`}
    >
      {session.status === "active" && (
        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-container" />
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-surface-container shadow-sm ring-4 ring-transparent group-hover:ring-primary/5 transition-all">
              <img
                src={session.studentAvatar}
                alt={session.studentName}
                className="h-full w-full object-cover"
              />
            </div>
            {session.status === "active" && (
              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-primary-fixed-dim border-2 border-surface-container-lowest connection-pulse" />
            )}
          </div>

          <div>
            <h3 className="font-headline font-bold text-xl text-on-surface leading-snug">
              {session.studentName}
            </h3>
            <div className="flex items-center gap-2 text-on-surface-variant text-sm mt-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {session.date} • {session.time}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  session.status === "active"
                    ? "bg-secondary-fixed text-on-secondary-fixed-variant"
                    : "bg-surface-container-high text-on-secondary-container"
                }`}
              >
                {session.duration} • {session.type}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          {session.status === "active" ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 md:flex-none px-6 py-3 bg-gradient-to-r from-primary to-primary-container text-white rounded-lg font-bold text-sm shadow-lg shadow-primary-container/20"
              >
                Join Call
              </motion.button>
              <button className="flex-1 md:flex-none px-6 py-3 bg-surface-container-high text-on-secondary-container rounded-lg font-bold text-sm hover:bg-surface-container-highest transition-all">
                Reschedule
              </button>
            </>
          ) : (
            <button className="w-full md:w-auto px-6 py-3 bg-surface-container-high text-on-secondary-container rounded-lg font-bold text-sm hover:bg-surface-container-highest transition-all">
              View Details
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function AvailabilityRow({ day, time }: { day: string; time: string }) {
  return (
    <div className="flex justify-between items-center text-sm border-b border-outline-variant/10 pb-4 last:border-0 last:pb-0">
      <span className="text-on-surface-variant font-medium">{day}</span>
      <span className="font-bold text-on-surface">{time}</span>
    </div>
  );
}

function SidebarLink({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <li className="flex items-center justify-between group cursor-pointer hover:bg-surface-container-high/50 p-2 -mx-2 rounded-lg transition-colors">
      <div className="flex items-center gap-3">
        <span className="text-on-surface-variant/60 group-hover:text-primary transition-colors">
          {icon}
        </span>
        <span className="text-sm font-medium text-on-surface-variant group-hover:text-on-surface transition-colors">
          {label}
        </span>
      </div>
      <ChevronRight className="w-3.5 h-3.5 text-outline-variant/40 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
    </li>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <a
      href="#"
      className="text-xs tracking-widest uppercase text-on-surface-variant/60 hover:text-primary transition-colors hover:underline underline-offset-4"
    >
      {label}
    </a>
  );
}
