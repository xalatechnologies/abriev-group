"use client";

/**
 * Detects whether we should render 3D scenes on the current device.
 * Falls back to static imagery if WebGL is unavailable, the user prefers
 * reduced motion, or (optionally) on low-memory / small viewports.
 */
export function canRunScenes({
  allowOnMobile = true,
}: { allowOnMobile?: boolean } = {}): boolean {
  if (typeof window === "undefined") return false;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReduced) return false;

  if (!allowOnMobile) {
    const isSmall = window.matchMedia("(max-width: 768px)").matches;
    if (isSmall) return false;
  }

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

export function useShouldRenderScene(
  opts: { allowOnMobile?: boolean } = {},
): boolean {
  if (typeof window === "undefined") return false;
  return canRunScenes(opts);
}
