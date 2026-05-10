import type { Vehicle } from "@/types/vehicle";
import { VehicleGrid } from "./VehicleGrid";

type RelatedVehiclesProps = {
  vehicles: Vehicle[];
};

export function RelatedVehicles({ vehicles }: RelatedVehiclesProps) {
  if (vehicles.length === 0) return null;
  return (
    <section className="flex flex-col gap-8">
      <div className="flex items-end justify-between">
        <h2
          id="related-vehicles-heading"
          className="font-headline-lg text-headline-lg text-on-background"
        >
          You may also consider
        </h2>
      </div>
      <VehicleGrid vehicles={vehicles.slice(0, 3)} columns={3} />
    </section>
  );
}
