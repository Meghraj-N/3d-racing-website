import { ThemeProvider } from '@/components/theme-provider';
import { HeroSection } from './components/HeroSection';
import { SpecGrid } from './components/SpecGrid';
import { FeatureShowcase } from './components/FeatureShowcase';
import { motion } from 'framer-motion';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-full min-h-screen bg-black text-white overflow-x-hidden font-barlow selection:bg-red-500 selection:text-white">
        
        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl font-black uppercase italic tracking-tighter"
            >
              Velocity<span className="text-red-500">X</span>
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest"
          >
            <a href="#specs" className="hover:text-red-500 transition-colors">Specifications</a>
            <a href="#" className="hover:text-red-500 transition-colors">Design</a>
            <a href="#" className="hover:text-red-500 transition-colors">Order Now</a>
          </motion.div>
        </nav>

        <main>
          <HeroSection />
          <SpecGrid />
          <FeatureShowcase />
        </main>

        {/* Footer */}
        <footer className="bg-zinc-950 py-12 border-t border-white/5 text-center">
          <p className="text-gray-600 text-xs uppercase tracking-widest font-bold">
            © 2026 VelocityX Motors. Specifications subject to change.
          </p>
        </footer>

      </div>
    </ThemeProvider>
  );
}

export default App;
