// "use client";
// import { motion } from "framer-motion";
// import { ArrowRight } from 'lucide-react';
// import MentorCard from './MentorCard';
// import { UniversityMentor } from "@/types/university";

// export default function MentorsSection({ mentors }: { mentors: UniversityMentor[] }) {
//   return (
//     <section className="bg-surface-container-low py-20 md:py-32">
//       <div className="max-w-7xl mx-auto px-6 md:px-8">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
//           <div>
//             <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary font-bold block mb-3 md:mb-4">World-Class Expertise</span>
//             <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Top Mentors</h2>
//           </div>
//           <a className="text-primary font-semibold flex items-center gap-2 hover:underline decoration-2 underline-offset-4 transition-all group" href="#">
//             View All Faculty
//             <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//           </a>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//           {mentors?.map((mentor, i) => (
//             <motion.div
//               key={mentor.name}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1 }}
//             >
//               <MentorCard {...mentor} />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
export default function Page() {
  return <div>Session Booking</div>;
}