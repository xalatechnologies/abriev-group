import type { Vehicle } from "@/types/vehicle";
import { cn } from "@/lib/utils/cn";
import { VehicleCard } from "./VehicleCard";

type VehicleGridProps = {
  vehicles: Vehicle[];
  columns?: 2 | 3 | 4;
  priorityCount?: number;
  tone?: "light" | "container";
  className?: string;
  emptyTitle?: string;
  emptyDescription?: string;
};

const colMap = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
} as const;

export function VehicleGrid({
  vehicles,
  columns = 3,
  priorityCount = 0,
  tone = "light",
  className,
  emptyTitle = "No vehicles match your filters.",
  emptyDescription = "Try adjusting the filters, or clear them to see the full catalog.",
}: VehicleGridProps) {
  if (vehicles.length === 0) {
    return (
      <div className="rounded-xl border border-card-border bg-surface-container-lowest px-8 py-16 text-center">
        <p className="font-headline-md text-headline-md text-on-background">{emptyTitle}</p>
        <p className="mt-2 font-body-md text-body-md text-on-surface-variant">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 gap-8 md:gap-10", colMap[columns], className)}>
      {vehicles.map((v, i) => (
        <VehicleCard
          key={v.id}
          vehicle={v}
          priority={i < priorityCount}
          tone={tone}
        />
      ))}
    </div>
  );
}
