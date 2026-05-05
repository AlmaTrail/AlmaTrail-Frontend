"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from '@/components/ui/dialog';
import WaitlistForm from '@/components/WaitlistForm';
import MentorApplicationForm from '@/components/MentorApplicationForm';
import { useState } from 'react';
import { Check } from 'lucide-react';

const FinalCTA = () => {
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
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
          Start your journey with <span className="text-primary">clarity</span>
        </h2>
        <p className="mt-4 text-text-secondary text-lg">Your dream university is closer than you think.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
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
            className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg mt-4"
          >
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-600 font-medium">
              {successType === "waitlist" 
                ? "Congratulations! You've joined the waitlist. We'll be in touch soon!" 
                : "Thank you! Our team will review your application and contact you soon."}
            </span>
          </motion.div>
        )}
      </motion.div>
      
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
    </div>
  </section>
);
};

export default FinalCTA;
