import { ThemeProvider } from '@/components/theme-provider';
import { ThreeGallery } from './components/ThreeGallery';
import { motion } from 'framer-motion';

import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-full h-screen bg-[#050505] text-white overflow-hidden font-barlow selection:bg-red-500 selection:text-white">
        
        {/* Navigation Bar (HTML Overlay) */}
        <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl font-black uppercase italic tracking-tighter mix-blend-difference"
            >
              Velocity<span className="text-red-500">X</span>
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest pointer-events-auto mix-blend-difference"
          >
            <a href="#" className="hover:text-red-500 transition-colors">Specifications</a>
            <a href="#" className="hover:text-red-500 transition-colors">Design</a>
            <a href="#" className="hover:text-red-500 transition-colors">Order Now</a>
          </motion.div>
        </nav>

        {/* Scroll indicator overlay */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none mix-blend-difference">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
        </div>

        {/* 3D WebGL Canvas Layer */}
        <ThreeGallery />

      </div>
    </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
