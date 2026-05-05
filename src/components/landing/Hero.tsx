"use client";
import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import WaitlistForm from '@/components/WaitlistForm';
import MentorApplicationForm from '@/components/MentorApplicationForm';
import { useState } from 'react';
import { Check } from 'lucide-react';

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
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [mentorOpen, setMentorOpen] = useState(false);
  const [successType, setSuccessType] = useState<"waitlist" | "mentor" | null>(null);

  const handleWaitlistSuccess = () => {
    setWaitlistOpen(false);
    setSuccessType("waitlist");
    setTimeout(() => setSuccessType(null), 5000);
  };

  const handleMentorSuccess = () => {
    setMentorOpen(false);
    setSuccessType("mentor");
    setTimeout(() => setSuccessType(null), 5000);
  };

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
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 pt-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setWaitlistOpen(true)}
                className="bg-primary text-white px-8 py-4 rounded-xl font-display font-bold text-lg shadow-xl shadow-primary/20"
              >
                Join Waitlist
              </motion.button>
              <Button 
                onClick={() => setMentorOpen(true)} 
                variant="hero-outline" 
                size="xl"
              >
                Become a Mentor
              </Button>
            </div>

            {/* Success Message */}
            {successType && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">
                  {successType === "waitlist" 
                    ? "Congratulations! You've joined the waitlist. We'll be in touch soon!" 
                    : "Thank you! Our team will review your application and contact you soon."}
                </span>
              </motion.div>
            )}

            {/* Students Joined */}
            <p className="text-sm text-on-surface-variant font-medium">
              ✓ 50+ students already joined the waitlist
            </p>
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

      {/* Waitlist Modal */}
      <Dialog open={waitlistOpen} onOpenChange={setWaitlistOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <WaitlistForm 
            onClose={() => setWaitlistOpen(false)}
            onSuccess={handleWaitlistSuccess}
          />
        </DialogContent>
      </Dialog>

      {/* Mentor Application Modal */}
      <Dialog open={mentorOpen} onOpenChange={setMentorOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <MentorApplicationForm 
            onClose={() => setMentorOpen(false)}
            onSuccess={handleMentorSuccess}
          />
        </DialogContent>
      </Dialog>
    </header>
  );
}
