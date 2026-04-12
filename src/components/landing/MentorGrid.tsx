"use client";
import { motion } from "framer-motion";
import { BadgeCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import mentor1 from "@/assets/mentor1.jpg";
import mentor2 from "@/assets/mentor2.jpg";
import mentor3 from "@/assets/mentor3.jpg";
import mentor4 from "@/assets/mentor4.jpg";
import mentor5 from "@/assets/mentor5.jpg";
import mentor6 from "@/assets/mentor6.jpg";

const mentors = [
  { name: "Arjun Mehta", uni: "Stanford", course: "MS CS", tags: ["AI", "NLP"], rating: 4.9, helped: 72, img: mentor1, admits: ["Stanford", "CMU"] },
  { name: "Mei Lin", uni: "CMU", course: "PhD AI", tags: ["Systems", "ML"], rating: 4.8, helped: 54, img: mentor2, admits: ["CMU", "MIT"] },
  { name: "James Miller", uni: "MIT", course: "MS CS", tags: ["Robotics", "CV"], rating: 4.9, helped: 63, img: mentor3, admits: ["MIT", "Stanford"] },
  { name: "Amara Johnson", uni: "Georgia Tech", course: "MS HCI", tags: ["UX", "Research"], rating: 4.7, helped: 38, img: mentor4, admits: ["GT", "UMich"] },
  { name: "Omar Hassan", uni: "UC Berkeley", course: "PhD ML", tags: ["AI", "RL"], rating: 5.0, helped: 91, img: mentor5, admits: ["Berkeley", "Stanford"] },
  { name: "Sofia Reyes", uni: "ETH Zurich", course: "MS DS", tags: ["ML", "Stats"], rating: 4.8, helped: 45, img: mentor6, admits: ["ETH", "EPFL"] },
];

const MentorGrid = () => (
  <section className="bg-background py-20 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          Meet our <span className="text-primary">verified mentors</span>
        </h2>
        <p className="mt-3 text-text-secondary">Real students, real experiences, real guidance.</p>
      </motion.div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mentors.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-hover"
          >
            <div className="flex items-center gap-4">
              <Image src={m.img} alt={m.name} className="h-14 w-14 rounded-xl object-cover" loading="lazy" width={56} height={56} />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-foreground">{m.name}</span>
                  <BadgeCheck className="text-primary" size={14} />
                </div>
                <p className="text-xs text-text-secondary">{m.uni} · {m.course}</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {m.admits.map((a) => (
                <span key={a} className="rounded-lg bg-primary-light px-2 py-0.5 text-[10px] font-semibold text-primary">
                  {a}
                </span>
              ))}
              {m.tags.map((t) => (
                <span key={t} className="rounded-lg bg-surface px-2 py-0.5 text-[10px] font-medium text-text-secondary">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="text-warning fill-warning" size={14} />
                <span className="text-xs font-semibold text-foreground">{m.rating}</span>
                <span className="text-xs text-text-secondary ml-1">· Helped {m.helped}+ students</span>
              </div>
            </div>

            <Button variant="default" size="sm" className="mt-4 w-full">
              Book Session
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default MentorGrid;
