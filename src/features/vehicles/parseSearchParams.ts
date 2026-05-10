import type {
  VehicleBodyStyle,
  VehicleDrivetrain,
  VehicleFuel,
  VehicleTransmission,
} from "@/types/vehicle";
import type { VehicleFilters } from "./filters";

type Params = Record<string, string | string[] | undefined> | undefined;

const BODY_STYLES: VehicleBodyStyle[] = [
  "sedan",
  "coupe",
  "convertible",
  "suv",
  "crossover",
  "wagon",
  "hatchback",
  "pickup",
  "van",
  "grand-tourer",
];

const FUELS: VehicleFuel[] = [
  "petrol",
  "diesel",
  "hybrid",
  "plug-in-hybrid",
  "electric",
];

const TRANSMISSIONS: VehicleTransmission[] = [
  "automatic",
  "manual",
  "dct",
  "cvt",
];

const DRIVETRAINS: VehicleDrivetrain[] = ["fwd", "rwd", "awd", "4wd"];

function arrayParam(value: string | string[] | undefined): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.flatMap((v) => v.split(","));
  return value.split(",");
}

function numberParam(value: string | string[] | undefined): number | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

export function initialFiltersFromSearchParams(
  sp: Params,
): Partial<VehicleFilters> {
  if (!sp) return {};
  const make = arrayParam(sp.make);
  const model = arrayParam(sp.model);
  const body = arrayParam(sp.body) as VehicleBodyStyle[];
  const location = arrayParam(sp.location);
  const fuel = arrayParam(sp.fuel) as VehicleFuel[];
  const transmission = arrayParam(sp.transmission) as VehicleTransmission[];
  const drivetrain = arrayParam(sp.drivetrain) as VehicleDrivetrain[];
  const priceMin = numberParam(sp.priceMin);
  const priceMax = numberParam(sp.priceMax);
  const yearMin = numberParam(sp.yearMin);

  return {
    makes: make,
    models: model,
    bodyStyles: body.filter((b) => BODY_STYLES.includes(b)),
    locations: location,
    fuels: fuel.filter((f) => FUELS.includes(f)),
    transmissions: transmission.filter((t) => TRANSMISSIONS.includes(t)),
    drivetrains: drivetrain.filter((d) => DRIVETRAINS.includes(d)),
    priceMin,
    priceMax,
    yearMin,
  };
}
