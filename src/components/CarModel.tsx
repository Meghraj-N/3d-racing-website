import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect } from 'react';

interface CarModelProps {
  color: string;
}

export function CarModel({ color }: CarModelProps) {
  // Load local Ferrari GLB to prevent CORS or network blocks
  const { scene } = useGLTF('./models/ferrari.glb') as any;

  useEffect(() => {
    if (scene) {
      scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          const matName = child.material.name.toLowerCase();
          // Apply color to the main body paint
          if (matName.includes('body') || matName.includes('paint') || matName === 'yellow') {
            const mat = child.material;
            mat.color = new THREE.Color(color);
            mat.envMapIntensity = 2; // Make it super reflective for that Asphalt 9 look
            mat.roughness = 0.1;
            mat.metalness = 0.8;
          }
          // Make windows more transparent and reflective
          if (matName.includes('glass') || matName.includes('window')) {
            const mat = child.material;
            mat.envMapIntensity = 3;
            mat.transparent = true;
            mat.opacity = 0.6;
          }
        }
      });
    }
  }, [scene, color]);

  return (
    <group dispose={null} position={[0, -0.7, 0]} rotation={[0, -Math.PI / 4, 0]}>
      <primitive object={scene} />
    </group>
  );
}

// Preload the model so it caches
useGLTF.preload('./models/ferrari.glb');
