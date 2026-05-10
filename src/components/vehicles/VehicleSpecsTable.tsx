import type { Vehicle } from "@/types/vehicle";
import { formatMileage, formatNumber } from "@/lib/utils/format";

type VehicleSpecsTableProps = {
  vehicle: Vehicle;
};

export function VehicleSpecsTable({ vehicle }: VehicleSpecsTableProps) {
  const rows = buildRows(vehicle);
  if (rows.length === 0) return null;

  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-headline-lg text-headline-lg text-on-background">
        Specifications
      </h2>
      <div className="rounded-xl border border-card-border bg-surface-container-lowest">
        <dl className="divide-y divide-card-divider">
          {rows.map((r) => (
            <div
              key={r.label}
              className="grid grid-cols-3 items-baseline gap-6 px-6 py-4 md:grid-cols-[1fr_2fr]"
            >
              <dt className="font-label-caps text-label-caps uppercase text-on-surface-variant">
                {r.label}
              </dt>
              <dd className="col-span-2 font-body-md text-body-md text-on-background md:col-span-1">
                {r.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function buildRows(v: Vehicle) {
  const rows: Array<{ label: string; value: string }> = [];
  if (v.specs.engine) rows.push({ label: "Engine", value: v.specs.engine });
  if (v.specs.horsepower)
    rows.push({ label: "Power", value: `${formatNumber(v.specs.horsepower)} bhp` });
  if (v.specs.torqueNm)
    rows.push({ label: "Torque", value: `${formatNumber(v.specs.torqueNm)} Nm` });
  if (v.specs.zeroToSixty)
    rows.push({ label: "0 — 60 mph", value: `${v.specs.zeroToSixty.toFixed(1)} seconds` });
  if (v.specs.topSpeedMph)
    rows.push({ label: "Top speed", value: `${v.specs.topSpeedMph} mph` });
  if (v.specs.rangeMiles)
    rows.push({ label: "Range", value: `${formatNumber(v.specs.rangeMiles)} miles` });
  if (v.specs.batteryKwh)
    rows.push({ label: "Battery", value: `${v.specs.batteryKwh} kWh` });
  if (v.specs.mileage !== undefined)
    rows.push({ label: "Mileage", value: formatMileage(v.specs.mileage) ?? "—" });
  rows.push({ label: "Fuel", value: prettyFuel(v.specs.fuel) });
  rows.push({
    label: "Transmission",
    value: prettyTransmission(v.specs.transmission),
  });
  rows.push({ label: "Drivetrain", value: v.specs.drivetrain.toUpperCase() });
  if (v.specs.seats !== undefined)
    rows.push({ label: "Seats", value: String(v.specs.seats) });
  if (v.specs.doors !== undefined)
    rows.push({ label: "Doors", value: String(v.specs.doors) });
  rows.push({ label: "Body style", value: prettify(v.bodyStyle) });
  rows.push({
    label: "Condition",
    value:
      v.condition === "pre-owned"
        ? "Pre-owned"
        : v.condition === "certified"
          ? "Certified"
          : "New",
  });
  return rows;
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

function prettify(s: string): string {
  return s
    .split("-")
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");
}
