import { motion } from "framer-motion";
import { ArrowRight } from 'lucide-react';
import MentorCard from './MentorCard';

const MENTORS = [
  {
    name: "Dr. Elena Thorne",
    role: "Principal AI Scientist at OpenAI",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    tags: ["MS in Computer Science", "Machine Learning"],
    quote: "Focusing on the ethical implementation of large-scale neural networks.",
    online: true
  },
  {
    name: "Marcus Chen",
    role: "VP of Design at Stripe",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    tags: ["MFA Interaction Design", "Systems Design"],
    quote: "Mastering the craft of invisible interfaces and complex user flows.",
    online: true
  },
  {
    name: "Sarah Jenkins",
    role: "Senior Architect at Foster + Partners",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
    tags: ["M.Arch Architecture", "Urban Planning"],
    quote: "Exploring the intersection of sustainable materials and civic space.",
    online: false
  }
];

export default function MentorsSection() {
  return (
    <section className="bg-surface-container-low py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
          <div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary font-bold block mb-3 md:mb-4">World-Class Expertise</span>
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Top Mentors</h2>
          </div>
          <a className="text-primary font-semibold flex items-center gap-2 hover:underline decoration-2 underline-offset-4 transition-all group" href="#">
            View All Faculty
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {MENTORS.map((mentor, i) => (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <MentorCard {...mentor} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
