import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { CarModel } from './CarModel';

interface ShowroomCanvasProps {
  carColor: string;
}

export function ShowroomCanvas({ carColor }: ShowroomCanvasProps) {
  return (
    <div className="absolute inset-0 w-full h-screen bg-[#0a0a0c]">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[4, 1.5, 6]} fov={35} />
        <color attach="background" args={['#0a0a0c']} />
        <fog attach="fog" args={['#0a0a0c', 5, 20]} />

        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={3} 
          maxDistance={10}
          maxPolarAngle={Math.PI / 2 - 0.05} // Prevent camera from going under the floor
          autoRotate
          autoRotateSpeed={0.5}
        />

        {/* Dramatic Showroom Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 5, 0]} intensity={200} penumbra={1} color="#ffffff" angle={0.6} distance={10} castShadow />
        <spotLight position={[5, 2, 5]} intensity={50} penumbra={0.5} color="#00f3ff" angle={0.5} distance={15} />
        <spotLight position={[-5, 2, -5]} intensity={50} penumbra={0.5} color="#ff003c" angle={0.5} distance={15} />
        
        {/* The Car */}
        <Suspense fallback={null}>
          <CarModel color={carColor} />
          {/* Reflection Environment */}
          <Environment preset="studio" />
        </Suspense>

        {/* Floor Reflections & Shadows */}
        <ContactShadows resolution={1024} scale={10} blur={2.5} opacity={0.7} far={10} color="#000000" position={[0, -0.7, 0]} />
        
        <mesh position={[0, -0.71, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#0a0a0c" roughness={0.1} metalness={0.8} />
        </mesh>
      </Canvas>
    </div>
  );
}
