import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Settings, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

interface AsphaltUIProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

const COLORS = [
  { name: 'Racing Red', hex: '#ff0022' },
  { name: 'Midnight Blue', hex: '#00154a' },
  { name: 'Stealth Black', hex: '#111111' },
  { name: 'Alpine White', hex: '#eeeeee' },
  { name: 'Acid Green', hex: '#a2ff00' },
  { name: 'Cyan Chrome', hex: '#00f3ff' },
];

export function AsphaltUI({ currentColor, onColorChange }: AsphaltUIProps) {
  const [activeTab, setActiveTab] = useState<'garage' | 'tune'>('tune');

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden font-sans">
      
      {/* Top Bar - Player Stats */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent"
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.8)] flex items-center justify-center">
              <span className="font-bold text-white text-lg">14</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-300 text-xs font-bold uppercase tracking-wider">Reputation</span>
              <div className="w-32 h-1.5 bg-gray-800 rounded-full mt-1 overflow-hidden border border-gray-700">
                <div className="w-2/3 h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-black/40 px-4 py-1.5 rounded-full border border-gray-700/50 backdrop-blur-md">
            <span className="text-yellow-400 font-bold">$</span>
            <span className="text-white font-bold font-mono tracking-tight text-lg">1,450,200</span>
          </div>
          <div className="flex items-center gap-2 bg-black/40 px-4 py-1.5 rounded-full border border-gray-700/50 backdrop-blur-md">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-white font-bold font-mono tracking-tight text-lg">8,450</span>
          </div>
          <button className="pointer-events-auto bg-gray-800/80 hover:bg-gray-700 p-2 rounded-full border border-gray-600 transition-colors">
            <Settings className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </motion.div>

      {/* Car Info & Title */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-24 left-8 max-w-sm"
      >
        <div className="text-cyan-400 font-bold tracking-[0.2em] text-sm mb-1 uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">S Class</div>
        <h1 className="text-5xl font-black text-white italic tracking-tighter drop-shadow-lg mb-2">FERRARI</h1>
        <h2 className="text-2xl font-bold text-gray-300 italic tracking-tight drop-shadow-md">458 ITALIA</h2>
      </motion.div>

      {/* Stats Panel */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-24 right-8 w-72 bg-black/40 backdrop-blur-md border border-gray-700/50 rounded-xl p-5"
      >
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-400 font-bold text-sm uppercase tracking-wider">Car Rank</span>
          <span className="text-cyan-400 font-black text-2xl italic tracking-tighter drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">3,892</span>
        </div>

        <div className="space-y-4">
          <StatBar label="Top Speed" value={85} display="330 km/h" color="bg-yellow-400" glow="shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
          <StatBar label="Acceleration" value={92} display="3.2s" color="bg-cyan-400" glow="shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
          <StatBar label="Handling" value={78} display="82.4" color="bg-purple-400" glow="shadow-[0_0_10px_rgba(192,132,252,0.6)]" />
          <StatBar label="Nitro" value={65} display="65.0" color="bg-pink-500" glow="shadow-[0_0_10px_rgba(236,72,153,0.6)]" />
        </div>
      </motion.div>

      {/* Bottom Tuning Menu */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-auto flex flex-col justify-end pb-8"
      >
        {/* Navigation Tabs */}
        <div className="flex justify-center gap-12 mb-6">
          <button 
            onClick={() => setActiveTab('garage')}
            className={`text-xl font-black italic tracking-wider transition-all duration-300 ${activeTab === 'garage' ? 'text-white scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'text-gray-500 hover:text-gray-300'}`}
          >
            GARAGE
          </button>
          <button 
            onClick={() => setActiveTab('tune')}
            className={`text-xl font-black italic tracking-wider transition-all duration-300 ${activeTab === 'tune' ? 'text-cyan-400 scale-110 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]' : 'text-gray-500 hover:text-cyan-900'}`}
          >
            TUNE & CUSTOMIZE
          </button>
        </div>

        {/* Action Area */}
        <div className="max-w-5xl mx-auto w-full px-8 flex justify-between items-end">
          
          {/* Car Selector (Garage) */}
          {activeTab === 'garage' && (
            <div className="flex items-center gap-4">
              <button className="w-12 h-12 rounded-full bg-gray-800/80 hover:bg-gray-700 flex items-center justify-center border border-gray-600 transition-colors">
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <div className="text-center w-48">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Current Vehicle</p>
                <p className="text-white font-bold text-lg">1 / 10</p>
              </div>
              <button className="w-12 h-12 rounded-full bg-cyan-600 hover:bg-cyan-500 flex items-center justify-center border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all">
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          )}

          {/* Color Selector (Tune) */}
          {activeTab === 'tune' && (
            <div className="flex items-center gap-3 bg-black/50 p-3 rounded-2xl border border-gray-700/50 backdrop-blur-md">
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => onColorChange(color.hex)}
                  className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${currentColor === color.hex ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.6)]' : 'border-transparent hover:border-gray-400 hover:scale-105'}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          )}

          {/* Play Button */}
          <button className="group relative flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-8 py-4 rounded-full border border-cyan-300/50 shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all overflow-hidden">
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]" />
            <Play className="w-6 h-6 text-white fill-white" />
            <span className="text-white font-black text-2xl italic tracking-widest uppercase">Race</span>
          </button>
          
        </div>
      </motion.div>

    </div>
  );
}

function StatBar({ label, value, display, color, glow }: { label: string, value: number, display: string, color: string, glow: string }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-gray-300 font-bold text-xs uppercase tracking-wider">{label}</span>
        <span className="text-white font-bold font-mono text-sm">{display}</span>
      </div>
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className={`h-full ${color} ${glow}`}
        />
      </div>
    </div>
  );
}
