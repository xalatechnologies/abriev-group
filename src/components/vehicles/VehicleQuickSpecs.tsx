import { Gauge, Zap, Fuel, Cog, MapPin, Calendar } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";
import { formatMileage, formatNumber } from "@/lib/utils/format";
import { Container } from "@/components/ui/Container";

type VehicleQuickSpecsProps = {
  vehicle: Vehicle;
};

export function VehicleQuickSpecs({ vehicle }: VehicleQuickSpecsProps) {
  const items = buildItems(vehicle);

  return (
    <section
      className="section-y border-t border-outline-variant bg-surface-container-low"
      aria-labelledby="vehicle-quick-specs-heading"
    >
      <Container>
        <h2 id="vehicle-quick-specs-heading" className="sr-only">
          At a glance
        </h2>
        <dl className="grid grid-cols-2 gap-x-10 gap-y-7 border-y border-outline-variant py-8 md:grid-cols-3 lg:grid-cols-6">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <dt className="font-label-caps text-label-caps inline-flex items-center gap-2 uppercase text-on-surface-variant">
                <item.icon className="size-3.5 text-tertiary" aria-hidden />
                {item.label}
              </dt>
              <dd className="font-headline-md text-headline-md leading-tight text-on-background">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

function buildItems(v: Vehicle) {
  const out: Array<{
    label: string;
    value: string;
    icon: typeof Gauge;
  }> = [];

  out.push({
    label: "Year",
    value: String(v.specs.year),
    icon: Calendar,
  });

  if (v.specs.mileage !== undefined) {
    out.push({
      label: "Mileage",
      value: formatMileage(v.specs.mileage) ?? "—",
      icon: Gauge,
    });
  } else {
    out.push({
      label: "Mileage",
      value: "Delivery",
      icon: Gauge,
    });
  }

  if (v.specs.horsepower) {
    out.push({
      label: "Power",
      value: `${formatNumber(v.specs.horsepower)} bhp`,
      icon: Zap,
    });
  }

  out.push({
    label: "Fuel",
    value: prettyFuel(v.specs.fuel),
    icon: Fuel,
  });

  out.push({
    label: "Transmission",
    value: prettyTransmission(v.specs.transmission),
    icon: Cog,
  });

  out.push({
    label: "Location",
    value: v.location.city,
    icon: MapPin,
  });

  return out;
}

function prettyFuel(f: Vehicle["specs"]["fuel"]) {
  return {
    petrol: "Petrol",
    diesel: "Diesel",
    hybrid: "Hybrid",
    "plug-in-hybrid": "Plug-in hybrid",
    electric: "Electric",
  }[f];
}

function prettyTransmission(t: Vehicle["specs"]["transmission"]) {
  return {
    automatic: "Automatic",
    manual: "Manual",
    dct: "Dual-clutch",
    cvt: "CVT",
  }[t];
}
