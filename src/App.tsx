import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { ShowroomCanvas } from './components/ShowroomCanvas';
import { AsphaltUI } from './components/AsphaltUI';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  const [carColor, setCarColor] = useState('#ff0022'); // Default Racing Red

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-full h-screen overflow-hidden bg-black relative selection:bg-cyan-500/30">
        <ErrorBoundary>
          {/* 3D Background Layer */}
          <ShowroomCanvas carColor={carColor} />
          
          {/* Game UI Overlay Layer */}
          <AsphaltUI currentColor={carColor} onColorChange={setCarColor} />
        </ErrorBoundary>
      </div>
    </ThemeProvider>
  );
}

export default App;
