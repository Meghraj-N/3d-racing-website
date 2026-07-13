import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import type { Car, TuningPart } from '../data/cars';

interface CarCanvasProps {
  activeMode: 'garage' | 'tuning';
  selectedCar: Car;
  appliedParts: Record<string, TuningPart>;
  onHotspotClick: (id: string) => void;
}

export function CarCanvas({ activeMode, selectedCar, appliedParts, onHotspotClick }: CarCanvasProps) {
  // Setup camera positions based on mode
  const orbitRef = useRef<any>(null);

  useEffect(() => {
    if (!orbitRef.current) return;
    
    // Animate camera when switching modes
    if (activeMode === 'garage') {
      // Zoomed out, rotating around
      orbitRef.current.autoRotate = true;
      orbitRef.current.autoRotateSpeed = 0.5;
    } else {
      // Zoomed in for tuning
      orbitRef.current.autoRotate = false;
    }
  }, [activeMode]);

  return (
    <Canvas camera={{ position: [5, 2, 5], fov: 45 }}>
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 5, 20]} />

      {/* Dramatic Lighting */}
      <ambientLight intensity={0.2} />
      <spotLight position={[0, 10, 0]} intensity={1.5} penumbra={1} color="#DC2626" />
      <spotLight position={[5, 5, -5]} intensity={2} penumbra={0.5} color="#ffffff" />
      <spotLight position={[-5, 5, 5]} intensity={2} penumbra={0.5} color="#ffffff" />

      {/* Environment Reflections */}
      <Environment preset="studio" />

      <group position={[0, -0.5, 0]}>
        {/* The Car Model */}
        <CarModel selectedCar={selectedCar} appliedParts={appliedParts} />

        {/* Hotspots - only show in tuning mode */}
        {activeMode === 'tuning' && (
          <>
            <Hotspot position={[0, 0.8, 1.2]} label="Engine" onClick={() => onHotspotClick('engine')} />
            <Hotspot position={[1, 0.4, 1.2]} label="Rims" onClick={() => onHotspotClick('rims')} />
            <Hotspot position={[0, 0.6, -1.8]} label="Aero" onClick={() => onHotspotClick('aero')} />
          </>
        )}

        {/* Floor & Shadows */}
        <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.5} far={2} color="#000000" />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.8} />
        </mesh>
      </group>

      <OrbitControls 
        ref={orbitRef}
        enablePan={false}
        minDistance={3}
        maxDistance={activeMode === 'garage' ? 10 : 6}
        maxPolarAngle={Math.PI / 2 - 0.05}
        target={[0, 0.5, 0]}
      />
    </Canvas>
  );
}

function CarModel({ selectedCar, appliedParts }: { selectedCar: Car, appliedParts: Record<string, TuningPart> }) {
  // NOTE: In a real environment with the actual .glb files present, we would use:
  // const { scene } = useGLTF(selectedCar.modelUrl);
  // and traverse the scene to apply the color to the body mesh.
  // Since we don't have the files locally yet, we render a high-quality placeholder 
  // that uses the user's selected paint color and spoiler state.
  
  const paintColor = appliedParts.color?.value || selectedCar.defaultColor;
  const hasSpoiler = appliedParts.spoiler?.value !== 'spoiler_stock';

  return (
    <group>
      {/* Chassis Placeholder */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.3, 4]} />
        <meshPhysicalMaterial 
          color={paintColor} 
          metalness={0.6} 
          roughness={0.2} 
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* Cabin */}
      <mesh position={[0, 0.75, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.4, 2]} />
        <meshPhysicalMaterial color="#111111" metalness={0.9} roughness={0.1} transmission={0.9} thickness={0.5} />
      </mesh>

      {/* Wheels */}
      <Wheel position={[-1, 0.25, 1.3]} />
      <Wheel position={[1, 0.25, 1.3]} />
      <Wheel position={[-1, 0.25, -1.3]} />
      <Wheel position={[1, 0.25, -1.3]} />

      {/* Dynamic Spoiler */}
      {hasSpoiler && (
        <group position={[0, 0.7, -1.8]}>
          <mesh position={[0, 0.2, 0]} castShadow>
            <boxGeometry args={[1.6, 0.05, 0.4]} />
            <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[-0.6, 0.1, 0]} castShadow>
            <boxGeometry args={[0.05, 0.2, 0.2]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
          <mesh position={[0.6, 0.1, 0]} castShadow>
            <boxGeometry args={[0.05, 0.2, 0.2]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
        </group>
      )}
    </group>
  );
}

function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[0, 0, Math.PI / 2]} castShadow>
      <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
      <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.5} />
    </mesh>
  );
}

function Hotspot({ position, label, onClick }: { position: [number, number, number], label: string, onClick: () => void }) {
  return (
    <Html position={position} center zIndexRange={[100, 0]}>
      <div 
        className="group relative flex items-center justify-center cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <div className="absolute w-8 h-8 bg-red-500 rounded-full animate-ping opacity-50" />
        <div className="relative w-4 h-4 bg-red-600 border-2 border-white rounded-full transition-transform group-hover:scale-150 shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
        <div className="absolute left-8 bg-slate-900/90 border border-red-500/50 text-white text-xs font-bold px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest backdrop-blur-sm">
          {label}
        </div>
      </div>
    </Html>
  );
}
