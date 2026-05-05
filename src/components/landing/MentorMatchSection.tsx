"use client";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const MentorMatchSection = () => {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-12">
            Not random mentors.<br />
            <span className="text-primary">The right mentors.</span>
          </h2>
          <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
            {["Same university", "Same course", "Same research domain", "Same journey"].map((item) => (
              <div key={item} className="flex items-start gap-4">
                <CheckCircle2 className="text-green-400 flex-shrink-0 mt-1" size={28} />
                <span className="text-[18px] font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MentorMatchSection;
