import { useState } from 'react';
import { motion } from 'framer-motion';
import { CARS, type TuningPart } from '../data/cars';
import { Button } from './ui/button';
import { ChevronLeft, Paintbrush, Wind, CircleDashed } from 'lucide-react';

interface TuningShopProps {
  selectedCarId: string;
  onExitTuning: () => void;
  appliedParts: Record<string, TuningPart>;
  onApplyPart: (type: string, part: TuningPart) => void;
}

export function TuningShop({ selectedCarId, onExitTuning, appliedParts, onApplyPart }: TuningShopProps) {
  const car = CARS.find(c => c.id === selectedCarId)!;
  const [activeTab, setActiveTab] = useState<'color' | 'spoiler' | 'rims'>('color');

  return (
    <motion.div 
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="absolute left-0 top-0 bottom-0 w-[400px] bg-slate-900/90 backdrop-blur-xl border-r border-slate-700/50 p-6 flex flex-col pointer-events-auto"
    >
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" onClick={onExitTuning} className="mr-4 text-slate-400 hover:text-white">
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h2 className="text-3xl font-bold uppercase italic tracking-tighter text-white">Garage</h2>
      </div>

      <div className="flex gap-2 mb-6">
        <TabButton active={activeTab === 'color'} onClick={() => setActiveTab('color')} icon={<Paintbrush />} label="Paint" />
        <TabButton active={activeTab === 'spoiler'} onClick={() => setActiveTab('spoiler')} icon={<Wind />} label="Spoiler" />
        <TabButton active={activeTab === 'rims'} onClick={() => setActiveTab('rims')} icon={<CircleDashed />} label="Rims" />
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {activeTab === 'color' && (
          <div className="grid grid-cols-2 gap-4">
            {car.availableColors.map(color => (
              <PartCard 
                key={color.id} 
                part={color} 
                isActive={appliedParts.color?.id === color.id} 
                onClick={() => onApplyPart('color', color)} 
              />
            ))}
          </div>
        )}
        {activeTab === 'spoiler' && (
          <div className="flex flex-col gap-4">
            {car.availableSpoilers.map(spoiler => (
              <PartCard 
                key={spoiler.id} 
                part={spoiler} 
                isActive={appliedParts.spoiler?.id === spoiler.id} 
                onClick={() => onApplyPart('spoiler', spoiler)} 
              />
            ))}
          </div>
        )}
        {activeTab === 'rims' && (
          <div className="flex flex-col gap-4">
            {car.availableRims.map(rim => (
              <PartCard 
                key={rim.id} 
                part={rim} 
                isActive={appliedParts.rims?.id === rim.id} 
                onClick={() => onApplyPart('rims', rim)} 
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800">
        <div className="flex justify-between items-center text-sm font-bold uppercase tracking-wider mb-2">
          <span className="text-slate-400">Total Value</span>
          <span className="text-red-500 text-xl font-black">
            ${Object.values(appliedParts).reduce((acc, part) => acc + part.price, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
        active ? 'bg-red-600/20 border-red-500 text-white' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <div className={active ? 'text-red-500' : ''}>{icon}</div>
      <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}

function PartCard({ part, isActive, onClick }: { part: TuningPart, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`relative w-full p-4 rounded-xl border text-left transition-all ${
        isActive ? 'bg-red-600/10 border-red-500' : 'bg-slate-800/40 border-slate-700 hover:border-slate-500'
      }`}
    >
      {isActive && (
        <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      )}
      
      {part.type === 'color' && (
        <div 
          className="w-full h-12 rounded-lg mb-3 shadow-inner border border-white/10" 
          style={{ backgroundColor: part.value }} 
        />
      )}
      
      <div className="font-bold text-white text-sm uppercase tracking-wide">{part.name}</div>
      <div className={`text-xs mt-1 ${part.price === 0 ? 'text-slate-400' : 'text-green-400 font-bold'}`}>
        {part.price === 0 ? 'Stock' : `+$${part.price.toLocaleString()}`}
      </div>
    </button>
  );
}
