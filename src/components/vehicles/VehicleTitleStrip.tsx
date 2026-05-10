"use client";

import { useRouter } from "@/i18n/navigation";
import { ArrowLeft, Heart, Share2 } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";
import { IconButton } from "@/components/ui/IconButton";
import { Badge } from "@/components/ui/Badge";

type VehicleTitleStripProps = {
  vehicle: Vehicle;
};

export function VehicleTitleStrip({ vehicle }: VehicleTitleStripProps) {
  const router = useRouter();

  const categoryLabel = {
    new: "New",
    used: "Pre-owned",
    "for-rent": "For rent",
  }[vehicle.category];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-sm font-body-md text-body-md text-on-surface-variant transition-colors hover:text-on-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
        >
          <ArrowLeft className="size-4 shrink-0" aria-hidden />
          Back
        </button>
      </div>

      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" size="sm">
              {vehicle.specs.year}
            </Badge>
            <Badge variant="outline" size="sm">
              {categoryLabel}
            </Badge>
            {vehicle.editorsPick ? (
              <Badge variant="inverse" size="sm">
                Editor&apos;s pick
              </Badge>
            ) : null}
            {vehicle.status !== "available" ? (
              <Badge
                variant={vehicle.status === "reserved" ? "success" : "error"}
                size="sm"
              >
                {vehicle.status}
              </Badge>
            ) : null}
          </div>
          <h1 className="font-display-lg text-display-lg text-balance text-on-background">
            {vehicle.make} <em className="italic text-tertiary">{vehicle.model}</em>
            {vehicle.trim ? (
              <span className="text-on-surface-variant"> — {vehicle.trim}</span>
            ) : null}
          </h1>
          {vehicle.subtitle ? (
            <p className="max-w-4xl font-body-lg text-body-lg text-on-surface-variant text-pretty">
              {vehicle.subtitle}
            </p>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <IconButton aria-label="Save to favorites" variant="outline">
            <Heart className="size-4" aria-hidden />
          </IconButton>
          <IconButton aria-label="Share vehicle" variant="outline">
            <Share2 className="size-4" aria-hidden />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
