// "use client";
// import { motion } from "framer-motion";
// import { Check, X } from "lucide-react";

// const rows = [
//   { feature: "Random mentors", others: true, alma: false },
//   { feature: "Same university mentors", others: false, alma: true },
//   { feature: "Lab-level guidance", others: false, alma: true },
//   { feature: "Structured journey", others: false, alma: true },
//   { feature: "Verified student mentors", others: false, alma: true },
// ];

// const ComparisonSection = () => (
//   <section className="bg-background py-20 lg:py-28">
//     <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         className="text-center"
//       >
//         <h2 className="text-4xl font-semibold text-foreground sm:text-5xl">
//           Why <span className="text-primary">Almatrail</span>?
//         </h2>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         className="mt-16 overflow-hidden rounded-3xl border border-border bg-card shadow-lg"
//       >
//         <div className="grid grid-cols-3 border-b border-border bg-surface px-8 py-5 text-sm font-semibold">
//           <span className="text-foreground font-bold">Feature</span>
//           <span className="text-center text-text-secondary font-bold">Others</span>
//           <span className="text-center text-primary font-bold">Almatrail</span>
//         </div>
//         {rows.map((r, i) => (
//           <div key={i} className={`grid grid-cols-3 px-8 py-5 text-sm ${i < rows.length - 1 ? "border-b border-border" : ""}`}>
//             <span className="text-foreground font-semibold">{r.feature}</span>
//             <span className="flex justify-center">
//                 {r.others ? (
//                     <Check className="text-red-500" size={18} />
//                 ) : (
//                     <X className="text-gray-700" size={18} />
//                 )}
//             </span>

//             <span className="flex justify-center">
//             {r.alma ? (
//                 <Check className="text-green-600" size={18} />
//             ) : (
//                 <X className="text-gray-700" size={18} />
//             )}
//             </span>
//           </div>
//         ))}
//       </motion.div>
//     </div>
//   </section>
// );

// export default ComparisonSection;
"use client";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  { feature: "Random mentors", others: true, alma: false },
  { feature: "Same university mentors", others: false, alma: true },
  { feature: "Lab-level guidance", others: false, alma: true },
  { feature: "Structured journey", others: false, alma: true },
  { feature: "Verified student mentors", others: false, alma: true },
];

const ComparisonSection = () => {
    return (
    <section className="bg-background py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        
        {/* Heading */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
        >
            <h2 className="text-4xl sm:text-5xl font-semibold text-foreground">
            Why <span className="text-primary">Almatrail</span>?
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
            See why students choose{" "}
            <span className="text-primary font-medium">Almatrail</span>
            </p>
        </motion.div>

        {/* Table */}
        <div className="relative mt-16">
            
            {/* Highlight Almatrail Column */}
            <div className="pointer-events-none absolute top-0 right-0 h-full w-1/3 rounded-2xl bg-primary/5 border border-primary/20" />

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-[0_10px_40px_rgba(0,64,161,0.15)]"
            >
            
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-border bg-muted/50 px-8 py-5 text-base font-semibold">
                <span className="text-foreground">Feature</span>
                <span className="text-center text-muted-foreground">Others</span>
                <span className="text-center text-primary font-semibold">
                Almatrail ✨
                </span>
            </div>

            {/* Rows */}
            {rows.map((r, i) => (
                <div
                key={i}
                className={`grid grid-cols-3 px-8 py-5 text-base items-center transition-colors hover:bg-muted/40 ${
                    i < rows.length - 1 ? "border-b border-border" : ""
                }`}
                >
                {/* Feature */}
                <span className="text-foreground font-semibold">
                    {r.feature}
                </span>

                {/* Others */}
                <span className="flex justify-center items-center">
                    {r.others ? (
                    <Check className="text-red-500" size={20} />
                    ) : (
                    <X className="text-gray-700" size={20} />
                    )}
                </span>

                {/* Almatrail */}
                <span className="flex justify-center items-center">
                    {r.alma ? (
                    <Check className="text-green-500" size={20} />
                    ) : (
                    <X className="text-gray-700" size={20} />
                    )}
                </span>
                </div>
            ))}
            </motion.div>
        </div>
        </div>
    </section>
);
};

export default ComparisonSection;