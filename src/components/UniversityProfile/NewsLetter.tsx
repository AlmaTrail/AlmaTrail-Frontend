import { motion } from 'framer-motion';

export default function Newsletter() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="order-2 md:order-1"
      >
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
          <img 
            alt="Editorial Journal" 
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?auto=format&fit=crop&q=80&w=800"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/5"></div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="order-1 md:order-2"
      >
        <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary font-bold block mb-4">The Quarterly Journal</span>
        <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-on-surface mb-8">
          Insight Beyond the Curriculum.
        </h2>
        <p className="text-base md:text-lg text-on-surface-variant mb-10 md:mb-12 leading-relaxed">
          Subscribe to our curated newsletter. Every week, Almatrail mentors share exclusive case studies, industry shifts, and career guidance directly from the field.
        </p>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <input 
              className="flex-1 bg-surface-container-low border-none rounded-lg px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all outline-none text-sm md:text-base"
              placeholder="Institutional email address"
              type="email"
            />
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary-container transition-all text-sm md:text-base"
            >
              Subscribe
            </motion.button>
          </div>
          <p className="text-[10px] md:text-xs text-on-surface-variant/60">
            By subscribing, you agree to our Curatorial Standards and Privacy Policy.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
