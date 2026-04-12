"use client";
import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Button } from '../ui/button';

const mentors = [
  {
    name: "Alex Chen",
    uni: "Stanford · MS CS",
    tag: "AI Specialization",
    img: "https://picsum.photos/seed/alex/200/200"
  },
  {
    name: "Sarah J.",
    uni: "CMU · PhD AI",
    tag: "Full Funding",
    img: "https://picsum.photos/seed/sarah/200/200",
    offset: true
  },
  {
    name: "Rohan M.",
    uni: "Oxford · MBA",
    tag: "Scholarship",
    img: "https://picsum.photos/seed/rohan/200/200"
  }
];

export default function Hero() {
  const router = useRouter();
  return (
    <header className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-primary text-xs font-bold tracking-wider uppercase">
            <BadgeCheck className="w-4 h-4" />
            Admissions Outcome Focused
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] text-on-surface">
            Get into the <span className="text-primary italic">right</span> university — not just any university
          </h1>
          
          <p className="text-xl text-on-surface-variant leading-relaxed max-w-xl">
            Talk to students from your exact target universities and get step-by-step guidance on shortlisting, applications, and admits.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/explore")}
              className="bg-primary text-white px-8 py-4 rounded-xl font-display font-bold text-lg shadow-xl shadow-primary/20"
            >
              Get Guidance
            </motion.button>
            <Button onClick={() => router.push("/explore")} variant="hero-outline" size="xl">Explore Mentors</Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 relative">
          {mentors.map((mentor, idx) => (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className={`bg-surface-container-lowest p-6 rounded-2xl shadow-xl border border-outline-variant/10 ${mentor.offset ? 'mt-8' : idx === 2 ? '-mt-4' : ''}`}
            >
              <div className="flex gap-4 mb-4">
                <img 
                  src={mentor.img} 
                  alt={mentor.name}
                  className="w-12 h-12 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-bold text-on-surface">{mentor.name}</p>
                  <p className="text-xs text-on-surface-variant">{mentor.uni}</p>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-secondary-container/50 text-[10px] font-bold rounded-full text-primary uppercase">
                {mentor.tag}
              </span>
            </motion.div>
          ))}
          <div className="absolute -z-10 -right-20 top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </header>
  );
}
