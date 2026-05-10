"use client";

import dynamic from "next/dynamic";

/**
 * Dynamic boundary: keeps three.js + drei out of the initial bundle.
 * SceneShell has already validated capability client-side before mounting.
 */
const HeroVehicleScene = dynamic(() => import("./HeroVehicleScene"), {
  ssr: false,
  loading: () => null,
});

export function HeroVehicleSceneClient() {
  return <HeroVehicleScene />;
}
