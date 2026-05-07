"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import WaitlistForm from "@/components/WaitlistForm";
import MentorApplicationForm from "@/components/MentorApplicationForm";

export default function Hero() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [mentorOpen, setMentorOpen] = useState(false);
  const [successType, setSuccessType] = useState<"waitlist" | "mentor" | null>(
    null,
  );

  const handleWaitlistSuccess = () => {
    setWaitlistOpen(false);
    setSuccessType("waitlist");
    setTimeout(() => setSuccessType(null), 4000);
  };

  const handleMentorSuccess = () => {
    setMentorOpen(false);
    setSuccessType("mentor");
    setTimeout(() => setSuccessType(null), 4000);
  };

  return (
    <header className="pt-14 md:pt-16 pb-12 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 md:space-y-7"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-primary text-xs font-semibold uppercase tracking-wide">
            <BadgeCheck className="w-4 h-4" />
            Outcome focused mentorship
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] text-on-surface">
            Get into the <span className="text-primary italic">right</span>{" "}
            university — not just any
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-on-surface-variant max-w-xl">
            Talk to students from your exact target universities and get
            step-by-step guidance on shortlisting, applications, and admits.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setWaitlistOpen(true)}
              className="bg-primary text-white px-7 py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/20"
            >
              Join Waitlist
            </motion.button>

            <Button
              onClick={() => setMentorOpen(true)}
              variant="hero-outline"
              size="lg"
            >
              Become a Mentor
            </Button>
          </div>

          {/* Success Message */}
          {successType && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg"
            >
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-green-600 font-medium">
                {successType === "waitlist"
                  ? "Congratulations! You've joined the waitlist. We'll be in touch soon!"
                  : "Thank you! Our team will review your application and contact you soon."}
              </span>
            </motion.div>
          )}

          {/* Social Proof */}
          <p className="text-sm text-on-surface-variant mt-2">
            ✓ 50+ students already joined
          </p>
        </motion.div>

        {/* RIGHT VISUAL */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
            {/* Glow */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary/10 blur-3xl rounded-full"></div>

            {/* MAIN CARD */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <img
                  src="https://picsum.photos/seed/mainmentor/200"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    You → Matched Mentor
                  </p>
                  <p className="text-sm text-gray-500">
                    Perfect academic alignment
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {["Same University", "Same Course", "Same Goal"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-gray-700"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-6 text-xs text-gray-400">
                Matched in seconds ⚡
              </div>
            </motion.div>

            {/* FLOATING CARDS */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden sm:block absolute -left-16 top-10 bg-white rounded-2xl shadow-lg p-4 w-40 border"
            >
              <div className="flex items-center gap-2">
                <img
                  src="https://picsum.photos/seed/a/100"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-xs font-semibold">Stanford</p>
                  <p className="text-[10px] text-gray-500">MS CS</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden sm:block absolute -right-16 bottom-10 bg-white rounded-2xl shadow-lg p-4 w-40 border"
            >
              <div className="flex items-center gap-2">
                <img
                  src="https://picsum.photos/seed/b/100"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-xs font-semibold">CMU</p>
                  <p className="text-[10px] text-gray-500">PhD AI</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* WAITLIST MODAL */}
      <Dialog open={waitlistOpen} onOpenChange={setWaitlistOpen}>
        <DialogContent
          className="
            sm:max-w-md max-h-[90vh] overflow-y-auto
            data-[state=open]:animate-in
            data-[state=closed]:animate-out
            data-[state=open]:fade-in-0
            data-[state=closed]:fade-out-0
            data-[state=open]:zoom-in-95
            data-[state=closed]:zoom-out-95
            data-[state=open]:slide-in-from-top-8
            data-[state=closed]:slide-out-to-top-8
            duration-300
          "
        >
          <WaitlistForm
            onClose={() => setWaitlistOpen(false)}
            onSuccess={handleWaitlistSuccess}
          />
        </DialogContent>
      </Dialog>

      {/* MENTOR MODAL */}
      <Dialog open={mentorOpen} onOpenChange={setMentorOpen}>
        <DialogContent
          className="
            sm:max-w-md max-h-[90vh] overflow-y-auto
            data-[state=open]:animate-in
            data-[state=closed]:animate-out
            data-[state=open]:fade-in-0
            data-[state=closed]:fade-out-0
            data-[state=open]:zoom-in-95
            data-[state=closed]:zoom-out-95
            data-[state=open]:slide-in-from-top-8
            data-[state=closed]:slide-out-to-top-8
            duration-300
          "
        >
          <MentorApplicationForm
            onClose={() => setMentorOpen(false)}
            onSuccess={handleMentorSuccess}
          />
        </DialogContent>
      </Dialog>
    </header>
  );
}
