"use client";
import Navbar from '../../components/navbar';
import MentorCard from '../../components/MentorCard';
import CalendarCard from '../../components/CalenderCard';
import TimeSlotPicker from '../../components/TimeSlotPicker';
import Footer from '../../components/footerSections';
import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-outline mb-4">
            Scheduling Session
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold font-headline tracking-tight text-on-surface">
            Select your time.
          </h1>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start w-full">
          {/* Left Column: Profile & Calendar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <MentorCard />
            <CalendarCard />
          </motion.div>

          {/* Right Column: Slot Selection */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-7"
          >
            <TimeSlotPicker />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
