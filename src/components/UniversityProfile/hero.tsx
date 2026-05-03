"use client";
import { motion } from "framer-motion";
import { MapPin } from 'lucide-react';
import { UniversityDetail } from "@/types/university";

export default function Hero({ university }: { university: UniversityDetail }) {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 mb-16 md:mb-24 pt-24 md:pt-32">
      {/* Cover Image */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[600px] md:h-[480px] w-full rounded-2xl overflow-hidden mb-8 md:mb-12 shadow-[0_32px_64px_-12px_rgba(0,64,161,0.08)]"
      >
        <img 
          alt={university.name} 
          className="w-full h-full object-cover"
          src={university.heroImage}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </motion.div>

      {/* Profile Info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-5 flex flex-col gap-3 md:gap-4"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary font-bold">{university.tag}</span>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-on-surface">
            {university.name}
          </h1>
          <div className="flex items-center gap-2 text-on-surface-variant font-medium">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="text-sm md:text-base">{university.location}</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-7"
        >
          <div className="max-w-2xl">
            <p className="font-sans text-lg md:text-xl leading-relaxed text-on-surface-variant mb-8">
              {university.description}
            </p>
            
            <div className="grid grid-cols-3 gap-6 md:gap-12 border-t border-on-surface/10 pt-8">
              <div>
                <div className="text-2xl md:text-3xl font-black text-primary">{university.stats.students}</div>
                <div className="text-[10px] md:text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider">Students</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-primary">{university.stats.mentors}</div>
                <div className="text-[10px] md:text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider">Mentors</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-primary">{university.stats.globalRank}</div>
                <div className="text-[10px] md:text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider">Global Rank</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
