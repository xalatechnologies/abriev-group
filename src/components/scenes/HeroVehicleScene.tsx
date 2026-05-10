"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  PresentationControls,
} from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";
import { StylizedVehicle } from "./StylizedVehicle";

function Stage() {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.15) * 0.12;
  });

  return (
    <group ref={ref} position={[0, -0.6, 0]}>
      {/* Podium */}
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <cylinderGeometry args={[2.6, 2.8, 0.1, 64]} />
        <meshStandardMaterial color="#e5e2dd" metalness={0.1} roughness={0.55} />
      </mesh>
      <StylizedVehicle accent="#454843" />
    </group>
  );
}

export default function HeroVehicleScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [5.2, 2.1, 5.6], fov: 28 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#ffffff"]} />

      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4, 8, 6]}
        intensity={0.7}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-6, 4, -4]} intensity={0.2} />
      <spotLight
        position={[0, 9, 2]}
        angle={0.3}
        penumbra={0.9}
        intensity={1.2}
        castShadow
      />

      <PresentationControls
        global
        polar={[-0.05, 0.1]}
        azimuth={[-0.4, 0.4]}
        snap
      >
        <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.25}>
          <Stage />
        </Float>
      </PresentationControls>

      <ContactShadows
        position={[0, -0.62, 0]}
        opacity={0.45}
        scale={14}
        blur={2.6}
        far={4}
        resolution={1024}
        color="#1c1c19"
      />

      <Environment preset="apartment" environmentIntensity={0.55} />

      {/* Subtle fog to dissolve edges into the cream background */}
      <fog attach="fog" args={["#ffffff", 9, 20]} />
    </Canvas>
  );
}
