"use client";

import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Float,
} from "@react-three/drei";
import { StylizedVehicle } from "./StylizedVehicle";

type Vehicle3DViewerProps = {
  accent?: string;
};

/**
 * Compact viewer for the vehicle detail page. Restrained rotation,
 * soft shadows, editorial studio lighting.
 */
export default function Vehicle3DViewer({
  accent = "#454843",
}: Vehicle3DViewerProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [4.6, 1.8, 5.2], fov: 30 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#fafafa"]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 7, 5]} intensity={0.8} castShadow />
      <directionalLight position={[-5, 3, -3]} intensity={0.25} />

      <Float speed={0.6} rotationIntensity={0.08} floatIntensity={0.18}>
        <group position={[0, -0.6, 0]}>
          <mesh receiveShadow position={[0, -0.05, 0]}>
            <cylinderGeometry args={[2.4, 2.6, 0.08, 64]} />
            <meshStandardMaterial
              color="#e5e2dd"
              metalness={0.1}
              roughness={0.55}
            />
          </mesh>
          <StylizedVehicle accent={accent} />
        </group>
      </Float>

      <ContactShadows
        position={[0, -0.62, 0]}
        opacity={0.4}
        scale={12}
        blur={2.4}
        far={4}
        resolution={1024}
        color="#1c1c19"
      />

      <Environment preset="apartment" environmentIntensity={0.5} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.6}
        rotateSpeed={0.35}
      />
    </Canvas>
  );
}
