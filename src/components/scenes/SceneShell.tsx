"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { canRunScenes } from "@/lib/utils/capabilities";
import { SceneFallbackPoster } from "./SceneFallbackPoster";

type SceneShellProps = {
  children: ReactNode;
  poster?: string;
  posterAlt: string;
  className?: string;
  aspect?: "hero" | "square" | "detail";
  allowOnMobile?: boolean;
};

const aspectMap = {
  hero: "aspect-[4/5] lg:aspect-[5/6]",
  square: "aspect-square",
  detail: "aspect-[16/10]",
} as const;

/**
 * Generic wrapper for a 3D scene: detects device capability, lazy-loads the
 * scene, and falls back to a static poster when WebGL / prefers-reduced-motion
 * would be disrespected.
 */
export function SceneShell({
  children,
  poster,
  posterAlt,
  className,
  aspect = "hero",
  allowOnMobile = true,
}: SceneShellProps) {
  const [ready, setReady] = useState(false);
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    setShowScene(canRunScenes({ allowOnMobile }));
    setReady(true);
  }, [allowOnMobile]);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-surface-container-high",
        aspectMap[aspect],
        className,
      )}
    >
      <div className="absolute inset-0">
        <SceneFallbackPoster src={poster} alt={posterAlt} priority />
      </div>
      {ready && showScene ? (
        <div className="absolute inset-0 animate-fade-in">{children}</div>
      ) : null}
    </div>
  );
}
