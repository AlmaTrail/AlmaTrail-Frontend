"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import MentorCard from '@/components/MentorCard';
import CalendarCard from '@/components/CalenderCard';
import TimeSlotPicker from '@/components/TimeSlotPicker';
import Footer from '@/components/footerSections';
import { Loader } from "lucide-react";
import { format, parse } from "date-fns";

interface ScheduleData {
  firstName: string;
  lastName: string;
  halfHourSessionPrice: number;
  oneHourSessionPrice: number;
  mentorId: number;
  schedule: {
    [key: string]: Array<{
      start: string;
      end: string;
    }>;
  };
}

export default function BookSession() {
  const params = useParams();
  const mentorId = params.id as string;
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        setLoading(true);
        const endpoint = `${process.env.NEXT_PUBLIC_MENTORS_SCHEDULE}/${mentorId}`;
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch schedule: ${response.status}`);
        }
        
        const data = await response.json();
        setScheduleData(data);
      } catch (err) {
        console.error("Error fetching schedule data:", err);
        setError(err instanceof Error ? err.message : "Failed to load schedule");
      } finally {
        setLoading(false);
      }
    };

    if (mentorId) {
      fetchScheduleData();
    }
  }, [mentorId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface font-body text-on-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="animate-spin" size={40} />
          <p className="text-on-surface-variant">Loading schedule...</p>
        </div>
      </div>
    );
  }

  if (error || !scheduleData) {
    return (
      <div className="min-h-screen bg-surface font-body text-on-surface flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-bold text-error mb-4">{error || "Schedule not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      
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
            <MentorCard 
              firstName={scheduleData.firstName}
              lastName={scheduleData.lastName}
              halfHourPrice={scheduleData.halfHourSessionPrice}
              oneHourPrice={scheduleData.oneHourSessionPrice}
            />
            <CalendarCard 
              schedule={scheduleData.schedule}
              onDateSelect={setSelectedDate}
              selectedDate={selectedDate}
            />
          </motion.div>

          {/* Right Column: Slot Selection */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-7"
          >
            <TimeSlotPicker 
              mentorId={parseInt(mentorId)}
              schedule={scheduleData.schedule}
              selectedDate={selectedDate}
              prices={{
                halfHour: scheduleData.halfHourSessionPrice,
                oneHour: scheduleData.oneHourSessionPrice
              }}
            />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
