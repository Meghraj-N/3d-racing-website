import { motion } from 'framer-motion';

export function FeatureShowcase() {
  return (
    <section className="w-full bg-black py-24 overflow-hidden">
      
      {/* Feature 1: Exterior */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full md:w-1/2"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-red-500/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1610411135515-5eec83bb6d6e?q=80&w=2070&auto=format&fit=crop" 
                alt="M8 Exterior Aero"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full md:w-1/2 space-y-6"
          >
            <h3 className="text-red-500 font-bold tracking-[0.2em] uppercase text-sm">Aerodynamics</h3>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">Sculpted for Speed</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              The M Carbon roof lowers the vehicle's center of gravity, while the aggressive front air intakes and rear diffuser work in harmony to optimize downforce. The illuminated kidney grille ensures a commanding presence, day or night.
            </p>
            <ul className="space-y-4 pt-4 border-t border-white/10 mt-6">
              <li className="flex items-center text-gray-300 font-medium">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-4" />
                20-inch M Star-Spoke Bi-Color Wheels
              </li>
              <li className="flex items-center text-gray-300 font-medium">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-4" />
                Adaptive LED Headlights with Laserlight
              </li>
              <li className="flex items-center text-gray-300 font-medium">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-4" />
                M Carbon Exterior Package
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Feature 2: Interior */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row-reverse items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full md:w-1/2"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop" 
                alt="M8 Luxury Interior"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full md:w-1/2 space-y-6"
          >
            <h3 className="text-blue-500 font-bold tracking-[0.2em] uppercase text-sm">Interior</h3>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">Motorsport Luxury</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Step inside the ultimate driver-focused cockpit. M Carbon bucket seats provide track-ready support, while the extended Merino leather upholstery surrounds you in absolute comfort.
            </p>
            <ul className="space-y-4 pt-4 border-t border-white/10 mt-6">
              <li className="flex items-center text-gray-300 font-medium">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-4" />
                M Carbon Bucket Seats
              </li>
              <li className="flex items-center text-gray-300 font-medium">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-4" />
                Fully Digital Instrument Cluster
              </li>
              <li className="flex items-center text-gray-300 font-medium">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-4" />
                Ambient Interior Lighting
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
