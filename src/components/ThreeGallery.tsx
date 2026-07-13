import { Canvas } from '@react-three/fiber';
import { ScrollControls, ContactShadows, Html } from '@react-three/drei';
import { GalleryItems } from './GalleryItems';
import { Suspense } from 'react';

export function ThreeGallery() {
  return (
    <div className="absolute inset-0 w-full h-screen bg-[#050505]">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 30]} />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.2} />
        <spotLight position={[0, 10, 0]} intensity={1} penumbra={1} color="#DC2626" />
        <spotLight position={[10, 5, 5]} intensity={2} penumbra={0.5} color="#3B82F6" />
        <spotLight position={[-10, -5, -5]} intensity={1} penumbra={1} color="#ffffff" />
        
        <Suspense fallback={
          <Html center>
            <div className="text-white text-xl font-bold animate-pulse whitespace-nowrap">
              Loading 3D Experience...
            </div>
          </Html>
        }>
          <ScrollControls pages={5} damping={0.2}>
            <GalleryItems />
          </ScrollControls>
        </Suspense>

        <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" position={[0, -2, 0]} />
      </Canvas>
    </div>
  );
}
