import type {
  Vehicle,
  VehicleBodyStyle,
  VehicleCategory,
  VehicleDrivetrain,
  VehicleFuel,
  VehicleTransmission,
} from "@/types/vehicle";

export type VehicleSort =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "year-desc"
  | "mileage-asc";

export type VehicleFilters = {
  category?: VehicleCategory;
  makes: string[];
  models: string[];
  bodyStyles: VehicleBodyStyle[];
  fuels: VehicleFuel[];
  transmissions: VehicleTransmission[];
  drivetrains: VehicleDrivetrain[];
  locations: string[];
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
};

export const emptyFilters: VehicleFilters = {
  makes: [],
  models: [],
  bodyStyles: [],
  fuels: [],
  transmissions: [],
  drivetrains: [],
  locations: [],
};

export function applyFilters(
  vehicles: Vehicle[],
  filters: VehicleFilters,
  sort: VehicleSort,
): Vehicle[] {
  let out = vehicles.filter((v) => {
    if (filters.category && v.category !== filters.category) return false;
    if (filters.makes.length && !filters.makes.includes(v.make)) return false;
    if (filters.models.length && !filters.models.includes(v.model)) return false;
    if (filters.bodyStyles.length && !filters.bodyStyles.includes(v.bodyStyle))
      return false;
    if (filters.fuels.length && !filters.fuels.includes(v.specs.fuel)) return false;
    if (
      filters.transmissions.length &&
      !filters.transmissions.includes(v.specs.transmission)
    )
      return false;
    if (
      filters.drivetrains.length &&
      !filters.drivetrains.includes(v.specs.drivetrain)
    )
      return false;
    if (filters.locations.length && !filters.locations.includes(v.location.city))
      return false;
    if (filters.priceMin !== undefined && v.price.amount < filters.priceMin)
      return false;
    if (filters.priceMax !== undefined && v.price.amount > filters.priceMax)
      return false;
    if (filters.yearMin !== undefined && v.specs.year < filters.yearMin) return false;
    return true;
  });

  out = [...out].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price.amount - b.price.amount;
      case "price-desc":
        return b.price.amount - a.price.amount;
      case "year-desc":
        return b.specs.year - a.specs.year;
      case "mileage-asc":
        return (a.specs.mileage ?? Infinity) - (b.specs.mileage ?? Infinity);
      case "featured":
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  return out;
}

export function uniqueValues<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

export function countActiveFilters(f: VehicleFilters): number {
  return (
    f.makes.length +
    f.models.length +
    f.bodyStyles.length +
    f.fuels.length +
    f.transmissions.length +
    f.drivetrains.length +
    f.locations.length +
    (f.priceMin !== undefined ? 1 : 0) +
    (f.priceMax !== undefined ? 1 : 0) +
    (f.yearMin !== undefined ? 1 : 0)
  );
}
