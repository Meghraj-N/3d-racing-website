import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface CarModelProps {
  color: string;
}

export function CarModel({ color }: CarModelProps) {
  // Free, extremely high quality Porsche 911 GLTF from Poimandres marketplace
  const { scene, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/porsche-911-carrera-4s/model.gltf') as any;

  // Apply the custom color to the car's body paint material
  if (materials && materials.paint) {
    materials.paint.color = new THREE.Color(color);
    materials.paint.envMapIntensity = 2; // Make it super reflective for that Asphalt 9 look
    materials.paint.roughness = 0.1;
    materials.paint.metalness = 0.8;
  }
  
  if (materials && materials.window) {
    materials.window.envMapIntensity = 3;
    materials.window.transparent = true;
    materials.window.opacity = 0.8;
  }

  return (
    <group dispose={null} position={[0, -0.7, 0]} rotation={[0, -Math.PI / 4, 0]}>
      <primitive object={scene} />
    </group>
  );
}

// Preload the model so it caches
useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/porsche-911-carrera-4s/model.gltf');
