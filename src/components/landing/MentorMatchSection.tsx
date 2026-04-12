"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Search } from "lucide-react";

const filters = [
  { label: "University", value: "Stanford" },
  { label: "Course", value: "MS CS" },
  { label: "Specialization", value: "Artificial Intelligence" },
];

const MentorMatchSection = () => (
  <section className="bg-surface py-20 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Not random mentors.<br />
            <span className="text-primary">The right mentors.</span>
          </h2>
          <div className="mt-8 flex flex-col gap-4">
            {["Same university", "Same course", "Same research domain", "Same journey"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="text-green-400 bg-white rounded-full " size={24} />
                <span className="text-[20px] font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-border bg-card p-6 shadow-elevated"
        >
          <div className="flex items-center gap-2 mb-6">
            <Search size={18} className="text-text-secondary" />
            <span className="text-sm font-semibold text-foreground">Find Your Mentor</span>
          </div>

          <div className="flex flex-col gap-4">
            {filters.map((f) => (
              <div key={f.label}>
                <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">{f.label}</label>
                <div className="mt-1.5 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground">
                  {f.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-primary/10 py-6 text-center">
            <p className="text-2xl font-bold text-primary">12</p>
            <p className="text-sm text-primary/80">
                mentors found matching your criteria
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default MentorMatchSection;
