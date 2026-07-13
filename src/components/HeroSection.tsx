import { motion, useScroll, useTransform } from 'framer-motion';

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
        <img 
          src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop" 
          alt="BMW M8 Exterior"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-20">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-blue-500 uppercase tracking-[0.3em] font-bold text-sm mb-4"
        >
          The Ultimate Driving Machine
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6"
        >
          The New M8
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-blue-500 to-cyan-500">
            Competition
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <a href="#specs" className="inline-block mt-8 text-white uppercase tracking-widest text-xs font-bold border-b border-white/30 pb-2 hover:border-white transition-colors">
            Discover Excellence
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
      </motion.div>
    </div>
  );
}
