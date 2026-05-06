"use client";

import { motion } from "framer-motion";
import { CheckCircle2, GraduationCap, BookOpen, Compass, Users } from "lucide-react";

const features = [
  {
    title: "Same University",
    desc: "Get insights from mentors who studied where you aim to go.",
    icon: GraduationCap,
  },
  {
    title: "Same Course",
    desc: "Guidance tailored to your exact academic path.",
    icon: BookOpen,
  },
  {
    title: "Same Research Domain",
    desc: "Connect with mentors in your field of interest.",
    icon: Compass,
  },
  {
    title: "Same Journey",
    desc: "Learn from people who’ve already walked your path.",
    icon: Users,
  },
];

const MentorMatchSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Not random mentors.
            <br />
            <span className="text-primary">Only the right ones.</span>
          </h2>

          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            We match you with mentors who truly understand your goals, struggles, and journey — not generic advice.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition">
                  <Icon className="text-primary" size={24} />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  {item.desc}
                </p>

                <div className="mt-4 flex items-center gap-2 text-green-500 text-sm font-medium">
                  <CheckCircle2 size={16} />
                  Verified Match
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Trust Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500">
            Built from real student struggles — not assumptions.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default MentorMatchSection;