import { motion } from 'framer-motion';

const SPECS = [
  { label: '0-60 MPH', value: '3.0', unit: 'SEC', delay: 0.1 },
  { label: 'HORSEPOWER', value: '617', unit: 'HP', delay: 0.2 },
  { label: 'TOP SPEED', value: '190', unit: 'MPH', delay: 0.3 },
  { label: 'ENGINE', value: 'V8', unit: '4.4L', delay: 0.4 },
];

export function SpecGrid() {
  return (
    <section id="specs" className="w-full py-32 bg-black text-white relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest mb-6">Uncompromising Power</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            The heart of the M8 Competition is a high-revving 4.4-liter BMW M TwinPower Turbo V8. 
            Paired with the 8-speed M Sport transmission and M xDrive, it delivers an adrenaline-fueled experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {SPECS.map((spec, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: spec.delay }}
              className="flex flex-col items-center justify-center p-8 bg-zinc-900/50 rounded-2xl border border-white/5 hover:border-red-500/50 transition-colors group"
            >
              <div className="text-4xl md:text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 group-hover:from-red-500 group-hover:to-blue-500 transition-all">
                {spec.value}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-500 tracking-widest">{spec.label}</span>
                <span className="text-xs font-bold text-red-500">{spec.unit}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
