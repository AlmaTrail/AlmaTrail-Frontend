"use client";

import { motion } from "framer-motion";
import { cn } from '@/lib/utils';
import { useRouter } from "next/navigation";
import { UniversityMentor } from "@/types/university";

export default function MentorCard(mentor: UniversityMentor) {
  const router = useRouter();

  return (
    <div className="bg-surface-container-lowest p-6 md:p-8 rounded-xl shadow-[0_32px_64px_-12px_rgba(0,64,161,0.06)] scale-[1.02] border border-on-surface/5 h-full flex flex-col transition-all duration-500">
      
      <div className="flex items-center gap-4 md:gap-6 mb-6">
        <div className="relative flex-shrink-0">
          <img 
            alt={mentor.name} 
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover transition-all duration-500"
            src={mentor.profilePicUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(mentor.name || "M")}
            referrerPolicy="no-referrer"
          />
        </div>

        <div>
          <h3 className="font-headline text-lg md:text-xl font-bold text-on-surface">{mentor.name || "Anonymous Mentor"}</h3>
          <p className="text-on-surface-variant font-medium text-xs md:text-sm">{mentor.country || "Global"}</p>
        </div>
      </div>

      <div className="space-y-4 flex-grow flex flex-col">
        <div className="flex flex-wrap gap-2">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {mentor.halfHourSessionPrice ? `$${mentor.halfHourSessionPrice}/30min` : 'Free'}
            </span>
            <span className="bg-on-surface/5 text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {mentor.oneHourSessionPrice ? `$${mentor.oneHourSessionPrice}/1hr` : 'Free'}
            </span>
        </div>

        <p className="text-on-surface-variant/80 text-sm leading-relaxed flex-grow line-clamp-3">
          {mentor.bio || "This mentor hasn't added a bio yet."}
        </p>

        <motion.button 
          whileHover={{ backgroundColor: "rgba(0, 86, 210, 0.05)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push(`/mentor/${mentor.id}`)}
          className="w-full mt-4 py-2.5 px-4 border-2 border-primary-container text-primary-container font-bold rounded-lg transition-colors duration-300 text-sm"
        >
          Connect
        </motion.button>
      </div>
    </div>
  );
}