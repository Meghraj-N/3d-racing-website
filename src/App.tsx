import { useState } from 'react';
import CarCanvas from './components/CarCanvas';
import InspectionOverlay from './components/InspectionOverlay';

function App() {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  return (
    <div className="w-screen h-screen overflow-hidden bg-background relative font-body text-foreground">
      
      {/* Header Overlay */}
      <header className="absolute top-0 left-0 w-full p-6 z-10 pointer-events-none flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-display font-bold uppercase tracking-tighter text-primary">
            Velocity<span className="text-foreground">X</span>
          </h1>
          <p className="text-muted-foreground uppercase tracking-widest text-xs mt-1 font-bold">
            Interactive 3D Configuration
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Status</p>
          <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            System Online
          </div>
        </div>
      </header>

      {/* Main 3D Canvas area */}
      <main className="w-full h-full cursor-crosshair">
        <CarCanvas onSelectPart={setSelectedPart} />
      </main>

      {/* Detail Overlay when a part is clicked */}
      <InspectionOverlay 
        selectedPart={selectedPart} 
        onClose={() => setSelectedPart(null)} 
      />

      {/* Footer Instructions */}
      <footer className="absolute bottom-6 left-0 w-full pointer-events-none z-10 text-center">
        <p className="text-xs text-muted-foreground/60 uppercase tracking-[0.2em]">
          Drag to rotate • Pinch to zoom • Click red markers to inspect
        </p>
      </footer>
    </div>
  );
}

export default App;
