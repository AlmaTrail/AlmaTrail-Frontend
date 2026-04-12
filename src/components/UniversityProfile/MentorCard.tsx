"use client";

import { motion } from "framer-motion";
import { cn } from '@/lib/utils';
import { useRouter } from "next/navigation";

interface MentorCardProps {
  name: string;
  role: string;
  image: string;
  tags: string[];
  quote: string;
  online: boolean;
}

export default function MentorCard({ name, role, image, tags, quote, online }: MentorCardProps) {
  const router = useRouter();

  return (
    <div className="bg-surface-container-lowest p-6 md:p-8 rounded-xl shadow-[0_32px_64px_-12px_rgba(0,64,161,0.06)] scale-[1.02] border border-on-surface/5 h-full flex flex-col transition-all duration-500">
      
      <div className="flex items-center gap-4 md:gap-6 mb-6">
        <div className="relative flex-shrink-0">
          <img 
            alt={name} 
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover transition-all duration-500"
            src={image}
            referrerPolicy="no-referrer"
          />
          {online && (
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-surface rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-primary-container rounded-full relative">
                <div className="absolute inset-0 bg-primary-container rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
          )}
        </div>

        <div>
          <h3 className="font-headline text-lg md:text-xl font-bold text-on-surface">{name}</h3>
          <p className="text-on-surface-variant font-medium text-xs md:text-sm">{role}</p>
        </div>
      </div>

      <div className="space-y-4 flex-grow flex flex-col">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span 
              key={tag}
              className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                i === 0 ? "bg-primary/10 text-primary" : "bg-on-surface/5 text-on-surface-variant"
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-on-surface-variant/80 text-sm leading-relaxed italic flex-grow">
          "{quote}"
        </p>

        <motion.button 
          whileHover={{ backgroundColor: "rgba(0, 86, 210, 0.05)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/mentor")}
          className="w-full mt-4 py-2.5 px-4 border-2 border-primary-container text-primary-container font-bold rounded-lg transition-colors duration-300 text-sm"
        >
          Connect
        </motion.button>
      </div>
    </div>
  );
}