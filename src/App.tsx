import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { CarCanvas } from './components/CarCanvas';
import InspectionOverlay from './components/InspectionOverlay';
import { GarageMenu } from './components/GarageMenu';
import { TuningShop } from './components/TuningShop';
import { CARS, type TuningPart } from './data/cars';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [activeMode, setActiveMode] = useState<'garage' | 'tuning'>('garage');
  const [selectedCarId, setSelectedCarId] = useState<string>(CARS[0].id);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  
  const selectedCar = CARS.find(c => c.id === selectedCarId)!;

  // Track applied parts per car. In a real app this might be in context or a larger state object.
  const [carConfigs, setCarConfigs] = useState<Record<string, Record<string, TuningPart>>>({});

  const appliedParts = carConfigs[selectedCarId] || {
    color: selectedCar.availableColors[0],
    spoiler: selectedCar.availableSpoilers[0],
    rims: selectedCar.availableRims[0],
  };

  const handleApplyPart = (type: string, part: TuningPart) => {
    setCarConfigs(prev => ({
      ...prev,
      [selectedCarId]: {
        ...(prev[selectedCarId] || appliedParts),
        [type]: part
      }
    }));
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-full h-screen bg-slate-950 overflow-hidden font-barlow relative">
        {/* Header */}
        <header className="absolute top-0 left-0 w-full p-8 flex justify-between items-start z-10 pointer-events-none">
          <div>
            <h1 className="text-4xl font-bold uppercase italic text-red-600 tracking-tighter">Velocity<span className="text-white">X</span></h1>
            <p className="text-slate-400 text-xs tracking-[0.2em] font-semibold mt-1">INTERACTIVE 3D GARAGE</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-slate-500 text-xs tracking-widest font-bold">STATUS</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-500 text-xs font-bold tracking-widest">SYSTEM ONLINE</span>
            </div>
          </div>
        </header>

        {/* 3D Canvas Layer */}
        <div className="absolute inset-0 z-0">
          <CarCanvas 
            activeMode={activeMode} 
            selectedCar={selectedCar} 
            appliedParts={appliedParts}
            onHotspotClick={setActiveHotspot} 
          />
        </div>

        {/* UI Layer */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <AnimatePresence>
            {activeMode === 'garage' && (
              <GarageMenu 
                selectedCarId={selectedCarId}
                onSelectCar={setSelectedCarId}
                onEnterTuning={() => {
                  setActiveMode('tuning');
                  setActiveHotspot(null);
                }}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {activeMode === 'tuning' && (
              <TuningShop 
                selectedCarId={selectedCarId}
                onExitTuning={() => {
                  setActiveMode('garage');
                  setActiveHotspot(null);
                }}
                appliedParts={appliedParts}
                onApplyPart={handleApplyPart}
              />
            )}
          </AnimatePresence>

          {/* Inspection Overlay */}
          <AnimatePresence>
            {activeHotspot && activeMode === 'tuning' && (
              <InspectionOverlay selectedPart={activeHotspot} onClose={() => setActiveHotspot(null)} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
