import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

// A stylized procedural car model
function StylizedCar({ onSelectPart }: { onSelectPart: (part: string) => void }) {
  const bodyRef = useRef<THREE.Group>(null);
  
  // Hover states for interactions
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  // Materials
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: '#DC2626', // Accent Red
    metalness: 0.6,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: '#0F172A',
    metalness: 0.9,
    roughness: 0.1,
    transmission: 0.9,
    transparent: true,
  });

  const wheelMaterial = new THREE.MeshStandardMaterial({
    color: '#111111',
    roughness: 0.8,
    metalness: 0.2,
  });

  const rimMaterial = new THREE.MeshStandardMaterial({
    color: '#CBD5E1',
    metalness: 0.8,
    roughness: 0.2,
  });

  const handlePointerOver = (e: any, part: string) => {
    e.stopPropagation();
    setHoveredPart(part);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    setHoveredPart(null);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e: any, part: string) => {
    e.stopPropagation();
    onSelectPart(part);
  };

  return (
    <group ref={bodyRef} position={[0, 0.5, 0]}>
      {/* Car Body */}
      <group 
        onClick={(e) => handleClick(e, 'Body & Aerodynamics')}
        onPointerOver={(e) => handlePointerOver(e, 'Body')}
        onPointerOut={handlePointerOut}
      >
        {/* Main chassis */}
        <mesh position={[0, 0.2, 0]} material={bodyMaterial} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.4, 4]} />
        </mesh>
        
        {/* Cabin */}
        <mesh position={[0, 0.65, -0.2]} material={glassMaterial} castShadow>
          <boxGeometry args={[1.4, 0.5, 2]} />
        </mesh>
        
        {/* Spoiler */}
        <mesh position={[0, 0.7, 1.8]} material={bodyMaterial} castShadow>
          <boxGeometry args={[1.6, 0.05, 0.4]} />
        </mesh>
        <mesh position={[-0.6, 0.55, 1.8]} material={bodyMaterial} castShadow>
          <boxGeometry args={[0.05, 0.3, 0.3]} />
        </mesh>
        <mesh position={[0.6, 0.55, 1.8]} material={bodyMaterial} castShadow>
          <boxGeometry args={[0.05, 0.3, 0.3]} />
        </mesh>
      </group>

      {/* Engine Area (Front) */}
      <mesh 
        position={[0, 0.45, -1.2]} 
        onClick={(e) => handleClick(e, 'V8 Hybrid Powertrain')}
        onPointerOver={(e) => handlePointerOver(e, 'Engine')}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={[1.5, 0.1, 1.2]} />
        <meshStandardMaterial color={hoveredPart === 'Engine' ? '#F87171' : '#334155'} metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Wheels */}
      {/* Front Left */}
      <group position={[-1.0, 0, -1.2]}>
        <mesh rotation={[0, 0, Math.PI / 2]} material={wheelMaterial} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} material={rimMaterial}>
          <cylinderGeometry args={[0.3, 0.3, 0.32, 16]} />
        </mesh>
      </group>
      {/* Front Right */}
      <group position={[1.0, 0, -1.2]}>
        <mesh rotation={[0, 0, Math.PI / 2]} material={wheelMaterial} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} material={rimMaterial}>
          <cylinderGeometry args={[0.3, 0.3, 0.32, 16]} />
        </mesh>
      </group>
      {/* Rear Left */}
      <group position={[-1.0, 0, 1.3]}>
        <mesh rotation={[0, 0, Math.PI / 2]} material={wheelMaterial} castShadow>
          <cylinderGeometry args={[0.45, 0.45, 0.35, 32]} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} material={rimMaterial}>
          <cylinderGeometry args={[0.35, 0.35, 0.37, 16]} />
        </mesh>
      </group>
      {/* Rear Right */}
      <group position={[1.0, 0, 1.3]} 
        onClick={(e) => handleClick(e, 'Performance Wheels & Brakes')}
        onPointerOver={(e) => handlePointerOver(e, 'Wheels')}
        onPointerOut={handlePointerOut}
      >
        <mesh rotation={[0, 0, Math.PI / 2]} material={wheelMaterial} castShadow>
          <cylinderGeometry args={[0.45, 0.45, 0.35, 32]} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} material={rimMaterial}>
          <cylinderGeometry args={[0.35, 0.35, 0.37, 16]} />
        </mesh>
      </group>

      {/* Hotspots */}
      <Hotspot position={[0, 0.8, -1.2]} label="Engine" onClick={() => onSelectPart('V8 Hybrid Powertrain')} />
      <Hotspot position={[1.3, 0.2, 1.3]} label="Wheels" onClick={() => onSelectPart('Performance Wheels & Brakes')} />
      <Hotspot position={[0, 1.0, 1.8]} label="Aero" onClick={() => onSelectPart('Body & Aerodynamics')} />
    </group>
  );
}

function Hotspot({ position, label, onClick }: { position: [number, number, number], label: string, onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group position={position}>
      <Html center zIndexRange={[100, 0]}>
        <div 
          className={`flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-all duration-300 ${hovered ? 'bg-primary scale-110 shadow-[0_0_15px_rgba(220,38,38,0.7)]' : 'bg-background/80 border border-primary/50 text-primary'}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={onClick}
        >
          <div className="w-3 h-3 bg-current rounded-full" />
        </div>
        {hovered && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background/90 text-foreground px-3 py-1 rounded border border-border text-sm font-display tracking-widest uppercase pointer-events-none">
            {label}
          </div>
        )}
      </Html>
    </group>
  );
}

export default function CarCanvas({ onSelectPart }: { onSelectPart: (part: string) => void }) {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [5, 3, -6], fov: 45 }}>
        <color attach="background" args={['#0F172A']} />
        
        {/* Studio Lighting Setup */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <spotLight position={[-10, 10, -10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        {/* Environment Map for realistic reflections */}
        <Environment preset="city" />

        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <StylizedCar onSelectPart={onSelectPart} />
        </Float>

        <ContactShadows position={[0, -0.1, 0]} opacity={0.7} scale={10} blur={2.5} far={4} color="#000000" />
        
        <OrbitControls 
          enablePan={false} 
          minDistance={3} 
          maxDistance={12} 
          maxPolarAngle={Math.PI / 2 + 0.1}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
