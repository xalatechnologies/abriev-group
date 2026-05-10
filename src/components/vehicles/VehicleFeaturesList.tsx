import { Check } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";

type VehicleFeaturesListProps = {
  vehicle: Vehicle;
};

export function VehicleFeaturesList({ vehicle }: VehicleFeaturesListProps) {
  if (!vehicle.features || vehicle.features.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-headline-lg text-headline-lg text-on-background">
        Equipment &amp; features
      </h2>
      <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
        {vehicle.features.map((f) => (
          <li
            key={f}
            className="flex items-center gap-3 font-body-md text-body-md text-on-surface"
          >
            <span
              aria-hidden
              className="flex size-5 items-center justify-center rounded-full bg-tertiary-fixed text-tertiary"
            >
              <Check className="size-3" />
            </span>
            {f}
          </li>
        ))}
      </ul>
    </section>
  );
}
