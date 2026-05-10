import type { Vehicle } from "@/types/vehicle";

type VehicleOverviewProps = {
  vehicle: Vehicle;
};

export function VehicleOverview({ vehicle }: VehicleOverviewProps) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-baseline justify-between">
        <h2 className="font-headline-lg text-headline-lg text-on-background">
          Overview
        </h2>
      </div>
      <div className="max-w-prose space-y-5 font-body-lg text-body-lg text-on-surface-variant text-pretty">
        {vehicle.overview ? (
          <p>{vehicle.overview}</p>
        ) : (
          <p>
            {vehicle.subtitle ??
              `A considered example of the ${vehicle.make} ${vehicle.model}, presented here with full documentation and editorial photography by our team.`}
          </p>
        )}
        <p>
          Every vehicle on ABRIEV is reviewed before publication. Provenance,
          service history, and condition reports are prepared by the listing
          dealer and are available on request.
        </p>
      </div>
    </section>
  );
}
