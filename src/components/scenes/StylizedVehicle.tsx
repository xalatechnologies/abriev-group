"use client";

import { useMemo } from "react";
import { Mesh, MeshStandardMaterial, DoubleSide } from "three";

/**
 * A stylized automotive silhouette built from primitives. Restrained,
 * editorial — suggests a vehicle without being literal.
 */
export function StylizedVehicle({ accent = "#5e5f5c" }: { accent?: string }) {
  const bodyMat = useMemo(
    () =>
      new MeshStandardMaterial({
        color: accent,
        metalness: 0.75,
        roughness: 0.35,
      }),
    [accent],
  );

  const darkMat = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#1c1c19",
        metalness: 0.4,
        roughness: 0.55,
      }),
    [],
  );

  const glassMat = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#31302d",
        metalness: 0.2,
        roughness: 0.1,
        transparent: true,
        opacity: 0.6,
        side: DoubleSide,
      }),
    [],
  );

  const rimMat = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#c7c7c3",
        metalness: 0.95,
        roughness: 0.2,
      }),
    [],
  );

  return (
    <group position={[0, 0.6, 0]}>
      {/* Main body */}
      <mesh
        castShadow
        receiveShadow
        position={[0, 0.25, 0]}
        material={bodyMat}
      >
        <boxGeometry args={[3.2, 0.5, 1.3]} />
      </mesh>

      {/* Rounded nose */}
      <mesh
        castShadow
        receiveShadow
        position={[1.6, 0.25, 0]}
        rotation={[0, 0, 0]}
        material={bodyMat}
      >
        <cylinderGeometry args={[0.26, 0.26, 1.3, 24]} />
      </mesh>

      {/* Rounded tail */}
      <mesh
        castShadow
        receiveShadow
        position={[-1.6, 0.25, 0]}
        material={bodyMat}
      >
        <cylinderGeometry args={[0.26, 0.26, 1.3, 24]} />
      </mesh>

      {/* Cabin — slight trapezoid sloping forward */}
      <mesh
        castShadow
        receiveShadow
        position={[-0.1, 0.72, 0]}
        material={bodyMat}
      >
        <boxGeometry args={[1.6, 0.42, 1.15]} />
      </mesh>

      {/* Windshield */}
      <mesh
        position={[0.72, 0.7, 0]}
        rotation={[0, 0, -0.45]}
        material={glassMat}
      >
        <boxGeometry args={[0.1, 0.56, 1.05]} />
      </mesh>

      {/* Side glass */}
      <mesh
        position={[-0.1, 0.84, 0.58]}
        material={glassMat}
      >
        <boxGeometry args={[1.4, 0.3, 0.02]} />
      </mesh>
      <mesh
        position={[-0.1, 0.84, -0.58]}
        material={glassMat}
      >
        <boxGeometry args={[1.4, 0.3, 0.02]} />
      </mesh>

      {/* Wheels + rims */}
      <Wheel x={1.1} z={0.72} darkMat={darkMat} rimMat={rimMat} />
      <Wheel x={1.1} z={-0.72} darkMat={darkMat} rimMat={rimMat} />
      <Wheel x={-1.1} z={0.72} darkMat={darkMat} rimMat={rimMat} />
      <Wheel x={-1.1} z={-0.72} darkMat={darkMat} rimMat={rimMat} />
    </group>
  );
}

function Wheel({
  x,
  z,
  darkMat,
  rimMat,
}: {
  x: number;
  z: number;
  darkMat: MeshStandardMaterial;
  rimMat: MeshStandardMaterial;
}) {
  return (
    <group position={[x, -0.05, z]}>
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]} material={darkMat}>
        <cylinderGeometry args={[0.36, 0.36, 0.22, 32]} />
      </mesh>
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, z > 0 ? 0.115 : -0.115]}
        material={rimMat}
      >
        <cylinderGeometry args={[0.22, 0.22, 0.02, 24]} />
      </mesh>
    </group>
  );
}

// Ensure Mesh type is referenced to keep three side-effect imports tree-shake safe
export type __Touch = Mesh;
