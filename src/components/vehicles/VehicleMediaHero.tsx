"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Box, ImageIcon } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";
import { SceneShell } from "@/components/scenes/SceneShell";
import { Vehicle3DViewerClient } from "@/components/scenes/Vehicle3DViewerClient";
import { cn } from "@/lib/utils/cn";

type VehicleMediaHeroProps = {
  vehicle: Vehicle;
};

export function VehicleMediaHero({ vehicle }: VehicleMediaHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<"gallery" | "3d">("gallery");
  const gallery = vehicle.gallery.length > 0 ? vehicle.gallery : [vehicle.heroImage];
  const current = gallery[activeIndex] ?? vehicle.heroImage;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-surface-container-high editorial-shadow-lg">
        <AnimatePresence mode="wait">
          {mode === "gallery" ? (
            <motion.div
              key={`img-${activeIndex}`}
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
                className="object-cover"
              />
            </motion.div>
          ) : (
            <motion.div
              key="scene"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <SceneShell
                posterAlt={`${vehicle.title} — 3D viewer`}
                poster={vehicle.heroImage.src}
                aspect="detail"
                className="h-full !rounded-none"
              >
                <Vehicle3DViewerClient />
              </SceneShell>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-background/85 p-1.5 shadow-editorial backdrop-blur">
          <ModeButton
            active={mode === "gallery"}
            onClick={() => setMode("gallery")}
            icon={<ImageIcon className="size-4" aria-hidden />}
            label="Photos"
          />
          <ModeButton
            active={mode === "3d"}
            onClick={() => setMode("3d")}
            icon={<Box className="size-4" aria-hidden />}
            label="3D"
          />
        </div>
      </div>

      {mode === "gallery" && gallery.length > 1 ? (
        <div className="grid grid-cols-4 gap-3 md:grid-cols-6">
          {gallery.map((m, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition-all duration-300",
                i === activeIndex
                  ? "border-tertiary"
                  : "border-card-border hover:border-card-border-hover",
              )}
            >
              <Image
                src={m.src}
                alt={m.alt}
                fill
                sizes="(max-width: 768px) 25vw, 15vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ModeButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full px-3 font-label-caps text-label-caps uppercase transition-colors duration-200",
        active
          ? "bg-tertiary text-on-tertiary"
          : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-background",
      )}
    >
      {icon}
      {label}
    </button>
  );
}
