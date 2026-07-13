import { motion } from 'framer-motion';
import { CARS } from '../data/cars';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { Button } from './ui/button';

interface GarageMenuProps {
  selectedCarId: string;
  onSelectCar: (carId: string) => void;
  onEnterTuning: () => void;
}

export function GarageMenu({ selectedCarId, onSelectCar, onEnterTuning }: GarageMenuProps) {
  const currentIndex = CARS.findIndex(c => c.id === selectedCarId);
  const selectedCar = CARS[currentIndex];

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + CARS.length) % CARS.length;
    onSelectCar(CARS[prevIndex].id);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % CARS.length;
    onSelectCar(CARS[nextIndex].id);
  };

  return (
    <div className="absolute inset-x-0 bottom-0 pointer-events-none pb-12 flex flex-col items-center">
      {/* Top Stats Bar */}
      <motion.div
        key={selectedCar.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pointer-events-auto bg-slate-900/80 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl w-full max-w-4xl mb-8 flex justify-between items-center"
      >
        <div className="flex flex-col">
          <span className="text-red-500 font-bold tracking-widest text-sm uppercase">Class {selectedCar.class}</span>
          <h2 className="text-4xl font-bold text-white uppercase italic tracking-tighter">
            {selectedCar.brand} <span className="text-slate-300">{selectedCar.name}</span>
          </h2>
        </div>

        <div className="flex gap-8">
          <StatBar label="Top Speed" value={selectedCar.stats.topSpeed} />
          <StatBar label="Acceleration" value={selectedCar.stats.acceleration} />
          <StatBar label="Handling" value={selectedCar.stats.handling} />
          <StatBar label="Nitro" value={selectedCar.stats.nitro} color="bg-blue-500" />
        </div>
      </motion.div>

      {/* Navigation & Action */}
      <div className="pointer-events-auto flex items-center gap-8">
        <Button variant="outline" size="icon" onClick={handlePrev} className="rounded-full w-14 h-14 bg-slate-900/50 hover:bg-red-600 border-slate-700">
          <ChevronLeft className="w-8 h-8" />
        </Button>
        
        <Button 
          size="lg" 
          onClick={onEnterTuning}
          className="bg-red-600 hover:bg-red-700 text-white font-bold text-xl uppercase italic tracking-wider px-12 py-8 rounded-xl shadow-[0_0_30px_rgba(220,38,38,0.5)]"
        >
          <Zap className="mr-3 w-6 h-6" />
          Tune Vehicle
        </Button>

        <Button variant="outline" size="icon" onClick={handleNext} className="rounded-full w-14 h-14 bg-slate-900/50 hover:bg-red-600 border-slate-700">
          <ChevronRight className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}

function StatBar({ label, value, color = 'bg-red-500' }: { label: string, value: number, color?: string }) {
  return (
    <div className="flex flex-col gap-2 min-w-[120px]">
      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
        <span>{label}</span>
        <span className="text-white">{value}</span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden skew-x-[-20deg]">
        <motion.div 
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
