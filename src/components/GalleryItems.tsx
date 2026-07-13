import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Text, useScroll, Float } from '@react-three/drei';
import * as THREE from 'three';

const IMAGES = [
  "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2115&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1610411135515-5eec83bb6d6e?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop"
];

export function GalleryItems() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    
    // Move the entire group forward along the Z-axis based on scroll
    // A page is roughly viewport.height in this context, but with ScrollControls we use scroll.offset (0 to 1)
    const zOffset = scroll.offset * 30; // Move 30 units forward over 5 pages
    groupRef.current.position.z = zOffset;
  });

  return (
    <group ref={groupRef}>
      
      {/* Intro Text - Page 1 */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.8}
          font="https://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3t-4s51os.woff"
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.05}
        >
          THE NEW BMW M8
        </Text>
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.3}
          font="https://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3t-4s51os.woff"
          color="#DC2626"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.2}
        >
          COMPETITION
        </Text>
      </Float>

      {/* Hero Image - Page 2 */}
      <Image
        url={IMAGES[0]}
        position={[-2, 0, -6]}
        scale={[6, 4]} // 3:2 aspect ratio roughly
        transparent
        opacity={1}
      />
      <Text
        position={[2.5, 0, -5]}
        fontSize={0.4}
        maxWidth={3}
        lineHeight={1.5}
        color="#a1a1aa"
        font="https://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3t-4s51os.woff"
      >
        Uncompromising power and elegant design perfectly intertwined in the ultimate driving machine.
      </Text>

      {/* Exterior - Page 3 */}
      <Image
        url={IMAGES[1]}
        position={[2, -1, -14]}
        scale={[5, 3.3]}
      />
      <Text
        position={[-2, 1, -13]}
        fontSize={0.6}
        color="#ffffff"
        font="https://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3t-4s51os.woff"
      >
        AERODYNAMICS
      </Text>
      <Text
        position={[-2, 0, -13]}
        fontSize={0.3}
        maxWidth={3}
        color="#3B82F6"
        font="https://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3t-4s51os.woff"
      >
        M Carbon Roof.
        Active Air Intakes.
        Aggressive Downforce.
      </Text>

      {/* Specs Text Floating - Page 4 */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Text position={[0, 1.5, -20]} fontSize={1.2} color="#DC2626" font="https://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3t-4s51os.woff">
          617 HP
        </Text>
        <Text position={[-3, -1, -21]} fontSize={0.8} color="#ffffff" font="https://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3t-4s51os.woff">
          3.0s
        </Text>
        <Text position={[-3, -1.8, -21]} fontSize={0.3} color="#a1a1aa" font="https://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3t-4s51os.woff">
          0-60 MPH
        </Text>
        <Text position={[3, -0.5, -22]} fontSize={0.8} color="#ffffff" font="https://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3t-4s51os.woff">
          190 MPH
        </Text>
        <Text position={[3, -1.3, -22]} fontSize={0.3} color="#a1a1aa" font="https://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3t-4s51os.woff">
          TOP SPEED
        </Text>
      </Float>

      {/* Interior - Page 5 */}
      <Image
        url={IMAGES[2]}
        position={[0, 0, -28]}
        scale={[8, 5]}
      />
      <Text
        position={[0, -3.2, -27.5]}
        fontSize={0.4}
        color="#ffffff"
        letterSpacing={0.1}
        font="https://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3t-4s51os.woff"
      >
        MOTORSPORT LUXURY
      </Text>

    </group>
  );
}
