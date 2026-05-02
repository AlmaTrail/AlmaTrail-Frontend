"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AuthSuccess() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-6">
      
      {/* Title */}
      <h2 className="text-2xl font-semibold">🎉 Success!</h2>

      {/* Subtitle */}
      <p className="text-sm text-muted-foreground">
        You’re all set. Start exploring mentors now.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 w-full">
        
        {/* Explore */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/explore")}
          className="flex-1 bg-primary text-primary-foreground rounded-xl py-3 font-medium"
        >
          Explore
        </motion.button>

        {/* Home */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/mentor_profile")}
          className="flex-1 border border-border rounded-xl py-3 font-medium hover:bg-muted transition"
        >
          Become a Mentor
        </motion.button>
      </div>
    </div>
  );
}